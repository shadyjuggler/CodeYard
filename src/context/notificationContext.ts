import { createContext, useContext } from "react";

export const NotificationContext = createContext<{ notificate: Function } | undefined>(undefined);

export const useNotificationContext = () => {
    const notificationParams = useContext(NotificationContext);

    if (!notificationParams) {
        throw new Error("Notification params can't be undefined")
    }

    return notificationParams;
}