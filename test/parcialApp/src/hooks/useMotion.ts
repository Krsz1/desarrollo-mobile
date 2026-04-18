import { Motion } from "@capacitor/motion";

export const useMotion = () => {

  const waitStill = async (segundos: number, onComplete: () => void) => {
    let quietStart: number | null = null;
    let prevX = 0, prevY = 0, prevZ = 0;

    try {
      const listener = await Motion.addListener("accel", (evento) => {
        const { x, y, z } = evento.acceleration;

        const movimiento =
          Math.abs(x - prevX) + Math.abs(y - prevY) + Math.abs(z - prevZ);

        if (movimiento < 0.3) {
          if (quietStart === null) quietStart = Date.now();
          if ((Date.now() - quietStart) / 1000 >= segundos) {
            listener.remove();
            onComplete();
          }
        } else {
          quietStart = null;
        }

        prevX = x;
        prevY = y;
        prevZ = z;
      });
    } catch {
      alert('No se pudo acceder al acelerometro. Intentalo en un dispositivo fisico.');
    }
  };

  return { waitStill };
};
