import { useState, useCallback } from "react";
import { Capacitor } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";

interface GeoPosition {
  latitude: number;
  longitude: number;
}

/** Web: uses navigator.geolocation directly.
 *  Long timeout (30 s) so the browser permission dialog has time to appear + user to respond.
 *  maximumAge: 5 min — returns cached position instantly if device already knows where it is. */
const getPositionWeb = (): Promise<GeoPosition | null> =>
  new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      () => resolve(null),
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 300000 }
    );
  });

/** Native (Android/iOS): two-step strategy.
 *  1. Fast network/WiFi position (8 s) — normally < 1 s on Android.
 *  2. Fallback to GPS (15 s) if network location unavailable. */
const getPositionNative = (): Promise<GeoPosition | null> =>
  new Promise((resolve) => {
    Geolocation.getCurrentPosition({ enableHighAccuracy: false, timeout: 8000 })
      .then((pos) =>
        resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
      )
      .catch(() => {
        Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 15000 })
          .then((pos) =>
            resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
          )
          .catch(() => resolve(null));
      });
  });

export const useGeolocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentPosition = useCallback(async (): Promise<GeoPosition | null> => {
    setLoading(true);
    setError(null);
    try {
      const pos = Capacitor.isNativePlatform()
        ? await getPositionNative()
        : await getPositionWeb();
      if (!pos) setError("Could not get location.");
      return pos;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getCurrentPosition, loading, error };
};

