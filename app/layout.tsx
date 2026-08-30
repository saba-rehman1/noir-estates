import type { Metadata } from "next";
import "./globals.css";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CursorGlow from "@/components/ui/CursorGlow";
import Chatbot from "@/components/chatbot/Chatbot";
import PageLoader from "@/components/ui/PageLoader";

export const metadata: Metadata = {
  title: "Noir Estates | Luxury Living. Intelligent Investment.",
  description:
    "Noir Estates is a premium AI-powered luxury real estate brokerage connecting discerning clients with extraordinary homes across the world's most exclusive markets.",
  keywords: [
    "luxury real estate",
    "AI property advisor",
    "luxury homes",
    "Noir Estates",
    "penthouses",
    "luxury villas",
  ],
  openGraph: {
    title: "Noir Estates | Luxury Living. Intelligent Investment.",
    description:
      "Find extraordinary homes. Live exceptionally. Powered by an AI advisor trained on the world's finest inventory.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-noir-bg font-body text-noir-text antialiased selection:bg-noir-gold selection:text-noir-bg">
        <PageLoader />
        <ScrollProgress />
        <CursorGlow />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
