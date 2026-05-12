import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonRippleEffect,
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
  { label: 'Geolocation',          path: APP_ROUTES.GEOLOCATION,          icon: locationOutline,       accent: '#4fc3f7' },
  { label: 'Camera',               path: APP_ROUTES.CAMERA,               icon: cameraOutline,         accent: '#ce93d8' },
  { label: 'Motion',               path: APP_ROUTES.MOTION,               icon: flashOutline,          accent: '#ffcc02' },
  { label: 'Device',               path: APP_ROUTES.DEVICE,               icon: phonePortraitOutline,  accent: '#66bb6a' },
  { label: 'Haptics',              path: APP_ROUTES.HAPTICS,              icon: pulseOutline,          accent: '#ffa726' },
  { label: 'Filesystem',           path: APP_ROUTES.FILESYSTEM,           icon: folderOutline,         accent: '#80cbc4' },
  { label: 'Local\nNotifications', path: APP_ROUTES.LOCAL_NOTIFICATIONS,  icon: notificationsOutline,  accent: '#ef5350' },
  { label: 'Push\nNotifications',  path: APP_ROUTES.PUSH_NOTIFICATIONS,   icon: cloudOutline,          accent: '#90caf9' },
];

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sensors</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="home-header">
          <p className="home-subtitle">Challenge 07 — Device APIs</p>
        </div>

        <IonGrid className="sensor-grid">
          <IonRow>
            {sensors.map(sensor => (
              <IonCol size="6" key={sensor.path}>
                <div
                  className="sensor-card ion-activatable"
                  style={{ '--accent': sensor.accent } as React.CSSProperties}
                  onClick={() => history.push(sensor.path)}
                >
                  <IonRippleEffect />
                  <div className="sensor-icon-wrap">
                    <IonIcon icon={sensor.icon} className="sensor-icon" />
                  </div>
                  <span className="sensor-label">{sensor.label}</span>
                </div>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
