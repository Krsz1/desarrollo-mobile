import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonBackButton, IonButtons, IonTextarea, IonText, IonItem, IonLabel, IonIcon,
} from '@ionic/react';
import { folderOutline } from 'ionicons/icons';
import useFilesystem from '../hooks/useFilesystem';
import { APP_ROUTES } from '../constants/routes';

const FilesystemPage: React.FC = () => {
  const [text, setText] = useState('');
  const { content, error, saved, writeFile, readFile } = useFilesystem();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={APP_ROUTES.HOME} />
          </IonButtons>
          <IonTitle>Filesystem</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

        <div className="page-icon-header" style={{ '--accent': '#80cbc4' } as React.CSSProperties}>
          <IonIcon icon={folderOutline} />
        </div>

        <IonCard>
          <IonCardContent>
            <IonItem style={{ '--background': 'transparent', '--border-color': 'transparent' }}>
              <IonLabel position="floating">Texto a guardar</IonLabel>
              <IonTextarea
                value={text}
                onIonInput={e => setText(e.detail.value ?? '')}
                rows={4}
                style={{ '--color': '#e0e0e0' }}
              />
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonButton expand="block" onClick={() => writeFile(text)}>
          Guardar archivo
        </IonButton>
        <IonButton expand="block" onClick={readFile} color="secondary">
          Leer archivo
        </IonButton>

        {saved && <IonText color="success"><p className="feedback-msg">✓ Archivo guardado correctamente</p></IonText>}
        {error && <IonText color="danger"><p className="error-msg">{error}</p></IonText>}

        {content && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Contenido guardado</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p style={{ whiteSpace: 'pre-wrap', color: '#c0c0c0', fontSize: '14px', lineHeight: 1.6 }}>{content}</p>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default FilesystemPage;
