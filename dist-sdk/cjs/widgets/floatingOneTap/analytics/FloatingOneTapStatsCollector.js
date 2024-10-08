'use strict';

var RegistrationStatsCollector = require('../../../core/analytics/RegistrationStatsCollector.js');
var types = require('../../../core/analytics/types.js');
var ProductionStatsCollector = require('../../../core/analytics/ProductionStatsCollector.js');
var ActionStatsCollector = require('../../../core/analytics/ActionStatsCollector.js');
var constants = require('./constants.js');

function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
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
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var FloatingOneTapStatsCollector = /*#__PURE__*/ function() {
    function FloatingOneTapStatsCollector(config) {
        _class_call_check(this, FloatingOneTapStatsCollector);
        _define_property(this, "registrationStatsCollector", void 0);
        _define_property(this, "uniqueSessionId", void 0);
        var productStatsCollector = new ProductionStatsCollector.ProductionStatsCollector(config);
        var actionStatsCollector = new ActionStatsCollector.ActionStatsCollector(productStatsCollector);
        this.registrationStatsCollector = new RegistrationStatsCollector.RegistrationStatsCollector(actionStatsCollector);
    }
    _create_class(FloatingOneTapStatsCollector, [
        {
            key: "setUniqueSessionId",
            value: function setUniqueSessionId(id) {
                this.uniqueSessionId = id;
            }
        },
        {
            key: "getFields",
            value: function getFields() {
                var fields = [
                    {
                        name: "sdk_type",
                        value: "vkid"
                    }
                ];
                if (this.uniqueSessionId) {
                    fields.push({
                        name: "unique_session_id",
                        value: this.uniqueSessionId
                    });
                }
                return fields;
            }
        },
        {
            key: "sendScreenProceed",
            value: function sendScreenProceed(params) {
                void this.registrationStatsCollector.logEvent(types.ProductionStatsEventScreen.NOWHERE, {
                    event_type: "screen_proceed",
                    screen_to: types.ProductionStatsEventScreen.FLOATING_ONE_TAP,
                    fields: _to_consumable_array(this.getFields()).concat([
                        {
                            name: "theme_type",
                            value: params.scheme
                        },
                        {
                            name: "language",
                            value: params.lang.toString()
                        },
                        {
                            name: "text_type",
                            value: constants.TEXT_TYPE[params.contentId]
                        }
                    ])
                });
            }
        },
        {
            key: "sendIframeLoadingFailed",
            value: function sendIframeLoadingFailed() {
                void this.registrationStatsCollector.logEvent(types.ProductionStatsEventScreen.FLOATING_ONE_TAP, {
                    event_type: "iframe_loading_failed",
                    fields: this.getFields()
                });
            }
        },
        {
            key: "sendNoUserButtonShow",
            value: function sendNoUserButtonShow() {
                void this.registrationStatsCollector.logEvent(types.ProductionStatsEventScreen.FLOATING_ONE_TAP, {
                    event_type: "no_user_button_show",
                    fields: this.getFields()
                });
            }
        },
        {
            key: "sendNoUserButtonTap",
            value: function sendNoUserButtonTap() {
                return this.registrationStatsCollector.logEvent(types.ProductionStatsEventScreen.FLOATING_ONE_TAP, {
                    event_type: "no_user_button_tap",
                    fields: this.getFields()
                });
            }
        }
    ]);
    return FloatingOneTapStatsCollector;
}();

exports.FloatingOneTapStatsCollector = FloatingOneTapStatsCollector;
