'use strict';

var AUTH_PAYLOAD = require('../manifest.json').plugins.yar.name;
var TOKEN_FRESHNESS = require('../lib/contstants').TOKEN_FRESHNESS; // minutes
var TOKEN_EXPIRES = require('../lib/contstants').TOKEN_EXPIRES; // minutes
var tokenService = require('../lib/tokenService');
var R = require('ramda');

var internals = {
    setUpAuthCookie: function(request, reply) {
        var payload = tokenService.getAndSetToken(null);
        var fullPayload = R.compose(R.assoc('createdAt', Date.now()))(payload);
        request.session.set(AUTH_PAYLOAD, fullPayload);
        return reply.continue();
    },
    reAuthCookie: function (request, reply, token) {
        var payload = tokenService.reAuthenticateToken(token);
        payload.createdAt = Date.now();
        request.session.set(AUTH_PAYLOAD, payload);
        return reply.continue();
    },
    checkValidity: function (request, reply, token) {
        var tokenLife = internals.msToMinutes(Date.now() - token.createdAt);
        if (tokenLife > TOKEN_FRESHNESS && tokenLife < TOKEN_EXPIRES) {
            // token exists and needs to be pro-actively re-authed before continuing action
            console.log('token exists and needs to be pro-actively re-authed before continuing action');
            return internals.reAuthCookie(request, reply, token.authToken);
        } else if (tokenLife > TOKEN_EXPIRES) {
            // token has expired, need to get a new token before continuing action
            console.log('token has expired, need to get a new token before continuing action');
            return internals.setUpAuthCookie(request, reply);
        }
        return reply.continue();
    },
    msToMinutes: R.divide(R.__, 60000)
};

exports.register = function(server, options, next) {
    server.ext('onPreHandler', function(request, reply) {
        var token;
        if (request.path.indexOf('api/') >= 0 || request.path.indexOf('dist/') >= 0) {
            return reply.continue();
        }
        token = request.session && request.session.get(AUTH_PAYLOAD);
        if (!token) {
            // token does not exist, get a token before continuing action
            console.log('token does not exist, get a token before continuing action');
            return internals.setUpAuthCookie(request, reply);
        }
        return internals.checkValidity(request, reply, token);
    });

    return next();
};

exports.register.attributes = {
    name: 'token'
};