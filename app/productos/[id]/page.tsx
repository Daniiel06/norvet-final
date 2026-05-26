"use client";

import { products } from "@/data/products";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ProductDetail() {
  const { id } = useParams();
  // Buscamos el producto que coincida con el ID de la URL
  const product = products.find(p => p.id === id);

  if (!product) return <div className="pt-32 text-center text-2xl">Producto no encontrado</div>;

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="mx-auto max-w-[1280px] px-6">
        
        <Link href="/productos" className="flex items-center gap-2 text-gray-500 hover:text-[var(--norvet-green)] transition-colors mb-8 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Volver al catálogo
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl border-8 border-gray-50"
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className="text-[var(--norvet-green)] font-bold uppercase tracking-widest text-sm">{product.category}</span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-2 mb-6">{product.name}</h1>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-10">{product.fullDescription}</p>

            <div className="bg-gray-50 rounded-[30px] p-8 border border-gray-100">
              <div className="flex items-center gap-2 mb-6 text-slate-800 font-bold text-xl">
                <FileText className="text-[var(--norvet-green)]" />
                <h2>Ficha Técnica</h2>
              </div>
              <div className="grid gap-4">
                {product.specs.map((spec, index) => (
                  <div key={index} className="flex justify-between py-3 border-b border-gray-200 last:border-0">
                    <span className="text-gray-500 font-medium">{spec.label}</span>
                    <span className="text-slate-800 font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <button 
                onClick={() => window.open(`https://wa.me/51999999999?text=Hola! Me gustaría cotizar el producto: ${product.name}`)}
                className="w-full md:w-auto px-12 py-5 rounded-full bg-[var(--norvet-green)] text-white font-black text-lg shadow-xl transition-all hover:bg-[var(--norvet-green-dark)] hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                <CheckCircle size={24} />
                Solicitar Cotización
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
