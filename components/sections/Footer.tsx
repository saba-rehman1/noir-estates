"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import Button from "@/components/ui/Button";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Properties", href: "#properties" },
      { label: "AI Advisor", href: "#ai-advisor" },
      { label: "Market Insights", href: "#insights" },
      { label: "Agents", href: "#agents" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Partnerships", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Mortgage Calculator", href: "#mortgage-calculator" },
      { label: "Buyer's Guide", href: "#" },
      { label: "Seller's Guide", href: "#" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Fair Housing", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-noir-surface/60 pt-24">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-noir-gold/[0.05] blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-12 border-b border-white/[0.08] pb-16 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <span className="font-display text-2xl font-medium text-white">
              NOIR<span className="text-noir-gold">.</span>ESTATES
            </span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-noir-muted">
              Luxury Living. Intelligent Investment. A premium AI-powered brokerage connecting
              discerning clients to the world&apos;s most extraordinary homes.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-noir-muted transition-colors hover:border-noir-gold/50 hover:text-noir-gold"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-medium uppercase tracking-widest2 text-white">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-noir-muted transition-colors hover:text-noir-gold"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
          <div className="max-w-sm">
            <h4 className="font-display text-lg font-medium text-white">
              Join the Private List
            </h4>
            <p className="mt-1 text-sm text-noir-muted">
              Off-market listings and market intelligence, before anyone else sees them.
            </p>
          </div>
          {subscribed ? (
            <p className="text-sm text-noir-gold">You&apos;re on the list. Welcome.</p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubscribed(true);
              }}
              className="flex w-full max-w-sm items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5"
            >
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder:text-noir-muted/60 outline-none"
              />
              <Button type="submit" size="sm" variant="gold" icon={<ArrowRight size={14} />}>
                Join
              </Button>
            </form>
          )}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] py-8 text-xs text-noir-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Noir Estates. All rights reserved.</p>
          <p>Designed &amp; built as a showcase of premium web &amp; AI product engineering.</p>
        </div>
      </div>
    </footer>
  );
}
