# Contacts App - PWA (Progressive Web Application)

Una aplicación web progresiva para gestionar tus contactos de forma rápida y sencilla, directamente desde tu navegador o como una aplicación instalable en tu dispositivo.

![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Vite](https://img.shields.io/badge/Vite-7.3-purple)
![PWA](https://img.shields.io/badge/PWA-enabled-green)

## 🚀 Características

- ✅ **Funciona sin conexión** - Accede tus contactos incluso sin internet
- 📱 **Instalable en móviles** - Agrégala a tu pantalla de inicio
- 🎨 **Interfaz moderna** - Diseño limpio e intuitivo
- ⚡ **Ultra rápido** - Carga casi instantánea con Vite
- 🔒 **Seguro** - Caching inteligente y estrategia híbrida

## 🌐 Acceso en Línea

**[Abre Contacts App en Netlify](https://tu-contactos-app.netlify.app)** *(enlace será actualizado después del despliegue)*

## 📲 Cómo instalar la app en tu celular

### En Android (Chrome, Edge, Samsung Internet)

1. **Abre la app en tu navegador móvil:**
   - Visita el enlace de Netlify en tu celular Android

2. **Instala la aplicación:**
   - Toca el botón de **"Instalar app"** o **"Agregar a pantalla de inicio"** que aparece en la barra superior del navegador
   - Confirma la instalación

3. **Abre desde tu pantalla de inicio:**
   - Encontrarás el icono de "Contacts App" en tu pantalla de aplicaciones
   - Toca para abrir

### En iOS (Safari)

1. **Abre la app en tu navegador Safari:**
   - Visita el enlace de Netlify en tu iPhone

2. **Agrega a la pantalla de inicio:**
   - Toca el botón de **Compartir** (ícono de cuadrado con flecha)
   - Selecciona **"Agregar a Pantalla de inicio"**
   - Dale un nombre (ej: "Contacts")
   - Toca **"Agregar"**

3. **Accede desde tu pantalla de inicio:**
   - Encontrarás el icono de la aplicación en tu pantalla de inicio
   - Toca para abrir

### En Escritorio (Windows, Mac, Linux)

1. **Abre la app en tu navegador:**
   - Visita el enlace de Netlify

2. **Instala la aplicación:**
   - En Chrome/Edge: Toca el ícono "+" en la barra de direcciones
   - En Firefox: Busca la opción "Instalar aplicación"

3. **Accede desde tu escritorio:**
   - Se creará un acceso directo en tu escritorio
   - Abre con un clic

## 🛠️ Desarrollo local

### Requisitos previos
- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <este-repositorio>
cd challenge-02

# Instalar dependencias
npm install

# Generar iconos (opcional, requiere Python)
npm run generate-icons
```

### Comandos disponibles

```bash
# Inicia el servidor de desarrollo (http://localhost:5173)
npm run dev

# Construir para producción
npm run build

# Ver vista previa de producción
npm run preview

# Verificar calidad del código
npm lint
```

## 📁 Estructura del Proyecto

```
📦 challenge-02
├── 📄 manifest.json          # Metadatos de la PWA
├── 📂 public/
│   ├── 📄 sw.js              # Service Worker
│   ├── 📄 icon-base.svg      # Icono base en SVG
│   └── 📂 icons/             # Iconos en PNG (múltiples tamaños)
├── 📂 src/
│   ├── 📄 App.tsx            # Componente principal
│   ├── 📄 main.tsx           # Punto de entrada
│   ├── 📂 components/        # Componentes reutilizables
│   │   ├── 📄 ContactForm.tsx
│   │   ├── 📄 Contacts.tsx
│   │   └── 📄 Loader.tsx
│   ├── 📂 hooks/
│   │   └── 📄 useContacts.tsx
│   └── 📂 assets/            # Imágenes y recursos
```

## 🎯 Funcionalidades

### Gestión de Contactos
- **Agregar contacto:** Completa el formulario con nombre y teléfono
- **Ver contactos:** Lista todos los contactos almacenados
- **Eliminar contacto:** Borra contactos que ya no necesites
- **Persistencia:** Los datos se guardan localmente en tu dispositivo

## 🔄 Estrategia de Caché (Hybrid Strategy)

La aplicación utiliza una estrategia híbrida:

- **API calls (Network First):** Intenta obtener datos de la red primero, si falla usa el caché
- **Assets (Cache First):** Usa recursos en caché para una carga más rápida, fallback a la red si es necesario

## 🚀 Despliegue en Netlify

### Pasos para desplegar:

1. **Prepara tu repositorio en GitHub**
   ```bash
   git add .
   git commit -m "Initial commit: PWA setup"
   git push origin main
   ```

2. **Ve a [Netlify](https://netlify.com)**
   - Conecta tu cuenta de GitHub
   - Selecciona este repositorio

3. **Configura el despliegue:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - Haz clic en "Deploy"

4. **Tu app estará en vivo en 1-2 minutos** con un enlace como:
   ```
   https://tu-app-xxx.netlify.app
   ```

## 📝 Consideras importantes

- **Sin conexión:** Once instalada, la app funciona completamente sin internet
- **Actualización automática:** El service worker verifica actualizaciones cada vez que se abre la app
- **Espacio de almacenamiento:** Los datos se guardan localmente en tu dispositivo
- **Privacidad:** Todos los contactos se almacenan localmente, no se envían a servidores

## 📚 Tecnologías utilizadas

- **React 19** - Librería de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool moderno y rápido
- **Vite PWA Plugin** - Generación automática de service worker
- **PWA** - Capacidades de aplicación web progresiva

## 📖 Documentación adicional

- [Generación de iconos](./ICONS.md) - Cómo crear/personalizar los iconos
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Service Workers](https://developer.mozilla.org/es/docs/Web/API/Service_Worker_API)

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios grandes:
1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.

---

**Hecho con ❤️ usando React y PWA**
```
