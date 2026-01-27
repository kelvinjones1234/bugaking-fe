"use client"

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

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 w-full border-b border-[#171512]/5 bg-white/80 backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            {/* Logo Icon */}
            <div className="text-[#d0a539] size-8">
              <svg
                fill="currentColor"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"></path>
              </svg>
            </div>
            <h2 className="text-[#171512] text-xl font-black tracking-tighter uppercase font-display">
              Bugah King
            </h2>
          </div>

          <nav className="hidden md:flex flex-1 justify-center gap-10 font-display">
            <Link
              href="/agriculture"
              className="text-sm font-semibold hover:text-[#d0a539] transition-colors uppercase tracking-widest"
            >
              Agriculture
            </Link>
            <Link
              href="/technology"
              className="text-sm font-semibold hover:text-[#d0a539] transition-colors uppercase tracking-widest"
            >
              Tech
            </Link>
            <Link
              href="/real-estate"
              className="text-sm font-semibold hover:text-[#d0a539] transition-colors uppercase tracking-widest"
            >
              Real Estate
            </Link>
            <Link
              href="/legacy"
              className="text-sm font-semibold hover:text-[#d0a539] transition-colors uppercase tracking-widest"
            >
              Legacy
            </Link>
          </nav>

          <div className="flex items-center gap-6">
            <Link href="/contact">
              <button className="hidden sm:flex bg-[#d0a539] text-[#171512] px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-opacity-90 transition-all font-display">
                Inquire
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow relative flex items-center justify-center overflow-hidden py-20 font-display">
        {/* Background Elements */}
        <div className="absolute inset-0 gold-pattern pointer-events-none"></div>
        <div className="absolute -top-20 -left-20 corner-accent rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 corner-accent rounded-full pointer-events-none"></div>

        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-[120px] md:text-[200px] font-serif-brand font-black leading-none gold-metallic-text select-none">
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
                Explore Our Sectors
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-[#171512] text-white/50 py-16 px-10 border-t border-white/10 font-display">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-white">
              <div className="text-[#d0a539] size-6">
                <svg
                  fill="currentColor"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"></path>
                </svg>
              </div>
              <h2 className="text-white text-lg font-black tracking-tighter uppercase">
                Bugah King
              </h2>
            </div>
            <p className="text-sm leading-relaxed">
              Refining the landscape of modern enterprise through integrity,
              innovation, and an unwavering commitment to excellence.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-white text-sm font-black uppercase tracking-widest">
              Sectors
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/agriculture"
                  className="hover:text-[#d0a539] transition-colors"
                >
                  Agri-Science
                </Link>
              </li>
              <li>
                <Link
                  href="/technology"
                  className="hover:text-[#d0a539] transition-colors"
                >
                  Tech Infrastructure
                </Link>
              </li>
              <li>
                <Link
                  href="/real-estate"
                  className="hover:text-[#d0a539] transition-colors"
                >
                  Residential Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/commercial"
                  className="hover:text-[#d0a539] transition-colors"
                >
                  Commercial Assets
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white text-sm font-black uppercase tracking-widest">
              Corporate
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/investors"
                  className="hover:text-[#d0a539] transition-colors"
                >
                  Investor Relations
                </Link>
              </li>
              <li>
                <Link
                  href="/reports"
                  className="hover:text-[#d0a539] transition-colors"
                >
                  Annual Report
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="hover:text-[#d0a539] transition-colors"
                >
                  Press Office
                </Link>
              </li>
              <li>
                <Link
                  href="/sustainability"
                  className="hover:text-[#d0a539] transition-colors"
                >
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white text-sm font-black uppercase tracking-widest">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="size-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#d0a539] hover:text-[#171512] transition-all"
              >
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
              <a
                href="#"
                className="size-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#d0a539] hover:text-[#171512] transition-all"
              >
                <span className="material-symbols-outlined text-xl">
                  alternate_email
                </span>
              </a>
              <a
                href="#"
                className="size-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#d0a539] hover:text-[#171512] transition-all"
              >
                <span className="material-symbols-outlined text-xl">
                  location_on
                </span>
              </a>
            </div>
            <div className="pt-4 border-t border-white/5">
              <p className="text-[10px] uppercase font-bold tracking-[0.2em]">
                Headquarters
              </p>
              <p className="text-xs mt-1">One Royal Exchange, London, UK</p>
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-[10px] uppercase font-bold tracking-[0.2em]">
          <p>© 2024 Bugah King Conglomerate. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
