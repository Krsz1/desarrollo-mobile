import { IonPage, IonContent } from "@ionic/react"
import { useParams } from "react-router"

const DetalleVisitaPage = () => {

  const { id } = useParams<any>()

  return (

    <IonPage>

      <IonContent className="ion-padding">

        <h2>Detalle de visita</h2>

        <p>ID visita: {id}</p>

      </IonContent>

    </IonPage>

  )

}

export default DetalleVisitaPage
