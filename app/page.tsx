import HeroSlider from "@/components/home/HeroSlider";
import AboutPreview from "@/components/home/AboutPreview";
import FeaturedBlocks from "@/components/home/FeaturedBlocks";
import NewProducts from "@/components/home/NewProducts";

export default function Home() {
  return (
    // Quitamos el TopBar, Navbar y Footer porque ya están en layout.tsx
    // Quitamos el pt-[120px] porque ya está en layout.tsx
    <div className="w-full bg-white flex flex-col space-y-20">
      <HeroSlider />
      <AboutPreview />
      <FeaturedBlocks />
      <NewProducts />
    </div>
  );
}
  