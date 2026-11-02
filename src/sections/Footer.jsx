import { MapPin } from 'lucide-react';
import { brand, contact } from '../config/site.js';
import Logo from '../components/Logo.jsx';

export default function Footer() {
  return (
    <footer className="bg-[#052a61] py-10 text-white/70">
      <div className="container-x flex flex-col items-center justify-between gap-6 text-sm md:flex-row">
        <div className="flex items-center gap-4">
          <Logo className="h-12" />
          <div>
            <p className="font-display font-semibold text-white">{brand.slogan}</p>
            <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {brand.address}</p>
          </div>
        </div>
        <div className="max-w-md text-center text-xs md:text-right">
          <p>{contact.providerLabel} para {brand.name}.</p>
          <p className="mt-1 text-white/50">Fotografías externas ilustrativas (Unsplash License): no representan el local ni los productos de {brand.name}.</p>
        </div>
      </div>
    </footer>
  );
}
