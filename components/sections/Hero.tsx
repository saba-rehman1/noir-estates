"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, PlayCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Particles from "@/components/ui/Particles";
import { stats } from "@/lib/data";
import { openChatbot, scrollToId } from "@/lib/utils";

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen w-full flex-col overflow-hidden bg-noir-bg">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2400&q=80"
          alt="Luxury mansion at dusk"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-noir-bg/70 via-noir-bg/60 to-noir-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-noir-bg/80 via-transparent to-noir-bg/40" />
        <div className="absolute inset-0 grid-lines opacity-40" />
      </div>

      <Particles count={24} />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow rounded-full bg-noir-gold/[0.04] blur-[140px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-start justify-center px-6 pt-32 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-8 flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-noir-gold opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-noir-gold" />
          </span>
          <span className="text-xs font-medium uppercase tracking-widest2 text-noir-muted">
            AI-Powered Property Intelligence
          </span>
        </motion.div>

        <h1 className="max-w-4xl font-display text-5xl font-medium leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            Find Extraordinary Homes.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="block text-gradient-gold"
          >
            Live Exceptionally.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-8 max-w-lg text-balance text-base leading-relaxed text-noir-muted sm:text-lg"
        >
          A curated portfolio of the world&apos;s most extraordinary residences, matched to you
          by veteran advisors and a proprietary AI trained on real-time market intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button
            variant="gold"
            size="lg"
            icon={<ArrowRight size={16} />}
            onClick={() => scrollToId("properties")}
          >
            Explore Properties
          </Button>
          <Button
            variant="outline"
            size="lg"
            icon={<PlayCircle size={16} />}
            onClick={() => scrollToId("contact")}
          >
            Book Consultation
          </Button>
          <Button
            variant="blue"
            size="lg"
            icon={<MessageCircle size={16} />}
            onClick={() => openChatbot()}
          >
            Talk to AI Advisor
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 sm:px-8"
      >
        <div className="grid grid-cols-2 gap-6 border-t border-white/[0.08] pt-8 sm:grid-cols-4 sm:gap-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + i * 0.1 }}
            >
              <div className="font-display text-3xl font-medium text-white sm:text-4xl">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={2.2}
                />
              </div>
              <p className="mt-1 text-xs uppercase tracking-wider text-noir-muted">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 right-8 hidden flex-col items-center gap-2 text-noir-muted sm:flex"
      >
        <span className="text-[10px] uppercase tracking-widest2">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-9 w-5 rounded-full border border-white/20 p-1"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-noir-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
