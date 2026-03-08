# 🚀 Guía de Despliegue en Netlify

Esta guía te ayudará a desplegar tu Contacts App PWA en Netlify en pocos pasos.

## Requisitos previos

- Una cuenta en [GitHub](https://github.com) (gratuita)
- Una cuenta en [Netlify](https://netlify.com) (gratuita)
- Tu código en un repositorio de GitHub

## Paso 1: Preparar tu repositorio de GitHub

1. **Inicia un repositorio Git en tu proyecto local:**
   ```bash
   cd challenges/challenge-02
   git init
   git add .
   git commit -m "Initial commit: Contacts App PWA"
   ```

2. **Crea un nuevo repositorio en GitHub:**
   - Ve a https://github.com/new
   - Nombre: `contacts-app` (o el que prefieras)
   - Descripción: "Contacts App - Progressive Web Application"
   - Selecciona **Public** (para que pueda acceder Netlify)
   - Haz clic en **Create repository**

3. **Sube tu código a GitHub:**
   ```bash
   git remote add origin https://github.com/TU_USER/contacts-app.git
   git branch -M main
   git push -u origin main
   ```
   Reemplaza `TU_USER` con tu usuario de GitHub

## Paso 2: Conectar Netlify con GitHub

1. **Ve a [Netlify](https://www.netlify.com/)**

2. **Haz clic en "Sign up"** (o "Log in" si ya tienes cuenta)
   - Selecciona "Sign up with GitHub"
   - Autoriza Netlify para acceder a tus repositorios

3. **Después de autenticarte, haz clic en "Add new site"**
   - Selecciona "Import an existing project"
   - Selecciona "GitHub" como proveedor

## Paso 3: Seleccionar el repositorio

1. **En "Pick a repository", busca y selecciona:**
   - `contacts-app` (o el nombre que le diste)

2. **Netlify mostrará la configuración automática:**
   ```
   Build command: npm run build
   Publish directory: dist
   ```
   ✅ Estos valores están correctos, déjalos como están

3. **Haz clic en "Deploy site"**

## Paso 4: Esperar el despliegue

1. **Verás una pantalla de "Building..."**
   - Esto toma entre 1-3 minutos
   - Netlify está instalando dependencias, compilando y desplegando

2. **Cuando termine, verás:**
   - ✅ Site is live
   - Tu URL de Netlify (algo como: `https://competent-jepsen-abc123.netlify.app`)

## Paso 5: Personalizar tu dominio (Opcional)

### Con un subdominio gratuito de Netlify:

1. Ve a **Site settings** → **Domain management**
2. Haz clic en **Change site name**
3. Escribe tu nuevo nombre (ej: `mi-contacts-app`)
4. Tu URL será: `https://mi-contacts-app.netlify.app`

### Con tu propio dominio:

1. Compra un dominio en un registrador (Namecheap, GoDaddy, etc.)
2. Ve a **Site settings** → **Domain management**
3. Haz clic en **Add custom domain**
4. Sigue las instrucciones de Netlify

## Paso 6: Actualizar el README con tu enlace

1. **En tu repositorio local, abre `README.md`**

2. **Reemplaza en la línea del enlace de Netlify:**
   ```markdown
   **[Abre Contacts App en Netlify](https://tu-url-de-netlify.netlify.app)**
   ```
   Con tu URL real, por ejemplo:
   ```markdown
   **[Abre Contacts App en Netlify](https://mi-contacts-app.netlify.app)**
   ```

3. **Guarda y sube los cambios:**
   ```bash
   git add README.md
   git commit -m "Update Netlify link"
   git push
   ```
   Netlify se actualizará automáticamente en 1-2 minutos

## Paso 7: Verificar que PWA está funcionando

1. **Abre tu app en Netlify:**
   - Ve a tu URL de Netlify en una pestaña

2. **Abre DevTools (F12)** y ve a **Application**

3. **Busca "Manifest" en el panel izquierdo**
   - Deberías ver tus iconos y datos de la app

4. **Busca "Service Workers"**
   - Deberías ver tu service worker registrado y activo

5. **Instala la app:**
   - Si ves un botón "Install" en la barra de direcciones, ¡tu PWA está lista! 🎉

## Solucionar problemas

### Error de compilación

Si ves "Build failed":

1. **Ve a Deploy logs** en Netlify
2. Busca el error específico
3. Posibles soluciones:
   - Asegúrate que `npm run build` funciona localmente
   - Verifica que todos los archivos estén en Git (`git add .`)
   - Revisa que package.json tiene todas las dependencias

### PWA no instala

Si ves icono PWA en el navegador:

1. **Verifica el manifest:**
   ```bash
   # En DevTools Console
   navigator.serviceWorker.controller
   ```

2. **Genera los iconos:**
   ```bash
   python generate-icons.py
   ```
   Y sube las imágenes a `public/icons/`

3. **Limpia el caché del navegador y recarga**

### Los cambios no se ven

1. **Espera 1-2 minutos** después de hacer push
2. **Abre Netlify Deploys** para ver si está procesando
3. **Limpia caché del navegador** (Ctrl+Shift+Del)

## Actualizar tu aplicación

Cada vez que hagas cambios:

```bash
# Localmente
git add .
git commit -m "Tu mensaje de cambio"
git push origin main

# Netlify se actualizará automáticamente en 1-2 minutos
```

## Comandos útiles

```bash
# Ver el estado de tu sitio
netlify status

# Abrir tu sitio en el navegador
netlify open:site

# Ver los logs de despliegue
netlify logs

# Deshacer último despliegue
netlify deploy --prod --manual
```

## Recursos adicionales

- [Documentación de Netlify](https://docs.netlify.com/)
- [Guía PWA](https://web.dev/progressive-web-apps/)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

---

¡Felicidades! 🎉 Tu Contacts App PWA está en vivo y lista para ser instalada en dispositivos móviles.
