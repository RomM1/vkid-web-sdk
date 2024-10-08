'use strict';

var types = require('../../types.js');
var types$1 = require('./types.js');

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
var linkTextLang = (_obj = {}, _define_property(_obj, types.Languages.RUS, "или войти через VK\xa0ID\xa0с использованием данных из\xa0сервиса"), _define_property(_obj, types.Languages.UKR, "або увійти через VK\xa0ID\xa0з використанням даних із\xa0сервісу"), _define_property(_obj, types.Languages.BEL, "ці ўвайсці праз VK\xa0ID\xa0з выкарыстаннем даных з\xa0сэрвісу"), _define_property(_obj, types.Languages.KAZ, "сервистегі деректерді пайдаланып VK\xa0ID арқылы кіру"), _define_property(_obj, types.Languages.UZB, "yoki xizmatning\xa0maʼlumotlaridan\xa0foydalangan holda VK\xa0ID\xa0orqali kirish"), _define_property(_obj, types.Languages.ENG, "or\xa0sign\xa0in with VK\xa0ID\xa0using information from a\xa0service"), _define_property(_obj, types.Languages.SPA, "o\xa0iniciar sesi\xf3n con\xa0VK\xa0ID utilizando la informaci\xf3n de\xa0un\xa0servicio"), _define_property(_obj, types.Languages.GERMAN, "oder melden Sie sich mit\xa0Ihrer\xa0VK-ID an, indem Sie Informationen aus dem\xa0Dienst verwenden"), _define_property(_obj, types.Languages.POL, "lub wejdź poprzez VK\xa0ID\xa0przy użyciu danych z\xa0serwisu"), _define_property(_obj, types.Languages.FRA, "ou se connecter avec VK\xa0ID\xa0en utilisant les\xa0informations d'un\xa0service"), _define_property(_obj, types.Languages.TURKEY, "Ya\xa0da hizmetteki verileri kullanarak\xa0VK\xa0ID hizmeti yardımıyla gir"), _obj);
var _obj1, _obj2;
var singleButtonText = (_obj2 = {}, _define_property(_obj2, types.Languages.RUS, (_obj1 = {}, _define_property(_obj1, types$1.OAuthName.OK, "Войти через OK"), _define_property(_obj1, types$1.OAuthName.MAIL, "Войти с Почтой Mail"), _define_property(_obj1, types$1.OAuthName.VK, "Войти с VK ID"), _obj1)), _define_property(_obj2, types.Languages.UKR, "Увійти з {provider}"), _define_property(_obj2, types.Languages.BEL, "Увайсці з {provider}"), _define_property(_obj2, types.Languages.KAZ, "{provider} кіру"), _define_property(_obj2, types.Languages.UZB, "{provider} orqali kirish"), _define_property(_obj2, types.Languages.ENG, "Sign in with {provider}"), _define_property(_obj2, types.Languages.SPA, "Iniciar sesi\xf3n con {provider}"), _define_property(_obj2, types.Languages.GERMAN, "Mit {provider} anmelden"), _define_property(_obj2, types.Languages.POL, "Zaloguj się z {provider}"), _define_property(_obj2, types.Languages.FRA, "Se connecter avec {provider}"), _define_property(_obj2, types.Languages.TURKEY, "{provider}'den gir"), _obj2);

exports.linkTextLang = linkTextLang;
exports.singleButtonText = singleButtonText;
