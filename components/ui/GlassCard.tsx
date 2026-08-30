"use client";

import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glow?: "gold" | "blue" | "none";
  border?: boolean;
}

export default function GlassCard({
  children,
  className,
  glow = "none",
  border = true,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-3xl bg-noir-surface/60 backdrop-blur-xl",
        border && "border border-white/[0.08]",
        glow === "gold" && "hover:shadow-gold",
        glow === "blue" && "hover:shadow-blue",
        "transition-shadow duration-500",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
