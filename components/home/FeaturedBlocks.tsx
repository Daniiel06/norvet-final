"use client";

import FeatureCard from "./FeatureCard";
import { motion } from "framer-motion";

// Datos de imágenes para rotar
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
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 md:px-16">

        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[6px] text-[var(--norvet-green)]">
            Explora Norvet
          </p>
          <h2 className="mt-4 text-4xl font-black text-gray-900 sm:text-5xl">
            Productos y Noticias
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 bg-[var(--norvet-green)] rounded-full" />
        </motion.div>

        {/* GRID */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
          }}
          className="grid gap-8 lg:grid-cols-2"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
            <FeatureCard
              title="Catálogo de Productos"
              images={PRODUCT_IMAGES} // Pasamos el array
              buttonText="Ver todos"
            />
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
            <FeatureCard
              title="Últimas Noticias"
              images={NEWS_IMAGES} // Pasamos el array
              buttonText="Consultar"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

