import { onAuthStateChanged } from 'firebase/auth';
import { auth } from ".";

import { store } from "../state";
import { ActionType } from "../state/action-types";

import { getProjects } from '../state/action-creators';

import { handleUserPorejctsChange } from '../state/subsription';

import { Unsubscribe } from 'redux';


const AuthEventHandler = () => {
    return onAuthStateChanged(auth, user => {
        let unsubscribeFunc: Unsubscribe | undefined;
        if (user) {
            // user logged in

            store.dispatch({
                type: ActionType.USER_AUTH_COMPLETE,
                payload: {
                    error: null,
                    user: {
                        id: user.uid,
                        // @ts-ignore
                        email: user.email,
                        name: user.displayName,
                        photoURL: user.photoURL
                    }
                }
            })

            // @ts-ignore
            store.dispatch(getProjects(user.uid));
            unsubscribeFunc = store.subscribe(handleUserPorejctsChange(user.uid));

        } else {
            if (unsubscribeFunc) unsubscribeFunc();
           
            store.dispatch({
                type: ActionType.USER_SIGNED_OUT,
                payload: {
                    user: null,
                    error: null
                }
            })

        }
    })
}

export default AuthEventHandler;