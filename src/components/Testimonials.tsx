const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Small Business Owner, Austin TX",
    service: "Tax Preparation",
    rating: 5,
    text: "consider-itdone handled my small business taxes flawlessly. They found deductions I didn't even know existed and saved me over $4,000. Stress-free doesn't even begin to describe it.",
    avatar: "SM",
  },
  {
    name: "James Rodriguez",
    role: "Freelance Consultant, Miami FL",
    service: "Virtual Bookkeeping",
    rating: 5,
    text: "I used to dread looking at my books. Now my finances are updated daily, perfectly balanced, and I actually understand where my money goes. Game changer.",
    avatar: "JR",
  },
  {
    name: "The Thompson Family",
    role: "Homeowners, Phoenix AZ",
    service: "Home Solar Systems",
    rating: 5,
    text: "No gimmicks — they actually delivered. Our electricity bill dropped 70% after installation. The team was professional, transparent, and got it done in under a week.",
    avatar: "TF",
  },
  {
    name: "Patricia Chen",
    role: "Retail Store Owner, Seattle WA",
    service: "Business Accounts & Logistics",
    rating: 5,
    text: "They unified my accounting and logistics into one system. My front desk scheduling is optimized, and they even helped with cross-selling strategies. Revenue is up 22%.",
    avatar: "PC",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < rating ? "var(--cid-coral)" : "var(--cid-gray-200)"}
          stroke={i < rating ? "var(--cid-coral)" : "var(--cid-gray-200)"}
          strokeWidth="1"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="section-padding"
      style={{ backgroundColor: "var(--cid-white)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
            style={{ color: "var(--cid-coral)" }}
          >
            Testimonials
          </p>
          <h2
            id="testimonials-heading"
            className="font-bold mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "var(--cid-dark)",
            }}
          >
            Hear From Our{" "}
            <span className="gradient-text">Happy Clients</span>
          </h2>
          <p
            className="max-w-xl mx-auto text-base lg:text-lg"
            style={{ color: "var(--cid-gray-500)" }}
          >
            Real stories from real clients across America who trusted us with
            their most important tasks.
          </p>
        </div>

        {/* Testimonial grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="card-hover group relative flex flex-col p-6 rounded-2xl"
              style={{
                background: "var(--cid-white)",
                boxShadow: "var(--card-shadow)",
                border: "1px solid var(--cid-gray-200)",
              }}
            >
              {/* Rating */}
              <StarRating rating={t.rating} />

              {/* Quote */}
              <p
                className="mt-4 text-sm leading-relaxed flex-1"
                style={{ color: "var(--cid-gray-700)" }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-5 pt-4 border-t flex items-center gap-3" style={{ borderColor: "var(--cid-gray-200)" }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, var(--cid-coral), var(--cid-coral-light))`,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--cid-dark)" }}>
                    {t.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--cid-gray-500)" }}>
                    {t.role}
                  </p>
                </div>
              </div>

              {/* Service badge */}
              <div className="mt-3">
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(27, 94, 146, 0.08)",
                    color: "var(--cid-blue)",
                  }}
                >
                  {t.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
