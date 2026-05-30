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
          <IonTitle>Live Feed</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={styles.feedPage}>
        <div className={styles.header}>
          <div className={styles.liveIndicator}>
            <span className={styles.dot} />
            Live
          </div>
          <span className={styles.count}>{feedEntries.length} entries</span>
        </div>
        {feedEntries.length === 0 ? (
          <div className={styles.emptyFeed}>
            <span className={styles.emptyIcon}>📡</span>
            <p>The feed is empty for now</p>
          </div>
        ) : (
          <IonList className={styles.list}>
            {feedEntries.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                showAuthor
                onClick={() => history.push(`/entry/${entry.id}`)}
              />
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default FeedView;
