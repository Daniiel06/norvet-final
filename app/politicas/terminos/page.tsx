"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-emerald-600 font-medium mb-8 hover:translate-x-1 transition-transform"
        >
          <ArrowLeft size={20} /> Volver al inicio
        </Link>

        <h1 className="text-4xl font-black text-slate-900 mb-8">
          Términos y Condiciones
        </h1>

        <div className="space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">
              1. Aceptación de los Términos
            </h2>
            <p>
              Al acceder y utilizar el catálogo digital de Norvet Salud Animal,
              el usuario acepta cumplir con los presentes términos y
              condiciones. Si no está de acuerdo con alguno de los puntos, le
              recomendamos no utilizar el sitio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">
              2. Uso de la Información
            </h2>
            <p>
              Toda la información técnica, composiciones y dosificaciones
              presentadas en este catálogo son referenciales. Norvet Salud
              Animal se esfuerza por mantener la exactitud de los datos, pero el
              profesional veterinario es el responsable final de la aplicación
              de cualquier producto.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">
              3. Propiedad Intelectual
            </h2>
            <p>
              El diseño, logotipos, imágenes y estructura de este sitio son
              propiedad exclusiva de Norvet Salud Animal. Queda prohibida la
              reproducción total o parcial sin autorización previa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">
              4. Limitación de Responsabilidad
            </h2>
            <p>
              Norvet no se hace responsable por el uso inadecuado de los
              productos descritos en el catálogo. La venta de productos
              veterinarios está sujeta a la normativa legal vigente en el Perú.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">
              5. Créditos de Recursos Visuales
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Para el diseño de la interfaz de usuario, se han utilizado
              recursos gráficos proporcionados por
              <a
                href="https://www.flaticon.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 font-medium hover:underline ml-1"
              >
                Flaticon
              </a>
              . El uso de estos elementos se realiza bajo la Licencia Gratuita
              de Atribución de Flaticon.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
