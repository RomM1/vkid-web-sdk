type ParamValue = string;
interface SetCookieParams {
    expires?: number;
    value?: ParamValue;
}
export declare function cookie(name: string, params: SetCookieParams): string;
export declare const state: (value?: ParamValue) => string;
export declare const codeVerifier: (value?: ParamValue) => string;
export declare const clearStateCookie: () => void;
export declare const clearCodeVerifierCookie: () => void;
export declare function setExtIdCookie(value?: string): void;
export {};
