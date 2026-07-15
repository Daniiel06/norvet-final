"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import ModelViewer from "./ModelViewer";

const THEMES = {
  ganaderia: {
    name: "Ganadería",
    model: "https://ibocsjhgxmhbvgcmqgxg.supabase.co/storage/v1/object/public/models/vaca_norvet.glb",
    colorAccent: "text-[#19A752]", // Un verde más brillante para fondo oscuro
    bgImage: "/images/bg-ganaderia2.jpg",
    overlayColor: "bg-black/40", // Capa negra al 40% para que el blanco resalte
  },
  mascotas: {
    name: "Mascotas",
    model: "https://ibocsjhgxmhbvgcmqgxg.supabase.co/storage/v1/object/public/models/perro.glb",
    colorAccent: "text-[#19A752]", // Un teal más brillante
    bgImage: "/images/bg-mascotas2.jpg", 
    overlayColor: "bg-black/40",
  }
} as const;

const PHRASES = {
  ganaderia: [
    "Líderes en salud animal para la producción ganadera.",
    "Farmacéuticos de alta gama para el bienestar del hato.",
    "Tecnología veterinaria avanzada para el campo.",
    "Suministros especializados para una ganadería rentable."
  ],
  mascotas: [
    "Cuidado premium para los mejores amigos de la casa.",
    "Medicamentos especializados para la salud de tu mascota.",
    "Nutrición y medicina de vanguardia para perros y gatos.",
    "Calidad farmacéutica superior para el bienestar animal."
  ]
};

type ThemeType = keyof typeof THEMES;

export default function Hero3D() {
  const [activeCategory, setActiveCategory] = useState<ThemeType>("ganaderia");
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrases = PHRASES[activeCategory];
    const fullText = currentPhrases[phraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 3000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % currentPhrases.length);
      } else {
        const nextText = isDeleting 
          ? fullText.substring(0, text.length - 1) 
          : fullText.substring(0, text.length + 1);
        setText(nextText);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, activeCategory]);

  useEffect(() => {
    setPhraseIndex(0);
    setText("");
    setIsDeleting(false);
  }, [activeCategory]);

  const switchTheme = (category: ThemeType) => {
    setActiveCategory(category);
    gsap.to(".bg-layer", {
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        gsap.to(".bg-layer", { opacity: 1, duration: 0.6 });
      }
    });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-900">
      
      {/* CAPA DE FONDO CON IMAGEN */}
      <div className="bg-layer absolute inset-0 z-0 transition-opacity duration-500">
        <Image 
          src={THEMES[activeCategory].bgImage} 
          alt="Background" 
          fill 
          className="object-cover" 
          priority
        />
        {/* IMPORTANTE: El Overlay devuelve la legibilidad al texto blanco */}
        <div className={`absolute inset-0 ${THEMES[activeCategory].overlayColor} bg-gradient-to-r from-black/60 via-transparent to-transparent`} />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-20 z-10" style={{ 
        backgroundImage: `linear-gradient(#fff 0.5px, transparent 0.5px), linear-gradient(90deg, #fff 0.5px, transparent 0.5px)`, 
        backgroundSize: '60px 60px' 
      }} />

      <main className="relative z-20 h-full flex items-center justify-between px-[5%] py-10">
        <div className="flex flex-col gap-6 max-w-xl z-30">
          {/* CAMBIO AQUÍ: text-slate-900 -> text-white */}
          <h1 className="text-7xl font-black text-white leading-[0.9] italic drop-shadow-2xl">
            <span className={THEMES[activeCategory].colorAccent}>Salud</span><br />Animal
          </h1>
          
          <div className="h-16">
            {/* CAMBIO AQUÍ: text-slate-800 -> text-white/90 */}
            <p className="text-white/90 text-xl leading-relaxed font-medium drop-shadow-md">
              {text}
              {/* CAMBIO AQUÍ: border-slate-900 -> border-white */}
              <span className="animate-pulse ml-1 border-r-2 border-white"></span>
            </p>
          </div>

          <Link href="/productos" className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold w-fit hover:scale-105 transition-all flex items-center gap-2 shadow-xl">
            Ver Catálogo <span className="bg-slate-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">+</span>
          </Link>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="relative w-[80vw] h-[80vh]">
            <ModelViewer key={activeCategory} src={THEMES[activeCategory].model} />
          </div>
        </div>

        <div className="flex flex-col items-end gap-8 z-30">
          <div className="flex gap-4">
            <div onClick={() => switchTheme("ganaderia")} className={`cursor-pointer p-4 rounded-3xl border-2 transition-all ${activeCategory === 'ganaderia' ? 'border-emerald-400 bg-white/20 backdrop-blur-md shadow-lg' : 'border-transparent bg-white/10 backdrop-blur-sm hover:bg-white/20'}`}>
              <div className="relative w-16 h-16 mb-2 mx-auto">
                 <Image src="/images/ganado.png" alt="Ganadería" fill className="object-contain" />
              </div>
              <p className="text-white text-center text-xs font-bold">Ganadería</p>
            </div>
            <div onClick={() => switchTheme("mascotas")} className={`cursor-pointer p-4 rounded-3xl border-2 transition-all ${activeCategory === 'mascotas' ? 'border-blue-400 bg-white/20 backdrop-blur-md shadow-lg' : 'border-transparent bg-white/10 backdrop-blur-sm hover:bg-white/20'}`}>
              <div className="relative w-16 h-16 mb-2 mx-auto">
                 <Image src="/images/patas.png" alt="Mascotas" fill className="object-contain" />
              </div>
              <p className="text-white text-center text-xs font-bold">Mascotas</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}



