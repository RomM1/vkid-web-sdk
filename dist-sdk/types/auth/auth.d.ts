import { Config } from "../core/config";
import { RedirectPayload } from "../utils/url";
import { AuthError, AuthParams, LogoutResult, PublicInfoResult, TokenResult, UserInfoResult } from './types';
export declare class Auth {
    /**
     * @ignore
     */
    static config: Config;
    private dataService;
    private opener;
    private interval;
    private readonly id;
    private readonly analytics;
    private state;
    constructor();
    private readonly close;
    private readonly handleMessage;
    private readonly handleInterval;
    private readonly subscribe;
    private readonly unsubscribe;
    private readonly loginInNewTab;
    private readonly loginInNewWindow;
    private readonly handleWindowOpen;
    private readonly loginByRedirect;
    readonly login: (params?: AuthParams) => Promise<unknown>;
    protected checkState(stateToCheck: string): AuthError | undefined;
    exchangeCode(code: string, deviceId: string): Promise<Omit<TokenResult, "id_token">>;
    refreshToken(refreshToken: string, deviceId: string): Promise<TokenResult>;
    logout(accessToken: string): Promise<LogoutResult>;
    userInfo(accessToken: string): Promise<UserInfoResult>;
    publicInfo(idToken: string): Promise<PublicInfoResult>;
    protected oauthSectionFetchHandler<T extends object>(res: Response): Promise<T>;
    protected redirectWithPayload(payload: RedirectPayload): void;
}
