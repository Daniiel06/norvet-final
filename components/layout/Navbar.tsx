"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation"; // Añadido usePathname

const NAV_LINKS = [
  { name: "Inicio", href: "/" },
  { name: "Productos", href: "/productos" },
  { name: "Noticias", href: "/noticias" },
  { name: "Nosotros", href: "/nosotros" },
  { name: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname(); // Detecta la ruta actual

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/productos?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <header className="fixed top-10 left-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6 sm:px-12 md:px-16">
        <div className="flex items-center flex-shrink-0 transition hover:opacity-90">
          <Image src="/images/logo.png" alt="Norvet Salud Animal" width={160} height={55} priority className="h-auto w-auto object-contain" />
        </div>

        <nav className="hidden items-center gap-8 text-sm font-bold uppercase tracking-wider lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href; // Verifica si es la página actual
            return (
              <a 
                key={link.name} 
                href={link.href} 
                className={`relative py-2 transition-colors group ${
                  isActive ? "text-[var(--norvet-green)]" : "text-slate-600 hover:text-[var(--norvet-green)]"
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

        <div className="hidden items-center gap-3 xl:flex">
          <div className="flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2 transition-all focus-within:border-[var(--norvet-green)] focus-within:ring-2 focus-within:ring-[var(--norvet-green)]/20">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar productos..."
              className="ml-2 w-40 lg:w-56 bg-transparent outline-none text-sm text-slate-700 placeholder:text-gray-400"
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
