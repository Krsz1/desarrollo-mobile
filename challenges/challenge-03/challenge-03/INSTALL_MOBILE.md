# Ionic Contacts App - Challenge 03

Una aplicación de gestión de contactos compilada con Ionic React que permite listar, agregar y eliminar contactos. Esta aplicación ha sido completamente migrada del desafío 01 (React + Vite) a Ionic usando componentes nativos de Ionic.

## Características

- ✅ Lista de contactos con precarga de datos
- ✅ Agregar nuevos contactos (nombre y teléfono)
- ✅ Eliminar contactos de la lista
- ✅ Interfaz responsive usando Ionic components
- ✅ Loader nativo de Ionic mientras se cargan los datos
- ✅ Compatible con dispositivos móviles iOS y Android

## Instalación de dependencias

```bash
cd challenge-03
npm install
```

## Desarrollo en navegador

Para probar la aplicación en el navegador:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/`

## Compilación para producción

```bash
npm run build
```

## Instalación en dispositivo físico

### Prerrequisitos

- Node.js y npm instalados
- Android SDK (para Android) o Xcode (para iOS)
- Capacitor CLI: `npm install -g @capacitor/cli`

### Pasos para instalar en Android

1. **Compilar la aplicación para producción:**
   ```bash
   npm run build
   ```

2. **Sincronizar con Capacitor:**
   ```bash
   npx cap sync android
   ```

3. **Abrir el proyecto en Android Studio:**
   ```bash
   npx cap open android
   ```

4. **Desde Android Studio:**
   - Selecciona tu dispositivo o emulador
   - Haz clic en "Run" (o presiona Shift + F10)
   - La aplicación se instalará y ejecutará en el dispositivo

### Pasos para instalar en iOS

1. **Compilar la aplicación para producción:**
   ```bash
   npm run build
   ```

2. **Sincronizar con Capacitor:**
   ```bash
   npx cap sync ios
   ```

3. **Abrir el proyecto en Xcode:**
   ```bash
   npx cap open ios
   ```

4. **Desde Xcode:**
   - Selecciona tu dispositivo o simulador
   - Haz clic en el botón "Play" o presiona Cmd + R
   - La aplicación se instalará y ejecutará en el dispositivo

## Estructura del proyecto

```
src/
├── components/
│   ├── ContactForm.tsx      # Formulario para agregar contactos (Ionic)
│   ├── Contacts.tsx         # Lista de contactos (Ionic)
│   └── Loader.tsx           # Componente de carga (Ionic)
├── hooks/
│   └── useContacts.tsx      # Hook con la lógica de contactos
├── pages/
│   └── Home.tsx             # Página principal
├── App.tsx                  # Componente raíz de la aplicación
└── main.tsx                 # Punto de entrada
```

## Componentes Ionic utilizados

- `IonPage` - Contenedor de página
- `IonHeader` & `IonToolbar` - Barra de herramientas superior
- `IonContent` - Contenido principal desplazable
- `IonTitle` - Título de la página
- `IonCard` & `IonCardContent` - Tarjeta contenedora
- `IonItem` & `IonLabel` - Items con etiquetas
- `IonInput` - Campo de entrada de texto
- `IonButton` - Botones Ionic
- `IonIcon` - Iconos (basura para eliminar)
- `IonList` - Lista de items
- `IonSpinner` - Indicador de carga
- `IonGrid`, `IonRow`, `IonCol` - Sistema de grilla para layout responsivo
- `IonText` - Componente de texto

## Tecnologías utilizadas

- React 18
- TypeScript
- Ionic Framework 7+
- Capacitor
- Vite
