import { Haptics, ImpactStyle } from "@capacitor/haptics";

export const vibratePhone = async () => {
  await Haptics.impact({ style: ImpactStyle.Heavy });
};
