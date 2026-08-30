"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bath,
  Bed,
  Bot,
  Calendar,
  Calculator,
  CircleCheck,
  Compass,
  Mic,
  Send,
  Sparkles,
  TrendingUp,
  MessagesSquare,
  Users,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/ui/Reveal";
import AINetworkBackground from "./AINetworkBackground";
import { formatCurrency } from "@/lib/utils";

const features = [
  { icon: Bot, label: "24/7 AI Assistant" },
  { icon: Sparkles, label: "Property Recommendations" },
  { icon: Calculator, label: "Mortgage Calculator" },
  { icon: Calendar, label: "Appointment Booking" },
  { icon: TrendingUp, label: "Market Insights" },
  { icon: Compass, label: "Neighborhood Analysis" },
  { icon: Users, label: "Lead Qualification" },
  { icon: MessagesSquare, label: "Natural Conversations" },
];

type Phase = "userIn" | "typing" | "aiIn" | "hold";

const scenes = [
  {
    user: "I need a 4-bedroom villa under $900K.",
    ai: "I found 7 luxury properties matching your requirements. Here are the top matches:",
    render: "properties" as const,
  },
  {
    user: "Calculate the mortgage on the first one.",
    ai: "Based on 20% down at 6.4% APR over 30 years, here's your monthly breakdown:",
    render: "mortgage" as const,
  },
  {
    user: "Book a viewing for Saturday afternoon.",
    ai: "Done — I've scheduled a private viewing with Isabella Marchetti.",
    render: "booking" as const,
  },
  {
    user: "Compare these two properties for me.",
    ai: "Here's a side-by-side comparison of both listings:",
    render: "compare" as const,
  },
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-white/[0.06] px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-noir-gold"
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  );
}

function SceneContent({ type }: { type: (typeof scenes)[number]["render"] }) {
  if (type === "properties") {
    return (
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {[
          { name: "Hillside Retreat", price: 875000, beds: 4 },
          { name: "Garden Court Villa", price: 849000, beds: 4 },
          { name: "The Aspen Villa", price: 899000, beds: 4 },
        ].map((p) => (
          <div
            key={p.name}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
          >
            <p className="text-xs font-medium text-white">{p.name}</p>
            <p className="mt-1 text-xs text-noir-gold">{formatCurrency(p.price)}</p>
            <p className="mt-1 flex items-center gap-1 text-[10px] text-noir-muted">
              <Bed size={10} /> {p.beds} beds <Bath size={10} className="ml-1.5" /> {p.beds - 1} baths
            </p>
          </div>
        ))}
      </div>
    );
  }
  if (type === "mortgage") {
    return (
      <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <div className="flex items-center justify-between text-xs text-noir-muted">
          <span>Loan Amount</span>
          <span className="text-white">{formatCurrency(700000)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-noir-muted">
          <span>Est. Monthly Payment</span>
          <span className="font-display text-base text-noir-gold">{formatCurrency(4372)}</span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "64%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-noir-gold to-noir-blue"
          />
        </div>
      </div>
    );
  }
  if (type === "booking") {
    return (
      <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <CircleCheck className="shrink-0 text-noir-blue" size={20} />
        <div>
          <p className="text-xs font-medium text-white">Saturday, 2:00 PM — Confirmed</p>
          <p className="text-[10px] text-noir-muted">Calendar invite sent to your email</p>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] text-[11px]">
      <div className="grid grid-cols-3 divide-x divide-white/10 text-center">
        <div className="p-2 text-noir-muted">Metric</div>
        <div className="p-2 font-medium text-white">Villa A</div>
        <div className="p-2 font-medium text-white">Villa B</div>
      </div>
      {[
        ["Price", "$875K", "$899K"],
        ["Sqft", "4,200", "4,650"],
        ["Cap Rate", "5.8%", "6.2%"],
      ].map((row) => (
        <div key={row[0]} className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 text-center">
          <div className="p-2 text-noir-muted">{row[0]}</div>
          <div className="p-2 text-white">{row[1]}</div>
          <div className="p-2 text-noir-gold">{row[2]}</div>
        </div>
      ))}
    </div>
  );
}

function ConversationDemo() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("userIn");
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];
    setPhase("userIn");
    timers.push(
      setTimeout(() => mounted.current && setPhase("typing"), 900)
    );
    timers.push(
      setTimeout(() => mounted.current && setPhase("aiIn"), 2300)
    );
    timers.push(
      setTimeout(() => {
        if (!mounted.current) return;
        setSceneIndex((i) => (i + 1) % scenes.length);
      }, 6200)
    );
    return () => timers.forEach(clearTimeout);
  }, [sceneIndex]);

  const scene = scenes[sceneIndex];

  return (
    <div className="glass noise relative flex h-[520px] w-full flex-col overflow-hidden rounded-3xl shadow-luxe">
      <div className="flex items-center gap-3 border-b border-white/[0.08] px-5 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-noir-gold to-noir-blue">
          <Bot size={18} className="text-noir-bg" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">Noir AI Advisor</p>
          <p className="flex items-center gap-1.5 text-[11px] text-noir-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Online now
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-hidden px-5 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={sceneIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-4"
          >
            <AnimatePresence>
              {(phase === "userIn" || phase === "typing" || phase === "aiIn") && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-noir-gold/90 px-4 py-2.5 text-sm text-noir-bg">
                    {scene.user}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {phase === "typing" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <TypingDots />
              </motion.div>
            )}

            {phase === "aiIn" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex justify-start"
              >
                <div className="max-w-[92%] rounded-2xl rounded-tl-sm bg-white/[0.06] px-4 py-3 text-sm text-white">
                  {scene.ai}
                  <SceneContent type={scene.render} />
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="border-t border-white/[0.08] px-5 py-4">
        <div className="flex flex-wrap gap-2 pb-3">
          {["4-bed villa under $1M", "Compare properties", "Schedule a tour"].map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-noir-muted"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5">
          <input
            disabled
            placeholder="Ask Noir AI anything about the market..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-noir-muted focus:outline-none"
          />
          <Mic size={16} className="text-noir-muted" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-noir-gold text-noir-bg">
            <Send size={14} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AIAdvisor() {
  return (
    <section
      id="ai-advisor"
      className="relative overflow-hidden bg-gradient-to-b from-noir-bg via-[#0d0e12] to-noir-bg py-32"
    >
      <AINetworkBackground />
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-noir-blue/[0.08] blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-noir-gold/[0.08] blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Showcase Feature"
          title="Meet Your AI Property Advisor"
          description="A conversational intelligence layer trained on live inventory, pricing history, and neighborhood data — available around the clock."
          accent="blue"
        />

        <div className="mt-16 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <StaggerContainer stagger={0.08} className="grid grid-cols-2 gap-4">
              {features.map((feature) => (
                <StaggerItem key={feature.label}>
                  <div className="group flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all hover:border-noir-blue/40 hover:bg-noir-blue/[0.04]">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-noir-blue/10 text-noir-blue transition-transform group-hover:scale-110">
                      <feature.icon size={18} />
                    </div>
                    <span className="text-sm text-white">{feature.label}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <div className="order-1 lg:order-2">
            <ConversationDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
