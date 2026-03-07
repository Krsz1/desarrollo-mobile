export interface Paciente {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  telefono?: string;
}

const PACIENTES_KEY = "medicare_pacientes";

export const storageService = {
  obtenerPacientes(): Paciente[] {
    const data = localStorage.getItem(PACIENTES_KEY);
    return data ? JSON.parse(data) : [];
  },

  guardarPacientes(pacientes: Paciente[]) {
    localStorage.setItem(PACIENTES_KEY, JSON.stringify(pacientes));
  },

  agregarPaciente(paciente: Paciente) {
    const pacientes = this.obtenerPacientes();
    pacientes.push(paciente);
    this.guardarPacientes(pacientes);
  },

  actualizarPaciente(paciente: Paciente) {
    const pacientes = this.obtenerPacientes().map((p) =>
      p.id === paciente.id ? paciente : p
    );

    this.guardarPacientes(pacientes);
  },

  eliminarPaciente(id: string) {
    const pacientes = this.obtenerPacientes().filter((p) => p.id !== id);
    this.guardarPacientes(pacientes);
  },

  generarId() {
    return Date.now().toString();
  },
};