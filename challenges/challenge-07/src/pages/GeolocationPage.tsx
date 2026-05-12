import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonItem, IonLabel, IonBackButton, IonButtons, IonText, IonIcon,
} from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import useGeolocation from '../hooks/useGeolocation';
import { APP_ROUTES } from '../constants/routes';

const GeolocationPage: React.FC = () => {
  const { position, error, isWatching, getCurrentPosition, startWatch, stopWatch } = useGeolocation();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={APP_ROUTES.HOME} />
          </IonButtons>
          <IonTitle>Geolocation</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

        <div className="page-icon-header" style={{ '--accent': '#4fc3f7' } as React.CSSProperties}>
          <IonIcon icon={locationOutline} />
        </div>

        <IonButton expand="block" onClick={getCurrentPosition}>
          Obtener ubicación actual
        </IonButton>
        <IonButton expand="block" onClick={startWatch} disabled={isWatching} color="success">
          Iniciar seguimiento
        </IonButton>
        <IonButton expand="block" onClick={stopWatch} disabled={!isWatching} color="danger">
          Detener seguimiento
        </IonButton>

        {error && <IonText color="danger"><p className="error-msg">{error}</p></IonText>}

        {position && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Posición actual</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel><span className="stat-key">Latitud</span><span className="stat-val">{position.coords.latitude.toFixed(6)}</span></IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel><span className="stat-key">Longitud</span><span className="stat-val">{position.coords.longitude.toFixed(6)}</span></IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel><span className="stat-key">Altitud</span><span className="stat-val">{position.coords.altitude ?? 'N/A'}</span></IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel><span className="stat-key">Velocidad</span><span className="stat-val">{position.coords.speed ?? 'N/A'}</span></IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel><span className="stat-key">Dirección</span><span className="stat-val">{position.coords.heading ?? 'N/A'}</span></IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default GeolocationPage;
