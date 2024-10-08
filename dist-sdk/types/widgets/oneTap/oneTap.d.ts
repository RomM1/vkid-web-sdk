import { Widget } from "../../core/widget";
import { WidgetError } from "../../core/widget/types";
import { OneTapBridgeMessage, OneTapParams } from './types';
export declare class OneTap extends Widget<OneTapParams> {
    private readonly analytics;
    protected vkidAppName: string;
    private statsBtnType;
    private fastAuthDisabled;
    constructor();
    private readonly setStatsButtonType;
    private readonly sendSuccessLoginEvent;
    protected onBridgeMessageHandler(event: OneTapBridgeMessage): void;
    protected onErrorHandler(error: WidgetError): void;
    private openFullAuth;
    private login;
    private renderOAuthList;
    render(params: OneTapParams): this;
}
