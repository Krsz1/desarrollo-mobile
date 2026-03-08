import { useEffect } from "react";

function EjemploMontaje() {
  useEffect(() => {
    console.log("El componente se montó");
  }, []);

  return <h2>Ejemplo montaje</h2>;
}

export default EjemploMontaje;
