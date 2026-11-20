# Fotos de Repollo

Para cambiar una foto, reemplazá el archivo por otro con **exactamente el mismo nombre**.
Mientras una foto no esté, se ve una ilustración con íconos de frutas y verduras.

| Archivo | Dónde aparece | Estado |
| --- | --- | --- |
| `logo.png` | Barra superior, cierre y pie | ✅ |
| `atencion.jpg` | Presentación (arriba de todo) | ✅ |
| `local.jpg` | Galería "Fresquito del día" | ✅ |
| `equipo.jpg` | Cierre de la página (foto del equipo) | ✅ |
| `nosotros/*.jpg` | Carrusel de "Quiénes somos" (lista en `datos.js` → `nosotros`) | ✅ 1 foto, se pueden sumar más |
| `local-2.jpg` | Carrusel de "Quiénes somos" | ✅ |
| `galeria/*.jpg` | Galería "Fresquito del día" (lista en `datos.js` → `galeria`) | ✅ |
| `productos/verduras-y-frutas.jpg`, `pollo.jpg`, `rebozados.jpg`, `pastas.jpg`, `huevos.jpg` | Resumen "Todo lo que vas a encontrar" y catálogo | ✅ |
| `productos/frutas.jpg` | Catálogo, categoría Frutas | ✅ |
| `bolsones/completo.jpg` | Bolsón Completo | ✅ |
| `bolsones/express.jpg` | Bolsón Express | ✅ |
| `bolsones/verduras.jpg` | Bolsón de Verduras | ✅ |
| `bolsones/frutas.jpg` | Bolsón de Frutas | ✅ |
| `bolsones/completo-frutas.jpg` | Completo de Frutas | ✅ |
| `promos/pollo-al-disco.jpg` | Oferta Pollo al disco | ✅ |
| `video/repollo.mp4`, `video/poster.jpg` | Video (debajo de "¿Por qué nos eligen?") | ✅ |
| `og.jpg` | Vista previa del link en WhatsApp (1200 × 630) | ✅ |

En bolsones, productos y promos también sirven `.webp` o `.png` con el mismo nombre.
El nombre del archivo de cada bolsón u oferta es su `id` en `datos.js`.

**Tamaños recomendados:** 1200 px de ancho como máximo y menos de 250 KB por foto
(podés achicarlas gratis en https://squoosh.app). No uses flyers con precios: los precios salen de `datos.js`.
