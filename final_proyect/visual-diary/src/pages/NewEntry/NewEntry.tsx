import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon,
  IonInput,
  IonTextarea,
  IonSpinner,
  IonBackButton,
  IonText,
} from "@ionic/react";
import { camera, location } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEntries } from "../../context/EntriesContext";
import { useCamera } from "../../hooks/useCamera";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useNetwork } from "../../hooks/useNetwork";
import { useHaptics } from "../../hooks/useHaptics";
import { reverseGeocode } from "../../services/GeoService";
import styles from "./NewEntry.module.scss";

const NewEntry: React.FC = () => {
  const { user } = useAuth();
  const { addEntry } = useEntries();
  const { takePhoto } = useCamera();
  const { getCurrentPosition, loading: gpsLoading } = useGeolocation();
  const { isOnline } = useNetwork();
  const { notification, ImpactStyle, impact } = useHaptics();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);

  const handlePhoto = async () => {
    const base64 = await takePhoto();
    if (base64) {
      await impact(ImpactStyle.Light);
      setImage(base64);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !user) return;
    setSaving(true);
    try {
      let latitude = 0;
      let longitude = 0;
      let address = "";

      const pos = await getCurrentPosition();
      if (pos) {
        latitude = pos.latitude;
        longitude = pos.longitude;
        address = isOnline
          ? await reverseGeocode(latitude, longitude)
          : `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
      }

      await addEntry({
        title: title.trim(),
        description: description.trim(),
        image,
        latitude,
        longitude,
        address,
        userId: user.uid,
        userName: user.displayName ?? user.email?.split("@")[0] ?? "user",
      });
      await notification();
      history.replace("/home");
    } finally {
      setSaving(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>New Entry</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={handleSave}
              disabled={saving || gpsLoading || !title.trim()}
            >
              {saving || gpsLoading ? <IonSpinner name="crescent" /> : "Save"}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className={`ion-padding ${styles.newEntryPage}`}>
        {image ? (
          <img
            src={`data:image/jpeg;base64,${image}`}
            className={styles.photoPreview}
            alt="Entry photo"
            onClick={handlePhoto}
          />
        ) : (
          <div className={styles.photoPlaceholder} onClick={handlePhoto}>
            <IonIcon icon={camera} />
            <span>Tap to add photo</span>
          </div>
        )}
        <div className={styles.inputField}>
          <IonInput
            placeholder="Title *"
            value={title}
            onIonChange={(e) => setTitle(e.detail.value ?? "")}
            maxlength={80}
          />
        </div>
        <div className={styles.inputField}>
          <IonTextarea
            placeholder="Description (optional)"
            value={description}
            onIonChange={(e) => setDescription(e.detail.value ?? "")}
            rows={4}
            autoGrow
          />
        </div>
        <p className={styles.locationInfo}>
          <IonIcon icon={location} />{" "}
          {gpsLoading ? "Getting location…" : "GPS location will be detected on save"}
        </p>
        {!isOnline && (
          <IonText color="warning">
            <p style={{ padding: "0 4px", fontSize: "0.82rem" }}>
              Offline — coordinates will be saved without geocoding.
            </p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default NewEntry;
