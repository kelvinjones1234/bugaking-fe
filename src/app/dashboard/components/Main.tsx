// "use client";

// import React, { useEffect, useState, useMemo, memo } from "react";
// import Image from "next/image"; // Optimization: Use Next Image
// import Link from "next/link";
// import {
//   Wallet,
//   BarChart3,
//   TrendingUp,
//   Calendar,
//   Banknote,
//   ArrowRight,
//   ExternalLink,
//   Loader2,
//   LucideIcon,
// } from "lucide-react";
// import NotificationComponent from "./NotificationComponent";
// import { dashboardClient, DashboardData } from "../api/dashboardSummaryApi";

// // ==========================================
// // 1. UTILS (Outside component to prevent re-creation)
// // ==========================================
// const formatCurrency = (amount: number) => {
//   return new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     minimumFractionDigits: 2,
//   }).format(amount);
// };

// const formatDate = (dateString: string) => {
//   return new Date(dateString).toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });
// };

// // ==========================================
// // 2. SUB-COMPONENTS (Memoized for Performance)
// // ==========================================

// // A. Stats Card
// interface StatsCardProps {
//   icon: LucideIcon;
//   label: string;
//   value: string | number;
//   subValue?: string;
//   isDark?: boolean;
// }

// const StatsCard = memo(({ icon: Icon, label, value, subValue, isDark = false }: StatsCardProps) => (
//   <div className={`${isDark ? "bg-[#171512] text-white" : "bg-white text-[#171512]"} p-5 lg:p-6 rounded-2xl border border-[#171512]/5 shadow-sm`}>
//     <div className="flex justify-between items-start mb-4">
//       <div className={`${isDark ? "bg-[#d0a539]/20" : "bg-[#d0a539]/10"} p-2 rounded-lg`}>
//         <Icon className="text-[#d0a539]" size={20} />
//       </div>
//       {subValue && (
//         <span className={`${isDark ? "text-[#d0a539]" : "text-[#171512]/40"} text-[10px] font-bold`}>
//           {subValue}
//         </span>
//       )}
//     </div>
//     <p className={`${isDark ? "text-white/40" : "text-[#171512]/40"} text-[10px] font-black uppercase tracking-widest`}>
//       {label}
//     </p>
//     <h3 className="text-xl lg:text-2xl font-black mt-1">
//       {value}
//     </h3>
//   </div>
// ));
// StatsCard.displayName = "StatsCard";

// // B. Transaction Row
// const TransactionRow = memo(({ tx }: { tx: any }) => (
//   <div className="flex items-start justify-between gap-3 border-b border-[#171512]/5 pb-3 last:border-0 last:pb-0">
//     <div className="flex items-center gap-3 min-w-0 flex-1">
//       <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#d0a539]/10 text-[#d0a539] rounded-lg flex items-center justify-center shrink-0">
//         <Banknote className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={2.5} />
//       </div>
//       <div className="flex flex-col min-w-0">
//         <p className="text-xs lg:text-sm font-black tracking-tight text-[#171512] truncate leading-tight">
//           {tx.title}
//         </p>
//         <p className="text-[10px] text-[#171512]/40 uppercase mt-0.5">
//           {formatDate(tx.date_paid)}
//         </p>
//       </div>
//     </div>
//     <div className="text-right shrink-0">
//       <p className="text-xs lg:text-sm font-black text-[#171512]">
//         {formatCurrency(tx.amount)}
//       </p>
//       <div className={`inline-flex items-center justify-center mt-1 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
//         tx.status.toLowerCase() === "paid" ? "bg-green-100 text-green-700" : "bg-[#171512]/5 text-[#171512]/40"
//       }`}>
//         {tx.status}
//       </div>
//     </div>
//   </div>
// ));
// TransactionRow.displayName = "TransactionRow";

// // C. Portfolio Card (Optimized with Next/Image)
// const PortfolioCard = memo(({ item }: { item: any }) => (
//   <div className="bg-white rounded-2xl overflow-hidden border border-[#171512]/5 group shadow-sm hover:shadow-xl transition-all flex flex-col h-full">
//     <div className="relative h-40 lg:h-48 w-full overflow-hidden">
//       {/* Optimization: Next.js Image Component */}
//       <Image 
//         src={item.project_img || ""} 
//         alt={item.project_name}
//         fill
//         className="object-cover transition-transform duration-500 group-hover:scale-110"
//         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//       />
//       <div className="absolute top-3 right-3 z-10">
//         <span className="bg-green-500 text-white text-[9px] lg:text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full shadow-lg">
//           {item.status}
//         </span>
//       </div>
//     </div>
//     <div className="p-5 lg:p-6 flex flex-col flex-1 justify-between">
//       <div className="flex justify-between items-start mb-3">
//         <div>
//           <h4 className="text-sm lg:text-md font-black tracking-tight line-clamp-1">
//             {item.project_name}
//           </h4>
//           <p className="text-[10px] text-[#171512]/40 uppercase font-bold tracking-widest line-clamp-1">
//             {item.location}
//           </p>
//         </div>
//         <p className="text-[#d0a539] font-black text-sm lg:text-lg whitespace-nowrap ml-2">
//           {Number(item.expected_roi).toFixed(1)}% ROI
//         </p>
//       </div>
//       <div className="flex justify-between items-center pt-3 border-t border-[#171512]/5 mt-auto">
//         <div className="text-[10px] text-[#171512]/40 font-bold uppercase">
//           Equity: {item.percentage_completion}%
//         </div>
//         <Link
//           href={`/dashboard/portfolio/${item.id}`}
//           className="text-[#d0a539] font-black text-[10px] uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all"
//         >
//           Details <ExternalLink size={10} strokeWidth={3} />
//         </Link>
//       </div>
//     </div>
//   </div>
// ));
// PortfolioCard.displayName = "PortfolioCard";

// // ==========================================
// // 3. MAIN COMPONENT
// // ==========================================
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

//   if (!data) return (
//     <div className="p-10 text-center text-gray-500">Unable to load dashboard data.</div>
//   );

//   return (
//     <main className="flex-1 p-4 md:p-6 lg:p-10 bg-[#f8f7f6] min-h-screen text-[#171512] pt-20 lg:pt-10">
//       {/* Header */}
//       <header className="flex justify-between items-start md:items-center mb-6 lg:mb-10 gap-4">
//         <div>
//           <h2 className="text-lg lg:text-2xl font-black text-[#171512] tracking-tight uppercase">
//             Investor Dashboard
//           </h2>
//           <p className="text-[#171512]/50 text-xs lg:text-sm font-medium">
//             Welcome back!
//           </p>
//         </div>
//         <NotificationComponent />
//       </header>

//       {/* Stats Grid */}
//       <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-10">
//         <StatsCard 
//           icon={Wallet} 
//           label="Total Invested" 
//           value={formatCurrency(data.total_invested)} 
//         />
//         <StatsCard 
//           icon={BarChart3} 
//           label="Portfolio Value" 
//           value={formatCurrency(data.portfolio_value)} 
//         />
//         <StatsCard 
//           icon={TrendingUp} 
//           label="Expected ROI" 
//           value={`${Number(data.projected_roi_percentage).toFixed(1)}%`}
//           subValue="p.a."
//         />
//         <StatsCard 
//           icon={Calendar} 
//           label={data.next_payment ? "Next Payment Due" : "Payment Status"}
//           value={data.next_payment ? formatCurrency(data.next_payment.amount) : "All Clear"}
//           subValue={data.next_payment ? `${data.next_payment.days_left} Days Left` : "No Due Payments"}
//           isDark={true}
//         />
//       </section>

//       {/* Graphs & Activity */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        
//         {/* Placeholder Chart */}
//         <div className="lg:col-span-2 bg-white rounded-2xl border border-[#171512]/5 p-5 lg:p-8">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//             <div>
//               <h3 className="text-sm lg:text-lg font-black uppercase tracking-tight">
//                 Investment Growth
//               </h3>
//               <p className="text-[#171512]/40 text-[10px] lg:text-xs">
//                 Performance trajectory over the last 12 months
//               </p>
//             </div>
//             <div className="flex gap-2">
//               <button className="px-3 py-1 text-[10px] font-bold border border-[#171512]/10 rounded-full hover:bg-[#d0a539]/10 transition-colors">1M</button>
//               <button className="px-3 py-1 text-[10px] font-bold border border-[#d0a539] bg-[#d0a539]/10 rounded-full text-[#d0a539]">6M</button>
//             </div>
//           </div>
//           <div className="relative h-48 lg:h-64 w-full bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
//             <p className="text-[10px] lg:text-xs text-gray-400 font-bold uppercase tracking-widest">[Chart Placeholder]</p>
//           </div>
//         </div>

//         {/* Recent Transactions */}
//         <div className="bg-white rounded-2xl border border-[#171512]/5 p-5 lg:p-8 flex flex-col h-full max-h-[500px] lg:max-h-auto">
//           <div className="flex items-center justify-between mb-4 lg:mb-6">
//             <h3 className="text-sm lg:text-lg font-black uppercase tracking-tight">Recent Activity</h3>
//             <span className="text-[10px] font-bold bg-[#171512]/5 px-2 py-1 rounded-md text-[#171512]/50">
//               {data.recent_transactions.length} New
//             </span>
//           </div>

//           <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-4">
//             {data.recent_transactions.length === 0 && (
//               <div className="h-40 flex flex-col items-center justify-center text-gray-400">
//                 <p className="text-xs">No recent transactions.</p>
//               </div>
//             )}
//             {data.recent_transactions.map((tx) => (
//               <TransactionRow key={tx.id} tx={tx} />
//             ))}
//           </div>

//           <div className="pt-4 mt-auto border-t border-[#171512]/5 text-center">
//             <Link href="/dashboard/payments" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d0a539] hover:text-[#b0892f] transition-colors">
//               View All Records
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Portfolio Status */}
//       <section>
//         <div className="flex justify-between items-end mb-6">
//           <div>
//             <h3 className="text-base lg:text-xl font-black uppercase tracking-tight">Portfolio Status</h3>
//             <p className="text-[#171512]/50 text-xs lg:text-sm">Your active real estate assets</p>
//           </div>
//           <Link href="/dashboard/portfolio" className="text-[10px] lg:text-xs font-black text-[#d0a539] flex items-center gap-2 hover:gap-3 transition-all">
//             VIEW ALL <span className="hidden sm:inline">PORTFOLIO</span> <ArrowRight size={14} strokeWidth={3} />
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
//           {data.portfolio_items.map((item) => (
//             <PortfolioCard key={item.id} item={item} />
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// };








"use client";

import React, { useEffect, useState, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Wallet,
  BarChart3,
  TrendingUp,
  Calendar,
  Banknote,
  ArrowRight,
  ExternalLink,
  Loader2,
  LucideIcon,
} from "lucide-react";
import NotificationComponent from "./NotificationComponent";
import { dashboardClient, DashboardData } from "../api/dashboardSummaryApi";
// Import the Detail Component (Assumed to be in the same folder)
import InvestmentDetail from "../portfolio/components/InvestmentDetail";
// ==========================================
// 1. UTILS
// ==========================================
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// ==========================================
// 2. SUB-COMPONENTS
// ==========================================

// A. Stats Card
interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subValue?: string;
  isDark?: boolean;
}

const StatsCard = memo(({ icon: Icon, label, value, subValue, isDark = false }: StatsCardProps) => (
  <div className={`${isDark ? "bg-[#171512] text-white" : "bg-white text-[#171512]"} p-5 lg:p-6 rounded-2xl border border-[#171512]/5 shadow-sm`}>
    <div className="flex justify-between items-start mb-4">
      <div className={`${isDark ? "bg-[#d0a539]/20" : "bg-[#d0a539]/10"} p-2 rounded-lg`}>
        <Icon className="text-[#d0a539]" size={20} />
      </div>
      {subValue && (
        <span className={`${isDark ? "text-[#d0a539]" : "text-[#171512]/40"} text-[10px] font-bold`}>
          {subValue}
        </span>
      )}
    </div>
    <p className={`${isDark ? "text-white/40" : "text-[#171512]/40"} text-[10px] font-black uppercase tracking-widest`}>
      {label}
    </p>
    <h3 className="text-xl lg:text-2xl font-black mt-1">
      {value}
    </h3>
  </div>
));
StatsCard.displayName = "StatsCard";

// B. Transaction Row
const TransactionRow = memo(({ tx }: { tx: any }) => (
  <div className="flex items-start justify-between gap-3 border-b border-[#171512]/5 pb-3 last:border-0 last:pb-0">
    <div className="flex items-center gap-3 min-w-0 flex-1">
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
    <div className="text-right shrink-0">
      <p className="text-xs lg:text-sm font-black text-[#171512]">
        {formatCurrency(tx.amount)}
      </p>
      <div className={`inline-flex items-center justify-center mt-1 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
        tx.status.toLowerCase() === "paid" ? "bg-green-100 text-green-700" : "bg-[#171512]/5 text-[#171512]/40"
      }`}>
        {tx.status}
      </div>
    </div>
  </div>
));
TransactionRow.displayName = "TransactionRow";

// C. Portfolio Card
// UPDATED: Now accepts `onViewDetail` prop instead of using Link
const PortfolioCard = memo(({ item, onViewDetail }: { item: any, onViewDetail: (id: number) => void }) => (
  <div className="bg-white rounded-2xl overflow-hidden border border-[#171512]/5 group shadow-sm hover:shadow-xl transition-all flex flex-col h-full">
    <div className="relative h-40 lg:h-48 w-full overflow-hidden">
      <Image 
        src={item.project_img || ""} 
        alt={item.project_name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute top-3 right-3 z-10">
        <span className="bg-green-500 text-white text-[9px] lg:text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full shadow-lg">
          {item.status}
        </span>
      </div>
    </div>
    <div className="p-5 lg:p-6 flex flex-col flex-1 justify-between">
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
      <div className="flex justify-between items-center pt-3 border-t border-[#171512]/5 mt-auto">
        <div className="text-[10px] text-[#171512]/40 font-bold uppercase">
          Equity: {item.percentage_completion}%
        </div>
        
        {/* UPDATED: Button with onClick handler */}
        <button
          onClick={() => onViewDetail(item.id)}
          className="text-[#d0a539] font-black text-[10px] uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all"
        >
          Details <ExternalLink size={10} strokeWidth={3} />
        </button>
      </div>
    </div>
  </div>
));
PortfolioCard.displayName = "PortfolioCard";

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export const Main = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // NEW: State to track selected investment for Detail View
  const [selectedInvestmentId, setSelectedInvestmentId] = useState<number | null>(null);

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

  // ------------------------------------------
  // CONDITIONAL RENDER: DETAIL VIEW
  // ------------------------------------------
  if (selectedInvestmentId !== null) {
    return (
      <InvestmentDetail 
        id={selectedInvestmentId} 
        onBack={() => setSelectedInvestmentId(null)} 
      />
    );
  }

  // ------------------------------------------
  // NORMAL RENDER: DASHBOARD VIEW
  // ------------------------------------------
  if (loading) {
    return (
      <div className="flex-1 min-h-screen flex items-center justify-center bg-[#f8f7f6]">
        <Loader2 className="animate-spin text-[#d0a539]" size={40} />
      </div>
    );
  }

  if (!data) return (
    <div className="p-10 text-center text-gray-500">Unable to load dashboard data.</div>
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
        <NotificationComponent />
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-10">
        <StatsCard 
          icon={Wallet} 
          label="Total Invested" 
          value={formatCurrency(data.total_invested)} 
        />
        <StatsCard 
          icon={BarChart3} 
          label="Portfolio Value" 
          value={formatCurrency(data.portfolio_value)} 
        />
        <StatsCard 
          icon={TrendingUp} 
          label="Expected ROI" 
          value={`${Number(data.projected_roi_percentage).toFixed(1)}%`}
          subValue="p.a."
        />
        <StatsCard 
          icon={Calendar} 
          label={data.next_payment ? "Next Payment Due" : "Payment Status"}
          value={data.next_payment ? formatCurrency(data.next_payment.amount) : "All Clear"}
          subValue={data.next_payment ? `${data.next_payment.days_left} Days Left` : "No Due Payments"}
          isDark={true}
        />
      </section>

      {/* Graphs & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        
        {/* Placeholder Chart */}
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
              <button className="px-3 py-1 text-[10px] font-bold border border-[#171512]/10 rounded-full hover:bg-[#d0a539]/10 transition-colors">1M</button>
              <button className="px-3 py-1 text-[10px] font-bold border border-[#d0a539] bg-[#d0a539]/10 rounded-full text-[#d0a539]">6M</button>
            </div>
          </div>
          <div className="relative h-48 lg:h-64 w-full bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
            <p className="text-[10px] lg:text-xs text-gray-400 font-bold uppercase tracking-widest">[Chart Placeholder]</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl border border-[#171512]/5 p-5 lg:p-8 flex flex-col h-full max-h-[500px] lg:max-h-auto">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h3 className="text-sm lg:text-lg font-black uppercase tracking-tight">Recent Activity</h3>
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
              <TransactionRow key={tx.id} tx={tx} />
            ))}
          </div>

          <div className="pt-4 mt-auto border-t border-[#171512]/5 text-center">
            <Link href="/dashboard/payments" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d0a539] hover:text-[#b0892f] transition-colors">
              View All Records
            </Link>
          </div>
        </div>
      </div>

      {/* Portfolio Status */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-base lg:text-xl font-black uppercase tracking-tight">Portfolio Status</h3>
            <p className="text-[#171512]/50 text-xs lg:text-sm">Your active real estate assets</p>
          </div>
          <Link href="/dashboard/portfolio" className="text-[10px] lg:text-xs font-black text-[#d0a539] flex items-center gap-2 hover:gap-3 transition-all">
            VIEW ALL <span className="hidden sm:inline">PORTFOLIO</span> <ArrowRight size={14} strokeWidth={3} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {data.portfolio_items.map((item) => (
            <PortfolioCard 
              key={item.id} 
              item={item} 
              onViewDetail={setSelectedInvestmentId} // Pass state setter
            />
          ))}
        </div>
      </section>
    </main>
  );
};