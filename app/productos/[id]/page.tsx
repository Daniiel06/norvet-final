"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import {
  Download,
  MessageCircle,
  ArrowLeft,
  Loader2,
  Beaker,
  Activity,
  ClipboardList,
  AlertTriangle,
  CheckCircle2,
  Globe,
} from "lucide-react";
import Link from "next/link";

// --- IMPORTACIONES PARA EL CARRUSEL ---
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import ProductCard from "@/components/home/ProductCard"; // Ajusta la ruta según tu carpeta
import "swiper/css";
import "swiper/css/navigation";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAllData() {
      try {
        // 1. Cargar Producto Actual
        const { data, error } = await supabase
          .from("productos")
          .select(
            `*, marcas(nombre), categorias(nombre), producto_especies(especies(nombre))`,
          )
          .eq("id", id)
          .single();

        if (error) throw error;
        setProduct(data);

        // Registrar vista
        await supabase.from("producto_vista").insert([{ product_id: id }]);

        // 2. Cargar Productos Similares (Misma categoría, excluyendo el actual)
        if (data?.categoria_id) {
          const { data: similar } = await supabase
            .from("productos")
            .select("*")
            .eq("categoria_id", data.categoria_id)
            .neq("id", id) // Que no sea el mismo producto
            .limit(10);

          setSimilarProducts(similar || []);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    loadAllData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-emerald-600" size={48} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-500">Producto no encontrado.</p>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hola Norvet, estoy interesado en el producto: ${product.nombre}. ¿Podrían darme más información?`,
  );
  const whatsappUrl = `https://wa.me/51948092846?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-[#FBFBFA] pb-20">
      {/* BREADCRUMBS */}
      <div className="max-w-[1200px] mx-auto px-6 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-400 font-medium">
          <Link href="/" className="hover:text-emerald-600 transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <Link
            href="/productos"
            className="hover:text-emerald-600 transition-colors"
          >
            Productos
          </Link>
          <span>/</span>
          <span className="text-slate-800">{product.nombre}</span>
        </nav>
      </div>

      {/* HEADER: VISUAL Y RESUMEN */}
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-square bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 overflow-hidden border border-gray-100 p-10 flex items-center justify-center group">
            <Image
              src={product.imagen_url || "/images/placeholder.jpg"}
              alt={product.nombre}
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 flex flex-wrap justify-end gap-2 max-w-[200px]">
            {product.producto_especies &&
            product.producto_especies.length > 0 ? (
              // Recorremos SOLAMENTE las especies vinculadas a ESTE producto
              product.producto_especies.map((pe: any, index: number) => (
                <span
                  key={index}
                  className="bg-slate-900 text-white px-3 py-1.5 rounded-xl shadow-xl text-xs font-bold border border-slate-700"
                >
                  {pe.especies?.nombre}
                </span>
              ))
            ) : (
              // Si el producto no tiene especies asignadas
              <span className="bg-slate-900 text-white px-4 py-2 rounded-xl shadow-xl text-xs font-bold">
                General
              </span>
            )}
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {product.categorias?.nombre}
              </span>
              {/* Divisor visual */}
              <div className="w-px h-4 bg-gray-300" />

              {/* Bloque de Fabricante (Etiqueta arriba, Nombre abajo) */}
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase font-bold leading-none mb-1">
                  Fabricante
                </span>
                <span className="text-sm font-bold text-slate-700 leading-none">
                  {product.marcas?.nombre}
                </span>
              </div>
            </div>
            <h1 className="text-5xl font-black text-slate-900 leading-tight mb-6">
              {product.nombre}
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed italic border-l-4 border-emerald-500 pl-4">
              "{product.descripcion_corta}"
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3">
              <div className="p-2 bg-gray-50 rounded-lg text-emerald-600 mt-1">
                <Globe size={20} />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[10px] text-gray-400 uppercase font-bold">
                  Presentación
                </p>
                {/* LÓGICA PARA EVITAR EL AMONTONAMIENTO */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {product.presentacion ? (
                    // Dividimos el texto por guiones, comas o saltos de línea
                    product.presentacion
                      .split(/[-\n]/)
                      .map((item: string, index: number) => (
                        <span
                          key={index}
                          className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200"
                        >
                          {item.trim()}
                        </span>
                      ))
                  ) : (
                    <p className="text-sm font-bold text-slate-700">N/A</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
              <div className="p-2 bg-gray-50 rounded-lg text-emerald-600">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">
                  Estado
                </p>
                <p
                  className={`text-sm font-bold ${product.en_stock ? "text-emerald-600" : "text-red-600"}`}
                >
                  {product.en_stock ? "Disponible" : "Sin Stock"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <a
              href={whatsappUrl}
              target="_blank"
              className="flex-1 flex items-center justify-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95"
            >
              <MessageCircle size={22} /> Consultar por WhatsApp
            </a>
            {product.ficha_tecnica_url && (
              <a
                href={product.ficha_tecnica_url}
                target="_blank"
                className="flex items-center justify-center gap-2 bg-white text-slate-800 px-6 py-4 rounded-2xl font-bold border border-gray-200 hover:bg-gray-50 transition-all shadow-sm"
              >
                <Download size={20} /> PDF
              </a>
            )}
          </div>
        </div>
      </div>

      {/* CUERPO TÉCNICO */}
      <div className="max-w-[1000px] mx-auto px-6 space-y-10">
        <section className="group relative bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="absolute -top-4 left-10 bg-white px-4 py-1 rounded-full border border-emerald-100 shadow-sm">
            <span className="text-emerald-600 font-bold text-xs flex items-center gap-2">
              <Beaker size={14} /> Información Química
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-6 mt-2">
            Composición
          </h2>
          <div className="text-slate-600 leading-loose whitespace-pre-line text-lg">
            {product.composicion || "Información técnica no disponible."}
          </div>
        </section>

        <section className="group relative bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="absolute -top-4 left-10 bg-white px-4 py-1 rounded-full border border-blue-100 shadow-sm">
            <span className="text-blue-600 font-bold text-xs flex items-center gap-2">
              <Activity size={14} /> Uso Terapéutico
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-6 mt-2">
            Indicaciones Principales
          </h2>
          <div className="text-slate-600 leading-loose whitespace-pre-line text-lg">
            {product.indicaciones || "Información técnica no disponible."}
          </div>
        </section>

        <section className="group relative bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="absolute -top-4 left-10 bg-white px-4 py-1 rounded-full border border-orange-100 shadow-sm">
            <span className="text-orange-600 font-bold text-xs flex items-center gap-2">
              <ClipboardList size={14} /> Protocolo de Aplicación
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-6 mt-2">
            Modo de Uso y Dosificaciones
          </h2>
          <div className="text-slate-600 leading-loose whitespace-pre-line text-lg">
            {product.dosificacion || "Información técnica no disponible."}
          </div>
        </section>

        {product.periodo_carencia && (
          <section className="bg-red-50 p-10 rounded-[40px] border border-red-100 shadow-inner relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-red-100 opacity-50 rotate-12">
              <AlertTriangle size={120} />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center gap-2">
                <AlertTriangle size={24} /> Carencias y Advertencias
              </h2>
              <div className="text-red-700 leading-loose whitespace-pre-line text-lg font-medium">
                {product.periodo_carencia}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* SECCIÓN DE PRODUCTOS SIMILARES - EL CARRUSEL */}
      {similarProducts.length > 0 && (
        <div className="max-w-[1200px] mx-auto px-6 mt-24 mb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-3xl font-black text-slate-900">
                Productos Relacionados
              </h3>
              <p className="text-slate-500">
                Otras soluciones en la categoría de {product.categorias?.nombre}
              </p>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="!py-4"
          >
            {similarProducts.map((simProd) => (
              <SwiperSlide key={simProd.id} className="flex justify-center">
                <ProductCard
                  id={simProd.id}
                  name={simProd.nombre}
                  image={simProd.imagen_url || "/images/placeholder.jpg"}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
