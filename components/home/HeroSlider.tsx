"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link"; // <--- IMPORTANTE: Importamos Link para la navegación

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    image: "/images/hero-1.jpg",
    title: "Soluciones Veterinarias Profesionales",
    subtitle: "Productos de calidad superior para el cuidado y bienestar animal.",
  },
  {
    id: 2,
    image: "/images/hero-2.jpg",
    title: "Distribución Veterinaria Especializada",
    subtitle: "Conectamos a las marcas líderes del sector con tu negocio.",
  },
  {
    id: 3,
    image: "/images/hero-4.jpg",
    title: "Comprometidos con la Salud Animal",
    subtitle: "Atención personalizada, logística eficiente y asesoramiento profesional.",
  },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative h-[calc(100vh-120px)] min-h-[600px] w-full overflow-hidden bg-slate-900 group">
      
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={{ nextEl: ".hero-next", prevEl: ".hero-prev" }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full flex items-center overflow-hidden">
              
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className={`absolute left-0 top-0 w-full h-full object-cover object-center transition-transform duration-[6000ms] ease-out ${
                    activeIndex === index ? "scale-110" : "scale-100"
                  }`}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent hidden md:block" />
              <div className="absolute inset-0 bg-black/60 md:hidden" />

              <div className="relative z-10 w-full h-full flex items-center">
                <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 md:px-16 text-left">
                  <div className="max-w-3xl">
                    <AnimatePresence mode="wait">
                      {activeIndex === index && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                          }}
                        >
                          <motion.h1
                            variants={{
                              hidden: { opacity: 0, x: -30 },
                              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
                            }}
                            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]"
                          >
                            {slide.title}
                          </motion.h1>

                          <motion.p
                            variants={{
                              hidden: { opacity: 0, x: -20 },
                              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
                            }}
                            className="mt-6 text-base text-gray-200 sm:text-lg md:text-xl font-light leading-relaxed max-w-xl"
                          >
                            {slide.subtitle}
                          </motion.p>

                          <motion.div
                            variants={{
                              hidden: { opacity: 0, y: 20 },
                              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                            }}
                            className="mt-10 flex flex-wrap gap-4 justify-start"
                          >
                            {/* BOTÓN PRIMARIO: Ahora es un Link que lleva a /productos */}
                            <Link 
                              href="/productos" 
                              className="rounded-full bg-[var(--norvet-green)] px-8 py-4 font-bold text-white shadow-lg shadow-emerald-900/30 transition-all hover:bg-[var(--norvet-green-dark)] hover:scale-105 active:scale-95 inline-block"
                            >
                              Ver Productos
                            </Link>

                            {/* BOTÓN SECUNDARIO: Ahora es un Link que lleva a /contacto */}
                            <Link 
                              href="/contacto" 
                              className="rounded-full border border-white/30 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-md transition-all hover:bg-white hover:text-slate-900 active:scale-95 inline-block"
                            >
                              Contactar
                            </Link>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <button className="hero-prev absolute left-4 top-1/2 z-30 hidden md:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all hover:bg-[var(--norvet-green)] hover:border-[var(--norvet-green)] hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100">
          <ChevronLeft size={24} />
        </button>

        <button className="hero-next absolute right-4 top-1/2 z-30 hidden md:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all hover:bg-[var(--norvet-green)] hover:border-[var(--norvet-green)] hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100">
          <ChevronRight size={24} />
        </button>
      </Swiper>

      <style jsx global>{`
        .hero-swiper-custom .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.4;
        }
        .hero-swiper-custom .swiper-pagination-bullet-active {
          background: var(--norvet-green) !important;
          opacity: 1;
          width: 24px !important;
          border-radius: 4px !important;
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
}

