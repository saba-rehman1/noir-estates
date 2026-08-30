"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { faqs } from "@/lib/data";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-noir-surface/40 py-32">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Questions & Answers"
          title="Frequently Asked Questions"
          description="Everything you need to know about buying, selling, and investing with Noir Estates."
        />

        <div className="mt-16 space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={i * 0.05}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    isOpen ? "border-noir-gold/30 bg-noir-gold/[0.03]" : "border-white/[0.08] bg-noir-bg/40"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-8"
                  >
                    <span className="font-display text-base font-medium text-white sm:text-lg">
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                        isOpen ? "border-noir-gold bg-noir-gold text-noir-bg" : "border-white/20 text-white"
                      }`}
                    >
                      <Plus size={14} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-noir-muted sm:px-8">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
