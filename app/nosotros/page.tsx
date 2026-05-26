"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Target, Eye, Heart, ShieldCheck, Award, Users, Zap, CheckCircle2 } from "lucide-react";


export default function NosotrosPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // ... (mantén el array de values igual que antes)
  const values = [
    { icon: <ShieldCheck className="text-white" size={32} />, title: "Calidad Garantizada", desc: "Solo trabajamos con marcas líderes y productos certificados internacionalmente." },
    { icon: <Heart className="text-white" size={32} />, title: "Compromiso Animal", desc: "Nuestra razón de ser es el bienestar y la salud de cada paciente veterinario." },
    { icon: <Award className="text-white" size={32} />, title: "Excelencia Profesional", desc: "Asesoramos a nuestros clientes con conocimiento técnico y actualización constante." },
    { icon: <Users className="text-white" size={32} />, title: "Ética y Transparencia", desc: "Construimos relaciones basadas en la honestidad y el respeto mutuo con el gremio." },
  ];

  return (
    <div className="min-h-screen bg-white pb-20"> 
      {/* 1. HERO SECTION - Ajustado para eliminar el espacio en blanco */}
      <section className="relative px-6 pt-4 pb-12 md:pt-8 md:pb-20 max-w-[1280px] mx-auto">
        {/* 
            Sustituimos 'py-12 md:py-20' por 'pt-4 pb-12 md:pt-8 md:pb-20'.
            Esto elimina el espacio excesivo arriba porque el layout ya tiene el pt-[120px].
        */}
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LADO IZQUIERDO: Texto con diseño editorial */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <div className="inline-flex items-center gap-2 bg-[var(--norvet-green)]/10 text-[var(--norvet-green)] px-4 py-1.5 rounded-full text-sm font-bold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--norvet-green)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--norvet-green)]"></span>
              </span>
              Liderando la Salud Animal
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6">
              Más que una <br />
              <span className="text-[var(--norvet-green)] relative">
                Distribuidora
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="var(--norvet-green)" strokeWidth="2" fill="transparent" />
                </svg>
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl leading-relaxed mb-8">
              En Norvet, fusionamos la logística de vanguardia con una pasión genuina por el bienestar animal, conectando los mejores laboratorios del mundo con tu clínica.
            </p>
            <div className="flex gap-4">
              <button className="bg-[var(--norvet-green)] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-[var(--norvet-green-dark)] transition-all hover:scale-105 active:scale-95">
                Conócenos más
              </button>
            </div>
          </motion.div>

          {/* LADO DERECHO: Composición de Imágenes */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] w-full"
          >
            {/* Imagen Principal */}
            <div className="absolute top-0 right-0 w-4/5 h-[80%] rounded-[60px_20px_60px_20px] overflow-hidden shadow-2xl z-10 border-4 border-white">
              <Image 
                src="/images/about-banner.jpg" 
                alt="Norvet Hero" 
                fill 
                className="object-cover" 
              />
            </div>
            {/* Imagen Secundaria superpuesta */}
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-[20px_60px_20px_60px] overflow-hidden shadow-2xl z-20 border-8 border-white">
              <Image 
                src="/images/about-company.jpg" 
                alt="Norvet Equipo" 
                fill 
                className="object-cover" 
              />
            </div>
            {/* Elemento decorativo de fondo */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[var(--norvet-green)] rounded-full blur-[100px] opacity-20" />
          </motion.div>
        </div>
      </section>

      {/* 2. PASIÓN POR LA SALUD ANIMAL - Diseño de Capas y Datos */}
      <section className="py-24 px-6 bg-slate-50 overflow-hidden">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* IMAGEN CON MARCO DE DATOS */}
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl"
              >
                <Image 
                  src="/images/about-company.jpg" 
                  alt="Pasión Norvet" 
                  width={600} 
                  height={600} 
                  className="object-cover"
                />
              </motion.div>
              
              {/* TARJETA DE DATOS FLOTANTE */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[30px] shadow-2xl z-20 border border-gray-100 hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-[var(--norvet-green)] p-3 rounded-2xl text-white">
                    <Award size={32} />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-slate-900">100%</p>
                    <p className="text-sm text-gray-500 font-medium">Calidad Certificada</p>
                  </div>
                </div>
              </motion.div>

              {/* Decoración de fondo */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[var(--norvet-green)] rounded-full blur-3xl opacity-20" />
            </div>

            {/* TEXTO CON PUNTOS DE IMPACTO */}
            <div className="flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
                  Pasión por la <span className="text-[var(--norvet-green)]">Salud Animal</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  No somos simplemente un eslabón en la cadena de suministro. En Norvet, entendemos que detrás de cada medicamento hay una vida que salvar y un profesional que confía en nosotros.
                </p>

                {/* PUNTOS DE VALOR (Checklist) */}
                <div className="grid gap-4">
                  {[
                    "Soporte técnico especializado en cada entrega.",
                    "Logística optimizada para mantener la cadena de frío.",
                    "Alianzas directas con laboratorios internacionales.",
                    "Compromiso ético con el bienestar animal."
                  ].map((text, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 text-slate-700 font-medium"
                    >
                      <CheckCircle2 className="text-[var(--norvet-green)] shrink-0" size={20} />
                      {text}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
            {/* 3. ADN CORPORATIVO - Misión, Visión y Valores */}
      <section className="py-24 bg-[var(--norvet-green-light)] px-6 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--norvet-green)] opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--norvet-green)] opacity-10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-[var(--norvet-green)] font-bold text-sm mb-4"
            >
              <Target size={16} />
              Nuestro Propósito
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">ADN Corporativo</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Nuestros pilares definen la manera en que trabajamos, el estándar de calidad que exigimos y el compromiso que tenemos con cada animal.
            </p>
          </div>

          {/* GRID DE MISIÓN Y VISIÓN */}
          <div className="grid lg:grid-cols-2 gap-12 mb-24">
            {/* MISIÓN */}
            <motion.div 
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[40px] shadow-xl border-b-8 border-[var(--norvet-green)] relative group"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[var(--norvet-green)] rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <Target size={40} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-6">Misión</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Llevar el estándar más alto de salud animal a cada rincón del país, proporcionando soluciones farmacéuticas y tecnológicas innovadoras que empoderen a los médicos veterinarios y garanticen una vida digna y saludable para todas las especies.
              </p>
            </motion.div>

            {/* VISIÓN */}
            <motion.div 
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[40px] shadow-xl border-b-8 border-slate-800 relative group"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <Eye size={40} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-6">Visión</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Consolidarnos para el 2030 como la distribuidora veterinaria líder en Latinoamérica, siendo reconocidos no solo por nuestra eficiencia logística, sino por nuestra ética inquebrantable y la capacidad de transformar la medicina animal a través de la calidad.
              </p>
            </motion.div>
          </div>

          {/* VALORES - Diseño de "Burbujas" de Valor */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-slate-900">Nuestros Valores Fundamentales</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <ShieldCheck />, title: "Integridad", desc: "Actuamos con transparencia absoluta en cada negociación y entrega." },
              { icon: <Heart />, title: "Empatía", desc: "Entendemos la conexión emocional entre el dueño, el médico y el animal." },
              { icon: <Zap />, title: "Innovación", desc: "Buscamos constantemente la última tecnología en salud animal." },
              { icon: <Award />, title: "Excelencia", desc: "No aceptamos menos que la calidad máxima en cada producto." },
            ].map((val, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 text-center group hover:border-[var(--norvet-green)] transition-all"
              >
                <div className="mx-auto w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 mb-4 group-hover:bg-[var(--norvet-green)] group-hover:text-white transition-all">
                  {val.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{val.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* ... (Resto de la página: Misión, Visión y Valores se mantienen igual) */}
    </div>
  );
}
