import { Usuario } from "../types"

const USER_KEY = "medicare_user"

const USERS: Usuario[] = [
  {
    id: 1,
    nombre: "Dr Juan",
    email: "doctor@medicare.com",
    password: "123456"
  }
]

export function login(email: string, password: string) {

  const user = USERS.find(
    u => u.email === email && u.password === password
  )

  if (!user) return null

  const { password: _, ...userWithoutPassword } = user

  localStorage.setItem(USER_KEY, JSON.stringify(userWithoutPassword))

  return userWithoutPassword
}

export function getCurrentUser() {

  const data = localStorage.getItem(USER_KEY)

  return data ? JSON.parse(data) : null
}

export function logout() {
  localStorage.removeItem(USER_KEY)
}
