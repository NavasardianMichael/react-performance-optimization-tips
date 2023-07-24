import './App.css';
import Notification from './components/Notification/Notification';
import Tabs from './components/Tabs/Tabs';
import NotificationsProvider from './contexts/notificactions/Provider';

function App() {
  return (
    <NotificationsProvider>
      <Tabs />
      <Notification />
    </NotificationsProvider>
  );
}

export default App;
