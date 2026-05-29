import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import styles from "./MapView.module.scss";

// Placeholder — react-leaflet map + EntriesContext will be wired in a later phase
const MapView: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mapa</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={styles.mapPage}>
        <div className={styles.mapContainer}>
          {/* LeafletMap with entry markers will be rendered here */}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MapView;
