import { useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonText,
  IonItem,
  IonCard,
  IonCardContent,
  IonSpinner,
} from "@ionic/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../firebase/config";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleLogin = async () => {
    setError("");
    if (!email.trim() || !password) {
      setError("Completa email y contrasena.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      history.push("/home");
    } catch (e) {
      const code = (e instanceof FirebaseError) ? e.code : "";
      if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") {
        setError("Email o contrasena incorrectos.");
      } else if (code === "auth/too-many-requests") {
        setError("Demasiados intentos. Espera unos minutos.");
      } else if (code === "auth/invalid-email") {
        setError("El formato del email no es valido.");
      } else {
        setError("Error al iniciar sesion. Intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div style={{ textAlign: "center", marginTop: 80, marginBottom: 32 }}>
          <h2 style={{ margin: "8px 0 4px" }}>MisionApp</h2>
          <p style={{ color: "#aaa", margin: 0 }}>Completa misiones y gana puntos</p>
        </div>

        <IonCard>
          <IonCardContent>
            <IonItem lines="full">
              <IonInput
                label="Email"
                labelPlacement="floating"
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
            </IonItem>

            <IonItem lines="none">
              <IonInput
                label="Contrasena"
                labelPlacement="floating"
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
            </IonItem>

            {error && (
              <IonText color="danger">
                <p style={{ padding: "8px 16px", fontSize: 14 }}>{error}</p>
              </IonText>
            )}

            <IonButton expand="block" onClick={handleLogin} disabled={loading} style={{ marginTop: 16 }}>
              {loading ? <IonSpinner name="crescent" /> : "Iniciar sesion"}
            </IonButton>

            <IonButton expand="block" fill="outline" routerLink="/register" disabled={loading}>
              Crear cuenta nueva
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
