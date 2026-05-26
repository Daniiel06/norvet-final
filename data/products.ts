export interface Product {
  id: string;
  name: string;
  image: string;
  category: "Medicamentos" | "Suplementos" | "Equipos" | "Vacunas";
  shortDescription: string;
  fullDescription: string;
  specs: { label: string; value: string }[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Antibiótico Veterinario",
    image: "/images/product-1.jpg",
    category: "Medicamentos",
    shortDescription: "Tratamiento de amplio espectro para infecciones bacterianas.",
    fullDescription: "Este antibiótico de alta potencia está diseñado para combatir infecciones respiratorias y digestivas en diversas especies animales, asegurando una recuperación rápida y efectiva.",
    specs: [
      { label: "Presentación", value: "Frasco 100ml" },
      { label: "Uso", value: "Inyectable" },
      { label: "Vía", value: "Intramuscular" },
    ],
  },
  {
    id: "2",
    name: "Vitaminas Animales",
    image: "/images/product-2.jpg",
    category: "Suplementos",
    shortDescription: "Complejo vitamínico para mejorar el rendimiento y crecimiento.",
    fullDescription: "Fórmula concentrada de vitaminas A, D3 y E que optimiza el sistema inmunológico y mejora la calidad del pelaje y la piel en mascotas y ganado.",
    specs: [
      { label: "Presentación", value: "Envase 500ml" },
      { label: "Componentes", value: "A, D3, E" },
      { label: "Dosis", value: "Según peso animal" },
    ],
  },
  {
    id: "3",
    name: "Suplemento Bovino",
    image: "/images/product-3.jpg",
    category: "Suplementos",
    shortDescription: "Optimiza la producción de leche y ganancia de peso en bovinos.",
    fullDescription: "Suplemento mineral y vitamínico diseñado específicamente para ganado lechero y de carne, mejorando la fertilidad y la salud general del hato.",
    specs: [
      { label: "Presentación", value: "Bolsa 20kg" },
      { label: "Tipo", value: "Granulado" },
      { label: "Uso", value: "Mezcla de alimento" },
    ],
  },
  {
    id: "4",
    name: "Medicamento Ganadero",
    image: "/images/product-4.jpg",
    category: "Medicamentos",
    shortDescription: "Control efectivo de parásitos y enfermedades comunes del ganado.",
    fullDescription: "Solución especializada para el control sanitario en granjas ganaderas, reduciendo el estrés animal y aumentando la productividad.",
    specs: [
      { label: "Presentación", value: "Frasco 250ml" },
      { label: "Acción", value: "Rápida" },
      { label: "Periodo retiro", value: "15 días" },
    ],
  },
  {
    id: "5",
    name: "Vacuna Animal",
    image: "/images/product-5.jpg",
    category: "Vacunas",
    shortDescription: "Protección preventiva contra virus y bacterias estacionales.",
    fullDescription: "Vacuna de última generación que induce una respuesta inmunológica fuerte y prolongada, protegiendo a los animales de las epidemias más comunes.",
    specs: [
      { label: "Almacenamiento", value: "2°C a 8°C" },
      { label: "Dosis", value: "Única" },
      { label: "Especie", value: "Multiespecie" },
    ],
  },
  {
    id: "6",
    name: "Nutrición Veterinaria",
    image: "/images/product-6.jpg",
    category: "Suplementos",
    shortDescription: "Alimento balanceado para necesidades nutricionales específicas.",
    fullDescription: "Línea de nutrición avanzada que cubre todas las necesidades calóricas y proteicas, ideal para animales en etapa de crecimiento o convalecencia.",
    specs: [
      { label: "Presentación", value: "Saco 15kg" },
      { label: "Proteína", value: "28%" },
      { label: "Grasas", value: "12%" },
    ],
  },
  {
    id: "7",
    name: "Desparasitante",
    image: "/images/product-7.jpg",
    category: "Medicamentos",
    shortDescription: "Eliminación efectiva de parásitos internos y externos.",
    fullDescription: "Fórmula de amplio espectro que elimina nematodos, cestodos y ectoparásitos, mejorando la salud digestiva y general del animal.",
    specs: [
      { label: "Presentación", value: "Pastillas / Líquido" },
      { label: "Efectividad", value: "99%" },
      { label: "Uso", value: "Oral" },
    ],
  },
  {
    id: "8",
    name: "Solución Pecuaria",
    image: "/images/product-8.jpg",
    category: "Equipos",
    shortDescription: "Kit de soluciones para el manejo sanitario de la granja.",
    fullDescription: "Set integral de herramientas y soluciones químicas para la desinfección y mantenimiento de instalaciones pecuarias, garantizando un ambiente estéril.",
    specs: [
      { label: "Contenido", value: "Kit 5 piezas" },
      { label: "Material", value: "Grado Médico" },
      { label: "Garantía", value: "1 año" },
    ],
  },
];
