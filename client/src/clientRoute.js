'use strict';

var endpoints = require('../../lib/endpoints');

var internals = {
	parse: function parse(content) {
		var val = decodeURIComponent(content);
		if (typeof val === 'string') {
			val = JSON.parse(val);
		}
		return val;
	},
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
			var template = require('../../views/partials/pageData.hbs');
			var content = document.getElementById('pageContent');
			var parsed = internals.parse(resp.entity);
			if (!content) {
				console.log('pageContent not found');
			}
			parsed.pageContent = 'This request was made using XHR';
			content.innerHTML = template(parsed);
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

