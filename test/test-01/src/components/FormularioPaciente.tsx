import React, { useEffect, useState } from 'react'
import type { Paciente } from "../services/storageService";
import { storageService } from "../services/storageService";

type Props = {
  pacienteAEditar?: Paciente | null
  onGuardar: (p: Paciente) => void
  onCancel?: () => void
}

export default function FormularioPaciente({ pacienteAEditar = null, onGuardar, onCancel }: Props) {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    dni: ''
  })

  const [errors, setErrors] = useState<{ [k: string]: string }>({})

  useEffect(() => {
    if (pacienteAEditar) {
      setForm({
        nombre: pacienteAEditar.nombre,
        apellido: pacienteAEditar.apellido,
        dni: pacienteAEditar.dni
      })
    } else {
      setForm({ nombre: '', apellido: '', dni: '' })
    }
    setErrors({})
  }, [pacienteAEditar])

  function validar() {
    const e: { [k: string]: string } = {}
    if (!form.nombre.trim()) e.nombre = 'El nombre es obligatorio'
    if (!form.apellido.trim()) e.apellido = 'El apellido es obligatorio'
    const dniTrim = form.dni.trim()
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
      id: pacienteAEditar ? pacienteAEditar.id : storageService.generarId(),
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      dni: form.dni.trim(),
    }
    onGuardar(paciente)
  }

  return (
    <form className="paciente-form" onSubmit={handleSubmit}>
      <h3>{pacienteAEditar ? 'Editar paciente' : 'Nuevo paciente'}</h3>
      <div>
        <label>Nombre</label>
        <input type="text" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
        {errors.nombre && <div className="inline-error">{errors.nombre}</div>}
      </div>

      <div>
        <label>Apellido</label>
        <input type="text" value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} />
        {errors.apellido && <div className="inline-error">{errors.apellido}</div>}
      </div>

      <div>
        <label>DNI</label>
        <input type="text" value={form.dni} onChange={(e) => setForm({ ...form, dni: e.target.value })} />
        {errors.dni && <div className="inline-error">{errors.dni}</div>}
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button type="submit">Guardar</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  )
}
