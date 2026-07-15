"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import * as XLSX from "xlsx";
import { Upload, FileText, Loader2, CheckCircle2, X } from "lucide-react";

interface UploadError {
  row: number;
  message: string;
}

interface UploadStatus {
  success: number;
  errors: UploadError[];
}

export function BulkUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<UploadStatus>({
    success: 0,
    errors: [],
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setStatus({ success: 0, errors: [] });
      setProgress(0);
    }
  };

  const handleStartUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setStatus({ success: 0, errors: [] });
    setProgress(0);

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);

        const errors: UploadError[] = [];
        let successCount = 0;

        const { data: categories } = await supabase
          .from("categorias")
          .select("id, nombre");
        const { data: brands } = await supabase
          .from("marcas")
          .select("id, nombre");
        const { data: species } = await supabase
          .from("especies")
          .select("id, nombre");

        for (let i = 0; i < data.length; i++) {
          const row: any = data[i];
          try {
            const catId = categories?.find(
              (c) =>
                c.nombre.trim().toLowerCase() ===
                row.categoria?.trim().toLowerCase(),
            )?.id;
            const brandId = brands?.find(
              (b) =>
                b.nombre.trim().toLowerCase() ===
                row.marca?.trim().toLowerCase(),
            )?.id;

            if (!catId || !brandId) {
              const missing = [];
              if (!catId) missing.push(`Cat: ${row.categoria}`);
              if (!brandId) missing.push(`Mar: ${row.marca}`);
              throw new Error(
                `Fila ${i + 2}: No se encontró ${missing.join(", ")}`,
              );
            }

            const { data: newProduct, error: pError } = await supabase
              .from("productos")
              .insert([
                {
                  nombre: row.nombre,
                  marca_id: brandId,
                  categoria_id: catId,
                  presentacion: row.presentacion,
                  descripcion_corta: row.descripcion_corta,
                  composicion: row.composicion,
                  indicaciones: row.indicaciones,
                  dosificacion: row.dosificacion,
                  periodo_carencia: row.periodo_carencia,
                  imagen_url: row.imagen_url,
                  ficha_tecnica_url: row.pdf_url,
                  en_stock: true,
                },
              ])
              .select()
              .single();

            if (pError) throw pError;

            if (row.especies) {
              const speciesNames = row.especies
                .split(",")
                .map((s: string) => s.trim());
              const speciesRelations = [];
              for (const sName of speciesNames) {
                const sId = species?.find(
                  (s) => s.nombre.trim().toLowerCase() === sName.toLowerCase(),
                )?.id;
                if (sId) {
                  speciesRelations.push({
                    producto_id: newProduct.id,
                    especie_id: sId,
                  });
                }
              }
              if (speciesRelations.length > 0) {
                await supabase
                  .from("producto_especies")
                  .insert(speciesRelations);
              }
            }
            successCount++;
          } catch (err: any) {
            errors.push({ row: i + 2, message: err.message });
          }
          setProgress(Math.round(((i + 1) / data.length) * 100));
        }
        setStatus({ success: successCount, errors });
        setLoading(false);
      } catch (err) {
        alert("Error procesando el archivo Excel");
        setLoading(false);
      }
    };
    reader.readAsBinaryString(selectedFile);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
          <Upload size={24} />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-slate-800">Carga Masiva</h2>
          <p className="text-sm text-gray-500">
            Importar inventario desde .xlsx
          </p>
        </div>
      </div>

      <div
        className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-3xl transition-all cursor-pointer relative ${selectedFile ? "border-emerald-400 bg-emerald-50/30" : "border-gray-200 bg-gray-50 hover:bg-gray-100"}`}
      >
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileSelect}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        {selectedFile ? (
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="p-4 bg-emerald-100 text-emerald-600 rounded-full mb-2">
              <FileText size={32} />
            </div>
            <p className="text-slate-800 font-bold">{selectedFile.name}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
              }}
              className="mt-2 text-xs text-red-500 hover:underline flex items-center gap-1"
            >
              <X size={12} /> Cambiar archivo
            </button>
          </div>
        ) : (
          <>
            <FileText size={48} className="text-gray-300 mb-4" />
            <p className="text-slate-600 font-medium">
              Arrastra tu archivo Excel aquí
            </p>
          </>
        )}
      </div>

      {selectedFile && (
        <button
          onClick={handleStartUpload}
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 disabled:bg-gray-400"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Upload size={20} />
          )}
          {loading ? "Procesando..." : "Iniciar Carga Masiva"}
        </button>
      )}

      {loading && (
        <div className="w-full space-y-3">
          <div className="flex justify-between text-sm font-medium text-slate-600">
            <span>Importando...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {status.success > 0 && (
        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-700">
          <CheckCircle2 size={20} />
          <span className="font-medium">
            Se importaron {status.success} productos.
          </span>
        </div>
      )}

      {status.errors.length > 0 && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl">
          <h3 className="text-red-700 font-bold text-sm mb-2">Errores:</h3>
          <div className="max-h-40 overflow-y-auto space-y-1">
            {status.errors.map((err, i) => (
              <p key={i} className="text-xs text-red-500">
                • {err.message}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
