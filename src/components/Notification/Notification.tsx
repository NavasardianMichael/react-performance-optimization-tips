import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';
import { NotificationContext } from '../../contexts/notificactions/Provider';
import { NotificationContextType } from '../../contexts/notificactions/types';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Notification() {
  const [ { name, ms }, setNotification] = React.useContext<NotificationContextType>(NotificationContext)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotification({
        name: '',
        ms: 0,
    });
  };

  return (
    <Snackbar open={!!(name && ms)} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          The {name} rendering took {ms.toFixed(2)} ms
        </Alert>
    </Snackbar>
  );
}