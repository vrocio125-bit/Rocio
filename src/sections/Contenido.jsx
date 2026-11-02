import { motion } from 'framer-motion';
import { Sparkles, GraduationCap, Tag, UserRound, Play } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import SmartImage from '../components/SmartImage.jsx';
import { images } from '../config/site.js';

// Para incorporar un video real, completar `video` con la ruta del archivo
// (ej.: './videos/reel-demo.mp4'). Mientras esté vacío, se muestra la foto.
const types = [
  { key: 'demo', title: 'Reels demostrativos', icon: Sparkles, text: 'Productos en acción, antes y después, pruebas y resultados.', image: images.demo, video: '' },
  { key: 'edu', title: 'Reels educativos', icon: GraduationCap, text: 'Consejos de limpieza, recomendaciones y usos de productos.', image: images.tips, video: '' },
  { key: 'com', title: 'Reels comerciales', icon: Tag, text: 'Promociones, novedades, combos y artículos destacados.', image: images.promo, video: '' },
  { key: 'hum', title: 'Reels humanos', icon: UserRound, text: 'Tomás presentando productos, mostrando el local y compartiendo recomendaciones.', image: images.human, video: '' },
];

const titles = [
  '3 productos que te pueden facilitar la limpieza.',
  '¿Conocés este producto y para qué sirve?',
  'Te mostramos las novedades de Hiper Limpio.',
  'Tomás te recomienda…',
  'Encontrá todo para la limpieza de tu hogar en La Calera.',
];

export default function Contenido() {
  return (
    <section id="contenido" className="section bg-gradient-to-b from-white to-sky/5">
      <div className="container-x">
        <SectionHeading
          number="07"
          eyebrow="Ejemplos de contenido"
          title="Contenido que muestra, enseña y conecta."
          highlight={['muestra,', 'enseña', 'conecta']}
          intro="Cuatro líneas de contenido que se combinan en el calendario para que el perfil sea útil, cercano y comercial a la vez."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {types.map((t, i) => (
            <Reveal key={t.key} delay={i * 0.1} className="h-full">
              <motion.article whileHover={{ y: -8 }} className="group card flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[4/5] overflow-hidden">
                  {t.video ? (
                    <video src={t.video} className="h-full w-full object-cover" muted loop playsInline controls preload="metadata" />
                  ) : (
                    <SmartImage image={t.image} className="h-full w-full" imgClassName="transition-transform duration-700 group-hover:scale-110" />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
                  <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 text-intense shadow-lg">
                    <t.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  {!t.video && (
                    <span className="absolute right-4 top-4 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-navy">
                      Espacio para video
                    </span>
                  )}
                  <span className="pointer-events-none absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/25 text-white opacity-0 backdrop-blur transition group-hover:opacity-100" aria-hidden="true">
                    <Play className="h-6 w-6 fill-current" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold text-navy">{t.title}</h3>
                  <p className="mt-2 text-[15px] text-ink/70">{t.text}</p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-intense">Ideas de títulos para reels</p>
          <div className="relative mt-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-wave gap-4 py-2 hover:[animation-play-state:paused]" style={{ animationDuration: '40s' }}>
              {[...titles, ...titles].map((t, i) => (
                <span key={i} aria-hidden={i >= titles.length} className="whitespace-nowrap rounded-full border border-sky/30 bg-white px-5 py-3 font-display text-sm font-semibold text-navy shadow-sm">
                  “{t}”
                </span>
              ))}
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-ink/50">
            Los contenidos describen usos y recomendaciones generales; no se atribuirán propiedades técnicas o resultados a productos sin verificarlos.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
