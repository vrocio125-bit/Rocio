import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ClipboardList, CheckCircle2, XCircle } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';

const process = [
  'Reunión y planificación.',
  'Definición de productos y objetivos.',
  'Desarrollo de guiones.',
  'Jornada de grabación.',
  'Edición de videos.',
  'Revisión y aprobación.',
  'Publicación.',
  'Análisis.',
];

const groups = [
  {
    title: 'Cómo trabajamos',
    icon: ClipboardList,
    tone: 'text-intense',
    items: [
      'Contratación mensual.',
      'Pago anticipado.',
      'Grabaciones coordinadas.',
      'Una ronda de ajustes por reel.',
      'Reels de hasta 60 segundos.',
      'Jornadas de grabación según el pack.',
      'El material se produce según el calendario acordado.',
    ],
  },
  {
    title: 'Cuentas y permisos',
    icon: CheckCircle2,
    tone: 'text-intense',
    items: [
      'Las cuentas y accesos son propiedad del cliente.',
      'La publicación requiere permisos autorizados.',
    ],
  },
  {
    title: 'Qué no incluye',
    icon: XCircle,
    tone: 'text-ink/60',
    items: [
      'No incluye publicidad paga.',
      'No incluye Meta Ads.',
      'No incluye diseño de publicaciones estáticas.',
      'No incluye atención de mensajes privados ni WhatsApp.',
      'No garantiza ventas ni seguidores.',
    ],
  },
];

function Accordion({ group, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = group.title.replace(/\s/g, '-');
  return (
    <div className="card overflow-hidden">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={id}
          className="flex w-full items-center justify-between gap-4 p-6 text-left"
        >
          <span className="flex items-center gap-3 font-display text-lg font-bold text-navy">
            <group.icon className={`h-5 w-5 ${group.tone}`} aria-hidden="true" /> {group.title}
          </span>
          <ChevronDown className={`h-5 w-5 text-navy transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-2 overflow-hidden px-6 pb-6"
          >
            {group.items.map((it) => (
              <li key={it} className="flex items-start gap-2.5 text-[15px] text-ink/80">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" aria-hidden="true" /> {it}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Metodologia() {
  return (
    <section id="metodologia" className="section bg-white">
      <div className="container-x">
        <SectionHeading
          number="11"
          eyebrow="Metodología de trabajo"
          title="Un proceso claro, de la idea al análisis."
          highlight={['proceso', 'claro,']}
          intro="Ocho pasos que se repiten cada mes, con instancias de aprobación de Tomás antes de publicar."
        />
        <ol className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {process.map((p, i) => (
            <Reveal as="li" key={p} delay={i * 0.06}>
              <motion.div whileHover={{ y: -4 }} className="group relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-sky/5 p-5 transition hover:border-sky">
                <span className="font-display text-4xl font-extrabold text-sky/30 transition group-hover:text-sky">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-2 font-display font-semibold text-navy">{p}</p>
              </motion.div>
            </Reveal>
          ))}
        </ol>
        <div className="mt-14">
          <Reveal>
            <h3 className="text-2xl font-bold text-navy">Condiciones</h3>
          </Reveal>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {groups.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.08}>
                <Accordion group={g} defaultOpen={i !== 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
