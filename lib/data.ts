export type Property = {
  id: string;
  title: string;
  location: string;
  city: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: "Villa" | "Penthouse" | "Estate" | "Mansion" | "Apartment";
  badge?: string;
  image: string;
  gallery?: string[];
  lat: number;
  lng: number;
  featured?: boolean;
  description: string;
};

const img = (id: string, w = 1200, h = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const properties: Property[] = [
  {
    id: "azure-horizon-villa",
    title: "Azure Horizon Villa",
    location: "Beverly Hills",
    city: "Los Angeles, CA",
    price: 8250000,
    beds: 5,
    baths: 6,
    sqft: 7200,
    type: "Villa",
    badge: "Exclusive",
    image: img("photo-1600596542815-ffad4c1539a9"),
    gallery: [img("photo-1600607687939-ce8a6c25118c"), img("photo-1600585154340-be6161a56a0c")],
    lat: 34.0736,
    lng: -118.4004,
    featured: true,
    description:
      "A glass-walled masterpiece cantilevered over the hills, framing uninterrupted sunset views across the basin.",
  },
  {
    id: "the-obsidian-penthouse",
    title: "The Obsidian Penthouse",
    location: "Manhattan",
    city: "New York, NY",
    price: 12500000,
    beds: 4,
    baths: 5,
    sqft: 5400,
    type: "Penthouse",
    badge: "New",
    image: img("photo-1600210492493-0946911123ea"),
    gallery: [img("photo-1613977257363-707ba9348227"), img("photo-1600210492486-724fe5c67fb0")],
    lat: 40.7484,
    lng: -73.9857,
    featured: true,
    description:
      "Full-floor residence 400 feet above the skyline with private elevator access and a wraparound terrace.",
  },
  {
    id: "meridian-cliffside-estate",
    title: "Meridian Cliffside Estate",
    location: "Malibu",
    city: "Malibu, CA",
    price: 18900000,
    beds: 6,
    baths: 8,
    sqft: 11200,
    type: "Estate",
    badge: "Trophy Property",
    image: img("photo-1580587771525-78b9dba3b914"),
    gallery: [img("photo-1615874959474-d609969a20ed"), img("photo-1524230572899-a752b3835840")],
    lat: 34.0259,
    lng: -118.7798,
    featured: true,
    description:
      "Private oceanfront compound with infinity pool, screening room, and a 200-foot stretch of protected coastline.",
  },
  {
    id: "hillcrest-modern-mansion",
    title: "Hillcrest Modern Mansion",
    location: "Bel Air",
    city: "Los Angeles, CA",
    price: 24500000,
    beds: 7,
    baths: 9,
    sqft: 14800,
    type: "Mansion",
    badge: "Ultra Luxury",
    image: img("photo-1519567241046-7f570eee3ce6"),
    gallery: [img("photo-1613490493576-7fde63acd811"), img("photo-1502005229762-cf1b2da7c5d6")],
    lat: 34.0999,
    lng: -118.4633,
    featured: true,
    description:
      "A ten-year build with imported stone, a subterranean garage for 14 cars, and a rooftop observatory deck.",
  },
  {
    id: "sapphire-bay-residence",
    title: "Sapphire Bay Residence",
    location: "Star Island",
    city: "Miami, FL",
    price: 15750000,
    beds: 6,
    baths: 7,
    sqft: 9600,
    type: "Villa",
    badge: "Waterfront",
    image: img("photo-1600566753086-00f18fb6b3ea"),
    gallery: [img("photo-1571055107559-3e67626fa8be"), img("photo-1523217582562-09d0def993a6")],
    lat: 25.7897,
    lng: -80.1534,
    featured: true,
    description:
      "Private deep-water dock, resort-style pool pavilion, and a home theater carved into imported walnut.",
  },
  {
    id: "the-monarch-penthouse",
    title: "The Monarch Penthouse",
    location: "River North",
    city: "Chicago, IL",
    price: 6400000,
    beds: 3,
    baths: 4,
    sqft: 4100,
    type: "Penthouse",
    badge: "Skyline View",
    image: img("photo-1567767292278-a4f21aa2d36e"),
    gallery: [img("photo-1560448204-e02f11c3d0e2"), img("photo-1560185127-6ed189bf02f4")],
    lat: 41.8919,
    lng: -87.6278,
    featured: true,
    description:
      "Floor-to-ceiling glass on three exposures with a private rooftop cabana overlooking the river.",
  },
];

export type Agent = {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  deals: string;
  linkedin: string;
};

export const agents: Agent[] = [
  {
    id: "adrian-cole",
    name: "Adrian Cole",
    title: "Founder & Principal Broker",
    image: img("photo-1560250097-0b93528c311a", 600, 700),
    bio: "18 years placing landmark properties for global collectors and family offices.",
    deals: "$1.2B+ Career Sales",
    linkedin: "#",
  },
  {
    id: "isabella-marchetti",
    name: "Isabella Marchetti",
    title: "Senior Luxury Advisor",
    image: img("photo-1580489944761-15a19d654956", 600, 700),
    bio: "Specialist in waterfront estates and cross-border acquisitions across three continents.",
    deals: "$640M+ Career Sales",
    linkedin: "#",
  },
  {
    id: "marcus-whitfield",
    name: "Marcus Whitfield",
    title: "Director of New Developments",
    image: img("photo-1519085360753-af0119f7cbe7", 600, 700),
    bio: "Leads Noir Estates' relationships with architects and developers on off-market builds.",
    deals: "$410M+ Career Sales",
    linkedin: "#",
  },
  {
    id: "sienna-park",
    name: "Sienna Park",
    title: "Investment & Portfolio Strategist",
    image: img("photo-1544005313-94ddf0286df2", 600, 700),
    bio: "Advises private investors on yield, appreciation, and portfolio diversification.",
    deals: "$355M+ Assets Advised",
    linkedin: "#",
  },
];

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Jonathan Reyes",
    role: "Tech Entrepreneur",
    image: img("photo-1568602471122-7832951cc4c5", 300, 300),
    quote:
      "Noir Estates found us a property that wasn't even listed yet. Their AI advisor flagged it before it hit the market — we closed in 11 days.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Camille Fontaine",
    role: "Art Collector",
    image: img("photo-1573497019940-1c28c88b4f3e", 300, 300),
    quote:
      "The level of discretion and taste is unmatched. Every showing felt curated specifically for how we actually live.",
    rating: 5,
  },
  {
    id: "t3",
    name: "David & Priya Anand",
    role: "Private Investors",
    image: img("photo-1522075469751-3a6694fb2f61", 300, 300),
    quote:
      "We used the mortgage and ROI tools before ever speaking to an agent. By the time we called, we already knew exactly what we wanted.",
    rating: 5,
  },
  {
    id: "t4",
    name: "Marcus Webb",
    role: "Family Office Principal",
    image: img("photo-1500648767791-00dcc994a43e", 300, 300),
    quote:
      "Six figure homes, six countries, one point of contact. Noir Estates operates like an institution, not an agency.",
    rating: 5,
  },
];

export const faqs = [
  {
    q: "How does the AI Property Advisor actually work?",
    a: "Our AI advisor is trained on live inventory, historical pricing, and neighborhood data. It can search listings by natural language, run mortgage scenarios, compare properties side by side, and schedule a viewing with a licensed agent — all before you speak to a human.",
  },
  {
    q: "Do you handle off-market and pre-listing properties?",
    a: "Yes. Roughly 40% of the inventory we place never appears on public portals. Our advisors and AI system are matched against off-market opportunities the moment they surface.",
  },
  {
    q: "What markets does Noir Estates operate in?",
    a: "We operate across Los Angeles, New York, Miami, Chicago, Aspen, and select international markets including London, Dubai, and Monaco, with vetted partner brokerages in each city.",
  },
  {
    q: "Can I get financing guidance before I'm pre-approved?",
    a: "Absolutely. Our mortgage calculator and advisory team can model scenarios across multiple lenders so you understand your position before entering a competitive bid.",
  },
  {
    q: "How is Noir Estates different from a traditional brokerage?",
    a: "We pair veteran human expertise with a proprietary AI layer for search, analysis, and scheduling — so every hour you spend with an advisor is spent on decisions, not logistics.",
  },
];

export const marketPriceTrend = [
  { month: "Jan", price: 2.1 },
  { month: "Feb", price: 2.18 },
  { month: "Mar", price: 2.24 },
  { month: "Apr", price: 2.3 },
  { month: "May", price: 2.27 },
  { month: "Jun", price: 2.41 },
  { month: "Jul", price: 2.52 },
  { month: "Aug", price: 2.6 },
  { month: "Sep", price: 2.71 },
  { month: "Oct", price: 2.84 },
  { month: "Nov", price: 2.93 },
  { month: "Dec", price: 3.05 },
];

export const roiByMarket = [
  { market: "Beverly Hills", roi: 14.2 },
  { market: "Malibu", roi: 17.8 },
  { market: "Manhattan", roi: 9.6 },
  { market: "Miami Beach", roi: 21.4 },
  { market: "Aspen", roi: 12.9 },
];

export const demandBySegment = [
  { name: "Ultra Luxury ($10M+)", value: 32 },
  { name: "Waterfront Estates", value: 24 },
  { name: "Penthouses", value: 21 },
  { name: "New Developments", value: 23 },
];

export const stats = [
  { label: "Luxury Homes", value: 500, suffix: "+" },
  { label: "Happy Clients", value: 98, suffix: "%" },
  { label: "Properties Sold", value: 350, prefix: "$", suffix: "M+" },
  { label: "Years Experience", value: 15, suffix: "+" },
];
