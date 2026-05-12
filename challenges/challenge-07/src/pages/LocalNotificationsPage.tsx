import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonBackButton,
  IonButtons,
  IonText,
} from '@ionic/react';
import useLocalNotifications from '../hooks/useLocalNotifications';
import { APP_ROUTES } from '../constants/routes';

const LocalNotificationsPage: React.FC = () => {
  const { error, sent, scheduleNotification } = useLocalNotifications();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={APP_ROUTES.HOME} />
          </IonButtons>
          <IonTitle>Local Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <p>
              La notificación aparecerá en el dispositivo según el tiempo configurado
              después de presionar el botón.
            </p>
          </IonCardContent>
        </IonCard>

        <IonButton
          expand="block"
          onClick={() =>
            scheduleNotification('Challenge 07', '¡Notificación local funcionando!', 5)
          }
        >
          Enviar notificación (5s)
        </IonButton>
        <IonButton
          expand="block"
          onClick={() =>
            scheduleNotification('Recordatorio', 'Esta es otra notificación programada', 10)
          }
          color="secondary"
        >
          Enviar notificación (10s)
        </IonButton>

        {sent && (
          <IonText color="success">
            <p>Notificación programada correctamente</p>
          </IonText>
        )}
        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default LocalNotificationsPage;
