import { AuthStatsFlowSource } from '../../auth/types.js';
import { ProductionStatsEventScreen } from '../../core/analytics/types.js';
import '../../core/config/config.js';
import { ConfigAuthMode } from '../../core/config/types.js';
import { validator } from '../../core/validator/validator.js';
import { isValidHeight } from '../../core/validator/rules.js';
import { Widget } from '../../core/widget/widget.js';
import { WidgetEvents } from '../../core/widget/events.js';
import { WidgetState, WidgetErrorCode } from '../../core/widget/types.js';
import { Languages, Scheme } from '../../types.js';
import { isNullOrUndefined } from '../../utils/url/nullOrUndefined.js';
import { OAuthList } from '../oauthList/oauthList.js';
import { OAuthName } from '../oauthList/types.js';
import { OAuthListInternalEvents } from '../oauthList/events.js';
import { OneTapStatsCollector } from './analytics/OneTapStatsCollector.js';
import { OneTapInternalEvents } from './events.js';
import { getOneTapTemplate } from './template.js';
import { OneTapSkin, OneTapContentId } from './types.js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const defaultStylesParams = {
    width: 0,
    height: 44,
    borderRadius: 8
};
const BUTTON_SPACING = 12;
class OneTap extends Widget {
    analytics;
    vkidAppName = 'button_one_tap_auth';
    statsBtnType;
    fastAuthDisabled;
    constructor(){
        super();
        this.analytics = new OneTapStatsCollector(OneTap.config);
    }
    setStatsButtonType = (type)=>{
        if (!this.statsBtnType) {
            this.statsBtnType = type;
            if (this.fastAuthDisabled) {
                this.statsBtnType && this.analytics.sendOneTapButtonNoUserShow(this.statsBtnType);
            }
        }
    };
    sendSuccessLoginEvent = (params)=>{
        this.events.emit(OneTapInternalEvents.LOGIN_SUCCESS, params);
    };
    onBridgeMessageHandler(event) {
        switch(event.handler){
            case OneTapInternalEvents.SHOW_FULL_AUTH:
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
            case OneTapInternalEvents.NOT_AUTHORIZED:
                {
                    this.analytics.sendNoSessionFound();
                    this.setState(WidgetState.NOT_LOADED);
                    clearTimeout(this.timeoutTimer);
                    this.elements?.iframe?.remove();
                    break;
                }
            case OneTapInternalEvents.AUTHENTICATION_INFO:
                {
                    this.events.emit(OneTapInternalEvents.AUTHENTICATION_INFO, event.params);
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
        this.analytics.sendFrameLoadingFailed();
        this.analytics.sendOneTapButtonNoUserShow(this.statsBtnType);
        super.onErrorHandler(error);
    }
    openFullAuth(value) {
        const params = {
            statsFlowSource: AuthStatsFlowSource.BUTTON_ONE_TAP,
            ...value,
            uniqueSessionId: this.id,
            lang: this.lang,
            scheme: this.scheme
        };
        OneTap.auth.login(params).then(this.sendSuccessLoginEvent).catch((error)=>{
            this.events.emit(WidgetEvents.ERROR, {
                code: WidgetErrorCode.AuthError,
                text: error.error
            });
        });
    }
    login(value) {
        if (this.config.get().mode === ConfigAuthMode.Redirect) {
            this.analytics.sendOneTapButtonNoUserTap(this.statsBtnType).finally(()=>{
                this.openFullAuth(value);
            });
        } else {
            void this.analytics.sendOneTapButtonNoUserTap(this.statsBtnType);
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
            flowSource: ProductionStatsEventScreen.NOWHERE,
            uniqueSessionId: this.id
        });
    }
    render(params) {
        this.lang = params?.lang || Languages.RUS;
        this.scheme = params?.scheme || Scheme.LIGHT;
        this.fastAuthDisabled = params.fastAuthEnabled === false;
        const providers = (params.oauthList || []).filter((provider)=>provider !== OAuthName.VK);
        const oneTapParams = {
            style_height: params.styles?.height || defaultStylesParams.height,
            style_border_radius: !isNullOrUndefined(params.styles?.borderRadius) ? params.styles?.borderRadius : defaultStylesParams.borderRadius,
            show_alternative_login: params?.showAlternativeLogin ? 1 : 0,
            button_skin: params.skin || OneTapSkin.Primary,
            content_id: params?.contentId || OneTapContentId.SIGN_IN,
            scheme: this.scheme,
            lang_id: this.lang,
            providers: providers.join(','),
            uuid: this.id
        };
        this.analytics.setUniqueSessionId(this.id);
        this.templateRenderer = getOneTapTemplate({
            width: params.styles?.width || defaultStylesParams.width,
            iframeHeight: oneTapParams.show_alternative_login ? oneTapParams.style_height * 2 + BUTTON_SPACING : oneTapParams.style_height,
            height: oneTapParams.style_height,
            borderRadius: oneTapParams.style_border_radius,
            login: this.login.bind(this),
            skin: oneTapParams.button_skin,
            scheme: oneTapParams.scheme,
            lang: oneTapParams.lang_id,
            contentId: oneTapParams.content_id,
            renderOAuthList: this.renderOAuthList.bind(this),
            providers,
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
        return super.render({
            container: params.container,
            ...oneTapParams
        });
    }
}
_ts_decorate([
    validator({
        styles: [
            isValidHeight
        ]
    })
], OneTap.prototype, "render", null);

export { OneTap };
