import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import {
  locationOutline,
  cameraOutline,
  flashOutline,
  phonePortraitOutline,
  pulseOutline,
  folderOutline,
  notificationsOutline,
  cloudOutline,
} from 'ionicons/icons';
import './Home.css';
import { APP_ROUTES } from '../constants/routes';

const sensors = [
  { label: 'Geolocation', path: APP_ROUTES.GEOLOCATION, icon: locationOutline, color: 'primary' },
  { label: 'Camera', path: APP_ROUTES.CAMERA, icon: cameraOutline, color: 'secondary' },
  { label: 'Motion / Accelerometer', path: APP_ROUTES.MOTION, icon: flashOutline, color: 'tertiary' },
  { label: 'Device', path: APP_ROUTES.DEVICE, icon: phonePortraitOutline, color: 'success' },
  { label: 'Haptics', path: APP_ROUTES.HAPTICS, icon: pulseOutline, color: 'warning' },
  { label: 'Filesystem', path: APP_ROUTES.FILESYSTEM, icon: folderOutline, color: 'medium' },
  { label: 'Local Notifications', path: APP_ROUTES.LOCAL_NOTIFICATIONS, icon: notificationsOutline, color: 'danger' },
  { label: 'Push Notifications', path: APP_ROUTES.PUSH_NOTIFICATIONS, icon: cloudOutline, color: 'dark' },
];

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Challenge 07 - Sensors</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Sensors</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList className="ion-padding">
          {sensors.map(sensor => (
            <IonItem key={sensor.path} button onClick={() => history.push(sensor.path)}>
              <IonIcon icon={sensor.icon} slot="start" color={sensor.color} />
              <IonLabel>{sensor.label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
