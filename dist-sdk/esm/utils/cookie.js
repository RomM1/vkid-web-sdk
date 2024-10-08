import { nanoid } from './../lib/nanoid/non-secure/index.js';
import { COOKIE_EXPIRES_TIME_15_MIN } from '../constants.js';

function getCookie(name) {
    try {
        let matches = document.cookie.match(new RegExp('(?:^|; )' + ('vkid_sdk:' + name).replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + '=([^;]*)'));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    } catch (e) {
        return undefined;
    }
}
function setCookie(name, params) {
    try {
        const expireTime = new Date(new Date().getTime() + (params.expires || COOKIE_EXPIRES_TIME_15_MIN)).toUTCString();
        const allowedDomain = location.host.split('.').slice(-2).join('.');
        document.cookie = [
            `vkid_sdk:${name}=${encodeURIComponent(params.value || '')}`,
            `expires=${expireTime}`,
            'path=/',
            `domain=.${allowedDomain}`,
            'SameSite=Strict',
            'Secure'
        ].join('; ');
    } catch (e) {}
}
function clearCookie(name) {
    const allowedDomain = location.host.split('.').slice(-2).join('.');
    try {
        document.cookie = [
            `vkid_sdk:${name}=`,
            'expires=Thu, 01 Jan 1970 00:00:00 UTC',
            'path=/',
            'SameSite=Strict',
            'Secure',
            `domain=.${allowedDomain}`
        ].join('; ');
    } catch (e) {}
}
function cookie(name, params) {
    if (params.value) {
        setCookie(name, params);
        return params.value;
    }
    let value;
    value = getCookie(name);
    if (!value) {
        value = nanoid(48);
        setCookie(name, {
            ...params,
            value
        });
    }
    return value;
}
const state = (value)=>cookie('state', {
        value
    });
const codeVerifier = (value)=>cookie('codeVerifier', {
        value
    });
const clearStateCookie = ()=>clearCookie('state');
const clearCodeVerifierCookie = ()=>clearCookie('codeVerifier');
const COOKIE_EXPIRES_TIME_1_YEAR = 31_536_000_000;
function setExtIdCookie(value) {
    if (!value) {
        return;
    }
    try {
        const expireTime = new Date(new Date().getTime() + COOKIE_EXPIRES_TIME_1_YEAR).toUTCString();
        const allowedDomain = location.host.split('.').slice(-2).join('.');
        document.cookie = [
            `vkidExtId=${encodeURIComponent(value || '')}`,
            `expires=${expireTime}`,
            'path=/',
            `domain=.${allowedDomain}`,
            'SameSite=Strict',
            'Secure'
        ].join('; ');
    } catch (e) {}
}

export { clearCodeVerifierCookie, clearStateCookie, codeVerifier, cookie, setExtIdCookie, state };
