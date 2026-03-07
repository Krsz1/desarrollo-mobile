import { useState } from "react";
import type { Paciente } from "../services/storageService";

type Props = {
  pacientes: Paciente[];
  onEditar: (p: Paciente) => void;
  onEliminar: (id: string) => void;
};

export default function TablaPacientes({ pacientes, onEditar, onEliminar }: Props) {
  const [toDelete, setToDelete] = useState<Paciente | null>(null);

  function confirmDelete() {
    if (toDelete) {
      onEliminar(toDelete.id);
      setToDelete(null);
    }
  }

  return (
    <div className="tabla-pacientes">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {pacientes.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre} {p.apellido}</td>
              <td>{p.dni}</td>
              <td>{p.telefono || "-"}</td>
              <td style={{ display: "flex", gap: 8 }}>
                <button onClick={() => onEditar(p)}>Editar</button>

                <button
                  onClick={() => setToDelete(p)}
                  style={{ background: "#c00", color: "#fff" }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de confirmación */}
      {toDelete && (
        <div className="modal">
          <div className="modal-contenido">
            <h3>Confirmar eliminación</h3>

            <p>
              ¿Seguro que deseas eliminar a {toDelete.nombre} {toDelete.apellido}?
            </p>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setToDelete(null)}>Cancelar</button>

              <button
                onClick={confirmDelete}
                style={{ background: "#c00", color: "white" }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}