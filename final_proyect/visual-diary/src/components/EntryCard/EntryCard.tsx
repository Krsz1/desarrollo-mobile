import React from "react";
import {
  IonItem,
  IonLabel,
  IonThumbnail,
  IonImg,
  IonNote,
} from "@ionic/react";
import { Entry } from "../../types/Entry";
import { formatDate } from "../../helpers/formatDate";
import { formatAddress } from "../../helpers/formatAddress";
import styles from "./EntryCard.module.scss";

interface Props {
  entry: Entry;
  onClick?: () => void;
}

const EntryCard: React.FC<Props> = ({ entry, onClick }) => (
  <IonItem button detail onClick={onClick} className={styles.card}>
    {entry.image && (
      <IonThumbnail slot="start">
        <IonImg src={`data:image/jpeg;base64,${entry.image}`} alt={entry.title} />
      </IonThumbnail>
    )}
    <IonLabel>
      <h2>{entry.title}</h2>
      {entry.address && (
        <p>
          <IonNote>{formatAddress(entry.address, 45)}</IonNote>
        </p>
      )}
    </IonLabel>
    <IonNote slot="end" color="medium" className={styles.date}>
      {formatDate(entry.createdAt)}
    </IonNote>
  </IonItem>
);

export default EntryCard;
