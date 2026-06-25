export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Tell Us What You Need",
      description:
        "Share your requirements — whether it's tax filing, daily bookkeeping, solar installation, logistics support, or product sourcing. We listen.",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--cid-coral)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "We Handle Everything",
      description:
        "Our US-based team of specialists takes over. No back-and-forth, no micromanaging. We keep you updated every step of the way.",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--cid-blue)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Consider It Done",
      description:
        "Receive your completed deliverables — accurate taxes, balanced books, installed panels, optimized operations, or sourced products.",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--cid-green)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="section-padding"
      style={{ backgroundColor: "var(--cid-white)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
            style={{ color: "var(--cid-coral)" }}
          >
            How It Works
          </p>
          <h2
            id="how-heading"
            className="font-bold mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "var(--cid-dark)",
            }}
          >
            Three Simple Steps to{" "}
            <span className="gradient-text">Stress-Free</span>
          </h2>
          <p
            className="max-w-xl mx-auto text-base lg:text-lg"
            style={{ color: "var(--cid-gray-500)" }}
          >
            We&apos;ve streamlined our process so you can focus on what matters
            most — running your business and living your life.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-8 md:gap-6">
          {/* Connecting line (desktop) */}
          <div
            className="hidden md:block absolute top-[60px] left-[16.67%] right-[16.67%] h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, var(--cid-coral), var(--cid-blue), var(--cid-green))",
              opacity: 0.25,
            }}
          />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Number circle */}
              <div
                className="relative z-10 w-[80px] h-[80px] rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                style={{
                  background: "var(--cid-white)",
                  border: `2px solid ${
                    i === 0
                      ? "var(--cid-coral)"
                      : i === 1
                      ? "var(--cid-blue)"
                      : "var(--cid-green)"
                  }`,
                  boxShadow: `0 4px 20px ${
                    i === 0
                      ? "rgba(232, 93, 58, 0.15)"
                      : i === 1
                      ? "rgba(27, 94, 146, 0.15)"
                      : "rgba(46, 158, 90, 0.15)"
                  }`,
                }}
              >
                {step.icon}
              </div>

              {/* Step number */}
              <span
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{
                  color:
                    i === 0
                      ? "var(--cid-coral)"
                      : i === 1
                      ? "var(--cid-blue)"
                      : "var(--cid-green)",
                }}
              >
                Step {step.number}
              </span>

              {/* Title */}
              <h3
                className="text-xl font-bold mb-3"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--cid-dark)",
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed max-w-[300px]"
                style={{ color: "var(--cid-gray-500)" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
