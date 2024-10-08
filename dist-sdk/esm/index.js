import { Auth } from './auth/auth.js';
export { AuthErrorCode } from './auth/types.js';
import { Config } from './core/config/config.js';
export { ConfigAuthMode, ConfigResponseMode, ConfigSource, Prompt } from './core/config/types.js';
import { Widget } from './core/widget/widget.js';
export { WidgetEvents } from './core/widget/events.js';
export { Languages, Scheme } from './types.js';
export { OneTap } from './widgets/oneTap/oneTap.js';
export { OneTapContentId, OneTapSkin } from './widgets/oneTap/types.js';
export { OneTapInternalEvents } from './widgets/oneTap/events.js';
export { FloatingOneTap } from './widgets/floatingOneTap/floatingOneTap.js';
export { FloatingOneTapContentId } from './widgets/floatingOneTap/types.js';
export { FloatingOneTapInternalEvents } from './widgets/floatingOneTap/events.js';
export { OAuthList } from './widgets/oauthList/oauthList.js';
export { OAuthName } from './widgets/oauthList/types.js';
export { OAuthListInternalEvents } from './widgets/oauthList/events.js';

const globalConfig = new Config();
/** Export Auth */ Auth.config = globalConfig;
const globalAuth = new Auth();
/** Export Core Widget */ Widget.config = globalConfig;
Widget.auth = globalAuth;

export { globalAuth as Auth, globalConfig as Config };
