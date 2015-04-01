'use strict';

exports.register = function (server, options, next) {
	server.route({ // handle real end-point
		method: options.method,
		path: options.path,
		handler: function (request, reply) {
			var json = require('../data/content.json');
			return reply(json).type('application/json');
		}
	});
	return next();
};

exports.register.attributes = {
	name: 'apiService'
};
