import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
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
      <IonContent className="ion-padding">
        <div className={styles.registerPage}>
          <h1>Crear cuenta</h1>
          <div className={styles.form}>
            <IonItem>
              <IonLabel position="floating">Correo electrónico</IonLabel>
              <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value ?? "")}
                autocomplete="email"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Contraseña</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value ?? "")}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Confirmar contraseña</IonLabel>
              <IonInput
                type="password"
                value={confirm}
                onIonChange={(e) => setConfirm(e.detail.value ?? "")}
              />
            </IonItem>
            {error && <p className={styles.errorMsg}>{error}</p>}
            <IonButton expand="block" onClick={handleRegister} disabled={loading}>
              {loading ? <IonSpinner name="crescent" /> : "Registrarse"}
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
