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
import styles from "./Login.module.scss";

const Login: React.FC = () => {
  const { login } = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Por favor completa todos los campos.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      history.replace("/home");
    } catch {
      setError("Correo o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent scrollY={false}>
        <div className={styles.loginPage}>
          <div className={styles.brand}>
            <div className={styles.logo}>📓</div>
            <h1>VisualDiary</h1>
            <p>Tu bitácora visual personal</p>
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
                placeholder="Contraseña"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value ?? "")}
              />
            </div>
            {error && <p className={styles.errorMsg}>{error}</p>}
            <IonButton
              expand="block"
              className={styles.btn}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? <IonSpinner name="crescent" /> : "Iniciar sesión"}
            </IonButton>
            <p className={styles.link}>
              ¿No tienes cuenta?{" "}
              <a onClick={() => history.push("/register")}>Regístrate</a>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;

