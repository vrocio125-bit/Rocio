import { useState } from 'react';
import { motion } from 'framer-motion';
import { Store, ShoppingCart, Globe2, Quote, Info } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';

const categories = [
  {
    icon: Store,
    title: 'Comercios especializados en limpieza en La Calera',
    text: 'Negocios del mismo rubro que compiten por la cercanía y la confianza del cliente del barrio.',
    refs: ['LimpeCord, La Calera'],
  },
  {
    icon: ShoppingCart,
    title: 'Supermercados y comercios con productos similares',
    text: 'Opciones de compra rápida donde los productos de limpieza son una góndola más entre muchas.',
    refs: ['Klor Piletas (competidor parcial por rubro)'],
  },
  {
    icon: Globe2,
    title: 'Empresas del rubro con canales digitales',
    text: 'Marcas que ya usan Instagram, Facebook y otros canales para mostrarse y generar consultas.',
    refs: ['Limpieza Córdoba (referencia provincial de desarrollo digital)'],
  },
];

// Ejes conceptuales del gráfico. NO son mediciones reales de competidores:
// ilustran en qué dimensiones trabaja la estrategia propuesta.
const axes = ['Visibilidad digital', 'Contenido audiovisual', 'Cercanía con el cliente', 'Diferenciación de marca'];
const scenarios = {
  hoy: { label: 'Punto de partida', values: [0.25, 0.2, 0.75, 0.5], color: '#94a3b8' },
  meta: { label: 'Hacia dónde apuntamos', values: [0.8, 0.85, 0.9, 0.85], color: '#1DB7F4' },
};

function Radar() {
  const [view, setView] = useState('meta');
  const size = 320;
  const c = size / 2;
  const r = c - 50;
  const pt = (i, v) => {
    const a = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
    return [c + Math.cos(a) * r * v, c + Math.sin(a) * r * v];
  };
  const poly = (vals) => vals.map((v, i) => pt(i, v).join(',')).join(' ');

  return (
    <div className="card p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-navy">Gráfico conceptual de diferenciación</h3>
        <div role="tablist" aria-label="Escenario del gráfico" className="flex rounded-full bg-slate-100 p-1 text-xs font-semibold">
          {Object.entries(scenarios).map(([k, s]) => (
            <button
              key={k}
              role="tab"
              aria-selected={view === k}
              onClick={() => setView(k)}
              className={`rounded-full px-3 py-1.5 transition ${view === k ? 'bg-navy text-white' : 'text-ink/70 hover:text-navy'}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto mt-4 w-full max-w-sm" role="img" aria-label="Gráfico radar conceptual con cuatro ejes: visibilidad digital, contenido audiovisual, cercanía con el cliente y diferenciación de marca. No representa mediciones reales.">
        {[0.25, 0.5, 0.75, 1].map((s) => (
          <polygon key={s} points={poly(axes.map(() => s))} fill="none" stroke="#e2e8f0" />
        ))}
        {axes.map((_, i) => {
          const [x, y] = pt(i, 1);
          return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="#e2e8f0" />;
        })}
        <motion.polygon
          key={view}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: `${c}px ${c}px` }}
          points={poly(scenarios[view].values)}
          fill={scenarios[view].color}
          fillOpacity="0.28"
          stroke={scenarios[view].color}
          strokeWidth="2.5"
        />
        {axes.map((a, i) => {
          const [x, y] = pt(i, 1.2);
          return (
            <text key={a} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="fill-navy font-display text-[10px] font-semibold uppercase">
              {a.split(' ').slice(0, 2).join(' ')}
              {a.split(' ').length > 2 && <tspan x={x} dy="12">{a.split(' ').slice(2).join(' ')}</tspan>}
            </text>
          );
        })}
      </svg>
      <p className="mt-2 flex items-start gap-2 text-xs text-ink/60">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        Representación conceptual de los ejes de trabajo. No es una medición de Hiper Limpio ni de sus competidores.
      </p>
    </div>
  );
}

export default function Competencia() {
  return (
    <section id="competencia" className="section overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <div className="container-x">
        <SectionHeading
          number="03"
          eyebrow="Análisis de competencia"
          title="El mercado está en movimiento. La oportunidad es diferenciarse."
          highlight={['diferenciarse']}
          intro="Hiper Limpio compite por la atención de consumidores que pueden elegir entre comercios especializados, supermercados y proveedores de productos de limpieza. Ganar esa atención empieza por ser visible y recordable."
        />
        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="space-y-5">
            {categories.map((c, i) => (
              <Reveal key={c.title} from="left" delay={i * 0.1}>
                <motion.article whileHover={{ x: 6 }} className="card flex gap-5 p-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky to-intense text-white shadow-glow">
                    <c.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-intense">Categoría 0{i + 1}</p>
                    <h3 className="mt-1 text-lg font-bold leading-snug text-navy">{c.title}</h3>
                    <p className="mt-2 text-[15px] text-ink/70">{c.text}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {c.refs.map((r) => (
                        <span key={r} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-ink/70">
                          Ref.: {r} · <em className="not-italic text-ink/50">a validar</em>
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
          <Reveal from="right">
            <Radar />
          </Reveal>
        </div>

        <Reveal className="relative mt-16 overflow-hidden rounded-[2rem] bg-navy p-8 text-white sm:p-12">
          <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky/30 blur-3xl" />
          <Quote className="h-10 w-10 text-accent" aria-hidden="true" />
          <p className="relative mt-4 max-w-4xl font-display text-2xl font-bold leading-snug sm:text-3xl">
            No se trata solamente de vender productos de limpieza. Se trata de lograr que las personas{' '}
            <span className="text-sky">conozcan, recuerden y elijan</span> Hiper Limpio.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
