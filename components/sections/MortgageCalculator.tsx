"use client";

import { useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Calculator, Home, Percent, Wallet } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import { formatCurrency } from "@/lib/utils";

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
  icon: Icon,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  icon: any;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs uppercase tracking-widest2 text-noir-muted">
          <Icon size={13} className="text-noir-gold" />
          {label}
        </span>
        <span className="font-display text-lg text-white">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="noir-slider w-full"
        style={{
          background: `linear-gradient(to right, #D4AF37 ${pct}%, rgba(255,255,255,0.1) ${pct}%)`,
        }}
      />
      <style jsx>{`
        .noir-slider {
          -webkit-appearance: none;
          height: 4px;
          border-radius: 999px;
          outline: none;
        }
        .noir-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #d4af37;
          border: 3px solid #0b0b0d;
          box-shadow: 0 0 0 1px rgba(212, 175, 55, 0.5);
          cursor: pointer;
        }
        .noir-slider::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #d4af37;
          border: 3px solid #0b0b0d;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default function MortgageCalculator() {
  const [price, setPrice] = useState(2500000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6.4);
  const [term, setTerm] = useState(30);

  const { monthly, loanAmount, totalInterest, totalPaid } = useMemo(() => {
    const down = price * (downPct / 100);
    const loan = price - down;
    const monthlyRate = rate / 100 / 12;
    const n = term * 12;
    const m =
      monthlyRate === 0
        ? loan / n
        : (loan * monthlyRate * Math.pow(1 + monthlyRate, n)) /
          (Math.pow(1 + monthlyRate, n) - 1);
    const paid = m * n;
    return {
      monthly: m,
      loanAmount: loan,
      totalInterest: paid - loan,
      totalPaid: paid,
    };
  }, [price, downPct, rate, term]);

  const chartData = [
    { name: "Principal", value: loanAmount },
    { name: "Interest", value: totalInterest },
  ];

  return (
    <section id="mortgage-calculator" className="relative bg-noir-bg py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Plan Your Purchase"
          title="Mortgage Calculator"
          description="Model your financing scenario in real time before you ever speak to a lender."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <GlassCard className="h-full space-y-8 p-8 sm:p-10">
              <Slider
                label="Home Price"
                value={price}
                onChange={setPrice}
                min={300000}
                max={30000000}
                step={50000}
                format={(v) => formatCurrency(v, true)}
                icon={Home}
              />
              <Slider
                label="Down Payment"
                value={downPct}
                onChange={setDownPct}
                min={5}
                max={50}
                step={1}
                format={(v) => `${v}%`}
                icon={Wallet}
              />
              <Slider
                label="Interest Rate"
                value={rate}
                onChange={setRate}
                min={3}
                max={9}
                step={0.1}
                format={(v) => `${v.toFixed(1)}%`}
                icon={Percent}
              />
              <Slider
                label="Loan Term"
                value={term}
                onChange={setTerm}
                min={10}
                max={30}
                step={5}
                format={(v) => `${v} years`}
                icon={Calculator}
              />
            </GlassCard>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <GlassCard glow="gold" className="flex h-full flex-col p-8 sm:p-10">
              <p className="text-xs uppercase tracking-widest2 text-noir-gold">
                Estimated Monthly Payment
              </p>
              <p className="mt-3 font-display text-4xl font-medium text-white sm:text-5xl">
                {formatCurrency(monthly)}
              </p>

              <div className="mx-auto my-6 h-44 w-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={3}
                      animationDuration={1200}
                    >
                      <Cell fill="#D4AF37" stroke="none" />
                      <Cell fill="#3FA9F5" stroke="none" />
                    </Pie>
                    <Tooltip
                      formatter={(v: number) => formatCurrency(v)}
                      contentStyle={{
                        background: "#0B0B0D",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 12,
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-auto space-y-3 border-t border-white/[0.08] pt-5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-noir-muted">
                    <span className="h-2 w-2 rounded-full bg-noir-gold" /> Loan Amount
                  </span>
                  <span className="text-white">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-noir-muted">
                    <span className="h-2 w-2 rounded-full bg-noir-blue" /> Total Interest
                  </span>
                  <span className="text-white">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex items-center justify-between font-medium">
                  <span className="text-noir-muted">Total Paid</span>
                  <span className="text-white">{formatCurrency(totalPaid)}</span>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
