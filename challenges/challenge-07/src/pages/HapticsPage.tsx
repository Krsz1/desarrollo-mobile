import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonCard, IonCardContent, IonBackButton, IonButtons, IonIcon,
} from '@ionic/react';
import { pulseOutline } from 'ionicons/icons';
import useHaptics from '../hooks/useHaptics';
import { APP_ROUTES } from '../constants/routes';

const HapticsPage: React.FC = () => {
  const { lightImpact, mediumImpact, heavyImpact, vibrate, selectionFeedback, notificationSuccess, notificationWarning, notificationError } = useHaptics();

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

        <div className="page-icon-header" style={{ '--accent': '#ffa726' } as React.CSSProperties}>
          <IonIcon icon={pulseOutline} />
        </div>

        <IonCard>
          <IonCardContent>
            <p className="section-label">Impacto</p>
            <IonButton expand="block" onClick={lightImpact} color="light">Vibración ligera</IonButton>
            <IonButton expand="block" onClick={mediumImpact} color="medium">Vibración media</IonButton>
            <IonButton expand="block" onClick={heavyImpact} color="dark">Vibración fuerte</IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <p className="section-label">Feedback</p>
            <IonButton expand="block" onClick={vibrate} color="primary">Vibrar</IonButton>
            <IonButton expand="block" onClick={selectionFeedback} color="tertiary">Selección</IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <p className="section-label">Notificación</p>
            <IonButton expand="block" onClick={notificationSuccess} color="success">Éxito</IonButton>
            <IonButton expand="block" onClick={notificationWarning} color="warning">Aviso</IonButton>
            <IonButton expand="block" onClick={notificationError} color="danger">Error</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default HapticsPage;
