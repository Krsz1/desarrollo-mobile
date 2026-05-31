import React, { useState, useEffect } from "react";
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
import { ImpactStyle } from "@capacitor/haptics";
import { useHaptics } from "../../hooks/useHaptics";
import { reverseGeocode } from "../../services/GeoService";
import styles from "./NewEntry.module.scss";

const NewEntry: React.FC = () => {
  const { user } = useAuth();
  const { addEntry } = useEntries();
  const { takePhoto } = useCamera();
  const { getCurrentPosition } = useGeolocation();
  const { isOnline } = useNetwork();
  const { notification, impact } = useHaptics();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);

  // Pre-fetch location when screen opens so it's ready when user saves
  const [cachedPos, setCachedPos] = useState<{ latitude: number; longitude: number } | null>(null);
  const [cachedAddress, setCachedAddress] = useState("");
  const [addressLoading, setAddressLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const prefetch = async () => {
      setAddressLoading(true);
      const pos = await getCurrentPosition();
      if (cancelled) return;
      if (pos) {
        setCachedPos(pos);
        const addr = await reverseGeocode(pos.latitude, pos.longitude);
        if (!cancelled) setCachedAddress(addr);
      }
      setAddressLoading(false);
    };
    prefetch();
    return () => { cancelled = true; };
  }, [getCurrentPosition]);

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
      await addEntry({
        title: title.trim(),
        description: description.trim(),
        image,
        latitude: cachedPos?.latitude ?? 0,
        longitude: cachedPos?.longitude ?? 0,
        address: cachedAddress,
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
              disabled={saving || !title.trim()}
            >
              {saving ? <IonSpinner name="crescent" /> : "Save"}
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
          {addressLoading
            ? "Getting location…"
            : cachedAddress
              ? cachedAddress.length > 50 ? cachedAddress.slice(0, 50) + "…" : cachedAddress
              : "Location unavailable"}
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
