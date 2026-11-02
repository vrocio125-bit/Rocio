import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Eye, HeartHandshake, MessageCircle, MapPinned, AlertCircle } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';

const stages = [
  { n: '01', title: 'Visibilidad', icon: Eye, text: 'Presentar Hiper Limpio en Instagram y dar a conocer sus productos.' },
  { n: '02', title: 'Confianza', icon: HeartHandshake, text: 'Mostrar demostraciones reales, consejos y al propio Tomás.' },
  { n: '03', title: 'Conexión comercial', icon: MessageCircle, text: 'Generar interés, visitas al perfil y consultas por WhatsApp.' },
  {
    n: '04',
    title: 'Expansión',
    icon: MapPinned,
    text: 'Evaluar la captación de potenciales clientes en la zona:',
    places: ['La Calera', 'Saldán', 'Dumesnil', 'Villa Allende', 'Barrios y countries cercanos'],
  },
];

export default function Crecimiento() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const line = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="crecimiento" className="section relative overflow-hidden bg-gradient-to-br from-navy via-[#0a4a9e] to-intense text-white">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(29,183,244,.35),transparent_40%)]" />
      <div className="container-x relative">
        <SectionHeading
          dark
          number="04"
          eyebrow="Potencial de crecimiento"
          title="De un comercio local a una marca reconocida en la zona."
          highlight={['marca', 'reconocida']}
          intro="Un camino en cuatro etapas, donde cada una prepara el terreno para la siguiente."
        />

        <div ref={ref} className="relative mt-16">
          {/* Línea animada: vertical en móvil, horizontal en escritorio */}
          <div aria-hidden="true" className="absolute left-6 top-0 h-full w-1 rounded-full bg-white/10 lg:left-0 lg:top-7 lg:h-1 lg:w-full">
            <motion.div style={{ height: line }} className="w-full rounded-full bg-gradient-to-b from-sky to-accent lg:hidden" />
            <motion.div style={{ width: line }} className="hidden h-full rounded-full bg-gradient-to-r from-sky to-accent lg:block" />
          </div>

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {stages.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.15} className="relative pl-20 lg:pl-0 lg:pt-20">
                <span className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-navy shadow-glow">
                  <s.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur transition hover:bg-white/10">
                  <p className="font-display text-sm font-bold text-accent">ETAPA {s.n}</p>
                  <h3 className="mt-1 text-2xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-white/75">{s.text}</p>
                  {s.places && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {s.places.map((p) => (
                        <li key={p} className="rounded-full bg-sky/20 px-3 py-1 text-xs font-semibold text-white">{p}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mt-12 flex items-start gap-3 rounded-2xl border border-white/15 bg-white/5 p-5 text-sm text-white/80">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
          La expansión a otras localidades dependerá de la capacidad comercial y logística del negocio. Esta hoja de ruta describe una dirección de trabajo, no resultados garantizados.
        </Reveal>
      </div>
    </section>
  );
}
