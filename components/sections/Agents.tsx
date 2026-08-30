"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Linkedin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/ui/Reveal";
import { agents } from "@/lib/data";
import { scrollToId } from "@/lib/utils";

export default function Agents() {
  return (
    <section id="agents" className="relative bg-noir-surface/40 py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="The Advisors"
          title="Meet Our Agents"
          description="Veteran advisors trusted by collectors, executives, and family offices around the world."
        />

        <StaggerContainer
          stagger={0.1}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {agents.map((agent) => (
            <StaggerItem key={agent.id}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-noir-bg/60"
              >
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    fill
                    className="object-cover transition-all duration-700 grayscale-[40%] group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-bg via-noir-bg/20 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <button
                      onClick={() => scrollToId("contact")}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-noir-gold px-4 py-2.5 text-xs font-medium uppercase tracking-widest2 text-noir-bg"
                    >
                      <Calendar size={13} /> Book Meeting
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-lg font-medium text-white">
                        {agent.name}
                      </h3>
                      <p className="text-xs uppercase tracking-wider text-noir-gold">
                        {agent.title}
                      </p>
                    </div>
                    <a
                      href={agent.linkedin}
                      aria-label={`${agent.name} on LinkedIn`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-noir-muted transition-colors hover:border-noir-blue/50 hover:text-noir-blue"
                    >
                      <Linkedin size={14} />
                    </a>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-noir-muted">{agent.bio}</p>
                  <p className="mt-3 text-xs font-medium text-noir-blue">{agent.deals}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
