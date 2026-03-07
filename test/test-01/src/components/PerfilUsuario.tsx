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
    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
      
      {/* Avatar */}
      {avatar ? (
        <img
          src={avatar}
          alt="avatar"
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
          }}
        />
      ) : (
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "#0C2340",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          {obtenerIniciales()}
        </div>
      )}

      {/* Info usuario */}
      <div>
        <div>
          {user.nombre} {user.apellido}
        </div>
        <div style={{ fontSize: 12, color: "#666" }}>{user.role}</div>

        <input type="file" accept="image/*" onChange={handleFile} />

        <div style={{ display: "flex", gap: 10, marginTop: 5 }}>
          <button onClick={guardarAvatar}>Guardar</button>
          <button onClick={cerrarSesion}>Cerrar sesión</button>
        </div>
        
        {saved && <div style={{ marginTop: 5, fontSize: 12, color: "#155724", borderTop: "1px solid #eee", paddingTop: 5 }}>Avatar guardado</div>}
      </div>
    </div>
  );
}