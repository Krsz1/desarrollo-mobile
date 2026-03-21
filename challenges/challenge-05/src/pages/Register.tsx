import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";

const Register = () => {
  const { values, handleChange } = useForm({ email: "", password: "" });
  const { signUp, loading, error } = useFirebaseAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await signUp(values.email, values.password);
    if (res) navigate("/");
  };

  return (
    <div className="container">
      <h2>Register</h2>

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

      {error && <p style={{ color: "#ef4444", marginBottom: "10px" }}>{error}</p>}

      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Cargando..." : "Register"}
      </button>

      <p style={{ textAlign: "center", marginTop: "12px", fontSize: "14px" }}>
        ¿Ya tienes cuenta?{" "}
        <a href="/" style={{ color: "#6366f1" }}>Inicia sesión</a>
      </p>
    </div>
  );
};

export default Register;