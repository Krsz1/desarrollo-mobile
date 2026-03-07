import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonToast,
  IonLoading
} from "@ionic/react"

import { useState } from "react"
import { login } from "../services/authService"

const LoginPage = ({ onLogin }: any) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleLogin() {

    setLoading(true)

    setTimeout(() => {

      const user = login(email, password)

      setLoading(false)

      if (!user) {
        setError(true)
        return
      }

      onLogin(user)

    }, 1500)

  }

  return (

    <IonPage>

      <IonContent className="ion-padding">

        <h2>Login Médico</h2>

        <IonInput
          placeholder="Email"
          value={email}
          onIonChange={e => setEmail(e.detail.value!)}
        />

        <IonInput
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onIonChange={e => setPassword(e.detail.value!)}
        />

        <IonButton onClick={() => setShowPassword(!showPassword)}>
          Mostrar / Ocultar contraseña
        </IonButton>

        <IonButton expand="block" onClick={handleLogin}>
          Ingresar
        </IonButton>

        <IonToast
          isOpen={error}
          message="Credenciales incorrectas"
          duration={2000}
          onDidDismiss={() => setError(false)}
        />

        <IonLoading
          isOpen={loading}
          message="Verificando credenciales..."
        />

      </IonContent>

    </IonPage>

  )
}

export default LoginPage
