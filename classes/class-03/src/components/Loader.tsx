import { IonCol, IonGrid, IonRow, IonSpinner } from '@ionic/react'

const Loader = () => {
  return (
    <IonGrid>
      <IonRow className="ion-justify-content-center ion-align-items-center" style={{ minHeight: '200px' }}>
        <IonCol sizeSm="12" sizeMd="6" className="ion-text-center">
          <IonSpinner name="circular" />
          <p style={{ marginTop: '16px' }}>Cargando contactos...</p>
        </IonCol>
      </IonRow>
    </IonGrid>
  )
}

export default Loader
