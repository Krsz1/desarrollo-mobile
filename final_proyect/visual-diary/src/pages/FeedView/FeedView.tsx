import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonImg,
  IonNote,
} from "@ionic/react";
import styles from "./FeedView.module.scss";

// Placeholder — EntriesContext (feedEntries) will be wired in a later phase
const FeedView: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Feed en vivo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={styles.feedPage}>
        <div className={styles.liveIndicator}>
          <span className={styles.dot} />
          En vivo
        </div>
        <IonList>
          {/* feedEntries from EntriesContext will be mapped here */}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default FeedView;
