import { Dispatch } from "react";
import { ActionType } from "../action-types";
import { Action } from "../actions";

import { store } from "../store";

import { updateCredentials } from "../../firebase/credentialsUpdate";
import { logOut } from "../../firebase/auth";

import { RemoveNewUserHelperAction } from "../actions";

export const userAuth = (authFunc: Function, email: string, password: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.USER_AUTH_START
        })

        const {result, isNewUser} = await authFunc(email, password);

        dispatch({
            type: ActionType.USER_AUTH_COMPLETE,
            payload: {...result, isNewUser}
        })

        return result;
    }
}

export const userCredentialsUpdate = (key: "photoURL" | "displayName", value: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.USER_AUTH_START
        })

        // @ts-ignore
        const { displayName, photoURL, error } = await updateCredentials(key, value);

        dispatch({
            type: ActionType.USER_CREDENTIAL_UPDATE_SUCESS,
            payload: {
                displayName,
                photoURL
            }
        })

        return { displayName, photoURL, error }
    }
}

export const userSignOut = () => {
    return async (dispatch: Dispatch<Action>) => {
        const { user, error } = await logOut();

        dispatch({
            type: ActionType.USER_SIGNED_OUT,
            payload: {
                user,
                error
            }
        })

    }
}

export const removeNewUserHelper = (): RemoveNewUserHelperAction => {
    return {
        type: ActionType.REMOVE_NEW_USER_HELPER,
        payload: false
    }
}