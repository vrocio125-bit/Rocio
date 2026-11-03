import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Minus, Star, Gift, Film, CalendarDays, ArrowRight, LayoutGrid, Table2, ChevronDown } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import { plans, comparison, launchBenefit, formatARS } from '../config/site.js';
import { usePlan } from '../context/PlanContext.jsx';

function PlanCard({ plan, index }) {
  const { selectedId, choosePlan } = usePlan();
  const [expanded, setExpanded] = useState(false);
  const isSelected = selectedId === plan.id;
  const rec = plan.recommended;
  const visible = expanded ? plan.includes : plan.includes.slice(0, 6);
  const perDay = Math.floor(plan.price / 30);

  return (
    <Reveal delay={index * 0.12} className="h-full">
      <motion.article
        whileHover={{ y: -10 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8 ${
          rec ? 'bg-navy text-white shadow-glow ring-2 ring-sky lg:-my-4 lg:py-12' : 'card'
        } ${isSelected ? 'outline outline-4 outline-offset-4 outline-accent' : ''}`}
        aria-label={`Pack ${plan.number} ${plan.name}${rec ? ', recomendado' : ''}`}
      >
        {rec && (
          <>
            <div aria-hidden="true" className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-sky/30 blur-3xl" />
            <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-navy">
              <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" /> Recomendado
            </span>
          </>
        )}
        <p className={`relative font-display text-sm font-bold ${rec ? 'text-sky' : 'text-intense'}`}>PACK {plan.number}</p>
        <h3 className={`relative mt-1 text-3xl font-extrabold ${rec ? '' : 'text-navy'}`}>{plan.name}</h3>
        <p className={`relative mt-3 min-h-[3rem] text-[15px] ${rec ? 'text-white/75' : 'text-ink/70'}`}>{plan.tagline}</p>

        <div className="relative mt-6">
          <p className={`font-display text-4xl font-extrabold tracking-tight sm:text-5xl ${rec ? 'text-white' : 'text-navy'}`}>
            {formatARS(plan.price)}
          </p>
          <p className={`mt-1 text-sm ${rec ? 'text-white/60' : 'text-ink/60'}`}>ARS mensuales · equivale a {formatARS(perDay)} por día</p>
        </div>

        <div className="relative mt-6 grid grid-cols-2 gap-3">
          <div className={`rounded-2xl p-3 ${rec ? 'bg-white/10' : 'bg-sky/10'}`}>
            <Film className={`h-5 w-5 ${rec ? 'text-sky' : 'text-intense'}`} aria-hidden="true" />
            <p className="mt-1 font-display text-2xl font-extrabold">{plan.reels}</p>
            <p className={`text-xs ${rec ? 'text-white/70' : 'text-ink/60'}`}>reels / mes</p>
          </div>
          <div className={`rounded-2xl p-3 ${rec ? 'bg-white/10' : 'bg-sky/10'}`}>
            <CalendarDays className={`h-5 w-5 ${rec ? 'text-sky' : 'text-intense'}`} aria-hidden="true" />
            <p className="mt-1 font-display text-2xl font-extrabold">{plan.sessions}</p>
            <p className={`text-xs ${rec ? 'text-white/70' : 'text-ink/60'}`}>{plan.sessions === 1 ? 'jornada' : 'jornadas'} de hasta {plan.sessionHours} h</p>
          </div>
        </div>

        <p className={`relative mt-6 rounded-2xl border-l-4 border-accent px-4 py-3 text-sm font-semibold ${rec ? 'bg-white/5' : 'bg-accent/10 text-navy'}`}>
          {plan.mainBenefit}
        </p>

        <ul className="relative mt-6 flex-1 space-y-2.5">
          {visible.map((it) => (
            <li key={it} className="flex items-start gap-2.5 text-[15px]">
              <Check className={`mt-0.5 h-4 w-4 shrink-0 ${rec ? 'text-accent' : 'text-intense'}`} strokeWidth={3} aria-hidden="true" />
              <span className={rec ? 'text-white/90' : 'text-ink/80'}>{it}</span>
            </li>
          ))}
          <li className="flex items-start gap-2.5 text-[15px]">
            <Gift className={`mt-0.5 h-4 w-4 shrink-0 ${rec ? 'text-accent' : 'text-intense'}`} aria-hidden="true" />
            <span className={`font-semibold ${rec ? 'text-white' : 'text-navy'}`}>Creación de Instagram desde cero (1er mes)</span>
          </li>
        </ul>
        {plan.includes.length > 6 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className={`relative mt-3 inline-flex items-center gap-1 self-start text-sm font-semibold ${rec ? 'text-sky' : 'text-intense'}`}
          >
            {expanded ? 'Ver menos' : `Ver los ${plan.includes.length} entregables`}
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
        )}

        <button
          type="button"
          onClick={() => choosePlan(plan.id)}
          className={`relative mt-8 w-full ${rec ? 'btn-accent' : 'btn-navy'}`}
        >
          {isSelected ? 'Plan seleccionado · continuar' : 'Elegir este plan'}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </motion.article>
    </Reveal>
  );
}

function Cell({ v, rec }) {
  if (v === true) return <Check className={`mx-auto h-5 w-5 ${rec ? 'text-navy' : 'text-intense'}`} strokeWidth={3} aria-label="Incluido" />;
  if (v === false) return <Minus className="mx-auto h-5 w-5 text-slate-300" aria-label="No incluido" />;
  return <span className="font-semibold text-navy">{v}</span>;
}

function Comparator() {
  const { selectedId, setSelectedId, choosePlan } = usePlan();
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <caption className="sr-only">Comparador de packs de inversión</caption>
          <thead>
            <tr>
              <th scope="col" className="w-2/5 bg-slate-50 p-5 text-left font-display text-base text-navy">Qué incluye</th>
              {plans.map((p) => (
                <th key={p.id} scope="col" className={`p-5 text-center ${p.recommended ? 'bg-sky/15' : 'bg-slate-50'}`}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(p.id)}
                    aria-pressed={selectedId === p.id}
                    className={`w-full rounded-2xl p-2 transition ${selectedId === p.id ? 'bg-navy text-white' : 'hover:bg-white'}`}
                  >
                    <span className="block font-display text-xs font-bold uppercase tracking-wider opacity-70">Pack {p.number}</span>
                    <span className="block font-display text-lg font-extrabold">{p.name}</span>
                    <span className="block text-sm font-semibold">{formatARS(p.price)}</span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.map((row, i) => (
              <tr key={row.label} className={i % 2 ? 'bg-slate-50/50' : ''}>
                <th scope="row" className="p-4 text-left font-medium text-ink/80">{row.label}</th>
                {plans.map((p) => (
                  <td key={p.id} className={`p-4 text-center ${p.recommended ? 'bg-sky/10' : ''} ${selectedId === p.id ? 'ring-2 ring-inset ring-accent' : ''}`}>
                    <Cell v={row.values[p.id]} rec={p.recommended} />
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="p-4" />
              {plans.map((p) => (
                <td key={p.id} className={`p-4 text-center ${p.recommended ? 'bg-sky/10' : ''}`}>
                  <button type="button" onClick={() => choosePlan(p.id)} className={`${p.recommended ? 'btn-accent' : 'btn-navy'} !px-4 !py-2.5 !text-sm`}>
                    Elegir este plan
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Planes() {
  const [view, setView] = useState('cards');
  return (
    <section id="planes" className="section overflow-hidden bg-gradient-to-b from-sky/10 via-white to-white">
      <div className="container-x">
        <SectionHeading
          center
          number="09"
          eyebrow="Planes de inversión"
          title="Tres alternativas. Un mismo objetivo: hacer crecer la presencia digital de Hiper Limpio."
          highlight={['crecer', 'presencia', 'digital']}
        />

        <Reveal className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4 rounded-3xl bg-navy p-6 text-center text-white shadow-glow sm:flex-row sm:text-left">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-navy">
            <Gift className="h-7 w-7" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-widest text-sky">{launchBenefit.title}</p>
            <p className="font-display text-lg font-bold">“{launchBenefit.text}”</p>
            <p className="mt-1 text-sm text-white/70">{launchBenefit.note}</p>
          </div>
        </Reveal>

        <div className="mt-10 flex justify-center">
          <div role="tablist" aria-label="Vista de planes" className="inline-flex rounded-full bg-slate-100 p-1 text-sm font-semibold">
            {[
              { k: 'cards', label: 'Tarjetas', icon: LayoutGrid },
              { k: 'compare', label: 'Comparar planes', icon: Table2 },
            ].map((t) => (
              <button
                key={t.k}
                role="tab"
                aria-selected={view === t.k}
                onClick={() => setView(t.k)}
                className={`relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 transition ${view === t.k ? 'text-white' : 'text-ink/70 hover:text-navy'}`}
              >
                {view === t.k && <motion.span layoutId="plan-view" className="absolute inset-0 -z-0 rounded-full bg-navy" />}
                <t.icon className="relative h-4 w-4" aria-hidden="true" />
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'cards' ? (
            <motion.div key="cards" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-12 grid items-stretch gap-8 lg:grid-cols-3">
              {plans.map((p, i) => <PlanCard key={p.id} plan={p} index={i} />)}
            </motion.div>
          ) : (
            <motion.div key="compare" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-12">
              <Comparator />
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-10 text-center text-sm text-ink/60">
          Valores en pesos argentinos, contratación mensual con pago anticipado. No incluye publicidad paga.
        </p>
      </div>
    </section>
  );
}
