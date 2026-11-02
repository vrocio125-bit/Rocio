import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Lightbulb, ShieldCheck, Target, Info } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';

const cards = [
  {
    id: 'f',
    title: 'Fortalezas',
    icon: ShieldCheck,
    tone: 'from-intense to-navy',
    chip: 'bg-intense/10 text-intense',
    summary: 'La base ya existe: negocio, marca y productos.',
    items: [
      'Negocio físico establecido.',
      'Identidad visual reconocible.',
      'Presencia previa en Facebook.',
      'Productos de consumo cotidiano.',
      'Posibilidad de crear demostraciones reales.',
      'Atención cercana a consumidores locales.',
    ],
  },
  {
    id: 'd',
    title: 'Debilidades',
    icon: Target,
    tone: 'from-slate-500 to-ink',
    chip: 'bg-slate-100 text-ink',
    summary: 'Lo que falta construir en Instagram.',
    items: [
      'Ausencia de Instagram.',
      'Falta de posicionamiento orgánico en esa plataforma.',
      'No existe todavía una comunidad propia en Instagram.',
      'Falta una estrategia audiovisual sostenida.',
      'Oportunidad de mejorar el reconocimiento digital.',
    ],
  },
  {
    id: 'o',
    title: 'Oportunidades',
    icon: Lightbulb,
    tone: 'from-sky to-intense',
    chip: 'bg-accent/30 text-navy',
    summary: 'Hacia dónde puede crecer la marca.',
    items: [
      'Crear una comunidad local.',
      'Mostrar productos en acción.',
      'Generar confianza mediante videos.',
      'Humanizar la marca con Tomás.',
      'Atraer consultas comerciales.',
      'Impulsar visitas al local.',
      'Evaluar expansión a localidades cercanas.',
    ],
  },
];

function DiagCard({ card, index }) {
  const [open, setOpen] = useState(true);
  const Icon = card.icon;
  return (
    <Reveal delay={index * 0.12} className="h-full">
      <motion.article whileHover={{ y: -6 }} className="card group flex h-full flex-col overflow-hidden">
        <div className={`relative bg-gradient-to-br ${card.tone} p-6 text-white`}>
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-150" aria-hidden="true" />
          <Icon className="h-9 w-9" aria-hidden="true" />
          <h3 className="mt-4 text-2xl font-bold">{card.title}</h3>
          <p className="mt-1 text-sm text-white/80">{card.summary}</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex items-center justify-between px-6 pt-5 text-left text-sm font-semibold text-navy"
        >
          {open ? 'Ocultar detalle' : `Ver ${card.items.length} puntos`}
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-2.5 overflow-hidden px-6 pb-6 pt-4"
            >
              {card.items.map((it) => (
                <li key={it} className="flex gap-3 text-[15px] text-ink/80">
                  <span className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${card.chip}`}>•</span>
                  {it}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.article>
    </Reveal>
  );
}

export default function Diagnostico() {
  return (
    <section id="diagnostico" className="section bg-white">
      <div className="container-x">
        <SectionHeading
          number="02"
          eyebrow="¿Dónde está hoy Hiper Limpio?"
          title="Una marca con identidad. Una oportunidad digital por desarrollar."
          highlight={['oportunidad', 'digital']}
          intro="Antes de proponer, observamos. Este es un diagnóstico visual de punto de partida para construir la presencia de Hiper Limpio en Instagram."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <DiagCard key={c.id} card={c} index={i} />
          ))}
        </div>
        <Reveal className="mt-8 flex items-start gap-3 rounded-2xl bg-sky/5 p-4 text-sm text-ink/70">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-intense" aria-hidden="true" />
          Diagnóstico preliminar, elaborado sin datos de ventas, reputación ni rendimiento de redes. Se validará junto a Tomás en la reunión inicial.
        </Reveal>
      </div>
    </section>
  );
}
