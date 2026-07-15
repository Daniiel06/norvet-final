"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Edit, Loader2 } from "lucide-react";

export function NewsManager() {
  const [news, setNews] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ titulo: "", contenido: "", categoria: "", imagen: null as File | null });

  useEffect(() => { loadNews(); }, []);

  async function loadNews() {
    const { data } = await supabase.from("noticias").select("*").order("fecha_creacion", { ascending: false });
    setNews(data || []);
  }

  async function handleSaveNews(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      let image_url = "";
      if (formData.imagen) {
        const fileName = `${Date.now()}-news-${formData.imagen.name}`;
        await supabase.storage.from("product-images").upload(fileName, formData.imagen);
        image_url = supabase.storage.from("product-images").getPublicUrl(fileName).data.publicUrl;
      }

      const payload = { titulo: formData.titulo, contenido: formData.contenido, categoria: formData.categoria, imagen_url: image_url };

      if (editingId) {
        await supabase.from("noticias").update(payload).eq("id", editingId);
      } else {
        await supabase.from("noticias").insert([payload]);
      }
      
      alert("Noticia guardada con éxito");
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({ titulo: "", contenido: "", categoria: "", imagen: null });
      loadNews();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteNews(id: string) {
    if (confirm("¿Eliminar noticia?")) {
      await supabase.from("noticias").delete().eq("id", id);
      loadNews();
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-700">Gestión de Noticias y Novedades</h2>
        <button onClick={() => { setEditingId(null); setIsModalOpen(true); }} className="bg-emerald-600 text-white px-6 py-2 rounded-full font-bold hover:bg-emerald-700 transition-all flex items-center gap-2">
          <Plus size={20}/> Nueva Noticia
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {news.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex gap-4 items-center shadow-sm">
            <img src={item.imagen_url} className="w-20 h-20 rounded-xl object-cover" alt={item.titulo} />
            <div className="flex-grow">
              <h3 className="font-bold text-slate-800">{item.titulo}</h3>
              <p className="text-xs text-gray-400">{new Date(item.fecha_creacion).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => { setEditingId(item.id); setFormData({titulo: item.titulo, contenido: item.contenido, categoria: item.categoria, imagen: null}); setIsModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={18}/></button>
              <button onClick={() => deleteNews(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">{editingId ? "Editar" : "Nueva"} Noticia</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400">✕</button>
            </div>
            <form onSubmit={handleSaveNews} className="flex flex-col gap-4">
              <input type="text" placeholder="Título de la noticia" required className="p-3 border rounded-xl" onChange={e => setFormData({...formData, titulo: e.target.value})} value={formData.titulo} />
              <input type="text" placeholder="Categoría (Ej: Eventos, Lanzamientos)" className="p-3 border rounded-xl" onChange={e => setFormData({...formData, categoria: e.target.value})} value={formData.categoria} />
              <textarea placeholder="Contenido de la noticia" required className="p-3 border rounded-xl h-40" onChange={e => setFormData({...formData, contenido: e.target.value})} value={formData.contenido} />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Imagen de portada</label>
                <input type="file" accept="image/*" className="text-sm" onChange={e => setFormData({...formData, imagen: e.target.files?.[0] || null})} />
              </div>
              <button disabled={loading} className="bg-emerald-600 text-white p-3 rounded-full font-bold hover:bg-emerald-700 transition-all">
                {loading ? "Guardando..." : "Guardar Noticia"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

