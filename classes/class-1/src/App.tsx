import "./App.css";
import HelloWorld from "./components/HelloWorld";
import PrintMessage from "./components/PrintMessage";
import Contador from "./components/Contador";
import Arrays from "./components/Arrays";
import Arreglos from "./components/Arreglos.tsx";
import EjemploDependencia from "./hooks/EjemploDependencia";
import EjemploMontaje from "./hooks/EjemploMontaje";
import EjemploCleanUp from "./hooks/EjemploCleanUp";

const texto = "hello world";

const App = () => {
  return (
    <>
      <HelloWorld />
      <h3>Este es mi {texto}</h3>
      <PrintMessage message="mensaje desde el componente PrintMessage" />
      <PrintMessage message="mensaje desde el componente PrintMessage" />
      <Contador />
      <Arrays />
      <Arreglos />
      <EjemploDependencia />
      <EjemploMontaje />
      <EjemploCleanUp />
    </>
  );
};

export default App;

