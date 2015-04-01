'use strict';

// static files
exports.register = function(server, options, next) {
	server.route({
		method: 'GET',
		path: options.path,
		handler: {
			directory: {
				path: options.dirpath,
				index: false
			}
		}
	});
    return next();
};

exports.register.attributes = {
    name: 'staticFiles'
};
