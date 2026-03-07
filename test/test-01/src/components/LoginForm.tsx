import { useState } from 'react'
import type { User } from "../services/auth";
import { login } from "../services/auth";

type Props = {
  onLogin: (user: User) => void
}

export default function LoginForm({ onLogin }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const u = login(email.trim(), password)
    if (!u) {
      setError('Usuario o contraseña incorrectos')
      return
    }
    onLogin(u)
  }

  return (
    <div className="login-container">
      <h2>MediCare+ Admin</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
        </div>
        <div>
          <label>Contraseña</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        </div>
        {error && <p className="inline-error">{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
      <p className="muted">Usa admin@medicare.com / admin123 (recepcionista) o doc@medicare.com / doc123 (medico)</p>
    </div>
  )
}
