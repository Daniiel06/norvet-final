"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, X as CloseIcon, Menu } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Búsqueda predictiva
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length < 3) {
        setSearchResults([]);
        return;
      }
      const { data } = await supabase
        .from("productos")
        .select("id, nombre, imagen_url, descripcion_corta")
        .ilike("nombre", `%${searchQuery}%`) 
        .limit(5);
      setSearchResults(data || []);
    };

    const timeoutId = setTimeout(() => {
      // @ts-ignore
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // FUNCION CORREGIDA: Ahora limpia el desplegable al buscar
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchResults([]); 
      router.push(`/productos?search=${searchQuery}`);
    }
  };

  const navLinks = [
    { name: "INICIO", href: "/" },
    { name: "PRODUCTOS", href: "/productos" },
    { name: "NOTICIAS", href: "/noticias" },
    { name: "NOSOTROS", href: "/nosotros" },
    { name: "CONTACTO", href: "/contacto" },
  ];

  return (
    <>
      <header 
        className={`fixed top-10 left-0 z-50 w-full transition-all duration-500 ${
          isScrolled 
          ? "bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm py-2" 
          : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="relative h-12 w-40 flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="Norvet Logo" 
              fill 
              className="object-contain"
              priority
            />
          </Link>

          {/* MENU DESKTOP */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-slate-600 hover:text-[var(--norvet-green)] font-bold text-sm transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {/* BUSCADOR ESTILIZADO */}
            <div className="relative ml-4">
              <form onSubmit={handleSearchSubmit} className="relative group">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar producto..." 
                  className="pl-10 pr-12 py-2 rounded-full bg-gray-100/50 border border-transparent focus:bg-white focus:border-emerald-500 text-sm outline-none w-48 lg:w-64 transition-all shadow-inner"
                />
                {/* Icono de búsqueda más elegante */}
                <div className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                  <Search size={16} />
                </div>
                {/* Botón de búsqueda más moderno */}
                <button 
                  type="submit" 
                  className="absolute right-1.5 top-1.5 bg-emerald-600 text-white p-1.5 rounded-full hover:bg-emerald-700 transition-all shadow-sm"
                >
                  <Search size={14} />
                </button>
              </form>

              {/* DESPLEGABLE DE RESULTADOS */}
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                  {searchResults.map((prod) => (
                    <Link 
                      key={prod.id} 
                      href={`/productos/${prod.id}`}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-none"
                      onClick={() => setSearchQuery("")} // Limpiar al seleccionar un producto
                    >
                      <div className="relative w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={prod.imagen_url || "/images/placeholder.jpg"} alt={prod.nombre} fill className="object-contain" />
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-bold text-slate-800 truncate">{prod.nombre}</span>
                        <span className="text-[10px] text-gray-400 truncate">{prod.descripcion_corta}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <button className="md:hidden p-2 text-slate-800" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* MENU MÓVIL */}
      {isMobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-0 left-0 h-full w-[280px] bg-white z-[70] shadow-2xl transition-transform duration-300 flex flex-col p-6">
            <div className="flex justify-between items-center mb-10">
              <span className="text-xl font-bold text-[var(--norvet-green)]">Menú</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500">
                <CloseIcon size={24} />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-slate-700 hover:text-[var(--norvet-green)] font-bold text-lg p-3 rounded-xl hover:bg-gray-50 transition-all">
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pb-10">
              <button className="w-full bg-[var(--norvet-green)] text-white py-4 rounded-2xl font-bold shadow-lg">Contactar Ahora</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import { X  } from "lucide-react";

