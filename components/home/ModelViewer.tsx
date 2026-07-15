"use client";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import CowModel from "./CowModel";
import AnimalModel from "./AnimalModel";

export default function ModelViewer({ src }: { src: string }) {
  // Detectamos qué animal es basándonos en la URL
  const isDog = src.toLowerCase().includes("perro");

  return (
    <Canvas 
      gl={{ alpha: true }} 
      camera={{ position: [0, 1, 5], fov: 45 }} 
      style={{ width: '100%', height: '100%' }}>
      
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Environment preset="city" />
      
      <Suspense fallback={null}>
        {/* CONDICIÓN: Si es perro, carga AnimalModel. Si no, carga CowModel */}
        {isDog ? (
          <AnimalModel url={src} />
        ) : (
          <CowModel url={src} />
        )}
      </Suspense>
      
     
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        minPolarAngle={Math.PI / 4} 
        maxPolarAngle={Math.PI / 2} 
        makeDefault 
        dampingFactor={0.1} 
      />
    </Canvas>
  );
}
