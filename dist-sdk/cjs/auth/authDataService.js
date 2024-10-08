'use strict';

var dataService = require('../core/dataService/dataService.js');
var cookie = require('../utils/cookie.js');
var constants = require('./constants.js');
var types = require('./types.js');

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
var AuthDataService = /*#__PURE__*/ function(DataService) {
    _inherits(AuthDataService, DataService);
    var _super = _create_super(AuthDataService);
    function AuthDataService() {
        _class_call_check(this, AuthDataService);
        var _this;
        _this = _super.apply(this, arguments);
        _define_property(_assert_this_initialized(_this), "state", cookie.state());
        _define_property(_assert_this_initialized(_this), "sendSuccessData", function(payload) {
            _this.sendSuccess({
                type: payload.type,
                code: payload.code,
                state: payload.state,
                device_id: payload.device_id,
                expires_in: payload.expires_in,
                ext_id: payload.ext_id
            });
        });
        _define_property(_assert_this_initialized(_this), "sendNewTabHasBeenClosed", function() {
            _this.sendError({
                code: types.AuthErrorCode.NewTabHasBeenClosed,
                error: constants.AUTH_ERROR_TEXT[types.AuthErrorCode.NewTabHasBeenClosed],
                state: _this.state
            });
        });
        // TODO: Типизировать details
        _define_property(_assert_this_initialized(_this), "sendAuthorizationFailed", function(details) {
            _this.sendError({
                code: types.AuthErrorCode.AuthorizationFailed,
                error: constants.AUTH_ERROR_TEXT[types.AuthErrorCode.AuthorizationFailed],
                error_description: JSON.stringify(details),
                state: _this.state
            });
        });
        _define_property(_assert_this_initialized(_this), "sendEventNotSupported", function() {
            _this.sendError({
                code: types.AuthErrorCode.EventNotSupported,
                error: constants.AUTH_ERROR_TEXT[types.AuthErrorCode.EventNotSupported],
                state: _this.state
            });
        });
        _define_property(_assert_this_initialized(_this), "sendCannotCreateNewTab", function() {
            _this.sendError({
                code: types.AuthErrorCode.CannotCreateNewTab,
                error: constants.AUTH_ERROR_TEXT[types.AuthErrorCode.CannotCreateNewTab],
                state: _this.state
            });
        });
        _define_property(_assert_this_initialized(_this), "sendStateMismatchError", function() {
            _this.sendError({
                code: types.AuthErrorCode.StateMismatch,
                error: constants.AUTH_ERROR_TEXT[types.AuthErrorCode.StateMismatch],
                state: _this.state
            });
        });
        return _this;
    }
    return AuthDataService;
}(dataService.DataService);

exports.AuthDataService = AuthDataService;
