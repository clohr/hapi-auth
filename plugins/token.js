'use strict';

var AUTH_PAYLOAD = require('../lib/contstants').AUTH_PAYLOAD;
var TOKEN_FRESHNESS = require('../lib/contstants').TOKEN_FRESHNESS; // minutes
var tokenService = require('../lib/tokenService');
var serialize = require('../lib/utils').serialize;
var parse = require('../lib/utils').parse;
var R = require('ramda');

var internals = {
    setUpAuthCookie: function(reply) {
        var payload = tokenService.getAndSetToken(null);
        var fullPayload = R.compose(R.assoc('createdAt', Date.now()))(payload);
        reply.state(AUTH_PAYLOAD, serialize(fullPayload));
    },
    reAuthCookie: function (reply, token) {
		var payload = tokenService.reAuthenticateToken(token);
        payload.createdAt = Date.now();
        reply.state(AUTH_PAYLOAD, serialize(payload));
    },
    msToMinutes: R.divide(R.__, 60000)
};

exports.register = function(server, options, next) {
    server.ext('onPreAuth', function(request, reply) {
        var token = request && request.state[AUTH_PAYLOAD];
        var parsedToken, tokenLife;

        if (!token) {
			// token does not exist, get a token before continuing action
			internals.setUpAuthCookie(reply);
        }

        parsedToken = parse(token);
        tokenLife = internals.msToMinutes(Date.now() - parsedToken.createdAt);

        if (tokenLife > TOKEN_FRESHNESS) {
			// token exists and needs to be pro-actively re-authed before continuing action
			internals.reAuthCookie(reply, token);
        }

        // token exists and is valid and within freshness limit, continue action
        return reply.continue();
	});

    return next();
};

exports.register.attributes = {
    name: 'token'
};
