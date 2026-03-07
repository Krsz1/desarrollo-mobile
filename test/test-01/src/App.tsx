import { useEffect, useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import PerfilUsuario from './components/PerfilUsuario'
import type { User } from './services/auth'
import { getCurrentUser } from './services/auth'
import type { Paciente } from './services/pacientes'
import { getPacientes, addOrUpdatePaciente, deletePaciente } from './services/pacientes'
import FormularioPaciente from './components/FormularioPaciente'
import TablaPacientes from './components/TablaPacientes'

function Dashboard({ user }: { user: User }) {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [pacienteAEditar, setPacienteAEditar] = useState<Paciente | null>(null)

  useEffect(() => {
    setPacientes(getPacientes())
  }, [])

  function refresh() {
    setPacientes(getPacientes())
  }

  function handleGuardar(p: Paciente) {
    addOrUpdatePaciente(p)
    setPacienteAEditar(null)
    refresh()
  }

  function handleEliminar(id: string) {
    deletePaciente(id)
    refresh()
  }

  // El estado de búsqueda vive en Dashboard porque afecta qué datos se pasan a TablaPacientes
  // y también permite componer el FormularioPaciente y la tabla desde el mismo contenedor.
  const texto = busqueda.trim().toLowerCase()
  const pacientesFiltrados = pacientes.filter((p) => {
    if (!texto) return true
    return (
      p.nombre.toLowerCase().includes(texto) ||
      p.apellido.toLowerCase().includes(texto) ||
      p.dni.toLowerCase().includes(texto)
    )
  })

  return (
    <div className="dashboard">
      <h2>Bienvenido, {user.nombre}</h2>

      {user.role !== 'recepcionista' && (
        <section className="estadisticas">
          <h3>Estadísticas</h3>
          <p>Sección visible solo para roles distintos a "recepcionista".</p>
        </section>
      )}

      <section className="pacientes-area">
        <div className="pacientes-left">
          {user.role !== 'medico' && (
            <FormularioPaciente pacienteAEditar={pacienteAEditar} onGuardar={handleGuardar} onCancel={() => setPacienteAEditar(null)} />
          )}
        </div>

        <div className="pacientes-right">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Pacientes</h3>
            <input placeholder="Buscar por nombre, apellido o DNI" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
          </div>

          <TablaPacientes pacientes={pacientesFiltrados} onEditar={(p) => setPacienteAEditar(p)} onEliminar={handleEliminar} />
        </div>
      </section>
    </div>
  )
}

function App() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const u = getCurrentUser()
    if (u) setUser(u)
  }, [])

  function handleLogin(u: User) {
    setUser(u)
  }

  function handleUpdate(u: User) {
    setUser(u)
  }

  function handleLogout() {
    setUser(null)
  }

  if (!user) {
    return (
      <div className="app-root">
        <LoginForm onLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="brand">MediCare+ Administración</div>
        <div className="header-right">
          <PerfilUsuario user={user} onUpdate={handleUpdate} onLogout={handleLogout} />
        </div>
      </header>

      <main>
        <Dashboard user={user} />
      </main>
    </div>
  )
}

export default App
