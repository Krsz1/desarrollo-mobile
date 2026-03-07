import {
  IonPage,
  IonContent,
  IonAvatar
} from "@ionic/react"

const PerfilMedicoPage = () => {

  return (

    <IonPage>

      <IonContent className="ion-padding">

        <h2>Perfil Médico</h2>

        <IonAvatar>
          <img src="https://i.pravatar.cc/150" />
        </IonAvatar>

      </IonContent>

    </IonPage>

  )

}

export default PerfilMedicoPage
