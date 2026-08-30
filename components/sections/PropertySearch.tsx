"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bath, Bed, Building2, MapPin, Search, Wallet } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { scrollToId } from "@/lib/utils";

const fields = [
  {
    key: "location",
    label: "Location",
    icon: MapPin,
    options: ["Any Location", "Los Angeles, CA", "New York, NY", "Miami, FL", "Chicago, IL", "Aspen, CO"],
  },
  {
    key: "budget",
    label: "Budget",
    icon: Wallet,
    options: ["Any Budget", "$1M – $5M", "$5M – $10M", "$10M – $20M", "$20M+"],
  },
  {
    key: "beds",
    label: "Bedrooms",
    icon: Bed,
    options: ["Any", "2+", "3+", "4+", "5+", "6+"],
  },
  {
    key: "baths",
    label: "Bathrooms",
    icon: Bath,
    options: ["Any", "2+", "3+", "4+", "5+"],
  },
  {
    key: "type",
    label: "Property Type",
    icon: Building2,
    options: ["Any Type", "Villa", "Penthouse", "Estate", "Mansion", "Apartment"],
  },
];

export default function PropertySearch() {
  const [values, setValues] = useState<Record<string, string>>({});

  return (
    <section className="relative z-20 mx-auto -mt-16 w-full max-w-6xl px-6 sm:px-8">
      <Reveal>
        <div className="glass noise relative overflow-hidden rounded-[28px] p-3 shadow-luxe sm:p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {fields.map((field) => (
              <div
                key={field.key}
                className="group relative flex flex-col gap-1.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 transition-colors hover:border-noir-gold/30 lg:col-span-1"
              >
                <label className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest2 text-noir-muted">
                  <field.icon size={12} className="text-noir-gold" />
                  {field.label}
                </label>
                <select
                  value={values[field.key] ?? field.options[0]}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                  }
                  className="w-full cursor-pointer appearance-none bg-transparent text-sm text-white outline-none"
                >
                  {field.options.map((opt) => (
                    <option key={opt} value={opt} className="bg-noir-surface text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <div className="flex items-center lg:col-span-1">
              <Button
                variant="gold"
                className="w-full justify-center"
                icon={<Search size={16} />}
                iconPosition="left"
                onClick={() => scrollToId("properties")}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
