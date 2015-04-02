'use strict';

// handles real services end-point
exports.register = function (server, options, next) {
	server.route({
		method: options.method,
		path: options.path,
		handler: function (request, reply) {
			var filename = request.params.p || 'home';
			var filepath = '../data/' + filename + '.json';
			var json = require(filepath);
			return reply(json).type('application/json');
		}
	});
	return next();
};

exports.register.attributes = {
	name: 'apiService'
};
