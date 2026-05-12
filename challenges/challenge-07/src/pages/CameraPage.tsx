import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonImg, IonBackButton, IonButtons, IonText, IonIcon,
} from '@ionic/react';
import { cameraOutline } from 'ionicons/icons';
import useCamera from '../hooks/useCamera';
import { APP_ROUTES } from '../constants/routes';

const CameraPage: React.FC = () => {
  const { photo, error, takePhoto, openGallery } = useCamera();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={APP_ROUTES.HOME} />
          </IonButtons>
          <IonTitle>Camera</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

        <div className="page-icon-header" style={{ '--accent': '#ce93d8' } as React.CSSProperties}>
          <IonIcon icon={cameraOutline} />
        </div>

        <IonButton expand="block" onClick={takePhoto}>
          Tomar foto
        </IonButton>
        <IonButton expand="block" onClick={openGallery} color="secondary">
          Abrir galería
        </IonButton>

        {error && <IonText color="danger"><p className="error-msg">{error}</p></IonText>}

        {photo?.webPath && (
          <div className="photo-preview">
            <IonImg src={photo.webPath} />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CameraPage;
