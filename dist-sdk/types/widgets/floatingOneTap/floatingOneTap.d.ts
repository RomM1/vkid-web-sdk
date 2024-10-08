import { Widget } from "../../core/widget";
import { WidgetError } from "../../core/widget/types";
import { FloatingOneTapBridgeMessage, FloatingOneTapParams } from './types';
export declare class FloatingOneTap extends Widget<Omit<FloatingOneTapParams, 'appName'>> {
    private readonly analytics;
    protected vkidAppName: string;
    constructor();
    private readonly sendSuccessLoginEvent;
    protected onBridgeMessageHandler(event: FloatingOneTapBridgeMessage): void;
    protected onErrorHandler(error: WidgetError): void;
    private openFullAuth;
    private login;
    private renderOAuthList;
    render(params: FloatingOneTapParams): this;
}
