import { Device } from "@capacitor/device";

export const getBatteryLevel = async () => {
  const info = await Device.getBatteryInfo();
  return info.batteryLevel;
};
