import { AuthStatsFlowSource } from '../../auth/types.js';
import { ProductionStatsEventScreen } from '../../core/analytics/types.js';
import '../../core/config/config.js';
import { ConfigAuthMode } from '../../core/config/types.js';
import { validator } from '../../core/validator/validator.js';
import { isRequired } from '../../core/validator/rules.js';
import { Widget } from '../../core/widget/widget.js';
import { WidgetEvents } from '../../core/widget/events.js';
import { WidgetState, WidgetErrorCode } from '../../core/widget/types.js';
import { Languages, Scheme } from '../../types.js';
import { OAuthList } from '../oauthList/oauthList.js';
import { OAuthName } from '../oauthList/types.js';
import { OAuthListInternalEvents } from '../oauthList/events.js';
import { FloatingOneTapStatsCollector } from './analytics/FloatingOneTapStatsCollector.js';
import { FloatingOneTapInternalEvents } from './events.js';
import { getFloatingOneTapTemplate } from './template.js';
import { FloatingOneTapContentId } from './types.js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const defaultIndent = {
    top: 12,
    right: 12,
    bottom: 12
};
class FloatingOneTap extends Widget {
    analytics;
    vkidAppName = 'floating_one_tap_auth';
    constructor(){
        super();
        this.analytics = new FloatingOneTapStatsCollector(FloatingOneTap.config);
    }
    sendSuccessLoginEvent = (params)=>{
        this.events.emit(FloatingOneTapInternalEvents.LOGIN_SUCCESS, params);
    };
    onBridgeMessageHandler(event) {
        switch(event.handler){
            case FloatingOneTapInternalEvents.SHOW_FULL_AUTH:
                {
                    const params = event.params;
                    const authParams = {};
                    if (params.screen) {
                        authParams.screen = params.screen;
                    }
                    if (params.sdk_oauth) {
                        authParams.provider = params.sdk_oauth;
                        authParams.statsFlowSource = AuthStatsFlowSource.MULTIBRANDING;
                    }
                    this.openFullAuth(authParams);
                    break;
                }
            case FloatingOneTapInternalEvents.NOT_AUTHORIZED:
                {
                    this.setState(WidgetState.NOT_LOADED);
                    setTimeout(()=>{
                        // Ожидает выполнение анимации и меняет ui
                        this.setState(WidgetState.LOADED);
                    }, 500);
                    clearTimeout(this.timeoutTimer);
                    break;
                }
            default:
                {
                    super.onBridgeMessageHandler(event);
                    break;
                }
        }
    }
    onErrorHandler(error) {
        this.analytics.sendIframeLoadingFailed();
        this.analytics.sendNoUserButtonShow();
        super.onErrorHandler(error);
    }
    openFullAuth(value) {
        this.events.emit(FloatingOneTapInternalEvents.SHOW_FULL_AUTH);
        const params = {
            statsFlowSource: AuthStatsFlowSource.FLOATING_ONE_TAP,
            ...value,
            uniqueSessionId: this.id,
            lang: this.lang,
            scheme: this.scheme
        };
        FloatingOneTap.auth.login(params).then(this.sendSuccessLoginEvent).catch((error)=>{
            this.events.emit(WidgetEvents.ERROR, {
                code: WidgetErrorCode.AuthError,
                text: error.error
            });
        });
    }
    login(value) {
        if (this.config.get().mode === ConfigAuthMode.Redirect) {
            this.analytics.sendNoUserButtonTap().finally(()=>{
                this.openFullAuth(value);
            });
        } else {
            void this.analytics.sendNoUserButtonTap();
            this.openFullAuth(value);
        }
    }
    renderOAuthList(params) {
        if (!params.oauthList.length) {
            return;
        }
        const oauthList = new OAuthList();
        oauthList.on(OAuthListInternalEvents.LOGIN_SUCCESS, this.sendSuccessLoginEvent).render({
            ...params,
            flowSource: ProductionStatsEventScreen.FLOATING_ONE_TAP,
            uniqueSessionId: this.id
        });
    }
    render(params) {
        this.lang = params?.lang || Languages.RUS;
        this.scheme = params?.scheme || Scheme.LIGHT;
        const providers = (params.oauthList || []).filter((provider)=>provider !== OAuthName.VK);
        const queryParams = {
            scheme: this.scheme,
            lang_id: this.lang,
            show_alternative_login: params?.showAlternativeLogin ? 1 : 0,
            content_id: params?.contentId || FloatingOneTapContentId.SIGN_IN_TO_SERVICE,
            providers: providers.join(','),
            uuid: this.id
        };
        this.analytics.setUniqueSessionId(this.id);
        this.templateRenderer = getFloatingOneTapTemplate({
            login: this.login.bind(this),
            close: this.close.bind(this),
            scheme: this.scheme,
            lang: this.lang,
            indent: Object.assign(defaultIndent, params.indent || {}),
            contentId: queryParams.content_id,
            appName: params.appName,
            renderOAuthList: this.renderOAuthList.bind(this),
            providers
        });
        this.analytics.sendScreenProceed({
            scheme: this.scheme,
            lang: this.lang,
            contentId: queryParams.content_id
        });
        if (params.fastAuthEnabled === false) {
            this.analytics.sendNoUserButtonShow();
            queryParams.fastAuthDisabled = true;
        }
        return super.render({
            container: document.body,
            ...queryParams
        });
    }
}
_ts_decorate([
    validator({
        appName: [
            isRequired
        ]
    })
], FloatingOneTap.prototype, "render", null);

export { FloatingOneTap };
