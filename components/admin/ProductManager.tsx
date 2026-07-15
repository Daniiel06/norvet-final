"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Edit, Loader2, FileText, Search, X } from "lucide-react";
import { motion } from "framer-motion";

export function ProductManager() {
  // --- ESTADOS DE DATOS ---
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [species, setSpecies] = useState<any[]>([]);
  

  // --- ESTADOS DE CONTROL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // --- ESTADOS DE BÚSQUEDA Y PAGINACIÓN ---
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  // --- ESTADO DEL FORMULARIO ---
  const [formData, setFormData] = useState({
    nombre: "",
    marca_id: "",
    categoria_id: "",
    especies_ids: [] as string[],
    presentacion: "",
    descripcion_corta: "",
    composicion: "",
    indicaciones: "",
    dosificacion: "",
    periodo_carencia: "",
    imagen: null as File | null,
    pdf: null as File | null,
    en_stock: true,
  });

  // Carga datos maestros solo una vez al montar el componente
  useEffect(() => {
    loadInitialData();
  }, []);

  // Carga productos cada vez que cambie la página o la búsqueda
  useEffect(() => {
    loadProducts();
  }, [currentPage, searchQuery]);

  async function loadInitialData() {
    const { data: cat } = await supabase
      .from("categorias")
      .select("*")
      .order("nombre");
    const { data: bra } = await supabase
      .from("marcas")
      .select("*")
      .order("nombre");
    const { data: esp } = await supabase
      .from("especies")
      .select("*")
      .order("nombre");
    setCategories(cat || []);
    setBrands(bra || []);
    setSpecies(esp || []);
  }

  async function loadProducts() {
    setLoading(true);
    try {
      const from = (currentPage - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from("productos")
        .select(
          `*, marcas(nombre), categorias(nombre), producto_especies(especies(id, nombre))`,
          { count: "exact" },
        )
        .order("nombre", { ascending: true })
        .range(from, to);

      if (searchQuery) {
        query = query.ilike("nombre", `%${searchQuery}%`);
      }

      const { data, count, error } = await query;
      if (error) throw error;

      setProducts(data || []);
      setTotalPages(Math.ceil((count || 0) / pageSize));
    } catch (error: any) {
      console.error("Error cargando productos:", error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSpeciesChange = (id: string) => {
    const current = [...formData.especies_ids];
    if (current.includes(id)) {
      setFormData({
        ...formData,
        especies_ids: current.filter((i) => i !== id),
      });
    } else {
      setFormData({ ...formData, especies_ids: [...current, id] });
    }
  };

  function handleEdit(product: any) {
    setEditingId(product.id);
    const selectedSpecies = product.producto_especies
      ? product.producto_especies
          .map((pe: any) => pe.especies?.id)
          .filter(Boolean)
      : [];

    setFormData({
      nombre: product.nombre,
      marca_id: product.marca_id,
      categoria_id: product.categoria_id,
      especies_ids: selectedSpecies,
      presentacion: product.presentacion,
      descripcion_corta: product.descripcion_corta,
      composicion: product.composicion,
      indicaciones: product.indicaciones,
      dosificacion: product.dosificacion,
      periodo_carencia: product.periodo_carencia,
      imagen: null,
      pdf: null,
      en_stock: product.en_stock,
    });
    setIsModalOpen(true);
  }

  async function handleSaveProduct(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      let image_url = null;
      let pdf_url = null;

      if (formData.imagen) {
        const fileName = `${Date.now()}-img-${formData.imagen.name}`;
        await supabase.storage
          .from("product-images")
          .upload(fileName, formData.imagen);
        image_url = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName).data.publicUrl;
      }
      if (formData.pdf) {
        const fileName = `${Date.now()}-pdf-${formData.pdf.name}`;
        await supabase.storage
          .from("technical-sheets")
          .upload(fileName, formData.pdf);
        pdf_url = supabase.storage
          .from("technical-sheets")
          .getPublicUrl(fileName).data.publicUrl;
      }

      const payload: any = {
        nombre: formData.nombre,
        marca_id: formData.marca_id,
        categoria_id: formData.categoria_id,
        presentacion: formData.presentacion,
        descripcion_corta: formData.descripcion_corta,
        composicion: formData.composicion,
        indicaciones: formData.indicaciones,
        dosificacion: formData.dosificacion,
        periodo_carencia: formData.periodo_carencia,
        imagen_url:
          image_url ||
          (editingId
            ? (
                await supabase
                  .from("productos")
                  .select("imagen_url")
                  .eq("id", editingId)
                  .single()
              ).data?.imagen_url
            : null),
        ficha_tecnica_url:
          pdf_url ||
          (editingId
            ? (
                await supabase
                  .from("productos")
                  .select("ficha_tecnica_url")
                  .eq("id", editingId)
                  .single()
              ).data?.ficha_tecnica_url
            : null),
        en_stock: formData.en_stock,
      };

      let productId = editingId;
      if (editingId) {
        await supabase.from("productos").update(payload).eq("id", editingId);
      } else {
        const { data, error } = await supabase
          .from("productos")
          .insert([payload])
          .select()
          .single();
        if (error) throw error;
        productId = data.id;
      }

      await supabase
        .from("producto_especies")
        .delete()
        .eq("producto_id", productId);
      if (formData.especies_ids.length > 0) {
        const speciesInsert = formData.especies_ids.map((id) => ({
          producto_id: productId,
          especie_id: id,
        }));
        await supabase.from("producto_especies").insert(speciesInsert);
      }

      alert("Guardado con éxito");
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({
        nombre: "",
        marca_id: "",
        categoria_id: "",
        especies_ids: [],
        presentacion: "",
        descripcion_corta: "",
        composicion: "",
        indicaciones: "",
        dosificacion: "",
        periodo_carencia: "",
        imagen: null,
        pdf: null,
        en_stock: true,
      });
      loadProducts();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(id: string) {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      await supabase.from("productos").delete().eq("id", id);
      loadProducts();
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER CON BUSCADOR */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-slate-700">
            Catálogo de Productos
          </h2>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder="Buscar producto..."
              className="w-full p-2 pl-10 border rounded-full text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={16}
            />
          </div>

          <button
            onClick={() => {
              setEditingId(null);
              setIsModalOpen(true);
            }}
            className="bg-emerald-600 text-white px-6 py-2 rounded-full font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={20} /> Nuevo Producto
          </button>
        </div>
      </div>

      {/* TABLA DE PRODUCTOS */}
      <div className="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
            <tr className="border-b">
              <th className="p-4 font-medium">Producto</th>
              <th className="p-4 font-medium">Marca</th>
              <th className="p-4 font-medium">Categoría</th>
              <th className="p-4 font-medium">Especies</th>
              <th className="p-4 font-medium">Estado</th>
              <th className="p-4 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-slate-600">
            {loading && products.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-10 text-center">
                  <Loader2
                    className="animate-spin mx-auto text-emerald-500"
                    size={30}
                  />
                </td>
              </tr>
            ) : (
              products.map((prod) => (
                <tr
                  key={prod.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 font-medium flex items-center gap-3">
                    <img
                      src={prod.imagen_url || "/images/placeholder.jpg"}
                      className="w-10 h-10 rounded-lg object-cover"
                    />{" "}
                    {prod.nombre}
                  </td>
                  <td className="p-4">{prod.marcas?.nombre}</td>
                  <td className="p-4">{prod.categorias?.nombre}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {prod.producto_especies?.map((pe: any, index: number) => (
                        <span
                          key={`${pe.id || index}`}
                          className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full border"
                        >
                          {pe.especies?.nombre || "S/N"}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-1 rounded-full ${prod.en_stock ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}
                    >
                      {prod.en_stock ? "Disponible" : "Agotado"}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(prod)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => deleteProduct(prod.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-between items-center mt-6 px-2">
        <p className="text-sm text-gray-500">
          Página <span className="font-bold text-slate-800">{currentPage}</span>{" "}
          de <span className="font-bold text-slate-800">{totalPages}</span>
        </p>
        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 border rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            Anterior
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 border rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* MODAL DE REGISTRO / EDICIÓN REDISEÑADO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 transition-all">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl border border-gray-100"
          >
            {/* HEADER DEL MODAL */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-8 py-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-slate-800">
                  {editingId
                    ? "Actualizar Producto"
                    : "Registrar Nuevo Producto"}
                </h2>
                <p className="text-sm text-slate-500">
                  Complete la información para el catálogo veterinario
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* COLUMNA IZQUIERDA: Información Básica y Clasificación (7 columnas) */}
                <div className="lg:col-span-7 space-y-8">
                  {/* SECCIÓN 1: DATOS GENERALES */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="text-lg font-bold text-slate-700">
                        Información General
                      </h3>
                    </div>

                    <div className="grid gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                          Nombre del Producto
                        </label>
                        <input
                          type="text"
                          required
                          className="p-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                          onChange={(e) =>
                            setFormData({ ...formData, nombre: e.target.value })
                          }
                          value={formData.nombre}
                          placeholder="Ej. Amoxicilina 250mg"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                            Marca
                          </label>
                          <select
                            required
                            className="p-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                marca_id: e.target.value,
                              })
                            }
                            value={formData.marca_id}
                          >
                            <option value="">Seleccionar</option>
                            {brands.map((b) => (
                              <option key={b.id} value={b.id}>
                                {b.nombre}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                            Categoría
                          </label>
                          <select
                            required
                            className="p-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                categoria_id: e.target.value,
                              })
                            }
                            value={formData.categoria_id}
                          >
                            <option value="">Seleccionar</option>
                            {categories.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.nombre}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECCIÓN 2: CLASIFICACIÓN Y STOCK */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-6 bg-blue-500 rounded-full" />
                      <h3 className="text-lg font-bold text-slate-700">
                        Clasificación y Estado
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                          Especies Destino
                        </label>
                        <div className="grid grid-cols-2 gap-2 p-4 border border-gray-200 rounded-2xl max-h-48 overflow-y-auto bg-gray-50">
                          {species.map((s) => (
                            <label
                              key={s.id}
                              className="flex items-center gap-2 text-sm cursor-pointer group"
                            >
                              <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                checked={formData.especies_ids.includes(s.id)}
                                onChange={() => handleSpeciesChange(s.id)}
                              />
                              <span className="text-slate-600 group-hover:text-emerald-600 transition-colors">
                                {s.nombre}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 justify-center">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                          Disponibilidad
                        </label>
                        <div
                          onClick={() =>
                            setFormData({
                              ...formData,
                              en_stock: !formData.en_stock,
                            })
                          }
                          className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all ${formData.en_stock ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${formData.en_stock ? "bg-emerald-500 border-emerald-500" : "border-red-400 bg-white"}`}
                          >
                            {formData.en_stock && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <span
                            className={`text-sm font-bold ${formData.en_stock ? "text-emerald-700" : "text-red-700"}`}
                          >
                            {formData.en_stock
                              ? "Disponible en Stock"
                              : "Agotado / Sin Stock"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECCIÓN 3: PRESENTACIÓN y ARCHIVOS */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-6 bg-purple-500 rounded-full" />
                      <h3 className="text-lg font-bold text-slate-700">
                        Presentación y Multimedia
                      </h3>
                    </div>

                    <div className="grid gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                          Presentación
                        </label>
                        <input
                          type="text"
                          className="p-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              presentacion: e.target.value,
                            })
                          }
                          value={formData.presentacion}
                          placeholder="Ej. Frasco 100ml, Caja x 20 unidades"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        {/* CAJA DE IMAGEN AMPLIADA */}
                        <div className="p-4 border border-dashed border-gray-300 rounded-2xl bg-gray-50 flex flex-col gap-3 hover:border-emerald-400 transition-colors group">
                          <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                            <Plus size={14} className="text-emerald-500" />{" "}
                            Imagen
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            className="text-xs w-full"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                imagen: e.target.files?.[0] || null,
                              })
                            }
                          />
                          {/* PREVISTA DE IMAGEN AMPLIADA */}
                          {formData.imagen && (
                            <div className="mt-2 relative w-full h-48 rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                              <img
                                src={URL.createObjectURL(formData.imagen)}
                                alt="Preview"
                                className="w-full h-full object-contain p-2" // object-contain para que no se corte la imagen
                              />
                              <button
                                onClick={() =>
                                  setFormData({ ...formData, imagen: null })
                                }
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* CAJA DE PDF CON VISTA PREVIA DE CONTENIDO */}
                        <div className="p-4 border border-dashed border-gray-300 rounded-2xl bg-gray-50 flex flex-col gap-3 hover:border-emerald-400 transition-colors group">
                          <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                            <FileText size={14} className="text-emerald-500" />{" "}
                            Ficha PDF
                          </label>
                          <input
                            type="file"
                            accept=".pdf"
                            className="text-xs w-full"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                pdf: e.target.files?.[0] || null,
                              })
                            }
                          />
                          {/* PREVISTA DE CONTENIDO PDF */}
                          {formData.pdf && (
                            <div className="mt-2 relative w-full h-48 rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                              <embed
                                src={URL.createObjectURL(formData.pdf)}
                                type="application/pdf"
                                width="100%"
                                height="100%"
                                className="rounded-xl"
                              />
                              <button
                                onClick={() =>
                                  setFormData({ ...formData, pdf: null })
                                }
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg z-10"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* COLUMNA DERECHA: FICHA TÉCNICA (5 columnas) */}
                <div className="lg:col-span-5 space-y-6 bg-slate-50 p-6 rounded-[32px] border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-6 bg-orange-500 rounded-full" />
                    <h3 className="text-lg font-bold text-slate-700">
                      Ficha Técnica
                    </h3>
                  </div>

                  <div className="space-y-5">
                    {[
                      {
                        label: "Descripción Corta",
                        field: "descripcion_corta",
                        placeholder: "Resumen rápido del producto...",
                      },
                      {
                        label: "Composición",
                        field: "composicion",
                        placeholder: "Ingredientes activos...",
                      },
                      {
                        label: "Indicaciones",
                        field: "indicaciones",
                        placeholder: "¿Para qué se utiliza?...",
                      },
                      {
                        label: "Dosificación",
                        field: "dosificacion",
                        placeholder: "Cantidad y frecuencia...",
                      },
                      {
                        label: "Carencia/Advertencias",
                        field: "periodo_carencia",
                        placeholder: "Tiempo de espera, contraindicaciones...",
                      },
                    ].map((item: any) => (
                      <div key={item.field} className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                          {item.label}
                        </label>
                        <textarea
                          className="p-3 bg-white border border-gray-200 rounded-2xl h-24 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [item.field]: e.target.value,
                            })
                          }
                          value={(formData as any)[item.field]}
                          placeholder={item.placeholder}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* FOOTER DEL MODAL */}
              <div className="flex justify-end gap-4 mt-10 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 text-slate-500 font-bold hover:text-slate-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  disabled={loading}
                  className="bg-emerald-600 text-white px-10 py-3 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center gap-2 active:scale-95 disabled:bg-gray-400"
                  onClick={handleSaveProduct}
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : null}
                  {editingId ? "Actualizar Producto" : "Guardar Producto"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
