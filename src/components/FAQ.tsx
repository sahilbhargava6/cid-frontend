"use client";

import { useState, useEffect } from "react";
import { useSiteConfig } from "@/data/siteConfigData";

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
      className="border-b transition-colors duration-200 border-slate-100"
    >
      <button
        className="w-full flex items-center justify-between py-5 px-1 text-left group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span
          className="text-base font-semibold pr-4 transition-colors duration-200 group-hover:text-[#E8503A]"
          style={{ color: "#1b5e92" }}
        >
          {question}
        </span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          style={{
            backgroundColor: isOpen ? "#E8728C" : "#EBF7FD",
            color: isOpen ? "white" : "#2D6FA3",
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
          className="text-sm leading-relaxed px-1 font-semibold"
          style={{ color: "#7A8F9E" }}
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
  const config = useSiteConfig();

  const faqData = config.faqs;
  const categories = ["All", ...faqData.map((cat) => cat.category)];

  const filteredQuestions = faqData
    .flatMap((cat) =>
      cat.questions.map((q) => ({ ...q, category: cat.category }))
    )
    .filter(
      (q) => selectedCategory === "All" || q.category === selectedCategory
    );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setOpenIndex(0);
  };

  return (
    <section
      id="faq"
      className="py-16 bg-[#FAFAF8] border-t border-[#E2ECF2]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section header */}
        <div className="text-center mb-10">
          <h2
            className="text-2xl md:text-3xl font-extrabold mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              color: "#591B1B",
            }}
          >
            Got Questions? <span style={{ color: "#E8503A" }}>We&apos;ve Got Answers</span>
          </h2>
          <p
            className="max-w-xl mx-auto text-sm font-semibold"
            style={{ color: "#7A8F9E" }}
          >
            Everything you need to know about our services. Can&apos;t find your
            answer?{" "}
            <a
              href="#contact"
              className="font-bold underline underline-offset-2 transition-colors hover:text-[#E8503A]"
              style={{ color: "#2D6FA3" }}
            >
              Contact us
            </a>
            .
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className="px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 shadow-sm border"
                style={{
                  backgroundColor: isActive ? "#2D6FA3" : "white",
                  color: isActive ? "white" : "#7A8F9E",
                  borderColor: isActive ? "#2D6FA3" : "#E2ECF2",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Accordion */}
        <div
          className="rounded-3xl p-6 md:p-8 transition-all duration-300 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
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
            <p className="text-center py-6 text-sm font-semibold" style={{ color: '#7A8F9E' }}>
              No questions found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
