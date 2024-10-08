'use strict';

var types = require('./types.js');

function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
var _obj;
var OAuthNameText = (_obj = {}, _define_property(_obj, types.OAuthName.OK, "OK"), _define_property(_obj, types.OAuthName.MAIL, "Mail"), _define_property(_obj, types.OAuthName.VK, "VK ID"), _obj);

exports.OAuthNameText = OAuthNameText;
