import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonItem, IonLabel, IonBackButton, IonButtons, IonText, IonIcon,
} from '@ionic/react';
import { flashOutline } from 'ionicons/icons';
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

        <div className="page-icon-header" style={{ '--accent': '#ffcc02' } as React.CSSProperties}>
          <IonIcon icon={flashOutline} />
        </div>

        <IonButton expand="block" onClick={startListening} disabled={isListening} color="success">
          Iniciar sensores
        </IonButton>
        <IonButton expand="block" onClick={stopListening} disabled={!isListening} color="danger">
          Detener sensores
        </IonButton>

        {error && <IonText color="danger"><p className="error-msg">{error}</p></IonText>}

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Acelerómetro</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel><span className="stat-key">X</span><span className="stat-val">{accelX !== null ? accelX.toFixed(4) : '—'}</span></IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel><span className="stat-key">Y</span><span className="stat-val">{accelY !== null ? accelY.toFixed(4) : '—'}</span></IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel><span className="stat-key">Z</span><span className="stat-val">{accelZ !== null ? accelZ.toFixed(4) : '—'}</span></IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Orientación</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel><span className="stat-key">Alpha</span><span className="stat-val">{alpha !== null ? alpha.toFixed(2) : '—'}</span></IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel><span className="stat-key">Beta</span><span className="stat-val">{beta !== null ? beta.toFixed(2) : '—'}</span></IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel><span className="stat-key">Gamma</span><span className="stat-val">{gamma !== null ? gamma.toFixed(2) : '—'}</span></IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default MotionPage;
