"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  const t = testimonials[index];

  return (
    <section className="relative overflow-hidden bg-noir-bg py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-noir-gold/[0.04] blur-[150px]" />
      <div className="relative mx-auto max-w-4xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Client Stories"
          title="What Our Clients Say"
          description="Trusted by discerning buyers and sellers across the world's most competitive luxury markets."
        />

        <Reveal className="relative mt-16">
          <div className="glass noise relative min-h-[320px] overflow-hidden rounded-[32px] p-10 sm:p-14">
            <Quote className="absolute right-8 top-8 text-noir-gold/10" size={80} />
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 40 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="mb-6 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-noir-gold text-noir-gold" />
                  ))}
                </div>
                <p className="balance font-display text-2xl font-medium leading-snug text-white sm:text-3xl">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-noir-gold/30">
                    <Image src={t.image} alt={t.name} fill className="object-cover" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-noir-muted">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-noir-gold/50 hover:text-noir-gold"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-noir-gold" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-noir-gold/50 hover:text-noir-gold"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
