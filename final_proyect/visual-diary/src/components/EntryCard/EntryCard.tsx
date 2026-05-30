import React from "react";
import {
  IonItem,
  IonLabel,
  IonThumbnail,
  IonImg,
  IonNote,
} from "@ionic/react";
import { Entry } from "../../types/Entry";
import { timeAgo } from "../../helpers/formatDate";
import { formatAddress } from "../../helpers/formatAddress";
import styles from "./EntryCard.module.scss";

interface Props {
  entry: Entry;
  onClick?: () => void;
  showAuthor?: boolean;
}

const EntryCard: React.FC<Props> = ({ entry, onClick, showAuthor }) => (
  <IonItem button detail onClick={onClick} className={styles.card}>
    {entry.image && (
      <IonThumbnail slot="start">
        <IonImg src={`data:image/jpeg;base64,${entry.image}`} alt={entry.title} />
      </IonThumbnail>
    )}
    <IonLabel>
      {showAuthor && entry.userName && (
        <p className={styles.author}>@{entry.userName}</p>
      )}
      <h2>{entry.title}</h2>
      {entry.address && (
        <p>
          <IonNote>{formatAddress(entry.address, 45)}</IonNote>
        </p>
      )}
    </IonLabel>
    <IonNote slot="end" color="medium" className={styles.date}>
      {timeAgo(entry.createdAt)}
    </IonNote>
  </IonItem>
);

export default EntryCard;
