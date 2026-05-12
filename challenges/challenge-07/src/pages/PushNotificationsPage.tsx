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
import usePushNotifications from '../hooks/usePushNotifications';
import { APP_ROUTES } from '../constants/routes';

const PushNotificationsPage: React.FC = () => {
  const { token, notification, error, registered, register } = usePushNotifications();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={APP_ROUTES.HOME} />
          </IonButtons>
          <IonTitle>Push Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={register} disabled={registered}>
          {registered ? 'Dispositivo registrado' : 'Registrar dispositivo'}
        </IonButton>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        {token && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Token Push (FCM)</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel style={{ wordBreak: 'break-all', whiteSpace: 'normal' }}>
                  {token}
                </IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        )}

        {notification && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Última notificación recibida</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel>Título: {notification.title}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Cuerpo: {notification.body}</IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        )}

        <IonCard>
          <IonCardContent>
            <p>
              Las push notifications requieren un dispositivo físico y configuración de
              Firebase (FCM/APNs) para funcionar completamente. En el emulador solo se
              obtiene el token.
            </p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default PushNotificationsPage;
