'use strict';

var auth = require('../data/token.json');
var reauth = require('../data/reauthToken.json');
var Hoek = require('Hoek');

var tokenService = {
    getAndSetToken: function(err) {
        Hoek.assert(!err, err);
        return auth;
    },
    reAuthenticateToken: function(token) {
        console.log(token);
        return reauth;
    }
};

module.exports = tokenService;