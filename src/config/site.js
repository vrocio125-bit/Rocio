// ─────────────────────────────────────────────────────────────
//  CONFIGURACIÓN CENTRALIZADA DE LA LANDING
//  Precios, packs, imágenes y contacto se editan SOLO desde acá.
// ─────────────────────────────────────────────────────────────
export { brand } from './brand.js';

// CONTACTO DE WHATSAPP
// Número de destino en formato internacional SIN "+" ni espacios.
// Ej.: '5493510000000'. Si se deja vacío, WhatsApp abre el mensaje
// prellenado y permite elegir el contacto manualmente.
export const contact = {
  whatsappNumber: '5493513920042', // +54 9 351 392-0042
  providerLabel: 'Propuesta de producción audiovisual para Instagram',
};

// IMÁGENES
// Las fotos externas son ILUSTRATIVAS (Unsplash License) y no representan
// el local ni los productos de Hiper Limpio. Reemplazar por fotos reales
// del negocio cuando estén disponibles (ej.: './images/local-01.jpg').
// Si una imagen no carga, se muestra un placeholder de marca identificado.
const u = (id, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;
export const images = {
  hero: { src: u('photo-1585421514738-01798e348b17', 1200), alt: 'Productos de limpieza (fotografía ilustrativa)', label: 'Productos de limpieza' },
  shelf: { src: u('photo-1583947215259-38e31be8751f', 1200), alt: 'Artículos de limpieza ordenados (fotografía ilustrativa)', label: 'Góndola de productos' },
  recording: { src: u('photo-1598300042247-d088f8ab3a91', 1200), alt: 'Grabación con smartphone (fotografía ilustrativa)', label: 'Grabación vertical 9:16' },
  editing: { src: u('photo-1574717024653-61fd2cf4d44d', 1200), alt: 'Edición de video (fotografía ilustrativa)', label: 'Edición de video' },
  demo: { src: u('photo-1581578731548-c64695cc6952', 900), alt: 'Demostración de limpieza (fotografía ilustrativa)', label: 'Demostración' },
  tips: { src: u('photo-1563453392212-326f5e854473', 900), alt: 'Productos y paños de limpieza (fotografía ilustrativa)', label: 'Consejos de limpieza' },
  promo: { src: u('photo-1610557892470-55d9e80c0bce', 900), alt: 'Botellas de productos de limpieza (fotografía ilustrativa)', label: 'Promociones y combos' },
  human: { src: u('photo-1556909114-f6e7ad7d3136', 900), alt: 'Espacio de hogar limpio (fotografía ilustrativa)', label: 'Espacio para video de Tomás' },
  surface: { src: u('photo-1584622650111-993a426fbf0a', 1600), alt: 'Superficie limpia y brillante (fotografía ilustrativa)', label: 'Superficie limpia' },
};

// PACKS DE INVERSIÓN
export const launchBenefit = {
  title: 'Beneficio de lanzamiento',
  text: 'Creación y configuración profesional de Instagram desde cero.',
  note: 'Incluido en los tres packs durante el primer mes, sin cargo adicional de implementación. Servicio que se realiza una sola vez.',
};

export const plans = [
  {
    id: 'impulso',
    number: '01',
    name: 'Impulso',
    price: 200000,
    reels: 4,
    sessions: 1,
    sessionHours: 2,
    tagline: 'Para comenzar a desarrollar una presencia profesional en Instagram.',
    mainBenefit: 'Arrancar con una base profesional y constante.',
    recommended: false,
    includes: [
      '4 reels mensuales',
      '1 jornada presencial de grabación de hasta 2 horas',
      'Ideas y guiones',
      'Dirección de Tomás frente a cámara',
      'Grabación',
      'Edición profesional',
      'Subtítulos y portadas',
      'Copys comerciales',
      'Programación y publicación en Instagram',
      'Reporte básico mensual',
    ],
  },
  {
    id: 'crecimiento',
    number: '02',
    name: 'Crecimiento',
    price: 280000,
    reels: 8,
    sessions: 2,
    sessionHours: 2,
    tagline: 'Para sostener una estrategia audiovisual con mayor frecuencia y continuidad.',
    mainBenefit: 'Frecuencia y continuidad para construir comunidad.',
    recommended: true,
    includes: [
      '8 reels mensuales',
      '2 jornadas presenciales de grabación de hasta 2 horas cada una',
      'Estrategia y calendario editorial',
      'Ideas y guiones',
      'Dirección de Tomás',
      'Grabación profesional',
      'Edición profesional',
      'Subtítulos y portadas',
      'Copys y llamados a la acción',
      'Programación y publicación en Instagram',
      'Optimización inicial del perfil',
      'Informe mensual de rendimiento',
    ],
  },
  {
    id: 'posicionamiento',
    number: '03',
    name: 'Posicionamiento',
    price: 350000,
    reels: 12,
    sessions: 3,
    sessionHours: 2,
    tagline: 'Para una presencia audiovisual más intensiva.',
    mainBenefit: 'Presencia intensiva en Instagram y Facebook Reels.',
    recommended: false,
    includes: [
      '12 reels mensuales',
      '3 jornadas presenciales de grabación de hasta 2 horas cada una',
      'Estrategia y planificación audiovisual',
      'Guiones',
      'Dirección frente a cámara',
      'Grabación',
      'Edición profesional',
      'Subtítulos y portadas',
      'Copys',
      'Publicación en Instagram',
      'Adaptación y publicación en Facebook Reels',
      'Coordinación editorial con Tomás',
      'Seguimiento de contenidos y competencia',
      'Informe mensual y reunión de seguimiento',
    ],
  },
];

// Filas del comparador de presupuestos (true / false / texto por plan)
export const comparison = [
  { label: 'Reels mensuales', values: { impulso: '4', crecimiento: '8', posicionamiento: '12' } },
  { label: 'Jornadas de grabación (hasta 2 h c/u)', values: { impulso: '1', crecimiento: '2', posicionamiento: '3' } },
  { label: 'Creación de Instagram desde cero (1er mes)', values: { impulso: true, crecimiento: true, posicionamiento: true } },
  { label: 'Ideas y guiones', values: { impulso: true, crecimiento: true, posicionamiento: true } },
  { label: 'Dirección de Tomás frente a cámara', values: { impulso: true, crecimiento: true, posicionamiento: true } },
  { label: 'Edición profesional, subtítulos y portadas', values: { impulso: true, crecimiento: true, posicionamiento: true } },
  { label: 'Programación y publicación en Instagram', values: { impulso: true, crecimiento: true, posicionamiento: true } },
  { label: 'Estrategia y calendario editorial', values: { impulso: false, crecimiento: true, posicionamiento: true } },
  { label: 'Optimización inicial del perfil', values: { impulso: false, crecimiento: true, posicionamiento: true } },
  { label: 'Adaptación a Facebook Reels', values: { impulso: false, crecimiento: false, posicionamiento: true } },
  { label: 'Seguimiento de contenidos y competencia', values: { impulso: false, crecimiento: false, posicionamiento: true } },
  { label: 'Reporte', values: { impulso: 'Básico', crecimiento: 'Informe mensual', posicionamiento: 'Informe + reunión' } },
];

export const formatARS = (n) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

export const navLinks = [
  { id: 'diagnostico', label: 'Diagnóstico' },
  { id: 'competencia', label: 'Mercado' },
  { id: 'propuesta', label: 'Propuesta' },
  { id: 'produccion', label: 'Producción' },
  { id: 'plan-90', label: '90 días' },
  { id: 'planes', label: 'Inversión' },
  { id: 'contacto', label: 'Contacto' },
];
