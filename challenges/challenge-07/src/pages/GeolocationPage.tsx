import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonBackButton,
  IonButtons,
  IonText,
} from '@ionic/react';
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
        <IonButton expand="block" onClick={getCurrentPosition}>
          Obtener ubicación actual
        </IonButton>
        <IonButton
          expand="block"
          onClick={startWatch}
          disabled={isWatching}
          color="success"
        >
          Iniciar seguimiento
        </IonButton>
        <IonButton
          expand="block"
          onClick={stopWatch}
          disabled={!isWatching}
          color="danger"
        >
          Detener seguimiento
        </IonButton>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        {position && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Posición actual</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel>Latitud: {position.coords.latitude}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Longitud: {position.coords.longitude}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Altitud: {position.coords.altitude ?? 'N/A'}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Velocidad: {position.coords.speed ?? 'N/A'}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Dirección: {position.coords.heading ?? 'N/A'}</IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default GeolocationPage;
