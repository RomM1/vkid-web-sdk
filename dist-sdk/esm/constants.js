// @ts-ignore-next-line пробрасываем версию из package.json в rollup.config
const VERSION = "2.3.2";
// @ts-ignore-next-line пробрасываем тип сборки из rollup.config
const DOMAIN = 'vk.com';
const LOGIN_DOMAIN = `login.${DOMAIN}`;
const OAUTH_DOMAIN = `oauth.${DOMAIN}`;
const VKID_DOMAIN = `id.${DOMAIN}`;
const COOKIE_EXPIRES_TIME_15_MIN = 900_000;

export { COOKIE_EXPIRES_TIME_15_MIN, DOMAIN, LOGIN_DOMAIN, OAUTH_DOMAIN, VERSION, VKID_DOMAIN };
