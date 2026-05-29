import { useState, useEffect } from "react";
import { Network } from "@capacitor/network";

export const useNetwork = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    Network.getStatus().then((s) => setIsOnline(s.connected));

    let handle: Awaited<ReturnType<typeof Network.addListener>>;
    Network.addListener("networkStatusChange", (s) => {
      setIsOnline(s.connected);
    }).then((h) => {
      handle = h;
    });

    return () => {
      handle?.remove();
    };
  }, []);

  return { isOnline };
};
