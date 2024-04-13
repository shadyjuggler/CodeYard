import { NotificationContext } from "./notificationContext";
import { useActions } from "../hooks/use-actions";
import { NotificationType } from "../state/state-types/notification";

import { store } from "../state";

import FirebaseError from "../firebase/errors";

interface NotificateParams {
    message: Object | null,
    error: Object | null
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { addNotification, removeNotification } = useActions();

    const notificate = (type: NotificationType, payload: string) => {
        payload = FirebaseError[payload] ? FirebaseError[payload] : payload;

        const notificationId = `${Math.ceil(Math.random() * 1000000)}`;
        addNotification(notificationId, type, payload);
        setTimeout(() => {
            removeNotification(notificationId);
        }, 5000)
    }

    return (
        <NotificationContext.Provider value={{ notificate }}>
            {children}
        </NotificationContext.Provider>
    )
}