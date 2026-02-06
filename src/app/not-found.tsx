"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/nav/Navbar";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-[#171512] bg-white">
      {/* INLINE STYLES FOR CUSTOM TEXTURE 
        Ideally, put these in your global.css, but they are here for a drop-in solution.
      */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Epilogue:wght@300;400;500;700;900&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");

        .font-display {
          font-family: "Epilogue", sans-serif;
        }
        .font-serif-brand {
          font-family: "Cinzel", serif;
        }

        .gold-metallic-text {
          background: linear-gradient(
            to bottom,
            #d0a539 20%,
            #f9e698 50%,
            #d0a539 80%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gold-pattern {
          opacity: 0.05;
          background-image: radial-gradient(#d0a539 0.5px, transparent 0.5px);
          background-size: 24px 24px;
        }
        .corner-accent {
          width: 300px;
          height: 300px;
          border: 1px solid rgba(208, 165, 57, 0.15);
        }
      `}</style>

      <Navbar />

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow relative flex items-center justify-center overflow-hidden py-20 font-display">
        {/* Background Elements */}
        <div className="absolute inset-0 gold-pattern pointer-events-none"></div>
        <div className="absolute -top-20 -left-20 corner-accent rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 corner-accent rounded-full pointer-events-none"></div>

        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-[120px] md:text-[200px] font-serif-brand font-black leading-none text-[var(--primary)] select-none">
            404
          </h1>
          <div className="space-y-6 -mt-4 md:-mt-8">
            <h2 className="text-3xl md:text-5xl font-black text-[#171512] tracking-tight">
              The Path to Prosperity Has Diverged
            </h2>
            <p className="text-[#171512]/60 text-lg md:text-xl font-light leading-relaxed max-w-lg mx-auto">
              The asset you are looking for has been moved or is no longer part
              of our current digital portfolio.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link
                href="/"
                className="w-full sm:w-auto bg-[#d0a539] text-[#171512] px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-[#d0a539]/20"
              >
                Return to Homepage
              </Link>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto bg-white border-2 border-[#d0a539] text-[#d0a539] px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-[#d0a539] hover:text-[#171512] transition-all"
              >
                Explore Our Offers
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <Footer />
    </div>
  );
}
