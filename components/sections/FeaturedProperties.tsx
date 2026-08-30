"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Bath, Bed, Heart, MapPin, Ruler } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/ui/Reveal";
import { properties } from "@/lib/data";
import { formatCurrency, scrollToId } from "@/lib/utils";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&h=900&q=80";

function PropertyCard({ property }: { property: (typeof properties)[number] }) {
  const [saved, setSaved] = useState(false);
  const [imgSrc, setImgSrc] = useState(property.image);

  return (
    <StaggerItem>
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-noir-surface/60 shadow-luxe"
      >
        <div className="relative h-72 w-full overflow-hidden">
          <Image
            src={imgSrc}
            alt={property.title}
            fill
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir-bg/90 via-noir-bg/10 to-transparent" />

          {property.badge && (
            <span className="absolute left-4 top-4 rounded-full border border-noir-gold/40 bg-noir-bg/70 px-3 py-1 text-[10px] font-medium uppercase tracking-widest2 text-noir-gold backdrop-blur-sm">
              {property.badge}
            </span>
          )}

          <button
            aria-label="Save property"
            onClick={() => setSaved((s) => !s)}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-noir-bg/60 text-white backdrop-blur-sm transition-colors hover:border-noir-gold/50"
          >
            <Heart
              size={16}
              className={saved ? "fill-noir-gold text-noir-gold" : "text-white"}
            />
          </button>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <p className="font-display text-2xl font-medium text-white">
                {formatCurrency(property.price, true)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div>
            <h3 className="font-display text-xl font-medium text-white transition-colors group-hover:text-noir-gold">
              {property.title}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-noir-muted">
              <MapPin size={13} className="text-noir-gold" />
              {property.location}, {property.city}
            </p>
          </div>

          <div className="flex items-center gap-5 border-y border-white/[0.06] py-3 text-sm text-noir-muted">
            <span className="flex items-center gap-1.5">
              <Bed size={15} className="text-noir-blue" /> {property.beds}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath size={15} className="text-noir-blue" /> {property.baths}
            </span>
            <span className="flex items-center gap-1.5">
              <Ruler size={15} className="text-noir-blue" /> {property.sqft.toLocaleString()} sqft
            </span>
          </div>

          <button
            onClick={() => scrollToId("contact")}
            className="group/btn mt-auto flex items-center justify-between rounded-full border border-white/10 px-5 py-3 text-xs font-medium uppercase tracking-widest2 text-white transition-colors hover:border-noir-gold/50 hover:bg-noir-gold/5"
          >
            View Details
            <ArrowUpRight
              size={15}
              className="text-noir-gold transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
            />
          </button>
        </div>
      </motion.div>
    </StaggerItem>
  );
}

export default function FeaturedProperties() {
  return (
    <section id="properties" className="relative bg-noir-bg py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Curated Portfolio"
          title="Featured Properties"
          description="A rotating selection of our most exceptional listings — vetted, verified, and available for private viewing."
        />

        <StaggerContainer
          stagger={0.12}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
