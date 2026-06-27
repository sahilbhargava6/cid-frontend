"use client";

import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const services = [
  {
    title: "Procurement & Sourcing Services",
    image: "/images/services/Procurement.webp",
    param: "procurement",
  },
  {
    title: "Small Business Management Solutions",
    image: "/images/services/business.webp",
    param: "accounts_and_logistics",
  },
  {
    title: "Tax Preparation & Resolution",
    image: "/images/services/tax.webp",
    param: "tax_prep",
  },
  {
    title: "Solar Energy Solutions",
    image: "/images/services/solar.webp",
    param: "solar",
  },
  {
    title: "Virtual Bookkeeping",
    image: "/images/services/bookkeeping.webp",
    param: "virtual_bookkeeping",
  },
  {
    title: "Business Growth & Process Optimization",
    image: "/images/services/gwoth.webp",
    param: "accounts_and_logistics",
  },
];

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
    
    // Smooth responsive tilt multiplier
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
      className="w-full h-full relative cursor-pointer select-none flex items-center justify-center p-4 transition-all duration-300"
      style={{
        perspective: "1000px",
      }}
    >
      <div
        className="relative w-[240px] h-[240px] rounded-2xl transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.05 : 1})`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Subtle glowing shadow backing */}
        <div
          className={`absolute -inset-2 rounded-3xl bg-[#2d6fa3]/10 blur-xl transition-opacity duration-500 pointer-events-none ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: "translateZ(-20px)",
          }}
        />
        
        {/* Main Service Card Image */}
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="250px"
          priority
          className="object-contain drop-shadow-[0_12px_24px_rgba(15,17,23,0.12)] pointer-events-none"
        />

        {/* Dynamic glare highlight layer */}
        <div
          className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 bg-gradient-to-tr from-white/0 via-white/10 to-white/20 mix-blend-overlay ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: "translateZ(10px)",
          }}
        />
      </div>
    </div>
  );
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
