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
					'path': 'http://localhost:9000/api/home',
					'headers': {
						'Content-Type': 'application/json'
					}
				});
				promise.then(function (resp) {
					return reply.view('home', resp.entity);
				}).catch(function (err) {
					Hoek.assert(!err, err);
					return reply.continue();
				});
			}
		}
	});
	// page2
	server.route({
		method: 'GET',
		path: '/page2',
		config: {
            description: 'Returns a Node route',
			handler: function (request, reply) {
				var endpoints = require('../lib/endpoints');
				var promise = endpoints.handleData({
					'method': 'GET',
					'path': 'http://localhost:9000/api/page2',
					'headers': {
						'Content-Type': 'application/json'
					}
				});
				promise.then(function (resp) {
					return reply.view('page2', resp.entity);
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
	name: 'webUI'
};
