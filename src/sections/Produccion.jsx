import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Lightbulb, FileText, Video, Scissors, Send, BarChart3, Film, Music2, Type, Captions, Pause, Play,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import SmartImage from '../components/SmartImage.jsx';
import { images } from '../config/site.js';

const steps = [
  { key: 'idea', label: 'Idea', icon: Lightbulb, text: 'Definimos qué producto, qué mensaje y para quién.' },
  { key: 'guion', label: 'Guion', icon: FileText, text: 'Estructura, gancho inicial y llamado a la acción.' },
  { key: 'grab', label: 'Grabación', icon: Video, text: 'Jornada en el local, vertical 9:16, dirigiendo a Tomás.' },
  { key: 'edic', label: 'Edición', icon: Scissors, text: 'Montaje, color, audio, subtítulos y gráficos.' },
  { key: 'pub', label: 'Publicación', icon: Send, text: 'Copy, portada, programación en el mejor horario.' },
  { key: 'anal', label: 'Análisis', icon: BarChart3, text: 'Leemos los indicadores y ajustamos el próximo reel.' },
];

const produccion = [
  'Planificación creativa', 'Guiones', 'Dirección frente a cámara', 'Grabación vertical 9:16',
  'Tomas de productos', 'Demostraciones', 'Tomas del local',
];
const edicion = [
  'Selección de tomas', 'Montaje dinámico', 'Corrección básica de color e iluminación', 'Limpieza básica de audio',
  'Música y efectos de sonido', 'Subtítulos dinámicos', 'Títulos y elementos gráficos', 'Transiciones',
  'Portadas personalizadas', 'Exportación en alta calidad',
];

function Pipeline() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => setActive((a) => (a + 1) % steps.length), 2600);
    return () => clearInterval(t);
  }, [paused, reduce]);

  return (
    <div className="mt-14">
      <div className="relative">
        <div aria-hidden="true" className="absolute left-0 right-0 top-8 hidden h-1 rounded-full bg-white/10 md:block">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-sky to-accent"
            animate={{ width: `${(active / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <ol className="relative grid grid-cols-3 gap-4 md:grid-cols-6">
          {steps.map((s, i) => {
            const on = i === active;
            const done = i < active;
            return (
              <li key={s.key} className="flex flex-col items-center text-center">
                <button
                  type="button"
                  onClick={() => { setActive(i); setPaused(true); }}
                  aria-pressed={on}
                  aria-label={`Paso ${i + 1}: ${s.label}`}
                  className={`relative flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 ${
                    on ? 'scale-110 bg-accent text-navy shadow-[0_0_0_8px_rgba(255,224,0,.15)]' : done ? 'bg-sky text-navy' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <s.icon className="h-7 w-7" aria-hidden="true" />
                </button>
                <span className={`mt-3 font-display text-sm font-semibold ${on ? 'text-accent' : 'text-white/80'}`}>{s.label}</span>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="mt-8 flex flex-col items-center gap-3">
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-xl text-center text-lg text-white/85"
            aria-live="polite"
          >
            <strong className="text-white">{steps[active].label}:</strong> {steps[active].text}
          </motion.p>
        </AnimatePresence>
        <button type="button" onClick={() => setPaused((p) => !p)} className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white">
          {paused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
          {paused ? 'Reanudar secuencia' : 'Pausar secuencia'}
        </button>
      </div>
    </div>
  );
}

// Representación visual de un timeline de edición. Es un esquema ilustrativo,
// no un trabajo real realizado.
function EditorMock() {
  const reduce = useReducedMotion();
  const tracks = [
    { icon: Film, label: 'Video', clips: [[0, 18, 'from-intense to-navy'], [19, 14, 'from-sky to-intense'], [34, 22, 'from-intense to-navy'], [57, 16, 'from-sky to-intense'], [74, 26, 'from-intense to-navy']] },
    { icon: Type, label: 'Títulos', clips: [[2, 14, 'from-accent to-yellow-300'], [40, 12, 'from-accent to-yellow-300'], [78, 18, 'from-accent to-yellow-300']] },
    { icon: Captions, label: 'Subtítulos', clips: [[0, 30, 'from-white/70 to-white/40'], [31, 34, 'from-white/70 to-white/40'], [66, 34, 'from-white/70 to-white/40']] },
  ];
  const wave = Array.from({ length: 80 }, (_, i) => 20 + Math.abs(Math.sin(i * 0.7) * 60 + Math.cos(i * 1.9) * 20));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_240px]">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b1a2e] p-4 shadow-2xl sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <span className="h-3 w-3 rounded-full bg-green-400/80" />
          </div>
          <span className="text-[11px] font-medium uppercase tracking-widest text-white/50">Timeline de edición · esquema</span>
        </div>
        <div className="relative space-y-3">
          {/* regla */}
          <div className="ml-20 flex justify-between text-[10px] text-white/40" aria-hidden="true">
            {['00:00', '00:10', '00:20', '00:30', '00:40', '00:50', '01:00'].map((t) => <span key={t}>{t}</span>)}
          </div>
          {tracks.map((t) => (
            <div key={t.label} className="flex items-center gap-3">
              <span className="flex w-[68px] shrink-0 items-center gap-1.5 text-[11px] text-white/60">
                <t.icon className="h-3.5 w-3.5" aria-hidden="true" /> {t.label}
              </span>
              <div className="relative h-9 flex-1 rounded-lg bg-white/5">
                {t.clips.map(([l, w, g], i) => (
                  <motion.span
                    key={i}
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 * i, duration: 0.5 }}
                    className={`absolute inset-y-1 origin-left rounded-md bg-gradient-to-r ${g}`}
                    style={{ left: `${l}%`, width: `${w}%` }}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <span className="flex w-[68px] shrink-0 items-center gap-1.5 text-[11px] text-white/60">
              <Music2 className="h-3.5 w-3.5" aria-hidden="true" /> Audio
            </span>
            <div className="flex h-12 flex-1 items-center gap-[2px] rounded-lg bg-white/5 px-1" aria-hidden="true">
              {wave.map((h, i) => (
                <motion.span
                  key={i}
                  className="flex-1 rounded-full bg-sky/70"
                  initial={{ height: '10%' }}
                  whileInView={{ height: `${Math.min(h, 95)}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.008 }}
                />
              ))}
            </div>
          </div>
          {/* cabezal de reproducción */}
          <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-20 right-0 top-5">
            <motion.div
              className="absolute inset-y-0 w-0.5 bg-accent shadow-[0_0_12px_#FFE000]"
              initial={{ left: '0%' }}
              animate={reduce ? { left: '35%' } : { left: ['0%', '100%'] }}
              transition={{ duration: 8, repeat: reduce ? 0 : Infinity, ease: 'linear' }}
            />
          </div>
        </div>
      </div>

      {/* Vista previa de reel */}
      <div className="mx-auto w-full max-w-[240px]">
        <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] border-[6px] border-[#0b1a2e] bg-navy shadow-2xl">
          <SmartImage image={images.recording} badge={false} className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
          <div className="absolute left-3 right-3 top-4 h-1 overflow-hidden rounded-full bg-white/30">
            <motion.div className="h-full bg-white" animate={reduce ? {} : { width: ['0%', '100%'] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} />
          </div>
          <div className="absolute inset-x-3 bottom-16 text-center">
            <span className="rounded-md bg-accent px-2 py-1 font-display text-sm font-extrabold text-navy">SUBTÍTULO DINÁMICO</span>
          </div>
          <p className="absolute inset-x-3 bottom-4 text-[11px] text-white/80">Vista previa de reel · ejemplo ilustrativo</p>
        </div>
      </div>
    </div>
  );
}

function ListCard({ title, items, icon: Icon, delay }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
        <div className="flex items-center gap-3">
          <Icon className="h-6 w-6 text-sky" aria-hidden="true" />
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {items.map((it) => (
            <li key={it} className="flex items-start gap-2 text-sm text-white/80">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" /> {it}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export default function Produccion() {
  return (
    <section id="produccion" className="section overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(8,117,196,.45),transparent_45%),radial-gradient(circle_at_90%_100%,rgba(29,183,244,.25),transparent_45%)]" />
      <div className="container-x relative">
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <SectionHeading
            dark
            number="06"
            eyebrow="Producción y edición profesional"
            title="Cada reel tiene una estrategia detrás."
            highlight={['estrategia']}
            intro="Lo que se ve en 30 segundos lleva planificación, dirección y horas de edición. Este es el recorrido de cada video."
          />
          <Reveal from="right" className="hidden lg:block">
            <SmartImage image={images.editing} className="aspect-video rounded-3xl ring-1 ring-white/10" />
          </Reveal>
        </div>

        <Pipeline />

        <div className="mt-20">
          <EditorMock />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <ListCard title="Producción" items={produccion} icon={Video} />
          <ListCard title="Edición profesional" items={edicion} icon={Scissors} delay={0.1} />
        </div>
      </div>
    </section>
  );
}
