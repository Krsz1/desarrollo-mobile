import { useEffect, useState } from 'react'
import type { Paciente } from '../services/pacientes'
import { getPacientes, addOrUpdatePaciente, deletePaciente } from '../services/pacientes'

export default function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([])

  useEffect(() => {
    setPacientes(getPacientes())
  }, [])

  function refresh() {
    setPacientes(getPacientes())
  }

  function guardar(p: Paciente) {
    addOrUpdatePaciente(p)
    refresh()
  }

  function eliminar(id: string) {
    deletePaciente(id)
    refresh()
  }

  return { pacientes, refresh, guardar, eliminar }
}
