import { AuthStatsFlowSource } from '../../auth/types.js';
import { ProductionStatsEventScreen } from '../../core/analytics/types.js';
import '../../core/config/config.js';
import { ConfigAuthMode } from '../../core/config/types.js';
import { validator } from '../../core/validator/validator.js';
import { isNotEmptyOAuthList } from '../../core/validator/rules.js';
import { Widget } from '../../core/widget/widget.js';
import { WidgetEvents } from '../../core/widget/events.js';
import { WidgetState, WidgetErrorCode } from '../../core/widget/types.js';
import { Languages, Scheme } from '../../types.js';
import { OAuthListStatsCollector } from './analytics/OAuthListStatsCollector.js';
import { MultibrandingStatsProviders } from './analytics/types.js';
import { OAuthListInternalEvents } from './events.js';
import { getOAuthListTemplate } from './template.js';
import { OAuthName } from './types.js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class OAuthList extends Widget {
    analytics;
    providers;
    flowSource;
    uniqueSessionId;
    constructor(){
        super();
        this.analytics = new OAuthListStatsCollector(this.config);
    }
    sendStartAnalytics() {
        const providers = new Set(this.providers);
        this.analytics.sendMultibrandingOauthAdded({
            screen: this.flowSource,
            fields: [
                {
                    name: MultibrandingStatsProviders.VK,
                    value: (+providers.has(OAuthName.VK)).toString()
                },
                {
                    name: MultibrandingStatsProviders.OK,
                    value: (+providers.has(OAuthName.OK)).toString()
                },
                {
                    name: MultibrandingStatsProviders.MAIL,
                    value: (+providers.has(OAuthName.MAIL)).toString()
                }
            ]
        });
        if (providers.has(OAuthName.VK)) {
            this.analytics.sendVkButtonShow({
                screen: this.flowSource,
                isIcon: providers.size > 1
            });
        }
        if (providers.has(OAuthName.OK)) {
            this.analytics.sendOkButtonShow({
                screen: this.flowSource,
                isIcon: providers.size > 1
            });
        }
        if (providers.has(OAuthName.MAIL)) {
            this.analytics.sendMailButtonShow({
                screen: this.flowSource,
                isIcon: providers.size > 1
            });
        }
    }
    render(params) {
        this.lang = params?.lang || Languages.RUS;
        this.scheme = params?.scheme || Scheme.LIGHT;
        this.providers = params.oauthList;
        this.flowSource = params?.flowSource || ProductionStatsEventScreen.MULTIBRANDING;
        this.uniqueSessionId = params?.uniqueSessionId || this.id;
        this.analytics.setUniqueSessionId(this.uniqueSessionId);
        this.templateRenderer = getOAuthListTemplate({
            lang: this.lang,
            oauthList: params.oauthList,
            height: params.styles?.height,
            borderRadius: params.styles?.borderRadius,
            scheme: this.scheme
        });
        this.container = params.container;
        this.renderTemplate();
        this.registerElements();
        this.setState(WidgetState.LOADED);
        this.sendStartAnalytics();
        this.elements.root.addEventListener('click', this.handleClick.bind(this));
        return this;
    }
    handleClick(e) {
        const target = e.target.closest('[data-oauth]');
        if (!target) {
            return;
        }
        const oauth = target.getAttribute('data-oauth');
        const params = {
            lang: this.lang,
            scheme: this.scheme,
            provider: oauth,
            statsFlowSource: AuthStatsFlowSource.MULTIBRANDING,
            uniqueSessionId: this.uniqueSessionId
        };
        let sendProviderButtonTap;
        switch(oauth){
            case OAuthName.VK:
                sendProviderButtonTap = this.analytics.sendVkButtonTap.bind(this.analytics);
                break;
            case OAuthName.OK:
                sendProviderButtonTap = this.analytics.sendOkButtonTap.bind(this.analytics);
                break;
            case OAuthName.MAIL:
                sendProviderButtonTap = this.analytics.sendMailButtonTap.bind(this.analytics);
                break;
        }
        const openFullAuth = ()=>{
            OAuthList.auth.login(params).then((res)=>{
                this.events.emit(OAuthListInternalEvents.LOGIN_SUCCESS, res);
            }).catch((error)=>{
                this.events.emit(WidgetEvents.ERROR, {
                    code: WidgetErrorCode.AuthError,
                    text: error.error
                });
            });
        };
        const sendProviderButtonTapParams = {
            screen: this.flowSource,
            isIcon: this.providers.length > 1
        };
        if (this.config.get().mode === ConfigAuthMode.Redirect) {
            sendProviderButtonTap(sendProviderButtonTapParams).finally(openFullAuth);
        } else {
            void sendProviderButtonTap(sendProviderButtonTapParams);
            openFullAuth();
        }
    }
}
_ts_decorate([
    validator({
        oauthList: [
            isNotEmptyOAuthList
        ]
    })
], OAuthList.prototype, "render", null);

export { OAuthList };
