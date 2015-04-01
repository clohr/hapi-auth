'use strict';

var Hoek = require('hoek');
var Glue = require('glue');
var path = require('path');

var internals = {};

internals.init = function () {
	var manifest = require('./manifest.json');
	var manifestOptions = {
		relativeTo: path.join(__dirname, './plugins')
	};
	Glue.compose(manifest, manifestOptions, function (err, server) {
		Hoek.assert(!err, err);
		server.start(function (err) {
			Hoek.assert(!err, err);
			console.log('Server running at:', server.info.uri);
		});
	});
};

internals.init();
