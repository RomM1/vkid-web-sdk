import { DataService } from '../core/dataService/dataService.js';
import { state } from '../utils/cookie.js';
import { AUTH_ERROR_TEXT } from './constants.js';
import { AuthErrorCode } from './types.js';

class AuthDataService extends DataService {
    state = state();
    sendSuccessData = (payload)=>{
        this.sendSuccess({
            type: payload.type,
            code: payload.code,
            state: payload.state,
            device_id: payload.device_id,
            expires_in: payload.expires_in,
            ext_id: payload.ext_id
        });
    };
    sendNewTabHasBeenClosed = ()=>{
        this.sendError({
            code: AuthErrorCode.NewTabHasBeenClosed,
            error: AUTH_ERROR_TEXT[AuthErrorCode.NewTabHasBeenClosed],
            state: this.state
        });
    };
    // TODO: Типизировать details
    sendAuthorizationFailed = (details)=>{
        this.sendError({
            code: AuthErrorCode.AuthorizationFailed,
            error: AUTH_ERROR_TEXT[AuthErrorCode.AuthorizationFailed],
            error_description: JSON.stringify(details),
            state: this.state
        });
    };
    sendEventNotSupported = ()=>{
        this.sendError({
            code: AuthErrorCode.EventNotSupported,
            error: AUTH_ERROR_TEXT[AuthErrorCode.EventNotSupported],
            state: this.state
        });
    };
    sendCannotCreateNewTab = ()=>{
        this.sendError({
            code: AuthErrorCode.CannotCreateNewTab,
            error: AUTH_ERROR_TEXT[AuthErrorCode.CannotCreateNewTab],
            state: this.state
        });
    };
    sendStateMismatchError = ()=>{
        this.sendError({
            code: AuthErrorCode.StateMismatch,
            error: AUTH_ERROR_TEXT[AuthErrorCode.StateMismatch],
            state: this.state
        });
    };
}

export { AuthDataService };
