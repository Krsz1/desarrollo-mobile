#  VisualDiary — Bitácora Visual con Ubicación

![Ionic](https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

Aplicación móvil híbrida tipo **bitácora personal** donde el usuario puede registrar entradas con foto, texto y ubicación GPS automática. Incluye **autenticación real con Firebase Auth**, **almacenamiento en Firestore**, **feed compartido en tiempo real** y **mapa interactivo**. Desarrollada en Ionic React + TypeScript como proyecto final del curso de Desarrollo de Software para Plataformas Móviles — UAO.

---

##  Tabla de Contenidos

- [Descripción](#-descripción)
- [Prototipo](#-prototipo)
- [Integrantes](#-integrantes)
- [Características Principales](#-características-principales)
- [Arquitectura del Sistema](#️-arquitectura-del-sistema)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Módulos Principales](#-módulos-principales)
- [Routing y Rutas Protegidas](#-routing-y-rutas-protegidas)
- [PWA — Service Worker](#-pwa--service-worker)
- [Deploy en Netlify](#-deploy-en-netlify)
- [APIs Consumidas](#-apis-consumidas)
- [Checklist de la Rúbrica](#-checklist-de-la-rúbrica)
- [Referencias](#-referencias)

---

## Descripción

VisualDiary es una aplicación móvil híbrida construida con **Ionic React + TypeScript** que permite al usuario llevar un diario personal enriquecido. Cada entrada combina texto, una fotografía tomada desde el dispositivo y la ubicación GPS detectada automáticamente. Las entradas se almacenan en **Firebase Firestore** y se visualizan en lista y en un **mapa interactivo de Leaflet**. La app incluye un **feed en tiempo real** donde todos los usuarios registrados pueden ver las entradas más recientes de la comunidad actualizándose en vivo.

### Objetivos del Proyecto

- ✅ Implementar autenticación real con Firebase Auth (login y registro)
- ✅ Almacenar datos en Firestore con listeners en tiempo real
- ✅ Integrar sensores del dispositivo (GPS, cámara) con Capacitor
- ✅ Construir un feed compartido en tiempo real con `onSnapshot`
- ✅ Consumir una API REST externa para reverse geocoding
- ✅ Publicar la aplicación en producción con Netlify

### Temas de la Materia Cubiertos

- **React** — Componentes funcionales, estado, props, ciclo de vida
- **Sensores** — GPS (`@capacitor/geolocation`) y Cámara (`@capacitor/camera`)
- **Memoria** — `localStorage` para caché offline + Firestore como fuente principal
- **Bases de datos** — Firebase Firestore (NoSQL en la nube)
- **Firebase** — Auth + Firestore + Realtime listeners
- **Comunicación en tiempo real** — `onSnapshot` de Firestore para feed en vivo
- **Context API** — Estado global de autenticación y entradas
- **Routing dinámico** — Rutas protegidas por sesión (`UserRoutes`, `AdminRoutes`)
- **Ionic** — Componentes UI móviles, tabs, modals
- **Mapas** — Leaflet + react-leaflet con marcadores por entrada
- **PWA** — Manifest + Service Worker para uso offline
- **Deploy** — Netlify con redirecciones para SPA

---

## Prototipo

> Prototipo diseñado con **Lovable** 

- 🔗 **Enlace al prototipo:** [Ver en Lovable](https://lovable.dev/projects/TU-PROYECTO-AQUI)

---


## Características Principales

-  **Login y registro real** — Firebase Authentication con email y contraseña
-  **Foto por entrada** — cámara del dispositivo o galería, almacenada en base64
-  **Ubicación automática** — GPS con reverse geocoding a dirección legible
-  **Vista en mapa** — todas las entradas del usuario marcadas en Leaflet
-  **Feed en tiempo real** — entradas de todos los usuarios actualizadas en vivo
-  **Firestore** — almacenamiento real en la nube con reglas de seguridad
-  **PWA instalable** — funciona como app nativa desde el navegador
-  **Detección de red** — comportamiento adaptado según conectividad
-  **Deploy en Netlify** — producción con un solo comando

---

## Arquitectura del Sistema

```
┌────────────────────────────────────────────────────────────────┐
│                    PANTALLAS  (Ionic React Router)             │
│                                                                │
│  /login  /register  /home  /new  /entry/:id  /map  /feed      │
│  Login   Register  EntryList NewEntry Detail MapView FeedView  │
└─────────────────────────┬──────────────────────────────────────┘
                          │  useEntries() · useAuth()
                          ▼
┌────────────────────────────────────────────────────────────────┐
│                   CONTEXTOS GLOBALES  (Context API)            │
│                                                                │
│  ┌─────────────────────────┐   ┌──────────────────────────┐   │
│  │ AuthContext             │   │ EntriesContext           │   │
│  │ user · login · logout   │   │ entries · add · delete   │   │
│  │ register · loading      │   │ update · realtime feed   │   │
│  └─────────────────────────┘   └──────────────────────────┘   │
└─────────────────────────┬──────────────────────────────────────┘
                          │
       ┌──────────────────┼──────────────────┬──────────────────┐
       ▼                  ▼                  ▼                  ▼
┌────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────────────┐
│useGeoloc.  │ │  useCamera   │ │  useNetwork  │ │   useAuth      │
│@cap/geoloc │ │  @cap/cam    │ │  @cap/net    │ │ Firebase Auth  │
└─────┬──────┘ └──────┬───────┘ └──────┬───────┘ └───────┬────────┘
      └───────────────┴────────────────┴─────────────────┘
                                │
        ┌───────────────────────┼──────────────────────┐
        ▼                       ▼                      ▼
┌──────────────┐    ┌───────────────────┐    ┌──────────────────┐
│EntryService  │    │  FirebaseService  │    │  GeoService      │
│CRUD Firestore│    │  config · auth    │    │  OpenCage API    │
│+ onSnapshot  │    │  db · init        │    │  Reverse Geocode │
└──────────────┘    └───────────────────┘    └──────────────────┘
        │
        ▼
┌─────────────────┐    ┌──────────────────┐
│    Helpers      │    │     types/       │
│  formatDate     │    │   Entry.ts       │
│  formatAddress  │    │   User.ts        │
└─────────────────┘    └──────────────────┘
        │
        ▼
┌──────────────────────────┐
│   Netlify  (Deploy)      │
└──────────────────────────┘
```

###  Pantallas de la App

| Ruta | Componente | Acceso | Función |
|------|-----------|--------|---------|
| `/login` | `Login` | Público | Iniciar sesión con email y contraseña |
| `/register` | `Register` | Público | Crear cuenta nueva |
| `/home` | `EntryList` | Usuario | Lista de entradas propias |
| `/new` | `NewEntry` | Usuario | Crear entrada con foto + GPS + texto |
| `/entry/:id` | `EntryDetail` | Usuario | Ver, editar o borrar una entrada |
| `/map` | `MapView` | Usuario | Mapa con todas las entradas propias |
| `/feed` | `FeedView` | Usuario | Feed en tiempo real de la comunidad |

---

##  Requisitos Previos

### Software Necesario

1. **Node.js** >= 18.x — [Descargar](https://nodejs.org/)
2. **npm** >= 9.x (incluido con Node.js)
3. **Git** — [Descargar](https://git-scm.com/)
4. **Cuenta de Firebase** (gratuita) — [console.firebase.google.com](https://console.firebase.google.com/)
5. **API Key de OpenCage** (gratuita, 2500 req/día) — [opencagedata.com](https://opencagedata.com/)

### Configuración de Firebase

En la consola de Firebase se debe:
1. Crear un proyecto nuevo
2. Habilitar **Authentication** con el método Email/Password
3. Crear una base de datos **Firestore** en modo producción
4. Copiar las credenciales del proyecto en el archivo `.env`

### Variables de Entorno

El proyecto requiere un archivo `.env` en la raíz con las siguientes variables:

| Variable | Descripción |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | API Key del proyecto Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | Dominio de autenticación |
| `VITE_FIREBASE_PROJECT_ID` | ID del proyecto Firebase |
| `VITE_FIREBASE_STORAGE_BUCKET` | Bucket de almacenamiento |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | ID del sender de mensajes |
| `VITE_FIREBASE_APP_ID` | ID de la app en Firebase |
| `VITE_OPENCAGE_API_KEY` | API Key de OpenCage Geocoding |

> ⚠️ El archivo `.env` nunca debe subirse al repositorio. Está incluido en `.gitignore`.

---

##  Instalación y Configuración

### Paso 1 — Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/visual-diary.git
cd visual-diary
```

### Paso 2 — Instalar Dependencias

```bash
npm install
npx cap init
```

Las dependencias principales incluyen: `@ionic/react`, `@ionic/react-router`, `@capacitor/geolocation`, `@capacitor/camera`, `@capacitor/network`, `firebase`, `leaflet` y `react-leaflet`.

### Paso 3 — Configurar variables de entorno

Crear el archivo `.env` en la raíz con las variables listadas en la sección anterior.

### Paso 4 — Ejecutar en desarrollo

```bash
npm run dev
# Abrir http://localhost:5173
```

 **Tiempo estimado de setup:** 3-5 minutos

### Paso 5 — Verificar build de producción

```bash
npm run build
npm run preview
```

---

## 📁 Estructura del Proyecto

```
src/
│
├── 📂 helpers/                    ← Funciones generales reutilizables
│   ├── formatDate.ts              ← Formateo de fechas (Timestamp → string legible)
│   └── formatAddress.ts           ← Recorta direcciones largas para tarjetas
│
├── 📂 context/                    ← Contextos globales (Context API)
│   ├── AuthContext.tsx            ← Sesión, login, logout, registro
│   └── EntriesContext.tsx         ← CRUD de entradas + listener tiempo real
│
├── 📂 pages/                      ← Pantallas de la app
│   ├── 📂 Login/
│   │   ├── Login.tsx
│   │   └── Login.module.scss
│   ├── 📂 Register/
│   │   ├── Register.tsx
│   │   └── Register.module.scss
│   ├── 📂 EntryList/
│   │   ├── EntryList.tsx
│   │   └── EntryList.module.scss
│   ├── 📂 NewEntry/
│   │   ├── NewEntry.tsx
│   │   └── NewEntry.module.scss
│   ├── 📂 EntryDetail/
│   │   ├── EntryDetail.tsx
│   │   └── EntryDetail.module.scss
│   ├── 📂 MapView/
│   │   ├── MapView.tsx
│   │   └── MapView.module.scss
│   └── 📂 FeedView/
│       ├── FeedView.tsx           ← Feed en tiempo real
│       └── FeedView.module.scss
│
├── 📂 components/                 ← Componentes reutilizables
│   ├── 📂 EntryCard/
│   │   ├── EntryCard.tsx
│   │   └── EntryCard.module.scss
│   ├── 📂 MapMarker/
│   │   ├── MapMarker.tsx
│   │   └── MapMarker.module.scss
│   └── 📂 Shared/
│       ├── Menu.tsx               ← Menú lateral compartido
│       └── Menu.module.scss
│
├── 📂 hooks/                      ← Custom Hooks
│   ├── useGeolocation.ts          ← Obtiene coordenadas GPS del dispositivo
│   ├── useCamera.ts               ← Accede a cámara o galería del dispositivo
│   ├── useNetwork.ts              ← Detecta estado de conexión a internet
│   └── useAuth.ts                 ← Re-exporta helpers de Firebase Auth
│
├── 📂 routes/                     ← Configuración de rutas
│   ├── AppRoutes.tsx              ← Router raíz: decide rutas públicas vs protegidas
│   ├── UserRoutes.tsx             ← Rutas protegidas para usuarios autenticados
│   └── AdminRoutes.tsx            ← Rutas de administración (extensible)
│
├── 📂 services/                   ← Capa de acceso a datos
│   ├── FirebaseService.ts         ← Inicialización de Firebase (auth + db)
│   ├── EntryService.ts            ← CRUD en Firestore + listeners onSnapshot
│   └── GeoService.ts              ← Llamada a OpenCage para reverse geocoding
│
├── 📂 types/                      ← Interfaces TypeScript
│   ├── Entry.ts                   ← Tipo de dato de una entrada del diario
│   └── User.ts                    ← Tipo de dato del usuario autenticado
│
└── 📄 App.tsx                     ← Raíz de la aplicación
│
public/
├── 📄 manifest.json               ← Configuración de la PWA
├── 📄 service-worker.js           ← Cache offline (Network First)
└── 📄 _redirects                  ← Redirecciones Netlify para SPA
```

---

##  Módulos Principales

###  Firebase — Auth y Firestore

**`FirebaseService.ts`** inicializa la app de Firebase usando las variables de entorno y exporta las instancias de `auth` y `db` que usan todos los demás módulos.

**`EntryService.ts`** es la única capa que toca Firestore directamente. Expone métodos para agregar, borrar y actualizar entradas, y dos listeners en tiempo real usando `onSnapshot`: uno para las entradas propias del usuario y otro para el feed global de todos los usuarios.

###  Autenticación — AuthContext

`AuthContext` envuelve toda la app y expone el estado de sesión (`user`, `loading`) junto con las funciones `login`, `register` y `logout`. Usa `onAuthStateChanged` de Firebase para detectar cambios de sesión automáticamente, incluso si el usuario recarga la página.

Las pantallas de **Login** y **Register** consumen este contexto. Si el usuario ya tiene sesión activa, `AppRoutes` lo redirige directamente a `/home` sin pasar por las pantallas públicas.

###  Estado Global — EntriesContext

Envuelve la parte autenticada de la app. Activa dos listeners de Firestore al montar:

- **Entradas propias** — filtradas por `userId` del usuario logueado, ordenadas por fecha descendente.
- **Feed global** — todas las entradas de todos los usuarios, también en tiempo real.

Cada vez que Firestore detecta un cambio en la colección (nueva entrada, edición, borrado), los listeners disparan automáticamente el re-render de todos los componentes suscritos, sin necesidad de recargar.

###  Custom Hooks

| Hook | Responsabilidad |
|------|----------------|
| `useGeolocation` | Solicita la posición GPS actual con alta precisión. Expone un estado `loading` para mostrar indicadores mientras obtiene las coordenadas. |
| `useCamera` | Abre el selector nativo (cámara o galería) y devuelve la imagen como `base64`. Usa `CameraResultType.Base64` de Capacitor. |
| `useNetwork` | Escucha cambios de conectividad en tiempo real. Si el dispositivo pierde conexión, la app guarda coordenadas crudas en lugar de intentar el geocoding. |
| `useAuth` | Re-exporta `useAuth` desde `AuthContext` para que se pueda importar desde la carpeta `hooks/` siguiendo la convención del proyecto. |

###  Helpers

| Helper | Función |
|--------|---------|
| `formatDate` | Convierte un `Timestamp` de Firestore o un string ISO a una fecha legible en español (ej. `"15 de mayo de 2026, 10:32"`). |
| `formatAddress` | Recorta una dirección larga a un número máximo de caracteres y agrega `…` si es necesario, para que quepa en las tarjetas de entrada. |

###  Feed en Tiempo Real — FeedView

`FeedView` muestra las entradas de **todos los usuarios** actualizadas en vivo. No requiere ninguna lógica adicional en la pantalla: simplemente consume `feedEntries` de `EntriesContext`, que ya está suscrito al listener global de Firestore. Cada nueva entrada que cualquier usuario guarde aparece automáticamente en el feed de todos los demás en tiempo real.

###  Mapa — MapView

`MapView` usa `react-leaflet` para renderizar un mapa centrado en la primera entrada del usuario. Por cada entrada que tenga `location` definida, agrega un marcador (`MapMarker`) con un popup que muestra el título, la dirección y la fecha. El mapa solo muestra las entradas del usuario autenticado.

###  Reverse Geocoding — GeoService

Cuando el usuario guarda una entrada con ubicación y hay conexión, `GeoService` hace una petición a la **OpenCage Geocoding API** para convertir las coordenadas GPS en una dirección postal legible en español. Si no hay conexión, guarda las coordenadas numéricas directamente como texto de respaldo.

---

##  Routing y Rutas Protegidas

El sistema de rutas está dividido en tres archivos bajo la carpeta `routes/`:

**`AppRoutes`** es el router raíz. Verifica el estado de autenticación con `useAuth`. Si el usuario no está logueado, muestra las rutas públicas (`/login`, `/register`) y redirige cualquier otra ruta a `/login`. Si está logueado, carga `UserRoutes`.

**`UserRoutes`** define todas las rutas que requieren sesión activa: lista de entradas, nueva entrada, detalle, mapa y feed. También renderiza la barra de tabs inferior con la navegación principal.

**`AdminRoutes`** está preparado para rutas de administración y puede extenderse en el futuro con pantallas de gestión de usuarios o contenido.

---

##  PWA — Service Worker

La app es instalable como PWA en dispositivos móviles y de escritorio. El `service-worker.js` implementa una estrategia **Network First**: intenta obtener el recurso de la red, lo guarda en caché si tiene éxito, y lo sirve desde caché si no hay conexión. El `manifest.json` define el nombre, íconos, colores y modo de display `standalone` para que la app se vea como una app nativa al instalarse.

---

##  Deploy en Netlify

La app se despliega en Netlify como sitio estático. El archivo `_redirects` en `public/` redirige todas las rutas a `index.html` para que el enrutamiento del lado del cliente funcione correctamente.

Las variables de entorno de Firebase y OpenCage deben configurarse en el panel de Netlify bajo **Site settings → Environment variables** antes de hacer el primer deploy.

| Paso | Comando |
|------|---------|
| Crear build | `npm run build` |
| Deploy por CLI | `netlify deploy --prod --dir=dist` |

---

##  APIs Consumidas

| API | Uso | Documentación |
|-----|-----|--------------|
| **Firebase Authentication** | Login y registro de usuarios con email/password | [firebase.google.com/docs/auth](https://firebase.google.com/docs/auth) |
| **Firebase Firestore** | Almacenamiento de entradas y listeners en tiempo real | [firebase.google.com/docs/firestore](https://firebase.google.com/docs/firestore) |
| **OpenCage Geocoding API** | Convertir coordenadas GPS a dirección postal legible | [opencagedata.com/api](https://opencagedata.com/api) |

---

## Checklist de la Rúbrica

| Requisito de la Rúbrica | Estado | Implementación |
|---|---|---|
| Prototipo con Lovable (IA) | ✅ | [Ver prototipo](#-prototipo) |
| App móvil fiel al prototipo | ✅ | Ionic React + SCSS modules |
| Carpeta `Helpers` | ✅ | `formatDate.ts` · `formatAddress.ts` |
| Carpeta `Context` | ✅ | `AuthContext` · `EntriesContext` |
| Carpeta `Pages` con `.module.scss` | ✅ | Login, Register, EntryList, NewEntry, EntryDetail, MapView, FeedView |
| Carpeta `Components` + `Shared` | ✅ | `EntryCard` · `MapMarker` · `Menu` |
| Carpeta `Hooks` | ✅ | `useGeolocation` · `useCamera` · `useNetwork` · `useAuth` |
| Carpeta `Routes` (App / User / Admin) | ✅ | `AppRoutes` · `UserRoutes` · `AdminRoutes` |
| React | ✅ | Componentes funcionales, hooks, estado, props |
| Sensores | ✅ | GPS (`@capacitor/geolocation`) + Cámara (`@capacitor/camera`) |
| Memoria | ✅ | `localStorage` como caché offline + Firestore como fuente principal |
| Bases de datos | ✅ | Firebase Firestore |
| Firebase | ✅ | Auth + Firestore |
| Comunicación en tiempo real | ✅ | `onSnapshot` → feed compartido en vivo |
| Mapas | ✅ | Leaflet + react-leaflet con marcadores |
| Login y registro real | ✅ | Firebase Authentication |
| Almacenamiento en base de datos | ✅ | Firestore con reglas de seguridad |
| Transacción de datos | ✅ | `addDoc` · `updateDoc` · `deleteDoc` en Firestore |
| Documento de alcance en Git | ✅ | `/docs/ALCANCE.md` |
| README con integrantes, prototipo y APIs | ✅ | Este archivo |
| Ramas mezcladas en `main` | ✅ | Ver tabla de integrantes |
| Deploy en producción | ✅ | Netlify |

---

##  Referencias

- 📘 [Ionic React Documentation](https://ionicframework.com/docs/react)
- 📘 [Firebase Authentication](https://firebase.google.com/docs/auth/web/start)
- 📘 [Firebase Firestore](https://firebase.google.com/docs/firestore/quickstart)
- 📘 [Capacitor Geolocation](https://capacitorjs.com/docs/apis/geolocation)
- 📘 [Capacitor Camera](https://capacitorjs.com/docs/apis/camera)
- 📘 [Capacitor Network](https://capacitorjs.com/docs/apis/network)
- 📘 [React Leaflet](https://react-leaflet.js.org/)
- 📘 [OpenCage Geocoding API](https://opencagedata.com/api)

---

##  Autor

- GitHub: [@Krsz1]([https://github.com/Krsz1])
- Proyecto académico — Desarrollo de Software para Plataformas Móviles

---

*Proyecto Final — Desarrollo de Software para Plataformas Móviles — UAO — 2026*
