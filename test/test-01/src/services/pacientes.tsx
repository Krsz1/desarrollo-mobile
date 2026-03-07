export type Paciente = {
  id: string
  nombre: string
  apellido: string
  dni: string
  telefono?: string
}

const STORAGE_KEY = 'medicare_pacientes'

export function getPacientes(): Paciente[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Paciente[]
  } catch {
    return []
  }
}

export function savePacientes(p: Paciente[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
}

export function addOrUpdatePaciente(paciente: Paciente) {
  const list = getPacientes()
  const idx = list.findIndex((x) => x.id === paciente.id)
  if (idx >= 0) {
    list[idx] = paciente
  } else {
    list.push(paciente)
  }
  savePacientes(list)
  return paciente
}

export function deletePaciente(id: string) {
  const list = getPacientes().filter((x) => x.id !== id)
  savePacientes(list)
}

export function generateId() {
  return Date.now().toString()
}

export default { getPacientes, savePacientes, addOrUpdatePaciente, deletePaciente, generateId }
