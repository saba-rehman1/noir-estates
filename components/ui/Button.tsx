"use client";

import { ButtonHTMLAttributes, MouseEvent, ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

type Ripple = { id: number; x: number; y: number; size: number };

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "outline" | "ghost" | "blue";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  children: ReactNode;
}

export default function Button({
  variant = "gold",
  size = "md",
  icon,
  iconPosition = "right",
  className,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y, size }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 700);
    onClick?.(e);
  };

  const variants = {
    gold: "bg-noir-gold text-noir-bg hover:shadow-gold border border-noir-gold",
    outline:
      "bg-transparent text-white border border-white/20 hover:border-noir-gold/60 hover:text-noir-gold",
    ghost: "bg-white/5 text-white border border-white/10 hover:bg-white/10",
    blue: "bg-noir-blue text-noir-bg hover:shadow-blue border border-noir-blue",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-xs",
    md: "px-7 py-3.5 text-sm",
    lg: "px-9 py-4 text-sm",
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium uppercase tracking-wider transition-all duration-300 ease-out active:scale-[0.97]",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {iconPosition === "left" && icon}
      <span className="relative z-10">{children}</span>
      {iconPosition === "right" && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          {icon}
        </span>
      )}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/30 animate-[ripple_0.7s_ease-out]"
          style={{
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes ripple {
          from {
            transform: scale(0);
            opacity: 0.6;
          }
          to {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
}
