import { useState } from 'react';
import { Device, DeviceInfo, BatteryInfo, DeviceId } from '@capacitor/device';

const useDevice = () => {
  const [info, setInfo] = useState<DeviceInfo | null>(null);
  const [battery, setBattery] = useState<BatteryInfo | null>(null);
  const [deviceId, setDeviceId] = useState<DeviceId | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getDeviceInfo = async () => {
    try {
      const deviceInfo = await Device.getInfo();
      const batteryInfo = await Device.getBatteryInfo();
      const id = await Device.getId();
      setInfo(deviceInfo);
      setBattery(batteryInfo);
      setDeviceId(id);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return { info, battery, deviceId, error, getDeviceInfo };
};

export default useDevice;
