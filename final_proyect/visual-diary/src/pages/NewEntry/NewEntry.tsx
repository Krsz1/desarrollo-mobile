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
} from "@ionic/react";
import { camera, location } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { addEntry } from "../../services/EntryService";
import styles from "./NewEntry.module.scss";

const NewEntry: React.FC = () => {
  const { user } = useAuth();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) return;
    if (!user) return;
    setLoading(true);
    try {
      await addEntry({
        title: title.trim(),
        description: description.trim(),
        image,
        latitude: 0,
        longitude: 0,
        address: "",
        createdAt: new Date().toISOString(),
        userId: user.uid,
      });
      history.replace("/home");
    } finally {
      setLoading(false);
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
            <IonButton onClick={handleSave} disabled={loading || !title.trim()}>
              {loading ? <IonSpinner name="crescent" /> : "Guardar"}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className={`ion-padding ${styles.newEntryPage}`}>
        {image ? (
          <img src={`data:image/jpeg;base64,${image}`} className={styles.photoPreview} alt="Foto entrada" />
        ) : (
          <div className={styles.photoPlaceholder}>
            <IonIcon icon={camera} />
            <span>Toca para agregar foto</span>
          </div>
        )}
        <IonItem>
          <IonLabel position="floating">Título</IonLabel>
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
          <IonIcon icon={location} /> Ubicación GPS se obtendrá al guardar
        </p>
      </IonContent>
    </IonPage>
  );
};

export default NewEntry;
