import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonImg,
  IonButton,
  IonButtons,
} from "@ionic/react";
import { add, logOut } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./EntryList.module.scss";

// Placeholder — EntriesContext will be wired in a later phase
const EntryList: React.FC = () => {
  const { user, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    await logout();
    history.replace("/login");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mi Diario</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOut} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className={styles.entryListPage}>
        {/* Entries list will render here once EntriesContext is wired */}
        <IonList>
          {/* Placeholder empty state */}
        </IonList>
        <div className={styles.emptyState}>
          <IonIcon icon={add} />
          <p>No hay entradas aún. ¡Crea la primera!</p>
        </div>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/new">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default EntryList;
