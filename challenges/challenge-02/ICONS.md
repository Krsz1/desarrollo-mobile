# Generar Iconos PWA

Este documento explica cómo generar los iconos necesarios para tu aplicación PWA en diferentes tamaños.

## Opción 1: Con Python (Automático)

Si tienes Python instalado:

```bash
pip install pillow
npm run generate-icons
```

Esto generará automáticamente todos los iconos PNG necesarios en `public/icons/`.

## Opción 2: Servicio en Línea

Si prefieres usar una herramienta en línea:

1. Ve a https://www.favicon-generator.org/
2. Sube el archivo `public/icon-base.svg`
3. Selecciona los siguientes tamaños:
   - 72x72
   - 96x96
   - 128x128
   - 144x144
   - 152x152
   - 192x192
   - 384x384
   - 512x512
4. Descarga los iconos y colócalos en la carpeta `public/icons/`

## Opción 3: Con ImageMagick

Si tienes ImageMagick instalado:

```bash
convert public/icon-base.svg -resize 192x192 public/icons/icon-192x192.png
convert public/icon-base.svg -resize 192x192 public/icons/icon-maskable-192x192.png
convert public/icon-base.svg -resize 512x512 public/icons/icon-512x512.png
convert public/icon-base.svg -resize 512x512 public/icons/icon-maskable-512x512.png
# ... repetir para otros tamaños
```

## Iconos requeridos

Se necesitan los siguientes archivos en `public/icons/`:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png
- icon-maskable-192x192.png
- icon-maskable-512x512.png

## Notas

- Los iconos maskable se usan en dispositivos que aplican máscaras de seguridad
- Asegúrate de que todos los iconos sean cuadrados (sxs)
- Los iconos deben tener fondo opaco (no transparente) excepto los maskable
