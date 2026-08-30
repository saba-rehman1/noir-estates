"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Calculator,
  Calendar,
  Mic,
  Search,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { cn, OPEN_CHAT_EVENT } from "@/lib/utils";

const UNAVAILABLE_MESSAGE =
  "AI Property Advisor is currently unavailable. Please check back soon.";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Good evening. I'm the Noir AI Advisor — I can search live inventory, estimate mortgages, compare properties, or book you a private viewing. How can I help?",
};

const quickActions = [
  { icon: Search, label: "Find a property" },
  { icon: Calculator, label: "Estimate mortgage" },
  { icon: Calendar, label: "Book a viewing" },
];

const suggestedPrompts = [
  "4-bedroom villa under $10M in Malibu",
  "What's the mortgage on $3M at 20% down?",
  "Compare your Miami and Chicago listings",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, handleOpen);
  }, []);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // The AI Property Advisor is temporarily offline. The chatbot UI stays fully
    // interactive and always responds with a clear, professional status message.
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: UNAVAILABLE_MESSAGE,
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI Property Advisor chat"
        className="fixed bottom-6 right-6 z-[80] flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-noir-gold to-[#9c7a1f] text-noir-bg shadow-gold"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-noir-gold/40" />
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ opacity: 0 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ opacity: 0 }}>
              <Bot size={24} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass noise fixed bottom-24 right-6 z-[80] flex h-[600px] w-[92vw] max-w-[400px] flex-col overflow-hidden rounded-3xl shadow-luxe"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.08] bg-white/[0.02] px-5 py-4">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-noir-gold to-noir-blue">
                <Bot size={20} className="text-noir-bg" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-noir-surface bg-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Noir AI Advisor</p>
                <p className="text-[11px] text-noir-muted">Claude-powered · Online 24/7</p>
              </div>
              <Sparkles size={16} className="text-noir-gold" />
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      m.role === "user"
                        ? "rounded-tr-sm bg-noir-gold text-noir-bg"
                        : "rounded-tl-sm bg-white/[0.06] text-white"
                    )}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
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
                </motion.div>
              )}

              {messages.length === 1 && (
                <div className="space-y-2 pt-2">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="block w-full rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-left text-xs text-noir-muted transition-colors hover:border-noir-gold/40 hover:text-white"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-white/[0.08] px-4 py-3">
              <div className="mb-2.5 flex gap-2 overflow-x-auto">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => sendMessage(action.label)}
                    className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-noir-muted transition-colors hover:border-noir-gold/40 hover:text-white"
                  >
                    <action.icon size={11} />
                    {action.label}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about a property, mortgage, or booking..."
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-noir-muted/70 outline-none"
                />
                <button type="button" aria-label="Voice input" className="text-noir-muted transition-colors hover:text-noir-gold">
                  <Mic size={16} />
                </button>
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-noir-gold text-noir-bg transition-opacity disabled:opacity-40"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
