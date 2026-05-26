"use client";

import { products } from "@/data/products";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// 1. Creamos un componente interno para manejar la búsqueda
function ProductList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("search") || "";
  
  const [filter, setFilter] = useState("Todos");
  const [visibleCount, setVisibleCount] = useState(8); 
  
  const categories = ["Todos", "Medicamentos", "Suplementos", "Equipos", "Vacunas"];

  // LÓGICA DE FILTRADO: Si el usuario hace clic en "Todos", 
  // pero hay un search en la URL, seguirá filtrando por el texto.
  const filteredProducts = products.filter((product) => {
    const matchesCategory = filter === "Todos" || product.category === filter;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const handleCategoryChange = (cat: string) => {
    setFilter(cat);
    setVisibleCount(8);
    // OPCIONAL: Si quieres que al hacer clic en una categoría se borre la búsqueda de la URL
    // router.push('/productos'); 
  };

  const clearSearch = () => {
    router.push('/productos'); // Limpia la URL y el buscador
  };

  return (
    <>
      {/* FILTROS */}
      <div className="mx-auto max-w-[1280px] px-6 mt-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
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
      </div>

      {/* MENSAJE DE BÚSQUEDA */}
      {searchQuery && (
        <div className="text-center mt-8 flex items-center justify-center gap-3">
          <p className="text-gray-500 text-sm">
            Resultados para: <span className="font-bold text-slate-900">"{searchQuery}"</span>
          </p>
          <button 
            onClick={clearSearch} 
            className="text-xs font-bold text-[var(--norvet-green)] underline hover:text-[var(--norvet-green-dark)]"
          >
            Limpiar búsqueda
          </button>
        </div>
      )}

      {/* GRID DE PRODUCTOS */}
      <div className="mx-auto max-w-[1280px] px-6 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              key={product.id} 
              className="bg-white rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col"
            >
              <div className="relative h-64 w-full">
                <img src={product.image} alt={product.name} className="w-full h-//full object-cover" />
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[var(--norvet-green)] text-[10px] font-bold px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-6 flex-grow">{product.shortDescription}</p>
                <Link href={`/productos/${product.id}`} className="w-full py-3 rounded-full bg-slate-100 text-slate-700 text-center font-bold text-sm transition-all hover:bg-[var(--norvet-green)] hover:text-white active:scale-95">
                  Ver más
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-xl text-gray-500">No encontramos productos que coincidan.</p>
            <button onClick={clearSearch} className="mt-4 text-[var(--norvet-green)] font-bold underline">
              Ver todo el catálogo
            </button>
          </div>
        )}
      </div>

      {/* BOTÓN CARGAR MÁS */}
      {visibleCount < filteredProducts.length && (
        <div className="flex justify-center mt-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setVisibleCount(prev => prev + 8)}
            className="px-10 py-4 rounded-full bg-white border-2 border-[var(--norvet-green)] text-[var(--norvet-green)] font-bold transition-all hover:bg-[var(--norvet-green)] hover:text-white shadow-sm"
          >
            Cargar más productos
          </motion.button>
        </div>
      )}
    </>
  );
}

// 2. EL COMPONENTE PRINCIPAL ENVUELVE TODO EN SUSPENSE
export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Suspense fallback={<div className="text-center py-20 text-gray-500">Cargando productos...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
}


