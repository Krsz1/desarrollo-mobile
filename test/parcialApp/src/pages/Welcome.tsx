import { IonPage, IonContent, IonButton } from "@ionic/react";

const Welcome: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gap: 16,
          }}
        >
          <h1 style={{ margin: "0 0 8px" }}>MisionApp</h1>
          <p style={{ color: "#aaa", margin: "0 0 40px", textAlign: "center" }}>
            Completa misiones y gana puntos
          </p>

          <IonButton expand="block" style={{ width: "100%", maxWidth: 320 }} routerLink="/login">
            Iniciar sesion
          </IonButton>

          <IonButton expand="block" fill="outline" style={{ width: "100%", maxWidth: 320 }} routerLink="/register">
            Registrarse
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
