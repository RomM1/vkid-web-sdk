export enum ProductionStatsEventTypes {
  TYPE_ACTION = 'type_action',
}

export enum ProductionStatsTypeActions {
  TYPE_REGISTRATION_ITEM = 'type_registration_item',
}

export enum ProductionStatsEventScreen {
  NOWHERE = 'nowhere',
  FLOATING_ONE_TAP = 'floating_one_tap',
  MULTIBRANDING = 'multibranding_widget',
}

export interface ProductionStatsFieldsItem {
  name: string;
  value: string;
}

export interface ProductionStatsBaseEvent {
  id: number;
  prev_event_id?: number;
  prev_nav_id?: number;
  timestamp: string;
  url: string;
  screen?: ProductionStatsEventScreen;
}

export type ActionStatsEventItem = RegistrationStatsEvent;

export interface ActionStatsEvent extends ProductionStatsBaseEvent {
  type: ProductionStatsEventTypes.TYPE_ACTION;
  [ProductionStatsEventTypes.TYPE_ACTION]: ActionStatsEventItem;
}

type RegistrationStatsEventTypes = 'sdk_init'
| 'iframe_loading_failed'
| 'no_session_found'
| 'onetap_button_no_user_show'
| 'onetap_button_no_user_tap'
| 'screen_proceed'
| 'no_user_button_show'
| 'no_user_button_tap'
| 'multibranding_oauth_added'
| 'vk_button_show'
| 'ok_button_show'
| 'mail_button_show'
| 'vk_button_tap'
| 'ok_button_tap'
| 'mail_button_tap';

export interface RegistrationStatsEventParams {
  event_type: RegistrationStatsEventTypes;
  screen_current?: ProductionStatsEventScreen;
  screen_to?: ProductionStatsEventScreen;
  fields?: ProductionStatsFieldsItem[];
}

export interface RegistrationStatsEvent {
  type: ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM;
  [ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM]: RegistrationStatsEventParams;
}

export type ProductionStatsEvent = ActionStatsEvent;
