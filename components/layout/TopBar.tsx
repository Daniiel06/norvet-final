import { Mail, Phone } from "lucide-react";

export default function TopBar() {
  return (
    // Aumentamos h-10 (40px) a h-12 (48px) para dar más espacio a los iconos
    <div className="fixed top-0 left-0 z-[60] w-full h-12 bg-[var(--norvet-green)] text-white transition-all">
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6 sm:px-12 md:px-16">
        
        {/* LADO IZQUIERDO: Contacto */}
        <div className="flex items-center gap-6 text-xs md:text-sm font-medium">
          <a href="mailto:ventas@norvet.com" className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-all">
            <Mail size={16} /> {/* Aumentamos un poco el icono de correo */}
            <span className="hidden sm:inline">ventas@norvet.com</span>
          </a>

          <div className="hidden items-center gap-2 md:flex">
            <a href="tel:+51999999999" className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-all">
              <Phone size={16} /> {/* Aumentamos un poco el icono de teléfono */}
              <span>+51 999 999 999</span>
            </a>
          </div>
        </div>

        {/* LADO DERECHO: Redes Sociales con mejor visibilidad */}
        <div className="flex items-center gap-5">
          
          {/* Facebook */}
          <a 
            href="https://facebook.com/tuperfil" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300"
          >
            <img 
              src="/icons/facebook.png" 
              alt="Facebook" 
              className="w-6 h-6 object-contain transition-transform duration-300 group-hover:-translate-y-1"
            />
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-white text-slate-800 text-[10px] px-2 py-1 rounded shadow-lg font-bold whitespace-nowrap">
              Facebook
            </span>
          </a>

          {/* Instagram */}
          <a 
            href="https://www.instagram.com/norvetmascotas/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300"
          >
            <img 
              src="/icons/instagram.png" 
              alt="Instagram" 
              className="w-6 h-6 object-contain transition-transform duration-300 group-hover:-translate-y-1"
            />
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-white text-slate-800 text-[10px] px-2 py-1 rounded shadow-lg font-bold whitespace-nowrap">
              Instagram
            </span>
          </a>

          {/* TikTok */}
          <a 
            href="https://www.tiktok.com/@norvetsa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300"
          >
            <img 
              src="/icons/tiktok.png" 
              alt="TikTok" 
              className="w-6 h-6 object-contain transition-transform duration-300 group-hover:-translate-y-1"
            />
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-white text-slate-800 text-[10px] px-2 py-1 rounded shadow-lg font-bold whitespace-nowrap">
              TikTok
            </span>
          </a>

        </div>
      </div>
    </div>
  );
}
