import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonBackButton,
  IonButtons,
} from '@ionic/react';
import useHaptics from '../hooks/useHaptics';
import { APP_ROUTES } from '../constants/routes';

const HapticsPage: React.FC = () => {
  const {
    lightImpact,
    mediumImpact,
    heavyImpact,
    vibrate,
    selectionFeedback,
    notificationSuccess,
    notificationWarning,
    notificationError,
  } = useHaptics();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={APP_ROUTES.HOME} />
          </IonButtons>
          <IonTitle>Haptics</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={lightImpact} color="light">
          Vibración ligera
        </IonButton>
        <IonButton expand="block" onClick={mediumImpact} color="medium">
          Vibración media
        </IonButton>
        <IonButton expand="block" onClick={heavyImpact} color="dark">
          Vibración fuerte
        </IonButton>
        <IonButton expand="block" onClick={vibrate} color="primary">
          Vibrar
        </IonButton>
        <IonButton expand="block" onClick={selectionFeedback} color="tertiary">
          Feedback de selección
        </IonButton>
        <IonButton expand="block" onClick={notificationSuccess} color="success">
          Notificación éxito
        </IonButton>
        <IonButton expand="block" onClick={notificationWarning} color="warning">
          Notificación aviso
        </IonButton>
        <IonButton expand="block" onClick={notificationError} color="danger">
          Notificación error
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default HapticsPage;
