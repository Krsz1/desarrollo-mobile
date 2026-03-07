import React, { useEffect, useState } from 'react'
import type { Paciente } from '../services/pacientes'
import { generateId } from '../services/pacientes'

type Props = {
  pacienteAEditar?: Paciente | null
  onGuardar: (p: Paciente) => void
  onCancel?: () => void
}

export default function FormularioPaciente({ pacienteAEditar = null, onGuardar, onCancel }: Props) {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [dni, setDni] = useState('')
  const [telefono, setTelefono] = useState('')

  const [errors, setErrors] = useState<{ [k: string]: string }>({})

  useEffect(() => {
    if (pacienteAEditar) {
      setNombre(pacienteAEditar.nombre)
      setApellido(pacienteAEditar.apellido)
      setDni(pacienteAEditar.dni)
      setTelefono(pacienteAEditar.telefono || '')
    } else {
      setNombre('')
      setApellido('')
      setDni('')
      setTelefono('')
    }
    setErrors({})
  }, [pacienteAEditar])

  function validar() {
    const e: { [k: string]: string } = {}
    if (!nombre.trim()) e.nombre = 'El nombre es obligatorio'
    if (!apellido.trim()) e.apellido = 'El apellido es obligatorio'
    const dniTrim = dni.trim()
    if (!dniTrim) e.dni = 'El DNI es obligatorio'
    else if (!/^[0-9]+$/.test(dniTrim)) e.dni = 'El DNI debe ser numérico'
    else if (dniTrim.length < 7 || dniTrim.length > 8) e.dni = 'El DNI debe tener entre 7 y 8 dígitos'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validar()) return
    const paciente: Paciente = {
      id: pacienteAEditar ? pacienteAEditar.id : generateId(),
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      dni: dni.trim(),
      telefono: telefono.trim() || undefined,
    }
    onGuardar(paciente)
  }

  return (
    <form className="paciente-form" onSubmit={handleSubmit}>
      <h3>{pacienteAEditar ? 'Editar paciente' : 'Nuevo paciente'}</h3>
      <div>
        <label>Nombre</label>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
        {errors.nombre && <div className="inline-error">{errors.nombre}</div>}
      </div>

      <div>
        <label>Apellido</label>
        <input value={apellido} onChange={(e) => setApellido(e.target.value)} />
        {errors.apellido && <div className="inline-error">{errors.apellido}</div>}
      </div>

      <div>
        <label>DNI</label>
        <input value={dni} onChange={(e) => setDni(e.target.value)} />
        {errors.dni && <div className="inline-error">{errors.dni}</div>}
      </div>

      <div>
        <label>Teléfono</label>
        <input value={telefono} onChange={(e) => setTelefono(e.target.value)} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button type="submit">Guardar</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  )
}
