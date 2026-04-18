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
} from "@ionic/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory(); 

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.push("/home");
    } catch {
      setError("Email o contraseña incorrectos");
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">

        {/* título */}
        <div style={{ textAlign: "center", marginTop: 80, marginBottom: 32 }}>
          <div style={{ fontSize: 56 }}></div>
          <h2 style={{ margin: "8px 0 4px" }}>MisionApp</h2>
          <p style={{ color: "#aaa", margin: 0 }}>Completa misiones y gana puntos</p>
        </div>

        {/* Form */}
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
                label="Contraseña"
                labelPlacement="floating"
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
            </IonItem>

            {/* Mensaje de error*/}
            {error && (
              <IonText color="danger">
                <p style={{ paddingLeft: 16, fontSize: 14 }}>{error}</p>
              </IonText>
            )}

            <IonButton expand="block" onClick={handleLogin} style={{ marginTop: 16 }}>
              Iniciar sesión
            </IonButton>

            <IonButton expand="block" fill="outline" routerLink="/register">
              Crear cuenta nueva
            </IonButton>

          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Login;
