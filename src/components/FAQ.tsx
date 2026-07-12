import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FAQS } from "../data";

export default function FAQ() {
  const [activeId, setActiveId] = useState<string | null>("faq1"); // default first item open

  const toggleFAQ = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="py-20 px-4 bg-[#050505]">
      <div className="max-w-3xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-14">
          <p className="font-mono text-xs font-semibold tracking-widest text-red-500 uppercase mb-3">
            Dúvidas Frequentes
          </p>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
            PERGUNTAS FREQUENTES
          </h2>
          <div className="w-12 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Accordions List */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = activeId === faq.id;

            return (
              <div
                key={faq.id}
                id={`faq_accordion_${faq.id}`}
                className="bg-[#0d0d0d] border border-gray-900 rounded-2xl overflow-hidden transition-colors duration-200"
              >
                {/* Header/Question Trigger */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between text-left text-white hover:bg-[#121212] transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="font-display font-bold text-sm sm:text-base pr-4">
                    {faq.question}
                  </span>
                  <span className="text-red-500 shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 stroke-[2.5]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                    )}
                  </span>
                </button>

                {/* Answer block with clean height animation */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="border-t border-gray-950 overflow-hidden"
                    >
                      <div className="p-5 sm:p-6 text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
