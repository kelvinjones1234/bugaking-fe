"use client";

import React from "react";
import {
  ArrowDown,
  ArrowRight,
  Filter,
  Search,
  Bed,
  Bath,
  Ruler,
  Waves,
  Wine,
  TrendingUp,
  LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// --- Data & Configuration ---

const FILTERS = [
  { label: "Price Range", icon: ArrowRight },
  { label: "Property Type", icon: ArrowDown },
  { label: "Amenities", icon: Filter },
];

const LISTINGS = [
  {
    id: 1,
    title: "The Eko Atlantic Penthouse",
    location: "Victoria Island, Lagos",
    price: "₦2.5M", // High-end VI/Eko Atlantic often prices in USD
    image: "/realestate.jpeg",
    badge: "New Listing",
    badgeColor: "bg-[#d0a539]",
    type: "residential",
    specs: [
      { icon: Bed, label: "5 Beds" },
      { icon: Bath, label: "6 Baths" },
      { icon: Ruler, label: "Penthouse Suite" },
    ],
  },
  {
    id: 2,
    title: "Maitama Heights Plaza",
    location: "Maitama, Abuja",
    price: "₦1.2B", // Using Billion Naira for premium commercial
    image: "/realestate.jpeg",
    badge: "Commercial",
    badgeColor: "bg-zinc-900",
    type: "commercial",
    specs: [],
  },
  {
    id: 3,
    title: "Banana Island Waterfront",
    location: "Ikoyi, Lagos",
    price: "₦5.8M",
    image: "/realestate.jpeg",
    badge: "Off-Market",
    badgeColor: "bg-[#d0a539]",
    type: "residential",
    specs: [
      { icon: Waves, label: "Waterfront" },
      { icon: Wine, label: "Smart Home" },
    ],
  },
];

const OPPORTUNITIES = [
  {
    id: 1,
    initials: "LZ",
    title: "Lekki Free Zone Hub",
    category: "Industrial Logistics",
    yieldVal: "14.2%", // Slightly higher yields typical of Nigerian emerging markets
    tier: "Prime",
  },
  {
    id: 2,
    initials: "GU",
    title: "Gwarinpa Urban Suites",
    category: "Short-let Hospitality",
    yieldVal: "18.5%", // Short-let apartments in Abuja/Lagos have very high yields
    tier: "High Growth",
  },
];

// --- Animation Utility ---

const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- Sub-Components ---

const FilterButton = ({
  label,
  icon: Icon,
}: {
  label: string;
  icon: LucideIcon;
}) => (
  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 h-14 bg-[#f8f7f6] rounded-xl hover:bg-zinc-200 transition-colors whitespace-nowrap">
    <span className="text-sm font-bold">{label}</span>
    <Icon className="w-4 h-4" />
  </button>
);

const OpportunityRow = ({ initials, title, category, yieldVal, tier }: any) => (
  <motion.div
    whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.08)" }}
    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 cursor-pointer transition-colors"
  >
    <div className="flex gap-4 items-center">
      <div className="size-12 rounded-lg bg-[#d0a539]/20 flex items-center justify-center text-[#d0a539] font-black">
        {initials}
      </div>
      <div>
        <p className="font-bold text-white">{title}</p>
        <p className="text-xs text-zinc-500">{category}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-bold text-[#d0a539]">{yieldVal} Yield</p>
      <p className="text-xs text-zinc-500">{tier}</p>
    </div>
  </motion.div>
);

const ListingCard = ({ data }: { data: any }) => {
  const { title, location, price, image, badge, badgeColor, type, specs } =
    data;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-black/5 h-full shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className={`overflow-hidden relative h-64 md:h-72`}>
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          src={image}
          alt={title}
        />
        <div className="absolute top-4 left-4">
          <span
            className={`${badgeColor} text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest`}
          >
            {badge}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-black text-xl leading-tight">{title}</h3>
            <p className="text-zinc-500 text-sm font-medium">{location}</p>
          </div>
          <p className="text-[#d0a539] font-bold text-xl">{price}</p>
        </div>

        <div className="mt-auto pt-4">
          {type === "commercial" ? (
            <button className="w-full h-12 border-2 border-[#d0a539] text-[#d0a539] font-bold rounded-xl hover:bg-[#d0a539] hover:text-white transition-colors">
              View Prospectus
            </button>
          ) : (
            <div className="flex gap-4 pt-4 border-t border-black/5">
              {specs?.map((spec: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-1 text-xs font-bold opacity-60"
                >
                  <spec.icon className="w-4 h-4" />
                  {spec.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Component ---

const Main = () => {
  return (
    <div className="bg-[#f8f7f6] text-[#171512] transition-colors duration-300 font-sans min-h-screen">
      <main className="max-w-[1440px] mx-auto overflow-hidden">
        {/* Hero Section - UPDATED with darker overlay */}
        <section className="px-4 md:px-10 py-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-xl md:rounded-3xl min-h-[70vh] flex items-center justify-center text-center p-8"
          >
            {/* Layer 1: The Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="/realestate.jpeg"
                alt="Luxury Estate Background"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Layer 2: The Dark Shade Overlay (bg-black/60) */}
            <div className="absolute inset-0 z-10 bg-black/60" />

            {/* Layer 3: The Text Content (z-20 to sit on top) */}
            <div className="max-w-4xl space-y-8 relative z-20">
              <FadeIn delay={0.2}>
                <span className="inline-block px-4 py-1.5 bg-[#d0a539]/20 backdrop-blur-sm border border-[#d0a539]/30 text-[#d0a539] text-xs font-bold tracking-[0.2em] uppercase rounded-full">
                  Exclusive Portfolio from 2020 Till Date
                </span>
              </FadeIn>

              <FadeIn delay={0.3}>
                <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tight">
                  The Art <br /> of Living
                </h1>
              </FadeIn>

              <FadeIn delay={0.4}>
                <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
                  Curating the world's most prestigious estates and visionary
                  commercial landmarks for the global architectural elite.
                </p>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button className="min-w-[200px] w-full sm:w-auto h-14 bg-[#d0a539] text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-[#d0a539]/20">
                    Discover Estates
                  </button>
                  <button className="min-w-[200px] w-full sm:w-auto h-14 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
                    View Commercial
                  </button>
                </div>
              </FadeIn>
            </div>
          </motion.div>
        </section>

        {/* Search & Filter Bar */}
        <section className="px-4 md:px-20 -mt-12 relative z-30">
          <FadeIn delay={0.6}>
            <div className="bg-white rounded-2xl shadow-2xl p-4 border border-black/5">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="w-full lg:flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                    <Search className="w-6 h-6" />
                  </span>
                  <input
                    className="w-full h-14 pl-12 pr-4 bg-[#f8f7f6] border-none rounded-xl focus:ring-2 focus:ring-[#d0a539]/50 text-base"
                    placeholder="Search by city, property type, or landmark..."
                    type="text"
                  />
                </div>
                <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 w-full lg:w-auto">
                  {FILTERS.map((filter) => (
                    <FilterButton key={filter.label} {...filter} />
                  ))}
                  <button className="w-full lg:w-40 h-14 bg-[#d0a539] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Featured Listings Section */}
        <section className="px-6 md:px-20 py-20">
          <FadeIn className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tight uppercase">
                Featured{" "}
                <span className="text-[#d0a539] font-light">Listings</span>
              </h2>
              <p className="text-zinc-500 font-medium">
                Handpicked global assets with exceptional architectural merit.
              </p>
            </div>
            <Link
              className="hidden md:flex items-center gap-2 text-[#d0a539] font-bold hover:gap-3 transition-all"
              href="#"
            >
              View All Properties{" "}
              <ArrowRight className="h-4 w-4 sm:h-6 sm:w-6" />
            </Link>
          </FadeIn>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LISTINGS.map((listing, index) => (
              <FadeIn key={listing.id} delay={0.1 * index} className="h-full">
                <ListingCard data={listing} />
              </FadeIn>
            ))}
          </div>

          <div className="mt-8 md:hidden text-center">
            <button className="text-[#d0a539] font-bold text-sm uppercase tracking-widest">
              View All Properties
            </button>
          </div>
        </section>

        {/* Investment Opportunities Section */}
        <section className="px-4 md:px-10 mb-20">
          <div className="bg-zinc-900 rounded-[2.5rem] p-8 md:p-20 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
              <svg
                className="w-full h-full"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <path d="M0,100 L100,0 L100,100 Z" fill="#d0a539"></path>
              </svg>
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <FadeIn className="space-y-8">
                <span className="text-[#d0a539] font-black uppercase tracking-widest text-sm">
                  Institutional Assets
                </span>
                <h2 className="text-5xl md:text-7xl font-black leading-none">
                  Global Investment Portal
                </h2>
                <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-xl">
                  Access exclusive high-yield commercial developments and
                  private residential portfolios.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-4xl font-black text-[#d0a539]">12.4%</p>
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Average Annual ROI
                    </p>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-[#d0a539]">₦4.2B</p>
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Assets Under Management
                    </p>
                  </div>
                </div>
                <button className="h-16 px-10 bg-[#d0a539] text-white rounded-xl font-bold text-lg hover:brightness-110 shadow-2xl shadow-[#d0a539]/40 transition-all">
                  Request Private Access
                </button>
              </FadeIn>

              <FadeIn
                delay={0.2}
                className="bg-zinc-800/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-xl uppercase tracking-tight">
                    Active Opportunities
                  </h4>
                  <TrendingUp className="text-[#d0a539] w-6 h-6" />
                </div>

                {OPPORTUNITIES.map((opp) => (
                  <OpportunityRow key={opp.id} {...opp} />
                ))}

                <div className="pt-4">
                  <p className="text-xs text-center text-zinc-500 font-medium">
                    Verified professional investors only. Secure encryption
                    active.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Newsletter / Contact CTA */}
        <section className="px-6 md:px-20 py-24 border-t border-black/5">
          <FadeIn className="max-w-4xl mx-auto text-center space-y-10">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase">
              Stay Informed
            </h2>
            <p className="text-zinc-500 text-lg">
              Receive curated property listings and market reports twice a
              month.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                className="flex-1 h-14 bg-white rounded-xl border-black/10 px-6"
                placeholder="Email Address"
                type="email"
              />
              <button className="h-14 px-8 bg-zinc-900 text-white rounded-xl font-bold hover:bg-black transition-colors">
                Subscribe
              </button>
            </div>
          </FadeIn>
        </section>
      </main>
    </div>
  );
};

export default Main;
