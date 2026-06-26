"use client";

export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="py-16 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className="text-2xl md:text-3xl font-extrabold mb-3 tracking-tight"
            style={{ color: "#591B1B", fontFamily: "var(--font-heading)" }}
          >
            Why Smart Businesses Work With Us
          </h2>
        </div>

        {/* Two Columns Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

          {/* Left Block - Centered tall card */}
          <div
            className="rounded-[24px] p-8 md:p-12 flex flex-col justify-center items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-[#E2ECF2] min-h-[250px]"
            style={{
              backgroundColor: "#EBF1F5",
            }}
          >
            <h3
              className="text-lg md:text-xl font-bold mb-4 tracking-tight"
              style={{ color: "#E8503A" }}
            >
              We Handle The Details.
            </h3>
            <p
              className="text-xs md:text-sm leading-relaxed font-bold max-w-sm"
              style={{ color: "#E8728C" }}
            >
              Accurate bookkeeping, tax optimization, and financial clarity without the headaches.
            </p>
          </div>

          {/* Right Block - Stacked Cards */}
          <div className="flex flex-col gap-6 justify-between">

            {/* Card 1 */}
            <div
              className="rounded-[24px] p-6 md:p-8 flex flex-col justify-center shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-[#E2ECF2] flex-1"
              style={{
                backgroundColor: "#EBF1F5",
              }}
            >
              <h4
                className="text-sm md:text-base font-bold mb-2 tracking-tight"
                style={{ color: "#E8503A" }}
              >
                Less Stress. More Growth.
              </h4>
              <p
                className="text-xs leading-relaxed font-bold"
                style={{ color: "#E8728C" }}
              >
                Spend less time managing back-office tasks and more time building your business.
              </p>
            </div>

            {/* Card 2 */}
            <div
              className="rounded-[24px] p-6 md:p-8 flex flex-col justify-center shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-[#E2ECF2] flex-1"
              style={{
                backgroundColor: "#EBF1F5",
              }}
            >
              <h4
                className="text-sm md:text-base font-bold mb-2 tracking-tight"
                style={{ color: "#E8503A" }}
              >
                Smarter Decisions, Better Results.
              </h4>
              <p
                className="text-xs leading-relaxed font-bold"
                style={{ color: "#E8728C" }}
              >
                Actionable insights, optimized workflows, and strategic recommendations that drive growth.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
