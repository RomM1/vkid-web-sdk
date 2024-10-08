'use strict';

var types = require('../types.js');

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
var TEXT_TYPE = (_obj = {}, _define_property(_obj, types.FloatingOneTapContentId.SIGN_IN_TO_SERVICE, "service_sign_in"), _define_property(_obj, types.FloatingOneTapContentId.REGISTRATION_FOR_EVENT, "event_reg"), _define_property(_obj, types.FloatingOneTapContentId.SUBMIT_APPLICATIONS, "request"), _define_property(_obj, types.FloatingOneTapContentId.MAKE_ORDER_WITH_SERVICE, "service_order_placing"), _define_property(_obj, types.FloatingOneTapContentId.MAKE_ORDER_WITHOUT_SERVICE, "vkid_order_placing"), _define_property(_obj, types.FloatingOneTapContentId.SIGN_IN_TO_ACCOUNT, "account_sign_in"), _define_property(_obj, types.FloatingOneTapContentId.FAST_REGISTRATION, "fast_reg"), _obj);

exports.TEXT_TYPE = TEXT_TYPE;
