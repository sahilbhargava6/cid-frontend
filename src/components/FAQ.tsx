"use client";

import { useState } from "react";

const faqData = [
  {
    category: "Tax Preparation",
    questions: [
      {
        q: "What types of tax returns do you handle?",
        a: "We handle individual (1040), small business (Schedule C), partnership (1065), S-Corp (1120-S), and C-Corp (1120) returns. We also assist with state filings in all 50 states, amended returns, and back taxes.",
      },
      {
        q: "How do you guarantee accuracy?",
        a: "Every return goes through a triple-check process: initial preparation by a certified tax professional, quality review by a senior accountant, and final compliance check before filing. We cover any penalties due to our errors.",
      },
    ],
  },
  {
    category: "Virtual Bookkeeping",
    questions: [
      {
        q: "How does virtual bookkeeping work?",
        a: "We securely connect to your accounting software (QuickBooks, Xero, FreshBooks, etc.) and handle daily transaction categorization, bank reconciliation, monthly financial statements, and year-end preparation — all remotely.",
      },
      {
        q: "Can you work with my existing accounting software?",
        a: "Absolutely. We support QuickBooks Online, Xero, FreshBooks, Wave, and most major platforms. If you don't have one yet, we'll help you set up the best option for your business.",
      },
    ],
  },
  {
    category: "Home Solar",
    questions: [
      {
        q: "How much can I save with solar panels?",
        a: "Most homeowners save 50–80% on electricity bills. The exact savings depend on your location, roof size, energy usage, and available federal/state incentives. We provide a free assessment with projected savings.",
      },
      {
        q: "Do you handle permits and installation?",
        a: "Yes — we manage the entire process from site assessment, engineering design, permits, installation, utility interconnection, to final inspection. True turnkey service.",
      },
    ],
  },
  {
    category: "Business Management",
    questions: [
      {
        q: "What's included in the unified business solution?",
        a: "Our unified solution covers accounts payable/receivable, payroll management, inventory tracking, shipping logistics, front desk optimization (Setmore, Calendly), and marketing/cross-selling strategy recommendations — all in one package.",
      },
    ],
  },
  {
    category: "Procurement",
    questions: [
      {
        q: "What can you source for me?",
        a: "Virtually anything — electronics, vehicles, industrial equipment, real estate, office supplies, specialized machinery. We leverage our network of vendors and wholesale partnerships to find the best price and quality.",
      },
    ],
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="border-b transition-colors duration-200"
      style={{ borderColor: "var(--cid-gray-200)" }}
    >
      <button
        className="w-full flex items-center justify-between py-5 px-1 text-left group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span
          className="text-base font-semibold pr-4 transition-colors duration-200 group-hover:text-[var(--cid-coral)]"
          style={{ color: "var(--cid-dark)" }}
        >
          {question}
        </span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          style={{
            backgroundColor: isOpen
              ? "var(--cid-coral)"
              : "var(--cid-gray-100)",
            color: isOpen ? "white" : "var(--cid-gray-500)",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] opacity-100 pb-5" : "max-h-0 opacity-0"
        }`}
      >
        <p
          className="text-sm leading-relaxed px-1"
          style={{ color: "var(--cid-gray-500)" }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ["All", ...faqData.map((cat) => cat.category)];

  // Flatten and filter questions based on selection
  const filteredQuestions = faqData
    .flatMap((cat) =>
      cat.questions.map((q) => ({ ...q, category: cat.category }))
    )
    .filter(
      (q) => selectedCategory === "All" || q.category === selectedCategory
    );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setOpenIndex(0); // auto-open the first question in the selected category
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="section-padding"
      style={{
        background: "linear-gradient(180deg, #F5F3F0 0%, #FAFAF8 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
            style={{ color: "var(--cid-coral)" }}
          >
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="font-bold mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "var(--cid-dark)",
            }}
          >
            Got Questions?{" "}
            <span className="gradient-text">We&apos;ve Got Answers</span>
          </h2>
          <p
            className="max-w-xl mx-auto text-base"
            style={{ color: "var(--cid-gray-500)" }}
          >
            Everything you need to know about our services. Can&apos;t find your
            answer?{" "}
            <a
              href="#contact"
              className="font-semibold underline underline-offset-2 transition-colors hover:text-[var(--cid-coral)]"
              style={{ color: "var(--cid-blue)" }}
            >
              Contact us
            </a>
            .
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "text-white shadow-md scale-105"
                    : "hover:bg-[var(--cid-gray-200)]"
                }`}
                style={{
                  backgroundColor: isActive ? "var(--cid-coral)" : "var(--cid-white)",
                  color: isActive ? "white" : "var(--cid-gray-700)",
                  border: isActive ? "1px solid var(--cid-coral)" : "1px solid var(--cid-gray-200)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Accordion */}
        <div
          className="rounded-2xl p-6 md:p-8 transition-all duration-300"
          style={{
            background: "var(--cid-white)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((item, i) => (
              <AccordionItem
                key={`${selectedCategory}-${i}`}
                question={item.q}
                answer={item.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))
          ) : (
            <p className="text-center py-6 text-sm text-[var(--cid-gray-500)]">
              No questions found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
