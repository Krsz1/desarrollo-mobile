import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonCard, IonCardContent, IonBackButton, IonButtons, IonText, IonIcon,
} from '@ionic/react';
import { notificationsOutline } from 'ionicons/icons';
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

        <div className="page-icon-header" style={{ '--accent': '#ef5350' } as React.CSSProperties}>
          <IonIcon icon={notificationsOutline} />
        </div>

        <IonCard>
          <IonCardContent>
            <p className="info-text">La notificación aparece en el dispositivo después del tiempo configurado.</p>
          </IonCardContent>
        </IonCard>

        <IonButton expand="block" onClick={() => scheduleNotification('Challenge 07', '¡Notificación local funcionando!', 5)}>
          Enviar notificación (5s)
        </IonButton>
        <IonButton expand="block" color="secondary" onClick={() => scheduleNotification('Recordatorio', 'Esta es otra notificación programada', 10)}>
          Enviar notificación (10s)
        </IonButton>

        {sent && <IonText color="success"><p className="feedback-msg">✓ Notificación programada correctamente</p></IonText>}
        {error && <IonText color="danger"><p className="error-msg">{error}</p></IonText>}
      </IonContent>
    </IonPage>
  );
};

export default LocalNotificationsPage;
