import { Haptics } from '@capacitor/haptics';

export const useHaptics = () => {
  const vibrate = async (): Promise<void> => {
    await Haptics.vibrate();
  };

  return { vibrate };
};