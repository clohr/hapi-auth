'use strict';

exports.register = function (server, options, next) {
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
	name: 'login'
};
