const Contacts = ({
	contacts,
	onDelete,
}: {
	contacts: Array<{ id: number; name: string; phone: string }>
	onDelete: (id: number) => void
}) => {
	if (contacts.length === 0) {
		return <p className="contacts__empty">No hay contactos aun.</p>
	}

	return (
		<ul className="contacts">
			{contacts.map((contact) => (
				<li key={contact.id} className="contacts__item">
					<div>
						<p className="contacts__name">{contact.name}</p>
						<p className="contacts__phone">{contact.phone}</p>
					</div>
					<button
						className="contacts__delete"
						type="button"
						onClick={() => onDelete(contact.id)}
					>
						Eliminar
					</button>
				</li>
			))}
		</ul>
	)
}

export default Contacts
