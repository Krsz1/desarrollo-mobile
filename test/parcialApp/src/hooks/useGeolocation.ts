import { Geolocation } from '@capacitor/geolocation';

export const useGeolocation = () => {
  const getLocation = async () => {
    const pos = await Geolocation.getCurrentPosition();
    return pos.coords;
  };

  return { getLocation };
};