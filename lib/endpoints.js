'use strict';

var Hoek = require('hoek');

var Endpoints = function() {
    this.rest = require('rest');
    this.mime = require('rest/interceptor/mime');
    this.errorCode = require('rest/interceptor/errorCode');
    this.client = this.rest.wrap(this.mime).wrap(this.errorCode);
};

Endpoints.prototype.handleErrors = function(err, message, cb) {
    message = message || 'Generic error';
    console.error(err, message);
    return typeof cb === 'function' ? cb.call(cb, err) : '';
};

Endpoints.prototype.handleSuccess = function(response) {
    console.info(response);
    return response && response.entity;
};

Endpoints.prototype.handleData = function(opt){
    var defaults = {
        method: 'GET'
    };
    opt = opt || {};
    return this.client(Hoek.applyToDefaults(defaults, opt));
};

module.exports = new Endpoints();