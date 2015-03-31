'use strict';

var endpoints = require('../../../lib/endpoints');

var internals = {
	makeXHR: function makeXHR(el) {
		var url = el.getAttribute('href') || '';
		var promise = endpoints.handleData({
			method: 'GET',
			path: url,
			headers: {
				'Content-Type': 'application/json'
			}
		});
		promise.then(function (resp) {
			var template = require('../../../views/partials/pageData.hbs');
			var content = document.getElementById('pageContent');
			if (!content) {
				console.log('pageContent not found');
			}
			resp.pageTitle = 'My Website: Client-Side Request';
			content.innerHTML = template(resp);
		}).catch(function (err) {
			console.log(err);
		});
	},
	bindEvents: function bindEvents(elemId) {
		var elem = document.getElementById(elemId);
		if (!elem) {
			return;
		}
		elem.addEventListener('click', function (e) {
			e.preventDefault();
			internals.makeXHR(e.target);
		});
	}
};

module.exports = function (elemId) {
	internals.bindEvents(elemId);
};

