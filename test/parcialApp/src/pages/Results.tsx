import { IonPage, IonContent, IonText } from '@ionic/react';

const Results: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonText>
          <h1>Resultados</h1>
          <p>Aquí van los puntos y misiones</p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Results;