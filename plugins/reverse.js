'use strict';

// proxy for real service end points
exports.register = function(server, options, next) {
	server.route({
		method: options.method,
		path: options.path,
		handler: {
			proxy: {
				passThrough: true,
				localStatePassThrough: true,
				mapUri: function (request, callback) {
					callback(null, options.proxypath + request.params.p);
				}
			}
		}
	});
    return next();
};

exports.register.attributes = {
    name: 'reverseProxy'
};
