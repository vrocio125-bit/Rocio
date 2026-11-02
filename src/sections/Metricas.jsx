import { motion } from 'framer-motion';
import { Radar, PlayCircle, Timer, Heart, UserPlus, MousePointerClick, MessageSquare, Info } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';

// Dashboard ILUSTRATIVO: los trazos son formas de ejemplo para mostrar
// qué se va a monitorear. No contienen ni simulan métricas de Hiper Limpio.
const kpis = [
  { icon: Radar, name: 'Alcance', desc: 'Cuántas cuentas distintas ven el contenido.', shape: [3, 4, 3, 5, 6, 5, 7, 8] },
  { icon: PlayCircle, name: 'Reproducciones', desc: 'Cantidad de veces que se reproducen los reels.', shape: [2, 3, 5, 4, 6, 7, 6, 8] },
  { icon: Timer, name: 'Retención', desc: 'Cuánto tiempo del reel mira la audiencia.', shape: [8, 7, 6, 6, 5, 5, 4, 4], kind: 'curve' },
  { icon: Heart, name: 'Interacciones', desc: 'Me gusta, comentarios, guardados y compartidos.', shape: [2, 4, 3, 5, 4, 6, 7, 6] },
  { icon: UserPlus, name: 'Nuevos seguidores', desc: 'Personas que eligen seguir la cuenta.', shape: [1, 2, 2, 3, 4, 4, 5, 6] },
  { icon: MousePointerClick, name: 'Visitas al perfil', desc: 'Quiénes entran a conocer más de Hiper Limpio.', shape: [3, 3, 4, 5, 4, 6, 6, 7] },
  { icon: MessageSquare, name: 'Consultas atribuibles', desc: 'Consultas originadas en Instagram, cuando puedan medirse.', shape: [1, 2, 1, 3, 2, 3, 4, 4] },
];

function Spark({ shape, kind }) {
  const w = 160, h = 48, max = 9;
  const pts = shape.map((v, i) => [(i / (shape.length - 1)) * w, h - (v / max) * h]);
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  if (kind !== 'curve') {
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="h-12 w-full" aria-hidden="true">
        {shape.map((v, i) => (
          <motion.rect
            key={i}
            x={i * (w / shape.length) + 3}
            width={w / shape.length - 6}
            rx="3"
            initial={{ height: 0, y: h }}
            whileInView={{ height: (v / max) * h, y: h - (v / max) * h }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className={i === shape.length - 1 ? 'fill-sky' : 'fill-sky/35'}
          />
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-12 w-full" aria-hidden="true">
      <motion.path d={d} fill="none" stroke="#1DB7F4" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
    </svg>
  );
}

export default function Metricas() {
  return (
    <section id="metricas" className="section overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(29,183,244,.3),transparent_45%)]" />
      <div className="container-x relative">
        <SectionHeading
          dark
          number="10"
          eyebrow="Resultados que vamos a medir"
          title="Cada contenido nos aporta información para mejorar."
          highlight={['información', 'mejorar']}
          intro="Cada mes revisamos estos indicadores para decidir qué repetir, qué ajustar y qué probar."
        />

        <Reveal className="mt-14 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
              <p className="font-display font-semibold">Panel de seguimiento mensual</p>
            </div>
            <span className="rounded-full bg-accent/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-accent">
              Ejemplo ilustrativo · sin datos reales
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((k, i) => (
              <motion.div
                key={k.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className={`rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-sky/50 hover:bg-white/10 ${i === 0 ? 'lg:col-span-2' : ''}`}
              >
                <div className="flex items-center gap-2">
                  <k.icon className="h-5 w-5 text-sky" aria-hidden="true" />
                  <h3 className="font-display text-base font-semibold">{k.name}</h3>
                </div>
                <p className="mt-1 min-h-[2.5rem] text-sm text-white/65">{k.desc}</p>
                <div className="mt-3">
                  <Spark shape={k.shape} kind={k.kind} />
                </div>
                <p className="mt-2 text-[11px] uppercase tracking-wider text-white/40">Valor: se completa con datos reales</p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <p className="mt-6 flex items-start gap-2 text-sm text-white/60">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          Los gráficos son ejemplos de los indicadores a monitorear. No representan métricas actuales ni proyecciones de Hiper Limpio.
        </p>
      </div>
    </section>
  );
}
