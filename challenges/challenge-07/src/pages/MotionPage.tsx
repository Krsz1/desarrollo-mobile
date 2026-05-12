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
import useAccelerometer from '../hooks/useAccelerometer';
import { APP_ROUTES } from '../constants/routes';

const MotionPage: React.FC = () => {
  const { accelX, accelY, accelZ, alpha, beta, gamma, isListening, error, startListening, stopListening } =
    useAccelerometer();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={APP_ROUTES.HOME} />
          </IonButtons>
          <IonTitle>Motion / Accelerometer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={startListening} disabled={isListening} color="success">
          Iniciar sensores
        </IonButton>
        <IonButton expand="block" onClick={stopListening} disabled={!isListening} color="danger">
          Detener sensores
        </IonButton>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Acelerómetro</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel>X: {accelX !== null ? accelX.toFixed(4) : '—'}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Y: {accelY !== null ? accelY.toFixed(4) : '—'}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Z: {accelZ !== null ? accelZ.toFixed(4) : '—'}</IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Orientación</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel>Alpha: {alpha !== null ? alpha.toFixed(2) : '—'}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Beta: {beta !== null ? beta.toFixed(2) : '—'}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Gamma: {gamma !== null ? gamma.toFixed(2) : '—'}</IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default MotionPage;
