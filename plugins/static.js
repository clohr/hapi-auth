'use strict';

// static files
exports.register = function(server, options, next) {
	server.route({
		method: 'GET',
		path: '/dist/{filename*}',
		handler: {
			directory: {
				path: './client/dist',
				index: false
			}
		}
	});
    return next();
};

exports.register.attributes = {
    name: 'staticFiles'
};
