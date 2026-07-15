"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; // Importamos la conexión a Supabase

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 1. Llamada real a Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      if (data.user) {
        alert("¡Bienvenido Administrador!");
        router.push("/admin/dashboard"); // Redirigir al panel
        router.refresh(); // Refrescar para que el sistema reconozca la sesión
      }
    } catch (error: any) {
      alert("Error de acceso: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">Panel Norvet</h1>
          <p className="text-gray-500">Acceso restringido para administradores</p>
        </div>
        <input 
          type="email" placeholder="Correo electrónico" 
          className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" 
          onChange={(e) => setEmail(e.target.value)} required 
        />
        <input 
          type="password" placeholder="Contraseña" 
          className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" 
          onChange={(e) => setPassword(e.target.value)} required 
        />
        <button disabled={loading} className="bg-[var(--norvet-green)] text-white p-3 rounded-full font-bold hover:bg-emerald-700 transition-all">
          {loading ? "Verificando..." : "Ingresar al Panel"}
        </button>
      </form>
    </div>
  );
}
