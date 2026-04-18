import { Geolocation } from '@capacitor/geolocation';

export const useGeolocation = () => {
  const getLocation = async () => {
    const permiso = await Geolocation.requestPermissions();

    if (permiso.location !== 'granted') {
      alert('Se necesita permiso de ubicacion para esta mision.');
      return null;
    }

    try {
      const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
      return pos.coords;
    } catch {
      alert('No se pudo obtener la ubicacion. Revisa que el GPS este activado.');
      return null;
    }
  };

  return { getLocation };
};