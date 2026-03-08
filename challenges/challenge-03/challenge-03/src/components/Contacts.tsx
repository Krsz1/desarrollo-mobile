import {
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from '@ionic/react'
import { trash } from 'ionicons/icons'
import './Contacts.css'

const Contacts = ({
  contacts,
  onDelete,
}: {
  contacts: Array<{ id: number; name: string; phone: string }>
  onDelete: (id: number) => void
}) => {
  if (contacts.length === 0) {
    return (
      <IonGrid>
        <IonRow className="ion-justify-content-center ion-align-items-center" style={{ minHeight: '200px' }}>
          <IonCol sizeSm="12" sizeMd="6" className="ion-text-center">
            <IonText>
              <p className="empty-message">No hay contactos aun.</p>
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    )
  }

  return (
    <IonGrid>
      <IonRow className="ion-justify-content-center">
        <IonCol sizeSm="12" sizeMd="8" sizeLg="6">
          <IonList>
            {contacts.map((contact) => (
              <IonItem key={contact.id} className="contact-item">
                <IonLabel>
                  <h2>{contact.name}</h2>
                  <p>{contact.phone}</p>
                </IonLabel>
                <IonButton
                  fill="clear"
                  color="danger"
                  onClick={() => onDelete(contact.id)}
                  slot="end"
                >
                  <IonIcon icon={trash} />
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        </IonCol>
      </IonRow>
    </IonGrid>
  )
}

export default Contacts
