import { motion } from 'framer-motion';

// Aparición de títulos palabra por palabra (legible y rápida).
export default function AnimatedText({ text, as = 'h2', className = '', highlight = [] }) {
  const Comp = motion[as];
  const words = text.split(' ');
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ staggerChildren: 0.045 }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className={`inline-block ${highlight.includes(w.replace(/[.,]/g, '')) ? 'hl' : ''}`}
            variants={{ hidden: { y: '100%', opacity: 0 }, show: { y: 0, opacity: 1 } }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Comp>
  );
}
