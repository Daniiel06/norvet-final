import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import Script from "next/script"; // <--- 1. IMPORTAMOS EL COMPONENTE SCRIPT

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Norvet | Salud Animal",
  description: "Distribución de productos veterinarios de alta calidad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* 2. AGREGAMOS EL SCRIPT AQUÍ */}

        <TopBar />
        <Navbar />
        
        <main className="flex-grow pt-[120px]">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
