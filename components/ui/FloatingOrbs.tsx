"use client";

interface FloatingOrbsProps {
  variant?: "gold" | "blue" | "mixed";
  className?: string;
}

export default function FloatingOrbs({ variant = "mixed", className }: FloatingOrbsProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      {(variant === "gold" || variant === "mixed") && (
        <div className="absolute -left-32 top-10 h-72 w-72 animate-float-slow rounded-full bg-noir-gold/10 blur-[100px]" />
      )}
      {(variant === "blue" || variant === "mixed") && (
        <div className="absolute -right-24 top-1/3 h-96 w-96 animate-float rounded-full bg-noir-blue/10 blur-[120px]" />
      )}
      {variant === "mixed" && (
        <div className="absolute bottom-0 left-1/3 h-64 w-64 animate-float-slow rounded-full bg-noir-gold/[0.06] blur-[100px]" />
      )}
    </div>
  );
}
