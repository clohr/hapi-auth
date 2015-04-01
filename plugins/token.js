'use strict';

var AUTH_PAYLOAD = require('../lib/contstants').AUTH_PAYLOAD;
var TOKEN_FRESHNESS = require('../lib/contstants').TOKEN_FRESHNESS; // minutes
var TOKEN_EXPIRES = require('../lib/contstants').TOKEN_EXPIRES; // minutes
var tokenService = require('../lib/tokenService');
var serialize = require('../lib/utils').serialize;
var parse = require('../lib/utils').parse;
var R = require('ramda');

var internals = {
    setUpAuthCookie: function(reply) {
        tokenService.getAndSetToken(null).then(function(payload) {
            var fullPayload = R.compose(R.assoc('createdAt', Date.now()))(payload);
            reply.state(AUTH_PAYLOAD, serialize(fullPayload));
            return reply.continue();
        });
    },
    reAuthCookie: function (reply, token) {
		tokenService.reAuthenticateToken(token).then(function(payload) {
            payload.createdAt = Date.now();
            reply.state(AUTH_PAYLOAD, serialize(payload));
            return reply.continue();
        });
    },
    msToMinutes: R.divide(R.__, 60000)
};

exports.register = function(server, options, next) {
    server.ext('onPreAuth', function(request, reply) {
        var token = request && request.state[AUTH_PAYLOAD];
        var parsedToken, tokenLife, tokenValid;

        if (!token) {
			// token does not exist, get a token before continuing action
			internals.setUpAuthCookie(reply);
        }

        parsedToken = parse(token);
        tokenValid = internals.msToMinutes(Date.now() + parsedToken.createdAt) < TOKEN_EXPIRES;
        tokenLife = internals.msToMinutes(Date.now() - parsedToken.createdAt);

        if (tokenValid && tokenLife > TOKEN_FRESHNESS) {
			// token exists and needs to be pro-actively re-authed before continuing action
			internals.reAuthCookie(reply, token);
        } else if (!tokenValid) {
			// token has expired, get a new token before continuing action
			internals.setUpAuthCookie(reply);
        }

        // token exists and is valid and within freshness limit, continue action
        return reply.continue();
	});

    return next();
};

exports.register.attributes = {
    name: 'token'
};
