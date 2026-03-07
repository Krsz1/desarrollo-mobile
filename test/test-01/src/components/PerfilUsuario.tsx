import { useState } from "react";
import type { User } from "../services/auth";
import { saveUser, logout } from "../services/auth";

type Props = {
  user: User;
  onUpdate: (u: User) => void;
  onLogout: () => void;
};

export default function PerfilUsuario({ user, onUpdate, onLogout }: Props) {
  const [avatar, setAvatar] = useState<string | null>(user.avatar || null);
  const [saved, setSaved] = useState(false);

  function obtenerIniciales() {
    return `${user.nombre?.[0] || ""}${user.apellido?.[0] || ""}`.toUpperCase();
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setAvatar(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  function guardarAvatar() {
    const updated = { ...user, avatar };
    saveUser(updated);
    onUpdate(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function cerrarSesion() {
    logout();
    onLogout();
  }

  return (
    <div className="perfil">
      <div className="perfil-header">
        {/* Avatar */}
        {avatar ? (
          <img src={avatar} alt="avatar" className="avatar" />
        ) : (
          <div className="avatar-placeholder">{obtenerIniciales()}</div>
        )}

        {/* Info usuario */}
        <div className="perfil-info">
          <div>
            {user.nombre} {user.apellido}
          </div>
          <div>{user.role}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="perfil-actions">
        <label className="file-label">
          Cambiar avatar
          <input type="file" accept="image/*" onChange={handleFile} />
        </label>
        <button onClick={guardarAvatar}>Guardar avatar</button>
        <button onClick={cerrarSesion}>Cerrar sesión</button>
      </div>

      {saved && (
        <div style={{ fontSize: "0.8rem", color: "#4ade80", marginLeft: "1rem" }}>
          ✓ Avatar guardado
        </div>
      )}
    </div>
  );
}