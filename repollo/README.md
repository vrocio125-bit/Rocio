# Repollo · Landing de pedidos por WhatsApp

Página de una sola pantalla para **Repollo** (verdulería, frutería y pollería, La Calera, Córdoba).
El cliente ve los bolsones y ofertas, arma su pedido y lo manda ya listo por WhatsApp.

HTML, CSS y JS sin frameworks ni build: se sube la carpeta tal cual a cualquier hosting estático
(Netlify, GitHub Pages, Vercel, Hostinger…).

## Archivos

| Archivo | Para qué |
| --- | --- |
| `datos.js` | **Lo único que hay que editar**: bolsones, ofertas, productos, WhatsApp, horarios, envío. |
| `index.html` | Estructura y textos fijos de la página. |
| `styles.css` | Estilos (colores del logo en `:root`). |
| `app.js` | Lógica: pedido, mensaje de WhatsApp y animaciones. |
| `assets/` | Fotos. Ver `assets/LEEME.md` con el nombre exacto de cada una. |

## Cambios frecuentes

- **Precio de un bolsón:** en `datos.js` cambiá `precio: 34900` (sin puntos ni $).
- **Etiqueta o bolsón estrella:** campo `etiqueta` y `destacado: true` (uno solo).
- **Sacar la oferta:** dejá `ofertas: []` y la sección desaparece.
- **Horarios:** `horarios: ["Lunes a sábado: 8 a 13 y 17 a 21 h"]`. Vacío = "Consultanos por WhatsApp".
- **Zonas de envío / monto mínimo:** `envio.zonas` y `envio.montoMinimo`. Vacíos = no se muestran.
- **Agregar un producto:** sumá una línea `{ nombre: "rúcula", emoji: "🥬", categoria: "verduras" }`.
- **Fotos:** copiá el archivo en `assets/` con el nombre indicado en `assets/LEEME.md`. Sin tocar código.

## Al publicar

En `index.html` cambiá `<meta property="og:image" content="assets/og.jpg">` por la dirección completa
(por ejemplo `https://tudominio.com/assets/og.jpg`) para que WhatsApp muestre la vista previa del link.

## Probar en la compu

```bash
cd repollo
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Precios desde Google Sheets (para el dueño)

1. Subí `planilla/Repollo-precios.xlsx` a Google Drive y abrilo con Google Sheets.
2. En Sheets: **Archivo → Compartir → Publicar en la web** → elegí la pestaña **Precios** y el formato **Valores separados por comas (.csv)** → **Publicar**. Copiá el link.
3. Pegá ese link en `datos.js`, en `planillaPrecios: "..."`, y volvé a subir la carpeta (una sola vez).

Desde ahí, el dueño cambia precios, ofertas o disponibilidad en la planilla (también desde el celular) y la página los toma sola en unos minutos.
Solo se publica la pestaña "Precios". La pestaña "Interno" (costos, proveedores) no se publica.
Si la planilla no responde, la página usa los precios de `datos.js`.
