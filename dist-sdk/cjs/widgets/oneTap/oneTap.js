'use strict';

var types$1 = require('../../auth/types.js');
var types$3 = require('../../core/analytics/types.js');
require('../../core/analytics/ProductionStatsCollector.js');
require('../../core/config/config.js');
var types$2 = require('../../core/config/types.js');
var validator = require('../../core/validator/validator.js');
var rules = require('../../core/validator/rules.js');
var widget = require('../../core/widget/widget.js');
var events$1 = require('../../core/widget/events.js');
var types = require('../../core/widget/types.js');
var types$4 = require('../../types.js');
var nullOrUndefined = require('../../utils/url/nullOrUndefined.js');
var oauthList = require('../oauthList/oauthList.js');
var types$5 = require('../oauthList/types.js');
var events$2 = require('../oauthList/events.js');
var OneTapStatsCollector = require('./analytics/OneTapStatsCollector.js');
var events = require('./events.js');
var template = require('./template.js');
var types$6 = require('./types.js');

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
function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function get(target, property, receiver) {
            var base = _super_prop_base(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver || target);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
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
function _super_prop_base(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = _get_prototype_of(object);
        if (object === null) break;
    }
    return object;
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
var defaultStylesParams = {
    width: 0,
    height: 44,
    borderRadius: 8
};
var BUTTON_SPACING = 12;
var OneTap = /*#__PURE__*/ function(Widget) {
    _inherits(OneTap, Widget);
    var _super = _create_super(OneTap);
    function OneTap() {
        _class_call_check(this, OneTap);
        var _this;
        _this = _super.call(this);
        _define_property(_assert_this_initialized(_this), "analytics", void 0);
        _define_property(_assert_this_initialized(_this), "vkidAppName", "button_one_tap_auth");
        _define_property(_assert_this_initialized(_this), "statsBtnType", void 0);
        _define_property(_assert_this_initialized(_this), "fastAuthDisabled", void 0);
        _define_property(_assert_this_initialized(_this), "setStatsButtonType", function(type) {
            if (!_this.statsBtnType) {
                _this.statsBtnType = type;
                if (_this.fastAuthDisabled) {
                    _this.statsBtnType && _this.analytics.sendOneTapButtonNoUserShow(_this.statsBtnType);
                }
            }
        });
        _define_property(_assert_this_initialized(_this), "sendSuccessLoginEvent", function(params) {
            _this.events.emit(events.OneTapInternalEvents.LOGIN_SUCCESS, params);
        });
        _this.analytics = new OneTapStatsCollector.OneTapStatsCollector(OneTap.config);
        return _this;
    }
    _create_class(OneTap, [
        {
            key: "onBridgeMessageHandler",
            value: function onBridgeMessageHandler(event) {
                switch(event.handler){
                    case events.OneTapInternalEvents.SHOW_FULL_AUTH:
                        {
                            var params = event.params;
                            var authParams = {};
                            if (params.screen) {
                                authParams.screen = params.screen;
                            }
                            if (params.sdk_oauth) {
                                authParams.provider = params.sdk_oauth;
                                authParams.statsFlowSource = types$1.AuthStatsFlowSource.MULTIBRANDING;
                            }
                            this.openFullAuth(authParams);
                            break;
                        }
                    case events.OneTapInternalEvents.NOT_AUTHORIZED:
                        {
                            var _this_elements_iframe, _this_elements;
                            this.analytics.sendNoSessionFound();
                            this.setState(types.WidgetState.NOT_LOADED);
                            clearTimeout(this.timeoutTimer);
                            (_this_elements = this.elements) === null || _this_elements === void 0 ? void 0 : (_this_elements_iframe = _this_elements.iframe) === null || _this_elements_iframe === void 0 ? void 0 : _this_elements_iframe.remove();
                            break;
                        }
                    case events.OneTapInternalEvents.AUTHENTICATION_INFO:
                        {
                            this.events.emit(events.OneTapInternalEvents.AUTHENTICATION_INFO, event.params);
                            break;
                        }
                    default:
                        {
                            _get(_get_prototype_of(OneTap.prototype), "onBridgeMessageHandler", this).call(this, event);
                            break;
                        }
                }
            }
        },
        {
            key: "onErrorHandler",
            value: function onErrorHandler(error) {
                this.analytics.sendFrameLoadingFailed();
                this.analytics.sendOneTapButtonNoUserShow(this.statsBtnType);
                _get(_get_prototype_of(OneTap.prototype), "onErrorHandler", this).call(this, error);
            }
        },
        {
            key: "openFullAuth",
            value: function openFullAuth(value) {
                var _this = this;
                var params = _object_spread_props(_object_spread({
                    statsFlowSource: types$1.AuthStatsFlowSource.BUTTON_ONE_TAP
                }, value), {
                    uniqueSessionId: this.id,
                    lang: this.lang,
                    scheme: this.scheme
                });
                OneTap.auth.login(params).then(this.sendSuccessLoginEvent).catch(function(error) {
                    _this.events.emit(events$1.WidgetEvents.ERROR, {
                        code: types.WidgetErrorCode.AuthError,
                        text: error.error
                    });
                });
            }
        },
        {
            key: "login",
            value: function login(value) {
                var _this = this;
                if (this.config.get().mode === types$2.ConfigAuthMode.Redirect) {
                    this.analytics.sendOneTapButtonNoUserTap(this.statsBtnType).finally(function() {
                        _this.openFullAuth(value);
                    });
                } else {
                    void this.analytics.sendOneTapButtonNoUserTap(this.statsBtnType);
                    this.openFullAuth(value);
                }
            }
        },
        {
            key: "renderOAuthList",
            value: function renderOAuthList(params) {
                if (!params.oauthList.length) {
                    return;
                }
                var oauthList$1 = new oauthList.OAuthList();
                oauthList$1.on(events$2.OAuthListInternalEvents.LOGIN_SUCCESS, this.sendSuccessLoginEvent).render(_object_spread_props(_object_spread({}, params), {
                    flowSource: types$3.ProductionStatsEventScreen.NOWHERE,
                    uniqueSessionId: this.id
                }));
            }
        },
        {
            key: "render",
            value: function render(params) {
                var _params, _params1, _params_styles, _params_styles1, _params_styles2, _params2, _params3, _params_styles3;
                this.lang = ((_params = params) === null || _params === void 0 ? void 0 : _params.lang) || types$4.Languages.RUS;
                this.scheme = ((_params1 = params) === null || _params1 === void 0 ? void 0 : _params1.scheme) || types$4.Scheme.LIGHT;
                this.fastAuthDisabled = params.fastAuthEnabled === false;
                var providers = (params.oauthList || []).filter(function(provider) {
                    return provider !== types$5.OAuthName.VK;
                });
                var oneTapParams = {
                    style_height: ((_params_styles = params.styles) === null || _params_styles === void 0 ? void 0 : _params_styles.height) || defaultStylesParams.height,
                    style_border_radius: !nullOrUndefined.isNullOrUndefined((_params_styles1 = params.styles) === null || _params_styles1 === void 0 ? void 0 : _params_styles1.borderRadius) ? (_params_styles2 = params.styles) === null || _params_styles2 === void 0 ? void 0 : _params_styles2.borderRadius : defaultStylesParams.borderRadius,
                    show_alternative_login: ((_params2 = params) === null || _params2 === void 0 ? void 0 : _params2.showAlternativeLogin) ? 1 : 0,
                    button_skin: params.skin || types$6.OneTapSkin.Primary,
                    content_id: ((_params3 = params) === null || _params3 === void 0 ? void 0 : _params3.contentId) || types$6.OneTapContentId.SIGN_IN,
                    scheme: this.scheme,
                    lang_id: this.lang,
                    providers: providers.join(","),
                    uuid: this.id
                };
                this.analytics.setUniqueSessionId(this.id);
                this.templateRenderer = template.getOneTapTemplate({
                    width: ((_params_styles3 = params.styles) === null || _params_styles3 === void 0 ? void 0 : _params_styles3.width) || defaultStylesParams.width,
                    iframeHeight: oneTapParams.show_alternative_login ? oneTapParams.style_height * 2 + BUTTON_SPACING : oneTapParams.style_height,
                    height: oneTapParams.style_height,
                    borderRadius: oneTapParams.style_border_radius,
                    login: this.login.bind(this),
                    skin: oneTapParams.button_skin,
                    scheme: oneTapParams.scheme,
                    lang: oneTapParams.lang_id,
                    contentId: oneTapParams.content_id,
                    renderOAuthList: this.renderOAuthList.bind(this),
                    providers: providers,
                    setStatsButtonType: this.setStatsButtonType.bind(this)
                });
                this.analytics.sendScreenProceed({
                    scheme: this.scheme,
                    lang: this.lang,
                    skin: oneTapParams.button_skin,
                    contentId: oneTapParams.content_id
                });
                if (this.fastAuthDisabled) {
                    oneTapParams.fastAuthDisabled = true;
                }
                return _get(_get_prototype_of(OneTap.prototype), "render", this).call(this, _object_spread({
                    container: params.container
                }, oneTapParams));
            }
        }
    ]);
    return OneTap;
}(widget.Widget);
_ts_decorate([
    validator.validator({
        styles: [
            rules.isValidHeight
        ]
    })
], OneTap.prototype, "render", null);

exports.OneTap = OneTap;
