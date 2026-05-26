export interface News {
  id: string;
  title: string;
  category: "Local" | "Internacional";
  date: string;
  image: string;
  excerpt: string; // Resumen corto
  content: string; // Noticia completa
}

export const news: News[] = [
  {
    id: "1",
    title: "Avances en Vacunas Bovinas en Perú",
    category: "Local",
    date: "Octubre 2023",
    image: "/images/news-banner-1.jpg",
    excerpt: "Implementación de nuevas tecnologías de vacunación en la sierra central para prevenir la fiebre aftosa.",
    content: "En un esfuerzo conjunto con el gobierno regional, Norvet ha facilitado la distribución de vacunas de última generación...",
  },
  {
    id: "2",
    title: "Nuevas Normativas de Salud Animal en la UE",
    category: "Internacional",
    date: "Septiembre 2023",
    image: "/images/news-banner-2.jpg",
    excerpt: "La Unión Europea actualiza los protocolos de importación de medicamentos veterinarios para 2024.",
    content: "La nueva normativa busca reducir el uso de antibióticos en la ganadería intensiva, promoviendo alternativas naturales...",
  },
  {
    id: "3",
    title: "Congreso Veterinario Nacional 2024",
    category: "Local",
    date: "Agosto 2023",
    image: "/images/news-banner-3.jpg",
    excerpt: "Norvet patrocinará el evento más importante de medicina veterinaria en Lima este próximo año.",
    content: "Estaremos presentando nuestra nueva línea de suplementos nutricionales para caninos de razas grandes...",
  },
];
