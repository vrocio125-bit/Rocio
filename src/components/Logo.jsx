import { useState } from 'react';
import { brand } from '../config/site.js';

// Muestra el LOGO ORIGINAL desde el archivo configurado.
// No se redibuja ni se reemplaza por texto: si el archivo no existe aún,
// se muestra un placeholder identificado para incorporarlo.
export default function Logo({ className = 'h-12', plate = brand.logo.hasBackground, variant = 'light' }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        role="img"
        aria-label="Espacio reservado para el logo original de Hiper Limpio"
        title="Copiar el logo original a /public/brand/logo-hiper-limpio.png"
        className={`flex aspect-[3/1] items-center justify-center whitespace-nowrap rounded-xl border-2 border-dashed px-3 text-center text-[10px] font-semibold uppercase leading-tight tracking-wider ${
          variant === 'light' ? 'border-white/50 text-white/80' : 'border-navy/40 text-navy/70'
        } ${className}`}
      >
        Logo original
      </div>
    );
  }
  return (
    <span className={`inline-flex items-center ${plate ? 'rounded-xl bg-white p-1.5 shadow-md' : ''}`}>
      <img src={brand.logo.src} alt={brand.logo.alt} onError={() => setFailed(true)} className={`w-auto object-contain ${className}`} />
    </span>
  );
}
