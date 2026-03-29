import { useEffect, useState } from "react";

interface NetworkState {
  isOnline: boolean;
  connectionType: string;
}

export const useNetworkStatus = () => {
  const [network, setNetwork] = useState<NetworkState>({
    isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
    connectionType: "unknown",
  });

  useEffect(() => {
    let removeListener: (() => void) | undefined;

    const setFromWeb = (connected: boolean) =>
      setNetwork({ isOnline: connected, connectionType: "unknown" });

    // Try dynamic import of Capacitor Network plugin. If unavailable, fallback to web events.
    (async () => {
      let capAvailable = false;
      try {
        // dynamic require to avoid bundler errors when plugin is absent
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const cap = require("@capacitor/network");
        if (cap && cap.Network && typeof cap.Network.getStatus === "function") {
          capAvailable = true;
          const status = await cap.Network.getStatus();
          setNetwork({ isOnline: status.connected, connectionType: status.connectionType ?? "unknown" });
          const handle = await cap.Network.addListener("networkStatusChange", (s: any) => {
            setNetwork({ isOnline: s.connected, connectionType: s.connectionType ?? "unknown" });
          });
          removeListener = () => handle.remove();
        }
      } catch (e) {
        capAvailable = false;
      }

      if (!capAvailable) {
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