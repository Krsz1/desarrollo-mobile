import { useEffect, useState } from 'react'
import type { User } from '../services/auth'
import { getCurrentUser, login as svcLogin, logout as svcLogout, saveUser as svcSaveUser } from '../services/auth'

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  function login(email: string, password: string) {
    const u = svcLogin(email, password)
    setUser(u)
    return u
  }

  function logout() {
    svcLogout()
    setUser(null)
  }

  function saveUser(u: User) {
    svcSaveUser(u)
    setUser(u)
  }

  return { user, login, logout, saveUser }
}
