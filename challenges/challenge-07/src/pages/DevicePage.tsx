import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonItem, IonLabel, IonBackButton, IonButtons, IonText, IonIcon,
} from '@ionic/react';
import { phonePortraitOutline } from 'ionicons/icons';
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

        <div className="page-icon-header" style={{ '--accent': '#66bb6a' } as React.CSSProperties}>
          <IonIcon icon={phonePortraitOutline} />
        </div>

        <IonButton expand="block" onClick={getDeviceInfo}>
          Obtener info del dispositivo
        </IonButton>

        {error && <IonText color="danger"><p className="error-msg">{error}</p></IonText>}

        {info && (
          <IonCard>
            <IonCardHeader><IonCardTitle>Dispositivo</IonCardTitle></IonCardHeader>
            <IonCardContent>
              <IonItem><IonLabel><span className="stat-key">Modelo</span><span className="stat-val">{info.model}</span></IonLabel></IonItem>
              <IonItem><IonLabel><span className="stat-key">Sistema operativo</span><span className="stat-val">{info.operatingSystem}</span></IonLabel></IonItem>
              <IonItem><IonLabel><span className="stat-key">Versión SO</span><span className="stat-val">{info.osVersion}</span></IonLabel></IonItem>
              <IonItem><IonLabel><span className="stat-key">Plataforma</span><span className="stat-val">{info.platform}</span></IonLabel></IonItem>
              <IonItem><IonLabel><span className="stat-key">Fabricante</span><span className="stat-val">{info.manufacturer}</span></IonLabel></IonItem>
              <IonItem><IonLabel><span className="stat-key">Virtual</span><span className="stat-val">{info.isVirtual ? 'Sí' : 'No'}</span></IonLabel></IonItem>
            </IonCardContent>
          </IonCard>
        )}

        {battery && (
          <IonCard>
            <IonCardHeader><IonCardTitle>Batería</IonCardTitle></IonCardHeader>
            <IonCardContent>
              <IonItem><IonLabel><span className="stat-key">Nivel</span><span className="stat-val">{((battery.batteryLevel ?? 0) * 100).toFixed(0)}%</span></IonLabel></IonItem>
              <IonItem><IonLabel><span className="stat-key">Cargando</span><span className="stat-val">{battery.isCharging ? 'Sí' : 'No'}</span></IonLabel></IonItem>
            </IonCardContent>
          </IonCard>
        )}

        {deviceId && (
          <IonCard>
            <IonCardHeader><IonCardTitle>Identificador</IonCardTitle></IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel style={{ wordBreak: 'break-all', whiteSpace: 'normal' }}>
                  <span className="stat-key">UUID</span>
                  <span className="stat-val small">{deviceId.identifier}</span>
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
