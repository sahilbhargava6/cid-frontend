"use client";

import Image from "next/image";
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

export default function Services() {
  const auth = useAuth();
  const user = auth ? auth.user : null;

  const getBookingUrl = (param: string) => {
    return user ? `/dashboard?book=${param}` : `/login?book=${param}`;
  };

  return (
    <section
      id="services"
      className="py-16 bg-white overflow-hidden"
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

        {/* Responsive grid to fit all 6 blocks on one screen for iPad/desktop */}
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
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 17vw"
                />
              </div>

              {/* Styled Title Label Pill with responsive text size & height */}
              <div 
                className="mt-4 w-full text-center py-2 px-2.5 rounded-[16px] sm:rounded-[20px] text-xs sm:text-sm md:text-xs lg:text-sm xl:text-[18px] font-bold transition-all duration-200 group-hover:bg-[#C2E4DA] flex items-center justify-center h-[90px] sm:h-[110px] md:h-[95px] lg:h-[120px] xl:h-[140px] leading-snug shadow-sm"
                style={{
                  backgroundColor: "#DCEFE9",
                  color: "#2D6FA3",
                }}
              >
                {service.title}
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
