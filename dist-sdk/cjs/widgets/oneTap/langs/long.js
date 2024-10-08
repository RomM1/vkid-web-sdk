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
var SIGN_IN_LONG = (_obj = {}, _define_property(_obj, types.Languages.RUS, "Войти c VK ID"), _define_property(_obj, types.Languages.UKR, "Увійти з VK ID"), _define_property(_obj, types.Languages.BEL, "Увайсці з VК ID"), _define_property(_obj, types.Languages.KAZ, "VK ID арқылы кіру"), _define_property(_obj, types.Languages.UZB, "VK ID dan kirish"), _define_property(_obj, types.Languages.ENG, "Sign in with VK ID"), _define_property(_obj, types.Languages.SPA, "Iniciar sesi\xf3n con VK ID"), _define_property(_obj, types.Languages.GERMAN, "Mit VK-ID anmelden"), _define_property(_obj, types.Languages.POL, "Wejdź z VK ID"), _define_property(_obj, types.Languages.FRA, "Se connecter avec VK ID"), _define_property(_obj, types.Languages.TURKEY, "VK ID aracılığıyla gir"), _obj);
var _obj1;
var SIGN_UP_LONG = (_obj1 = {}, _define_property(_obj1, types.Languages.RUS, "Записаться с VK ID"), _define_property(_obj1, types.Languages.UKR, "Записатися з VK ID"), _define_property(_obj1, types.Languages.BEL, "Запісацца з VK ID"), _define_property(_obj1, types.Languages.KAZ, "VK ID арқылы жазылу"), _define_property(_obj1, types.Languages.UZB, "VK ID bilan yozilish"), _define_property(_obj1, types.Languages.ENG, "Sign up with VK ID"), _define_property(_obj1, types.Languages.SPA, "Registrarse con VK ID"), _define_property(_obj1, types.Languages.GERMAN, "Mit VK ID anmelden"), _define_property(_obj1, types.Languages.POL, "Zapisz się z VK ID"), _define_property(_obj1, types.Languages.FRA, "Prendre RDV avec VK ID"), _define_property(_obj1, types.Languages.TURKEY, "VK ID ile kaydol"), _obj1);
var _obj2;
var GET_LONG = (_obj2 = {}, _define_property(_obj2, types.Languages.RUS, "Получить с VK ID"), _define_property(_obj2, types.Languages.UKR, "Отримати з VK ID"), _define_property(_obj2, types.Languages.BEL, "Атрымаць з VK ID"), _define_property(_obj2, types.Languages.KAZ, "VK ID арқылы алу"), _define_property(_obj2, types.Languages.UZB, "VK ID bilan olish"), _define_property(_obj2, types.Languages.ENG, "Get with VK ID"), _define_property(_obj2, types.Languages.SPA, "Obtener con VK ID"), _define_property(_obj2, types.Languages.GERMAN, "Mit VK ID erhalten"), _define_property(_obj2, types.Languages.POL, "Otrzymaj z VK ID"), _define_property(_obj2, types.Languages.FRA, "Obtenir avec VK ID"), _define_property(_obj2, types.Languages.TURKEY, "VK ID ile al"), _obj2);
var _obj3;
var OPEN_LONG = (_obj3 = {}, _define_property(_obj3, types.Languages.RUS, "Открыть с VK ID"), _define_property(_obj3, types.Languages.UKR, "Відкрити з VK ID"), _define_property(_obj3, types.Languages.BEL, "Адкрыць з VK ID"), _define_property(_obj3, types.Languages.KAZ, "VK ID арқылы ашу"), _define_property(_obj3, types.Languages.UZB, "VK ID bilan ochish"), _define_property(_obj3, types.Languages.ENG, "Open with VK ID"), _define_property(_obj3, types.Languages.SPA, "Abrir con VK ID"), _define_property(_obj3, types.Languages.GERMAN, "Mit VK ID \xf6ffnen"), _define_property(_obj3, types.Languages.POL, "Otw\xf3rz z VK ID"), _define_property(_obj3, types.Languages.FRA, "Ouvrir avec VK ID"), _define_property(_obj3, types.Languages.TURKEY, "VK ID ile a\xe7"), _obj3);
var _obj4;
var CALCULATE_LONG = (_obj4 = {}, _define_property(_obj4, types.Languages.RUS, "Рассчитать с VK ID"), _define_property(_obj4, types.Languages.UKR, "Розрахувати з VK ID"), _define_property(_obj4, types.Languages.BEL, "Разлічыць з VK ID"), _define_property(_obj4, types.Languages.KAZ, "VK ID арқылы есептеу"), _define_property(_obj4, types.Languages.UZB, "VK ID yordamida hisoblash"), _define_property(_obj4, types.Languages.ENG, "Calculate with VK ID"), _define_property(_obj4, types.Languages.SPA, "Calcular con VK ID"), _define_property(_obj4, types.Languages.GERMAN, "Mit VK ID berechnen"), _define_property(_obj4, types.Languages.POL, "Oblicz z VK ID"), _define_property(_obj4, types.Languages.FRA, "Calculer avec VK ID"), _define_property(_obj4, types.Languages.TURKEY, "VK ID ile hesapla"), _obj4);
var _obj5;
var ORDER_LONG = (_obj5 = {}, _define_property(_obj5, types.Languages.RUS, "Заказать с VK ID"), _define_property(_obj5, types.Languages.UKR, "Замовити з VK ID"), _define_property(_obj5, types.Languages.BEL, "Заказаць з VK ID"), _define_property(_obj5, types.Languages.KAZ, "VK ID арқылы тапсырыс беру"), _define_property(_obj5, types.Languages.UZB, "VK ID bilan buyurtma berish"), _define_property(_obj5, types.Languages.ENG, "Order with VK ID"), _define_property(_obj5, types.Languages.SPA, "Pedir con VK ID"), _define_property(_obj5, types.Languages.GERMAN, "Mit VK ID bestellen"), _define_property(_obj5, types.Languages.POL, "Zam\xf3w z VK ID"), _define_property(_obj5, types.Languages.FRA, "Commander avec VK ID"), _define_property(_obj5, types.Languages.TURKEY, "VK ID ile sipariş ver"), _obj5);
var _obj6;
var PLACE_ORDER_LONG = (_obj6 = {}, _define_property(_obj6, types.Languages.RUS, "Оформить с VK ID"), _define_property(_obj6, types.Languages.UKR, "Оформити з VK ID"), _define_property(_obj6, types.Languages.BEL, "Аформіць з VK ID"), _define_property(_obj6, types.Languages.KAZ, "VK ID арқылы рәсімдеу"), _define_property(_obj6, types.Languages.UZB, "VK ID bilan shakllantirish"), _define_property(_obj6, types.Languages.ENG, "Order with VK ID"), _define_property(_obj6, types.Languages.SPA, "Pedir con VK ID"), _define_property(_obj6, types.Languages.GERMAN, "Mit VK ID Bestellung aufgeben"), _define_property(_obj6, types.Languages.POL, "Wypełnij z VK ID"), _define_property(_obj6, types.Languages.FRA, "Commander avec VK ID"), _define_property(_obj6, types.Languages.TURKEY, "VK ID ile yap"), _obj6);
var _obj7;
var SUBMIT_REQUEST_LONG = (_obj7 = {}, _define_property(_obj7, types.Languages.RUS, "Оставить заявку с VK ID"), _define_property(_obj7, types.Languages.UKR, "Залишити запит з VK ID"), _define_property(_obj7, types.Languages.BEL, "Пакінуць заяўку з VK ID"), _define_property(_obj7, types.Languages.KAZ, "VK ID арқылы өтінім қалдыру"), _define_property(_obj7, types.Languages.UZB, "VK ID bilan talabnoma qoldirish"), _define_property(_obj7, types.Languages.ENG, "Send request with VK ID"), _define_property(_obj7, types.Languages.SPA, "Enviar solicitud con VK ID"), _define_property(_obj7, types.Languages.GERMAN, "Mit VK ID Anfrage stellen"), _define_property(_obj7, types.Languages.POL, "Zostaw wniosek z VK ID"), _define_property(_obj7, types.Languages.FRA, "Envoyer demande avec VK ID"), _define_property(_obj7, types.Languages.TURKEY, "VK ID ile başvuru yap"), _obj7);
var _obj8;
var PARTICIPATE_LONG = (_obj8 = {}, _define_property(_obj8, types.Languages.RUS, "Участвовать с VK ID"), _define_property(_obj8, types.Languages.UKR, "Брати участь з VK ID"), _define_property(_obj8, types.Languages.BEL, "Удзельнічаць з VK ID"), _define_property(_obj8, types.Languages.KAZ, "VK ID арқылы қатысу"), _define_property(_obj8, types.Languages.UZB, "VK ID ilan ishtirok etish"), _define_property(_obj8, types.Languages.ENG, "Participate with VK ID"), _define_property(_obj8, types.Languages.SPA, "Participar con VK ID"), _define_property(_obj8, types.Languages.GERMAN, "Mit VK ID teilnehmen"), _define_property(_obj8, types.Languages.POL, "Uczestnicz z VK ID"), _define_property(_obj8, types.Languages.FRA, "Participer avec VK ID"), _define_property(_obj8, types.Languages.TURKEY, "VK ID ile katıl"), _obj8);
var _obj9;
var texts = (_obj9 = {}, _define_property(_obj9, types$1.OneTapContentId.SIGN_IN, SIGN_IN_LONG), _define_property(_obj9, types$1.OneTapContentId.SIGN_UP, SIGN_UP_LONG), _define_property(_obj9, types$1.OneTapContentId.GET, GET_LONG), _define_property(_obj9, types$1.OneTapContentId.OPEN, OPEN_LONG), _define_property(_obj9, types$1.OneTapContentId.CALCULATE, CALCULATE_LONG), _define_property(_obj9, types$1.OneTapContentId.ORDER, ORDER_LONG), _define_property(_obj9, types$1.OneTapContentId.PLACE_ORDER, PLACE_ORDER_LONG), _define_property(_obj9, types$1.OneTapContentId.SUBMIT_REQUEST, SUBMIT_REQUEST_LONG), _define_property(_obj9, types$1.OneTapContentId.PARTICIPATE, PARTICIPATE_LONG), _obj9);
var getLongLang = function(contentId, lang) {
    var content = texts[contentId] || texts[types$1.OneTapContentId.SIGN_IN];
    return content[lang] || content[types.Languages.RUS];
};

exports.getLongLang = getLongLang;
