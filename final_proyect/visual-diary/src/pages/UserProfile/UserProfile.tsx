import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEntries } from "../../context/EntriesContext";
import styles from "./UserProfile.module.scss";

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const { entries, feedEntries } = useEntries();
  const history = useHistory();

  const withPhoto = entries.filter((e) => !!e.image);
  const initial = (user?.displayName ?? user?.email ?? "?")[0].toUpperCase();

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
          <div className={styles.avatar}>{initial}</div>
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
              <div
                key={entry.id}
                className={styles.photoThumb}
                onClick={() => history.push(`/entry/${entry.id}`)}
              >
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
          <div className={styles.row}>
            <span className={styles.label}>Email verified</span>
            <span className={styles.value}>
              {user?.emailVerified ? "✅ Yes" : "❌ No"}
            </span>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdminPanel;
