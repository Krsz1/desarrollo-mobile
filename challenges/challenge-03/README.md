# Challenge 03 - Administrador de Tareas en Ionic

Una aplicación completa de administrador de tareas construida con **Ionic 7**, **React 18** y **TypeScript**.

## 📋 Características

✅ **Vista de lista de tareas** - Visualiza todas tus tareas organizadas por estado  
✅ **Añadir nuevas tareas** - Crea tareas con título y descripción  
✅ **Marcar tareas como completadas** - Alterna el estado de completitud  
✅ **Eliminar tareas** - Elimina tareas que ya no necesites  
✅ **Persistencia de datos** - Las tareas se guardan en localStorage  
✅ **Estadísticas** - Visualiza el resumen de tareas totales, completadas y pendientes  
✅ **Interfaz responsiva** - Diseñada para funcionar en dispositivos móviles y tablets  

## 🎯 Componentes

La aplicación está compuesta por los siguientes componentes React:

### 1. **Home.tsx** (Página Principal)
- Gestiona el estado global de las tareas
- Implementa efectos para cargar y guardar datos
- Maneja las acciones principales (añadir, eliminar, completar)
- Muestra las estadísticas de tareas

### 2. **TaskForm.tsx** (Formulario de Tareas)
- Componente secundario para capturar entrada del usuario
- Valida el título de la tarea
- Soporta tecla Enter para enviar

### 3. **TaskList.tsx** (Lista de Tareas)
- Componente contenedor que organiza las tareas
- Separa tareas pendientes y completadas
- Muestra el contador de cada sección

### 4. **TaskItem.tsx** (Elemento Individual de Tarea)
- Componente reutilizable para cada tarea
- Muestra información de la tarea (titulo, descripción, fecha)
- Proporciona acciones (completar/activar, eliminar)

## 🔧 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build
```

## 📱 Uso

1. **Añadir una tarea**: Haz clic en "Añadir Nueva Tarea", completa el formulario y presiona enviar
2. **Completar una tarea**: Haz clic en el checkbox o en el botón de completar
3. **Eliminar una tarea**: Haz clic en el botón de papelera roja
4. Las tareas se guardan automáticamente en localStorage

## 🎨 Características de Diseño

- **Tema moderno** con colores Ionic estándar
- **Tarjetas** para organizar contenido
- **Iconos intuitivos** gracias a Ionicons
- **Animaciones suaves** para mejor UX
- **Responsive design** que se adapta a cualquier tamaño de pantalla

## 📊 Estructura de Datos

Cada tarea tiene la siguiente estructura:

```typescript
interface Task {
  id: string;              // ID único
  title: string;           // Título de la tarea
  description: string;     // Descripción opcional
  completed: boolean;      // Estado de completitud
  createdAt: Date;        // Fecha de creación
}
```

## 🚀 Próximas Mejoras

- Agregar categorías/etiquetas
- Editar tareas existentes
- Filtros avanzados
- Sincronización en la nube
- Notificaciones locales

---

**Desarrollado como Challenge 03** 🎓
