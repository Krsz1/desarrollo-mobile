import { useEffect, useState } from "react";

function EjemploCleanup() {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSegundos((s) => s + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      console.log("Intervalo limpiado");
    };
  }, []);

  return <p>Segundos: {segundos}</p>;
}
export default EjemploCleanup;
