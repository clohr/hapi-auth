'use strict';

var endPoints = require('./endPoints');

var navigation = function(token) {
    return endPoints.handleData({
        method: 'GET',
        path: 'http://10.9.8.82/api/catalog/v0/fp-us/navigation',
        headers: {
            'X-Urbn-Auth-Token': token,
            'X-Urbn-Language': 'en-US',
            'X-Urbn-Currency': 'USD',
            'X-Urbn-Channel': 'desktop-web',
            'siteId': 'fp-us',
            'Content-Type': 'application/json'
        }
    });
};

module.exports = navigation;