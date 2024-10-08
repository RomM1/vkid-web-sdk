import { WidgetParams } from "../../core/widget";
import { OAuthListParams, OAuthName } from "../oauthList";
import { OneTapStatsButtonType } from './analytics';
import { OneTapParams, OneTapStyles } from './types';
type OneTapTemplateParams = Required<OneTapStyles & Pick<OneTapParams, 'skin' | 'contentId'> & Pick<WidgetParams, 'scheme' | 'lang'>> & {
    login?: VoidFunction;
    iframeHeight?: number;
    renderOAuthList: (params: OAuthListParams) => void;
    providers?: OAuthName[];
    setStatsButtonType: (type: OneTapStatsButtonType) => void;
};
export declare const getOneTapTemplate: ({ width, height, iframeHeight, borderRadius, login, skin, scheme, contentId, lang, renderOAuthList, providers, setStatsButtonType, }: OneTapTemplateParams) => (id: string) => string;
export {};
