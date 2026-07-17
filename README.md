# ReKrea

Sitio web multipágina, estático y responsive basado en la maqueta oficial de ReKrea. La interfaz está implementada con HTML5, CSS3 y JavaScript Vanilla, sin backend, autenticación ni votación interna.

## Ejecutar localmente

Requiere Node.js 18 o superior.

```bash
npm run serve
```

Abre `http://127.0.0.1:4173`. Para ejecutar la validación automatizada:

```bash
npm test
```

Para generar el paquete estático de producción en `dist/`:

```bash
npm run build
```

`hosting/worker.js` es únicamente el adaptador de entrega de archivos que exige Sites. La experiencia visible continúa siendo HTML, CSS y JavaScript Vanilla, sin lógica de servidor ni almacenamiento.

## Páginas

- `index.html`: inicio, póster de presentación, métricas y accesos principales.
- `que-es-rekrea.html`: explicación, carrusel del proceso, materiales y convocatoria.
- `galeria.html`: filtros, cuatro obras, modal accesible y carrusel por obra.
- `artistas.html`: directorio de artistas y convocatoria.
- `artista-*.html`: cuatro perfiles individuales con carrusel.
- `contacto.html`: redes, formulario de voluntariado y WhatsApp.

## Video de inicio

La portada integra el video oficial de ReKrea desde YouTube mediante el modo de privacidad mejorada. La reproducción automática se solicita silenciada para respetar las políticas de los navegadores; el visitante puede activar el sonido y usar los controles del reproductor.

## Recursos

Las fotografías originales fueron convertidas a WebP y redimensionadas para la web. Los iconos entregados para métricas, proceso y redes sociales se conservan como PNG transparente, mientras que los logotipos y patrones mantienen SVG. Los nombres se normalizaron a minúsculas y guiones para evitar rutas frágiles.

## Estructura del código

- Los nueve archivos `.html` contienen la estructura semántica de cada página.
- `assets/css/styles.css` contiene el sistema visual principal y `assets/css/responsive.css` los ajustes para tablet y móvil.
- `assets/js/data.js` centraliza enlaces, obras y artistas.
- `assets/js/components.js` genera el encabezado y pie compartidos.
- `assets/js/main.js`, `gallery.js` y `artist.js` contienen las interacciones, filtros, modales, carruseles y animaciones.
- `assets/img/`, `assets/icons/` y `assets/patterns/` contienen todos los recursos visibles utilizados por la web.

## Accesibilidad e interacción

El sitio incluye foco visible, navegación móvil accesible, `aria-current`, filtros con `aria-pressed`, anuncios `aria-live`, modales con trampa de foco y cierre por Escape, carruseles mediante botones, teclado y gesto horizontal, y compatibilidad con `prefers-reduced-motion`.
