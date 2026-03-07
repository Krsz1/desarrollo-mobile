import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel
} from "@ionic/react"

import { useState } from "react"

const visitasMock = [

  {
    id: "1",
    paciente: "Carlos Lopez",
    direccion: "Av Siempre Viva",
    hora: "10:00",
    estado: "pendiente" as const
  },

  {
    id: "2",
    paciente: "Ana Perez",
    direccion: "Calle Falsa",
    hora: "12:00",
    estado: "pendiente" as const
  }

]

const VisitasPage = () => {

  const [visitas] = useState(visitasMock)

  return (

    <IonPage>

      <IonContent>

        <IonList>

          {visitas.map(v => (

            <IonItem key={v.id} routerLink={`/visitas/${v.id}`}>

              <IonLabel>

                <h2>{v.paciente}</h2>
                <p>{v.direccion}</p>
                <p>{v.hora}</p>

              </IonLabel>

            </IonItem>

          ))}

        </IonList>

      </IonContent>

    </IonPage>

  )

}

export default VisitasPage
