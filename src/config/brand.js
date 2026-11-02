// ─────────────────────────────────────────────────────────────
//  IDENTIDAD DE MARCA · HIPER LIMPIO
//  Colores aproximados: ajustarlos al logo original si hace falta.
// ─────────────────────────────────────────────────────────────
export const brand = {
  name: 'Hiper Limpio',
  owner: 'Tomás',
  slogan: 'Calidad, precio y servicio.',
  address: 'Saúl Moyano 133, La Calera, Córdoba, Argentina',

  // LOGO ORIGINAL: copiar el archivo entregado por el cliente a
  // /public/brand/logo-hiper-limpio.png (o cambiar la ruta acá).
  // Mientras no exista, se muestra un placeholder claramente identificado.
  // El logo NO se redibuja ni se reemplaza por texto.
  logo: {
    src: './brand/logo-hiper-limpio.png',
    alt: 'Logo original de Hiper Limpio',
    // Si el logo tiene fondo propio, se presenta dentro de una "placa" blanca
    // para integrarlo sin alterar su diseño.
    hasBackground: true,
  },

  colors: {
    navy: '#073B87',
    intense: '#0875C4',
    sky: '#1DB7F4',
    white: '#FFFFFF',
    accent: '#FFE000',
    ink: '#10243A',
  },
};
