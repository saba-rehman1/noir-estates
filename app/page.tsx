import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import PropertySearch from "@/components/sections/PropertySearch";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import AIAdvisor from "@/components/sections/AIAdvisor";
import MarketInsights from "@/components/sections/MarketInsights";
import InteractiveMap from "@/components/sections/InteractiveMap";
import MortgageCalculator from "@/components/sections/MortgageCalculator";
import Agents from "@/components/sections/Agents";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <PropertySearch />
      <FeaturedProperties />
      <WhyChooseUs />
      <AIAdvisor />
      <MarketInsights />
      <InteractiveMap />
      <MortgageCalculator />
      <Agents />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
