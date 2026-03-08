import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonButtons } from '@ionic/react';
import { logOut } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  const history = useHistory();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': '#0f0f0f', '--color': '#ffffff' } as any}>
          <IonTitle>Inicio</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout} fill="clear" style={{ '--color': '#d4af37' } as any}>
              <IonIcon icon={logOut} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Bienvenido</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="home-container">
          <div className="welcome-section">
            <h2>¡Sesión Iniciada!</h2>
            <p>Has accedido exitosamente a la aplicación.</p>
            <p className="demo-info">Usuario: usuario@mail.com</p>
            <IonButton 
              expand="block" 
              onClick={handleLogout}
              style={{ '--background': '#d4af37', '--color': '#000000' } as any}
            >
              <IonIcon icon={logOut} slot="start" />
              Cerrar Sesión
            </IonButton>
          </div>
        </div>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
