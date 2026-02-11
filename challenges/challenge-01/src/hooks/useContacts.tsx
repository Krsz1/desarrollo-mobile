import { useEffect, useState } from 'react'

type Contact = {
  id: number
  name: string
  phone: string
}

const useContacts = () => {
  const [loading, setLoading] = useState(true)
  const [contacts, setContacts] = useState<Contact[]>([])

  useEffect(() => {
    let active = true

    const loadContacts = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1200))

      const seed = [
        { id: 101, name: 'Luisa Gomez', phone: '555-7788' },
        { id: 102, name: 'Andres Ruiz', phone: '555-3344' },
        { id: 103, name: 'Paula Vega', phone: '555-9900' },
      ]

      if (active) {
        setContacts(seed)
        setLoading(false)
      }
    }

    loadContacts()

    return () => {
      active = false
    }
  }, [])

  const addContact = (name: string, phone: string) => {
    const newContact = {
      id: Date.now(),
      name,
      phone,
    }
    setContacts((prev) => [...prev, newContact])
  }

  const deleteContact = (id: number) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id))
  }

  return { loading, contacts, addContact, deleteContact }
}

export default useContacts
