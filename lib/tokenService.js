'use strict';

var json = require('../data/token.json');
var Hoek = require('Hoek');
var R = require('ramda');

var tokenService = {
    getAndSetToken: function(err, opts) {
        var request;
        Hoek.assert(!err, err);
        request = {
            method: 'POST',
            path: '',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if (opts) {
            request = R.assoc('entity', opts, request);
        }
        return json;
    },
    reAuthenticateToken: function(token) {
        console.log(token);
        return json;
    }
};

module.exports = tokenService;