import React from "react";
import {
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonSpinner,
  IonButton,
  IonButtons,
} from "@ionic/react";
import { add, logOut } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEntries } from "../../context/EntriesContext";
import EntryCard from "../../components/EntryCard/EntryCard";
import styles from "./EntryList.module.scss";

const EntryList: React.FC = () => {
  const { logout } = useAuth();
  const { entries, loading } = useEntries();
  const history = useHistory();

  const handleLogout = async () => {
    await logout();
    history.replace("/login");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>My Diary</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon slot="icon-only" icon={logOut} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className={styles.entryListPage}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
            <IonSpinner name="crescent" color="primary" />
          </div>
        ) : entries.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📖</div>
            <h3>Your diary is empty</h3>
            <p>Tap the + button to create your first entry</p>
          </div>
        ) : (
          <IonList className={styles.list}>
            {entries.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                onClick={() => history.push(`/entry/${entry.id}`)}
              />
            ))}
          </IonList>
        )}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/new" className={styles.fab}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default EntryList;
