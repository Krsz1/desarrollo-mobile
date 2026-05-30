# 🌙 Lunara — Diario Visual Personal

![Ionic](https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

Aplicación móvil híbrida tipo **diario personal visual** donde el usuario puede registrar entradas con foto, texto y ubicación GPS automática. Incluye **autenticación real con Firebase Auth**, **almacenamiento en Firestore**, **feed compartido en tiempo real** y **mapa interactivo**. Desarrollada en Ionic React + TypeScript como proyecto final del curso de Desarrollo de Software para Plataformas Móviles — UAO.

Aplicación móvil híbrida tipo **diario personal visual** donde el usuario puede registrar entradas con foto, texto y ubicación GPS automática. Incluye **autenticación real con Firebase Auth**, **almacenamiento en Firestore**, **feed compartido en tiempo real** y **mapa interactivo**. Desarrollada en Ionic React + TypeScript como proyecto final del curso de Desarrollo de Software para Plataformas Móviles — UAO.

---

## 📋 Tabla de Contenidos

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
- [APIs Consumidas](#-apis-consumidas)
- [Checklist de la Rúbrica](#-checklist-de-la-rúbrica)
- [Referencias](#-referencias)

---

## 📖 Descripción

Lunara es una aplicación móvil híbrida construida con **Ionic React + TypeScript** que permite al usuario llevar un diario personal enriquecido. Cada entrada combina texto, una fotografía tomada desde el dispositivo y la ubicación GPS detectada automáticamente. Las entradas se almacenan en **Firebase Firestore** y se visualizan en lista y en un **mapa interactivo de Leaflet**. La app incluye un **feed en tiempo real** donde todos los usuarios registrados pueden ver las entradas más recientes de la comunidad actualizándose en vivo.

### 🎯 Objetivos del Proyecto

- ✅ Implementar autenticación real con Firebase Auth (login y registro con nombre de usuario)
- ✅ Almacenar datos en Firestore con listeners en tiempo real
- ✅ Integrar sensores del dispositivo (GPS, cámara, hápticos) con Capacitor
- ✅ Construir un feed compartido en tiempo real con `onSnapshot`
- ✅ Consumir una API REST externa para reverse geocoding (sin API key)
- ✅ Caché offline con `@capacitor/preferences` para carga instantánea
- ✅ Construir para Android nativo con Capacitor

### 🎓 Temas de la Materia Cubiertos

- **React** — Componentes funcionales, estado, props, ciclo de vida
- **Sensores** — GPS (`@capacitor/geolocation`) y Cámara (`@capacitor/camera`)
- **Memoria** — `@capacitor/preferences` como caché offline + Firestore como fuente principal
- **Bases de datos** — Firebase Firestore (NoSQL en la nube)
- **Firebase** — Auth + Firestore + Realtime listeners
- **Comunicación en tiempo real** — `onSnapshot` de Firestore para feed en vivo
- **Context API** — Estado global de autenticación y entradas
- **Routing dinámico** — Rutas protegidas por sesión (`UserRoutes`, `AdminRoutes`)
- **Ionic** — Componentes UI móviles, tabs, menú lateral, modals
- **Mapas** — Leaflet + react-leaflet con marcadores por entrada
- **Hápticos** — Retroalimentación táctil nativa con `@capacitor/haptics`

---

## 🎨 Prototipo

> Prototipo diseñado con **Lovable** (herramienta de IA generativa)

- 🔗 **Enlace al prototipo:** *(pendiente — agregar enlace una vez diseñado en Lovable)*

---

## 👥 Integrantes

| Nombre | GitHub | Rol |
|--------|--------|-----|
| Krsna Gutiérrez | [@Krsz1](https://github.com/Krsz1) | Desarrollo completo |

---

## ✨ Características Principales

- 🔐 **Login y registro real** — Firebase Authentication con email, contraseña y nombre de usuario
- 📷 **Foto por entrada** — cámara del dispositivo o galería, almacenada en base64
- 📍 **Ubicación automática** — GPS con reverse geocoding a dirección legible (Nominatim, sin API key)
- ✏️ **Edición de entradas** — pantalla dedicada para editar cualquier campo de una entrada propia
- 👤 **Perfil de usuario** — avatar, estadísticas (entradas, fotos) y galería de fotos propias
- 🗺️ **Vista en mapa** — todas las entradas del usuario marcadas en Leaflet con posición en vivo
- 🔴 **Feed en tiempo real** — entradas de todos los usuarios actualizadas en vivo con `onSnapshot`
- 🔥 **Firestore** — almacenamiento real en la nube con CRUD completo
- 📲 **Menú lateral** — navegación con `IonMenu` desde cualquier pantalla
- 🌐 **Detección de red** — comportamiento adaptado según conectividad
- 📦 **Caché offline** — `@capacitor/preferences` almacena entradas localmente para carga instantánea
- 📳 **Hápticos** — vibración táctil al tomar fotos, guardar y eliminar entradas
- 🌙 **Mood chip** — indicador visual del momento del día de cada entrada (Mañana / Tarde / Noche / Madrugada)

---

## 🏗️ Arquitectura del Sistema

```
┌────────────────────────────────────────────────────────────────────────┐
│                  PANTALLAS  (Ionic React Router)                       │
│                                                                        │
│  /login  /register  /home  /new  /entry/:id  /entry/:id/edit          │
│  Login   Register  EntryList NewEntry  Detail      EditEntry           │
│                                                                        │
│                  /map      /feed      /admin                           │
│                 MapView   FeedView  UserProfile                        │
└─────────────────────────┬──────────────────────────────────────────────┘
                          │  useEntries() · useAuth()
                          ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   CONTEXTOS GLOBALES  (Context API)                    │
│                                                                        │
│  ┌─────────────────────────────┐   ┌────────────────────────────────┐ │
│  │ AuthContext                 │   │ EntriesContext                 │ │
│  │ user · login · logout       │   │ entries · feedEntries          │ │
│  │ register(+displayName)      │   │ add · update · delete          │ │
│  │ loading                     │   │ realtime onSnapshot · caché    │ │
│  └─────────────────────────────┘   └────────────────────────────────┘ │
└─────────────────────────┬──────────────────────────────────────────────┘
                          │
       ┌──────────────────┼──────────────────┬──────────────────┐
       ▼                  ▼                  ▼                  ▼
┌────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────────┐
│useGeoloc.  │  │  useCamera   │  │  useHaptics  │  │   useAuth      │
│@cap/geoloc │  │  @cap/cam    │  │  @cap/haptic │  │ Firebase Auth  │
└────────────┘  └──────────────┘  └──────────────┘  └────────────────┘
┌────────────┐  ┌──────────────┐
│ useNetwork │  │ useStorage   │
│ @cap/net   │  │ @cap/prefs   │
└────────────┘  └──────────────┘
       │
       ├───────────────────────┬──────────────────────────┐
       ▼                       ▼                          ▼
┌──────────────┐   ┌───────────────────┐       ┌──────────────────────┐
│EntryService  │   │  FirebaseService  │       │  GeoService          │
│CRUD Firestore│   │  config · auth    │       │  Nominatim API       │
│+ onSnapshot  │   │  db · init        │       │  Reverse Geocoding   │
└──────────────┘   └───────────────────┘       │  (sin API key)       │
       │                                       └──────────────────────┘
       ▼
┌────────────────────────┐    ┌──────────────────┐
│    Helpers             │    │     types/       │
│  formatDate.ts         │    │   Entry.ts       │
│  · toTimestampMs       │    └──────────────────┘
│  · formatDate          │
│  · timeAgo             │
│  · getMoodChip         │
│  formatAddress.ts      │
└────────────────────────┘
```

### 📱 Pantallas de la App

| Ruta | Componente | Acceso | Función |
|------|-----------|--------|---------|
| `/login` | `Login` | Público | Iniciar sesión con email y contraseña |
| `/register` | `Register` | Público | Crear cuenta nueva con nombre de usuario |
| `/home` | `EntryList` | Usuario | Lista de entradas propias con menú lateral |
| `/new` | `NewEntry` | Usuario | Crear entrada con foto + GPS + texto |
| `/entry/:id` | `EntryDetail` | Usuario | Ver, editar o borrar una entrada (con mood chip) |
| `/entry/:id/edit` | `EditEntry` | Usuario | Editar título, descripción e imagen de la entrada |
| `/map` | `MapView` | Usuario | Mapa con todas las entradas propias + posición en vivo |
| `/feed` | `FeedView` | Usuario | Feed en tiempo real de la comunidad |
| `/admin` | `UserProfile` | Usuario | Perfil: avatar, estadísticas y galería de fotos |

---

## 🔧 Requisitos Previos

### Software Necesario

1. **Node.js** >= 18.x — [Descargar](https://nodejs.org/)
2. **npm** >= 9.x (incluido con Node.js)
3. **Git** — [Descargar](https://git-scm.com/)
4. **Android Studio** (para build Android) — [Descargar](https://developer.android.com/studio)
5. **Cuenta de Firebase** (gratuita) — [console.firebase.google.com](https://console.firebase.google.com/)

> ✅ **Nominatim** (reverse geocoding) no requiere API key — es gratuito y de uso libre.

### Configuración de Firebase

En la consola de Firebase se debe:
1. Crear un proyecto nuevo
2. Habilitar **Authentication** con el método Email/Password
3. Crear una base de datos **Firestore** en modo producción
4. Copiar las credenciales del proyecto en el archivo `.env`

### Variables de Entorno

El proyecto requiere un archivo `.env` en la raíz (`visual-diary/`) con las siguientes variables:

| Variable | Descripción |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | API Key del proyecto Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | Dominio de autenticación |
| `VITE_FIREBASE_PROJECT_ID` | ID del proyecto Firebase |
| `VITE_FIREBASE_STORAGE_BUCKET` | Bucket de almacenamiento |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | ID del sender de mensajes |
| `VITE_FIREBASE_APP_ID` | ID de la app en Firebase |

> ⚠️ El archivo `.env` nunca debe subirse al repositorio. Está incluido en `.gitignore`.

---

## 🚀 Instalación y Configuración

### Paso 1 — Clonar el Repositorio

```bash
git clone https://github.com/Krsz1/desarrollo-mobile.git
cd desarrollo-mobile/final_proyect/visual-diary
```

### Paso 2 — Instalar Dependencias

```bash
npm install
```

Las dependencias principales incluyen: `@ionic/react`, `@ionic/react-router`, `@capacitor/geolocation`, `@capacitor/camera`, `@capacitor/network`, `@capacitor/haptics`, `@capacitor/preferences`, `firebase`, `leaflet` y `react-leaflet`.

### Paso 3 — Configurar Variables de Entorno

Crear el archivo `.env` en la raíz con las variables listadas en la sección anterior.

### Paso 4 — Ejecutar en Desarrollo

```bash
npm run dev
# Abrir http://localhost:5173
```

### Paso 5 — Build y Ejecutar en Android

```bash
npm run build
npx cap sync android
npx cap open android
```

> ⏱️ **Tiempo estimado de setup:** 3-5 minutos

---

## 📁 Estructura del Proyecto

```
src/
│
├── 📂 helpers/                    ← Funciones generales reutilizables
│   ├── formatDate.ts              ← toTimestampMs · formatDate · timeAgo · getMoodChip
│   └── formatAddress.ts           ← Recorta direcciones largas para tarjetas
│
├── 📂 context/                    ← Contextos globales (Context API)
│   ├── AuthContext.tsx            ← Sesión, login, logout, registro con displayName
│   └── EntriesContext.tsx         ← CRUD de entradas + listener tiempo real + caché offline
│
├── 📂 pages/                      ← Pantallas de la app
│   ├── 📂 Login/
│   │   ├── Login.tsx
│   │   └── Login.module.scss
│   ├── 📂 Register/
│   │   ├── Register.tsx
│   │   └── Register.module.scss
│   ├── 📂 EntryList/
│   │   ├── EntryList.tsx          ← Lista con IonMenuButton + FAB personalizado
│   │   └── EntryList.module.scss
│   ├── 📂 NewEntry/
│   │   ├── NewEntry.tsx           ← Foto + GPS + hápticos al guardar
│   │   └── NewEntry.module.scss
│   ├── 📂 EntryDetail/
│   │   ├── EntryDetail.tsx        ← Mood chip + botón editar (owner) + hápticos al eliminar
│   │   └── EntryDetail.module.scss
│   ├── 📂 EditEntry/
│   │   ├── EditEntry.tsx          ← Editar título, descripción e imagen
│   │   └── EditEntry.module.scss
│   ├── 📂 MapView/
│   │   ├── MapView.tsx            ← Leaflet + marcadores + posición en vivo
│   │   └── MapView.module.scss
│   ├── 📂 FeedView/
│   │   ├── FeedView.tsx           ← Feed en tiempo real con indicador live
│   │   └── FeedView.module.scss
│   └── 📂 UserProfile/
│       ├── UserProfile.tsx        ← Avatar · estadísticas · galería de fotos
│       └── UserProfile.module.scss
│
├── 📂 components/                 ← Componentes reutilizables
│   ├── 📂 EntryCard/
│   │   ├── EntryCard.tsx          ← Usa timeAgo · showAuthor en feed
│   │   └── EntryCard.module.scss
│   └── 📂 Shared/
│       ├── Menu.tsx               ← IonMenu: Diary · Map · Feed · Profile · Sign out
│       └── Menu.module.scss
│
├── 📂 hooks/                      ← Custom Hooks (6 hooks)
│   ├── useGeolocation.ts          ← GPS con loading state
│   ├── useCamera.ts               ← Cámara/galería → base64
│   ├── useNetwork.ts              ← Estado de conexión en tiempo real
│   ├── useHaptics.ts              ← Vibración táctil (impact + notification)
│   ├── useStorage.ts              ← Capacitor Preferences (get/set/remove)
│   └── useAuth.ts                 ← Re-exporta useAuth desde AuthContext
│
├── 📂 routes/                     ← Configuración de rutas
│   ├── AppRoutes.tsx              ← Router raíz: rutas públicas vs protegidas
│   ├── UserRoutes.tsx             ← IonTabs + rutas protegidas para usuarios
│   └── AdminRoutes.tsx            ← Ruta /admin → UserProfile
│
├── 📂 services/                   ← Capa de acceso a datos
│   ├── FirebaseService.ts         ← Inicialización Firebase con VITE_* env vars
│   ├── EntryService.ts            ← addEntry · updateEntry · deleteEntry · realtimeFeed
│   └── GeoService.ts              ← Nominatim reverse geocoding (sin API key)
│
├── 📂 types/                      ← Interfaces TypeScript
│   └── Entry.ts                   ← Entry · NewEntryData
│
└── 📄 App.tsx                     ← Raíz: IonApp > AuthProvider > IonReactRouter > AppRoutes
```

---

## 🧩 Módulos Principales

### 🔥 Firebase — Auth y Firestore

**`FirebaseService.ts`** inicializa la app de Firebase usando las variables de entorno y exporta las instancias de `auth` y `db` que usan todos los demás módulos.

**`EntryService.ts`** es la única capa que toca Firestore directamente. Expone `addEntry`, `updateEntry`, `deleteEntry` y `realtimeFeed`. Este último usa `onSnapshot` para escuchar cambios en tiempo real y ordena las entradas por fecha con `toTimestampMs`.

### 🔐 Autenticación — AuthContext

`AuthContext` envuelve toda la app y expone el estado de sesión (`user`, `loading`) junto con las funciones `login`, `register` y `logout`. El registro guarda el `displayName` del usuario con `updateProfile`. Usa `onAuthStateChanged` para detectar cambios de sesión automáticamente incluso al recargar la página.

### 🌐 Estado Global — EntriesContext

Envuelve la parte autenticada. Al iniciar sesión carga inmediatamente el caché de `@capacitor/preferences` para mostrar datos al instante, luego activa el listener de Firestore (`onSnapshot`) que actualiza la lista en tiempo real. Expone `entries` (propias), `feedEntries` (todos) y las operaciones CRUD.

### 🪝 Custom Hooks (6)

| Hook | Responsabilidad |
|------|----------------|
| `useGeolocation` | Posición GPS con alta precisión y estado `loading` |
| `useCamera` | Abre cámara o galería nativa, retorna imagen como `base64` |
| `useNetwork` | Detecta cambios de conectividad en tiempo real |
| `useHaptics` | `impact(ImpactStyle)` al tomar fotos; `notification(NotificationType)` al guardar/eliminar |
| `useStorage` | Wrapper de `@capacitor/preferences`: `setItem<T>` · `getItem<T>` · `removeItem` |
| `useAuth` | Re-exporta `useAuth` desde AuthContext siguiendo la convención del proyecto |

### 🛠️ Helpers

| Helper | Exportaciones |
|--------|--------------|
| `formatDate.ts` | `toTimestampMs` — convierte `Timestamp` o string a `number` (ms); `formatDate` — fecha legible; `timeAgo` — "hace X min/h/días"; `getMoodChip` — indicador del momento del día (☀️ Mañana / 🌤 Tarde / 🌆 Noche / 🌙 Madrugada) |
| `formatAddress.ts` | `formatAddress(address, maxLength)` — recorta la dirección para que quepa en las tarjetas |

### 🔴 Feed en Tiempo Real — FeedView

`FeedView` muestra las entradas de **todos los usuarios** actualizadas en vivo. Consume `feedEntries` de `EntriesContext`, que ya está suscrito al listener global de Firestore. Cada nueva entrada aparece automáticamente para todos los usuarios sin recargar.

### 🗺️ Mapa — MapView

`MapView` usa `react-leaflet` para renderizar un mapa centrado en la primera entrada del usuario. Por cada entrada con ubicación agrega un marcador con un popup. Usa `Geolocation.watchPosition` para mostrar la posición actual del usuario en tiempo real.

### 👤 Perfil — UserProfile (ruta `/admin`)

Muestra el avatar del usuario (letra inicial con gradiente), un panel de estadísticas (número de entradas y fotos) y una galería de miniaturas 3×3 con las fotos de las entradas. Cada miniatura navega al detalle de esa entrada.

### 🌐 Reverse Geocoding — GeoService

Usa la **API de Nominatim (OpenStreetMap)** para convertir las coordenadas GPS en una dirección postal legible en español. No requiere API key. Si no hay conexión, guarda las coordenadas numéricas como texto de respaldo.

---

## 🔀 Routing y Rutas Protegidas

**`AppRoutes`** verifica `useAuth`. Sin sesión muestra las rutas públicas (`/login`, `/register`). Con sesión activa carga `EntriesProvider` + `Menu` + `UserRoutes`.

**`UserRoutes`** define el `IonTabs` con la barra de navegación inferior (Diary / Map / Feed) y todas las rutas protegidas, incluyendo `AdminRoutes` dentro del outlet.

**`AdminRoutes`** registra la ruta `/admin` apuntando a `UserProfile`, preparado para extenderse con más rutas de perfil o administración.

---

## 🔌 APIs Consumidas

| API | Uso | Costo / Auth |
|-----|-----|-------------|
| **Firebase Authentication** | Login y registro con email/password + `displayName` | Gratuito — credenciales `.env` |
| **Firebase Firestore** | CRUD de entradas y listeners `onSnapshot` en tiempo real | Gratuito (cuota free tier) |
| **Nominatim (OpenStreetMap)** | Reverse geocoding: coordenadas GPS → dirección postal en español. Endpoint: `https://nominatim.openstreetmap.org/reverse` | **Gratuito — sin API key** |

---

## ✅ Checklist de la Rúbrica

| Requisito de la Rúbrica | Estado | Implementación |
|---|---|---|
| Prototipo con Lovable (IA) | ⏳ | Pendiente de diseñar y enlazar |
| App móvil fiel al prototipo | ✅ | Ionic React + SCSS modules con tema Lunara |
| Carpeta `Helpers` | ✅ | `formatDate.ts` (4 exports) · `formatAddress.ts` |
| Carpeta `Context` | ✅ | `AuthContext` · `EntriesContext` |
| Carpeta `Pages` con `.module.scss` | ✅ | Login · Register · EntryList · NewEntry · EntryDetail · EditEntry · MapView · FeedView · UserProfile |
| Carpeta `Components` + `Shared` | ✅ | `EntryCard` · `Shared/Menu` |
| Carpeta `Hooks` (6 custom hooks) | ✅ | `useGeolocation` · `useCamera` · `useNetwork` · `useHaptics` · `useStorage` · `useAuth` |
| Carpeta `Routes` (App / User / Admin) | ✅ | `AppRoutes` · `UserRoutes` · `AdminRoutes` |
| React | ✅ | Componentes funcionales, hooks, estado, props |
| Sensores | ✅ | GPS (`@capacitor/geolocation`) + Cámara (`@capacitor/camera`) + Hápticos (`@capacitor/haptics`) |
| Memoria | ✅ | `@capacitor/preferences` como caché offline + Firestore como fuente principal |
| Bases de datos | ✅ | Firebase Firestore (NoSQL en la nube) |
| Firebase | ✅ | Auth + Firestore |
| Comunicación en tiempo real | ✅ | `onSnapshot` → feed compartido + entradas propias en vivo |
| Mapas | ✅ | Leaflet + react-leaflet, marcadores por entrada, posición en vivo |
| Login y registro real | ✅ | Firebase Authentication con email, contraseña y displayName |
| Almacenamiento en base de datos | ✅ | Firestore con `addDoc` · `updateDoc` · `deleteDoc` |
| Menú lateral | ✅ | `IonMenu` conectado en todas las pantallas autenticadas |
| README con integrantes, prototipo y APIs | ✅ | Este archivo |
| Repositorio Git | ✅ | [github.com/Krsz1/desarrollo-mobile](https://github.com/Krsz1/desarrollo-mobile) |
| Build para Android | ✅ | Capacitor v8 — `appId: com.visualdiary.app` |

---

## 📚 Referencias

- 📘 [Ionic React Documentation](https://ionicframework.com/docs/react)
- 📘 [Firebase Authentication](https://firebase.google.com/docs/auth/web/start)
- 📘 [Firebase Firestore](https://firebase.google.com/docs/firestore/quickstart)
- 📘 [Capacitor Geolocation](https://capacitorjs.com/docs/apis/geolocation)
- 📘 [Capacitor Camera](https://capacitorjs.com/docs/apis/camera)
- 📘 [Capacitor Network](https://capacitorjs.com/docs/apis/network)
- 📘 [Capacitor Haptics](https://capacitorjs.com/docs/apis/haptics)
- 📘 [Capacitor Preferences](https://capacitorjs.com/docs/apis/preferences)
- 📘 [React Leaflet](https://react-leaflet.js.org/)
- 📘 [Nominatim API (OpenStreetMap)](https://nominatim.org/release-docs/develop/api/Reverse/)

---

## 👨‍💻 Autor

- 🐙 GitHub: [@Krsz1](https://github.com/Krsz1)
- 🎓 Proyecto académico — Desarrollo de Software para Plataformas Móviles

---

*Proyecto Final — Desarrollo de Software para Plataformas Móviles — UAO — 2026*
