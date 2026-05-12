# 📸 VisualDiary — Bitácora Visual con Ubicación

![Ionic](https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

Este proyecto implementa una **bitácora personal móvil** donde el usuario puede registrar entradas con foto, texto y ubicación GPS automática. Las entradas se visualizan en lista y en un mapa interactivo. Funciona completamente **offline como PWA**, sin necesidad de backend propio.

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características Principales](#-características-principales)
- [Arquitectura del Sistema](#️-arquitectura-del-sistema)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tipo de Dato Central](#️-tipo-de-dato-central)
- [Servicio de Datos](#-servicio-de-datos)
- [Estado Global — Context API](#-estado-global--context-api)
- [Custom Hooks](#-custom-hooks)
- [Reverse Geocoding](#️-reverse-geocoding)
- [Pantalla Principal — NewEntry](#-pantalla-principal--newentry)
- [Routing](#-routing)
- [PWA — Service Worker](#-pwa--service-worker)
- [Deploy en Netlify](#-deploy-en-netlify)
- [Checklist de la Materia](#-checklist-de-la-materia)

---

## 📖 Descripción

VisualDiary es una aplicación móvil híbrida construida con **Ionic React + TypeScript** que permite al usuario llevar un diario personal con entradas enriquecidas: cada entrada combina texto, una fotografía tomada desde el dispositivo y la ubicación geográfica detectada automáticamente por GPS. Las entradas se visualizan en lista y también en un mapa interactivo de Leaflet, donde cada punto del mapa representa una entrada guardada.

### 🎯 Objetivos del Proyecto

- ✅ Implementar una PWA instalable que funcione offline
- ✅ Integrar sensores del dispositivo (GPS, cámara) con Capacitor
- ✅ Manejar estado global sin backend usando Context API + localStorage
- ✅ Consumir una API REST externa para reverse geocoding
- ✅ Publicar la aplicación en producción con Netlify

### 🎓 Temas de la Materia Cubiertos

Este proyecto cubre los siguientes temas del curso:

- **React** — Componentes, estado, props, ciclo de vida
- **Context API** — Estado global sin prop drilling
- **Routing dinámico** — Navegación con parámetros (`/entry/:id`)
- **Ionic** — Componentes UI móviles y navegación nativa
- **Capacitor** — Acceso a GPS, cámara y red nativa del dispositivo
- **Storage** — Persistencia local con `localStorage`
- **Mapas** — Integración de Leaflet + react-leaflet
- **API REST** — Consumo de OpenCage Geocoding API con `fetch`
- **PWA** — Manifest + Service Worker para uso offline
- **Deploy** — Publicación en producción con Netlify

---

## ✨ Características Principales

- 📷 **Foto por entrada** — toma foto con la cámara o elige de la galería
- 📍 **Ubicación automática** — guarda coordenadas GPS y convierte a dirección legible
- 🗺️ **Vista en mapa** — todas las entradas marcadas en un mapa interactivo con Leaflet
- 💾 **100% offline** — persiste en `localStorage`, sin backend requerido
- 📲 **PWA instalable** — funciona como app nativa en Android e iOS desde el navegador
- 🔌 **Detección de red** — si no hay conexión, guarda las coordenadas crudas
- 🌐 **Reverse geocoding** — convierte coordenadas GPS a dirección legible (OpenCage API)
- 🚀 **Deploy en Netlify** — un solo comando para publicar en producción

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                   PANTALLAS  (Ionic React Router)           │
│                                                             │
│   /home          /new          /entry/:id        /map       │
│  EntryList     NewEntry       EntryDetail      MapView      │
└──────────────────────┬──────────────────────────────────────┘
                       │  useEntries()
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              CONTEXTO GLOBAL  (Context API)                 │
│                                                             │
│  EntriesProvider                                            │
│  ┌──────────────────────┐   ┌────────────────────────────┐  │
│  │ useState             │   │ Acciones                   │  │
│  │ entries: Entry[]     │──▶│ addEntry · deleteEntry     │  │
│  │ (init localStorage)  │   │ updateEntry                │  │
│  └──────────────────────┘   └────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┬──────────────┐
        ▼              ▼              ▼              ▼
┌──────────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐
│useGeolocation│ │useCamera │ │useStorage│ │  useNetwork  │
│@cap/geoloc   │ │@cap/cam  │ │localStorage│ │  @cap/net   │
└──────┬───────┘ └────┬─────┘ └────┬─────┘ └──────┬───────┘
       └──────────────┴─────────────┴───────────────┘
                                │
          ┌─────────────────────┼──────────────────────┐
          ▼                     ▼                      ▼
  ┌───────────────┐   ┌──────────────────┐   ┌─────────────────┐
  │EntryService.ts│   │ types/Entry.ts   │   │ OpenCage API    │
  │ CRUD en       │   │ Interfaz         │   │ Reverse         │
  │ localStorage  │   │ de datos         │   │ Geocoding       │
  └───────────────┘   └──────────────────┘   └─────────────────┘
          │
          ▼
  ┌───────────────┐
  │   Netlify     │
  │   (Deploy)    │
  └───────────────┘
```

### 📱 Pantallas de la App

| Ruta | Componente | Función |
|------|-----------|---------|
| `/home` | `EntryList` | Lista todas las entradas guardadas |
| `/new` | `NewEntry` | Crea una entrada con foto + GPS + texto |
| `/entry/:id` | `EntryDetail` | Ver, editar o borrar una entrada |
| `/map` | `MapView` | Mapa interactivo con todos los marcadores |

---

## 🔧 Requisitos Previos

### Software Necesario

Antes de comenzar, asegúrate de tener instalado:

1. **Node.js** >= 18.x
   - [Descargar Node.js](https://nodejs.org/)

2. **npm** >= 9.x (incluido con Node.js)

3. **Git**
   - [Descargar Git](https://git-scm.com/)

4. **API Key de OpenCage** (gratuita)
   - Regístrate en [opencagedata.com](https://opencagedata.com/)
   - Incluye 2,500 peticiones/día en el plan gratuito

### Verificar Instalación

```bash
# Verificar Node.js
node --version
# Salida esperada: v18.x.x o superior

# Verificar npm
npm --version
# Salida esperada: 9.x.x o superior
```

---

## 🚀 Instalación y Configuración

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/visual-diary.git
cd visual-diary
```

### Paso 2: Instalar Dependencias

```bash
# Ionic + iconos
npm install @ionic/react @ionic/react-router ionicons

# Capacitor core
npm install @capacitor/core @capacitor/cli

# Plugins de sensores
npm install @capacitor/geolocation @capacitor/camera @capacitor/network

# Mapa interactivo
npm install leaflet react-leaflet
npm install -D @types/leaflet

# Inicializar Capacitor
npx cap init
```

### Paso 3: Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_OPENCAGE_API_KEY=tu_api_key_aqui
```

### Paso 4: Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

⏱️ **Tiempo estimado de setup:** 3-5 minutos

### Paso 5: Verificar el Build

```bash
# Crear build de producción
npm run build

# Previsualizar build localmente
npm run preview
```

**Salida esperada de `vagrant status`:**
```
✓ built in 3.45s
dist/index.html                 1.23 kB
dist/assets/index-abc123.js   312.45 kB
```

---

## 📁 Estructura del Proyecto

```
src/
│
├── 📂 types/
│   └── Entry.ts               ← Interfaz principal de datos
│
├── 📂 services/
│   ├── EntryService.ts        ← CRUD en localStorage
│   └── GeoService.ts          ← Reverse geocoding con OpenCage
│
├── 📂 context/
│   └── EntriesContext.tsx     ← Estado global (Context API)
│
├── 📂 hooks/
│   ├── useGeolocation.ts      ← @capacitor/geolocation
│   ├── useCamera.ts           ← @capacitor/camera
│   ├── useStorage.ts          ← localStorage helpers
│   └── useNetwork.ts          ← @capacitor/network
│
├── 📂 pages/
│   ├── EntryList.tsx          ← /home — lista de entradas
│   ├── NewEntry.tsx           ← /new — crear entrada
│   ├── EntryDetail.tsx        ← /entry/:id — ver / editar / borrar
│   └── MapView.tsx            ← /map — mapa con marcadores
│
├── 📂 components/
│   ├── EntryCard.tsx          ← Tarjeta de entrada en la lista
│   └── MapMarker.tsx          ← Marcador personalizado en el mapa
│
└── 📄 App.tsx                 ← Routing raíz + tab bar
│
public/
├── 📄 manifest.json           ← Configuración de la PWA
├── 📄 service-worker.js       ← Cache offline
└── 📄 _redirects              ← Redirecciones para Netlify SPA
```

---

## 🗂️ Tipo de Dato Central

```typescript
// src/types/Entry.ts
export interface Entry {
  id: string;
  title: string;
  body: string;
  photoBase64: string | null;   // foto almacenada como base64
  location: {
    lat: number;
    lng: number;
    address: string;            // resultado del reverse geocoding
  } | null;
  createdAt: string;            // ISO 8601
}
```

---

## 💾 Servicio de Datos

Único punto de contacto con `localStorage`. No sabe nada de React: solo lee y escribe JSON puro.

```typescript
// src/services/EntryService.ts
import { Entry } from '../types/Entry';

const KEY = 'visual_diary_entries';

export const EntryService = {
  getAll(): Entry[] {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  },

  save(entries: Entry[]): void {
    localStorage.setItem(KEY, JSON.stringify(entries));
  },

  add(entry: Entry): Entry[] {
    const entries = [...this.getAll(), entry];
    this.save(entries);
    return entries;
  },

  delete(id: string): Entry[] {
    const entries = this.getAll().filter(e => e.id !== id);
    this.save(entries);
    return entries;
  },

  update(updated: Entry): Entry[] {
    const entries = this.getAll().map(e => e.id === updated.id ? updated : e);
    this.save(entries);
    return entries;
  },
};
```

---

## 🌐 Estado Global — Context API

Envuelve toda la app con `EntriesProvider`. Cualquier pantalla puede acceder a entradas y acciones llamando `useEntries()` sin necesidad de pasar props entre componentes.

```typescript
// src/context/EntriesContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Entry } from '../types/Entry';
import { EntryService } from '../services/EntryService';

interface EntriesCtx {
  entries: Entry[];
  addEntry:    (entry: Entry) => void;
  deleteEntry: (id: string)  => void;
  updateEntry: (entry: Entry) => void;
}

const EntriesContext = createContext<EntriesCtx | null>(null);

export const EntriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inicia el estado desde localStorage — funciona offline desde el primer render
  const [entries, setEntries] = useState<Entry[]>(() => EntryService.getAll());

  const addEntry    = (e: Entry)   => setEntries(EntryService.add(e));
  const deleteEntry = (id: string) => setEntries(EntryService.delete(id));
  const updateEntry = (e: Entry)   => setEntries(EntryService.update(e));

  return (
    <EntriesContext.Provider value={{ entries, addEntry, deleteEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};

// Hook consumidor — lanza error claro si se usa fuera del Provider
export const useEntries = () => {
  const ctx = useContext(EntriesContext);
  if (!ctx) throw new Error('useEntries debe estar dentro de EntriesProvider');
  return ctx;
};
```

---

## 🪝 Custom Hooks

### `useGeolocation.ts`

```typescript
// src/hooks/useGeolocation.ts
import { useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';

export const useGeolocation = () => {
  const [loading, setLoading] = useState(false);

  const getPosition = async () => {
    setLoading(true);
    try {
      const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
      return { lat: pos.coords.latitude, lng: pos.coords.longitude };
    } finally {
      setLoading(false);
    }
  };

  return { getPosition, loading };
};
```

### `useCamera.ts`

```typescript
// src/hooks/useCamera.ts
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export const useCamera = () => {
  const takePhoto = async (): Promise<string | null> => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,  // pregunta al usuario: cámara o galería
      quality: 70,
    });
    return photo.base64String ?? null;
  };

  return { takePhoto };
};
```

### `useNetwork.ts`

```typescript
// src/hooks/useNetwork.ts
import { useEffect, useState } from 'react';
import { Network } from '@capacitor/network';

export const useNetwork = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const listener = Network.addListener('networkStatusChange', s => {
      setIsOnline(s.connected);
    });
    return () => { listener.then(l => l.remove()); };
  }, []);

  return { isOnline };
};
```

---

## 🗺️ Reverse Geocoding

Convierte coordenadas GPS en una dirección legible usando OpenCage. Si no hay conexión, guarda las coordenadas directamente como texto.

```typescript
// src/services/GeoService.ts
const API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;

export const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
  try {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${API_KEY}&language=es&no_annotations=1`
    );
    const data = await res.json();
    return data.results[0]?.formatted ?? 'Ubicación desconocida';
  } catch {
    return 'Sin conexión';
  }
};
```

**Ejemplo de respuesta:**
```
"Calle 5 Norte #28-14, Cali, Valle del Cauca, Colombia"
```

---

## 📝 Pantalla Principal — NewEntry

Pantalla que integra todos los hooks: cámara, GPS, detección de red y contexto global en un solo flujo.

```typescript
// src/pages/NewEntry.tsx
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonInput, IonTextarea, IonItem, IonLabel,
  IonImg, useIonRouter, IonLoading,
} from '@ionic/react';
import { useState } from 'react';
import { useEntries }     from '../context/EntriesContext';
import { useCamera }      from '../hooks/useCamera';
import { useGeolocation } from '../hooks/useGeolocation';
import { useNetwork }     from '../hooks/useNetwork';
import { reverseGeocode } from '../services/GeoService';
import { Entry }          from '../types/Entry';

const NewEntry: React.FC = () => {
  const { addEntry }   = useEntries();
  const { takePhoto }  = useCamera();
  const { getPosition, loading: gpsLoading } = useGeolocation();
  const { isOnline }   = useNetwork();
  const router         = useIonRouter();

  const [title, setTitle] = useState('');
  const [body,  setBody]  = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  const handlePhoto = async () => {
    const b64 = await takePhoto();
    if (b64) setPhoto(b64);
  };

  const handleSave = async () => {
    const pos = await getPosition();
    let location: Entry['location'] = null;

    if (pos) {
      const address = isOnline
        ? await reverseGeocode(pos.lat, pos.lng)
        : `${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)}`;
      location = { ...pos, address };
    }

    const entry: Entry = {
      id: crypto.randomUUID(),
      title,
      body,
      photoBase64: photo,
      location,
      createdAt: new Date().toISOString(),
    };

    addEntry(entry);
    router.push('/home', 'back');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nueva entrada</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Título</IonLabel>
          <IonInput value={title} onIonChange={e => setTitle(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Notas</IonLabel>
          <IonTextarea rows={4} value={body} onIonChange={e => setBody(e.detail.value!)} />
        </IonItem>

        {photo && <IonImg src={`data:image/jpeg;base64,${photo}`} />}

        <IonButton expand="block" onClick={handlePhoto}>
          {photo ? 'Cambiar foto' : 'Agregar foto'}
        </IonButton>
        <IonButton expand="block" onClick={handleSave} disabled={!title}>
          Guardar entrada
        </IonButton>

        <IonLoading isOpen={gpsLoading} message="Obteniendo ubicación..." />
      </IonContent>
    </IonPage>
  );
};

export default NewEntry;
```

---

## 🔀 Routing

```typescript
// src/App.tsx
import { IonApp, IonRouterOutlet, IonTabBar, IonTabButton,
         IonTabs, IonIcon, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { listOutline, addOutline, mapOutline } from 'ionicons/icons';
import { EntriesProvider } from './context/EntriesContext';
import EntryList   from './pages/EntryList';
import NewEntry    from './pages/NewEntry';
import EntryDetail from './pages/EntryDetail';
import MapView     from './pages/MapView';

const App: React.FC = () => (
  <IonApp>
    <EntriesProvider>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/home"      component={EntryList}   exact />
            <Route path="/new"       component={NewEntry}    exact />
            <Route path="/entry/:id" component={EntryDetail} exact />
            <Route path="/map"       component={MapView}     exact />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={listOutline} /><IonLabel>Entradas</IonLabel>
            </IonTabButton>
            <IonTabButton tab="new" href="/new">
              <IonIcon icon={addOutline} /><IonLabel>Nueva</IonLabel>
            </IonTabButton>
            <IonTabButton tab="map" href="/map">
              <IonIcon icon={mapOutline} /><IonLabel>Mapa</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </EntriesProvider>
  </IonApp>
);

export default App;
```

---

## 📲 PWA — Service Worker

### `public/service-worker.js` — Estrategia Network First

```javascript
// public/service-worker.js
const CACHE = 'visual-diary-v1';
const ASSETS = ['/', '/index.html'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
```

### Registro en `src/main.tsx`

```typescript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
```

### `public/manifest.json`

```json
{
  "name": "VisualDiary",
  "short_name": "Diary",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#534AB7",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

Conecta el manifest en `index.html`:

```html
<link rel="manifest" href="/manifest.json" />
```

---

## 🚢 Deploy en Netlify

### Opción A — Drag & Drop

```bash
# 1. Crear el build
npm run build

# 2. Crear archivo de redirecciones para SPA
echo "/* /index.html 200" > dist/_redirects

# 3. Arrastrar la carpeta /dist a netlify.com/drop
```

### Opción B — CLI

```bash
# Instalar CLI de Netlify
npm install -g netlify-cli

# Login
netlify login

# Deploy a producción
netlify deploy --prod --dir=dist
```

### Actualizar un Deploy Existente

```bash
# Reconstruir y redesplegar
npm run build
netlify deploy --prod --dir=dist
```

**Salida esperada:**
```
Deploy path: dist/
Deploying to main site URL...
✔  Deploy is live!

Website URL: https://visual-diary-xxxx.netlify.app
```

---

## ✅ Checklist de la Materia

| Tema del Curso | Implementación en el Proyecto |
|---|---|
| React — componentes, estado, props | Todos los componentes y páginas |
| `useState` / `useEffect` / `useContext` | `EntriesContext`, todos los hooks |
| Context API | `EntriesContext.tsx` + `EntriesProvider` |
| Routing dinámico (`/entry/:id`) | `App.tsx` → `EntryDetail` con `useParams` |
| Ionic UI components | `IonPage`, `IonItem`, `IonButton`, `IonTabs`... |
| Storage / persistencia local | `EntryService.ts` → `localStorage` |
| `@capacitor/geolocation` | `useGeolocation.ts` |
| `@capacitor/camera` | `useCamera.ts` |
| `@capacitor/network` | `useNetwork.ts` |
| Mapas con Leaflet | `MapView.tsx` + `react-leaflet` |
| API REST externa (`fetch`) | `GeoService.ts` → OpenCage Geocoding API |
| PWA (manifest + service worker) | `public/manifest.json` + `service-worker.js` |
| Deploy en producción | Netlify — `npm run build` + `_redirects` |

---

## 📚 Referencias

- 📘 [Ionic React Documentation](https://ionicframework.com/docs/react)
- 📘 [Capacitor Geolocation](https://capacitorjs.com/docs/apis/geolocation)
- 📘 [Capacitor Camera](https://capacitorjs.com/docs/apis/camera)
- 📘 [Capacitor Network](https://capacitorjs.com/docs/apis/network)
- 📘 [React Leaflet](https://react-leaflet.js.org/)
- 📘 [OpenCage Geocoding API](https://opencagedata.com/api)
- 📘 [Netlify Deploy Docs](https://docs.netlify.com/)

---

## 👨‍💻 Autor

**Tu Nombre Aquí**

- 🐙 GitHub: [@Krsz1]([https://github.com/Krsz1])
- 🎓 Proyecto académico — Desarrollo de Software para Plataformas Móviles

---

*Última actualización: Mayo 2026*
