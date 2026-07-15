"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

const FAQS = [
  {
    q: "¿Cómo puedo realizar un pedido?",
    a: "Puedes seleccionar los productos de nuestro catálogo y hacer clic en el botón de WhatsApp. Un asesor comercial te atenderá inmediatamente para coordinar la compra."
  },
  {
    q: "¿Hacen envíos a todo el Perú?",
    a: "Sí, contamos con logística de distribución a nivel nacional. El tiempo de entrega depende de la ubicación de su clínica o establecimiento."
  },
  {
    q: "¿Los productos cuentan con registro sanitario?",
    a: "Todos nuestros productos son importados y distribuidos bajo las normas vigentes y cuentan con los registros sanitarios correspondientes."
  },
  {
    q: "¿Cuál es la forma de pago?",
    a: "Aceptamos transferencias bancarias, depósitos y otros medios de pago coordinados directamente con nuestro equipo de ventas."
  },
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-emerald-600 font-medium mb-8 hover:translate-x-1 transition-transform">
          <ArrowLeft size={20} /> Volver al inicio
        </Link>
        
        <h1 className="text-4xl font-black text-slate-900 mb-4 text-center">Preguntas Frecuentes</h1>
        <p className="text-center text-slate-500 mb-12">Encuentra respuestas rápidas a tus dudas más comunes.</p>
        
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all shadow-sm">
              <button 
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full p-5 flex justify-between items-center text-left font-bold text-slate-800 hover:bg-gray-50 transition-colors"
              >
                {faq.q}
                {openIdx === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {openIdx === i && (
                <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-gray-50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
