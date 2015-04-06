'use strict';

// web ui
exports.register = function (server, options, next) {
	// home
	server.route({
		method: 'GET',
		path: '/',
		config: {
            description: 'Returns the homepage',
			handler: function (request, reply) {
				var filepath = '../data/home.json';
				var json = require(filepath);
				return reply.view('home', json);
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
				var filepath = '../data/page2.json';
				var json = require(filepath);
				return reply.view('page2', json);
			}
		}
	});
	return next();
};

exports.register.attributes = {
	name: 'webUI'
};