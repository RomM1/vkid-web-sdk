'use strict';

var constants = require('../../constants.js');
require('../analytics/types.js');
var SakSessionStatsCollector = require('../analytics/SakSessionStatsCollector.js');
var ProductionStatsCollector = require('../analytics/ProductionStatsCollector.js');
var ActionStatsCollector = require('../analytics/ActionStatsCollector.js');
var validator = require('../validator/validator.js');
var rules = require('../validator/rules.js');
var types = require('./types.js');

function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
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
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
var Config = /*#__PURE__*/ function() {
    function Config() {
        _class_call_check(this, Config);
        _define_property(this, "sakSessionStatsCollector", void 0);
        _define_property(this, "store", {
            app: 0,
            redirectUrl: "",
            mode: types.ConfigAuthMode.InNewTab,
            responseMode: types.ConfigResponseMode.Redirect,
            codeVerifier: "",
            state: "",
            prompt: [
                types.Prompt.Default
            ],
            __loginDomain: constants.LOGIN_DOMAIN,
            __oauthDomain: constants.OAUTH_DOMAIN,
            __vkidDomain: constants.VKID_DOMAIN
        });
        var productStatsCollector = new ProductionStatsCollector.ProductionStatsCollector(this);
        var actionStatsCollector = new ActionStatsCollector.ActionStatsCollector(productStatsCollector);
        this.sakSessionStatsCollector = new SakSessionStatsCollector.SakSessionStatsCollector(actionStatsCollector);
    }
    _create_class(Config, [
        {
            key: "init",
            value: function init(config) {
                this.set(config);
                this.sakSessionStatsCollector.sendSdkInit(config.source);
                return this;
            }
        },
        {
            key: "update",
            value: function update(config) {
                return this.set(config);
            }
        },
        {
            key: "set",
            value: function set(config) {
                this.store = _object_spread({}, this.store, config);
                return this;
            }
        },
        {
            key: "get",
            value: function get() {
                return this.store;
            }
        }
    ]);
    return Config;
}();
_ts_decorate([
    validator.validator({
        app: [
            rules.isRequired,
            rules.isNumber
        ],
        redirectUrl: [
            rules.isRequired
        ]
    })
], Config.prototype, "init", null);

exports.Config = Config;
