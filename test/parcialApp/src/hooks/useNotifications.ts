import { LocalNotifications } from '@capacitor/local-notifications';

export const useNotifications = () => {

  const notify = async (title: string, body: string): Promise<void> => {
    await LocalNotifications.requestPermissions();

    await LocalNotifications.schedule({
      notifications: [
        {
          title,
          body,
          id: new Date().getTime(), 
        },
      ],
    });
  };

  return { notify };
};