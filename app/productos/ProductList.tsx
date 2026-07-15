"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

interface ProductListProps {
  group: string;
  groupSpecies: string[];
}

export function ProductList({ group, groupSpecies }: ProductListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("search") || "";
  
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [filter, setFilter] = useState("Todos");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const itemsPerPage = 12;

  useEffect(() => {
    async function loadCategories() {
      const { data } = await supabase.from("categorias").select("*").order("nombre");
      setCategories(data || []);
    }
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts(true);
  }, [filter, searchQuery, group]);

    async function loadProducts(reset = false) {
    setLoading(true);
    const currentPage = reset ? 0 : page;
    
    try {
      // 1. Traemos los productos con sus relaciones
      // Quitamos el !inner para evitar errores de filtrado en el servidor
      let query = supabase
        .from("productos")
        .select(`
          *, 
          categorias(nombre), 
          marcas(nombre), 
          producto_especies(especies(nombre))
        `);

      // 2. FILTRO POR CATEGORÍA (Este sí funciona bien en el servidor)
      if (filter !== "Todos") {
        const { data: catData } = await supabase
          .from("categorias")
          .select("id")
          .eq("nombre", filter)
          .single();
        if (catData) query = query.eq("categoria_id", catData.id);
      }

      // 3. FILTRO POR BÚSQUEDA (Este también funciona bien)
      if (searchQuery) {
        query = query.or(`nombre.ilike.%${searchQuery}%,descripcion_corta.ilike.%${searchQuery}%`);
      }

      // 4. PAGINACIÓN Y ORDEN
      // Traemos un bloque más grande de productos para filtrar en el cliente
      const from = currentPage * itemsPerPage;
      const to = from + (itemsPerPage * 5); // Traemos más para compensar el filtro de especies
      const { data, error } = await query.range(from, to).order("nombre", { ascending: true });

      if (error) throw error;

      // === LÓGICA DE BÚSQUEDAS FALLIDAS (AÑADE ESTO AQUÍ) ===
      if (searchQuery && (!data || data.length === 0)) {
        if (searchQuery.trim().length > 2) {
          await supabase.from("Busquedas_Fallidas").insert([
            { query: searchQuery.trim() }
          ]);
          console.log("Se registró una búsqueda fallida");
        }
      }
      // ====================================================

      setProducts(data || []);

      // 5. FILTRADO DE ESPECIES EN EL CLIENTE (Aquí es donde ocurre la magia)
      // Filtramos los productos que tengan al menos una especie del grupo seleccionado
      const filteredData = data?.filter(product => {
        if (!group || !groupSpecies) return true; // Si no hay grupo, mostrar todos
        
        // Verificamos si alguna de las especies del producto coincide con las del grupo
        return product.producto_especies?.some((pe: any) => 
          groupSpecies.includes(pe.especies?.nombre)
        );
      }) || [];

      if (reset) {
        setProducts(filteredData);
      } else {
        setProducts(prev => [...prev, ...filteredData]);
      }

      // Determinamos si hay más productos basándonos en la data original
      setHasMore((data?.length || 0) >= itemsPerPage);
      setPage(currentPage + 1);

    } catch (error: any) {
      console.error("Error detallando productos:", error.message || error);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="flex flex-col w-full">
      <div className="mx-auto max-w-[1600px] px-6 mt-8">
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { setFilter("Todos"); setPage(0); }}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              filter === "Todos" ? "bg-[var(--norvet-green)] text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Todos
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setFilter(cat.nombre); setPage(0); }}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                filter === cat.nombre ? "bg-[var(--norvet-green)] text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat.nombre}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
            >
              <div className="relative aspect-square w-full bg-white overflow-hidden">
                <Image 
                  src={product.imagen_url || "/images/placeholder.jpg"} 
                  alt={product.nombre} 
                  fill 
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-[var(--norvet-green)] text-[10px] font-bold px-3 py-1 rounded-full shadow-sm border border-emerald-100">
                    {product.categorias?.nombre}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow text-center">
                <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-[var(--norvet-green)] transition-colors">
                  {product.nombre}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-grow leading-snug">
                  {product.descripcion_corta}
                </p>
                <Link href={`/productos/${product.id}`} className="w-full py-3 rounded-2xl bg-slate-100 text-slate-700 text-center font-bold text-xs transition-all hover:bg-[var(--norvet-green)] hover:text-white active:scale-95 block shadow-sm">
                  Ver más
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {!loading && products.length === 0 && (
          <div className="col-span-full text-center py-20">
            <p className="text-xl text-gray-500">No encontramos productos en esta categoría.</p>
          </div>
        )}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-16 mb-20">
          <button
            onClick={() => loadProducts(false)}
            disabled={loading}
            className="px-12 py-4 rounded-full bg-white border-2 border-[var(--norvet-green)] text-[var(--norvet-green)] font-bold transition-all hover:bg-[var(--norvet-green)] hover:text-white shadow-md flex items-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" size={20}/>}
            {loading ? "Cargando..." : "Cargar más productos"}
          </button>
        </div>
      )}
    </div>
  );
}

