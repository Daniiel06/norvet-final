"use client";
import FeatureCard from "./FeatureCard";
import { motion } from "framer-motion";

const PRODUCT_IMAGES = [
  "/images/product-1.jpg",
  "/images/product-2.jpg",
  "/images/product-3.jpg",
];

const NEWS_IMAGES = [
  "/images/news-banner-1.jpg",
  "/images/news-banner-2.jpg",
  "/images/news-banner-3.jpg",
];

export default function FeaturedBlocks() {
  return (
    <section className="relative bg-white py-24 overflow-hidden">
      {/* --- FONDO ATMOSFÉRICO (Coordinado con el resto de la web) --- */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-100 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-50 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 md:px-16 relative z-10">

        {/* HEADER: Más elegante y moderno */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[6px] text-emerald-600 mb-3">
            Explora Norvet
          </p>
          <h2 className="text-4xl font-black text-slate-900 sm:text-5xl leading-tight">
            Soluciones <span className="text-emerald-600">Integrales</span> <br /> para el Mundo Animal
          </h2>
          {/* Línea decorativa con gradiente */}
          <div className="mx-auto mt-6 h-1.5 w-24 bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-full" />
        </motion.div>

        {/* GRID: Ahora con un layout más aireado y moderno */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
          }}
          className="grid gap-12 lg:grid-cols-2"
        >
          {/* CARD 1: Catálogo */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            className="group relative"
          >
            {/* Efecto de resplandor detrás de la tarjeta */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[40px] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-white/80 backdrop-blur-xl rounded-[40px] border border-emerald-100 overflow-hidden shadow-xl">
              <FeatureCard
                title="Catálogo de Productos"
                images={PRODUCT_IMAGES}
                buttonText="Explorar Catálogo"
              />
            </div>
          </motion.div>

          {/* CARD 2: Noticias */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            className="group relative"
          >
            {/* Efecto de resplandor detrás de la tarjeta */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-[40px] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-white/80 backdrop-blur-xl rounded-[40px] border border-emerald-100 overflow-hidden shadow-xl">
              <FeatureCard
                title="Últimas Noticias"
                images={NEWS_IMAGES}
                buttonText="Leer Noticias"
              />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

