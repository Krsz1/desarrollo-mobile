import { Motion } from "@capacitor/motion";

export const useMotion = () => {

  const waitStill = async (segundos: number, onComplete: () => void) => {
    let tiempoQuieto = 0;
    let prevX = 0, prevY = 0, prevZ = 0;

    try {
      const listener = await Motion.addListener("accel", (evento) => {
        const { x, y, z } = evento.acceleration;

        const movimiento =
          Math.abs(x - prevX) + Math.abs(y - prevY) + Math.abs(z - prevZ);

        if (movimiento < 0.3) {
          tiempoQuieto += 0.1;
        } else {
          tiempoQuieto = 0;
        }

        prevX = x;
        prevY = y;
        prevZ = z;

        if (tiempoQuieto >= segundos) {
          listener.remove();
          onComplete();
        }
      });
    } catch {
      alert('No se pudo acceder al acelerometro. Intentalo en un dispositivo fisico.');
    }
  };

  return { waitStill };
};
