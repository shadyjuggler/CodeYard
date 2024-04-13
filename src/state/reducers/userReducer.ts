import produce from "immer";
import { Action } from "../actions";
import { ActionType } from "../action-types";
import { User } from "../state-types";

interface UserState {
    loading: boolean;
    error: string | null;
    newUser: boolean;
    user: User | null;
}

const initialState = {
    loading: false,
    error: null,
    user: null,
    newUser: false
}

const reducer = produce((
    state: UserState = initialState,
    action: Action
) => {
    switch (action.type) {
        case ActionType.USER_AUTH_START:
            state.loading = true;
            return state;
        case ActionType.USER_AUTH_COMPLETE:
            state.loading = false;
            state.user = action.payload.user;
            state.error = action.payload.error;
            state.newUser = action.payload.isNewUser;
            return state;
        case ActionType.USER_CREDENTIAL_UPDATE_SUCESS:
            state.loading = false;
            if (state.user) {
                state.user.name = action.payload.displayName;
                state.user.photoURL = action.payload.photoURL;
            }
            return state;
        case ActionType.USER_SIGNED_OUT:
            state.user = action.payload.user;
            state.error = action.payload.error;
            state.newUser = false;
            return state;
        case ActionType.REMOVE_NEW_USER_HELPER:
            state.newUser = action.payload;
            return state;
        default:
            return state;
    }
})

export default reducer;

