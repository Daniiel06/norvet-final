"use client";
import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export default function CowModel({ url }: { url: string }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Mantenemos la animación natural (Idle)
    const animationNames = Object.keys(actions);
    if (animationNames.length > 0) {
      (actions as any)[animationNames[0]].play();
    }
  }, [actions]);

  // HEMOS ELIMINADO el useFrame por completo. 
  // Ya no hay cálculos de mouse ni rotaciones de huesos.

  return (
    <group 
      ref={group} 
      position={[0.5, -1.3, 0.3]} 
      rotation={[0, -Math.PI / 6, 0]} // Mantiene la posición mirando hacia el lado que elegiste
    >
      <primitive object={scene} scale={2} />
    </group>
  );
}


