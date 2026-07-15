"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, 
  CartesianGrid, Legend 
} from "recharts";
import { CheckCircle2, TrendingUp, AlertCircle, CheckCircle, Package } from "lucide-react";

export function AdminAnalytics() {
  const [data, setData] = useState<any>({
    speciesDist: [],
    topProducts: [],
    completionRate: 0,
    failedSearches: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      setLoading(true);
      try {
        // 1. Distribución por Especie
        const { data: speciesData } = await supabase
          .from("productos")
          .select("especie_id");
        
        const counts: any = {};
        // Aquí simplificamos el conteo para el ejemplo
        // En un proyecto real, usaríamos una función de agregación de Supabase
        const { data: speciesNames } = await supabase.from("especies").select("*");
        
        const speciesDistribution = speciesNames?.map(s => {
          const count = speciesData?.filter(p => p.especie_id === s.id).length || 0;
          return { name: s.nombre, value: count };
        }) || [];

        // 2. Top Productos (Vistas)
        const { data: views } = await supabase
          .from("product_views")
          .select("product_id");
        
        const productCounts: any = {};
        views?.forEach(v => { productCounts[v.product_id] = (productCounts[v.product_id] || 0) + 1 });
        
        const sortedProducts = Object.entries(productCounts)
          .map(([id, count]) => ({ id, count }))
          .sort((a: any, b: any) => b.count - a.count)
          .slice(0, 5);

        const topProductsData = await Promise.all(
          sortedProducts.map(async (p) => {
            const { data } = await supabase.from("productos").select("nombre").eq("id", p.id).single();
            return { name: data?.nombre || "Desconocido", count: p.count };
          })
        );

        // 3. Tasa de Completitud (Tienen PDF e Imagen)
        const { data: allProds } = await supabase.from("productos").select("imagen_url, ficha_tecnica_url");
        const complete = allProds?.filter(p => p.imagen_url && p.ficha_tecnica_url).length || 0;
        const rate = allProds ? Math.round((complete / allProds.length) * 100) : 0;

        // 4. Búsquedas Fallidas (Bonus)
        const { data: fails } = await supabase.from("failed_searches").select("query").order("created_at", { ascending: false }).limit(5);

        setData({
          speciesDist: speciesDistribution,
          topProducts: topProductsData,
          completionRate: rate,
          failedSearches: fails || []
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  if (loading) return <div className="flex justify-center p-20 text-emerald-600 font-bold">Cargando Analíticas...</div>;

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* KPI 1: Distribución de Especies (Donut Chart) */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Package size={20} className="text-emerald-500" /> Distribución de Catálogo
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data.speciesDist} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {data.speciesDist.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4 w-full">
          {data.speciesDist.map((s: any, i: number) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              {s.name}
            </div>
          ))}
        </div >
      </div>

      {/* KPI 2: Popularidad (Bar Chart) */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <TrendingUp size={20} className="text-blue-500" /> Top Productos Vistos
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.topProducts}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip cursor={{fill: '#f8fafc'}} />
              <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* KPI 3: Salud del Catálogo (Gauge/Progress) */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <CheckCircle2 size={20} className="text-emerald-500" /> Calidad del Catálogo
        </h3>
        <div className="relative h-32 w-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
            <circle cx="64" cy="//64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" 
              strokeDasharray={364.4} strokeDashoffset={364.4 - (364.4 * data.completionRate) / 100}
              className="text-emerald-500 transition-all duration-1000" 
              strokeLinecap="round" 
            />
          </svg>
          <span className="absolute text-3xl font-black text-slate-800">{data.completionRate}%</span>
        </div>
        <p className="mt-4 text-sm text-gray-500">de los productos tienen foto y PDF</p>
      </div>

      {/* BONUS: Búsquedas Fallidas (Técnica de Oportunidad) */}
      <div className="lg:col-span-3 bg-slate-900 p-8 rounded-[40px] text-white shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <AlertCircle size={24} className="text-rose-400" />
            <h3 className="text-xl font-bold">Oportunidades de Mercado (Búsquedas Fallidas)</h3>
          </div>
          <span className="text-xs bg-rose-500/20 text-rose-400 px-3 py-1 rounded-full border border-rose-500/30 font-//bold">
            Datos en tiempo real
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {data.failedSearches.length > 0 ? (
            data.failedSearches.map((f: any, i: number) => (
              <div key={i} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex items-center gap-3 hover:bg-slate-700 transition-all">
                <div className="w-2 h-2 bg-rose-500 rounded-full" />
                <span className="text-sm font-medium text-slate-200 truncate">{f.query}</span>
              </div>
            ))
          ) : (
            <p className="text-slate-400 italic text-sm">No hay búsquedas fallidas recientes. ¡Tu catálogo está completo!</p>
          )}
        </div>
      </div>
    </div>
  );
}
