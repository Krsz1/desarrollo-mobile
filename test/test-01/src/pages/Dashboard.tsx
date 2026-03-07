import { useState } from "react";
import type { User } from "../services/auth";
import type { Paciente } from "../services/storageService";
import { storageService } from "../services/storageService";
import PerfilUsuario from "../components/PerfilUsuario";
import FormularioPaciente from "../components/FormularioPaciente";
import TablaPacientes from "../components/TablaPacientes";

type Props = {
  user: User;
  onLogout: () => void;
};

const Dashboard = ({ user, onLogout }: Props) => {

  const [pacientes, setPacientes] = useState<Paciente[]>(
    storageService.obtenerPacientes()
  );

  const [busqueda, setBusqueda] = useState("");
  const [pacienteAEditar, setPacienteAEditar] = useState<Paciente | null>(null);

  function refresh() {
    setPacientes(storageService.obtenerPacientes());
  }

  function handleGuardar(p: Paciente) {
    if (pacienteAEditar) {
      storageService.actualizarPaciente(p);
    } else {
      storageService.agregarPaciente(p);
    }
    setPacienteAEditar(null);
    refresh();
  }

  function handleEliminar(id: string) {
    storageService.eliminarPaciente(id);
    refresh();
  }

  const texto = busqueda.trim().toLowerCase();

  const pacientesFiltrados = pacientes.filter((p) => {
    if (!texto) return true;

    return (
      p.nombre.toLowerCase().includes(texto) ||
      p.apellido.toLowerCase().includes(texto) ||
      p.dni.toLowerCase().includes(texto)
    );
  });

  return (
    <div className="app-root">

      <header className="app-header">
        <div className="brand">MediCare+</div>

        <PerfilUsuario
          user={user}
          onUpdate={() => {}}
          onLogout={onLogout}
        />
      </header>

      <main className="dashboard">

        <h2>Bienvenido, {user.nombre}</h2>

        {user.role !== "recepcionista" && (
          <section className="estadisticas">
            <h3>Estadísticas</h3>
            <p>Sección visible solo para médicos.</p>
          </section>
        )}

        <section className="pacientes-area">

          {user.role !== "medico" && (
            <FormularioPaciente
              pacienteAEditar={pacienteAEditar}
              onGuardar={handleGuardar}
              onCancel={() => setPacienteAEditar(null)}
            />
          )}

          <div>

            <input
              placeholder="Buscar paciente..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

            <TablaPacientes
              pacientes={pacientesFiltrados}
              onEditar={setPacienteAEditar}
              onEliminar={handleEliminar}
            />

          </div>

        </section>

      </main>
    </div>
  );
};

export default Dashboard;