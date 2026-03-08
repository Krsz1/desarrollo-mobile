# 📱 Contactos App - PWA

Una **aplicación web progresiva (PWA)** para gestionar tus contactos de forma rápida y sencilla. ¡Instálala en tu teléfono, tablet o computadora!

![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Vite](https://img.shields.io/badge/Vite-7.3-purple)
![PWA](https://img.shields.io/badge/PWA-yes-green)

---

## 🌐 Acceso en Línea

### **[➡️ Abre Contactos App aquí](https://tu-app-aqui.netlify.app)**

*Enlace se actualizará después del despliegue en Netlify*

---

## ✨ Características

- ✅ **Funciona sin internet** - Accede tus contactos offline
- 📱 **Instálable** - Como una app nativa en Android, iOS y escritorio
- ⚡ **Ultra rápida** - Carga instantánea con caché inteligente
- 🎨 **Bonita** - Interfaz moderna y fácil de usar
- 🔒 **Segura** - Tus datos se guardan solo en tu dispositivo

---

## 📲 Cómo instalar en tu teléfono

### **📱 En Android (Chrome, Edge, Brave)**

1. Abre el enlace de Netlify en tu navegador
2. Espera a que aparezca el botón **"Instalar"** en la barra de direcciones (↓ con símbolo de app)
3. **Toca el botón "Instalar"**
4. Confirma la instalación
5. ¡Listo! La app aparecerá en tu pantalla de inicio

**Alternativa si no ves el botón:**
- Toca el menú (⋮) → "Instalar aplicación"

---

### **🍎 En iPhone/iPad (Safari)**

1. Abre el enlace de Netlify en Safari
2. Toca el botón **Compartir** (cuadrado con flecha)
3. Desplázate y selecciona **"Agregar a Pantalla de Inicio"**
4. Dale un nombre (por ejemplo: "Contactos")
5. Toca **"Agregar"**
6. ¡Listo! Aparecerá en tu pantalla de inicio como una app

---

### **💻 En Computadora (Windows, Mac, Linux)**

1. Abre el enlace de Netlify en Chrome/Edge
2. Haz clic en el icono **"+"** en la barra de direcciones
3. Haz clic en **"Instalar"**
4. ¡Listo! Se creará un acceso directo en tu escritorio

---

## 🚀 Funcionalidades

- **Agregar contactos** - Escribe nombre y teléfono
- **Ver contactos** - Lista de todos tus contactos
- **Eliminar contactos** - Borra los que no necesites
- **Guardar datos** - Los contactos se guardan automáticamente en tu dispositivo

---

## 📝 Desarrollo Local

### Requisitos
- Node.js 18+ 
- npm o yarn

### Instalación

```bash
cd challenges/challenge-02
npm install
```

### Comandos

```bash
# Inicia servidor de desarrollo
npm run dev
# Abre http://localhost:5173

# Compila para producción
npm run build

# Ve el resultado de la compilación
npm run preview
```

---

## 🏗️ Estructura del Proyecto

```
challenge-02/
├── public/
│   ├── contacts.png      # Imagen del header
│   ├── img1.png          # Icono de app
│   ├── img2.png          # Icono maskable
│   ├── manifest.json     # Metadatos de PWA
│   └── sw.js            # Service Worker
├── src/
│   ├── App.tsx          # Componente principal
│   ├── main.tsx         # Punto de entrada
│   ├── App.css          # Estilos
│   ├── components/      # Componentes reutilizables
│   └── hooks/           # Custom hooks
└── package.json
```

---

## 🛠️ Tecnologías

- **React 19** - Librería UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool moderno
- **PWA** - Capacidades offline

---

## 📋 Estrategia de Caché (Hybrid Strategy)

El service worker implementa 3 estrategias según el tipo de contenido:

| Tipo | Estrategia | Uso |
|------|-----------|-----|
| **HTML** | Network First | Siempre obtener versión actualizada |
| **JS/CSS** | Cache First | Rápido desde caché, actualizar ocasionalmente |
| **Imágenes** | Stale While Revalidate | Mostrar caché, actualizar en background |
| **APIs** | Network First | Siempre datos en tiempo real |

---

## 🌍 Desplegar en Netlify

Ver el archivo [DEPLOY_NETLIFY.md](./DEPLOY_NETLIFY.md) para instrucciones detalladas.

**Resumen rápido:**
1. Crea un repositorio en GitHub
2. Sube tu código
3. Conecta Netlify con GitHub
4. ¡Netlify despliega automáticamente!

---

## 📖 Más información

- [Documentación de PWA](https://web.dev/progressive-web-apps/)
- [Service Workers](https://developer.mozilla.org/es/docs/Web/API/Service_Worker_API)
- [Vite Docs](https://vite.dev/)

---

## 👩‍💼 Autor

Desarrollado por **Tina**

---

**¡Disfruta tu app PWA! 🎉**
```
