import './../lib/@vkontakte/vkjs/lib/es6/detections.js';
import { querystring } from './../lib/@vkontakte/vkjs/lib/es6/querystring.js';
import { AuthStatsCollector } from './analytics/AuthStatsCollector.js';
import { AuthDataService } from './authDataService.js';
import '../core/config/config.js';
import { ConfigResponseMode, Prompt, ConfigAuthMode } from '../core/config/types.js';
import { setExtIdCookie, clearStateCookie, codeVerifier, state, clearCodeVerifierCookie } from '../utils/cookie.js';
import { isDomainAllowed } from '../utils/domain.js';
import { generateCodeChallenge } from '../utils/oauth.js';
import { encodeStatsInfo, getVKIDUrl, getRedirectWithPayloadUrl } from '../utils/url/url.js';
import { uuid } from '../utils/uuid.js';
import '../widgets/oauthList/oauthList.js';
import { ExternalOAuthName } from '../widgets/oauthList/types.js';
import '../widgets/oauthList/events.js';
import { OAUTH2_RESPONSE, OAUTH2_RESPONSE_TYPE, AUTH_ERROR_TEXT } from './constants.js';
import { AuthStatsFlowSource, AuthErrorCode } from './types.js';

const CODE_CHALLENGE_METHOD = 's256';
class Auth {
    /**
   * @ignore
   */ static config;
    dataService;
    opener;
    interval;
    id = uuid();
    analytics;
    state;
    constructor(){
        this.analytics = new AuthStatsCollector(Auth.config);
    }
    close = ()=>{
        this.opener && this.opener.close();
    };
    handleMessage = ({ origin, source, data })=>{
        if (source !== this.opener || !this.opener || !isDomainAllowed(origin)) {
            return;
        }
        this.unsubscribe();
        if (data.payload.error) {
            this.dataService.sendAuthorizationFailed(data.payload.error);
            return;
        }
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        if (data.action === OAUTH2_RESPONSE + this.state) {
            if (this.state !== data.payload.state) {
                this.dataService.sendStateMismatchError();
            } else {
                setExtIdCookie(data.payload.ext_id);
                delete data.payload.ext_id;
                // Сбрасываем после проверки
                clearStateCookie();
                this.state = '';
                const { responseMode } = Auth.config.get();
                if (responseMode === ConfigResponseMode.Redirect) {
                    this.redirectWithPayload(data.payload);
                    this.close();
                } else {
                    this.dataService.sendSuccessData(data.payload);
                }
            }
            return;
        }
        this.dataService.sendEventNotSupported();
    };
    handleInterval = ()=>{
        if (this.opener?.closed) {
            this.unsubscribe();
            this.dataService.sendNewTabHasBeenClosed();
        }
    };
    subscribe = ()=>{
        this.interval = window.setInterval(this.handleInterval, 1000);
        window.addEventListener('message', this.handleMessage);
        this.dataService.removeCallback();
    };
    unsubscribe = ()=>{
        window.removeEventListener('message', this.handleMessage);
        clearInterval(this.interval);
        this.dataService.setCallback(this.close);
    };
    loginInNewTab = (url)=>{
        const opener = window.open(url, '_blank');
        return this.handleWindowOpen(opener);
    };
    loginInNewWindow = (url)=>{
        const width = 800;
        const height = 800;
        const top = screen.height / 2 - height / 2;
        const left = screen.width / 2 - width / 2;
        const windowFeatures = `top=${top},left=${left},width=${width},height=${height},location`;
        const opener = window.open(url, '_blank', windowFeatures);
        return this.handleWindowOpen(opener);
    };
    handleWindowOpen = (opener)=>{
        this.dataService = new AuthDataService();
        this.opener = opener;
        if (this.opener) {
            this.subscribe();
        } else {
            this.dataService.sendCannotCreateNewTab();
        }
        return this.dataService.value;
    };
    loginByRedirect = (url)=>{
        location.assign(url);
        return Promise.resolve();
    };
    login = (params)=>{
        const config = Auth.config.get();
        const { scope, app, codeChallenge, prompt } = config;
        const flowSource = params?.statsFlowSource || AuthStatsFlowSource.AUTH;
        const sessionId = params?.uniqueSessionId || this.id;
        if (flowSource === AuthStatsFlowSource.AUTH) {
            this.analytics.setUniqueSessionId(sessionId);
        }
        codeVerifier(config.codeVerifier);
        this.state = state(config.state);
        const authorizePrompt = [
            ...prompt
        ];
        // Если открыто из 3-в-1, добавляем login в начало
        const hasProvider = Object.values(ExternalOAuthName).includes(params?.provider);
        if (hasProvider) {
            authorizePrompt.unshift(Prompt.Login);
        }
        const queryParams = {
            lang_id: params?.lang,
            scheme: params?.scheme,
            code_challenge: codeChallenge || generateCodeChallenge(codeVerifier()),
            code_challenge_method: CODE_CHALLENGE_METHOD,
            client_id: app,
            response_type: OAUTH2_RESPONSE_TYPE,
            scope,
            state: this.state,
            provider: params?.provider,
            prompt: authorizePrompt.join(' ').trim(),
            stats_info: encodeStatsInfo({
                flow_source: flowSource,
                session_id: sessionId
            })
        };
        if (config.mode !== ConfigAuthMode.Redirect) {
            if (flowSource === AuthStatsFlowSource.AUTH) {
                void this.analytics.sendCustomAuthStart(params?.provider);
            }
            queryParams.origin = location.protocol + '//' + location.hostname;
        }
        let url = getVKIDUrl('authorize', queryParams, config);
        if (params?.screen) {
            Object.assign(queryParams, {
                oauth_version: 2,
                screen: params?.screen,
                redirect_state: this.state
            });
            url = getVKIDUrl('auth', queryParams, config);
        }
        switch(config.mode){
            case ConfigAuthMode.InNewWindow:
                return this.loginInNewWindow(url);
            case ConfigAuthMode.InNewTab:
                return this.loginInNewTab(url);
            default:
                {
                    if (flowSource === AuthStatsFlowSource.AUTH) {
                        return this.analytics.sendCustomAuthStart(params?.provider).finally(()=>{
                            void this.loginByRedirect(url);
                        });
                    }
                    return this.loginByRedirect(url);
                }
        }
    };
    checkState(stateToCheck) {
        if (this.state !== stateToCheck) {
            return {
                code: AuthErrorCode.StateMismatch,
                error: AUTH_ERROR_TEXT[AuthErrorCode.StateMismatch],
                state: stateToCheck
            };
        }
        clearStateCookie();
        this.state = '';
    }
    exchangeCode(code, deviceId) {
        const config = Auth.config.get();
        this.state = state(config.state);
        const queryParams = {
            grant_type: 'authorization_code',
            redirect_uri: config.redirectUrl,
            client_id: config.app,
            code_verifier: codeVerifier(),
            state: this.state,
            device_id: deviceId
        };
        const queryParamsString = querystring.stringify(queryParams);
        return fetch(`https://${config.__vkidDomain}/oauth2/auth?${queryParamsString}`, {
            method: 'POST',
            body: new URLSearchParams({
                code
            })
        }).then((res)=>this.oauthSectionFetchHandler(res)).then((res)=>{
            const checkStateError = this.checkState(res.state);
            if (checkStateError) {
                throw checkStateError;
            }
            // Сбрасываем динамические параметры после обмена кода
            clearCodeVerifierCookie();
            return res;
        });
    }
    refreshToken(refreshToken, deviceId) {
        const config = Auth.config.get();
        this.state = state(config.state);
        const queryParams = {
            grant_type: 'refresh_token',
            redirect_uri: config.redirectUrl,
            client_id: config.app,
            device_id: deviceId,
            state: this.state
        };
        const queryParamsString = querystring.stringify(queryParams);
        return fetch(`https://${config.__vkidDomain}/oauth2/auth?${queryParamsString}`, {
            method: 'POST',
            body: new URLSearchParams({
                refresh_token: refreshToken
            })
        }).then((res)=>this.oauthSectionFetchHandler(res)).then((res)=>{
            const checkStateError = this.checkState(res.state);
            if (checkStateError) {
                throw checkStateError;
            }
            Auth.config.update({
                state: config.state
            });
            return res;
        });
    }
    logout(accessToken) {
        const config = Auth.config.get();
        const queryParams = {
            client_id: config.app
        };
        const queryParamsString = querystring.stringify(queryParams);
        return fetch(`https://${config.__vkidDomain}/oauth2/logout?${queryParamsString}`, {
            method: 'POST',
            body: new URLSearchParams({
                access_token: accessToken
            })
        }).then((res)=>this.oauthSectionFetchHandler(res));
    }
    userInfo(accessToken) {
        const config = Auth.config.get();
        const queryParams = {
            client_id: config.app
        };
        const queryParamsString = querystring.stringify(queryParams);
        return fetch(`https://${config.__vkidDomain}/oauth2/user_info?${queryParamsString}`, {
            method: 'POST',
            body: new URLSearchParams({
                access_token: accessToken
            })
        }).then((res)=>this.oauthSectionFetchHandler(res));
    }
    publicInfo(idToken) {
        const config = Auth.config.get();
        const queryParams = {
            client_id: config.app
        };
        const queryParamsString = querystring.stringify(queryParams);
        return fetch(`https://${config.__vkidDomain}/oauth2/public_info?${queryParamsString}`, {
            method: 'POST',
            body: new URLSearchParams({
                id_token: idToken
            })
        }).then((res)=>this.oauthSectionFetchHandler(res));
    }
    oauthSectionFetchHandler(res) {
        return res.json().then((resJson)=>{
            if ('error' in resJson) {
                throw resJson;
            }
            return resJson;
        });
    }
    redirectWithPayload(payload) {
        location.assign(getRedirectWithPayloadUrl(payload, Auth.config));
    }
}

export { Auth };
