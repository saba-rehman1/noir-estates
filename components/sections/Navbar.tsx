"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn, scrollToId } from "@/lib/utils";

const links = [
  { label: "Properties", href: "#properties" },
  { label: "AI Advisor", href: "#ai-advisor" },
  { label: "Insights", href: "#insights" },
  { label: "Agents", href: "#agents" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-6"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between rounded-full px-6 transition-all duration-500 sm:px-8",
            scrolled ? "glass mx-4 shadow-luxe sm:mx-8" : "bg-transparent"
          )}
          style={{ paddingTop: scrolled ? "0.7rem" : "0", paddingBottom: scrolled ? "0.7rem" : "0" }}
        >
          <Link href="#" className="flex items-center gap-2">
            <span className="font-display text-xl font-medium tracking-wide text-white">
              NOIR<span className="text-noir-gold">.</span>ESTATES
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-xs font-medium uppercase tracking-widest2 text-noir-muted transition-colors hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-noir-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button size="sm" variant="gold" onClick={() => scrollToId("contact")}>
              Book Consultation
            </Button>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(true)}
            className="text-white lg:hidden"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: "rgba(11,11,13,0.98)" }}
            className="fixed inset-0 z-[90] flex flex-col backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-display text-xl font-medium text-white">
                NOIR<span className="text-noir-gold">.</span>ESTATES
              </span>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="text-white">
                <X size={26} />
              </button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-8">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="font-display text-3xl font-medium text-white hover:text-noir-gold"
                >
                  {link.label}
                </motion.a>
              ))}
              <Button
                variant="gold"
                className="mt-6"
                onClick={() => {
                  setOpen(false);
                  scrollToId("contact");
                }}
              >
                Book Consultation
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
