import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonSpinner,
  IonIcon,
} from "@ionic/react";
import { eyeOutline, eyeOffOutline } from "ionicons/icons";
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

  const [showPassword, setShowPassword] = useState(false);

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
    } catch (err) {
      const code = (err as { code?: string }).code ?? "";
      if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential") {
        setError("Incorrect email or password.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError((err as { message?: string }).message ?? "Incorrect email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent scrollY={false}>
        <div className={styles.loginPage}>
          <div className={styles.brand}>
            <div className={styles.logo}>🌙</div>
            <h1>Lunara</h1>
            <p>Capture moments beautifully.</p>
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
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value ?? "")}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <IonIcon icon={showPassword ? eyeOffOutline : eyeOutline} />
              </button>
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

