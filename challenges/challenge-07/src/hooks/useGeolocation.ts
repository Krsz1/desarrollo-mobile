import { useState, useRef } from 'react';
import { Geolocation, Position } from '@capacitor/geolocation';

const useGeolocation = () => {
  const [position, setPosition] = useState<Position | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isWatching, setIsWatching] = useState(false);
  const watchId = useRef<string | null>(null);

  const getCurrentPosition = async () => {
    try {
      const pos = await Geolocation.getCurrentPosition();
      setPosition(pos);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const startWatch = async () => {
    try {
      const id = await Geolocation.watchPosition({}, (pos, err) => {
        if (err) { setError((err as Error).message); return; }
        setPosition(pos ?? null);
        setError(null);
      });
      watchId.current = id;
      setIsWatching(true);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const stopWatch = async () => {
    if (watchId.current) {
      await Geolocation.clearWatch({ id: watchId.current });
      watchId.current = null;
      setIsWatching(false);
    }
  };

  return { position, error, isWatching, getCurrentPosition, startWatch, stopWatch };
};

export default useGeolocation;
