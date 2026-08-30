"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Node {
  id: number;
  x: number;
  y: number;
  delay: number;
}

const CONNECTIONS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [1, 4], [4, 5], [5, 6], [6, 7], [2, 6], [0, 3], [5, 7],
];

export default function AINetworkBackground() {
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    const positions = [
      { x: 8, y: 20 }, { x: 24, y: 55 }, { x: 15, y: 82 },
      { x: 42, y: 12 }, { x: 50, y: 48 }, { x: 68, y: 25 },
      { x: 85, y: 60 }, { x: 92, y: 15 },
    ];
    setNodes(positions.map((p, i) => ({ id: i, ...p, delay: i * 0.3 })));
  }, []);

  if (nodes.length === 0) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3FA9F5" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {CONNECTIONS.map(([a, b], i) => {
        const nodeA = nodes[a];
        const nodeB = nodes[b];
        if (!nodeA || !nodeB) return null;
        return (
          <motion.line
            key={i}
            x1={`${nodeA.x}%`}
            y1={`${nodeA.y}%`}
            x2={`${nodeB.x}%`}
            y2={`${nodeB.y}%`}
            stroke="url(#lineGrad)"
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.6, 0.3] }}
            transition={{ duration: 2.5, delay: i * 0.15, ease: "easeInOut" }}
          />
        );
      })}
      {nodes.map((node) => (
        <g key={node.id}>
          <motion.circle
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={3}
            fill="#D4AF37"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: node.delay,
              ease: "easeInOut",
            }}
          />
          <motion.circle
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={10}
            fill="none"
            stroke="#D4AF37"
            strokeWidth={1}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0.3, 0], scale: [0.5, 2.2] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: node.delay,
              ease: "easeOut",
            }}
          />
        </g>
      ))}
    </svg>
  );
}
