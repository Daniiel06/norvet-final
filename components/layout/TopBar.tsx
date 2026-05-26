import { Mail, Phone } from "lucide-react";

export default function TopBar() {
  return (
    // h-10 = 40px
    <div className="fixed top-0 left-0 z-[60] w-full h-10 bg-[var(--norvet-green)] text-white transition-all">
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6 sm:px-12 md:px-16">
        
        <div className="flex items-center gap-6 text-xs md:text-sm font-medium">
          <a href="mailto:ventas@norvet.com" className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-all">
            <Mail size={14} />
            <span>ventas@norvet.com</span>
          </a>

          <div className="hidden items-center gap-2 md:flex">
            <a href="tel:+51999999999" className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-all">
              <Phone size={14} />
              <span>+51 999 999 999</span>
            </a>
          </div>
        </div>

        <button className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md transition hover:bg-white hover:text-[var(--norvet-green)] active:scale-95">
          Contactar
        </button>
      </div>
    </div>
  );
}
