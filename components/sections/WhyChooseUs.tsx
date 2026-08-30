"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Compass,
  Gem,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/ui/Reveal";

const features = [
  {
    icon: Compass,
    title: "Personalized Buying Experience",
    description:
      "Every engagement begins with a private consultation to map your lifestyle, not just your budget.",
  },
  {
    icon: Gem,
    title: "Exclusive Luxury Listings",
    description:
      "Access to off-market and pre-listing inventory unavailable on public portals.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Market Experts",
    description:
      "Two decades of combined experience navigating the world's most competitive markets.",
  },
  {
    icon: TrendingUp,
    title: "Investment Guidance",
    description:
      "Data-backed advisory on appreciation potential, yield, and portfolio diversification.",
  },
  {
    icon: Users,
    title: "Direct Expert Consultation",
    description:
      "A dedicated senior advisor from first call to closing — no call centers, no hand-offs.",
  },
  {
    icon: Brain,
    title: "AI-Powered Property Search",
    description:
      "Our proprietary advisor filters thousands of listings into the handful that actually matter.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-noir-surface/40 py-32">
      <div className="absolute inset-0 grid-lines opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="The Noir Difference"
          title="Why Choose Noir Estates"
          description="A brokerage built for clients who expect more than a listing agent — they expect a strategist."
        />

        <StaggerContainer
          stagger={0.1}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-noir-bg/60 p-8 transition-colors hover:border-noir-gold/30"
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-noir-gold/[0.06] blur-2xl transition-all duration-500 group-hover:bg-noir-gold/[0.14]" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-noir-gold/20 bg-noir-gold/[0.06] text-noir-gold transition-transform duration-500 group-hover:scale-110">
                  <feature.icon size={24} />
                </div>
                <h3 className="relative mt-6 font-display text-xl font-medium text-white">
                  {feature.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-noir-muted">
                  {feature.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
