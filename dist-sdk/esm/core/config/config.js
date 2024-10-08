import { LOGIN_DOMAIN, OAUTH_DOMAIN, VKID_DOMAIN } from '../../constants.js';
import '../analytics/types.js';
import { SakSessionStatsCollector } from '../analytics/SakSessionStatsCollector.js';
import { ProductionStatsCollector } from '../analytics/ProductionStatsCollector.js';
import { ActionStatsCollector } from '../analytics/ActionStatsCollector.js';
import { validator } from '../validator/validator.js';
import { isRequired, isNumber } from '../validator/rules.js';
import { ConfigAuthMode, ConfigResponseMode, Prompt } from './types.js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class Config {
    sakSessionStatsCollector;
    store = {
        app: 0,
        redirectUrl: '',
        mode: ConfigAuthMode.InNewTab,
        responseMode: ConfigResponseMode.Redirect,
        codeVerifier: '',
        state: '',
        prompt: [
            Prompt.Default
        ],
        __loginDomain: LOGIN_DOMAIN,
        __oauthDomain: OAUTH_DOMAIN,
        __vkidDomain: VKID_DOMAIN
    };
    constructor(){
        const productStatsCollector = new ProductionStatsCollector(this);
        const actionStatsCollector = new ActionStatsCollector(productStatsCollector);
        this.sakSessionStatsCollector = new SakSessionStatsCollector(actionStatsCollector);
    }
    init(config) {
        this.set(config);
        this.sakSessionStatsCollector.sendSdkInit(config.source);
        return this;
    }
    update(config) {
        return this.set(config);
    }
    set(config) {
        this.store = {
            ...this.store,
            ...config
        };
        return this;
    }
    get() {
        return this.store;
    }
}
_ts_decorate([
    validator({
        app: [
            isRequired,
            isNumber
        ],
        redirectUrl: [
            isRequired
        ]
    })
], Config.prototype, "init", null);

export { Config };
