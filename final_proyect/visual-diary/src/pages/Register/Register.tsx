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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !username.trim() || !password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await register(email, password, username.trim());
      history.replace("/home");
    } catch {
      setError("Could not create account. Please check your email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent scrollY={false}>
        <div className={styles.registerPage}>
          <div className={styles.brand}>
            <div className={styles.logo}>🌙</div>
            <h1>Lunara</h1>
            <p>Create your free account</p>
          </div>

          <div className={styles.form}>
            <div className={styles.inputWrapper}>
              <IonInput
                type="email"
                placeholder="Email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value ?? "")}
                autocomplete="email"
              />
            </div>
            <div className={styles.inputWrapper}>
              <IonInput
                type="text"
                placeholder="Username"
                value={username}
                onIonChange={(e) => setUsername(e.detail.value ?? "")}
                autocomplete="username"
              />
            </div>
            <div className={styles.inputWrapper}>
              <IonInput
                type="password"
                placeholder="Password (min. 6 characters)"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value ?? "")}
              />
            </div>
            <div className={styles.inputWrapper}>
              <IonInput
                type="password"
                placeholder="Confirm password"
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
              {loading ? <IonSpinner name="crescent" /> : "Create account"}
            </IonButton>
            <p className={styles.link}>
              Already have an account?{" "}
              <a onClick={() => history.push("/login")}>Sign in</a>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;

