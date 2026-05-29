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
  IonText,
  IonSpinner,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { trashOutline, locationOutline, timeOutline } from "ionicons/icons";
import { useParams, useHistory } from "react-router-dom";
import { useEntries } from "../../context/EntriesContext";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../helpers/formatDate";
import { formatAddress } from "../../helpers/formatAddress";
import styles from "./EntryDetail.module.scss";

const EntryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { entries, feedEntries, deleteEntry } = useEntries();
  const { user } = useAuth();
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Search in own entries first, then in feed (entries from other users)
  const entry = entries.find((e) => e.id === id) ?? feedEntries.find((e) => e.id === id);
  const isOwner = entry?.userId === user?.uid;

  if (!entry) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>Entry</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding ion-text-center">
          <IonText color="medium">
            <p>Entry not found.</p>
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
          {isOwner && (
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
          )}
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

        <IonCard className={styles.card}>
          <IonCardHeader>
            <IonCardTitle>{entry.title}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p className={styles.date}>
              <IonIcon icon={timeOutline} /> {formatDate(entry.createdAt)}
            </p>
            {entry.description && (
              <p className={styles.description}>{entry.description}</p>
            )}
            {entry.address && (
              <span className={styles.locationChip}>
                <IonIcon icon={locationOutline} /> {formatAddress(entry.address, 60)}
              </span>
            )}
          </IonCardContent>
        </IonCard>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Delete entry?"
          message="This action cannot be undone."
          buttons={[
            { text: "Cancel", role: "cancel" },
            { text: "Delete", handler: handleDelete },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default EntryDetail;

