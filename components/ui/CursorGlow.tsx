"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCoarse, setIsCoarse] = useState(true);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { damping: 30, stiffness: 200, mass: 0.5 });
  const springY = useSpring(y, { damping: 30, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    setIsCoarse(window.matchMedia("(pointer: coarse)").matches);
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isCoarse) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[500px] w-[500px] rounded-full mix-blend-screen"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
        background:
          "radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(63,169,245,0.05) 45%, transparent 70%)",
      }}
      transition={{ opacity: { duration: 0.4 } }}
    />
  );
}
