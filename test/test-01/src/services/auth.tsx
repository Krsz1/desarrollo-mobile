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
const AVATAR_STORE = 'medicare_avatars'

export function login(email: string, password: string): User | null {
  const u = USERS.find((x) => x.email === email && x.password === password)
  if (!u) return null
  const { password: _p, ...withoutPassword } = u as any
  // Si existe avatar guardado en el storage específico, lo incorporamos
  try {
    const rawAv = localStorage.getItem(AVATAR_STORE)
    if (rawAv) {
      const map = JSON.parse(rawAv) as Record<string, string>
      const a = map[withoutPassword.email]
      if (a) withoutPassword.avatar = a
    }
  } catch {
    // ignore parse errors
  }
  // persist minimal user (no password)
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
  // Guardar avatar en store separado para que sobreviva al logout
  try {
    const raw = localStorage.getItem(AVATAR_STORE)
    const map = raw ? JSON.parse(raw) as Record<string,string> : {}
    if (user.avatar) map[user.email] = user.avatar
    else delete map[user.email]
    localStorage.setItem(AVATAR_STORE, JSON.stringify(map))
  } catch {
    // ignore
  }
}

export default { login, logout, getCurrentUser, saveUser }
