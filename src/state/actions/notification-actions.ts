import { ActionType } from "../action-types";
import { Notification } from "../state-types/notification";

export interface NotificationAddAction {
    type: ActionType.NOTIFICATION_ADD;
    payload: Notification;
}

export interface NotificationRemoveAction {
    type: ActionType.NOTIFICATION_REMOVE;
    payload: string;
}