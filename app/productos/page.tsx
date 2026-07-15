"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { ProductList } from "./ProductList";

export default function ProductsPage() {
  const [selectedGroup, setSelectedGroup] = useState<"mascotas" | "ganaderia" | null>(null);

  const groupMapping = {
    mascotas: ["Perros","Perro", "Caninos","Gatos", "Gato","Felinos"],
    ganaderia: ["Bovinos", "Equinos", "Porcinos", "Ovinos", "Caprinos"],
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] overflow-hidden">
      <AnimatePresence mode="wait">
        {!selectedGroup ? (
          // --- VISTA 1: SELECCIÓN DE GRUPO ---
          <motion.div 
            key="selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center justify-center min-h-screen p-6"
          >
            <div className="text-center mb-12">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-black text-slate-900 mb-4 tracking-tight"
              >
                Nuestro <span className="text-emerald-600">Catálogo</span>
              </motion.h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] w-full">
              {/* Tarjeta Mascotas */}
              <CategoryCard 
                title="Mascotas"
                description="Soluciones avanzadas para la salud de caninos y felinos."
                image="/images/category-pets.jpg"
                tag="Línea Especializada"
                tagColor="bg-emerald-500"
                onClick={() => setSelectedGroup("mascotas")}
              />

              {/* Tarjeta Ganadería */}
              <CategoryCard 
                title="Ganadería"
                description="Tratamientos de alto rendimiento para animales de producción."
                image="/images/category-livestock.jpg"
                tag="Línea Profesional"
                tagColor="bg-blue-500"
                onClick={() => setSelectedGroup("ganaderia")}
              />
            </div>
          </motion.div>
        ) : (
          // --- VISTA 2: LISTADO DE PRODUCTOS ---
          <motion.div 
            key="list"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="min-h-screen bg-gray-50 pb-20"
          >
            <div className="max-w-[1440px] mx-auto px-6 pt-10">
              <button 
                onClick={() => setSelectedGroup(null)}
                className="group flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-all font-semibold mb-8"
              >
                <div className="p-2 bg-white rounded-full shadow-sm border border-gray-100 group-hover:bg-emerald-50 transition-colors">
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                </div>
                Volver al menú principal
              </button>
            </div>
            <ProductList group={selectedGroup} groupSpecies={groupMapping[selectedGroup]} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// COMPONENTE DE TARJETA PARA EVITAR REPETICIÓN Y MEJORAR EL DISEÑO
function CategoryCard({ title, description, image, tag, tagColor, onClick }: any) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative h-[450px] rounded-[40px] overflow-hidden cursor-pointer group shadow-xl border border-white/20"
    >
      {/* Imagen con zoom suave */}
      <Image 
        src={image} 
        alt={title} 
        fill 
        className="object-cover transition-transform duration-1000 group-hover:scale-110" 
      />
      
      {/* Gradiente sofisticado: más oscuro abajo, transparente arriba */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
      
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className={`${tagColor} text-white text-[10px] font-bold px-3 py-1 rounded-full mb-3 inline-block uppercase tracking-widest`}
        >
          {tag}
        </motion.span>
        <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
        <p className="text-gray-300 text-base mb-6 max-w-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {description}
        </p>
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          Explorar Catálogo <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}



