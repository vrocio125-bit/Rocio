import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Check, ArrowRight, Copy } from 'lucide-react';
import { plans, formatARS, contact } from '../config/site.js';
import { usePlan } from '../context/PlanContext.jsx';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '../components/whatsapp.js';
import Logo from '../components/Logo.jsx';
import AnimatedText from '../components/AnimatedText.jsx';
import Reveal from '../components/Reveal.jsx';

export default function Cierre() {
  const { selectedId, selectedPlan, setSelectedId } = usePlan();
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);
  const url = buildWhatsAppUrl(selectedPlan, name.trim());
  const message = buildWhatsAppMessage(selectedPlan, name.trim());

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* portapapeles no disponible */
    }
  };

  return (
    <section id="contacto" className="relative isolate overflow-hidden bg-navy py-24 text-white sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(29,183,244,.45),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(8,117,196,.7),transparent_60%)]" />
        <motion.div
          className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-sky/25 blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container-x">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal className="flex justify-center"><Logo kind="full" className="h-28 sm:h-40" /></Reveal>
          <AnimatedText
            as="h2"
            text="Tomás, es momento de que Hiper Limpio también tenga su lugar en Instagram."
            highlight={['Instagram']}
            className="mt-8 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl [&_.hl]:text-sky"
          />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
              Construyamos desde cero una presencia digital que muestre tus productos, conecte con tus clientes y abra nuevas oportunidades para tu negocio.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mx-auto mt-14 max-w-3xl rounded-[2rem] border border-white/15 bg-white/[0.06] p-6 backdrop-blur-md sm:p-8">
          <fieldset>
            <legend className="font-display text-sm font-semibold uppercase tracking-widest text-sky">Plan elegido</legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {plans.map((p) => {
                const on = p.id === selectedId;
                return (
                  <label
                    key={p.id}
                    className={`relative cursor-pointer rounded-2xl border-2 p-4 transition ${
                      on ? 'border-accent bg-white text-navy' : 'border-white/15 hover:border-white/40'
                    }`}
                  >
                    <input type="radio" name="plan" value={p.id} checked={on} onChange={() => setSelectedId(p.id)} className="sr-only" />
                    {on && (
                      <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-navy">
                        <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                      </span>
                    )}
                    <span className={`block text-xs font-bold uppercase tracking-wider ${on ? 'text-intense' : 'text-white/60'}`}>
                      Pack {p.number}{p.recommended ? ' · Recomendado' : ''}
                    </span>
                    <span className="mt-1 block font-display text-xl font-extrabold">{p.name}</span>
                    <span className={`block text-sm ${on ? 'text-ink/70' : 'text-white/70'}`}>{formatARS(p.price)} / mes · {p.reels} reels</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-6">
            <label htmlFor="cta-name" className="text-sm font-medium text-white/80">Tu nombre (opcional)</label>
            <input
              id="cta-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej.: Tomás"
              autoComplete="given-name"
              className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-sky focus:outline-none"
            />
          </div>

          <details className="group mt-5 rounded-xl bg-black/20 p-4 text-sm">
            <summary className="cursor-pointer list-none font-medium text-white/80 marker:hidden">
              <span className="inline-flex items-center gap-2">
                <ArrowRight className="h-4 w-4 transition-transform group-open:rotate-90" aria-hidden="true" /> Ver mensaje que se enviará
              </span>
            </summary>
            <pre className="mt-3 whitespace-pre-wrap font-sans text-white/75">{message}</pre>
            <button type="button" onClick={copy} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-sky hover:text-white">
              <Copy className="h-3.5 w-3.5" aria-hidden="true" /> {copied ? '¡Copiado!' : 'Copiar mensaje'}
            </button>
          </details>

          <motion.a
            id="cta-whatsapp"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-accent mt-6 w-full !py-5 !text-lg"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Quiero comenzar con este plan
          </motion.a>
          <p className="mt-3 text-center text-xs text-white/55">
            Se abrirá WhatsApp con un mensaje prellenado para el Pack {selectedPlan.number} — {selectedPlan.name}.
            {!contact.whatsappNumber && ' Podrás elegir el contacto de destino.'}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
