import { motion } from 'framer-motion';
import { Check, UserRound, Clapperboard, Handshake } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';

const tomas = [
  'Crea sus imágenes promocionales.',
  'Publica contenido gráfico.',
  'Informa precios y promociones.',
  'Facilita productos para grabación.',
  'Participa frente a cámara.',
  'Atiende consultas y ventas.',
];
const nosotros = [
  'Creamos Instagram desde cero.',
  'Planificamos la estrategia audiovisual.',
  'Desarrollamos ideas y guiones.',
  'Dirigimos a Tomás durante las grabaciones.',
  'Grabamos en el local.',
  'Editamos profesionalmente cada video.',
  'Incorporamos subtítulos y elementos gráficos.',
  'Programamos y publicamos reels.',
  'Analizamos resultados.',
];

function Column({ title, subtitle, icon: Icon, items, dark, from }) {
  return (
    <Reveal from={from} className="h-full">
      <motion.div
        whileHover={{ y: -6 }}
        className={`relative h-full overflow-hidden rounded-[2rem] p-8 sm:p-10 ${dark ? 'bg-navy text-white shadow-glow' : 'card'}`}
      >
        {dark && <div aria-hidden="true" className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-sky/25 blur-3xl" />}
        <div className="relative flex items-center gap-4">
          <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${dark ? 'bg-sky text-navy' : 'bg-sky/10 text-intense'}`}>
            <Icon className="h-7 w-7" aria-hidden="true" />
          </span>
          <div>
            <h3 className={`text-2xl font-bold ${dark ? '' : 'text-navy'}`}>{title}</h3>
            <p className={`text-sm ${dark ? 'text-white/70' : 'text-ink/60'}`}>{subtitle}</p>
          </div>
        </div>
        <ul className="relative mt-8 space-y-3">
          {items.map((it, i) => (
            <motion.li
              key={it}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
              className="flex items-start gap-3"
            >
              <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${dark ? 'bg-accent text-navy' : 'bg-intense text-white'}`}>
                <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
              </span>
              <span className={dark ? 'text-white/90' : 'text-ink/80'}>{it}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </Reveal>
  );
}

export default function Propuesta() {
  return (
    <section id="propuesta" className="section bg-white">
      <div className="container-x">
        <SectionHeading
          number="05"
          eyebrow="Nuestra propuesta"
          title="Vos te ocupás de tu negocio. Nosotros hacemos que tus productos cobren vida en video."
          highlight={['cobren', 'vida', 'video']}
          intro="Un modelo colaborativo: Tomás sigue creando sus piezas gráficas y siendo la cara de la marca; nosotros sumamos la estrategia, la producción y la edición de reels. La profesional del servicio trabaja detrás de cámara."
        />
        <div className="relative mt-14 grid gap-6 lg:grid-cols-2">
          <Column title="Tomás" subtitle="La cara visible de Hiper Limpio" icon={UserRound} items={tomas} from="left" />
          <Column title="Nuestro servicio" subtitle="Estrategia, producción y edición" icon={Clapperboard} items={nosotros} dark from="right" />
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-navy shadow-xl ring-8 ring-white lg:flex">
            <Handshake className="h-7 w-7" />
          </div>
        </div>
      </div>
    </section>
  );
}
