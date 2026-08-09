import { Link } from 'react-router-dom';
import { Camera, MessageSquare, MapPin, Phone, ShieldCheck, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-950 text-white w-full py-16 border-t border-white/10 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        
        {/* About column */}
        <div className="col-span-1 md:col-span-1 space-y-4">
          <Link to="/" className="font-outfit font-black text-2xl tracking-tight text-white inline-block">
            <span>Neomundo</span>
            <span className="text-gradient-cyan">Tour</span>
          </Link>
          <div className="flex flex-wrap gap-2 text-xs font-outfit font-bold">
            <span className="bg-white/10 px-3 py-1 rounded-full border border-white/15 text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>NIT: 11228303-7</span>
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-full border border-white/15 text-cyan-400 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>RNT: 209737</span>
            </span>
          </div>
          <p className="font-sans text-sm text-gray-400 leading-relaxed">
            Experiencias Premium y turismo de lujo en Guatapé. Paseos en helicóptero, Jetcar, pontones VIP y alquiler de villas.
          </p>
          <div className="flex gap-3 pt-2">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:scale-110 border border-white/10"
              aria-label="Instagram"
            >
              <Camera className="w-5 h-5" />
            </a>
            <a 
              href="https://wa.me/573226054919" 
              target="_blank" 
              rel="noreferrer" 
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:scale-110 border border-white/10"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="font-outfit font-extrabold text-xs text-white/90 uppercase tracking-[0.2em] mb-4">Empresa</h4>
          <ul className="space-y-3 font-sans text-sm text-gray-400">
            <li>
              <Link to="/experiences" className="hover:text-emerald-400 transition-colors">
                Catálogo de Experiencias
              </Link>
            </li>
            <li>
              <Link to="/vuelos" className="hover:text-emerald-400 transition-colors">
                Buscador de Vuelos
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Política de Privacidad
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Términos de Servicio
              </a>
            </li>
          </ul>
        </div>

        {/* Connect Column */}
        <div>
          <h4 className="font-outfit font-extrabold text-xs text-white/90 uppercase tracking-[0.2em] mb-4">Categorías</h4>
          <ul className="space-y-3 font-sans text-sm text-gray-400">
            <li>
              <Link to="/experiences?category=Air Adventure" className="hover:text-emerald-400 transition-colors">
                Vuelos en Helicóptero
              </Link>
            </li>
            <li>
              <Link to="/experiences?category=Water" className="hover:text-emerald-400 transition-colors">
                Aqua Drive Jetcar & Pontones
              </Link>
            </li>
            <li>
              <Link to="/experiences?category=Stay" className="hover:text-emerald-400 transition-colors">
                Villas de Lujo & Fincas
              </Link>
            </li>
            <li>
              <Link to="/experiences?category=Adrenaline" className="hover:text-emerald-400 transition-colors">
                Jungle Motors ATV (Cuatrimotos)
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="font-outfit font-extrabold text-xs text-white/90 uppercase tracking-[0.2em] mb-4">Contacto Directo</h4>
          <div className="font-sans text-sm text-gray-400 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-snug">
                CL 32 # 28 - 65, Av. Malecón<br/>
                Guatapé, Antioquia, Colombia
              </span>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
              <a href="https://wa.me/573226054919" target="_blank" rel="noreferrer" className="font-outfit font-extrabold text-white hover:text-emerald-400 transition-colors text-base">
                +57 322 6054919
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-white/10 text-center px-margin-mobile text-gray-500 font-sans text-xs flex flex-col sm:flex-row items-center justify-between max-w-container-max mx-auto gap-4">
        <p>© 2026 Neomundo Tour. Todos los derechos reservados. Registrados en RNT No. 209737.</p>
        <div className="flex gap-4 text-gray-400 font-outfit text-xs font-bold uppercase tracking-wider">
          <span>Guatapé</span>
          <span>•</span>
          <span>Antioquia</span>
          <span>•</span>
          <span>Colombia</span>
        </div>
      </div>
    </footer>
  );
}
