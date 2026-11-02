import { brand, contact, formatARS } from '../config/site.js';

export function buildWhatsAppMessage(plan, name = '') {
  const lines = [
    `¡Hola! ${name ? `Soy ${name}, de ${brand.name}.` : `Te escribo de ${brand.name}.`}`,
    `Quiero comenzar con el *Pack ${plan.number} — ${plan.name}* (${formatARS(plan.price)} mensuales).`,
    `• ${plan.reels} reels mensuales`,
    `• ${plan.sessions} ${plan.sessions === 1 ? 'jornada' : 'jornadas'} de grabación de hasta ${plan.sessionHours} h`,
    `• Incluye la creación y configuración de Instagram desde cero (primer mes).`,
    '',
    '¿Coordinamos la reunión de planificación?',
  ];
  return lines.join('\n');
}

export function buildWhatsAppUrl(plan, name) {
  const text = encodeURIComponent(buildWhatsAppMessage(plan, name));
  const phone = (contact.whatsappNumber || '').replace(/\D/g, '');
  return phone ? `https://wa.me/${phone}?text=${text}` : `https://wa.me/?text=${text}`;
}
