import { useTypedSelector } from "../hooks/use-typed-selector";
import Notification from "./Notification";

const NotificationWrapper: React.FC = () => {
    const notifications = useTypedSelector(({ notifications: { notifications } }) => {
        return notifications.map(({ id, type, message }) => {
            return (
                <Notification
                    key={id}
                    type={type}
                    message={message}
                />
            )
        })
    });

    return (
        <div className="notificationWrapper">
            {notifications}
        </div>
    )
}

export default NotificationWrapper;