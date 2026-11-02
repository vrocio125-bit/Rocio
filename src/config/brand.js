// ─────────────────────────────────────────────────────────────
//  IDENTIDAD DE MARCA · HIPER LIMPIO
//  Colores aproximados: ajustarlos al logo original si hace falta.
// ─────────────────────────────────────────────────────────────
export const brand = {
  name: 'Hiper Limpio',
  owner: 'Tomás',
  slogan: 'Calidad, precio y servicio.',
  address: 'Saúl Moyano 133, La Calera, Córdoba, Argentina',

  // LOGOS ORIGINALES (archivos entregados por el cliente, sin modificar).
  // Originales en alta resolución: /public/brand/originales/
  // Las versiones web solo están reducidas de tamaño, manteniendo proporciones.
  logo: {
    // Logo completo: isotipo + "HIPER LIMPIO" sobre su fondo celeste original.
    full: { src: './brand/logo-completo.webp', alt: 'Hiper Limpio', ratio: 1100 / 528 },
    // Isotipo "H" sobre fondo blanco: se presenta en una placa blanca.
    icon: { src: './brand/isotipo.webp', alt: 'Hiper Limpio' },
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
