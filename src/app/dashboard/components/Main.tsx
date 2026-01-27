// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Wallet,
//   ArrowUp,
//   BarChart3,
//   TrendingUp,
//   Calendar,
//   Banknote,
//   ArrowRight,
//   ExternalLink,
//   Loader2,
// } from "lucide-react";
// import NotificationComponent from "./NotificationComponent";
// import Link from "next/link";
// import { dashboardClient, DashboardData } from "../api/dashboardSummaryApi";

// // Helper for Currency Formatting
// const formatCurrency = (amount: number) => {
//   return new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     minimumFractionDigits: 2,
//   }).format(amount);
// };

// // Helper for Date Formatting
// const formatDate = (dateString: string) => {
//   return new Date(dateString).toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });
// };

// export const Main = () => {
//   const [data, setData] = useState<DashboardData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await dashboardClient.getSummary();
//         setData(result);
//       } catch (error) {
//         console.error("Failed to load dashboard data", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex-1 min-h-screen flex items-center justify-center bg-[#f8f7f6]">
//         <Loader2 className="animate-spin text-[#d0a539]" size={40} />
//       </div>
//     );
//   }

//   // Fallback if API fails but loading is false
//   if (!data)
//     return (
//       <div className="p-10 text-center text-gray-500">
//         Unable to load dashboard data.
//       </div>
//     );

//   return (
//     <main className="flex-1 p-6 lg:p-10 bg-[#f8f7f6] min-h-screen text-[#171512] pt-24 lg:pt-10">
//       {/* Header */}
//       <header className="flex justify-between items-start md:items-center mb-10 gap-4">
//         <div>
//           <h2 className="text-lg lg:text-2xl font-black text-[#171512] tracking-tight uppercase">
//             Investor Dashboard
//           </h2>
//           <p className="text-[#171512]/50 text-xs lg:text-sm font-medium">
//             Welcome back!
//           </p>
//         </div>
//         <NotificationComponent
//           userImage="/leadership2.jpg"
//           hasNotifications={true}
//         />
//       </header>

//       {/* Stats Grid */}
//       <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
//         {/* Item 1: Total Invested */}
//         <div className="bg-white p-6 rounded-2xl border border-[#171512]/5 shadow-sm hover:shadow-md transition-shadow">
//           <div className="flex justify-between items-start mb-4">
//             <div className="bg-[#d0a539]/10 p-2 rounded-lg">
//               <Wallet className="text-[#d0a539]" size={24} />
//             </div>
//             {/* Note: Growth percentage is hardcoded for now as backend doesn't provide history yet */}
//             <span className="text-green-500 text-xs font-bold flex items-center gap-1">
//               +12.4% <ArrowUp size={14} strokeWidth={3} />
//             </span>
//           </div>
//           <p className="text-[#171512]/40 text-[10px] font-black uppercase tracking-widest">
//             Total Invested
//           </p>
//           <h3 className="text-2xl font-black text-[#171512]">
//             {formatCurrency(data.total_invested)}
//           </h3>
//         </div>

//         {/* Item 2: Portfolio Value */}
//         <div className="bg-white p-6 rounded-2xl border border-[#171512]/5 shadow-sm hover:shadow-md transition-shadow">
//           <div className="flex justify-between items-start mb-4">
//             <div className="bg-[#d0a539]/10 p-2 rounded-lg">
//               <BarChart3 className="text-[#d0a539]" size={24} />
//             </div>
//             <span className="text-green-500 text-xs font-bold flex items-center gap-1">
//               +8.2% <ArrowUp size={14} strokeWidth={3} />
//             </span>
//           </div>
//           <p className="text-[#171512]/40 text-[10px] font-black uppercase tracking-widest">
//             Portfolio Value
//           </p>
//           <h3 className="text-2xl font-black text-[#171512]">
//             {formatCurrency(data.portfolio_value)}
//           </h3>
//         </div>

//         {/* Item 3: Expected ROI */}
//         <div className="bg-white p-6 rounded-2xl border border-[#171512]/5 shadow-sm hover:shadow-md transition-shadow">
//           <div className="flex justify-between items-start mb-4">
//             <div className="bg-[#d0a539]/10 p-2 rounded-lg">
//               <TrendingUp className="text-[#d0a539]" size={24} />
//             </div>
//             <span className="text-[#171512]/40 text-xs font-bold">Average</span>
//           </div>
//           <p className="text-[#171512]/40 text-[10px] font-black uppercase tracking-widest">
//             Expected ROI
//           </p>
//           <h3 className="text-2xl font-black text-[#171512]">
//             {Number(data.projected_roi_percentage).toFixed(1)}%{" "}
//             <span className="text-sm font-bold text-[#171512]/30">p.a.</span>
//           </h3>
//         </div>

//         {/* Item 4: Next Payment (Dynamic) */}
//         <div className="bg-[#171512] p-6 rounded-2xl border border-[#171512]/5 shadow-sm hover:shadow-md transition-shadow text-white">
//           <div className="flex justify-between items-start mb-4">
//             <div className="bg-[#d0a539]/20 p-2 rounded-lg">
//               <Calendar className="text-[#d0a539]" size={24} />
//             </div>
//             <span className="text-[#d0a539] text-xs font-bold">
//               {data.next_payment
//                 ? `${data.next_payment.days_left} Days Left`
//                 : "No Due Payments"}
//             </span>
//           </div>
//           <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">
//             {data.next_payment ? "Next Payment Due" : "Payment Status"}
//           </p>
//           <h3 className="text-2xl font-black text-white">
//             {data.next_payment
//               ? formatCurrency(data.next_payment.amount)
//               : "All Clear"}
//           </h3>
//         </div>
//       </section>

//       {/* Graphs & Activity */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
//         <div className="lg:col-span-2 bg-white rounded-2xl border border-[#171512]/5 p-6 lg:p-8">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
//             <div>
//               <h3 className="text-md lg:text-lg font-black uppercase tracking-tight">
//                 Investment Growth
//               </h3>
//               <p className="text-[#171512]/40 text-xs">
//                 Performance trajectory over the last 12 months
//               </p>
//             </div>
//             <div className="flex gap-2">
//               <button className="px-3 py-1 text-[10px] font-bold border border-[#171512]/10 rounded-full hover:bg-[#d0a539]/10 transition-colors">
//                 1M
//               </button>
//               <button className="px-3 py-1 text-[10px] font-bold border border-[#d0a539] bg-[#d0a539]/10 rounded-full text-[#d0a539]">
//                 6M
//               </button>
//               <button className="px-3 py-1 text-[10px] font-bold border border-[#171512]/10 rounded-full hover:bg-[#d0a539]/10 transition-colors">
//                 1Y
//               </button>
//             </div>
//           </div>

//           {/* Chart Placeholder */}
//           <div className="relative h-48 lg:h-64 w-full bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
//             <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
//               [Image of investment growth line chart]
//             </p>
//           </div>
//         </div>

//         {/* Recent Transactions */}
//         <div className="bg-white rounded-2xl border border-[#171512]/5 p-6 lg:p-8 flex flex-col h-full">
//           <h3 className="text-md lg:text-lg font-black uppercase tracking-tight mb-6">
//             Recent Transactions
//           </h3>

//           <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar flex-1">
//             {data.recent_transactions.length === 0 && (
//               <div className="h-full flex flex-col items-center justify-center text-gray-400">
//                 <p className="text-xs">No recent transactions found.</p>
//               </div>
//             )}

//             {data.recent_transactions.map((tx) => (
//               <div
//                 key={tx.id}
//                 // Flex container with gap-4 prevents overlap
//                 className="flex items-center justify-between gap-4 border-b border-[#171512]/5 pb-4 last:border-0"
//               >
//                 {/* LEFT SIDE: Icon + Text */}
//                 {/* min-w-0 is CRITICAL here: it allows the inner text to truncate instead of pushing the layout out */}
//                 <div className="flex items-center gap-3 min-w-0 overflow-hidden">
//                   {/* Icon - shrink-0 ensures it stays a circle and doesn't squash */}
//                   <div className="w-10 h-10 bg-[#d0a539]/10 text-[#d0a539] rounded-lg flex items-center justify-center shrink-0">
//                     <Banknote size={20} strokeWidth={2.5} />
//                   </div>

//                   <div className="flex flex-col min-w-0">
//                     {/* Title - Truncate handles long text gracefully */}
//                     <p className="text-sm font-black tracking-tight text-[#171512] truncate">
//                       {tx.title}
//                     </p>
//                     <p className="text-[10px] text-[#171512]/40 uppercase truncate">
//                       {formatDate(tx.date_paid)}
//                     </p>
//                   </div>
//                 </div>

//                 {/* RIGHT SIDE: Amount + Status */}
//                 {/* shrink-0 ensures the price is always fully visible */}
//                 <div className="text-right shrink-0">
//                   <p className="text-sm font-black text-[#171512] whitespace-nowrap">
//                     {formatCurrency(tx.amount)}
//                   </p>
//                   {/* Status Badge */}
//                   <span className="inline-block mt-1 text-[8px] font-bold uppercase tracking-widest bg-[#171512]/5 px-2 py-0.5 rounded text-[#171512]/40">
//                     {tx.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Footer Action */}
//           <div className="pt-6 mt-auto flex items-center justify-center border-t border-[#171512]/5">
//             <Link
//               href="/dashboard/transactions"
//               className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d0a539] hover:underline"
//             >
//               View All Records
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Portfolio Status */}
//       <section>
//         <div className="flex justify-between items-end mb-8">
//           <div>
//             <h3 className="text-lg lg:text-xl font-black uppercase tracking-tight">
//               Portfolio Status
//             </h3>
//             <p className="text-[#171512]/50 text-sm">
//               Real-time performance of your active real estate assets
//             </p>
//           </div>
//           <Link
//             href="/dashboard/portfolio"
//             className="text-xs font-black text-[#d0a539] flex items-center gap-2 hover:gap-3 transition-all"
//           >
//             VIEW FULL <span className="hidden sm:inline">PORTFOLIO</span>{" "}
//             <ArrowRight size={18} strokeWidth={3} />
//           </Link>
//         </div>

//         {/* UPDATED GRID CLASS HERE: grid-cols-1 lg:grid-cols-3 */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {data.portfolio_items.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white rounded-2xl overflow-hidden border border-[#171512]/5 group shadow-sm hover:shadow-xl transition-all"
//             >
//               <div className="relative h-48">
//                 <div
//                   className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
//                   style={{
//                     backgroundImage: `url('${item.project_img || "/img3.png"}')`,
//                   }}
//                 ></div>
//                 <div className="absolute top-4 right-4">
//                   <span className="bg-green-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
//                     {item.status}
//                   </span>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h4 className="text-md font-black tracking-tight line-clamp-1">
//                       {item.project_name}
//                     </h4>
//                     <p className="text-[10px] text-[#171512]/40 uppercase font-bold tracking-widest line-clamp-1">
//                       {item.location}
//                     </p>
//                   </div>
//                   <p className="text-[#d0a539] font-black text-lg">
//                     {Number(item.expected_roi).toFixed(1)}% ROI
//                   </p>
//                 </div>
//                 <div className="flex justify-between items-center pt-4 border-t border-[#171512]/5">
//                   <div className="text-[10px] text-[#171512]/40 font-bold uppercase">
//                     Equity Held: {item.percentage_completion}%
//                   </div>
//                   <Link
//                     href={`/dashboard/portfolio/${item.id}`}
//                     className="text-[#d0a539] font-black text-[10px] uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all"
//                   >
//                     Details <ExternalLink size={12} strokeWidth={3} />
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {data.portfolio_items.length === 0 && (
//             <div className="col-span-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl">
//               <p className="text-sm font-bold text-gray-400">
//                 No active investments found.
//               </p>
//               <Link
//                 href="/invest"
//                 className="mt-2 text-xs font-black text-[#d0a539] uppercase tracking-widest hover:underline"
//               >
//                 Start Investing
//               </Link>
//             </div>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// };












"use client";

import React, { useEffect, useState } from "react";
import {
  Wallet,
  ArrowUp,
  BarChart3,
  TrendingUp,
  Calendar,
  Banknote,
  ArrowRight,
  ExternalLink,
  Loader2,
} from "lucide-react";
import NotificationComponent from "./NotificationComponent";
import Link from "next/link";
import { dashboardClient, DashboardData } from "../api/dashboardSummaryApi";

// Helper for Currency Formatting
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);
};

// Helper for Date Formatting
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const Main = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dashboardClient.getSummary();
        setData(result);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 min-h-screen flex items-center justify-center bg-[#f8f7f6]">
        <Loader2 className="animate-spin text-[#d0a539]" size={40} />
      </div>
    );
  }

  if (!data)
    return (
      <div className="p-10 text-center text-gray-500">
        Unable to load dashboard data.
      </div>
    );

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-10 bg-[#f8f7f6] min-h-screen text-[#171512] pt-20 lg:pt-10">
      {/* Header */}
      <header className="flex justify-between items-start md:items-center mb-6 lg:mb-10 gap-4">
        <div>
          <h2 className="text-lg lg:text-2xl font-black text-[#171512] tracking-tight uppercase">
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
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-10">
        {/* Item 1: Total Invested */}
        <div className="bg-white p-5 lg:p-6 rounded-2xl border border-[#171512]/5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-[#d0a539]/10 p-2 rounded-lg">
              <Wallet className="text-[#d0a539]" size={20} />
            </div>
            <span className="text-green-500 text-[10px] lg:text-xs font-bold flex items-center gap-1">
              +12.4% <ArrowUp size={12} strokeWidth={3} />
            </span>
          </div>
          <p className="text-[#171512]/40 text-[10px] font-black uppercase tracking-widest">
            Total Invested
          </p>
          <h3 className="text-xl lg:text-2xl font-black text-[#171512]">
            {formatCurrency(data.total_invested)}
          </h3>
        </div>

        {/* Item 2: Portfolio Value */}
        <div className="bg-white p-5 lg:p-6 rounded-2xl border border-[#171512]/5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-[#d0a539]/10 p-2 rounded-lg">
              <BarChart3 className="text-[#d0a539]" size={20} />
            </div>
            <span className="text-green-500 text-[10px] lg:text-xs font-bold flex items-center gap-1">
              +8.2% <ArrowUp size={12} strokeWidth={3} />
            </span>
          </div>
          <p className="text-[#171512]/40 text-[10px] font-black uppercase tracking-widest">
            Portfolio Value
          </p>
          <h3 className="text-xl lg:text-2xl font-black text-[#171512]">
            {formatCurrency(data.portfolio_value)}
          </h3>
        </div>

        {/* Item 3: Expected ROI */}
        <div className="bg-white p-5 lg:p-6 rounded-2xl border border-[#171512]/5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-[#d0a539]/10 p-2 rounded-lg">
              <TrendingUp className="text-[#d0a539]" size={20} />
            </div>
            <span className="text-[#171512]/40 text-[10px] font-bold">Average</span>
          </div>
          <p className="text-[#171512]/40 text-[10px] font-black uppercase tracking-widest">
            Expected ROI
          </p>
          <h3 className="text-xl lg:text-2xl font-black text-[#171512]">
            {Number(data.projected_roi_percentage).toFixed(1)}%{" "}
            <span className="text-xs lg:text-sm font-bold text-[#171512]/30">p.a.</span>
          </h3>
        </div>

        {/* Item 4: Next Payment */}
        <div className="bg-[#171512] p-5 lg:p-6 rounded-2xl border border-[#171512]/5 shadow-sm text-white">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-[#d0a539]/20 p-2 rounded-lg">
              <Calendar className="text-[#d0a539]" size={20} />
            </div>
            <span className="text-[#d0a539] text-[10px] font-bold">
              {data.next_payment
                ? `${data.next_payment.days_left} Days Left`
                : "No Due Payments"}
            </span>
          </div>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">
            {data.next_payment ? "Next Payment Due" : "Payment Status"}
          </p>
          <h3 className="text-xl lg:text-2xl font-black text-white">
            {data.next_payment
              ? formatCurrency(data.next_payment.amount)
              : "All Clear"}
          </h3>
        </div>
      </section>

      {/* Graphs & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#171512]/5 p-5 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h3 className="text-sm lg:text-lg font-black uppercase tracking-tight">
                Investment Growth
              </h3>
              <p className="text-[#171512]/40 text-[10px] lg:text-xs">
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
            </div>
          </div>

          <div className="relative h-48 lg:h-64 w-full bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
            <p className="text-[10px] lg:text-xs text-gray-400 font-bold uppercase tracking-widest">
              [Chart Placeholder]
            </p>
          </div>
        </div>

        {/* --- RECENT TRANSACTIONS (OPTIMIZED) --- */}
        <div className="bg-white rounded-2xl border border-[#171512]/5 p-5 lg:p-8 flex flex-col h-full max-h-[500px] lg:max-h-auto">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h3 className="text-sm lg:text-lg font-black uppercase tracking-tight">
              Recent Activity
            </h3>
            <span className="text-[10px] font-bold bg-[#171512]/5 px-2 py-1 rounded-md text-[#171512]/50">
              {data.recent_transactions.length} New
            </span>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-4">
            {data.recent_transactions.length === 0 && (
              <div className="h-40 flex flex-col items-center justify-center text-gray-400">
                <p className="text-xs">No recent transactions.</p>
              </div>
            )}

            {data.recent_transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-start justify-between gap-3 border-b border-[#171512]/5 pb-3 last:border-0 last:pb-0"
              >
                {/* Left: Icon + Text Details */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Smaller Icon Container for Mobile */}
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#d0a539]/10 text-[#d0a539] rounded-lg flex items-center justify-center shrink-0">
                    <Banknote className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={2.5} />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <p className="text-xs lg:text-sm font-black tracking-tight text-[#171512] truncate leading-tight">
                      {tx.title}
                    </p>
                    <p className="text-[10px] text-[#171512]/40 uppercase mt-0.5">
                      {formatDate(tx.date_paid)}
                    </p>
                  </div>
                </div>

                {/* Right: Amount + Status */}
                <div className="text-right shrink-0">
                  <p className="text-xs lg:text-sm font-black text-[#171512]">
                    {formatCurrency(tx.amount)}
                  </p>
                  <div className={`
                    inline-flex items-center justify-center mt-1 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider
                    ${tx.status.toLowerCase() === 'paid' ? 'bg-green-100 text-green-700' : 'bg-[#171512]/5 text-[#171512]/40'}
                  `}>
                    {tx.status}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 mt-auto border-t border-[#171512]/5 text-center">
            <Link
              href="/dashboard/transactions"
              className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d0a539] hover:text-[#b0892f] transition-colors"
            >
              View All Records
            </Link>
          </div>
        </div>
        {/* --- END RECENT TRANSACTIONS --- */}
      </div>

      {/* Portfolio Status */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-base lg:text-xl font-black uppercase tracking-tight">
              Portfolio Status
            </h3>
            <p className="text-[#171512]/50 text-xs lg:text-sm">
              Your active real estate assets
            </p>
          </div>
          <Link
            href="/dashboard/portfolio"
            className="text-[10px] lg:text-xs font-black text-[#d0a539] flex items-center gap-2 hover:gap-3 transition-all"
          >
            VIEW FULL <span className="hidden sm:inline">PORTFOLIO</span>{" "}
            <ArrowRight size={14} strokeWidth={3} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {data.portfolio_items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#171512]/5 group shadow-sm hover:shadow-xl transition-all"
            >
              <div className="relative h-40 lg:h-48">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('${item.project_img || "/img3.png"}')`,
                  }}
                ></div>
                <div className="absolute top-3 right-3">
                  <span className="bg-green-500 text-white text-[9px] lg:text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full shadow-lg">
                    {item.status}
                  </span>
                </div>
              </div>
              <div className="p-5 lg:p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-sm lg:text-md font-black tracking-tight line-clamp-1">
                      {item.project_name}
                    </h4>
                    <p className="text-[10px] text-[#171512]/40 uppercase font-bold tracking-widest line-clamp-1">
                      {item.location}
                    </p>
                  </div>
                  <p className="text-[#d0a539] font-black text-sm lg:text-lg whitespace-nowrap ml-2">
                    {Number(item.expected_roi).toFixed(1)}% ROI
                  </p>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-[#171512]/5">
                  <div className="text-[10px] text-[#171512]/40 font-bold uppercase">
                    Equity: {item.percentage_completion}%
                  </div>
                  <Link
                    href={`/dashboard/portfolio/${item.id}`}
                    className="text-[#d0a539] font-black text-[10px] uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Details <ExternalLink size={10} strokeWidth={3} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};