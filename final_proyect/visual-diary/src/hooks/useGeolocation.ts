import { useState } from "react";
import { Geolocation } from "@capacitor/geolocation";

interface GeoPosition {
  latitude: number;
  longitude: number;
}

export const useGeolocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentPosition = async (): Promise<GeoPosition | null> => {
    setLoading(true);
    setError(null);
    try {
      const pos = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });
      return {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      };
    } catch {
      setError("Could not get location.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getCurrentPosition, loading, error };
};
