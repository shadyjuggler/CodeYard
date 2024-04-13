import { ActionType } from "../action-types";
import { NotificationAddAction, NotificationRemoveAction } from "../actions/notification-actions";
import { NotificationType } from "../state-types/notification";

export const addNotification = (id: string, type: NotificationType, message: string): NotificationAddAction => {
    return {
        type: ActionType.NOTIFICATION_ADD,
        payload: {
            id,
            type,
            message
        }
    }
}

export const removeNotification =  (id: string): NotificationRemoveAction => {
    return {
        type: ActionType.NOTIFICATION_REMOVE,
        payload: id
    }
}