import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import { useState } from "react";

const Login = () => {
  const { values, handleChange } = useForm({ email: "", password: "" });
  const { signIn, loading, error } = useFirebaseAuth();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { isOnline } = useNetworkStatus();
  const [networkError, setNetworkError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!isOnline) {
      setNetworkError("No hay conexión a internet. Comprueba tu red e intenta de nuevo.");
      return;
    }

    setNetworkError(null);
    const res = await signIn(values.email, values.password);
    if (res) {
      login({ email: res.user.email, uid: res.user.uid });
      navigate("/tasks");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      {!isOnline && <p style={{ color: "red" }}>Sin conexión a internet</p>}
      {networkError && <p style={{ color: "#ef4444", marginBottom: "10px" }}>{networkError}</p>}
      {error && <p style={{ color: "#ef4444", marginBottom: "10px" }}>{error}</p>}

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Cargando..." : "Login"}
      </button>

      <p style={{ textAlign: "center", marginTop: "12px", fontSize: "14px" }}>
        ¿No tienes cuenta?{" "}
        <a href="/register" style={{ color: "#6366f1" }}>Regístrate</a>
      </p>
    </div>
  );
};

export default Login;