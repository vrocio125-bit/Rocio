import { useState } from 'react';
import { ImageIcon } from 'lucide-react';

// Imagen con fallback: si la foto no carga, muestra un placeholder de marca
// claramente identificado para reemplazar luego por material real.
export default function SmartImage({ image, className = '', imgClassName = '', badge = true, eager = false }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-navy via-intense to-sky ${className}`}>
      {!failed ? (
        <img
          src={image.src}
          alt={image.alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <div role="img" aria-label={`Placeholder: ${image.label}`} className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center text-white">
          <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden="true">
            <defs>
              <pattern id="bub" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="6" fill="none" stroke="white" strokeWidth="1.2" />
                <circle cx="45" cy="40" r="10" fill="none" stroke="white" strokeWidth="1.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#bub)" />
          </svg>
          <ImageIcon className="relative h-8 w-8 opacity-90" aria-hidden="true" />
          <span className="relative font-display text-sm font-semibold">{image.label}</span>
          <span className="relative text-[11px] uppercase tracking-widest text-white/70">Placeholder · reemplazar por foto real</span>
        </div>
      )}
      {badge && !failed && (
        <span className="absolute bottom-2 left-2 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur">
          Foto ilustrativa
        </span>
      )}
    </div>
  );
}
