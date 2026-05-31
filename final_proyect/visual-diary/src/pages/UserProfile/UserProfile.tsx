import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonIcon,
} from "@ionic/react";
import { cameraOutline } from "ionicons/icons";
import { useAuth } from "../../context/AuthContext";
import { useEntries } from "../../context/EntriesContext";
import { useCamera } from "../../hooks/useCamera";
import { useStorage } from "../../hooks/useStorage";
import styles from "./UserProfile.module.scss";

const AVATAR_KEY = "user_avatar";

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const { entries, feedEntries } = useEntries();
  const { takePhoto } = useCamera();
  const { getItem, setItem } = useStorage();

  const [avatarPhoto, setAvatarPhoto] = useState<string | null>(null);

  const withPhoto = entries.filter((e) => !!e.image);
  const initial = (user?.displayName ?? user?.email ?? "?")[0].toUpperCase();

  useEffect(() => {
    if (!user) return;
    getItem<string>(`${AVATAR_KEY}_${user.uid}`).then((photo) => {
      if (photo) setAvatarPhoto(photo);
    });
  }, [user?.uid]);

  const handleAvatarTap = async () => {
    const base64 = await takePhoto();
    if (base64 && user) {
      setAvatarPhoto(base64);
      await setItem(`${AVATAR_KEY}_${user.uid}`, base64);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className={styles.profilePage}>
        {/* Avatar + name */}
        <div className={styles.header}>
          <div className={styles.avatarWrapper} onClick={handleAvatarTap}>
            {avatarPhoto ? (
              <img
                src={`data:image/jpeg;base64,${avatarPhoto}`}
                className={styles.avatarImg}
                alt="Profile"
              />
            ) : (
              <div className={styles.avatar}>{initial}</div>
            )}
            <div className={styles.avatarOverlay}>
              <IonIcon icon={cameraOutline} />
            </div>
          </div>
          <p className={styles.displayName}>{user?.displayName ?? "User"}</p>
          <p className={styles.email}>{user?.email}</p>
        </div>

        {/* Stats */}
        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{entries.length}</span>
            <span className={styles.statLabel}>Entries</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{withPhoto.length}</span>
            <span className={styles.statLabel}>Photos</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{feedEntries.length}</span>
            <span className={styles.statLabel}>In feed</span>
          </div>
        </div>

        {/* Photo gallery */}
        <p className={styles.sectionTitle}>My Photos</p>
        {withPhoto.length === 0 ? (
          <p className={styles.noPhotos}>No photos yet. Add one to an entry!</p>
        ) : (
          <div className={styles.photoGrid}>
            {withPhoto.map((entry) => (
              <div key={entry.id} className={styles.photoThumb}>
                <img
                  src={`data:image/jpeg;base64,${entry.image}`}
                  alt={entry.title}
                />
              </div>
            ))}
          </div>
        )}

        {/* Account info */}
        <p className={styles.sectionTitle}>Account</p>
        <div className={styles.section}>
          <div className={styles.row}>
            <span className={styles.label}>Username</span>
            <span className={styles.value}>{user?.displayName ?? "—"}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Email</span>
            <span className={styles.value}>{user?.email ?? "—"}</span>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdminPanel;
