import React, { useState } from 'react'
import type { Paciente } from '../services/pacientes'
import ConfirmModal from './ConfirmModal'

type Props = {
  pacientes: Paciente[]
  onEditar: (p: Paciente) => void
  onEliminar: (id: string) => void
}

export default function TablaPacientes({ pacientes, onEditar, onEliminar }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [toDelete, setToDelete] = useState<string | null>(null)

  function handleDeleteClick(id: string) {
    setToDelete(id)
    setConfirmOpen(true)
  }

  function confirmDelete() {
    if (toDelete) onEliminar(toDelete)
    setConfirmOpen(false)
    setToDelete(null)
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
              <td>{p.telefono || '-'}</td>
              <td style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => onEditar(p)}>Editar</button>
                <button onClick={() => handleDeleteClick(p.id)} style={{ background: '#c00', color: '#fff' }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmModal open={confirmOpen} title="Confirmar eliminación" message="¿Eliminar paciente? Esta acción no se puede deshacer." onConfirm={confirmDelete} onCancel={() => setConfirmOpen(false)} />
    </div>
  )
}
