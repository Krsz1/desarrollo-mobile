import { useEffect, useState } from "react";
import { Geolocation } from "@capacitor/geolocation";

export const useGeolocation = () => {
  const [position, setPosition] = useState<any>(null);

  useEffect(() => {
    watchLocation();
  }, []);

  const watchLocation = async () => {
    await Geolocation.watchPosition({ enableHighAccuracy: true }, (pos) => {
      setPosition(pos);
    });
  };

  return position;
};
