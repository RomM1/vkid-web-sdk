'use strict';

var types = require('../../../types.js');
var types$1 = require('../types.js');

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
var SIGN_IN = (_obj = {}, _define_property(_obj, types.Languages.RUS, "Войти c VK ID"), _define_property(_obj, types.Languages.UKR, "Увійти з VK ID"), _define_property(_obj, types.Languages.BEL, "Увайсці з VK ID"), _define_property(_obj, types.Languages.KAZ, "VK ID арқылы кіру"), _define_property(_obj, types.Languages.UZB, "VK ID yordamida kirish"), _define_property(_obj, types.Languages.ENG, "Sign in with VK ID"), _define_property(_obj, types.Languages.SPA, "Iniciar sesi\xf3n con VK ID"), _define_property(_obj, types.Languages.GERMAN, "Mit VK-ID anmelden"), _define_property(_obj, types.Languages.POL, "Wejdź z VK ID"), _define_property(_obj, types.Languages.FRA, "Se connecter avec VK ID"), _define_property(_obj, types.Languages.TURKEY, "VK ID aracılığıyla gir"), _obj);
var _obj1;
var MAKE_ORDER = (_obj1 = {}, _define_property(_obj1, types.Languages.RUS, "Оформить с VK ID"), _define_property(_obj1, types.Languages.UKR, "Оформити з VK ID"), _define_property(_obj1, types.Languages.BEL, "Аформіць з VK ID"), _define_property(_obj1, types.Languages.KAZ, "VK ID арқылы рәсімдеу"), _define_property(_obj1, types.Languages.UZB, "VK ID yordamida shakllantirish"), _define_property(_obj1, types.Languages.ENG, "Order with VK ID"), _define_property(_obj1, types.Languages.SPA, "Pedir con VK ID"), _define_property(_obj1, types.Languages.GERMAN, "Mit VK-ID bestellen"), _define_property(_obj1, types.Languages.POL, "Wypełnij z VK ID"), _define_property(_obj1, types.Languages.FRA, "Commander avec VK ID"), _define_property(_obj1, types.Languages.TURKEY, "VK ID aracılığıyla oluştur"), _obj1);
var _obj2;
var CONTINUE = (_obj2 = {}, _define_property(_obj2, types.Languages.RUS, "Продолжить с VK ID"), _define_property(_obj2, types.Languages.UKR, "Продовжити з VK ID"), _define_property(_obj2, types.Languages.BEL, "Працягнуць з VK ID"), _define_property(_obj2, types.Languages.KAZ, "VK ID арқылы жалғастыру"), _define_property(_obj2, types.Languages.UZB, "VK ID bilan davom etish"), _define_property(_obj2, types.Languages.ENG, "Continue with VK ID"), _define_property(_obj2, types.Languages.SPA, "Continuar con VK ID"), _define_property(_obj2, types.Languages.GERMAN, "Mit VK ID fortfahren"), _define_property(_obj2, types.Languages.POL, "Kontynuuj z VK ID"), _define_property(_obj2, types.Languages.FRA, "Continuer avec VK ID"), _define_property(_obj2, types.Languages.TURKEY, "VK ID ile devam et"), _obj2);
var getButtonLang = function(contentId, lang) {
    switch(contentId){
        case types$1.FloatingOneTapContentId.SIGN_IN_TO_SERVICE:
        case types$1.FloatingOneTapContentId.SIGN_IN_TO_ACCOUNT:
        case types$1.FloatingOneTapContentId.REGISTRATION_FOR_EVENT:
        case types$1.FloatingOneTapContentId.SUBMIT_APPLICATIONS:
            return SIGN_IN[lang] || SIGN_IN[types.Languages.RUS];
        case types$1.FloatingOneTapContentId.MAKE_ORDER_WITH_SERVICE:
        case types$1.FloatingOneTapContentId.MAKE_ORDER_WITHOUT_SERVICE:
            return MAKE_ORDER[lang] || MAKE_ORDER[types.Languages.RUS];
        case types$1.FloatingOneTapContentId.FAST_REGISTRATION:
            return CONTINUE[lang] || CONTINUE[types.Languages.RUS];
        default:
            return SIGN_IN[types.Languages.RUS];
    }
};

exports.getButtonLang = getButtonLang;
