import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonNote,
} from "@ionic/react";
import { getTrackingHistory, TrackingEntry } from "../services/storageService";

const History: React.FC = () => {
  const tracking: TrackingEntry[] = getTrackingHistory().reverse();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Historial</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {tracking.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "40px", color: "#888" }}>
            No hay registros aún. Guarda tu primera ubicación.
          </p>
        )}
        {tracking.map((item, index) => (
          <IonItem key={index}>
            <IonLabel>
              <h2>📍 {item.lat.toFixed(5)}, {item.lng.toFixed(5)}</h2>
              <IonNote>{new Date(item.date).toLocaleString()}</IonNote>
            </IonLabel>
          </IonItem>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default History;
