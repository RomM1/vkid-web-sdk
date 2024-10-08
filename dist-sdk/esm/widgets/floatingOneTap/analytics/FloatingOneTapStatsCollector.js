import { RegistrationStatsCollector } from '../../../core/analytics/RegistrationStatsCollector.js';
import { ProductionStatsEventScreen } from '../../../core/analytics/types.js';
import { ProductionStatsCollector } from '../../../core/analytics/ProductionStatsCollector.js';
import { ActionStatsCollector } from '../../../core/analytics/ActionStatsCollector.js';
import { TEXT_TYPE } from './constants.js';

class FloatingOneTapStatsCollector {
    registrationStatsCollector;
    uniqueSessionId;
    constructor(config){
        const productStatsCollector = new ProductionStatsCollector(config);
        const actionStatsCollector = new ActionStatsCollector(productStatsCollector);
        this.registrationStatsCollector = new RegistrationStatsCollector(actionStatsCollector);
    }
    setUniqueSessionId(id) {
        this.uniqueSessionId = id;
    }
    getFields() {
        const fields = [
            {
                name: 'sdk_type',
                value: 'vkid'
            }
        ];
        if (this.uniqueSessionId) {
            fields.push({
                name: 'unique_session_id',
                value: this.uniqueSessionId
            });
        }
        return fields;
    }
    sendScreenProceed(params) {
        void this.registrationStatsCollector.logEvent(ProductionStatsEventScreen.NOWHERE, {
            event_type: 'screen_proceed',
            screen_to: ProductionStatsEventScreen.FLOATING_ONE_TAP,
            fields: [
                ...this.getFields(),
                {
                    name: 'theme_type',
                    value: params.scheme
                },
                {
                    name: 'language',
                    value: params.lang.toString()
                },
                {
                    name: 'text_type',
                    value: TEXT_TYPE[params.contentId]
                }
            ]
        });
    }
    sendIframeLoadingFailed() {
        void this.registrationStatsCollector.logEvent(ProductionStatsEventScreen.FLOATING_ONE_TAP, {
            event_type: 'iframe_loading_failed',
            fields: this.getFields()
        });
    }
    sendNoUserButtonShow() {
        void this.registrationStatsCollector.logEvent(ProductionStatsEventScreen.FLOATING_ONE_TAP, {
            event_type: 'no_user_button_show',
            fields: this.getFields()
        });
    }
    sendNoUserButtonTap() {
        return this.registrationStatsCollector.logEvent(ProductionStatsEventScreen.FLOATING_ONE_TAP, {
            event_type: 'no_user_button_tap',
            fields: this.getFields()
        });
    }
}

export { FloatingOneTapStatsCollector };
