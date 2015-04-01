'use strict';

// simple setup for auth cookie
exports.register = function(server, options, next) {
    server.state('auth_payload', {
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