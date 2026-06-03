"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const NAV_LINKS = [
  { name: "Inicio", href: "/" },
  { name: "Productos", href: "/productos" },
  { name: "Noticias", href: "/noticias" },
  { name: "Nosotros", href: "/nosotros" },
  { name: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20); // Activamos el efecto más rápido (20px)
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/productos?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <header 
      className={`fixed top-10 left-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
        ? "bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm" 
        : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Fijamos la altura en h-20 siempre, para que NO haya saltos al hacer scroll */}
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6 sm:px-12 md:px-16">
        
        {/* LOGO */}
        <div className="flex items-center flex-shrink-0 transition hover:opacity-90">
          <Image 
            src="/images/logo.png" 
            alt="Norvet Salud Animal" 
            width={130} 
            height={40} 
            priority 
            className="h-auto w-auto object-contain" 
          />
        </div>

        {/* MENÚ */}
        <nav className="hidden items-center gap-8 text-sm font-bold uppercase tracking-wider lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <a 
                key={link.name} 
                href={link.href} 
                className={`relative py-2 transition-all duration-300 group ${
                  isActive 
                  ? "text-[var(--norvet-green)]" 
                  : "text-slate-600 hover:text-[var(--norvet-green)]"
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-[var(--norvet-green)] transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </a>
            );
          })}
        </nav>

        {/* BUSCADOR */}
        <div className="hidden items-center gap-3 xl:flex">
          <div className={`flex items-center rounded-full px-4 py-2 transition-all duration-300 ${
            isScrolled 
            ? "bg-gray-50 border border-gray-200" 
            : "bg-white/20 border border-white/30 backdrop-blur-sm"
          } focus-within:border-[var(--norvet-green)] focus-within:ring-2 focus-within:ring-[var(--norvet-green)]/20`}>
            <Search size={18} className={isScrolled ? "text-gray-400" : "text-slate-600"} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar productos..."
              className={`ml-2 w-40 lg:w-56 bg-transparent outline-none text-sm transition-colors ${
                isScrolled ? "text-slate-700 placeholder:text-gray-400" : "text-slate-800 placeholder:text-slate-500"
              }`}
            />
          </div>
          <button onClick={handleSearch} className="rounded-full bg-[var(--norvet-green)] px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[var(--norvet-green-dark)] active:scale-95">
            Buscar
          </button>
        </div>
      </div>
    </header>
  );
}


