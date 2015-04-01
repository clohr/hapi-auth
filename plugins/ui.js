'use strict';

var Hoek = require('hoek');

// web ui
exports.register = function (server, options, next) {
	// home
	server.route({
		method: 'GET',
		path: '/',
		config: {
            description: 'Returns the homepage',
			handler: function (request, reply) {
				var endpoints = require('../lib/endpoints');
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
	// login
	server.route({
		method: 'GET',
		path: '/login',
		handler: function (request, reply) {
			return reply.view('login');
		}
	});
	return next();
};

exports.register.attributes = {
	name: 'webUI'
};
