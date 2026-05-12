import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonItem, IonLabel, IonBackButton, IonButtons, IonText, IonIcon,
} from '@ionic/react';
import { cloudOutline } from 'ionicons/icons';
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

        <div className="page-icon-header" style={{ '--accent': '#90caf9' } as React.CSSProperties}>
          <IonIcon icon={cloudOutline} />
        </div>

        <IonButton expand="block" onClick={register} disabled={registered}>
          {registered ? '✓ Dispositivo registrado' : 'Registrar dispositivo'}
        </IonButton>

        {error && <IonText color="danger"><p className="error-msg">{error}</p></IonText>}

        {token && (
          <IonCard>
            <IonCardHeader><IonCardTitle>Token FCM</IonCardTitle></IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel style={{ wordBreak: 'break-all', whiteSpace: 'normal', fontSize: '12px', color: '#90caf9' }}>
                  {token}
                </IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        )}

        {notification && (
          <IonCard>
            <IonCardHeader><IonCardTitle>Última notificación</IonCardTitle></IonCardHeader>
            <IonCardContent>
              <IonItem><IonLabel><span className="stat-key">Título</span><span className="stat-val">{notification.title}</span></IonLabel></IonItem>
              <IonItem><IonLabel><span className="stat-key">Cuerpo</span><span className="stat-val">{notification.body}</span></IonLabel></IonItem>
            </IonCardContent>
          </IonCard>
        )}

        <IonCard>
          <IonCardContent>
            <p className="info-text">Las push notifications requieren dispositivo físico y configuración de Firebase (FCM/APNs).</p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default PushNotificationsPage;
