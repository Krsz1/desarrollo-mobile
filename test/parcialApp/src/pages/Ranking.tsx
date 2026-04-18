import { IonPage, IonContent, IonText } from '@ionic/react';

const Ranking: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonText>
          <h1>🏆 Ranking</h1>
          <p>Top jugadores</p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Ranking;