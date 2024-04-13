import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Notification } from "../state-types/notification";

interface NotificationState {
    notifications: Notification[]
}

const initialState: NotificationState = {
    notifications: []
}

const reducer = produce((
    state: NotificationState = initialState,
    action: Action
) => {
    switch(action.type) {
        case ActionType.NOTIFICATION_ADD: {
            state.notifications.push(action.payload)
            return state;
        }
        case ActionType.NOTIFICATION_REMOVE: {
            state.notifications = state.notifications.filter(notification => notification.id !== action.payload);
            return state;
        }
        default:
            return state;
    }
})

export default reducer;