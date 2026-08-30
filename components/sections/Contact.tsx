"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

const info = [
  { icon: MapPin, label: "Headquarters", value: "9601 Wilshire Blvd, Beverly Hills, CA 90210" },
  { icon: Phone, label: "Phone", value: "+1 (310) 555-0198" },
  { icon: Mail, label: "Email", value: "concierge@noirestates.com" },
  { icon: Clock, label: "Hours", value: "Mon – Sat, 8:00 AM – 8:00 PM PST" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="relative bg-noir-bg py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Start Your Search Today"
          description="Tell us what you're looking for and a senior advisor will respond within one business hour."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <GlassCard className="p-8 sm:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[380px] flex-col items-center justify-center text-center"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-noir-gold/10 text-noir-gold">
                    <Send size={24} />
                  </div>
                  <h3 className="font-display text-2xl text-white">Message Sent</h3>
                  <p className="mt-2 max-w-sm text-sm text-noir-muted">
                    Thank you — a Noir Estates advisor will reach out shortly to continue the
                    conversation.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest2 text-noir-muted">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Jonathan Reyes"
                      className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-noir-muted/60 outline-none transition-colors focus:border-noir-gold/50"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest2 text-noir-muted">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="you@email.com"
                      className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-noir-muted/60 outline-none transition-colors focus:border-noir-gold/50"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest2 text-noir-muted">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (310) 555-0198"
                      className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-noir-muted/60 outline-none transition-colors focus:border-noir-gold/50"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest2 text-noir-muted">
                      Budget Range
                    </label>
                    <select className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-noir-gold/50">
                      <option className="bg-noir-surface">$1M – $5M</option>
                      <option className="bg-noir-surface">$5M – $10M</option>
                      <option className="bg-noir-surface">$10M – $20M</option>
                      <option className="bg-noir-surface">$20M+</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className="text-xs uppercase tracking-widest2 text-noir-muted">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about the home you're envisioning..."
                      className="resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-noir-muted/60 outline-none transition-colors focus:border-noir-gold/50"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" variant="gold" className="w-full justify-center sm:w-auto" icon={<Send size={15} />}>
                      Send Message
                    </Button>
                  </div>
                </form>
              )}
            </GlassCard>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col gap-6 lg:col-span-2">
            <GlassCard className="space-y-5 p-8">
              {info.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-noir-gold/10 text-noir-gold">
                    <item.icon size={16} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-noir-muted">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-sm text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </GlassCard>

            <GlassCard className="relative h-56 overflow-hidden p-0">
              <iframe
                title="Noir Estates location"
                src="https://maps.google.com/maps?q=9601%20Wilshire%20Blvd%2C%20Beverly%20Hills%2C%20CA&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="h-full w-full grayscale invert-[92%] hue-rotate-180 contrast-[0.9]"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 border border-white/[0.08]" />
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
