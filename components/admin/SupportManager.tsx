"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, Plus, Loader2, Edit2, Check, X } from "lucide-react";

interface SupportManagerProps {
  tableName: string;
  title: string;
}

export function SupportManager({ tableName, title }: SupportManagerProps) {
  const [items, setItems] = useState<any[]>([]);
  const [newItem, setNewItem] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Estados para la edición
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    loadItems();
  }, [tableName]);

  async function loadItems() {
    const { data } = await supabase
      .from(tableName)
      .select("*")
      .order("nombre", { ascending: true });
    setItems(data || []);
  }

  async function handleAdd() {
    if (!newItem.trim()) return;
    setLoading(true);
    try {
      const { error } = await supabase.from(tableName).insert([{ nombre: newItem }]);
      if (error) throw error;
      setNewItem("");
      await loadItems();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate() {
    if (!editValue.trim()) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from(tableName)
        .update({ nombre: editValue })
        .eq("id", editingId);
      
      if (error) throw error;
      setEditingId(null);
      setEditValue("");
      await loadItems();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm(`¿Eliminar ${title} seleccionado?`)) {
      setLoading(true);
      try {
        const { error } = await supabase.from(tableName).delete().eq("id", id);
        if (error) throw error;
        await loadItems();
      } catch (error: any) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {/* BARRA DE AGREGADO */}
      <div className="flex gap-2">
        <input 
          type="text" 
          value={newItem} 
          onChange={(e) => setNewItem(e.target.value)}
          placeholder={`Nuevo/a ${title}...`} 
          className="flex-grow p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
        />
        <button 
          onClick={handleAdd} 
          disabled={loading} 
          className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 disabled:bg-gray-400"
        >
          {loading ? <Loader2 className="animate-spin" size={20}/> : <Plus size={20}/>} 
          Agregar
        </button>
      </div>

      {/* TABLA DE ELEMENTOS */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4 font-bold border-b">Nombre</th>
              <th className="p-4 font-bold border-b text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-slate-600">
            {items.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors group">
                <td className="p-4">
                  {editingId === item.id ? (
                    // MODO EDICIÓN: Input para cambiar el nombre
                    <input 
                      type="text" 
                      className="p-1.5 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 w-full"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    // MODO VISTA: Nombre normal
                    <span className="font-medium">{item.nombre}</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    {editingId === item.id ? (
                      // BOTONES DE GUARDAR / CANCELAR
                      <>
                        <button 
                          onClick={handleUpdate} 
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" 
                          title="Guardar"
                        >
                          <Check size={18}/>
                        </button>
                        <button 
                          onClick={() => { setEditingId(null); setEditValue(""); }} 
                          className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Cancelar"
                        >
                          <X size={18}/>
                        </button>
                      </>
                    ) : (
                      // BOTONES DE EDITAR / ELIMINAR
                      <>
                        <button 
                          onClick={() => { setEditingId(item.id); setEditValue(item.nombre); }} 
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={18}/>
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)} 
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={18}/>
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={2} className="p-10 text-center text-gray-400 italic">
                  No hay {title.toLowerCase()} registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
