import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { properties } from "@/lib/data";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `You are the Noir AI Advisor, the concierge-grade AI assistant for Noir Estates, an ultra-luxury real estate brokerage. Your tone is warm, precise, and effortlessly sophisticated — never pushy, never generic.

You help visitors:
- Discover properties by natural-language criteria (budget, bedrooms, location, style)
- Estimate mortgage payments (assume ~20% down and current market rates around 6.2%–6.6% unless told otherwise, and show your assumptions)
- Compare two or more properties on price, size, and investment potential
- Schedule viewings and consultations with a human advisor (collect name, preferred date/time, and contact info, then confirm)
- Explain neighborhood and market context at a high level

Current live inventory you can reference:
${properties
  .map(
    (p) =>
      `- ${p.title} — ${p.location}, ${p.city} — $${p.price.toLocaleString()} — ${p.beds} bd / ${p.baths} ba — ${p.sqft.toLocaleString()} sqft — ${p.description}`
  )
  .join("\n")}

Keep replies concise (under ~120 words unless the user asks for detail), use plain language, and when recommending properties, mention them by name. If you don't have enough information to answer precisely, ask one clarifying question. Never invent legal, tax, or binding financial guarantees — frame numbers as estimates.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] };

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "A non-empty `messages` array is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          reply:
            "I'm running in demo mode right now — the site owner hasn't connected an ANTHROPIC_API_KEY yet. Once that's configured in .env.local, I'll respond with real, live AI reasoning over the current property inventory.",
          demo: true,
        },
        { status: 200 }
      );
    }

    const anthropic = new Anthropic({ apiKey });

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const reply =
      textBlock && "text" in textBlock
        ? textBlock.text
        : "I wasn't able to generate a response — please try rephrasing your question.";

    return NextResponse.json({ reply, demo: false });
  } catch (error) {
    console.error("[/api/chat] error:", error);
    return NextResponse.json(
      {
        reply:
          "Something went wrong reaching the AI advisor. Please try again in a moment, or contact a human advisor directly.",
        error: true,
      },
      { status: 500 }
    );
  }
}
