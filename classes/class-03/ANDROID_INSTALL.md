# Instalación en dispositivo físico - Android

El proyecto ha sido compilado y sincronizado con Capacitor. Sigue estos pasos para instalar la aplicación en un dispositivo Android real:

## Pasos:

### 1. Abre el proyecto en Android Studio
Desde la carpeta `challenge-03`, ejecuta:

```bash
npx cap open android
```

Esto abrirá automáticamente Android Studio con el proyecto Android configurado.

### 2. Conecta tu dispositivo
- Conecta tu teléfono Android via USB
- Habilita "Depuración USB" en las opciones de desarrollador
  - Ve a Configuración > Acerca del teléfono
  - Toca "Número de compilación" 7 veces
  - Ve atrás y abre "Opciones de desarrollador"
  - Activa "Depuración USB"

### 3. En Android Studio
- Espera a que el dispositivo aparezca en la lista de dispositivos
- Selecciona tu dispositivo en el selector (parte superior)
- Haz clic en el botón "Run" (play verde) o presiona Shift + F10
- La aplicación se compilará e instalará en tu dispositivo

### 4. ¡Disfruta la app!
La aplicación de contactos debería abrirse automáticamente en tu dispositivo.

## Solución de problemas:

**¿El dispositivo no aparece?**
- Reinicia el servidor ADB: `adb kill-server && adb start-server`
- Reinicia el dispositivo
- Prueba con un cable USB diferente

**¿Errores de compilación?**
- Asegurate de tener instalado Android SDK correctamente
- Verifica que gradle esté actualizado
- Ejecuta `./gradlew build` desde la carpeta `android/`

## Para iOS (Mac requerida):

Si tienes un Mac, puedes instalar en iOS ejecutando:

```bash
npx cap open ios
```

Luego abre el proyecto en Xcode y sigue pasos similares.

---

**¡La aplicación está lista para usar!** 🚀
