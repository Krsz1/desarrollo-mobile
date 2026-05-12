import { useState, useRef } from 'react';
import { Motion } from '@capacitor/motion';

const useAccelerometer = () => {
  const [accelX, setAccelX] = useState<number | null>(null);
  const [accelY, setAccelY] = useState<number | null>(null);
  const [accelZ, setAccelZ] = useState<number | null>(null);
  const [alpha, setAlpha] = useState<number | null>(null);
  const [beta, setBeta] = useState<number | null>(null);
  const [gamma, setGamma] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const accelListener = useRef<any>(null);
  const orientListener = useRef<any>(null);

  const startListening = async () => {
    try {
      accelListener.current = await Motion.addListener('accel', (event) => {
        setAccelX(event.acceleration.x ?? 0);
        setAccelY(event.acceleration.y ?? 0);
        setAccelZ(event.acceleration.z ?? 0);
      });
      orientListener.current = await Motion.addListener('orientation', (event) => {
        setAlpha(event.alpha ?? 0);
        setBeta(event.beta ?? 0);
        setGamma(event.gamma ?? 0);
      });
      setIsListening(true);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const stopListening = async () => {
    if (accelListener.current) {
      await accelListener.current.remove();
      accelListener.current = null;
    }
    if (orientListener.current) {
      await orientListener.current.remove();
      orientListener.current = null;
    }
    setIsListening(false);
  };

  return { accelX, accelY, accelZ, alpha, beta, gamma, isListening, error, startListening, stopListening };
};

export default useAccelerometer;
