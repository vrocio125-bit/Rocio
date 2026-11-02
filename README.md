# Hiper Limpio · Landing comercial (propuesta Instagram)

Landing page interactiva para presentar a Tomás la propuesta de creación de Instagram,
producción y edición de reels para **Hiper Limpio** (La Calera, Córdoba).

**Stack:** React 18 · Vite · Tailwind CSS · Framer Motion · Lucide Icons.

## Uso

```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # genera /dist listo para subir a cualquier hosting estático
npm run preview  # previsualiza el build
```

## Antes de enviar la propuesta

| Qué | Dónde |
| --- | --- |
| **Logo original** (obligatorio) | Copiar el archivo a `public/brand/logo-hiper-limpio.png` (o cambiar la ruta en `src/config/brand.js`). Mientras falte, se ve un recuadro punteado "LOGO ORIGINAL". El logo no se redibuja. Si tiene fondo propio, `hasBackground: true` lo presenta sobre una placa blanca. |
| **WhatsApp de destino** | `contact.whatsappNumber` en `src/config/site.js` (formato `549351XXXXXXX`). Vacío = WhatsApp abre el mensaje y deja elegir el contacto. |
| Colores de marca | `src/config/brand.js` (los usa también Tailwind). |
| Precios, reels, jornadas y entregables | `plans` y `comparison` en `src/config/site.js`. |
| Fotos | `images` en `src/config/site.js`. Hoy apuntan a fotos ilustrativas de Unsplash; reemplazar por fotos reales del local en `public/images/`. Si una foto no carga, se muestra un placeholder identificado. |
| Videos reales en "Ejemplos de contenido" | Campo `video` de cada tarjeta en `src/sections/Contenido.jsx`. |

## Estructura

```
src/
  config/        brand.js (logo, colores) · site.js (packs, imágenes, WhatsApp, navegación)
  context/       PlanContext: plan seleccionado compartido entre Planes y Cierre
  components/    Navbar, ScrollProgress, Logo, SmartImage, Reveal, AnimatedText, SectionHeading, whatsapp.js
  sections/      01 Hero → 12 Cierre + Footer
```

## Criterios respetados

- Sin estadísticas, testimonios ni resultados inventados: el gráfico de competencia es conceptual y el dashboard es ilustrativo.
- Competidores mencionados como referencias "a validar".
- Las fotos externas se rotulan como ilustrativas; no hay imágenes que representen a Tomás.
- Accesibilidad: navegación por teclado, `aria-*` en tabs/acordeones, foco visible, contraste AA y `prefers-reduced-motion` respetado.
