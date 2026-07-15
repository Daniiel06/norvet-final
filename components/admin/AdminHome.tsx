"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Package, Tag, Bug, Newspaper, TrendingUp } from "lucide-react";
import { BulkUpload } from "./BulkUpload";

export function AdminHome() {
  const [stats, setStats] = useState({
    productos: 0,
    categorias: 0,
    marcas: 0,
    especies: 0,
    noticias: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      // Contamos los registros de cada tabla
      const { count: pCount } = await supabase.from("productos").select("*", { count: 'exact', head: true });
      const { count: cCount } = await supabase.from("categorias").select("*", { count: 'exact', head: true });
      const { count: mCount } = await supabase.from("marcas").select("*", { count: 'exact', head: true });
      const { count: eCount } = await supabase.from("especies").select("*", { count: 'exact', head: true });
      const { count: nCount } = await supabase.from("noticias").select("*", { count: 'exact', head: true });

      setStats({
        productos: pCount || 0,
        categorias: cCount || 0,
        marcas: mCount || 0,
        especies: eCount || 0,
        noticias: nCount || 0,
      });
      setLoading(false);
    }
    loadStats();
  }, []);

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-emerald-500" size={40}/></div>;

  const cards = [
    { name: "Productos", value: stats.productos, icon: <Package className="text-blue-500" />, color: "bg-blue-50" },
    { name: "Categorías", value: stats.categorias, icon: <Tag className="text-emerald-500" />, color: "bg-emerald-50" },
    { name: "Marcas", value: stats.marcas, icon: <TrendingUp className="text-purple-500" />, color: "bg-purple-50" },
    { name: "Especies", value: stats.especies, icon: <Bug className="text-orange-500" />, color: "bg-orange-50" },
    { name: "Noticias", value: stats.noticias, icon: <Newspaper className="text-rose-500" />, color: "bg-rose-50" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-emerald-600 p-8 rounded-3xl text-white shadow-lg">
        <h2 className="text-3xl font-bold mb-2">¡Hola, Administrador! </h2>
        <p className="opacity-90">Bienvenido al panel de control de Norvet. Aquí puedes gestionar todo tu catálogo veterinario.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {cards.map((card) => (
          <div key={card.name} className={`${card.color} p-6 rounded-3xl border border-gray-100 flex flex-col items-center justify-center text-center shadow-sm`}>
            <div className="p-3 bg-white rounded-2xl shadow-sm mb-4">{card.icon}</div>
            <span className="text-gray-500 text-sm font-medium">{card.name}</span>
            <span className="text-3xl font-bold text-slate-800">{card.value}</span>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* SUSTITUYE EL BOTÓN DE SUBIR PRODUCTOS POR ESTO */}
          <div className="p-4 text-left border rounded-2xl bg-white flex flex-col gap-4 shadow-sm">
            <div>
              <p className="font-bold text-slate-700">Subir nuevos productos</p>
              <p className="text-xs text-gray-400 mb-4">Carga masiva desde Excel/CSV</p>
          </div>
          <BulkUpload />
        </div>
          <button className="p-4 text-left border rounded-2xl hover:bg-gray-50 transition-all">
            <p className="font-bold text-slate-700">Publicar Noticia</p>
            <p className="text-xs text-gray-400">Mantén a tus clientes informados</p>
          </button>
          
        </div>
      </div>
    </div>
  );
}

// Importa Loader2 desde lucide-react
import { Loader2 } from "lucide-react";
