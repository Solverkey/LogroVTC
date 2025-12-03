# ✅ Checklist de Verificación SEO Post-Deploy

## 🔍 Verificación Inmediata (5 minutos)

### 1. Archivos Públicos
Verifica que estos archivos están accesibles:

- [ ] https://logrovtc.com/mail/robots.txt
- [ ] https://logrovtc.com/mail/sitemap.xml
- [ ] https://logrovtc.com/mail/manifest.json

**Cómo verificar:** Abre cada URL en tu navegador. Deberías ver el contenido.

### 2. Google Analytics
- [ ] Abre https://logrovtc.com/mail/
- [ ] Abre las herramientas de desarrollo (F12)
- [ ] Ve a la pestaña "Network"
- [ ] Recarga la página
- [ ] Busca: `gtag/js?id=G-5Y47PQ86BH`
- [ ] Debería aparecer con status 200

**Alternativa:** Ve a Google Analytics y verifica que hay usuarios activos en tiempo real.

### 3. Metadatos en Homepage
- [ ] Abre https://logrovtc.com/mail/
- [ ] Clic derecho → "Ver código fuente"
- [ ] Busca `<title>` - debería contener "VTC en Logroño"
- [ ] Busca `<meta name="description"` - debería estar presente
- [ ] Busca `application/ld+json` - debería haber schema markup

### 4. Open Graph
- [ ] Ve a https://www.opengraph.xyz/
- [ ] Pega: https://logrovtc.com/mail/
- [ ] Verifica que se muestra correctamente el título y descripción

### 5. Páginas de Localidades
Verifica que estas páginas existen:

- [ ] https://logrovtc.com/mail/localidades/logrono
- [ ] https://logrovtc.com/mail/localidades/haro
- [ ] https://logrovtc.com/mail/localidades/calahorra
- [ ] https://logrovtc.com/mail/localidades/arnedo
- [ ] https://logrovtc.com/mail/localidades/santo-domingo
- [ ] https://logrovtc.com/mail/localidades/najera

## 🔧 Verificación Técnica (10 minutos)

### 6. Mobile-Friendly Test
- [ ] Ve a https://search.google.com/test/mobile-friendly
- [ ] Pega: https://logrovtc.com/mail/
- [ ] Espera resultado
- [ ] Debería decir "La página es compatible con dispositivos móviles"

### 7. Rich Results Test
- [ ] Ve a https://search.google.com/test/rich-results
- [ ] Pega: https://logrovtc.com/mail/
- [ ] Espera resultado
- [ ] Deberías ver: LocalBusiness, Organization

### 8. PageSpeed Insights
- [ ] Ve a https://pagespeed.web.dev/
- [ ] Pega: https://logrovtc.com/mail/
- [ ] Espera análisis completo
- [ ] Verifica que:
  - [ ] Móvil > 70 (mínimo aceptable)
  - [ ] Escritorio > 80 (mínimo aceptable)
  - [ ] Core Web Vitals en verde

### 9. Schema Validator
- [ ] Ve a https://validator.schema.org/
- [ ] Pega: https://logrovtc.com/mail/
- [ ] Verifica que no hay errores críticos

### 10. SSL y Seguridad
- [ ] Verifica que la URL comienza con `https://`
- [ ] Clic en el candado del navegador
- [ ] Debería decir "Conexión segura"

## 📊 Google Search Console (Después de 24-48h)

### 11. Propiedad Verificada
- [ ] Ve a https://search.google.com/search-console
- [ ] Verifica que ves tu propiedad
- [ ] Estado: Verificada ✅

### 12. Sitemap Enviado
- [ ] Ve a la sección "Sitemaps"
- [ ] Verifica que aparece `sitemap.xml`
- [ ] Estado: Correcto ✅ (puede tardar 24-48h)

### 13. Cobertura de Páginas
- [ ] Ve a la sección "Páginas"
- [ ] Espera 3-7 días para ver datos
- [ ] Verifica que hay páginas indexadas

### 14. Experiencia
- [ ] Ve a "Experiencia" → "Core Web Vitals"
- [ ] Espera 28 días para datos completos
- [ ] Objetivo: Mayoría en "Buena"

## 🔍 Bing Webmaster Tools (Después de registro)

### 15. Sitio Agregado
- [ ] Ve a https://www.bing.com/webmasters
- [ ] Verifica que tu sitio aparece
- [ ] Estado: Verificado ✅

### 16. Sitemap Enviado en Bing
- [ ] Ve a "Sitemaps"
- [ ] Agrega: `https://logrovtc.com/mail/sitemap.xml`
- [ ] Estado: Enviado ✅

## 🎯 Búsquedas Manuales (Semana 1-2)

### 17. Buscar Marca
Busca en Google:
- [ ] `logrovtc` - Tu sitio debería aparecer primero
- [ ] `site:logrovtc.com` - Verifica páginas indexadas

### 18. Buscar Localización
Busca en Google:
- [ ] `vtc logroño` - Busca tu sitio en resultados
- [ ] `traslado aeropuerto logroño` - Busca tu sitio

### 19. Google My Business
Si tienes perfil:
- [ ] Busca `logrovtc` en Google Maps
- [ ] Debería aparecer tu negocio
- [ ] Verifica que enlaza a tu web

## 📈 Analytics (Primera Semana)

### 20. Tráfico Registrado
- [ ] Ve a Google Analytics
- [ ] Verifica que hay sesiones registradas
- [ ] Verifica que hay eventos (si configuraste)

### 21. Páginas Más Vistas
- [ ] Ve a "Informes" → "Interacción" → "Páginas y pantallas"
- [ ] Verifica qué páginas reciben más visitas
- [ ] Homepage debería estar en top 3

### 22. Fuentes de Tráfico
- [ ] Ve a "Informes" → "Adquisición"
- [ ] Verifica las fuentes de tráfico
- [ ] Deberías ver: Direct, Organic Search, Referral

## 🐛 Solución de Problemas

### Si robots.txt no funciona:
```bash
# Verifica que el archivo existe
curl https://logrovtc.com/mail/robots.txt
```

### Si sitemap.xml no funciona:
```bash
# Verifica que el archivo existe
curl https://logrovtc.com/mail/sitemap.xml
```

### Si Google Analytics no registra:
1. Abre la consola del navegador (F12)
2. Ve a "Console"
3. Busca errores de `gtag`
4. Verifica que el ID es correcto: `G-5Y47PQ86BH`

### Si las páginas no se indexan:
1. Ve a Google Search Console
2. Pega la URL específica
3. Clic en "Solicitar indexación"
4. Espera 1-2 semanas

## ✨ Todo Correcto

Si has marcado todos los checks, ¡felicidades! Tu sitio está perfectamente optimizado para SEO.

### Próximos Pasos:
1. ⏰ Espera 2-4 semanas para ver resultados en búsquedas
2. 📊 Monitoriza Google Search Console semanalmente
3. 📈 Revisa Google Analytics para ver el tráfico
4. 🔄 Actualiza contenido regularmente
5. 🔗 Consigue backlinks de calidad

## 📞 ¿Necesitas Ayuda?

Si algo no funciona:
1. Revisa la consola de errores del navegador
2. Verifica Google Search Console → "Cobertura"
3. Comprueba que el build fue exitoso
4. Verifica que las URLs son correctas

---

**Fecha de checklist:** 3 de diciembre de 2025  
**Versión:** 1.0
