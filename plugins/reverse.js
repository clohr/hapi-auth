'use strict';

// proxy for real service end points
exports.register = function(server, options, next) {
	server.route({
		method: 'GET',
		path: '/service/{p*}',
		handler: {
			proxy: {
				mapUri: function (request, callback) {
					callback(null, 'http://localhost:9000/api/' + request.params.p);
				}
			}
		}
	});
    return next();
};

exports.register.attributes = {
    name: 'reverseProxy'
};
