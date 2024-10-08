'use strict';

// @ts-ignore-next-line пробрасываем версию из package.json в rollup.config
var VERSION = "2.3.2";
// @ts-ignore-next-line пробрасываем тип сборки из rollup.config
var DOMAIN = "vk.com";
var LOGIN_DOMAIN = "login.".concat(DOMAIN);
var OAUTH_DOMAIN = "oauth.".concat(DOMAIN);
var VKID_DOMAIN = "id.".concat(DOMAIN);
var COOKIE_EXPIRES_TIME_15_MIN = 900000;

exports.COOKIE_EXPIRES_TIME_15_MIN = COOKIE_EXPIRES_TIME_15_MIN;
exports.DOMAIN = DOMAIN;
exports.LOGIN_DOMAIN = LOGIN_DOMAIN;
exports.OAUTH_DOMAIN = OAUTH_DOMAIN;
exports.VERSION = VERSION;
exports.VKID_DOMAIN = VKID_DOMAIN;
