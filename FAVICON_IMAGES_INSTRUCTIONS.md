# Instrucciones para añadir las imágenes del Favicon

Has proporcionado 4 versiones del logo en diferentes tamaños. Aquí está cómo organizarlas:

## 📁 Estructura de archivos requerida

### Imágenes que debes guardar manualmente:

1. **Favicon tradicional (.ico)**
   - Archivo: `/src/app/favicon.ico`
   - Usar: La imagen más pequeña (16x16 o 32x32)
   - Formato: Convertir PNG a ICO
   - Herramienta: https://convertio.co/es/png-ico/

2. **Icon 192x192 (PWA)**
   - Archivo: `/public/icon-192.png`
   - Usar: La imagen mediana-grande (probablemente la 3ra imagen)
   - Tamaño: Exactamente 192x192 píxeles
   - Formato: PNG

3. **Icon 512x512 (PWA)**
   - Archivo: `/public/icon-512.png`
   - Usar: La imagen más grande (última imagen)
   - Tamaño: Exactamente 512x512 píxeles
   - Formato: PNG

4. **Apple Touch Icon**
   - Archivo: `/public/apple-touch-icon.png`
   - Usar: La imagen mediana (180x180 o similar)
   - Tamaño: 180x180 píxeles recomendado
   - Formato: PNG

## 🔄 Paso a paso

### 1. Descargar tus imágenes
Guarda las 4 imágenes que me pasaste en tu computadora local con nombres temporales:
- `logo-16.png` (más pequeña)
- `logo-64.png` (mediana pequeña)
- `logo-192.png` (mediana grande)
- `logo-512.png` (más grande)

### 2. Redimensionar si es necesario

Si las imágenes no tienen exactamente los tamaños necesarios, usa una de estas opciones:

**Opción A - Online (Squoosh):**
1. Ir a https://squoosh.app/
2. Subir cada imagen
3. Ajustar a los tamaños requeridos
4. Descargar

**Opción B - Línea de comandos (ImageMagick):**
```bash
# Instalar ImageMagick si no lo tienes
sudo apt-get install imagemagick  # Linux
brew install imagemagick          # macOS

# Redimensionar
convert logo-original.png -resize 192x192 icon-192.png
convert logo-original.png -resize 512x512 icon-512.png
convert logo-original.png -resize 180x180 apple-touch-icon.png
convert logo-original.png -resize 32x32 favicon.ico
```

### 3. Copiar archivos al proyecto

```bash
# Desde tu terminal, en la raíz del proyecto LogroVTC
cp /ruta/a/tus/imagenes/icon-192.png public/icon-192.png
cp /ruta/a/tus/imagenes/icon-512.png public/icon-512.png
cp /ruta/a/tus/imagenes/apple-touch-icon.png public/apple-touch-icon.png
cp /ruta/a/tus/imagenes/favicon.ico src/app/favicon.ico
```

### 4. Actualizar manifest.json

Una vez copiados los PNG, actualiza `/public/manifest.json`:

```json
{
  "name": "LogroVTC - Servicios VTC en La Rioja",
  "short_name": "LogroVTC",
  "description": "VTC en Logroño y La Rioja. Traslados a aeropuertos, Camino de Santiago y mensajería urgente.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#A53776",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png",
      "purpose": "apple touch icon"
    }
  ],
  "categories": ["travel", "transportation"],
  "lang": "es",
  "dir": "ltr"
}
```

### 5. Verificar

Después de copiar los archivos:

```bash
# Verificar que los archivos existen
ls -lh public/icon-*.png
ls -lh public/apple-touch-icon.png
ls -lh src/app/favicon.ico

# Hacer commit
git add public/icon-192.png public/icon-512.png public/apple-touch-icon.png src/app/favicon.ico public/manifest.json
git commit -m "feat: Añadir imágenes PNG del favicon para PWA completa"
git push
```

## 🎨 Especificaciones de las imágenes

Todas las imágenes deben tener:
- **Fondo**: Morado #A53776
- **Texto**: Blanco #FFFFFF
- **Texto**: "Logro" (arriba) y "VTC" (abajo)
- **Bordes**: Redondeados (según el tamaño)
- **Formato**: PNG con transparencia NO (fondo sólido morado)

## 🔍 Testing

Después de añadir las imágenes:

1. **Desarrollo local**: `npm run dev`
2. **Verificar favicon**: Abrir http://localhost:3000 y ver la pestaña del navegador
3. **Verificar PWA**:
   - Chrome DevTools → Application → Manifest
   - Verificar que todos los iconos se muestran correctamente
4. **Móvil**:
   - Probar "Añadir a pantalla de inicio" en iOS/Android
   - Verificar que el icono se ve bien

## 📝 Notas importantes

- Los archivos SVG actuales (`icon.svg`, `apple-icon.svg`) seguirán funcionando como fallback
- Los PNG son para mejor compatibilidad con PWA y dispositivos móviles
- El archivo `favicon.ico` debe estar en `/src/app/` (Next.js lo detecta automáticamente)
- Los PNG deben estar en `/public/` para que sean accesibles públicamente

## ❓ ¿Necesitas ayuda?

Si las imágenes no tienen exactamente los tamaños necesarios:
1. Usa https://squoosh.app/ para redimensionar
2. O usa https://realfavicongenerator.net/ para generar todas las versiones automáticamente
3. O usa ImageMagick con los comandos de arriba

---

**Estado actual**: SVG configurado ✅ | PNG pendientes ⚠️ | ICO existe ✅
