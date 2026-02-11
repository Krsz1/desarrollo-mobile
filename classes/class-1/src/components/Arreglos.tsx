import { useState } from "react";

function Arreglos() {
  const [arreglo, setArreglo] = useState<number[]>([]);

  const addToArray = () => {
    const nuevo = Date.now();
    setArreglo((prev) => [...prev, nuevo]);
  };

  return (
    <>
      <button onClick={addToArray}> Agregar </button>
      <ul>
        {arreglo.map((item, index) => (
          <li key={index}> {item} </li>
        ))}
      </ul>
    </>
  );
}

export default Arreglos;