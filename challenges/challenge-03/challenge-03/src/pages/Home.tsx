import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import ContactForm from '../components/ContactForm'
import Contacts from '../components/Contacts'
import Loader from '../components/Loader'
import useContacts from '../hooks/useContacts'
import './Home.css'

const Home: React.FC = () => {
  const { loading, contacts, addContact, deleteContact } = useContacts()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Contactos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar color="primary">
            <IonTitle size="large">Contactos</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div style={{ padding: '20px 0' }}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <ContactForm onAdd={addContact} />
              <div style={{ marginTop: '30px' }}>
                <Contacts contacts={contacts} onDelete={deleteContact} />
              </div>
            </>
          )}
        </div>

        <footer style={{ textAlign: 'center', padding: '20px', color: 'var(--ion-color-medium)', fontSize: '12px' }}>
          Krsna Gutiérrez
        </footer>
      </IonContent>
    </IonPage>
  )
}

export default Home
