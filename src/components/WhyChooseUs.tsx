"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "US Clients Served" },
  { value: 99, suffix: "%", label: "Accuracy Rate" },
  { value: 50, suffix: "", label: "States Covered" },
  { value: 12, suffix: "+", label: "Years Combined Experience" },
];

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cid-coral)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Guaranteed Accuracy",
    description: "Every tax return, every ledger entry, every invoice — triple-checked by certified professionals.",
    color: "var(--cid-coral)",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cid-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "US-Based Team",
    description: "Real people, real expertise. Our entire team operates within the United States — no offshore outsourcing.",
    color: "var(--cid-blue)",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cid-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Transparent Pricing",
    description: "No hidden fees, no surprise charges. You know exactly what you're paying before we begin.",
    color: "var(--cid-green)",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cid-coral)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Fast Turnaround",
    description: "We respect your time. Most services are completed within 24–72 hours of engagement.",
    color: "var(--cid-coral)",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cid-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "All-Virtual Convenience",
    description: "Access every service from your couch. Secure digital workflows mean no office visits required.",
    color: "var(--cid-blue)",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cid-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "No Gimmicks",
    description: "Straightforward, honest service. We deliver what we promise — every single time.",
    color: "var(--cid-green)",
  },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [target]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--cid-dark)" }}>
      {count}{suffix}
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-heading"
      className="section-padding"
      style={{
        background: "linear-gradient(180deg, #FAFAF8 0%, #F5F3F0 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "var(--cid-coral)" }}>
            Why Choose Us
          </p>
          <h2
            id="why-heading"
            className="font-bold mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "var(--cid-dark)",
            }}
          >
            Built on Trust,{" "}
            <span className="gradient-text-blue">Backed by Results</span>
          </h2>
        </div>

        {/* Stats bar */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 mb-16 p-8 rounded-2xl"
          style={{
            background: "var(--cid-white)",
            boxShadow: "0 4px 30px rgba(15, 17, 23, 0.06)",
          }}
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-sm mt-1 font-medium" style={{ color: "var(--cid-gray-500)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <div
              key={i}
              className="card-hover group relative p-6 rounded-2xl"
              style={{
                background: "var(--cid-white)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `color-mix(in srgb, ${feature.color} 10%, transparent)`,
                }}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3
                className="text-lg font-bold mb-2"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--cid-dark)",
                }}
              >
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--cid-gray-500)" }}>
                {feature.description}
              </p>

              {/* Subtle accent border on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  border: `1px solid ${feature.color}`,
                  opacity: 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
