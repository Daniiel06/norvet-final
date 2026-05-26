"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/effect-fade";

interface FeatureCardProps {
  title: string;
  images: string[]; // Ahora recibe un array de imágenes
  buttonText: string;
}

export default function FeatureCard({ title, images, buttonText }: FeatureCardProps) {
  return (
    <div className="group relative h-[400px] w-full overflow-hidden rounded-[32px] shadow-lg transition-all duration-500 hover:shadow-2xl">
      
      {/* SWIPER DE FONDO */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade" // El efecto fade es más elegante para banners que el deslizamiento
        autoplay={{
          delay: 6000, // 6 segundos entre cambios
          disableOnInteraction: false,
        }}
        loop
        className="h-full w-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <Image
                src={img}
                alt={`${title} ${index + 1}`}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Overlay oscuro para que el texto siempre sea legible */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* CONTENIDO FIJO SOBRE EL SLIDER */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 sm:p-12 text-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-black leading-tight sm:text-4xl">
            {title}
          </h3>
          
          <div className="mt-6 overflow-hidden">
            <button className="group/btn relative inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-all hover:bg-[var(--norvet-green)] hover:text-white active:scale-95">
              {buttonText}
              {/* Flecha que aparece al hacer hover */}
              <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                →
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
