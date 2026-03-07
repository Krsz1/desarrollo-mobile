import "./App.css";
import Loader from "./components/Loader";
import Contacts from "./components/Contacts";
import useContacts from "./hooks/useContacts";

import contactsImage from "./assets/contacts.png";

const App = () => {
  const { contacts, loading, addContact, deleteContact } = useContacts();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1>Contacts App</h1>

        {/* Imagen agregada */}
        <img
          src={contactsImage}
          alt="Contacts illustration"
          style={{ width: "120px" }}
        />
      </header>

      <Contacts
        contacts={contacts}
        onDelete={deleteContact}
      />
    </>
  );
};

export default App;