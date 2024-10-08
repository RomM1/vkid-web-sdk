'use strict';

var index = require('./../lib/nanoid/non-secure/index.js');
var constants = require('../constants.js');

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
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function getCookie(name) {
    try {
        var matches = document.cookie.match(new RegExp("(?:^|; )" + ("vkid_sdk:" + name).replace(/([.$?*|{}()\[\]\\\/+^])/g, "\\$1") + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    } catch (e) {
        return undefined;
    }
}
function setCookie(name, params) {
    try {
        var expireTime = new Date(new Date().getTime() + (params.expires || constants.COOKIE_EXPIRES_TIME_15_MIN)).toUTCString();
        var allowedDomain = location.host.split(".").slice(-2).join(".");
        document.cookie = [
            "vkid_sdk:".concat(name, "=").concat(encodeURIComponent(params.value || "")),
            "expires=".concat(expireTime),
            "path=/",
            "domain=.".concat(allowedDomain),
            "SameSite=Strict",
            "Secure"
        ].join("; ");
    } catch (e) {}
}
function clearCookie(name) {
    var allowedDomain = location.host.split(".").slice(-2).join(".");
    try {
        document.cookie = [
            "vkid_sdk:".concat(name, "="),
            "expires=Thu, 01 Jan 1970 00:00:00 UTC",
            "path=/",
            "SameSite=Strict",
            "Secure",
            "domain=.".concat(allowedDomain)
        ].join("; ");
    } catch (e) {}
}
function cookie(name, params) {
    if (params.value) {
        setCookie(name, params);
        return params.value;
    }
    var value;
    value = getCookie(name);
    if (!value) {
        value = index.nanoid(48);
        setCookie(name, _object_spread_props(_object_spread({}, params), {
            value: value
        }));
    }
    return value;
}
var state = function(value) {
    return cookie("state", {
        value: value
    });
};
var codeVerifier = function(value) {
    return cookie("codeVerifier", {
        value: value
    });
};
var clearStateCookie = function() {
    return clearCookie("state");
};
var clearCodeVerifierCookie = function() {
    return clearCookie("codeVerifier");
};
var COOKIE_EXPIRES_TIME_1_YEAR = 31536000000;
function setExtIdCookie(value) {
    if (!value) {
        return;
    }
    try {
        var expireTime = new Date(new Date().getTime() + COOKIE_EXPIRES_TIME_1_YEAR).toUTCString();
        var allowedDomain = location.host.split(".").slice(-2).join(".");
        document.cookie = [
            "vkidExtId=".concat(encodeURIComponent(value || "")),
            "expires=".concat(expireTime),
            "path=/",
            "domain=.".concat(allowedDomain),
            "SameSite=Strict",
            "Secure"
        ].join("; ");
    } catch (e) {}
}

exports.clearCodeVerifierCookie = clearCodeVerifierCookie;
exports.clearStateCookie = clearStateCookie;
exports.codeVerifier = codeVerifier;
exports.cookie = cookie;
exports.setExtIdCookie = setExtIdCookie;
exports.state = state;
