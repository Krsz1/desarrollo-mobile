import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonInput,
  IonButton,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    
    // Pequeño delay para simular validación
    setTimeout(() => {
      const isValid = login(email, password);
      
      if (isValid) {
        history.push('/home');
      } else {
        setShowAlert(true);
        setPassword('');
      }
      setLoading(false);
    }, 500);
  };

  const isFormValid = email.trim().length > 0 && password.length > 0;

  return (
    <IonPage>
      <IonContent fullscreen className="login-content">
        <IonGrid className="ion-padding-vertical">
          <IonRow className="ion-justify-content-center ion-align-items-center" style={{ minHeight: '100vh' }}>
            <IonCol sizeSm="12" sizeMd="6" sizeLg="4">
              <div className="login-container">
                <h1 className="login-title">Bienvenido</h1>
                <p className="login-subtitle">Inicia sesión para continuar</p>

                <IonCard className="login-card">
                  <IonCardContent className="login-card-content">
                    <IonGrid>
                      <IonRow>
                        <IonCol size="12">
                          <label className="login-label">Correo Electrónico</label>
                          <IonInput
                            type="email"
                            placeholder="usuario@mail.com"
                            value={email}
                            onIonChange={(e) => setEmail(e.detail.value || '')}
                            className="login-input"
                          />
                        </IonCol>
                      </IonRow>

                      <IonRow>
                        <IonCol size="12">
                          <label className="login-label">Contraseña</label>
                          <IonInput
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onIonChange={(e) => setPassword(e.detail.value || '')}
                            className="login-input"
                          />
                        </IonCol>
                      </IonRow>

                      <IonRow>
                        <IonCol size="12">
                          <IonButton
                            expand="block"
                            onClick={handleLogin}
                            disabled={!isFormValid || loading}
                            className="login-button"
                          >
                            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>

                <div className="demo-credentials">
                  <IonText color="medium">
                    <small>
                      <strong>Credenciales de demostración:</strong>
                      <br />
                      Email: usuario@mail.com
                      <br />
                      Contraseña: 123
                    </small>
                  </IonText>
                </div>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Error de Inicio de Sesión'}
          message={'El correo o contraseña son incorrectos. Intenta nuevamente.'}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
