"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const count = 1000;
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 16;
      arr[i + 1] = (Math.random() - 0.5) * 16;
      arr[i + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#2d6fa3"
        size={0.055}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
}

function Coin3D() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.PI / 2;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized coordinates [-1, 1] relative to viewport
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleWindowClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Skip click handler if clicking a button, input, anchor or within one
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        return;
      }

      if (meshRef.current) {
        // Setup a beautiful coin-toss timeline (X-flip and Y-jump)
        const tl = gsap.timeline();
        const currentRotX = meshRef.current.rotation.x;
        const currentPosY = meshRef.current.position.y;

        // Flip 360 deg * 2 around X axis
        tl.to(meshRef.current.rotation, {
          x: currentRotX + Math.PI * 4,
          duration: 1.0,
          ease: "power2.out"
        }, 0);

        // Toss coin up
        tl.to(meshRef.current.position, {
          y: currentPosY + 1.4,
          duration: 0.5,
          ease: "power1.out"
        }, 0)
        // Let it fall back down
        .to(meshRef.current.position, {
          y: currentPosY,
          duration: 0.5,
          ease: "power1.in"
        }, 0.5);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smoothly tilt toward mouse pointer (adds base tilt to the current rotation)
    const targetRotX = Math.PI / 2 + (-mouseRef.current.y) * 0.45;
    const targetRotZ = (mouseRef.current.x) * 0.45;
    
    // Convert normalized pointer coordinates [-1, 1] to Three.js viewport dimensions
    const targetX = (mouseRef.current.x * state.viewport.width) / 2;
    const targetY = (mouseRef.current.y * state.viewport.height) / 2;

    // Only apply mouse position/tilt tracking if GSAP is not actively tossing the coin
    if (!gsap.isTweening(meshRef.current.rotation) && !gsap.isTweening(meshRef.current.position)) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.08);
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.08);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.08);
    }
    
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetRotZ, 0.08);

    // Continuous baseline spin
    meshRef.current.rotation.y += 0.008;
  });

  const logoTexture = React.useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load("/images/logo.webp");
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <cylinderGeometry args={[0.65, 0.65, 0.09, 64]} />
      <meshStandardMaterial attach="material-0" color="#F5D6C6" metalness={0.75} roughness={0.25} />
      <meshBasicMaterial attach="material-1" map={logoTexture} transparent />
      <meshBasicMaterial attach="material-2" map={logoTexture} transparent />
    </mesh>
  );
}

function SceneContainer() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;

    // Scroll animation for position (moves the particle field background)
    const posAnim = gsap.to(groupRef.current.position, {
      y: -3.5,
      z: -1.5,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      }
    });

    // Scroll animation for rotation
    const rotAnim = gsap.to(groupRef.current.rotation, {
      y: Math.PI * 0.45,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      }
    });

    return () => {
      posAnim.scrollTrigger?.kill();
      rotAnim.scrollTrigger?.kill();
      posAnim.kill();
      rotAnim.kill();
    };
  }, []);

  return (
    <>
      <group ref={groupRef}>
        <ParticleField />
      </group>
      <Coin3D />
    </>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-gradient-to-b from-[#FAFBFD] to-[#FFFFFF] transition-colors duration-300">
      <Canvas camera={{ position: [0, 0, 5], fov: 55 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 3, 4]} intensity={0.8} />
        <SceneContainer />
      </Canvas>
    </div>
  );
}
