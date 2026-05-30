import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";

export const useHaptics = () => {
  const impact = async (style: ImpactStyle = ImpactStyle.Medium): Promise<void> => {
    try {
      await Haptics.impact({ style });
    } catch {
      // Haptics not available on web/desktop — fail silently
    }
  };

  const notification = async (type: NotificationType = NotificationType.Success): Promise<void> => {
    try {
      await Haptics.notification({ type });
    } catch {
      // Fail silently
    }
  };

  return { impact, notification, ImpactStyle, NotificationType };
};
