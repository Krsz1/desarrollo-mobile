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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useHistory } from "react-router-dom";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {

      const resultado = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", resultado.user.uid), {
        name: name,
        email: email,
        points: 0,
        missions: [
          { id: 1, completed: false },
          { id: 2, completed: false },
          { id: 3, completed: false },
        ],
      });

      history.push("/home");
    } catch {
      setError("Error al registrarse. El email puede estar en uso.");
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">

        {/* título */}
        <div style={{ textAlign: "center", marginTop: 80, marginBottom: 32 }}>
          <div style={{ fontSize: 56 }}>📝</div>
          <h2 style={{ margin: "8px 0 4px" }}>Crear Cuenta</h2>
          <p style={{ color: "#aaa", margin: 0 }}>Únete y compite con otros jugadores</p>
        </div>

        {/* Form */}
        <IonCard>
          <IonCardContent>

            <IonItem lines="full">
              <IonInput
                label="Nombre"
                labelPlacement="floating"
                value={name}
                onIonChange={(e) => setName(e.detail.value!)}
              />
            </IonItem>

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
                label="Contraseña (mín. 6 caracteres)"
                labelPlacement="floating"
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
            </IonItem>

            {/* Error */}
            {error && (
              <IonText color="danger">
                <p style={{ paddingLeft: 16, fontSize: 14 }}>{error}</p>
              </IonText>
            )}

            <IonButton expand="block" onClick={handleRegister} style={{ marginTop: 16 }}>
              Registrarme
            </IonButton>

            <IonButton expand="block" fill="outline" routerLink="/login">
              Ya tengo cuenta
            </IonButton>

          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Register;
