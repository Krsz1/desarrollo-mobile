import React, { useState, useEffect } from "react";
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
} from "@ionic/react";
import { trashOutline, locationOutline, timeOutline, createOutline } from "ionicons/icons";
import { useParams, useHistory } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/FirebaseService";
import { useEntries } from "../../context/EntriesContext";
import { useAuth } from "../../context/AuthContext";
import { Entry } from "../../types/Entry";
import { formatDate, getMoodChip } from "../../helpers/formatDate";
import { formatAddress } from "../../helpers/formatAddress";
import { reverseGeocode } from "../../services/GeoService";
import { useHaptics } from "../../hooks/useHaptics";
import styles from "./EntryDetail.module.scss";

const EntryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { entries, feedEntries, loading, deleteEntry, updateEntry } = useEntries();
  const { user } = useAuth();
  const { notification, NotificationType } = useHaptics();
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [fetchedEntry, setFetchedEntry] = useState<Entry | null>(null);
  const [fetchError, setFetchError] = useState(false);

  // Search in own entries first, then in feed (entries from other users)
  const contextEntry = entries.find((e) => e.id === id) ?? feedEntries.find((e) => e.id === id);
  const entry = contextEntry ?? fetchedEntry ?? undefined;
  const isOwner = entry?.userId === user?.uid;

  // Fallback: if context doesn't have the entry yet, fetch directly from Firestore
  useEffect(() => {
    if (contextEntry || loading) return;
    getDoc(doc(db, "entries", id))
      .then((snap) => {
        if (snap.exists()) {
          setFetchedEntry({ id: snap.id, ...(snap.data() as Omit<Entry, "id">) });
        } else {
          setFetchError(true);
        }
      })
      .catch(() => setFetchError(true));
  }, [id, contextEntry, loading]);

  const isRawCoords = (addr: string) => /^-?\d+\.\d+,\s*-?\d+\.\d+$/.test(addr?.trim());
  const [resolvedAddress, setResolvedAddress] = useState<string>("");

  useEffect(() => {
    if (!entry) return;
    if (entry.address && !isRawCoords(entry.address)) {
      setResolvedAddress(entry.address);
      return;
    }
    if (!entry.latitude && !entry.longitude) return;
    reverseGeocode(entry.latitude, entry.longitude).then((addr) => {
      setResolvedAddress(addr);
      // Update Firestore only if it was raw coords and we got a real address
      if (isOwner && entry.id && addr && !isRawCoords(addr)) {
        updateEntry(entry.id, { address: addr }).catch(() => {});
      }
    });
  }, [entry?.id]);

  // Show spinner while context is loading OR while we are doing the fallback fetch
  const isFetching = loading || (!entry && !fetchError && !contextEntry);

  if (isFetching) {
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
          <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
            <IonSpinner name="crescent" color="primary" />
          </div>
        </IonContent>
      </IonPage>
    );
  }

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
    await notification(NotificationType.Warning);
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
                onClick={() => history.push(`/entry/${entry.id}/edit`)}
                disabled={deleting}
              >
                <IonIcon slot="icon-only" icon={createOutline} />
              </IonButton>
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
        {entry.image ? (
          <IonImg
            src={`data:image/jpeg;base64,${entry.image}`}
            className={styles.heroImage}
            alt={entry.title}
          />
        ) : (
          <div className={styles.heroPlaceholder} />
        )}

        <div className={styles.card}>
          <h2 className={styles.title}>{entry.title}</h2>
          <p className={styles.date}>
            <span className={styles.moodChip}>
              {getMoodChip(entry.createdAt).icon} {getMoodChip(entry.createdAt).label}
            </span>
            <IonIcon icon={timeOutline} />
            {formatDate(entry.createdAt)}
          </p>
          {entry.description && (
            <p className={styles.description}>{entry.description}</p>
          )}
          {entry.address && (
            <span className={styles.locationChip}>
              <IonIcon icon={locationOutline} />
              {formatAddress(resolvedAddress || entry.address, 60)}
            </span>
          )}
        </div>

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

