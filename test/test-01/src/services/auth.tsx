export type User = {
  id: number
  email: string
  password?: string
  role: 'recepcionista' | 'medico'
  nombre: string
  apellido: string
  avatar?: string | null
}

const USERS: User[] = [
  { id: 1, email: 'admin@medicare.com', password: 'admin123', role: 'recepcionista', nombre: 'Ana', apellido: 'Pérez', avatar: null },
  { id: 2, email: 'doc@medicare.com', password: 'doc123', role: 'medico', nombre: 'Juan', apellido: 'Gómez', avatar: null },
]

const STORAGE_KEY = 'medicare_user'

export function login(email: string, password: string): User | null {
  const u = USERS.find((x) => x.email === email && x.password === password)
  if (!u) return null
  const { password: _p, ...withoutPassword } = u as any
  // persist minimal user
  localStorage.setItem(STORAGE_KEY, JSON.stringify(withoutPassword))
  return withoutPassword as User
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY)
}

export function getCurrentUser(): User | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export function saveUser(user: User) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export default { login, logout, getCurrentUser, saveUser }
