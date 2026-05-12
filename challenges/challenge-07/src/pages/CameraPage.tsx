import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonImg,
  IonBackButton,
  IonButtons,
  IonText,
} from '@ionic/react';
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
        <IonButton expand="block" onClick={takePhoto}>
          Tomar foto
        </IonButton>
        <IonButton expand="block" onClick={openGallery} color="secondary">
          Abrir galería
        </IonButton>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        {photo?.webPath && (
          <IonImg
            src={photo.webPath}
            style={{ marginTop: '16px', borderRadius: '8px' }}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default CameraPage;
