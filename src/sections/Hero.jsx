import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown, MapPin, Play, Sparkles } from 'lucide-react';
import { brand, images } from '../config/site.js';
import Logo from '../components/Logo.jsx';
import SmartImage from '../components/SmartImage.jsx';

const bubbles = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  size: 8 + ((i * 13) % 26),
  duration: 12 + ((i * 7) % 14),
  delay: (i * 1.7) % 12,
}));

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy pb-24 pt-28 text-white"
    >
      {/* Fondo: gradientes de agua y frescura */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(29,183,244,.45),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(8,117,196,.6),transparent_60%)]" />
        <div className="absolute -right-32 top-20 h-[28rem] w-[28rem] rounded-full bg-sky/20 blur-3xl" />
        {bubbles.map((b, i) => (
          <span
            key={i}
            className="absolute bottom-[-40px] animate-bubble rounded-full border border-white/40 bg-white/10"
            style={{ left: b.left, width: b.size, height: b.size, animationDuration: `${b.duration}s`, animationDelay: `${b.delay}s` }}
          />
        ))}
        <svg className="absolute bottom-0 left-0 h-24 w-[200%] animate-wave text-white" viewBox="0 0 2880 120" preserveAspectRatio="none">
          <path fill="currentColor" d="M0 60c240 40 480 40 720 0s480-40 720 0 480 40 720 0 480-40 720 0v60H0z" />
        </svg>
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div style={{ y: yText, opacity: fade }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 flex flex-wrap items-center gap-4">
            <Logo className="h-16 sm:h-20" />
            <span className="eyebrow bg-white/10 text-sky">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Propuesta Instagram
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Tu negocio ya tiene productos.{' '}
            <span className="text-gradient">Hagamos que más personas los descubran.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl"
          >
            Una propuesta estratégica para llevar {brand.name} a Instagram y convertir su presencia digital en una nueva oportunidad de crecimiento.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-4 max-w-xl text-white/65"
          >
            Contenido audiovisual, creatividad y estrategia para conectar con nuevos clientes en La Calera y alrededores.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a href="#diagnostico" className="btn-accent">
              Descubrir la estrategia <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#planes" className="btn-ghost">Ver propuesta de inversión</a>
          </motion.div>

          <p className="mt-8 flex items-center gap-2 text-sm text-white/60">
            <MapPin className="h-4 w-4 text-sky" aria-hidden="true" /> {brand.address}
          </p>
        </motion.div>

        {/* Composición visual */}
        <motion.div style={{ y: yImg }} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <SmartImage image={images.hero} eager className="aspect-[4/5] rounded-[2rem] shadow-glow ring-1 ring-white/20" />
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
          </motion.div>

          {/* Mini reel flotante */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="absolute -left-4 bottom-10 w-40 animate-float rounded-2xl bg-white/95 p-3 text-ink shadow-2xl sm:-left-10 sm:w-48"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky to-intense text-white">
                <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              </span>
              <div className="leading-tight">
                <p className="font-display text-xs font-bold text-navy">Reel 9:16</p>
                <p className="text-[11px] text-ink/60">Idea · Guion · Edición</p>
              </div>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-sky to-intense"
                initial={{ width: '5%' }}
                animate={{ width: ['5%', '100%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="absolute -right-2 top-8 rounded-2xl bg-accent px-4 py-3 font-display text-sm font-bold text-navy shadow-xl sm:-right-6"
          >
            {brand.slogan}
          </motion.div>
        </motion.div>
      </div>

      <a
        href="#diagnostico"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-medium uppercase tracking-widest text-white/70 hover:text-white"
        aria-label="Desplazarse a la siguiente sección"
      >
        <span className="hidden sm:block">Scroll</span>
        <motion.span animate={reduce ? {} : { y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDown className="h-6 w-6" aria-hidden="true" />
        </motion.span>
      </a>
    </section>
  );
}
