import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Rocket, TrendingUp, Gauge, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';

const months = [
  {
    n: 'Mes 1', title: 'Creación y lanzamiento', icon: Rocket, days: 'Días 1–30',
    items: [
      'Creación de Instagram profesional.',
      'Configuración de perfil, biografía y contacto.',
      'Vinculación con Facebook y WhatsApp cuando corresponda.',
      'Definición de identidad visual.',
      'Planificación de los primeros reels.',
      'Primera jornada de grabación.',
      'Lanzamiento del contenido.',
      'Establecimiento de métricas iniciales.',
    ],
  },
  {
    n: 'Mes 2', title: 'Desarrollo', icon: TrendingUp, days: 'Días 31–60',
    items: [
      'Producción sostenida.',
      'Reels demostrativos y comerciales.',
      'Prueba de formatos.',
      'Análisis de alcance y retención.',
      'Ajustes estratégicos.',
    ],
  },
  {
    n: 'Mes 3', title: 'Optimización', icon: Gauge, days: 'Días 61–90',
    items: [
      'Identificación de contenidos destacados.',
      'Optimización de guiones.',
      'Mejora de llamados a la acción.',
      'Seguimiento de consultas.',
      'Planificación del trimestre siguiente.',
    ],
  },
];

export default function Plan90() {
  const [active, setActive] = useState(0);
  const m = months[active];

  const onKey = (e) => {
    if (e.key === 'ArrowRight') setActive((a) => (a + 1) % months.length);
    if (e.key === 'ArrowLeft') setActive((a) => (a - 1 + months.length) % months.length);
  };

  return (
    <section id="plan-90" className="section bg-white">
      <div className="container-x">
        <SectionHeading
          number="08"
          eyebrow="Plan de los primeros 90 días"
          title="Un trimestre para construir, aprender y optimizar."
          highlight={['construir,', 'aprender', 'optimizar']}
          intro="Tocá cada mes para ver en detalle qué hacemos. Los resultados se evalúan con los datos reales de la cuenta a medida que se generan."
        />

        <Reveal className="mt-14">
          <div role="tablist" aria-label="Meses del plan" onKeyDown={onKey} className="relative grid grid-cols-3 gap-2 rounded-3xl bg-slate-100 p-2">
            {months.map((mo, i) => (
              <button
                key={mo.n}
                role="tab"
                id={`tab-m${i}`}
                aria-selected={active === i}
                aria-controls={`panel-m${i}`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                className={`relative z-10 flex flex-col items-center gap-1 rounded-2xl px-2 py-4 text-center transition sm:flex-row sm:justify-center sm:gap-3 ${
                  active === i ? 'text-white' : 'text-ink/70 hover:text-navy'
                }`}
              >
                {active === i && <motion.span layoutId="month-pill" className="absolute inset-0 -z-10 rounded-2xl bg-navy shadow-card" />}
                <mo.icon className={`h-5 w-5 ${active === i ? 'text-accent' : ''}`} aria-hidden="true" />
                <span className="font-display text-sm font-bold sm:text-base">{mo.n}</span>
                <span className="hidden text-sm opacity-80 md:inline">· {mo.title}</span>
              </button>
            ))}
          </div>
          <div className="mx-4 mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-sky to-intense" animate={{ width: `${((active + 1) / 3) * 100}%` }} />
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            role="tabpanel"
            id={`panel-m${active}`}
            aria-labelledby={`tab-m${active}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="mt-8 grid gap-8 rounded-[2rem] bg-gradient-to-br from-sky/10 via-white to-white p-8 ring-1 ring-sky/20 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-intense">{m.days}</p>
              <h3 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">{m.title}</h3>
              <p className="mt-4 text-ink/70">
                {active === 0 && 'Partimos de cero: dejamos la cuenta lista, definimos la línea visual y salimos con los primeros reels.'}
                {active === 1 && 'Con la cuenta en marcha, sostenemos la producción y probamos formatos para aprender qué funciona.'}
                {active === 2 && 'Con datos de dos meses, potenciamos lo que mejor funciona y planificamos el siguiente trimestre.'}
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {m.items.map((it, i) => (
                <motion.li
                  key={it}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-intense" aria-hidden="true" />
                  <span className="text-[15px] text-ink/80">{it}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
