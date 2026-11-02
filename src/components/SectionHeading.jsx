import AnimatedText from './AnimatedText.jsx';
import Reveal from './Reveal.jsx';

export default function SectionHeading({ number, eyebrow, title, intro, dark = false, center = false, highlight }) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      <Reveal>
        <span className={`eyebrow ${dark ? 'bg-white/10 text-sky' : 'bg-sky/10 text-intense'}`}>
          {number && <span className={dark ? 'text-accent' : 'text-navy'}>{number}</span>}
          {eyebrow}
        </span>
      </Reveal>
      <AnimatedText
        text={title}
        highlight={highlight}
        className={`mt-5 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl ${
          dark ? 'text-white [&_.hl]:text-sky' : 'text-navy [&_.hl]:text-intense'
        }`}
      />
      {intro && (
        <Reveal delay={0.15}>
          <p className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? 'text-white/75' : 'text-ink/70'}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
