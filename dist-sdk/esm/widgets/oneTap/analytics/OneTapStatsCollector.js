import { RegistrationStatsCollector } from '../../../core/analytics/RegistrationStatsCollector.js';
import { ProductionStatsEventScreen } from '../../../core/analytics/types.js';
import { ProductionStatsCollector } from '../../../core/analytics/ProductionStatsCollector.js';
import { ActionStatsCollector } from '../../../core/analytics/ActionStatsCollector.js';
import { TEXT_TYPE } from './constants.js';

class OneTapStatsCollector {
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
    sendFrameLoadingFailed() {
        void this.registrationStatsCollector.logEvent(ProductionStatsEventScreen.NOWHERE, {
            event_type: 'iframe_loading_failed',
            fields: this.getFields()
        });
    }
    sendNoSessionFound() {
        void this.registrationStatsCollector.logEvent(ProductionStatsEventScreen.NOWHERE, {
            event_type: 'no_session_found',
            fields: this.getFields()
        });
    }
    sendOneTapButtonNoUserShow(buttonType = 'default') {
        void this.registrationStatsCollector.logEvent(ProductionStatsEventScreen.NOWHERE, {
            event_type: 'onetap_button_no_user_show',
            fields: [
                ...this.getFields(),
                {
                    name: 'button_type',
                    value: buttonType
                }
            ]
        });
    }
    sendOneTapButtonNoUserTap(buttonType = 'default') {
        return this.registrationStatsCollector.logEvent(ProductionStatsEventScreen.NOWHERE, {
            event_type: 'onetap_button_no_user_tap',
            fields: [
                ...this.getFields(),
                {
                    name: 'button_type',
                    value: buttonType
                }
            ]
        });
    }
    sendScreenProceed(params) {
        void this.registrationStatsCollector.logEvent(ProductionStatsEventScreen.NOWHERE, {
            event_type: 'screen_proceed',
            fields: [
                ...this.getFields(),
                {
                    name: 'theme_type',
                    value: params.scheme
                },
                {
                    name: 'style_type',
                    value: params.skin
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
}

export { OneTapStatsCollector };
