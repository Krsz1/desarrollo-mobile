import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
  IonButton,
  IonIcon,
  IonAlert,
  IonImg,
  IonNote,
  IonText,
  IonSpinner,
} from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { useParams, useHistory } from "react-router-dom";
import { useEntries } from "../../context/EntriesContext";
import { formatDate } from "../../helpers/formatDate";
import { formatAddress } from "../../helpers/formatAddress";
import styles from "./EntryDetail.module.scss";

const EntryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { entries, deleteEntry } = useEntries();
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const entry = entries.find((e) => e.id === id);

  if (!entry) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>Entrada</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding ion-text-center">
          <IonText color="medium">
            <p>Entrada no encontrada.</p>
          </IonText>
        </IonContent>
      </IonPage>
    );
  }

  const handleDelete = async () => {
    if (!entry.id) return;
    setDeleting(true);
    await deleteEntry(entry.id);
    history.replace("/home");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>{entry.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              color="danger"
              onClick={() => setShowAlert(true)}
              disabled={deleting}
            >
              {deleting ? (
                <IonSpinner name="crescent" />
              ) : (
                <IonIcon slot="icon-only" icon={trashOutline} />
              )}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className={styles.detailPage}>
        {entry.image && (
          <IonImg
            src={`data:image/jpeg;base64,${entry.image}`}
            className={styles.heroImage}
            alt={entry.title}
          />
        )}
        <div className={styles.body}>
          <h1>{entry.title}</h1>
          {entry.address && (
            <IonNote className={styles.address}>
              📍 {formatAddress(entry.address, 80)}
            </IonNote>
          )}
          <p className={styles.date}>{formatDate(entry.createdAt)}</p>
          {entry.description && (
            <p className={styles.description}>{entry.description}</p>
          )}
        </div>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="¿Eliminar entrada?"
          message="Esta acción no se puede deshacer."
          buttons={[
            { text: "Cancelar", role: "cancel" },
            { text: "Eliminar", handler: handleDelete },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default EntryDetail;
