import { useState } from 'react';
import { brand } from '../config/site.js';

// Muestra los LOGOS ORIGINALES tal cual fueron entregados (no se redibujan).
// kind="full": logo completo con su fondo celeste, integrado como pieza redondeada.
// kind="icon": isotipo "H" sobre su fondo blanco, presentado en una placa blanca.
export default function Logo({ kind = 'icon', className = 'h-12' }) {
  const [failed, setFailed] = useState(false);
  const logo = brand.logo[kind];

  if (failed) {
    return (
      <div
        role="img"
        aria-label="Espacio reservado para el logo original de Hiper Limpio"
        className={`flex aspect-[3/1] items-center justify-center whitespace-nowrap rounded-xl border-2 border-dashed border-white/50 px-3 text-[10px] font-semibold uppercase tracking-wider text-white/80 ${className}`}
      >
        Logo original
      </div>
    );
  }

  if (kind === 'full') {
    return (
      <img
        src={logo.src}
        alt={logo.alt}
        onError={() => setFailed(true)}
        style={{ aspectRatio: logo.ratio }}
        className={`w-auto max-w-full rounded-2xl object-contain shadow-xl ring-1 ring-white/25 ${className}`}
      />
    );
  }

  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white shadow-md">
      <img src={logo.src} alt={logo.alt} onError={() => setFailed(true)} className={`aspect-square w-auto object-contain ${className}`} />
    </span>
  );
}
