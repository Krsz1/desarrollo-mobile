import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const history = useHistory();

  const navigateToTasks = () => {
    history.push('/tasks');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div style={{ padding: '20px' }}>
          <IonButton expand="block" color="primary" onClick={navigateToTasks}>
            <IonIcon icon={checkmark} slot="start" />
            Ir al Administrador de Tareas
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
