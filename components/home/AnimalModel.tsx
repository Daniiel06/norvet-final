"use client";
import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

export default function AnimalModel({ url }: { url: string }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const animationNames = Object.keys(actions);
    if (animationNames.length > 0) {
      (actions as any)[animationNames[0]].play();
    }

    if (group.current) {
      group.current.scale.set(0, 0, 0);
      // --- AJUSTA EL TAMAÑO DEL PERRO AQUÍ ---
      const scaleValue = 8.0; // Sube este número si el perro sigue pequeño
      
      gsap.to(group.current.scale, {
        x: scaleValue,
        y: scaleValue,
        z: scaleValue,
        duration: 0.8,
        ease: "back.out(1.7)", 
      });
    }
  }, [actions, url]);

  useFrame(() => {
    const headBone = scene.getObjectByName("Head") || scene.getObjectByName("Neck");
    if (headBone) {
      headBone.rotation.x = -0.2; 
    }
  });

  return (
    <group 
      ref={group} 
      position={[0, -0.8, 0]} // Ajusta el Y si el perro queda muy arriba o abajo
      rotation={[0, -Math.PI / 6, 0]} 
    >
      <primitive object={scene} />
    </group>
  );
}
