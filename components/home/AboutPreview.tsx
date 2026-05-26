"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link"; // <--- IMPORTANTE: Importamos Link

export default function AboutPreview() {
  return (
    <section className="relative bg-white py-24 overflow-hidden">
      {/* Elemento decorativo de fondo */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-[var(--norvet-green-light)] rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        
        {/* IMAGE SIDE */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex justify-center"
        >
          <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-[var(--norvet-green)]/10 rounded-full blur-2xl" />
          <div className="absolute -top-6 -right-6 w-32 h-32 border-4 border-[var(--norvet-green)]/20 rounded-full" />

          <div className="relative h-[500px] w-full max-w-[500px] overflow-hidden rounded-[40px] shadow-2xl z-10 border-8 border-white">
            <Image
              src="/images/about-company.jpg"
              alt="Nuestra Empresa"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </motion.div>

        {/* CONTENT SIDE */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1, 
              transition: { staggerChildren: 0.2 } 
            }
          }}
        >
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="inline-block font-bold uppercase tracking-[4px] text-sm text-[var(--norvet-green)] mb-4"
          >
            Nuestra Empresa
          </motion.p>

          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl"
          >
            Comprometidos con la <span className="text-[var(--norvet-green)]">salud y bienestar</span> animal
          </motion.h2>

          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="mt-8 text-lg leading-relaxed text-gray-600 max-w-xl"
          >
            En <span className="font-semibold text-gray-800">Norvet</span> trabajamos ofreciendo soluciones veterinarias de alta
            calidad, comprometidos con el desarrollo del sector agropecuario y
            el bienestar animal. Contamos con productos especializados y
            atención personalizada para clínicas, distribuidores y profesionales
            veterinarios.
          </motion.p>

          {/* BOTÓN: Ahora es un Link que lleva a /nosotros */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="mt-10"
          >
            <Link 
              href="/nosotros" 
              className="inline-block rounded-full bg-[var(--norvet-green)] px-10 py-4 font-bold text-white shadow-lg shadow-emerald-900/20 transition-all hover:bg-[var(--norvet-green-dark)] hover:scale-105 active:scale-95"
            >
              Leer más sobre nosotros
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
