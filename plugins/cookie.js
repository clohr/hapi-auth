'use strict';

// simple setup for auth cookie
exports.register = function(server, options, next) {
    server.state('auth_payload', {
        ttl: null,
        isSecure: false,
        path: '/api',
        isHttpOnly: true,
        clearInvalid: true
    });
    return next();
};

exports.register.attributes = {
    name: 'authCookie'
};