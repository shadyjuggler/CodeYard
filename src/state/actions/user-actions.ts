import { ActionType } from "../action-types/index";
import { User } from "../state-types";

export interface UserAuthStartAction {
    type: ActionType.USER_AUTH_START;
}

export interface UserAuthCompleteAction {
    type: ActionType.USER_AUTH_COMPLETE;
    payload: {
        user: User | null,
        error: string | null,
        isNewUser: boolean
    };
}

export interface UserCredentialUpdateAction {
    type: ActionType.USER_CREDENTIAL_UPDATE_SUCESS,
    payload: {
        displayName: string | null;
        photoURL: string | null;
    }
}

export interface RemoveNewUserHelperAction {
    type: ActionType.REMOVE_NEW_USER_HELPER,
    payload: boolean;
}

export interface UserSignedOutAction {
    type: ActionType.USER_SIGNED_OUT,
    payload: {
        user: null,
        error: null | string
    }
}