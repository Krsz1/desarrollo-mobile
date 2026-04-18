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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { auth, db } from "../firebase/config";
import { useHistory } from "react-router-dom";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleRegister = async () => {
    setError("");
    if (!name.trim() || !email.trim() || !password) {
      setError("Completa todos los campos.");
      return;
    }
    if (password.length < 6) {
      setError("La contrasena debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);
    let uid = "";
    try {
      const res = await createUserWithEmailAndPassword(auth, email.trim(), password);
      uid = res.user.uid;
    } catch (e) {
      const code = (e instanceof FirebaseError) ? e.code : "";
      if (code === "auth/email-already-in-use") {
        setError("Ese email ya tiene una cuenta. Inicia sesion.");
      } else if (code === "auth/invalid-email") {
        setError("El formato del email no es valido.");
      } else if (code === "auth/weak-password") {
        setError("La contrasena debe tener al menos 6 caracteres.");
      } else {
        setError("Error al registrarse. Intenta de nuevo.");
      }
      setLoading(false);
      return;
    }

    setDoc(doc(db, "users", uid), {
      name: name.trim(),
      email: email.trim(),
      points: 0,
      missions: [
        { id: 1, completed: false },
        { id: 2, completed: false },
        { id: 3, completed: false },
      ],
    }).catch(() => {});

    setLoading(false);
    history.push("/home");
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div style={{ textAlign: "center", marginTop: 80, marginBottom: 32 }}>
          <h2 style={{ margin: "8px 0 4px" }}>Crear Cuenta</h2>
          <p style={{ color: "#aaa", margin: 0 }}>Unete y compite con otros jugadores</p>
        </div>

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
                label="Contrasena (min. 6 caracteres)"
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

            <IonButton expand="block" onClick={handleRegister} disabled={loading} style={{ marginTop: 16 }}>
              {loading ? <IonSpinner name="crescent" /> : "Registrarme"}
            </IonButton>

            <IonButton expand="block" fill="outline" routerLink="/login" disabled={loading}>
              Ya tengo cuenta
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Register;
