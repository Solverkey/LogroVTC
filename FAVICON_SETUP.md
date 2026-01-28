# Configuración de Favicons - LogroVTC

## ✅ Archivos ya creados

- ✅ `/src/app/icon.svg` - Icono principal (SVG vectorial)
- ✅ `/src/app/apple-icon.svg` - Icono para dispositivos Apple
- ✅ `/public/manifest.json` - Web App Manifest para PWA
- ✅ `/src/app/favicon.ico` - Favicon tradicional (ya existía)

## 📝 Archivos pendientes (recomendados para PWA completa)

Para completar la configuración PWA, necesitas crear versiones PNG del logo:

### Opción 1: Generar automáticamente (Recomendado)

Usa [RealFaviconGenerator](https://realfavicongenerator.net/):

1. Sube tu imagen `logo.png` (la imagen con fondo morado que proporcionaste)
2. Ajusta las opciones según prefieras
3. Descarga el paquete generado
4. Copia los siguientes archivos a `/public/`:
   - `icon-192.png` (192×192px)
   - `icon-512.png` (512×512px)

### Opción 2: Manual con ImageMagick

Si tienes ImageMagick instalado:

```bash
# Desde la raíz del proyecto
cd /ruta/donde/esta/tu/logo.png

# Crear icon-192.png
convert logo.png -resize 192x192 public/icon-192.png

# Crear icon-512.png
convert logo.png -resize 512x512 public/icon-512.png
```

### Opción 3: Online con Squoosh

1. Visita [Squoosh](https://squoosh.app/)
2. Sube tu logo
3. Redimensiona a 192×192 y descarga como `icon-192.png`
4. Repite para 512×512 y descarga como `icon-512.png`
5. Coloca ambos archivos en `/public/`

## 🎨 Especificaciones del logo

- **Color de fondo**: `#A53776` (morado/magenta)
- **Color de texto**: `#FFFFFF` (blanco)
- **Fuente**: Sans-serif bold
- **Texto**: "Logro" (arriba) y "VTC" (abajo)
- **Formato**: Cuadrado con bordes redondeados

## 🔍 Verificación

Una vez añadidos los archivos PNG, verifica que todo funcione:

1. **Desarrollo**: `npm run dev` y abre http://localhost:3000
2. **Navegador**: Revisa la pestaña del navegador para ver el favicon
3. **Dispositivos móviles**: Prueba añadir el sitio a la pantalla de inicio
4. **Lighthouse**: Ejecuta una auditoría PWA en Chrome DevTools

## 📱 PWA (Progressive Web App)

Con los archivos configurados, tu sitio será instalable como app:

- **Android**: Chrome mostrará el banner "Añadir a pantalla de inicio"
- **iOS**: Safari permitirá "Añadir a pantalla de inicio"
- **Desktop**: Chrome/Edge mostrarán el botón de instalación

## 🌐 Archivos servidos por Next.js

Next.js automáticamente sirve estos archivos:

- `/favicon.ico` → `/src/app/favicon.ico`
- `/icon.svg` → `/src/app/icon.svg`
- `/apple-icon.svg` → `/src/app/apple-icon.svg`
- `/manifest.json` → `/public/manifest.json`

## 📋 Meta tags generados automáticamente

Next.js genera automáticamente:

```html
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-icon.svg">
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#A53776">
```

## 🚀 Estado actual

- ✅ Favicons SVG configurados (funcionan en todos los navegadores modernos)
- ✅ Manifest.json creado con configuración PWA
- ✅ Theme color definido (#A53776)
- ⚠️ Archivos PNG pendientes (opcionales pero recomendados para PWA completa)

**Nota**: Los archivos SVG funcionan perfectamente en todos los navegadores modernos. Los PNG son opcionales y principalmente para PWA/dispositivos móviles.
