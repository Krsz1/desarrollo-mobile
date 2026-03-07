export interface Usuario {
  id: number
  nombre: string
  email: string
  password?: string
  avatar?: string
}

export interface Visita {
  id: string
  paciente: string
  direccion: string
  hora: string
  estado: "pendiente" | "en_camino" | "finalizada" | "cancelada"
}
