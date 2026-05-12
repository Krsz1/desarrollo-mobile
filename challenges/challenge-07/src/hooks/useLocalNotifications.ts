import { useState } from 'react';
import { LocalNotifications } from '@capacitor/local-notifications';

const useLocalNotifications = () => {
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const scheduleNotification = async (title: string, body: string, delaySeconds = 5) => {
    try {
      const perm = await LocalNotifications.requestPermissions();
      if (perm.display !== 'granted') {
        setError('Permiso de notificaciones denegado');
        return;
      }
      await LocalNotifications.schedule({
        notifications: [
          {
            id: Math.floor(Math.random() * 100000),
            title,
            body,
            schedule: { at: new Date(Date.now() + delaySeconds * 1000) },
          },
        ],
      });
      setSent(true);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setSent(false);
    }
  };

  return { error, sent, scheduleNotification };
};

export default useLocalNotifications;
