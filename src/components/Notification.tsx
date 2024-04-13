import { useState, useEffect } from "react";

interface NotificationProps {
    message: string,
    type: "success" | "warning" | "error";
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
    const [appear, setAppear] = useState<"appear" | undefined>(undefined);

    useEffect(() => {
        setTimeout(() => {
            setAppear("appear");
        }, 100)
        setTimeout(() => {
            setAppear(undefined)
        }, 4800)
    }, [])

    return (
        <div className={`notification notification--${type} ${appear ? "notification--appear" : ""}`}>
            <p className="notification__text">{message}</p>
        </div>
    )
}

export default Notification;