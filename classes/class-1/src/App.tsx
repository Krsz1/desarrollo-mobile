import "./App.css";
import HelloWorld from "./components/HelloWorld";
import PrintMessage from "./components/PrintMessage";
import Contador from "./components/Contador";
import Arrays from "./components/Arrays";
import Arreglos from "./components/Arreglos.tsx";

function App() {
  return (
    <>
      <HelloWorld />
      <PrintMessage message="Este es un mensaje desde App" />

      <section>
        <h2>Contador</h2>
        <Contador />
      </section>

      <section>
        <h2>Arrays</h2>
        <Arrays />
      </section>

      <section>
        <h2>Arreglos</h2>
        <Arreglos />
      </section>
    </>
  );
}

export default App;
