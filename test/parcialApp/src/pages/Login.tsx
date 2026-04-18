import { useEffect, useState } from "react";
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
import { useHistory } from "react-router-dom";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import { useAuth } from "../hooks/useAuth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const { signIn, loading, error } = useFirebaseAuth();
  const { user } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.replace("/home");
    }
  }, [user, history]);

  const handleLogin = async () => {
    setLocalError("");
    if (!email || !password) {
      setLocalError("Completa email y contrasena.");
      return;
    }

    const res = await signIn(email, password);
    if (res) {
      history.push("/home");
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

            {(localError || error) && (
              <IonText color="danger">
                <p style={{ padding: "8px 16px", fontSize: 14 }}>{localError || error}</p>
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
