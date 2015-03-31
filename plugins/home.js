'use strict';

var Hoek = require('hoek');
var endpoints = require('../lib/endpoints');

// make server-side call through reverse proxy to get cookie value
exports.register = function (server, options, next) {
	server.route({
		method: 'GET',
		path: '/',
		config: {
            description: 'Returns the homepage',
			handler: function (request, reply) {
				var promise = endpoints.handleData({
					'method': 'GET',
					'path': 'http://localhost:9000/service/content',
					'headers': {
						'Content-Type': 'application/json'
					}
				});
				promise.then(function (resp) {
					return reply.view('home', JSON.parse(resp.entity));
				}).catch(function (err) {
					Hoek.assert(!err, err);
					return reply.continue();
				});
			}
		}
	});
	return next();
};

exports.register.attributes = {
	name: 'home'
};
