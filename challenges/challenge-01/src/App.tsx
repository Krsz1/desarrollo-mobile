import './App.css'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'
import Loader from './components/Loader'
import useContacts from './hooks/useContacts'

function App() {
  const { loading, contacts, addContact, deleteContact } = useContacts()

  return (
    <div className="app">
      <header className="app__header">
        <h1>Contactos</h1>
        <p>Lista, agrega y elimina contactos.</p>
      </header>

      <main className="app__main">
        {loading ? (
          <Loader />
        ) : (
          <>
            <ContactForm onAdd={addContact} />
            <Contacts contacts={contacts} onDelete={deleteContact} />
          </>
        )}
      </main>
    </div>
  )
}

export default App
