'use strict';

var utils = {};

utils.isJSON = function(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

utils.serialize = function(value) {
    if (utils.typeCheck(value) !== 'string') {
        value = JSON.stringify(value);
    }
    return encodeURIComponent(value);
};

utils.parse = function(value) {
    value = decodeURIComponent(value);
    return utils.isJSON(value) ? JSON.parse(value) : value;
};

module.exports = utils;