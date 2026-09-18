"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSiteConfig } from "@/data/siteConfigData";
import { fetchServices, ServiceData, getServiceSlug } from "@/data/servicesData";

const cardPositions: Record<string, string> = {
  solar: "top-[18%] left-[43%]",
  business: "top-[45%] left-[23%]",
  tax: "top-[50%] left-[43%]",
  bookkeeping: "top-[25%] left-[45%]",
  procurement: "top-[45%] left-[50%]",
};

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function extractBulletPoints(description?: string): string[] {
  if (!description) return [];

  const liMatches = description.match(/<li[^>]*>(.*?)<\/li>/gi);
  if (liMatches && liMatches.length > 0) {
    return liMatches
      .map((li) => {
        let text = li.replace(/<[^>]*>?/gm, "");
        text = decodeHtmlEntities(text).trim();
        return text;
      })
      .filter(Boolean);
  }

  const lines = description.split(/\n|<br\s*\/?>|<\/p>/i);
  const bullets: string[] = [];

  for (const line of lines) {
    let clean = line.replace(/<[^>]*>?/gm, "");
    clean = decodeHtmlEntities(clean).trim();
    if (!clean) continue;

    if (clean.startsWith("·") || clean.startsWith("-") || clean.startsWith("*")) {
      const text = clean.replace(/^[·\-\*]\s*/, "").trim();
      if (text) bullets.push(text);
    } else {
      bullets.push(clean);
    }
  }

  return bullets.slice(0, 5);
}

function cleanBullet(text: string): string {
  let clean = text.replace(/<[^>]*>?/gm, "");
  clean = decodeHtmlEntities(clean).trim();
  clean = clean.replace(/^[•·\-\*]\s*/, "").trim();
  return clean;
}

export default function Hero() {
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const [services, setServices] = useState<ServiceData[]>([]);
  const config = useSiteConfig();

  useEffect(() => {
    let isMounted = true;
    fetchServices().then((data) => {
      if (isMounted) setServices(data);
    });
    return () => { isMounted = false; };
  }, []);

  const getMatchedService = (key: string): ServiceData | undefined => {
    return services.find((s) => {
      if (key === "solar" && (s.key === "solar" || s.key.includes("solar"))) return true;
      if (key === "business" && (s.key === "accounts_and_logistics" || s.key === "business" || s.key.includes("business"))) return true;
      if (key === "tax" && (s.key === "tax_prep" || s.key === "tax" || s.key.includes("tax"))) return true;
      if (key === "bookkeeping" && (s.key === "virtual_bookkeeping" || s.key === "bookkeeping" || s.key.includes("bookkeeping"))) return true;
      if (key === "procurement" && (s.key === "procurement" || s.key.includes("procurement"))) return true;
      return s.key === key;
    });
  };

  const activeService = activeHover ? getMatchedService(activeHover) : undefined;
  const staticFallback = activeHover ? config.heroHovers?.[activeHover] : null;

  const displayTitle = staticFallback?.title
    ? decodeHtmlEntities(staticFallback.title)
    : (activeService?.title || "");

  const displayBullets = (staticFallback?.bullets && staticFallback.bullets.length > 0)
    ? staticFallback.bullets.map(cleanBullet).filter(Boolean)
    : (activeService ? extractBulletPoints(activeService.description) : []);

  const headerColor = activeService?.headerColor || "#E85D3A";
  const serviceSlug = activeService ? getServiceSlug(activeService) : (activeHover === "business" ? "accounts_and_logistics" : activeHover === "tax" ? "tax_prep" : activeHover === "bookkeeping" ? "virtual_bookkeeping" : activeHover || "");

  return (
    <section
      aria-labelledby="hero-heading"
      className="w-full overflow-hidden bg-slate-200 pt-[110px] lg:pt-0"
      onClick={() => setActiveHover(null)}
    >
      <h1 id="hero-heading" className="sr-only">
        consider-itdone | Premium US Business & Home Solutions
      </h1>
      <div className="relative w-full aspect-[16/9] select-none overflow-hidden">
        {/* Main Background Image - Fits exactly to 16:9 container */}
        <Image
          src="/images/hero.webp"
          alt="consider-itdone Premium Services Layout"
          fill
          priority
          className="object-cover object-bottom pointer-events-none"
          sizes="100vw"
        />

        {/* Character overlay images */}

        {/* 1. Solar (Roof) - 2.webp */}
        <Link
          href={`/services/${getServiceSlug(getMatchedService("solar") || { key: "solar", title: "solar", image: "", bgColor: "", textColor: "", headerColor: "", description: "", left: 0, top: 0, pillLeft: 0, pillLabelLeft: 0, pillLabelTop: 0, pillLabelWidth: 0, pillLabelHeight: 0 })}`}
          onMouseEnter={() => setActiveHover("solar")}
          onMouseLeave={() => setActiveHover(null)}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-[18%] left-[25%] w-[16%] h-[24%] cursor-pointer group z-10 block"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              className={`absolute inset-0 rounded-full transition-all duration-500 pointer-events-none opacity-0 blur-xl ${activeHover === "solar" ? "opacity-100 scale-[1.3] animate-pulse" : ""}`}
              style={{ background: "radial-gradient(circle, rgba(46,158,90,0.45) 0%, rgba(46,158,90,0) 70%)" }}
            />
            <Image src="/images/services/2.webp" alt="Solar Installer" fill priority className="object-contain" sizes="250px" />
          </div>
        </Link>

        {/* 2. Business Management (Bottom Left) - 1.webp */}
        <Link
          href={`/services/${getServiceSlug(getMatchedService("business") || { key: "accounts_and_logistics", title: "Small Business Management Solutions", image: "", bgColor: "", textColor: "", headerColor: "", description: "", left: 0, top: 0, pillLeft: 0, pillLabelLeft: 0, pillLabelTop: 0, pillLabelWidth: 0, pillLabelHeight: 0 })}`}
          onMouseEnter={() => setActiveHover("business")}
          onMouseLeave={() => setActiveHover(null)}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-[70%] left-[10%] w-[12%] h-[32%] cursor-pointer group z-10 block"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              className={`absolute inset-0 rounded-full transition-all duration-500 pointer-events-none opacity-0 blur-xl ${activeHover === "business" ? "opacity-100 scale-[1.3] animate-pulse" : ""}`}
              style={{ background: "radial-gradient(circle, rgba(27,94,146,0.45) 0%, rgba(27,94,146,0) 70%)" }}
            />
            <Image src="/images/services/1.webp" alt="Business Manager" fill priority className="object-contain" sizes="200px" />
          </div>
        </Link>

        {/* 3. Tax Preparation (Bottom Center-Left) - 3.webp */}
        <Link
          href={`/services/${getServiceSlug(getMatchedService("tax") || { key: "tax_prep", title: "Tax Preparation", image: "", bgColor: "", textColor: "", headerColor: "", description: "", left: 0, top: 0, pillLeft: 0, pillLabelLeft: 0, pillLabelTop: 0, pillLabelWidth: 0, pillLabelHeight: 0 })}`}
          onMouseEnter={() => setActiveHover("tax")}
          onMouseLeave={() => setActiveHover(null)}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-[75%] left-[28%] w-[14%] h-[22%] cursor-pointer group z-10 block"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              className={`absolute inset-0 rounded-full transition-all duration-500 pointer-events-none opacity-0 blur-xl ${activeHover === "tax" ? "opacity-100 scale-[1.3] animate-pulse" : ""}`}
              style={{ background: "radial-gradient(circle, rgba(232,93,58,0.45) 0%, rgba(232,93,58,0) 70%)" }}
            />
            <Image src="/images/services/3.webp" alt="Tax Specialist" fill priority className="object-contain" sizes="220px" />
          </div>
        </Link>

        {/* 4. Bookkeeping (Right Balcony) - 5.webp */}
        <Link
          href={`/services/${getServiceSlug(getMatchedService("bookkeeping") || { key: "virtual_bookkeeping", title: "Virtual Bookkeeping", image: "", bgColor: "", textColor: "", headerColor: "", description: "", left: 0, top: 0, pillLeft: 0, pillLabelLeft: 0, pillLabelTop: 0, pillLabelWidth: 0, pillLabelHeight: 0 })}`}
          onMouseEnter={() => setActiveHover("bookkeeping")}
          onMouseLeave={() => setActiveHover(null)}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-[33.5%] left-[73%] w-[14%] h-[39%] cursor-pointer group z-10 block"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              className={`absolute inset-0 rounded-full transition-all duration-500 pointer-events-none opacity-0 blur-xl ${activeHover === "bookkeeping" ? "opacity-100 scale-[1.3] animate-pulse" : ""}`}
              style={{ background: "radial-gradient(circle, rgba(46,158,90,0.45) 0%, rgba(46,158,90,0) 70%)" }}
            />
            <Image src="/images/services/5.webp" alt="Virtual Bookkeeper" fill priority className="object-contain" sizes="250px" />
          </div>
        </Link>

        {/* 5. Procurement (Bottom Right) - 6.webp */}
        <Link
          href={`/services/${getServiceSlug(getMatchedService("procurement") || { key: "procurement", title: "Procurement", image: "", bgColor: "", textColor: "", headerColor: "", description: "", left: 0, top: 0, pillLeft: 0, pillLabelLeft: 0, pillLabelTop: 0, pillLabelWidth: 0, pillLabelHeight: 0 })}`}
          onMouseEnter={() => setActiveHover("procurement")}
          onMouseLeave={() => setActiveHover(null)}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-[70%] left-[72%] w-[28%] h-[40%] cursor-pointer group z-10 block"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              className={`absolute inset-0 rounded-full transition-all duration-500 pointer-events-none opacity-0 blur-xl ${activeHover === "procurement" ? "opacity-100 scale-[1.3] animate-pulse" : ""}`}
              style={{ background: "radial-gradient(circle, rgba(232,93,58,0.45) 0%, rgba(232,93,58,0) 70%)" }}
            />
            <Image src="/images/services/6.webp" alt="Procurement Partners" fill priority className="object-contain" sizes="300px" />
          </div>
        </Link>

        {/* Dynamic Glassmorphic hover card popup */}
        {activeHover && displayTitle && (
          <Link
            href={`/services/${serviceSlug}`}
            className={`absolute ${cardPositions[activeHover] || "top-[25%] left-[48%]"} max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:top-[4%] max-lg:w-[90%] max-lg:max-w-[280px] w-[330px] rounded-[24px] bg-[#0E2D53]/90 border border-white/25 backdrop-blur-xl p-4 md:p-6 flex flex-col text-white shadow-2xl transition-all duration-300 z-20 cursor-pointer hover:scale-105 group`}
          >
            <h3 className="text-sm md:text-xl font-bold tracking-tight mb-2 md:mb-3 leading-tight transition-colors group-hover:text-amber-400" style={{ color: headerColor }}>
              {displayTitle}
            </h3>
            <hr className="border-white/30 mb-3 md:mb-5" />
            <ul className="space-y-2 md:space-y-3.5 text-[10px] md:text-xs sm:text-sm font-semibold text-white/95 mb-3">
              {displayBullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-1.5 md:gap-2">
                  <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:underline">
              <span>View Service Details</span>
              <span>→</span>
            </div>
          </Link>
        )}

        <div className="absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm px-3 md:px-6 py-1 md:py-2 rounded-full border border-white/10 z-10 pointer-events-none">
          <p className="text-[8px] md:text-xs font-semibold text-white/95 uppercase tracking-widest text-center whitespace-nowrap">
            💡 Hover or tap the 5 team characters to explore core services
          </p>
        </div>
      </div>
    </section>
  );
}
