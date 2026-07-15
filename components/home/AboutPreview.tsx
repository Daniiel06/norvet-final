"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPreview() {
  return (
    <section className="relative bg-white py-24 overflow-hidden">
      {/* Elemento decorativo de fondo: Ahora usa el verde esmeralda del Hero */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-80 h-80 bg-emerald-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 relative z-10">
        
        {/* IMAGE SIDE */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex justify-center"
        >
          {/* Decoraciones detrás de la imagen coordinadas con el verde */}
          <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl" />
          <div className="absolute -top-6 -right-6 w-32 h-32 border-4 border-emerald-500/20 rounded-full" />

          <div className="relative h-[500px] w-full max-w-[500px] overflow-hidden rounded-[40px] shadow-2xl z-10 border-8 border-white group">
            <Image
              src="/images/about-company2.jpg"
              alt="Nuestra Empresa"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
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
            className="inline-block font-bold uppercase tracking-[4px] text-sm text-emerald-600 mb-4"
          >
            Nuestra Empresa
          </motion.p>

          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-4xl font-black leading-tight text-slate-900 sm:text-5xl"
          >
            Comprometidos con la <span className="text-emerald-600">salud y bienestar</span> animal
          </motion.h2>

          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="mt-8 text-lg leading-relaxed text-slate-600 max-w-xl"
          >
            En <span className="font-semibold text-slate-800">Norvet</span> 
            Somos una empresa especializada en la importación y comercialización 
            de productos veterinarios de alta calidad, comprometida con ofrecer
             soluciones confiables para el sector veterinario y agropecuario. Trabajamos 
             con marcas reconocidas a nivel internacional para brindar un portafolio d
             e productos que responde a las necesidades de clínicas veterinarias, distribuidores,
              agroservicios y profesionales del área, ofreciendo atención personalizada, asesoría
               comercial y un servicio orientado a la excelencia.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="mt-10"
          >
            <Link 
              href="/nosotros" 
              className="inline-block rounded-full bg-emerald-600 px-10 py-4 font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 hover:scale-105 active:scale-95"
            >
              Leer más sobre nosotros
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

