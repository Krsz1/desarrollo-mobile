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
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      history.replace("/home");
    } catch {
      setError("Incorrect email or password.");
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
            <p>Your personal visual diary</p>
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
                type="password"
                placeholder="Password"
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
              {loading ? <IonSpinner name="crescent" /> : "Sign in"}
            </IonButton>
            <p className={styles.link}>
              Don't have an account?{" "}
              <a onClick={() => history.push("/register")}>Sign up</a>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;

