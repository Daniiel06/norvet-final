"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react"; 
import { useState } from "react";

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false);

  // CONFIGURACIÓN DE WHATSAPP
  const WHATSAPP_PHONE = "51948092846"; 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Capturamos los datos
    const formData = new FormData(e.currentTarget);
    
    const nombre = formData.get("nombre");
    const correo = formData.get("correo");
    const telefono = formData.get("telefono");
    const producto = formData.get("producto");
    const mensaje = formData.get("mensaje");

    // 2. CONSTRUCCIÓN DEL MENSAJE (Usamos \n para saltos de línea reales)
    const whatsappMessage = 
      `🚨 *NUEVA SOLICITUD DE CONTACTO* 🚨\n` + 
      `--------------------------------------------\n` +
      `🐾 *DATOS DEL CLIENTE*\n` +
      `👤 *Nombre/Veterinaria:* ${nombre}\n` +
      `📧 *Correo:* ${correo}\n` +
      `📱 *Teléfono:* ${telefono}\n` +
      `--------------------------------------------\n` +
      `📦 *DETALLES DE LA CONSULTA*\n` +
      `🔍 *Producto/Asistencia:* ${producto}\n` +
      `💬 *Mensaje:* ${mensaje}\n` +
      `--------------------------------------------\n` +
      `🌐 *Origen:* Página Web Norvet`;

    // 3. Crear la URL (encodeURIComponent ahora convertirá los \n en %0A correctamente)
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

    // 4. Abrir WhatsApp
    window.open(whatsappUrl, "_blank");

    // 5. LIMPIAR EL FORMULARIO (Esto borra todos los cuadros de texto)
    e.currentTarget.reset();

    // 6. Efecto visual de envío
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen pt-[120px] bg-gray-50 pb-20">
      <div className="mx-auto max-w-[1280px] px-6">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900"
          >
            Hablemos de <span className="text-[var(--norvet-green)]">Salud Animal</span>
          </motion.h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Estamos listos para asesorarte en la elección de los mejores productos para tu clínica o negocio veterinario.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LADO IZQUIERDO: Formulario */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Nombre Completo / Veterinaria</label>
                <input name="nombre" type="text" required placeholder="Ej. Clínica Veterinaria San Roque" className="px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:border-[var(--norvet-green)] focus:ring-2 focus:ring-[var(--norvet-green)]/20 transition-all" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Correo Electrónico</label>
                <input name="correo" type="email" required placeholder="correo@ejemplo.com" className="px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:border-[var(--norvet-green)] focus:ring-2 focus:ring-[var(--norvet-green)]/20 transition-all" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Teléfono de Contacto</label>
                <input name="telefono" type="tel" required placeholder="+51 948 092 846" className="px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:border-[var(--norvet-green)] focus:ring-2 focus:ring-[var(--norvet-green)]/20 transition-all" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 ml-1">¿En qué producto necesita asistencia?</label>
                <input name="producto" type="text" required placeholder="Ej. Vacunas, Equipos o nombre del producto" className="px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:border-[var(--norvet-green)] focus:ring-2 focus:ring-[var(--norvet-green)]/20 transition-all" />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Mensaje</label>
                <textarea name="mensaje" rows={4} required placeholder="Escriba aquí sus requerimientos o dudas..." className="px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:border-[var(--norvet-green)] focus:ring-2 focus:ring-[var(--norvet-green)]/20 transition-all" />
              </div>

              <div className="md:col-span-2 flex justify-center mt-4">
                <button type="submit" className="group relative px-8 py-3 bg-[var(--norvet-green)] text-white font-bold rounded-full shadow-md hover:bg-[var(--norvet-green-dark)] transition-all hover:scale-105 active:scale-95 flex items-center gap-3 text-sm">
                  {submitted ? (
                    <>
                      <span className="animate-bounce">✓</span> Mensaje Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensaje <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* LADO DERECHO: Información y Redes */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Contacto Directo</h3>
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4 group">
                  <div className="bg-[var(--norvet-green-light)] p-4 rounded-2xl text-[var(--norvet-green)] group-hover:bg-[var(--norvet-green)] group-hover:text-white transition-all">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Teléfono</p>
                    <p className="text-lg font-semibold text-slate-800">+51 999 999 999</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="bg-[var(--norvet-green-light)] p-4 rounded-2xl text-[var(--norvet-green)] group-hover:bg-[var(--norvet-green)] group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Correo Electrónico</p>
                    <p className="text-lg font-semibold text-slate-800">ventas@norvet.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="bg-[var(--norvet-green-light)] p-4 rounded-2xl text-[var(--norvet-green)] group-hover:bg-[var(--norvet-green)] group-hover:text-white transition-all">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Ubicación</p>
                    <p className="text-lg font-semibold text-slate-800">Av. Principal 123, Ciudad</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[var(--norvet-green)] p-8 rounded-[40px] shadow-xl text-white"
            >
              <h3 className="text-2xl font-bold mb-6">Síguenos</h3>
              <div className="flex gap-4">
                <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[var(--norvet-green)] transition-all hover:scale-110" aria-label="Facebook">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3v-4h-3V7a5 5 0 0 1 5-5z"/></svg>
                </a>
                <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[var(--norvet-green)] transition-all hover:scale-110" aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[var(--norvet-green)] transition-all hover:scale-110" aria-label="TikTok">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61.01 3.91-.02.08 1.53.63 2.05 1.17 2.59 1.53.01 2.43 1.32 2.43 1.32s-1.15.61-2.31.61c-1.16 0-2.31-.61-2.31-.61-.08-1.53-.63-2.05-1.17-2.59-1.53-.01-2.43-1.32-2.43-1.32s1.15-.61 2.31-.61c1.16 0 2.31.61 2.31.61zM12 12c0-2.21 1.79-4 4-4v4h-4zM12 16c-2.21 0-4-1.79-4-4v4h4z"/></svg>
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}

