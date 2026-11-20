# Fotos de Repollo

Para cambiar una foto, reemplazá el archivo por otro con **exactamente el mismo nombre**.
Mientras una foto no esté, se ve una composición con emojis.

| Archivo | Dónde aparece | Estado |
| --- | --- | --- |
| `logo.png` | Barra superior, cierre y pie | ✅ cargado (recortado del flyer) |
| `local.jpg` | Presentación (arriba de todo) | ✅ |
| `equipo.jpg` | "Quiénes somos", foto grande | ✅ |
| `local-2.jpg` | "Quiénes somos", foto chica | ✅ |
| `galeria/*.jpg` | Galería "Fresquito del día" (lista en `datos.js` → `galeria`) | ✅ |
| `productos/verduras-y-frutas.jpg`, `pollo.jpg`, `rebozados.jpg`, `huevos.jpg` | Resumen "Todo lo que vas a encontrar" | ✅ |
| `productos/pastas.jpg` | Resumen, tarjeta Pastas | ⏳ falta |
| `bolsones/completo.jpg` | Bolsón Completo | ⏳ falta |
| `bolsones/express.jpg` | Bolsón Express | ⏳ falta |
| `bolsones/verduras.jpg` | Bolsón de Verduras | ⏳ falta |
| `bolsones/frutas.jpg` | Bolsón de Frutas | ⏳ falta |
| `bolsones/completo-frutas.jpg` | Completo de Frutas | ⏳ falta |
| `promos/pollo-al-disco.jpg` | Oferta Pollo al disco | ⏳ falta |
| `og.jpg` | Vista previa del link en WhatsApp (1200 × 630) | ✅ |

En bolsones, productos y promos también sirven `.webp` o `.png` con el mismo nombre.
El nombre del archivo de cada bolsón u oferta es su `id` en `datos.js`.

**Tamaños recomendados:** 1200 px de ancho como máximo y menos de 250 KB por foto
(podés achicarlas gratis en https://squoosh.app). No uses flyers con precios: los precios salen de `datos.js`.
