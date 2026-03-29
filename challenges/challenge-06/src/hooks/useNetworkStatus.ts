import { useEffect, useState } from "react";

interface NetworkState {
  isOnline: boolean;
  connectionType: string;
}

type CapStatus = { connected: boolean; connectionType?: string };

export const useNetworkStatus = () => {
  const [network, setNetwork] = useState<NetworkState>({
    isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
    connectionType: "unknown",
  });

  useEffect(() => {
    let removeListener: (() => void) | undefined;

    const setFromWeb = (connected: boolean) =>
      setNetwork({ isOnline: connected, connectionType: "unknown" });

    (async () => {
      try {
        const cap = await import("@capacitor/network");
        if (cap && cap.Network && typeof cap.Network.getStatus === "function") {
          const status: CapStatus = await cap.Network.getStatus();
          setNetwork({ isOnline: status.connected, connectionType: status.connectionType ?? "unknown" });
          const handle = await cap.Network.addListener("networkStatusChange", (s: CapStatus) => {
            setNetwork({ isOnline: s.connected, connectionType: s.connectionType ?? "unknown" });
          });
          removeListener = () => handle.remove();
        }
      } catch (err) {
        console.debug("Capacitor Network not available, falling back to navigator.onLine", err);
      }

      if (!removeListener) {
        const onlineHandler = () => setFromWeb(true);
        const offlineHandler = () => setFromWeb(false);
        window.addEventListener("online", onlineHandler);
        window.addEventListener("offline", offlineHandler);
        removeListener = () => {
          window.removeEventListener("online", onlineHandler);
          window.removeEventListener("offline", offlineHandler);
        };
      }
    })();

    return () => {
      if (removeListener) removeListener();
    };
  }, []);

  return network;
};