import React, { useState, useEffect } from 'react'
import type { User } from '../services/auth'
import { saveUser, logout as doLogout } from '../services/auth'

type Props = {
  user: User
  onUpdate: (u: User) => void
  onLogout: () => void
}

function initials(u: User) {
  return `${u.nombre?.[0] || ''}${u.apellido?.[0] || ''}`.toUpperCase()
}

export default function PerfilUsuario({ user, onUpdate, onLogout }: Props) {
  const [preview, setPreview] = useState<string | null>(user.avatar || null)

  useEffect(() => setPreview(user.avatar || null), [user])

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => {
      const data = reader.result as string
      setPreview(data)
    }
    reader.readAsDataURL(f)
  }

  function handleSave() {
    const updated: User = { ...user, avatar: preview }
    saveUser(updated)
    onUpdate(updated)
  }

  function handleLogout() {
    doLogout()
    onLogout()
  }

  return (
    <div className="perfil">
      <div className="perfil-header">
        {preview ? (
          <img src={preview} alt="avatar" className="avatar" />
        ) : (
          <div className="avatar-placeholder">{initials(user)}</div>
        )}
        <div className="perfil-info">
          <div>{user.nombre} {user.apellido}</div>
          <div className="muted">{user.role}</div>
        </div>
      </div>

      <div className="perfil-actions">
        <label className="file-label">Subir avatar
          <input type="file" accept="image/*" onChange={handleFile} />
        </label>
        <button onClick={handleSave}>Guardar avatar</button>
        <button onClick={handleLogout} className="danger">Cerrar sesión</button>
      </div>
    </div>
  )
}
