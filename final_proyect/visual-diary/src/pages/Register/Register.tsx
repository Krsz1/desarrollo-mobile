import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonSpinner,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Register.module.scss";

const Register: React.FC = () => {
  const { register } = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirm) {
      setError("Por favor completa todos los campos.");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await register(email, password);
      history.replace("/home");
    } catch {
      setError("No se pudo crear la cuenta. Verifica el correo ingresado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent scrollY={false}>
        <div className={styles.registerPage}>
          <div className={styles.brand}>
            <div className={styles.logo}>📓</div>
            <h1>VisualDiary</h1>
            <p>Crea tu cuenta gratuita</p>
          </div>

          <div className={styles.form}>
            <div className={styles.inputWrapper}>
              <IonInput
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value ?? "")}
                autocomplete="email"
              />
            </div>
            <div className={styles.inputWrapper}>
              <IonInput
                type="password"
                placeholder="Contraseña (mín. 6 caracteres)"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value ?? "")}
              />
            </div>
            <div className={styles.inputWrapper}>
              <IonInput
                type="password"
                placeholder="Confirmar contraseña"
                value={confirm}
                onIonChange={(e) => setConfirm(e.detail.value ?? "")}
              />
            </div>
            {error && <p className={styles.errorMsg}>{error}</p>}
            <IonButton
              expand="block"
              className={styles.btn}
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? <IonSpinner name="crescent" /> : "Crear cuenta"}
            </IonButton>
            <p className={styles.link}>
              ¿Ya tienes cuenta?{" "}
              <a onClick={() => history.push("/login")}>Inicia sesión</a>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;

