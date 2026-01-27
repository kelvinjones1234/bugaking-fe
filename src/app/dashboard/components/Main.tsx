"use client";

import React from "react";
import {
  Bell,
  Wallet,
  ArrowUp,
  BarChart3,
  TrendingUp,
  Calendar,
  ArrowDown,
  Banknote,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import NotificationComponent from "./NotificationComponent";

export const Main = () => {
  return (
    // FIX: Removed 'ml-64'. Added 'pt-20' for mobile spacing.
    <main className="flex-1 p-6 lg:p-10 bg-[#f8f7f6] min-h-screen text-[#171512] pt-24 lg:pt-10">
      {/* Header */}
      <header className="flex justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-lg lg:text-3xl font-black text-[#171512] tracking-tight uppercase">
            Investor Dashboard
          </h2>
          <p className="text-[#171512]/50 text-xs lg:text-sm font-medium">
            Welcome back!
          </p>
        </div>
        <NotificationComponent
          userImage="/leadership2.jpg"
          hasNotifications={true}
        />
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {" "}
        {/* Item 1 */}
        <div className="bg-white p-6 rounded-2xl border border-[#171512]/5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-[#d0a539]/10 p-2 rounded-lg">
              <Wallet className="text-[#d0a539]" size={24} />
            </div>
            <span className="text-green-500 text-xs font-bold flex items-center gap-1">
              +12.4% <ArrowUp size={14} strokeWidth={3} />
            </span>
          </div>
          <p className="text-[#171512]/40 text-[10px] font-black uppercase tracking-widest">
            Total Invested
          </p>
          <h3 className="text-2xl font-black text-[#171512]">₦4,250,000.00</h3>
        </div>
        {/* Item 2 */}
        <div className="bg-white p-6 rounded-2xl border border-[#171512]/5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-[#d0a539]/10 p-2 rounded-lg">
              <BarChart3 className="text-[#d0a539]" size={24} />
            </div>
            <span className="text-green-500 text-xs font-bold flex items-center gap-1">
              +8.2% <ArrowUp size={14} strokeWidth={3} />
            </span>
          </div>
          <p className="text-[#171512]/40 text-[10px] font-black uppercase tracking-widest">
            Portfolio Value
          </p>
          <h3 className="text-2xl font-black text-[#171512]">₦5,102,450.00</h3>
        </div>
        {/* Item 3 */}
        <div className="bg-white p-6 rounded-2xl border border-[#171512]/5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-[#d0a539]/10 p-2 rounded-lg">
              <TrendingUp className="text-[#d0a539]" size={24} />
            </div>
            <span className="text-[#171512]/40 text-xs font-bold">
              Projected
            </span>
          </div>
          <p className="text-[#171512]/40 text-[10px] font-black uppercase tracking-widest">
            Expected ROI
          </p>
          <h3 className="text-2xl font-black text-[#171512]">
            14.8%{" "}
            <span className="text-sm font-bold text-[#171512]/30">p.a.</span>
          </h3>
        </div>
        {/* Item 4 */}
        <div className="bg-[#171512] p-6 rounded-2xl border border-[#171512]/5 shadow-sm hover:shadow-md transition-shadow text-white">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-[#d0a539]/20 p-2 rounded-lg">
              <Calendar className="text-[#d0a539]" size={24} />
            </div>
            <span className="text-[#d0a539] text-xs font-bold">
              12 Days Left
            </span>
          </div>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">
            Next Payment Due
          </p>
          <h3 className="text-2xl font-black text-white">₦45,200.00</h3>
        </div>
      </section>

      {/* Graphs & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#171512]/5 p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h3 className="text-lg lg:text-xl font-black uppercase tracking-tight">
                Investment Growth
              </h3>
              <p className="text-[#171512]/40 text-xs">
                Performance trajectory over the last 12 months
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-[10px] font-bold border border-[#171512]/10 rounded-full hover:bg-[#d0a539]/10 transition-colors">
                1M
              </button>
              <button className="px-3 py-1 text-[10px] font-bold border border-[#d0a539] bg-[#d0a539]/10 rounded-full text-[#d0a539]">
                6M
              </button>
              <button className="px-3 py-1 text-[10px] font-bold border border-[#171512]/10 rounded-full hover:bg-[#d0a539]/10 transition-colors">
                1Y
              </button>
            </div>
          </div>
          {/* Chart Placeholder - Ensure height is responsive */}
          <div className="relative h-48 lg:h-64 w-full bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
              Chart Visualization
            </p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl border border-[#171512]/5 p-6 lg:p-8">
          <h3 className="text-lg lg:text-xl font-black uppercase tracking-tight mb-6">
            Recent Transactions
          </h3>
          <div className="space-y-6 overflow-y-auto max-h-[320px] pr-2">
            {/* Transaction 1 */}
            <div className="flex items-center justify-between border-b border-[#171512]/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center shrink-0">
                  <ArrowDown size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-sm font-black tracking-tight">
                    Dividend Payout
                  </p>
                  <p className="text-[10px] text-[#171512]/40 uppercase">
                    Oct 12, 2023
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-green-600">+₦12,450</p>
                <span className="text-[8px] font-bold uppercase tracking-widest bg-green-50 px-2 py-0.5 rounded text-green-600">
                  Completed
                </span>
              </div>
            </div>

            {/* Transaction 2 */}
            <div className="flex items-center justify-between border-b border-[#171512]/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d0a539]/10 text-[#d0a539] rounded-lg flex items-center justify-center shrink-0">
                  <Banknote size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-sm font-black tracking-tight">
                    Monthly Installment
                  </p>
                  <p className="text-[10px] text-[#171512]/40 uppercase">
                    Oct 01, 2023
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-[#171512]">-₦45,200</p>
                <span className="text-[8px] font-bold uppercase tracking-widest bg-[#171512]/5 px-2 py-0.5 rounded text-[#171512]/40">
                  Processing
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center pt-2">
              <button className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d0a539] hover:underline">
                View All Records
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Status */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight">
              Portfolio Status
            </h3>
            <p className="text-[#171512]/50 text-sm">
              Real-time performance of your active real estate assets
            </p>
          </div>
          <button className="text-sm font-black text-[#d0a539] flex items-center gap-2 hover:gap-3 transition-all">
            VIEW FULL <span className="hidden sm:inline">PORTFOLIO</span>{" "}
            <ArrowRight size={18} strokeWidth={3} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl overflow-hidden border border-[#171512]/5 group shadow-sm hover:shadow-xl transition-all">
            <div className="relative h-48">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('/img3.png')",
                }}
              ></div>
              {/* Placeholder for image */}
              {/* Replace div above with Image component when ready */}
              <div className="absolute top-4 right-4">
                <span className="bg-green-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                  Active
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-black tracking-tight">
                    Royal Crest Estate
                  </h4>
                  <p className="text-[10px] text-[#171512]/40 uppercase font-bold tracking-widest">
                    Mayfair, London
                  </p>
                </div>
                <p className="text-[#d0a539] font-black text-lg">18.2% ROI</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-[#171512]/5">
                <div className="text-[10px] text-[#171512]/40 font-bold uppercase">
                  Equity Held: 12.5%
                </div>
                <button className="text-[#d0a539] font-black text-[10px] uppercase tracking-widest flex items-center gap-1">
                  Details <ExternalLink size={12} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
          {/* Add more cards as needed using the same structure */}
        </div>
      </section>
    </main>
  );
};
