"use client";

import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useAuth } from "@/context/AuthContext";

const services = [
  {
    title: "Procurement & Sourcing Services",
    image: "/images/services/Procurement.png",
    param: "procurement",
  },
  {
    title: "Small Business Management Solutions",
    image: "/images/services/business.png",
    param: "accounts_and_logistics",
  },
  {
    title: "Tax Preparation & Resolution",
    image: "/images/services/tax.png",
    param: "tax_prep",
  },
  {
    title: "Solar Energy Solutions",
    image: "/images/services/solar.png",
    param: "solar",
  },
  {
    title: "Virtual Bookkeeping",
    image: "/images/services/bookkeeping.png",
    param: "virtual_bookkeeping",
  },
  {
    title: "Business Growth & Process Optimization",
    image: "/images/services/gwoth.png",
    param: "accounts_and_logistics",
  },
];

function ThreeCard({ imageUrl, title }: { imageUrl: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const width = container.clientWidth || 200;
    const height = container.clientHeight || 200;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imageUrl);
    texture.colorSpace = THREE.SRGBColorSpace;

    const geometry = new THREE.PlaneGeometry(2.6, 2.6);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const card = new THREE.Mesh(geometry, material);
    scene.add(card);

    const particleCount = 30;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 4;
      positions[i + 1] = (Math.random() - 0.5) * 4;
      positions[i + 2] = (Math.random() - 0.5) * 2;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x2d6fa3,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let animationFrameId: number;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / (rect.width || 1) - 0.5;
      const y = (event.clientY - rect.top) / (rect.height || 1) - 0.5;
      targetRotationY = x * 0.7;
      targetRotationX = y * 0.7;
    };

    const handleMouseLeave = () => {
      targetRotationX = 0;
      targetRotationY = 0;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      card.rotation.x += (targetRotationX - card.rotation.x) * 0.08;
      card.rotation.y += (targetRotationY - card.rotation.y) * 0.08;

      card.position.y = Math.sin(Date.now() * 0.0015) * 0.04;

      const posAttr = particles.geometry.attributes.position;
      const arr = posAttr.array as Float32Array;
      for (let i = 1; i < arr.length; i += 3) {
        arr[i] += 0.0025;
        if (arr[i] > 2) arr[i] = -2;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const w = entry.contentRect.width || 200;
        const h = entry.contentRect.height || 200;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
    });
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [imageUrl]);

  return <div ref={containerRef} className="w-full h-full relative" />;
}

export default function Services() {
  const auth = useAuth();
  const user = auth ? auth.user : null;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getBookingUrl = (param: string) => {
    return user ? `/dashboard?book=${param}` : `/login?book=${param}`;
  };

  return (
    <section
      id="services"
      className="py-16 bg-transparent overflow-hidden"
    >
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6">
        
        {/* Header section */}
        <div className="text-center mb-12">
          <h2
            className="text-2xl md:text-3xl font-extrabold mb-4 tracking-tight"
            style={{ color: "#591B1B", fontFamily: "var(--font-heading)" }}
          >
            One partner for your business essentials.
          </h2>
          <p
            className="max-w-4xl mx-auto text-xs sm:text-[13px] leading-relaxed font-bold"
            style={{ color: "#E07A6B" }}
          >
            Whether it&apos;s managing finances, sourcing products, optimizing operations, or reducing energy costs, we provide practical solutions that keep your business moving forward.
          </p>
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 lg:gap-5 pb-6">
          {services.map((service, index) => (
            <a
              key={index}
              href={getBookingUrl(service.param)}
              className="flex flex-col items-center group cursor-pointer w-full"
            >
              {/* Illustration Card Image Container (Responsive Square) */}
              <div 
                className="w-full aspect-square rounded-[18px] sm:rounded-[24px] overflow-hidden relative border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform duration-300 group-hover:scale-[1.03] group-hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] bg-[#FAFAF8]"
              >
                {mounted ? (
                  <ThreeCard imageUrl={service.image} title={service.title} />
                ) : (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 17vw"
                  />
                )}
              </div>

              {/* Styled Title Label Pill with 3D Tilt Effect */}
              <div className="mt-4 w-full h-[90px] sm:h-[110px] md:h-[95px] lg:h-[120px] xl:h-[140px] perspective-[500px]">
                <div 
                  className="w-full h-full text-center py-2 px-2.5 rounded-[16px] sm:rounded-[20px] text-xs sm:text-sm md:text-xs lg:text-sm xl:text-[18px] font-bold transition-all duration-300 ease-out group-hover:bg-[#C2E4DA] group-hover:[transform:rotateX(10deg)_rotateY(-10deg)] flex items-center justify-center leading-snug shadow-sm select-none"
                  style={{
                    backgroundColor: "#DCEFE9",
                    color: "#2D6FA3",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <span className="transition-transform duration-300 group-hover:[transform:translateZ(30px)] block">
                    {service.title}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
