import { useEffect, useState } from "react";
import {
  ConnectionStatus,
  Network as CapacitorNetwork,
} from "@capacitor/network";

interface NetworkState {
  isOnline: boolean;
  connectionType: ConnectionStatus["connectionType"];
}

export const useNetworkStatus = () => {
  const [network, setNetwork] = useState<NetworkState>({
    isOnline: navigator.onLine,
    connectionType: "unknown",
  });

  useEffect(() => {
    let listenerHandle: any;

    const init = async () => {
      const status = await CapacitorNetwork.getStatus();

      setNetwork({
        isOnline: status.connected,
        connectionType: status.connectionType,
      });

      listenerHandle = await CapacitorNetwork.addListener(
        "networkStatusChange",
        (status) => {
          setNetwork({
            isOnline: status.connected,
            connectionType: status.connectionType,
          });
        }
      );
    };

    init();

    return () => {
      if (listenerHandle) {
        listenerHandle.remove();
      }
    };
  }, []);

  return network;
};