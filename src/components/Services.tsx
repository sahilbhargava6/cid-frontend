"use client";

import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const services = [
  {
    title: "Tax Preparation",
    image: "/tax-service.png",
    tags: [
      "Stress-free tax resolution",
      "Optimizing your annual return",
      "Guaranteed accuracy",
    ],
    color: "#E85D3A",
    param: "tax_prep",
  },
  {
    title: "Virtual Bookkeeping",
    image: "/bookkeeping-service.png",
    tags: [
      "Streamline your financial clarity",
      "Virtual books, accurate daily",
      "Your books, perfectly balanced",
    ],
    color: "#1B5E92",
    param: "virtual_bookkeeping",
  },
  {
    title: "Home Solar Systems",
    image: "/solar-service.png",
    tags: [
      "Clean electricity, lower bills",
      "Your roof, your power",
      "No gimmicks",
    ],
    color: "#2E9E5A",
    param: "solar",
  },
  {
    title: "Business Accounts & Logistics",
    image: "/business-service.png",
    tags: [
      "Unified accounts + logistics",
      "Front desk optimizations",
      "Marketing & cross-selling",
    ],
    color: "#E85D3A",
    param: "accounts_and_logistics",
  },
  {
    title: "Procurement Services",
    image: "/procurement-service.png",
    tags: [
      "Sourcing whatever you require",
      "Electronics to automobiles to homes",
      "We find it, you benefit",
    ],
    color: "#1B5E92",
    param: "procurement",
  },
];

export default function Services() {
  const auth = useAuth();
  const user = auth ? auth.user : null;

  const getBookingUrl = (param: string) => {
    return user ? `/dashboard?book=${param}` : `/login?book=${param}`;
  };

  const getGeneralBookingUrl = () => {
    return user ? `/dashboard?book=general` : `/login`;
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section-padding overflow-hidden"
      style={{ backgroundColor: "var(--cid-light)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
            style={{ color: "var(--cid-coral)" }}
          >
            Our Services
          </p>
          <h2
            id="services-heading"
            className="font-bold mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "var(--cid-dark)",
            }}
          >
            Everything Your Business Needs,{" "}
            <span className="gradient-text">Under One Roof</span>
          </h2>
          <p
            className="max-w-2xl mx-auto text-base lg:text-lg"
            style={{ color: "var(--cid-gray-500)" }}
          >
            From tax resolution to global procurement — we handle the
            complexity so you can focus on growth.
          </p>
        </div>

        {/* Cinematic service cards */}
        <div
          className="relative overflow-hidden rounded-3xl p-6 md:p-10"
          style={{
            background:
              "linear-gradient(135deg, #0F1117 0%, #1A1D27 50%, #0F1117 100%)",
            boxShadow:
              "0 -8px 30px rgba(0,0,0,0.08), 0 4px 20px rgba(0,0,0,0.12)",
          }}
        >
          {/* Header inside dark card */}
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                5 Service Verticals
              </p>
              <h3
                className="font-bold text-white"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
                }}
              >
                What Can We Handle For You?
              </h3>
            </div>
            <a
              className="group flex items-center gap-1.5 text-sm font-semibold flex-shrink-0 mt-1 transition-all duration-300 hover:opacity-80"
              style={{ color: "rgba(255,255,255,0.85)" }}
              href={getGeneralBookingUrl()}
            >
              Book Now
              <span
                className="flex items-center justify-center rounded-full w-6 h-6 text-xs font-bold transition-all duration-300 group-hover:shadow-lg group-hover:scale-110"
                style={{
                  background: "white",
                  color: "var(--cid-coral)",
                  boxShadow: "0 2px 8px rgba(232, 93, 58, 0.25)",
                }}
              >
                →
              </span>
            </a>
          </div>

          {/* Service cards grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {services.map((service) => (
              <a
                key={service.title}
                href={getBookingUrl(service.param)}
                className="group relative block overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.04] h-[280px] sm:h-[320px] lg:h-[360px]"
                style={{
                  boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Background image */}
                <Image
                  alt={service.title}
                  src={service.image}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 z-[1]"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
                  }}
                />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-3 sm:p-4">
                  <h4
                    className="font-bold text-white leading-snug text-sm sm:text-base mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {service.title}
                  </h4>
                  <ul className="hidden sm:flex flex-col gap-1">
                    {service.tags.map((tag) => (
                      <li
                        key={tag}
                        className="text-[11px] flex items-start gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ color: "rgba(255,255,255,0.8)" }}
                      >
                        <svg
                          className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={service.color}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between mt-2">
                    <span
                      className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${service.color}22`,
                        color: service.color,
                      }}
                    >
                      Book Now
                    </span>
                    <span
                      className="flex-shrink-0 flex items-center justify-center rounded-full font-bold transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg w-6 h-6 text-xs"
                      style={{
                        background: "rgba(255,255,255,0.95)",
                        color: service.color,
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      →
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

