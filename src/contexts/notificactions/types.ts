export type Notification = {
    name: string
    ms: number
}

export type NotificationContextType = [
    Notification,
    (notification: Notification) => void
];