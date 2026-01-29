"use client";

import React from "react";
import { 
  Wallet, 
  TrendingUp, 
  Search, 
  Calendar, 
  Filter, 
  Download, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

const Main = () => {
  return (
    <div className="bg-[#f8f7f6] min-h-screen text-[#171512] font-sans">
      <main className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10 pt-24 lg:pt-10">
        
        {/* Page Header & Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <p className="text-[#d0a539] text-xs font-black uppercase tracking-[0.4em] mb-2">
              Financial Ledger
            </p>
            <h1 className="text-[#171512] text-4xl md:text-5xl font-black tracking-tight font-serif italic">
              Transaction History
            </h1>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-[#171512]/10 shadow-sm min-w-[280px]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#171512]/50 text-[10px] font-black uppercase tracking-widest">
                Total Invested Portfolio
              </span>
              <Wallet className="text-[#d0a539]" size={20} />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#171512]">
                $12,450,000
              </span>
              <span className="text-green-500 text-xs font-bold flex items-center gap-1">
                <TrendingUp size={14} /> +4.2%
              </span>
            </div>
          </div>
        </div>

        {/* Controls Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-[#171512]/5 mb-6 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#171512]/40" size={18} />
            <input
              className="w-full pl-10 pr-4 py-2 bg-[#f8f7f6] border-none rounded-lg text-sm focus:ring-1 focus:ring-[#d0a539] outline-none"
              placeholder="Search reference, project or location..."
              type="text"
            />
          </div>
          
          <div className="flex gap-4 items-center">
            <div className="relative">
              <select className="appearance-none bg-[#f8f7f6] border-none rounded-lg text-xs font-bold uppercase tracking-widest pl-4 pr-10 py-2.5 focus:ring-1 focus:ring-[#d0a539] cursor-pointer outline-none text-[#171512]">
                <option>Date Range: All Time</option>
                <option>Last 30 Days</option>
                <option>Current Quarter</option>
                <option>FY 2023</option>
              </select>
              <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#d0a539]" size={16} />
            </div>
            
            <div className="relative">
              <select className="appearance-none bg-[#f8f7f6] border-none rounded-lg text-xs font-bold uppercase tracking-widest pl-4 pr-10 py-2.5 focus:ring-1 focus:ring-[#d0a539] cursor-pointer outline-none text-[#171512]">
                <option>Sector: All</option>
                <option>Agriculture</option>
                <option>Tech</option>
                <option>Real Estate</option>
              </select>
              <Filter className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#d0a539]" size={16} />
            </div>
            
            <button className="bg-[#d0a539]/10 text-[#d0a539] hover:bg-[#d0a539] hover:text-[#171512] transition-all p-2 rounded-lg flex items-center justify-center">
              <Download size={20} />
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-[#171512]/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#171512]/5 bg-[#171512]/[0.02]">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">
                    Time Stamp
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">
                    Payment Reference
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">
                    User
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">
                    Investment Project
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">
                    Location
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#171512]/40 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171512]/5">
                {/* Row 1 */}
                <tr className="hover:bg-[#d0a539]/[0.03] transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#171512]">Oct 24, 2024</span>
                      <span className="text-[10px] text-[#171512]/50 uppercase">
                        14:32:01 GMT
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[#d0a539] font-mono text-xs font-bold tracking-wider">
                      #BK-AG-9921-X
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-[#171512]">
                    A. King Ledger
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                      <span className="text-sm font-bold italic text-[#171512]">
                        Green Acres Elite
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-[#171512]">Midlands, UK</td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-black text-[#171512]">$250,000.00</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-[#d0a539] text-[10px] font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                      View Receipt
                    </button>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-[#d0a539]/[0.03] transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#171512]">Oct 20, 2024</span>
                      <span className="text-[10px] text-[#171512]/50 uppercase">
                        09:15:44 GMT
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[#d0a539] font-mono text-xs font-bold tracking-wider">
                      #BK-RE-4412-Z
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-[#171512]">
                    Corp Entity 7
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#d0a539]"></span>
                      <span className="text-sm font-bold italic text-[#171512]">
                        Azure Heights Tower
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-[#171512]">Dubai, UAE</td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-black text-[#171512]">$1,120,000.00</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-[#d0a539] text-[10px] font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                      View Receipt
                    </button>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-[#d0a539]/[0.03] transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#171512]">Oct 18, 2024</span>
                      <span className="text-[10px] text-[#171512]/50 uppercase">
                        16:55:12 GMT
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[#d0a539] font-mono text-xs font-bold tracking-wider">
                      #BK-TC-1102-K
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-[#171512]">
                    A. King Ledger
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      <span className="text-sm font-bold italic text-[#171512]">
                        Neural Core AI
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-[#171512]">
                    Silicon Valley, US
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-black text-[#171512]">$85,000.00</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-[#d0a539] text-[10px] font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                      View Receipt
                    </button>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-[#d0a539]/[0.03] transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#171512]">Oct 12, 2024</span>
                      <span className="text-[10px] text-[#171512]/50 uppercase">
                        11:02:00 GMT
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[#d0a539] font-mono text-xs font-bold tracking-wider">
                      #BK-RE-8890-L
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-[#171512]">
                    Family Trust 04
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#d0a539]"></span>
                      <span className="text-sm font-bold italic text-[#171512]">
                        Golden Sands Resort
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-[#171512]">Maldives</td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-black text-[#171512]">$4,500,000.00</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-[#d0a539] text-[10px] font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                      View Receipt
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 bg-[#171512]/[0.02] flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#171512]/40">
              Showing 4 of 124 transactions
            </p>
            <div className="flex gap-2">
              <button 
                className="px-3 py-1 rounded border border-[#171512]/10 hover:border-[#d0a539] transition-colors disabled:opacity-30 disabled:hover:border-[#171512]/10 text-[#171512]" 
                disabled
              >
                <ChevronLeft size={16} />
              </button>
              <button className="px-3 py-1 rounded border border-[#171512]/10 hover:border-[#d0a539] transition-colors text-[#171512]">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;