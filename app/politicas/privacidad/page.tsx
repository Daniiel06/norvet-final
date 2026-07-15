"use client";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-emerald-600 font-medium mb-8 hover:translate-x-1 transition-transform">
          <ArrowLeft size={20} /> Volver al inicio
        </Link>
        
        <div className="flex items-center gap-4 mb-8">
          <ShieldCheck size={40} className="text-emerald-600" />
          <h1 className="text-4xl font-black text-slate-900">Política de Privacidad</h1>
        </div>
        
        <div className="space-y-8 text-slate-600 leading-relaxed">
          <section className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 mb-8">
            <p className="text-emerald-800 font-medium">
              En cumplimiento con la <strong>Ley N° 29733 (Ley de Protección de Datos Personales de Perú)</strong>, informamos a nuestros usuarios el tratamiento de sus datos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">1. Datos que Recolectamos</h2>
            <p>A través de nuestros formularios de contacto, recolectamos datos básicos como: Nombre, Teléfono de contacto y Producto de interés.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">2. Finalidad del Tratamiento</h2>
            <p>Los datos recolectados tienen como única finalidad facilitar el contacto comercial vía WhatsApp, brindar asesoría técnica sobre los productos y gestionar el proceso de venta.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">3. Consentimiento</h2>
            <p>Al hacer clic en el botón de envío de nuestro formulario, el usuario otorga su consentimiento libre y expreso para que Norvet Salud Animal trate sus datos personales según lo descrito en esta política.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">4. Derechos ARCO</h2>
            <p>El usuario tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos. Para ejercer estos derechos, puede escribirnos a <strong>ventas@norvet.com</strong>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
