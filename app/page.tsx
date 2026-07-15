import HeroSlider from "@/components/home/HeroSlider";
import AboutPreview from "@/components/home/AboutPreview";
import FeaturedBlocks from "@/components/home/FeaturedBlocks";
import NewProducts from "@/components/home/NewProducts";
import Hero3D from "@/components/home/Hero3D";

export default function Home() {
  return (
    
    <div className="w-full bg-white flex flex-col space-y-20">
      <Hero3D /> 
      <AboutPreview />
      <FeaturedBlocks />
      <NewProducts />
    </div>
  );
}
  