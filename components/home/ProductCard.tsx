"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link"; // <--- IMPORTAMOS LINK

type Props = {
  id: string;   // <--- AGREGAMOS EL ID A LAS PROPS
  name: string;
  image: string;
};

export default function ProductCard({ id, name, image }: Props) {
  return (
    <motion.div 
      whileHover={{ y: -10 }} 
      className="group relative flex flex-col w-full max-w-[300px] bg-white rounded-[30px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
    >
      {/* IMAGEN - Ahora envuelta en un Link */}
      <Link href={`/productos/${id}`} className="relative h-64 w-full overflow-hidden block">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[var(--norvet-green)] text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-sm">
          Nuevo
        </div>
      </Link>

      {/* CONTENIDO */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-[var(--norvet-green)] transition-colors">
          {name}
        </h3>
        
        <div className="flex-grow" />

        {/* BOTÓN - Ahora es un Link */}
        <Link 
          href={`/productos/${id}`} 
          className="mt-6 w-full rounded-full bg-slate-100 px-6 py-3 text-sm font-bold text-slate-700 transition-all group-hover:bg-[var(--norvet-green)] group-hover:text-white active:scale-95 text-center block"
        >
          Ver detalles
        </Link>
      </div>
    </motion.div>
  );
}

