"use client";

import Image from "next/image";
import Link from "next/link"; // Importamos Link para navegación interna
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
              Líderes en la distribución de productos veterinarios de alta
              calidad. Comprometidos con la salud animal y el crecimiento de los
              profesionales del sector agropecuario.
            </p>
            {/* Redes sociales eliminadas según solicitud */}
          </div>

          {/* COLUMNA 2: EXPLORAR (Ahora funcional con Link) */}
          <div>
            <h4 className="mb-6 text-lg font-bold">Explorar</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/70">
              {[
                { name: "Inicio", href: "/" },
                { name: "Productos", href: "/productos" },
                { name: "Marcas", href: "/marcas" },
                { name: "Nosotros", href: "/nosotros" },
                { name: "Contacto", href: "/contacto" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="transition-all hover:text-white hover:translate-x-2 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA 3: INFORMACIÓN (Ajustado a Ley Peruana) */}
          <div>
            <h4 className="mb-6 text-lg font-bold">Información</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/70">
              {[
                { name: "Términos y Condiciones", href: "/politicas/terminos" },
                {
                  name: "Política de Privacidad",
                  href: "/politicas/privacidad",
                },
                { name: "Preguntas Frecuentes", href: "/faq" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="transition-all hover:text-white hover:translate-x-2 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA 4: CONTACTO */}
          <div>
            <h4 className="mb-6 text-lg font-bold">Contacto</h4>
            <ul className="flex flex-col gap-5 text-sm text-white/70">
              <li className="flex items-start gap-3">
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  size={20}
                  className="text-[var(--norvet-green)] shrink-0"
                />
                <span>+51 999 999 999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail
                  size={20}
                  className="text-[var(--norvet-green)] shrink-0"
                />
                <span>ventas@norvet.com</span>
              </li>
            </ul>
          </div>
        </div>

        

        <div className="mt-20 border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p>
                © {new Date().getFullYear()} Norvet Salud Animal. Todos los
                derechos reservados.
              </p>
              {/* ATRIBUCIÓN DE FLATICON - DISCRETA PERO VISIBLE */}
              <p className="text-[10px] opacity-60">
                Iconos diseñados por{" "}
                <a
                  href="https://www.flaticon.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white transition-colors"
                >
                  Flaticon
                </a>
              </p>
            </div>
            <div className="flex gap-6">
              <span className="hover:text-white transition-colors cursor-default">
                Salud animal
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
