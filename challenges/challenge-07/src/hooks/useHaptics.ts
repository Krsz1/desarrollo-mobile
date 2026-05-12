import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

const useHaptics = () => {
  const lightImpact = async () => {
    await Haptics.impact({ style: ImpactStyle.Light });
  };

  const mediumImpact = async () => {
    await Haptics.impact({ style: ImpactStyle.Medium });
  };

  const heavyImpact = async () => {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  };

  const vibrate = async () => {
    await Haptics.vibrate();
  };

  const selectionFeedback = async () => {
    await Haptics.selectionStart();
  };

  const notificationSuccess = async () => {
    await Haptics.notification({ type: NotificationType.Success });
  };

  const notificationWarning = async () => {
    await Haptics.notification({ type: NotificationType.Warning });
  };

  const notificationError = async () => {
    await Haptics.notification({ type: NotificationType.Error });
  };

  return { lightImpact, mediumImpact, heavyImpact, vibrate, selectionFeedback, notificationSuccess, notificationWarning, notificationError };
};

export default useHaptics;
