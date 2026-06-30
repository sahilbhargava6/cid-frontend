"use client";

import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getServices, ServiceData } from "@/data/servicesData";

function ThreeCard({ imageUrl, title }: { imageUrl: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    
    const rotX = -((y - midY) / midY) * 12;
    const rotY = ((x - midX) / midX) * 12;
    
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full relative cursor-pointer select-none flex items-center justify-center p-2 transition-all duration-300"
      style={{
        perspective: "1000px",
      }}
    >
      <div
        className="relative w-full aspect-square rounded-[20px] transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.04 : 1})`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className={`absolute -inset-1 rounded-[24px] bg-[#2d6fa3]/10 blur-md transition-opacity duration-500 pointer-events-none ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: "translateZ(-15px)",
          }}
        />
        
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="280px"
          priority
          className="object-cover rounded-[20px] pointer-events-none"
        />

        <div
          className={`absolute inset-0 rounded-[20px] pointer-events-none transition-opacity duration-300 bg-gradient-to-tr from-white/0 via-white/5 to-white/15 mix-blend-overlay ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: "translateZ(5px)",
          }}
        />
      </div>
    </div>
  );
}

export default function MockupServices() {
  const auth = useAuth();
  const user = auth ? auth.user : null;
  const [mounted, setMounted] = useState(false);
  const [services, setServices] = useState<ServiceData[]>([]);

  useEffect(() => {
    setMounted(true);
    setServices(getServices());
  }, []);

  const getBookingUrl = (param: string) => {
    return `/services/${param}`;
  };

  return (
    <section
      id="services"
      className="relative py-24 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/hero.webp')"
      }}
    >
      {/* Semi-transparent white overlay to fade characters like in design */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px] z-0 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Title Area */}
          <div className="lg:col-span-2">
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight text-[#111827] text-left lg:text-left leading-none"
              style={{
                fontFamily: "var(--font-heading)",
              }}
            >
              Services
            </h2>
          </div>

          {/* Right Cards Row (5 Cards) */}
          <div className="lg:col-span-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {services.map((service, index) => (
              <a
                key={index}
                href={getBookingUrl(service.key)}
                className="flex flex-col items-center group cursor-pointer w-full"
              >
                {/* Illustration Card Image */}
                <div 
                  className="w-full aspect-square rounded-[24px] overflow-hidden relative border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] bg-white"
                >
                  {mounted ? (
                    <ThreeCard imageUrl={service.image} title={service.title} />
                  ) : (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover rounded-[24px]"
                      sizes="200px"
                    />
                  )}
                </div>

                {/* Styled Title Label Pill */}
                <div className="mt-4 w-full">
                  <div 
                    className="w-full text-center py-4 px-3 rounded-[20px] text-[13px] sm:text-[14px] font-extrabold flex items-center justify-center leading-snug shadow-sm select-none min-h-[76px] transition-transform duration-300 group-hover:scale-[1.03]"
                    style={{
                      backgroundColor: service.bgColor || '#DCEFE9',
                      color: service.textColor || '#1A4337',
                    }}
                  >
                    <span>
                      {service.title}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
