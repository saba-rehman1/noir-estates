"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp, Percent, PieChart as PieIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import { demandBySegment, marketPriceTrend, roiByMarket } from "@/lib/data";

const PIE_COLORS = ["#D4AF37", "#3FA9F5", "#8fd0ff", "#9c7a1f"];

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-noir-bg/95 px-3 py-2 text-xs shadow-luxe">
      <p className="text-noir-muted">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="font-medium text-white">
          {p.name}: <span className="text-noir-gold">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

export default function MarketInsights() {
  return (
    <section id="insights" className="relative bg-noir-bg py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Data-Driven Decisions"
          title="Market Insights"
          description="Live-styled analytics across pricing trends, return on investment, and buyer demand — refreshed from our proprietary market model."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <GlassCard className="h-full p-6 sm:p-8" glow="gold">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="flex items-center gap-2 text-xs uppercase tracking-widest2 text-noir-gold">
                    <TrendingUp size={14} /> Luxury Price Index
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-medium text-white">
                    Avg. Price / Sqft ($K)
                  </h3>
                </div>
                <span className="rounded-full border border-noir-gold/30 bg-noir-gold/10 px-3 py-1 text-xs text-noir-gold">
                  +18.4% YoY
                </span>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={marketPriceTrend} margin={{ left: -20, right: 10 }}>
                    <defs>
                      <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis
                      dataKey="month"
                      stroke="#B8B8B8"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis stroke="#B8B8B8" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip content={<ChartTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="#D4AF37"
                      strokeWidth={2.5}
                      fill="url(#goldFill)"
                      animationDuration={1800}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="h-full p-6 sm:p-8" glow="blue">
              <p className="flex items-center gap-2 text-xs uppercase tracking-widest2 text-noir-blue">
                <PieIcon size={14} /> Buyer Demand
              </p>
              <h3 className="mt-2 font-display text-2xl font-medium text-white">By Segment</h3>
              <div className="mt-4 h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={demandBySegment}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                      animationDuration={1400}
                    >
                      {demandBySegment.map((entry, i) => (
                        <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 space-y-2">
                {demandBySegment.map((seg, i) => (
                  <div key={seg.name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-noir-muted">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                      />
                      {seg.name}
                    </span>
                    <span className="text-white">{seg.value}%</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>

          <Reveal className="lg:col-span-3">
            <GlassCard className="p-6 sm:p-8">
              <p className="flex items-center gap-2 text-xs uppercase tracking-widest2 text-noir-gold">
                <Percent size={14} /> Return on Investment
              </p>
              <h3 className="mt-2 font-display text-2xl font-medium text-white">
                Average ROI by Market
              </h3>
              <div className="mt-6 h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={roiByMarket} margin={{ left: -20, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis
                      dataKey="market"
                      stroke="#B8B8B8"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#B8B8B8"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      unit="%"
                    />
                    <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                    <Bar dataKey="roi" radius={[8, 8, 0, 0]} animationDuration={1600}>
                      {roiByMarket.map((entry) => (
                        <Cell key={entry.market} fill="#3FA9F5" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
