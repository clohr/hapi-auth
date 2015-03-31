'use strict';

var Hapi = require('hapi');
var Hoek = require('hoek');

var internals = {};

internals.init = function () {

	var server = new Hapi.Server();
	server.connection({ port: 9000 });

	server.views({
		engines: {
			hbs: require('handlebars')
		},
		relativeTo: __dirname,
		path: './views',
		layoutPath: './views/layout',
		partialsPath: './views/partials',
		layout: true
	});

	server.register([
			{register: require('./plugins/api')},
			{register: require('./plugins/cookie')},
			{register: require('./plugins/home')},
			{register: require('./plugins/login')},
			{register: require('./plugins/reverse')}
		], function(err) {
		Hoek.assert(!err, err);
		server.start(function () {
			console.log('Server running at:', server.info.uri);
		});
	});

	server.route({
		// static files
		method: 'GET',
		path: '/dist/{filename*}',
		handler: {
			directory: {
				path: './client/dist',
				index: false
			}
		}
	});
};

internals.init();
