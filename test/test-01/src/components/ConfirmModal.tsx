import React from 'react'

type Props = {
  open: boolean
  title?: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal({ open, title, message, onConfirm, onCancel }: Props) {
  if (!open) return null
  return (
    <div className="modal-backdrop">
      <div className="modal">
        {title && <h3>{title}</h3>}
        <p>{message}</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onCancel}>Cancelar</button>
          <button onClick={onConfirm} style={{ background: '#c00', color: 'white' }}>Eliminar</button>
        </div>
      </div>
    </div>
  )
}
