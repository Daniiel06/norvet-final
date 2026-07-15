"use client"; // <--- ÚNICA VEZ Y AL PRINCIPIO
import { useState, useEffect } from "react"; // Importamos useEffect aquí
import { LayoutDashboard,Package, Tag, Bug, Newspaper, LogOut,TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { AdminHome } from "@/components/admin/AdminHome";
import { AdminAnalytics } from "@/components/admin/AdminAnalytics";


// IMPORTAMOS los componentes desde la carpeta components
import { ProductManager } from "@/components/admin/ProductManager";
import { SupportManager } from "@/components/admin/SupportManager";
import { NewsManager } from "@/components/admin/NewsManager";

// === ESTA ES LA LÍNEA QUE FALTABA ===
import { supabase } from "@/lib/supabase"; 
// ====================================

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("inicio");
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      // Ahora 'supabase' ya está importado y no dará error
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Si no hay sesión activa, mandarlo al login inmediatamente
        router.push("/admin/login");
      }
    }
    checkSession();
  }, [router]);

  const menuItems = [
    { id: "inicio", name: "Inicio", icon: <LayoutDashboard size={20}/> },
    { id: "analiticas", name: "Estadísticas", icon: <TrendingUp size={20}/> },
    { id: "productos", name: "Productos", icon: <Package size={20}/> },
    { id: "categorias", name: "Categorías", icon: <Tag size={20}/> },
    { id: "especies", name: "Especies", icon: <Bug size={20}/> },
    { id: "marcas", name: "Marcas", icon: <Tag size={20}/> },
    { id: "noticias", name: "Noticias", icon: <Newspaper size={20}/> },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 text-center border-b border-slate-800">
          <h2 className="text-xl font-bold text-emerald-400">Norvet Admin</h2>
        </div>
        <nav className="flex-grow p-4 flex flex-col gap-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                activeTab === item.id ? "bg-emerald-600 text-white" : "text-gray-400 hover:bg-slate-800"
              }`}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </nav>
        <button onClick={() => router.push("/admin/login")} className="p-6 flex items-center gap-3 text-red-400 hover:bg-red-900/20 transition-all border-t border-slate-800">
          <LogOut size={20}/> Cerrar Sesión
        </button>
      </aside>

      <main className="flex-grow p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 capitalize">
            Gestión de {activeTab}
          </h1>
        </header>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 min-h-[500px]">
          {activeTab === "inicio" && <AdminHome />}
          {activeTab === "analiticas" && <AdminAnalytics />}
          {activeTab === "productos" && <ProductManager />}
          {activeTab === "categorias" && <SupportManager tableName="categorias" title="Categoría" />}
          {activeTab === "especies" && <SupportManager tableName="especies" title="Especie" />}
          {activeTab === "marcas" && <SupportManager tableName="marcas" title="Marca" />}
          {activeTab === "noticias" && <NewsManager />} 
        </div>
      </main>
    </div>
  );
}


