'use strict';

var AUTH_PAYLOAD = require('../lib/contstants').AUTH_PAYLOAD;
var TOKEN_FRESHNESS = require('../lib/contstants').TOKEN_FRESHNESS; // minutes
var IRON_PASSWORD = require('../lib/contstants').IRON_PASSWORD;
var tokenService = require('../lib/tokenService');
var Hoek = require('hoek');
var R = require('ramda');
var Iron = require('iron');

var internals = {
    setUpAuthCookie: function(reply) {
        var payload = tokenService.getAndSetToken(null);
        var fullPayload = R.compose(R.assoc('createdAt', Date.now()))(payload);
        console.log('setUpAuthCookie:', payload);
        return Iron.seal(fullPayload, IRON_PASSWORD, Iron.defaults, function (err, sealedObj) {
            Hoek.assert(!err, err);
            reply.state(AUTH_PAYLOAD, sealedObj);
            console.log('seal auth token:', sealedObj);
            return reply.continue();
        });
    },
    reAuthCookie: function (reply, token) {
        var payload = tokenService.reAuthenticateToken(token);
        payload.createdAt = Date.now();
        console.log('reAuthCookie:', payload);
        return Iron.seal(payload, IRON_PASSWORD, Iron.defaults, function (err, sealedObj) {
            Hoek.assert(!err, err);
            reply.state(AUTH_PAYLOAD, sealedObj);
            console.log('seal re-auth token:', sealedObj);
            return reply.continue();
        });
    },
    msToMinutes: R.divide(R.__, 60000)
};

exports.register = function(server, options, next) {
    server.ext('onPreAuth', function(request, reply) {
        var token = request && request.state[AUTH_PAYLOAD];
        if (!token) {
            // token does not exist, get a token before continuing action
            console.log('token does not exist, get a token before continuing action');
            return internals.setUpAuthCookie(reply);
        }

        return Iron.unseal(token, IRON_PASSWORD, Iron.defaults, function (err, unsealed) {
            var tokenLife;
            Hoek.assert(!err, err);
            tokenLife = internals.msToMinutes(Date.now() - unsealed.createdAt);
            if (tokenLife > TOKEN_FRESHNESS) {
                // token exists and needs to be pro-actively re-authed before continuing action
                console.log('token exists and needs to be pro-actively re-authed before continuing action');
                return internals.reAuthCookie(reply, unsealed.auth_token);
            }
            // token exists and is valid and within freshness limit, continue action
            return reply.continue();
        });
    });

    return next();
};

exports.register.attributes = {
    name: 'token'
};