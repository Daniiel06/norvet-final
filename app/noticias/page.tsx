"use client";

import { news } from "@/data/news";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function NoticiasPage() {
  const [filter, setFilter] = useState("Todos");
  const categories = ["Todos", "Local", "Internacional"];

  const filteredNews = filter === "Todos" 
    ? news 
    : news.filter(n => n.category === filter);

  return (
    <div className="min-h-screen pt-[120px] bg-gray-50 pb-20">
      <div className="mx-auto max-w-[1280px] px-6">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900">
            Centro de <span className="text-[var(--norvet-green)]">Noticias</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Mantente actualizado con las últimas tendencias, normativas y avances de la salud animal a nivel local e internacional.
          </p>
        </div>

        {/* FILTROS */}
        <div className="flex justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                filter === cat 
                ? "bg-[var(--norvet-green)] text-white shadow-lg" 
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID DE NOTICIAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={item.id} 
              className="bg-white rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col"
            >
              <div className="relative h-56 w-full">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[var(--norvet-green)] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  {item.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <p className="text-xs text-gray-400 font-medium mb-2">{item.date}</p>
                <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight">{item.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-grow">
                  {item.excerpt}
                </p>
                <Link 
                  href={`/noticias/${item.id}`}
                  className="text-[var(--norvet-green)] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Leer noticia completa →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">No hay noticias en esta categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
}
