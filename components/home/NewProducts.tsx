"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";

export default function NewProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestProducts() {
      setLoading(true);
      try {
        // Traemos los 8 productos más recientes
        // Ordenamos por fecha_creacion de forma descendente (los más nuevos primero)
        const { data, error } = await supabase
          .from("productos")
          .select("*")
          .order("fecha_creacion", { ascending: false })
          .limit(8);

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error("Error cargando productos nuevos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLatestProducts();
  }, []);

  if (loading) {
    return (
      <div className="h-[500px] flex items-center justify-center bg-gradient-to-br from-[#004d26] to-[#004d26]">
        <Loader2 className="animate-spin text-white" size={40} />
      </div>
    );
  }

  if (products.length === 0) return null; // No mostrar la sección si no hay productos

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#004d26] via-[var(--norvet-green-dark)] to-[#004d26] py-24 px-6 sm:px-12 md:px-16">

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--norvet-green)] opacity-20 blur-[120px] pointer-events-none" />

      <div className="mx-auto w-full max-w-[1280px] relative z-10">

        {/* HEADER */}
        <div className="mb-16 flex items-end justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-bold uppercase tracking-[6px] text-white/70">
              Catálogo
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">
              Nuevos Productos
            </h2>
          </motion.div>

          <div className="hidden gap-4 md:flex">
            <button className="products-prev flex h-14 w-14 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:bg-white hover:text-[var(--norvet-green-dark)] active:scale-90">
              <ChevronLeft size={24} />
            </button>
            <button className="products-next flex h-14 w-14 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:bg-white hover:text-[var(--norvet-green-dark)] active:scale-90">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* SLIDER */}
        <Swiper
          modules={[Autoplay, Navigation]}
          navigation={{
            nextEl: ".products-next",
            prevEl: ".products-prev",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="!py-10" 
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="flex justify-center">
              {/* 
                  IMPORTANTE: Mapeamos los nombres de la DB a las Props del componente.
                  nombre -> name
                  imagen_url -> image
              */}
              <ProductCard
                id={product.id}
                name={product.nombre}
                image={product.imagen_url || "/images/placeholder.jpg"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
