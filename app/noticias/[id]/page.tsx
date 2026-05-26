"use client";

import { news } from "@/data/news";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";

export default function NewsDetail() {
  const { id } = useParams();
  const item = news.find(n => n.id === id);

  if (!item) return <div className="pt-32 text-center">Noticia no encontrada</div>;

  return (
    <div className="min-h-screen pt-[120px] bg-white pb-20">
      <div className="mx-auto max-w-4xl px-6">
        <Link href="/noticias" className="flex items-center gap-2 text-gray-500 hover:text-[var(--norvet-green)] transition-colors mb-8 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Volver a noticias
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-8"
        >
          <div className="relative h-[400px] w-full rounded-[40px] overflow-hidden shadow-2xl">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute top-6 left-6 bg-[var(--norvet-green)] text-white px-4 py-1 rounded-full text-sm font-bold">
              {item.category}
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
            <div className="flex items-center gap-1">
              <Calendar size={16} /> {item.date}
            </div>
            <span>•</span>
            <span>Tiempo de lectura: 3 min</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
            {item.title}
          </h1>

          <div className="text-lg text-gray-600 leading-relaxed space-y-6">
            <p className="font-bold text-xl text-slate-800">{item.excerpt}</p>
            <p>{item.content}</p>
            {/* Puedes agregar más párrafos aquí si quieres */}
            <p>Norvet continúa comprometida con la vanguardia de la medicina veterinaria, trayendo las mejores soluciones al mercado local.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
