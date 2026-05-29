import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useEntries } from "../../context/EntriesContext";
import EntryCard from "../../components/EntryCard/EntryCard";
import styles from "./FeedView.module.scss";

const FeedView: React.FC = () => {
  const { feedEntries } = useEntries();
  const history = useHistory();

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
          {feedEntries.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onClick={() => history.push(`/entry/${entry.id}`)}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default FeedView;
