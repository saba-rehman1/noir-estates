"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { formatCurrency } from "@/lib/utils";

const cities = [
  { id: "la", name: "Los Angeles", angle: -60, radius: 34, listings: 128, flagship: "Azure Horizon Villa", price: 8250000, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=70" },
  { id: "malibu", name: "Malibu", angle: -10, radius: 42, listings: 46, flagship: "Meridian Cliffside Estate", price: 18900000, image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=70" },
  { id: "nyc", name: "New York", angle: 40, radius: 30, listings: 96, flagship: "The Obsidian Penthouse", price: 12500000, image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=400&q=70" },
  { id: "miami", name: "Miami", angle: 100, radius: 40, listings: 84, flagship: "Sapphire Bay Residence", price: 15750000, image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=400&q=70" },
  { id: "chicago", name: "Chicago", angle: 165, radius: 26, listings: 38, flagship: "The Monarch Penthouse", price: 6400000, image: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=400&q=70" },
  { id: "aspen", name: "Aspen", angle: -130, radius: 24, listings: 22, flagship: "Bel Air Modern Mansion", price: 24500000, image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=400&q=70" },
];

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    left: `${50 + radius * Math.cos(rad)}%`,
    top: `${50 + radius * Math.sin(rad)}%`,
  };
}

export default function InteractiveMap() {
  const [active, setActive] = useState<string | null>(null);
  const activeCity = cities.find((c) => c.id === active);

  return (
    <section className="relative overflow-hidden bg-noir-surface/40 py-32">
      <div className="absolute inset-0 grid-lines opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Global Reach"
          title="Our Presence, Mapped"
          description="A live view of Noir Estates' footprint across the world's most sought-after luxury markets."
        />

        <Reveal className="mt-16">
          <div className="relative mx-auto aspect-square w-full max-w-3xl">
            {/* concentric rings */}
            {[100, 76, 52, 28].map((size) => (
              <div
                key={size}
                className="absolute rounded-full border border-white/[0.06]"
                style={{
                  width: `${size}%`,
                  height: `${size}%`,
                  left: `${(100 - size) / 2}%`,
                  top: `${(100 - size) / 2}%`,
                }}
              />
            ))}

            {/* rotating sweep */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(212,175,55,0.25), transparent 30%)",
              }}
            />

            {/* center hub */}
            <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-noir-gold/40 bg-noir-bg text-center shadow-gold">
              <span className="font-display text-[10px] font-medium leading-tight text-white">
                NOIR
                <br />
                HQ
              </span>
            </div>

            {/* connecting lines + pins */}
            <svg className="absolute inset-0 h-full w-full overflow-visible">
              {cities.map((city) => {
                const pos = polar(city.angle, city.radius);
                return (
                  <line
                    key={city.id}
                    x1="50%"
                    y1="50%"
                    x2={pos.left}
                    y2={pos.top}
                    stroke={active === city.id ? "#D4AF37" : "rgba(255,255,255,0.1)"}
                    strokeWidth={1}
                  />
                );
              })}
            </svg>

            {cities.map((city, i) => {
              const pos = polar(city.angle, city.radius);
              return (
                <div
                  key={city.id}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={pos}
                  onMouseEnter={() => setActive(city.id)}
                  onMouseLeave={() => setActive((cur) => (cur === city.id ? null : cur))}
                >
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                    className="relative flex h-4 w-4 items-center justify-center rounded-full bg-noir-gold"
                  >
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-noir-gold opacity-60" />
                    <MapPin size={9} className="relative text-noir-bg" />
                  </motion.button>

                  <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-wider text-noir-muted">
                    {city.name}
                  </span>

                  <AnimatePresence>
                    {active === city.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="glass absolute bottom-full left-1/2 z-20 mb-4 w-56 -translate-x-1/2 overflow-hidden rounded-2xl shadow-luxe"
                      >
                        <div className="relative h-24 w-full">
                          <Image src={city.image} alt={city.flagship} fill className="object-cover" />
                        </div>
                        <div className="p-3">
                          <p className="text-xs font-medium text-white">{city.flagship}</p>
                          <p className="mt-1 text-xs text-noir-gold">{formatCurrency(city.price)}</p>
                          <p className="mt-1 text-[10px] text-noir-muted">
                            {city.listings} active listings in {city.name}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
