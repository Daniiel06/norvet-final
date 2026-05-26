"use client";

import Image from "next/image";
// Solo importamos los iconos que SÍ existen en la librería
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#003d1d] text-white pt-20 pb-10">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 md:px-16">
        
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* COLUMNA 1: MARCA */}
          <div className="flex flex-col gap-6">
            <Image
              src="/images/logo.png" 
              alt="Norvet Salud Animal"
              width={160}
              height={55}
              className="brightness-0 invert" 
            />
            <p className="text-sm leading-relaxed text-white/70">
              Líderes en la distribución de productos veterinarios de alta calidad. 
              Comprometidos con la salud animal y el crecimiento de los profesionales 
              del sector agropecuario.
            </p>
            
            {/* REDES SOCIALES - Usando SVGs directos (No fallan nunca) */}
            <div className="flex gap-4">
              {/* FACEBOOK */}
              <a 
                href="#" 
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-[var(--norvet-green)] hover:scale-110"
                aria-label="Facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3v-4h-3V7a5 5 0 0 1 5-5z"/>
                </svg>
              </a>

              {/* INSTAGRAM */}
              <a 
                href="#" 
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-[var(--norvet-green)] hover:scale-110"
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>

              {/* LINKEDIN */}
              <a 
                href="#" 
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-[var(--norvet-green)] hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="//" rx="2" ry="2" fill="currentColor"/><path d="M16 2v4a2 2 0 0 0 2 2h4v-4z"/>
                  {/* Simplificado para evitar errores: */}
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="//" /> 
                </svg>
                {/* Para evitar cualquier error de dibujo, usemos la forma más simple de Linkedin: */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9" rx="2" ry="2"/><circle cx="4" cy="4" r="4"/></svg>
              </a>
            </div>
          </div>

          {/* COLUMNA 2: EXPLORAR */}
          <div>
            <h4 className="mb-6 text-lg font-bold">Explorar</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/70">
              {["Inicio", "Productos", "Marcas", "Nosotros", "Contacto"].map((item) => (
                <li key={item}>
                  <a href="#" className="transition-all hover:text-white hover:translate-x-2 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA 3: INFORMACIÓN */}
          <div>
            <h4 className="mb-6 text-lg font-bold">Información</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/70">
              {["Términos y Condiciones", "Política de Privacidad", "Preguntas Frecuentes", "Políticas de Envío"].map((item) => (
                <li key={item}>
                  <a href="#" className="transition-all hover:text-white hover:translate-x-2 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA 4: CONTACTO */}
          <div>
            <h4 className="mb-6 text-lg font-bold">Contacto</h4>
            <ul className="flex flex-col gap-5 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-[var(--norvet-green)] shrink-0" />
                <span>Av. Principal 123, Distrito Veterinario, Ciudad, País</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-[var(--norvet-green)] shrink-0" />
                <span>+51 999 999 999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-[var(--norvet-green)] shrink-0" />
                <span>ventas@norvet.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-20 border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
            <p>© {new Date().getFullYear()} Norvet Salud Animal. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Salud animal</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
