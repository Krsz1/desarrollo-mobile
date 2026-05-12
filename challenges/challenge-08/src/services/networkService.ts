import { Network } from "@capacitor/network";

export const checkConnection = async () => {
  const status = await Network.getStatus();
  return status.connected;
};
