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
var SIGN_IN_TO_SERVICE = (_obj = {}, _define_property(_obj, types.Languages.RUS, "Войдите в\xa0сервис или\xa0зарегистрируйтесь"), _define_property(_obj, types.Languages.UKR, "Увійдіть у\xa0сервіс або\xa0зареєструйтеся"), _define_property(_obj, types.Languages.BEL, "Увайдзіце ў\xa0сэрвіс ці\xa0зарэгіструйцеся"), _define_property(_obj, types.Languages.KAZ, "Сервиске кіріңіз немесе тіркеліңіз"), _define_property(_obj, types.Languages.UZB, "Xizmatga\xa0kiring va\xa0ro‘yxatdan o‘ting"), _define_property(_obj, types.Languages.ENG, "Sign in to\xa0service or\xa0sign up"), _define_property(_obj, types.Languages.SPA, "Acceder al\xa0servicio o\xa0registrarse"), _define_property(_obj, types.Languages.GERMAN, "Melden Sie sich beim\xa0Dienst\xa0an oder registrieren Sie\xa0sich"), _define_property(_obj, types.Languages.POL, "Wejdź do\xa0serwisu lub\xa0zarejestruj się"), _define_property(_obj, types.Languages.FRA, "Connectez-vous au\xa0service ou\xa0inscrivez-vous"), _define_property(_obj, types.Languages.TURKEY, "Hizmete\xa0girin yada\xa0oturum oluşturun"), _obj);
var _obj1;
var SIGN_IN_TO_ACCOUNT = (_obj1 = {}, _define_property(_obj1, types.Languages.RUS, "Войдите в учётную запись {service}"), _define_property(_obj1, types.Languages.UKR, "Увійдіть в обліковий запис {service}"), _define_property(_obj1, types.Languages.BEL, "Увайдзіце ва ўліковы запіс {service}"), _define_property(_obj1, types.Languages.KAZ, "{service} есептік жазбасына кіріңіз"), _define_property(_obj1, types.Languages.UZB, "{service} hisobiga kiring"), _define_property(_obj1, types.Languages.ENG, "Sign in to\xa0{service} account"), _define_property(_obj1, types.Languages.SPA, "Acceder a la cuenta\xa0{service}"), _define_property(_obj1, types.Languages.GERMAN, "Melden Sie sich bei Ihrem\xa0{service}-Konto an"), _define_property(_obj1, types.Languages.POL, "Wejdź na rachunek {service}"), _define_property(_obj1, types.Languages.FRA, "Connectez-vous \xe0\xa0{service}"), _define_property(_obj1, types.Languages.TURKEY, "{service} hesabına girin"), _obj1);
var _obj2;
var REGISTRATION_FOR_EVENT = (_obj2 = {}, _define_property(_obj2, types.Languages.RUS, "Зарегистрируйтесь на\xa0мероприятие"), _define_property(_obj2, types.Languages.UKR, "Зареєструйтеся на\xa0захід"), _define_property(_obj2, types.Languages.BEL, "Зарэгіструйцеся на\xa0мерапрыемства"), _define_property(_obj2, types.Languages.KAZ, "Шараға тіркеліңіз"), _define_property(_obj2, types.Languages.UZB, "Tadbirda\xa0ro‘yxatdan o‘ting"), _define_property(_obj2, types.Languages.ENG, "Sign up for\xa0event"), _define_property(_obj2, types.Languages.SPA, "Registrarse en\xa0el\xa0evento"), _define_property(_obj2, types.Languages.GERMAN, "Melden\xa0Sie\xa0sich f\xfcr\xa0die\xa0Veranstaltung\xa0an"), _define_property(_obj2, types.Languages.POL, "Zarejestruj się na\xa0wydarzenie"), _define_property(_obj2, types.Languages.FRA, "Inscrivez-vous \xe0\xa0l'\xe9v\xe9nement"), _define_property(_obj2, types.Languages.TURKEY, "Eylemde\xa0kaydolun"), _obj2);
var _obj3;
var SUBMIT_APPLICATIONS = (_obj3 = {}, _define_property(_obj3, types.Languages.RUS, "Подайте заявку с\xa0VK\xa0ID"), _define_property(_obj3, types.Languages.UKR, "Подайте запит з\xa0VK\xa0ID"), _define_property(_obj3, types.Languages.BEL, "Падайце заяўку з\xa0VK\xa0ID"), _define_property(_obj3, types.Languages.KAZ, "VK\xa0ID арқылы тапсырыс жасаңыз"), _define_property(_obj3, types.Languages.UZB, "VK\xa0ID\xa0yordamida talabnoma berish"), _define_property(_obj3, types.Languages.ENG, "Apply with\xa0VK\xa0ID"), _define_property(_obj3, types.Languages.SPA, "Solicitar con\xa0VK\xa0ID"), _define_property(_obj3, types.Languages.GERMAN, "Bewerben Sie mit\xa0VK-ID"), _define_property(_obj3, types.Languages.POL, "Zł\xf3ż wniosek z\xa0VK\xa0ID"), _define_property(_obj3, types.Languages.FRA, "Envoyez une\xa0demande avec\xa0VK\xa0ID"), _define_property(_obj3, types.Languages.TURKEY, "VK\xa0ID\xa0yardımıyla başvuru g\xf6nderin"), _obj3);
var _obj4;
var MAKE_ORDER_WITH_SERVICE = (_obj4 = {}, _define_property(_obj4, types.Languages.RUS, "Оформите заказ в\xa0{service} с\xa0VK\xa0ID"), _define_property(_obj4, types.Languages.UKR, "Оформіть замовлення в\xa0{service} з\xa0VK\xa0ID"), _define_property(_obj4, types.Languages.BEL, "Аформіце заказ у\xa0{service} з\xa0VK\xa0ID"), _define_property(_obj4, types.Languages.KAZ, "{service} сервисінде \xa0VK\xa0ID арқылы тапсырыс жасаңыз"), _define_property(_obj4, types.Languages.UZB, "VK\xa0ID\xa0orqali {service}\xa0da buyurtma\xa0shakllantirish"), _define_property(_obj4, types.Languages.ENG, "Place order on\xa0{service} with\xa0VK\xa0ID"), _define_property(_obj4, types.Languages.SPA, "Realizar pedido en\xa0{service} con\xa0VK\xa0ID"), _define_property(_obj4, types.Languages.GERMAN, "Machen Sie eine\xa0Bestellung auf\xa0{service} mit\xa0VK-ID"), _define_property(_obj4, types.Languages.POL, "Wypełnij zam\xf3wienie w\xa0{service} z\xa0VK\xa0ID"), _define_property(_obj4, types.Languages.FRA, "Passez la\xa0commande sur\xa0{service} avec\xa0VK\xa0ID"), _define_property(_obj4, types.Languages.TURKEY, "VK\xa0ID\xa0aracılığıyla {service} te sipariş oluşturun"), _obj4);
var _obj5;
var MAKE_ORDER_WITHOUT_SERVICE = (_obj5 = {}, _define_property(_obj5, types.Languages.RUS, "Оформите заказ с\xa0VK\xa0ID"), _define_property(_obj5, types.Languages.UKR, "Оформіть замовлення з\xa0VK\xa0ID"), _define_property(_obj5, types.Languages.BEL, "Аформіце заказ з\xa0VK\xa0ID"), _define_property(_obj5, types.Languages.KAZ, "VK\xa0ID арқылы тапсырыс жасаңыз"), _define_property(_obj5, types.Languages.UZB, "VK\xa0ID\xa0orqali buyurtmani shakllantirish"), _define_property(_obj5, types.Languages.ENG, "Place order with\xa0VK\xa0ID"), _define_property(_obj5, types.Languages.SPA, "Realizar pedido con\xa0VK\xa0ID"), _define_property(_obj5, types.Languages.GERMAN, "Machen Sie eine\xa0Bestellung mit\xa0VK-ID"), _define_property(_obj5, types.Languages.POL, "Wypełnij zam\xf3wienie z\xa0VK\xa0ID"), _define_property(_obj5, types.Languages.FRA, "Passez la\xa0commande avec\xa0VK\xa0ID"), _define_property(_obj5, types.Languages.TURKEY, "VK\xa0ID\xa0aracılığıyla sipariş oluşturun"), _obj5);
var _obj6;
var FAST_REGISTRATION = (_obj6 = {}, _define_property(_obj6, types.Languages.RUS, "Быстрая регистрация\nв\xa0{service}"), _define_property(_obj6, types.Languages.UKR, "Швидка реєстрація в\xa0{service}"), _define_property(_obj6, types.Languages.BEL, "Хуткая рэгістрацыя ў\xa0{service}"), _define_property(_obj6, types.Languages.KAZ, "{service} сервисіне тез тіркелу"), _define_property(_obj6, types.Languages.UZB, "{service}\xa0da tezkor ro‘yxatdan o‘tish"), _define_property(_obj6, types.Languages.ENG, "Quick sign-up with\xa0{service}"), _define_property(_obj6, types.Languages.SPA, "Registro r\xe1pido con\xa0{service}"), _define_property(_obj6, types.Languages.GERMAN, "Schnelle Registrierung bei\xa0{service}"), _define_property(_obj6, types.Languages.POL, "Szybka rejestracja w\xa0{service}"), _define_property(_obj6, types.Languages.FRA, "Inscription rapide avec\xa0{service}"), _define_property(_obj6, types.Languages.TURKEY, "{service}'te\xa0hızlı oturum a\xe7ma"), _obj6);
var getTitleLang = function(contentId, lang, appName) {
    var result = SIGN_IN_TO_SERVICE[types.Languages.RUS];
    switch(contentId){
        case types$1.FloatingOneTapContentId.SIGN_IN_TO_SERVICE:
            result = SIGN_IN_TO_SERVICE[lang];
            break;
        case types$1.FloatingOneTapContentId.SIGN_IN_TO_ACCOUNT:
            result = SIGN_IN_TO_ACCOUNT[lang];
            break;
        case types$1.FloatingOneTapContentId.REGISTRATION_FOR_EVENT:
            result = REGISTRATION_FOR_EVENT[lang];
            break;
        case types$1.FloatingOneTapContentId.SUBMIT_APPLICATIONS:
            result = SUBMIT_APPLICATIONS[lang];
            break;
        case types$1.FloatingOneTapContentId.MAKE_ORDER_WITH_SERVICE:
            result = MAKE_ORDER_WITH_SERVICE[lang];
            break;
        case types$1.FloatingOneTapContentId.MAKE_ORDER_WITHOUT_SERVICE:
            result = MAKE_ORDER_WITHOUT_SERVICE[lang];
            break;
        case types$1.FloatingOneTapContentId.FAST_REGISTRATION:
            result = FAST_REGISTRATION[lang];
            break;
    }
    return result.replace("{service}", appName);
};

exports.getTitleLang = getTitleLang;
