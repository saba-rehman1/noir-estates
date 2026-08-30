"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  accent?: "gold" | "blue";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  accent = "gold",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3"
      >
        <span
          className={cn(
            "h-px w-8",
            accent === "gold" ? "bg-noir-gold" : "bg-noir-blue"
          )}
        />
        <span
          className={cn(
            "text-xs font-medium uppercase tracking-widest2",
            accent === "gold" ? "text-noir-gold" : "text-noir-blue"
          )}
        >
          {eyebrow}
        </span>
        <span
          className={cn(
            "h-px w-8",
            accent === "gold" ? "bg-noir-gold" : "bg-noir-blue"
          )}
        />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="balance max-w-3xl font-display text-4xl font-medium leading-[1.1] text-white sm:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl text-balance text-base leading-relaxed text-noir-muted"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
