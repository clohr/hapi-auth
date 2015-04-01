'use strict';

var AUTH_PAYLOAD = require('../lib/contstants').AUTH_PAYLOAD;

// simple setup for auth cookie
exports.register = function(server, options, next) {
    server.state(AUTH_PAYLOAD, {
        ttl: options.ttl,
        isSecure: options.isSecure,
        path: options.path,
        isHttpOnly: options.isHttpOnly,
        clearInvalid: options.clearInvalid
    });
    return next();
};

exports.register.attributes = {
    name: 'authCookie'
};