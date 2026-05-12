import { useState, useEffect } from 'react';
import { PushNotifications, PushNotificationSchema } from '@capacitor/push-notifications';
import '../firebase/config'; // inicializa Firebase antes de usar push notifications

const usePushNotifications = () => {
  const [token, setToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<PushNotificationSchema | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    PushNotifications.addListener('registration', (t) => {
      setToken(t.value);
      setRegistered(true);
      setError(null);
    });

    PushNotifications.addListener('registrationError', (err) => {
      setError(err.error);
      setRegistered(false);
    });

    PushNotifications.addListener('pushNotificationReceived', (notif) => {
      setNotification(notif);
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
      setNotification(action.notification);
    });

    return () => {
      PushNotifications.removeAllListeners();
    };
  }, []);

  const register = async () => {
    try {
      let permStatus = await PushNotifications.checkPermissions();
      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }
      if (permStatus.receive !== 'granted') {
        setError('Permiso de notificaciones push denegado');
        return;
      }
      await PushNotifications.register();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return { token, notification, error, registered, register };
};

export default usePushNotifications;
