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
  IonItem,
  IonLabel,
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
import { reverseGeocode } from "../../services/GeoService";
import styles from "./NewEntry.module.scss";

const NewEntry: React.FC = () => {
  const { user } = useAuth();
  const { addEntry } = useEntries();
  const { takePhoto } = useCamera();
  const { getCurrentPosition, loading: gpsLoading } = useGeolocation();
  const { isOnline } = useNetwork();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);

  const handlePhoto = async () => {
    const base64 = await takePhoto();
    if (base64) setImage(base64);
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
      });
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
          <IonTitle>Nueva Entrada</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={handleSave}
              disabled={saving || gpsLoading || !title.trim()}
            >
              {saving || gpsLoading ? <IonSpinner name="crescent" /> : "Guardar"}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className={`ion-padding ${styles.newEntryPage}`}>
        {image ? (
          <img
            src={`data:image/jpeg;base64,${image}`}
            className={styles.photoPreview}
            alt="Foto entrada"
            onClick={handlePhoto}
          />
        ) : (
          <div className={styles.photoPlaceholder} onClick={handlePhoto}>
            <IonIcon icon={camera} />
            <span>Toca para agregar foto</span>
          </div>
        )}
        <IonItem>
          <IonLabel position="floating">Título *</IonLabel>
          <IonInput
            value={title}
            onIonChange={(e) => setTitle(e.detail.value ?? "")}
            maxlength={80}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Descripción</IonLabel>
          <IonTextarea
            value={description}
            onIonChange={(e) => setDescription(e.detail.value ?? "")}
            rows={4}
          />
        </IonItem>
        <p className={styles.locationInfo}>
          <IonIcon icon={location} />{" "}
          {gpsLoading ? "Obteniendo ubicación…" : "La ubicación GPS se detectará al guardar"}
        </p>
        {!isOnline && (
          <IonText color="warning">
            <p style={{ padding: "0 1rem", fontSize: "0.85rem" }}>
              Sin conexión — se guardarán las coordenadas sin reverse geocoding.
            </p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default NewEntry;
