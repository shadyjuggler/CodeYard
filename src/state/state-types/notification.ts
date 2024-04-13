export type NotificationType = "success" | "warning" | "error";

export type Notification = {
    id: string,
    type: NotificationType;
    message: string;
}
