import { useState } from 'react'
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  IonRow,
  IonCol,
  IonGrid,
} from '@ionic/react'
import './ContactForm.css'

const ContactForm = ({ onAdd }: { onAdd: (name: string, phone: string) => void }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const trimmedName = (name as string).trim()
    const trimmedPhone = (phone as string).trim()

    if (!trimmedName || !trimmedPhone) {
      return
    }

    onAdd(trimmedName, trimmedPhone)
    setName('')
    setPhone('')
  }

  return (
    <IonGrid>
      <IonRow className="ion-justify-content-center">
        <IonCol sizeSm="12" sizeMd="8" sizeLg="6">
          <IonCard>
            <IonCardContent>
              <form onSubmit={handleSubmit}>
                <IonItem>
                  <IonLabel position="floating">Nombre</IonLabel>
                  <IonInput
                    type="text"
                    value={name}
                    onIonChange={(e) => setName(e.detail.value || '')}
                    placeholder="Ej. Lucia Torres"
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="floating">Teléfono</IonLabel>
                  <IonInput
                    type="tel"
                    value={phone}
                    onIonChange={(e) => setPhone(e.detail.value || '')}
                    placeholder="Ej. 555-0000"
                  />
                </IonItem>

                <div style={{ marginTop: '20px' }}>
                  <IonButton expand="block" type="submit" color="primary">
                    Agregar contacto
                  </IonButton>
                </div>
              </form>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonGrid>
  )
}

export default ContactForm
