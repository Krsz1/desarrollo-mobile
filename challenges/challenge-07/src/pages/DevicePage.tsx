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
import useDevice from '../hooks/useDevice';
import { APP_ROUTES } from '../constants/routes';

const DevicePage: React.FC = () => {
  const { info, battery, deviceId, error, getDeviceInfo } = useDevice();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={APP_ROUTES.HOME} />
          </IonButtons>
          <IonTitle>Device Info</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={getDeviceInfo}>
          Obtener info del dispositivo
        </IonButton>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        {info && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Información del dispositivo</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel>Modelo: {info.model}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Sistema operativo: {info.operatingSystem}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Versión SO: {info.osVersion}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Plataforma: {info.platform}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Fabricante: {info.manufacturer}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Dispositivo virtual: {info.isVirtual ? 'Sí' : 'No'}</IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        )}

        {battery && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Batería</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel>
                  Nivel: {((battery.batteryLevel ?? 0) * 100).toFixed(0)}%
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Cargando: {battery.isCharging ? 'Sí' : 'No'}</IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        )}

        {deviceId && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>ID del dispositivo</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel style={{ wordBreak: 'break-all', whiteSpace: 'normal' }}>
                  UUID: {deviceId.identifier}
                </IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DevicePage;
