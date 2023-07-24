import { FC, PropsWithChildren, createContext, useMemo, useState } from 'react';
import { Notification, NotificationContextType } from './types';

export const NotificationContext = createContext<NotificationContextType>([
    {name: '', ms: 0},
    () => null
]);

const NotificationsProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [notification, setNotification] = useState<Notification>({name: '', ms: 0});
  
    const contextValue: NotificationContextType = useMemo(() => ([
        notification,
        setNotification
    ]), [notification])

    return <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>;
};

export default NotificationsProvider;