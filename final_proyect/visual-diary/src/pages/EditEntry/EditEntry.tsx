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
} from "@ionic/react";
import { camera } from "ionicons/icons";
import { useParams, useHistory } from "react-router-dom";
import { useEntries } from "../../context/EntriesContext";
import { useCamera } from "../../hooks/useCamera";
import styles from "./EditEntry.module.scss";

const EditEntry: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { entries, updateEntry } = useEntries();
  const { takePhoto } = useCamera();
  const history = useHistory();

  const entry = entries.find((e) => e.id === id);

  const [title, setTitle] = useState(entry?.title ?? "");
  const [description, setDescription] = useState(entry?.description ?? "");
  const [image, setImage] = useState(entry?.image ?? "");
  const [saving, setSaving] = useState(false);

  if (!entry) {
    history.replace("/home");
    return null;
  }

  const handlePhoto = async () => {
    const base64 = await takePhoto();
    if (base64) setImage(base64);
  };

  const handleSave = async () => {
    if (!title.trim()) return;
    setSaving(true);
    try {
      await updateEntry(entry.id!, {
        title: title.trim(),
        description: description.trim(),
        image,
      });
      history.replace(`/entry/${entry.id}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/entry/${id}`} />
          </IonButtons>
          <IonTitle>Edit Entry</IonTitle>
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
      <IonContent className={`ion-padding ${styles.editEntryPage}`}>
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
            <span>Tap to change photo</span>
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
      </IonContent>
    </IonPage>
  );
};

export default EditEntry;
