'use strict';

var types$5 = require('../../auth/types.js');
var types$3 = require('../../core/analytics/types.js');
require('../../core/analytics/ProductionStatsCollector.js');
require('../../core/config/config.js');
var types$6 = require('../../core/config/types.js');
var validator = require('../../core/validator/validator.js');
var rules = require('../../core/validator/rules.js');
var widget = require('../../core/widget/widget.js');
var events$1 = require('../../core/widget/events.js');
var types$4 = require('../../core/widget/types.js');
var types$2 = require('../../types.js');
var OAuthListStatsCollector = require('./analytics/OAuthListStatsCollector.js');
var types = require('./analytics/types.js');
var events = require('./events.js');
var template = require('./template.js');
var types$1 = require('./types.js');

function _assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
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
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of(subClass, superClass);
}
function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _is_native_reflect_construct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _create_super(Derived) {
    var hasNativeReflectConstruct = _is_native_reflect_construct();
    return function _createSuperInternal() {
        var Super = _get_prototype_of(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _get_prototype_of(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possible_constructor_return(this, result);
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
var OAuthList = /*#__PURE__*/ function(Widget) {
    _inherits(OAuthList, Widget);
    var _super = _create_super(OAuthList);
    function OAuthList() {
        _class_call_check(this, OAuthList);
        var _this;
        _this = _super.call(this);
        _define_property(_assert_this_initialized(_this), "analytics", void 0);
        _define_property(_assert_this_initialized(_this), "providers", void 0);
        _define_property(_assert_this_initialized(_this), "flowSource", void 0);
        _define_property(_assert_this_initialized(_this), "uniqueSessionId", void 0);
        _this.analytics = new OAuthListStatsCollector.OAuthListStatsCollector(_this.config);
        return _this;
    }
    _create_class(OAuthList, [
        {
            key: "sendStartAnalytics",
            value: function sendStartAnalytics() {
                var providers = new Set(this.providers);
                this.analytics.sendMultibrandingOauthAdded({
                    screen: this.flowSource,
                    fields: [
                        {
                            name: types.MultibrandingStatsProviders.VK,
                            value: (+providers.has(types$1.OAuthName.VK)).toString()
                        },
                        {
                            name: types.MultibrandingStatsProviders.OK,
                            value: (+providers.has(types$1.OAuthName.OK)).toString()
                        },
                        {
                            name: types.MultibrandingStatsProviders.MAIL,
                            value: (+providers.has(types$1.OAuthName.MAIL)).toString()
                        }
                    ]
                });
                if (providers.has(types$1.OAuthName.VK)) {
                    this.analytics.sendVkButtonShow({
                        screen: this.flowSource,
                        isIcon: providers.size > 1
                    });
                }
                if (providers.has(types$1.OAuthName.OK)) {
                    this.analytics.sendOkButtonShow({
                        screen: this.flowSource,
                        isIcon: providers.size > 1
                    });
                }
                if (providers.has(types$1.OAuthName.MAIL)) {
                    this.analytics.sendMailButtonShow({
                        screen: this.flowSource,
                        isIcon: providers.size > 1
                    });
                }
            }
        },
        {
            key: "render",
            value: function render(params) {
                var _params, _params1, _params2, _params3, _params_styles, _params_styles1;
                this.lang = ((_params = params) === null || _params === void 0 ? void 0 : _params.lang) || types$2.Languages.RUS;
                this.scheme = ((_params1 = params) === null || _params1 === void 0 ? void 0 : _params1.scheme) || types$2.Scheme.LIGHT;
                this.providers = params.oauthList;
                this.flowSource = ((_params2 = params) === null || _params2 === void 0 ? void 0 : _params2.flowSource) || types$3.ProductionStatsEventScreen.MULTIBRANDING;
                this.uniqueSessionId = ((_params3 = params) === null || _params3 === void 0 ? void 0 : _params3.uniqueSessionId) || this.id;
                this.analytics.setUniqueSessionId(this.uniqueSessionId);
                this.templateRenderer = template.getOAuthListTemplate({
                    lang: this.lang,
                    oauthList: params.oauthList,
                    height: (_params_styles = params.styles) === null || _params_styles === void 0 ? void 0 : _params_styles.height,
                    borderRadius: (_params_styles1 = params.styles) === null || _params_styles1 === void 0 ? void 0 : _params_styles1.borderRadius,
                    scheme: this.scheme
                });
                this.container = params.container;
                this.renderTemplate();
                this.registerElements();
                this.setState(types$4.WidgetState.LOADED);
                this.sendStartAnalytics();
                this.elements.root.addEventListener("click", this.handleClick.bind(this));
                return this;
            }
        },
        {
            key: "handleClick",
            value: function handleClick(e) {
                var _this = this;
                var target = e.target.closest("[data-oauth]");
                if (!target) {
                    return;
                }
                var oauth = target.getAttribute("data-oauth");
                var params = {
                    lang: this.lang,
                    scheme: this.scheme,
                    provider: oauth,
                    statsFlowSource: types$5.AuthStatsFlowSource.MULTIBRANDING,
                    uniqueSessionId: this.uniqueSessionId
                };
                var sendProviderButtonTap;
                switch(oauth){
                    case types$1.OAuthName.VK:
                        sendProviderButtonTap = this.analytics.sendVkButtonTap.bind(this.analytics);
                        break;
                    case types$1.OAuthName.OK:
                        sendProviderButtonTap = this.analytics.sendOkButtonTap.bind(this.analytics);
                        break;
                    case types$1.OAuthName.MAIL:
                        sendProviderButtonTap = this.analytics.sendMailButtonTap.bind(this.analytics);
                        break;
                }
                var openFullAuth = function() {
                    OAuthList.auth.login(params).then(function(res) {
                        _this.events.emit(events.OAuthListInternalEvents.LOGIN_SUCCESS, res);
                    }).catch(function(error) {
                        _this.events.emit(events$1.WidgetEvents.ERROR, {
                            code: types$4.WidgetErrorCode.AuthError,
                            text: error.error
                        });
                    });
                };
                var sendProviderButtonTapParams = {
                    screen: this.flowSource,
                    isIcon: this.providers.length > 1
                };
                if (this.config.get().mode === types$6.ConfigAuthMode.Redirect) {
                    sendProviderButtonTap(sendProviderButtonTapParams).finally(openFullAuth);
                } else {
                    void sendProviderButtonTap(sendProviderButtonTapParams);
                    openFullAuth();
                }
            }
        }
    ]);
    return OAuthList;
}(widget.Widget);
_ts_decorate([
    validator.validator({
        oauthList: [
            rules.isNotEmptyOAuthList
        ]
    })
], OAuthList.prototype, "render", null);

exports.OAuthList = OAuthList;
