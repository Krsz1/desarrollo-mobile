import { useState } from 'react'

const ContactForm = ({ onAdd }: { onAdd: (name: string, phone: string) => void }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    const trimmedName = name.trim()
    const trimmedPhone = phone.trim()

    if (!trimmedName || !trimmedPhone) {
      return
    }

    onAdd(trimmedName, trimmedPhone)
    setName('')
    setPhone('')
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__field">
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ej. Lucia Torres"
        />
      </div>
      <div className="form__field">
        <label htmlFor="phone">Telefono</label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Ej. 555-0000"
        />
      </div>
      <button className="form__button" type="submit">
        Agregar contacto
      </button>
    </form>
  )
}

export default ContactForm
