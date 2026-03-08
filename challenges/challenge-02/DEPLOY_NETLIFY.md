# 🚀 Guía: Desplegar en Netlify

Sigue estos pasos para desplegar tu Contactos App PWA en Netlify.

**Tiempo estimado: 10 minutos**

---

## Paso 1: Preparar tu repositorio en GitHub

### 1.1 Crear repositorio en GitHub

1. Ve a https://github.com/new
2. **Nombre:** `contactos-app` (o el que prefieras)
3. **Descripción:** "PWA para gestionar contactos"
4. **Tipo:** Público (⭕ Public)
5. Haz clic en **"Create repository"**

### 1.2 Subir tu código a GitHub

En tu terminal (en la carpeta challenge-02):

```bash
# Inicializar Git (si no lo has hecho)
git init

# Agregar todos los archivos
git add .

# Crear primer commit
git commit -m "Initial commit: Contactos App PWA"

# Agregar el repositorio remoto
git remote add origin https://github.com/TU_USUARIO/contactos-app.git

# Cambiar rama a main (si es necesario)
git branch -M main

# Subir el código a GitHub
git push -u origin main
```

**Reemplaza `TU_USUARIO` con tu usuario de GitHub**

---

## Paso 2: Conectar Netlify con GitHub

### 2.1 Acceder a Netlify

1. Ve a https://www.netlify.com/
2. Haz clic en **"Sign up"** → **"Sign up with GitHub"**
3. Autoriza a Netlify para acceder a tus repositorios

### 2.2 Crear nuevo sitio

1. Una vez autenticado, haz clic en **"Add new site"**
2. Selecciona **"Import an existing project"**
3. Elige **GitHub** como proveedor

### 2.3 Seleccionar repositorio

1. Busca **"contactos-app"**
2. Haz clic para seleccionarlo
3. Netlify detectará automáticamente los settings:
   - **Build command:** `npm run build` ✅
   - **Publish directory:** `dist` ✅
4. Haz clic en **"Deploy site"**

---

## Paso 3: Esperar el despliegue

⏳ Netlify compilará y desplegará tu app (1-3 minutos)

Cuando termine verás:
- ✅ "Site is live"
- Tu URL de Netlify: `https://tu-app-xxx.netlify.app`

---

## Paso 4: Personalizar tu dominio (Opcional)

### Opción A: Subdominio gratuito de Netlify

1. Ve a **Site settings** → **Domain management**
2. Haz clic en **"Edit site name"**
3. Escribe: `mi-contactos-app`
4. Tu URL será: `https://mi-contactos-app.netlify.app`

### Opción B: Tu propio dominio

1. Compra un dominio en Namecheap, GoDaddy, etc.
2. Ve a **Site settings** → **Domain management**
3. Haz clic en **"Add custom domain"**
4. Sigue las instrucciones de Netlify

---

## Paso 5: Actualizar README.md con tu enlace

1. Abre el archivo `README.md` localmente
2. Busca la línea:
   ```markdown
   **[➡️ Abre Contactos App aquí](https://tu-app-aqui.netlify.app)**
   ```
3. Reemplázala con tu URL de Netlify:
   ```markdown
   **[➡️ Abre Contactos App aquí](https://mi-contactos-app.netlify.app)**
   ```
4. Guarda el archivo
5. Sube los cambios a GitHub:
   ```bash
   git add README.md
   git commit -m "Update Netlify link"
   git push
   ```

Netlify se actualizará automáticamente en 1-2 minutos.

---

## Paso 6: Verificar que todo funciona

### 6.1 Abrir tu app

1. Ve a tu URL de Netlify
2. La app debería cargar correctamente
3. Agrega algunos contactos para probar

### 6.2 Verificar que es PWA

1. Abre **DevTools** (F12)
2. Ve a la pestaña **"Application"**
3. Busca en el menú izquierdo:

**Manifest:**
```
✅ Deberías ver:
  - name: "Contactos App"
  - icons: [...]
  - etc.
```

**Service Workers:**
```
✅ Deberías ver:
  /sw.js - Status: activated and running
```

### 6.3 Instalar en móvil

1. Abre tu URL en un teléfono
2. Deberías ver un botón **"Instalar"** 
3. Instala la app como se describe en README.md

---

## Paso 7: Cambios futuros

Cada vez que hagas cambios, simplemente:

```bash
git add .
git commit -m "Descripción de cambios"
git push
```

Netlify se actualizará automáticamente en 1-2 minutos.

---

## ⚠️ Solucionar Problemas

### "Build failed" en Netlify

1. Ve a **Deploys** → **Deploy logs**
2. Lee el error
3. Posibles soluciones:
   - Asegúrate que `npm run build` funciona localmente
   - Verifica que todos los archivos están en Git
   - Revisa que `package.json` tiene todas las dependencias

### PWA no instala

1. Verifica que `/manifest.json` existe
2. Verifica que `/sw.js` existe
3. En DevTools → Application, revisa errores
4. Limpia caché del navegador (Ctrl+Shift+Del) y recarga

### Los cambios no se ven

1. Espera 1-2 minutos después de hacer push
2. Abre Netlify → Deploys para ver progreso
3. Limpia caché del navegador
4. Abre en incógnito si sigue igual

---

## 🎉 ¡Fin!

Tu Contactos App está en vivo y lista para ser instalada.

**Comparte tu enlace:**
```
Haz clic aquí para ver mi PWA: https://tu-url.netlify.app
```

---

## 📚 Recursos útiles

- [Documentación de Netlify](https://docs.netlify.com/)
- [PWA en web.dev](https://web.dev/progressive-web-apps/)
- [Git Basics](https://git-scm.com/book/es/v2)

**¿Preguntas? Revisa los logs de Netlify o pregunta en las comunidades de desarrollo.**

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
