// import React, { useEffect, useState } from "react";
// import {
//   FileText,
//   MapPin,
//   CalendarClock,
//   CheckCircle2,
//   Clock,
//   CalendarDays,
//   Shield,
//   Headphones,
//   ArrowLeft,
//   AlertCircle,
// } from "lucide-react";
// import NotificationComponent from "../../components/NotificationComponent";
// import { investmentClient, Investment } from "../../api/portfolioApi";
// import { IMAGE_URL } from "@/utils/axios";

// interface DetailProps {
//   id: number;
//   onBack: () => void;
// }

// const InvestmentDetail = ({ id, onBack }: DetailProps) => {
//   const [investment, setInvestment] = useState<Investment | null>(null);
//   const [loading, setLoading] = useState(true);

//   // --- 1. Fetch Data ---
//   useEffect(() => {
//     const fetchDetail = async () => {
//       try {
//         setLoading(true);
//         const data = await investmentClient.getInvestmentDetail(id);
//         setInvestment(data);
//       } catch (error) {
//         console.error("Failed to load investment details", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchDetail();
//   }, [id]);

//   // --- 2. Helper Functions ---
//   const formatCurrency = (amount: string | number) => {
//     const num = typeof amount === "string" ? parseFloat(amount) : amount;
//     return new Intl.NumberFormat("en-NG", {
//       style: "currency",
//       currency: "NGN",
//     }).format(num);
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   if (loading) {
//     return (
//       <main className="flex-1 p-10 bg-[#f8f7f6] min-h-screen pt-24 flex items-center justify-center">
//         <div className="animate-pulse text-[#171512]/40 font-black tracking-widest uppercase">
//           Loading Details...
//         </div>
//       </main>
//     );
//   }

//   if (!investment) return null;

//   // Check if type is Agriculture
//   const isAgric = investment.investment_type === "agriculture";

//   const nextPayment = investment.next_payment_data;

//   return (
//     <main className="flex-1 p-4 md:p-6 lg:p-10 bg-[#f8f7f6] min-h-screen text-[#171512] pt-24">
//       {/* Header */}
//       <header className="flex justify-between items-start md:items-center mb-10 gap-4">
//         <div className="flex items-start md:items-center gap-4">
//           <button
//             onClick={onBack}
//             className="p-2 bg-white border border-[#171512]/10 rounded-full hover:bg-[#d0a539] hover:text-white transition-colors group shrink-0 mt-1 md:mt-0"
//           >
//             <ArrowLeft className="w-5 h-5 text-[#171512] group-hover:text-white" />
//           </button>

//           <div>
//             <h2 className="text-lg lg:text-3xl font-black text-[#171512] tracking-tight uppercase">
//               Investment Details
//             </h2>
//             <p className="text-[#171512]/50 text-xs lg:text-sm font-medium">
//               Overview & Schedule
//             </p>
//           </div>
//         </div>

//         <NotificationComponent />
//       </header>

//       <div className="space-y-6 md:space-y-8">
//         {/* Main Card */}
//         <div className="bg-white rounded-2xl md:rounded-[2rem] border border-[#171512]/5 shadow-md overflow-hidden ring-1 ring-[#d0a539]/20">
//           {/* Top Section: Overview */}
//           <div className="p-5 md:p-8 border-b border-[#171512]/5 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start bg-white">
//             {/* Image */}
//             <div className="w-full lg:w-72 h-48 sm:h-64 lg:h-48 rounded-2xl overflow-hidden shrink-0 relative bg-gray-100">
//               <div className="absolute top-3 left-3 lg:hidden">
//                 <span className="bg-green-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-md">
//                   {investment.status}
//                 </span>
//               </div>
//               <img
//                 alt={investment.project_name}
//                 className="w-full h-full object-cover"
//                 src={`${IMAGE_URL}${investment.project_image}`}
//               />
//             </div>

//             {/* Content */}
//             <div className="flex-1 w-full">
//               <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
//                 <div>
//                   <span className="hidden lg:inline-block bg-green-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-3">
//                     {investment.status}
//                   </span>
//                   <h3 className="text-xl xl:text-2xl font-black text-[#171512] tracking-tighter uppercase leading-tight">
//                     {investment.project_name}
//                   </h3>
//                   <p className="flex items-center gap-2 text-[#171512]/40 text-xs sm:text-sm font-bold uppercase tracking-widest mt-2">
//                     <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />{" "}
//                     {investment.location}
//                   </p>
//                 </div>
//                 <div className="text-left sm:text-right w-full sm:w-auto bg-[#f8f7f6] sm:bg-transparent p-3 sm:p-0 rounded-xl">
//                   <p className="text-[10px] text-[#171512]/40 font-black uppercase tracking-widest mb-1">
//                     Total Value
//                   </p>
//                   <p className="text-xl xl:text-3xl font-black text-[#171512]">
//                     {formatCurrency(investment.agreed_amount)}
//                   </p>
//                 </div>
//               </div>

//               {/* Stats Grid */}
//               <div
//                 className={`grid gap-4 sm:gap-6 ${
//                   isAgric
//                     ? "grid-cols-2 md:grid-cols-4"
//                     : "grid-cols-2 md:grid-cols-3"
//                 }`}
//               >
//                 {/* CHANGE MADE HERE: 
//                   Added `col-span-2 md:col-span-1` to make Balance full width on mobile 
//                 */}
//                 <div className="p-3 sm:p-0 bg-[#f8f7f6] sm:bg-transparent rounded-xl col-span-2 md:col-span-1">
//                   <p className="text-[9px] sm:text-[10px] text-[#171512]/40 font-black uppercase tracking-widest">
//                     Balance
//                   </p>
//                   <p className="text-base sm:text-lg font-black text-[#d0a539]">
//                     {formatCurrency(investment.balance)}
//                   </p>
//                 </div>

//                 {/* SHOW ROI ONLY IF AGRICULTURE */}
//                 {isAgric && (
//                   <div className="p-3 sm:p-0 bg-[#f8f7f6] sm:bg-transparent rounded-xl">
//                     <p className="text-[9px] sm:text-[10px] text-[#171512]/40 font-black uppercase tracking-widest">
//                       Expected ROI
//                     </p>
//                     <p className="text-base sm:text-lg font-black text-[#171512]">
//                       {investment.roi}%{" "}
//                       <span className="text-[10px] text-[#171512]/30">
//                         p.a.
//                       </span>
//                     </p>
//                   </div>
//                 )}

//                 <div className="p-3 sm:p-0 bg-[#f8f7f6] sm:bg-transparent rounded-xl">
//                   <p className="text-[9px] sm:text-[10px] text-[#171512]/40 font-black uppercase tracking-widest">
//                     Progress
//                   </p>
//                   <p className="text-base sm:text-lg font-black text-[#171512]">
//                     {investment.percentage_completion}%
//                   </p>
//                 </div>

//                 <div className="p-3 sm:p-0 bg-[#f8f7f6] sm:bg-transparent rounded-xl">
//                   <p className="text-[9px] sm:text-[10px] text-[#171512]/40 font-black uppercase tracking-widest">
//                     Next Due
//                   </p>
//                   <p className="text-base sm:text-lg font-black text-[#171512]">
//                     {nextPayment
//                       ? formatDate(nextPayment.due_date)
//                       : "Completed"}
//                   </p>
//                   {nextPayment && (
//                     <p className="text-[10px] font-bold text-[#d0a539]">
//                       {nextPayment.days_left} Days Left
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Bottom Section: Schedule & Vault (Unchanged) */}
//           <div className="p-5 md:p-8 bg-[#f8f7f6]/30">
//             <div className="lg:col-span-2 space-y-8">
//               <div>
//                 <div className="flex items-center gap-3 mb-4 sm:mb-6">
//                   <div className="bg-[#d0a539]/10 p-2 rounded-lg text-[#d0a539]">
//                     <CalendarClock className="w-5 h-5" />
//                   </div>
//                   <h4 className="text-base sm:text-lg font-black uppercase tracking-tight">
//                     Payment Schedule
//                   </h4>
//                 </div>

//                 <div className="bg-white rounded-2xl border border-[#171512]/5 shadow-sm overflow-hidden">
//                   <div className="overflow-x-auto">
//                     <table className="w-full text-left min-w-[600px]">
//                       <thead>
//                         <tr className="bg-[#171512] text-white text-[10px] font-black uppercase tracking-[0.2em]">
//                           <th className="px-6 py-4">Title</th>
//                           <th className="px-6 py-4">Due Date</th>
//                           <th className="px-6 py-4">Amount</th>
//                           <th className="px-6 py-4">Status</th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-[#171512]/5">
//                         {investment.schedules?.map((schedule) => (
//                           <tr
//                             key={schedule.id}
//                             className="hover:bg-[#d0a539]/5 transition-colors"
//                           >
//                             <td className="px-6 py-4 text-xs sm:text-sm font-bold">
//                               {schedule.title}
//                             </td>
//                             <td className="px-6 py-4 text-xs sm:text-sm text-[#171512]/60">
//                               {schedule.formatted_date}
//                             </td>
//                             <td className="px-6 py-4 text-xs sm:text-sm font-black">
//                               {formatCurrency(schedule.amount)}
//                             </td>
//                             <td className="px-6 py-4">
//                               {schedule.status === "paid" && (
//                                 <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest flex items-center w-fit gap-1">
//                                   <CheckCircle2 className="w-3 h-3" /> Paid
//                                 </span>
//                               )}
//                               {schedule.status === "pending" && (
//                                 <span className="px-3 py-1 rounded-full bg-[#d0a539]/20 text-[#d0a539] text-[10px] font-black uppercase tracking-widest flex items-center w-fit gap-1">
//                                   <Clock className="w-3 h-3" /> Due Soon
//                                 </span>
//                               )}
//                               {schedule.status === "upcoming" && (
//                                 <span className="px-3 py-1 rounded-full bg-[#171512]/5 text-[#171512]/30 text-[10px] font-black uppercase tracking-widest flex items-center w-fit gap-1">
//                                   <CalendarDays className="w-3 h-3" /> Upcoming
//                                 </span>
//                               )}
//                               {schedule.status === "overdue" && (
//                                 <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest flex items-center w-fit gap-1">
//                                   <AlertCircle className="w-3 h-3" /> Overdue
//                                 </span>
//                               )}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>

//               <div className="h-px bg-[#d0a539]/20 w-full"></div>

//               <div className="mt-8 pt-8 border-t border-[#171512]/5">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//                   <div className="lg:col-span-2">
//                     <div className="flex items-center gap-3 mb-6">
//                       <div className="bg-[#d0a539]/10 p-2 rounded-lg text-[#d0a539]">
//                         <Shield className="w-5 h-5" />
//                       </div>
//                       <h4 className="text-base sm:text-lg font-black uppercase tracking-tight">
//                         Digital Vault
//                       </h4>
//                     </div>

//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                       {[
//                         "Allocation Letter",
//                         "Contract of Sale",
//                         "Certificate",
//                       ].map((doc, idx) => (
//                         <button
//                           key={idx}
//                           className="flex flex-col items-center p-6 bg-white border border-[#171512]/5 rounded-2xl hover:border-[#d0a539]/50 transition-all group hover:shadow-lg"
//                         >
//                           <FileText className="w-8 h-8 text-[#d0a539] mb-3 group-hover:scale-110 transition-transform" />
//                           <span className="text-[10px] font-black uppercase tracking-widest text-[#171512] text-center">
//                             {doc}
//                           </span>
//                           <span className="text-[9px] text-[#171512]/40 mt-1 uppercase">
//                             Unavailable
//                           </span>
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="bg-[#171512] text-white p-6 sm:p-8 rounded-2xl shadow-xl h-full flex flex-col justify-center relative overflow-hidden group">
//                     <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
//                       <Headphones className="w-24 h-24" />
//                     </div>
//                     <div className="relative z-10">
//                       <div className="flex items-center gap-2 mb-4">
//                         <Headphones className="w-5 h-5 text-[#d0a539]" />
//                         <h4 className="text-sm font-black uppercase tracking-widest text-[#d0a539]">
//                           Need Support?
//                         </h4>
//                       </div>
//                       <p className="text-white/60 text-xs mb-6 leading-relaxed font-medium">
//                         Have questions about your payments? Your dedicated
//                         portfolio manager is available.
//                       </p>
//                       <button className="w-full py-3.5 bg-white/10 hover:bg-[#d0a539] hover:text-[#171512] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
//                         Contact Manager
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default InvestmentDetail;







"use client";

import React, { useEffect, useState, memo } from "react";
import Image from "next/image"; // Optimization
import {
  FileText,
  MapPin,
  CalendarClock,
  CheckCircle2,
  Clock,
  CalendarDays,
  Shield,
  Headphones,
  ArrowLeft,
  AlertCircle,
  LucideIcon
} from "lucide-react";
import NotificationComponent from "../../components/NotificationComponent";
import { investmentClient, Investment } from "../../api/portfolioApi";
import { IMAGE_URL } from "@/utils/axios";

// ==========================================
// 1. HELPERS (Static)
// ==========================================
const formatCurrency = (amount: string | number) => {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(num);
};

const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// ==========================================
// 2. SUB-COMPONENTS (Memoized)
// ==========================================

// --- Stat Card ---
const StatCard = memo(({ label, value, subText, highlightColor, isFullWidth }: { 
  label: string, 
  value: string | number, 
  subText?: React.ReactNode, 
  highlightColor?: string,
  isFullWidth?: boolean 
}) => (
  <div className={`p-3 sm:p-0 bg-[#f8f7f6] sm:bg-transparent rounded-xl ${isFullWidth ? "col-span-2 md:col-span-1" : ""}`}>
    <p className="text-[9px] sm:text-[10px] text-[#171512]/40 font-black uppercase tracking-widest">
      {label}
    </p>
    <p className={`text-base sm:text-lg font-black ${highlightColor || "text-[#171512]"}`}>
      {value} {subText}
    </p>
  </div>
));
StatCard.displayName = "StatCard";

// --- Schedule Table Row ---
const ScheduleRow = memo(({ schedule }: { schedule: any }) => (
  <tr className="hover:bg-[#d0a539]/5 transition-colors">
    <td className="px-6 py-4 text-xs sm:text-sm font-bold">{schedule.title}</td>
    <td className="px-6 py-4 text-xs sm:text-sm text-[#171512]/60">{schedule.formatted_date}</td>
    <td className="px-6 py-4 text-xs sm:text-sm font-black">{formatCurrency(schedule.amount)}</td>
    <td className="px-6 py-4">
      {schedule.status === "paid" && (
        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest flex items-center w-fit gap-1">
          <CheckCircle2 className="w-3 h-3" /> Paid
        </span>
      )}
      {schedule.status === "pending" && (
        <span className="px-3 py-1 rounded-full bg-[#d0a539]/20 text-[#d0a539] text-[10px] font-black uppercase tracking-widest flex items-center w-fit gap-1">
          <Clock className="w-3 h-3" /> Due Soon
        </span>
      )}
      {schedule.status === "upcoming" && (
        <span className="px-3 py-1 rounded-full bg-[#171512]/5 text-[#171512]/30 text-[10px] font-black uppercase tracking-widest flex items-center w-fit gap-1">
          <CalendarDays className="w-3 h-3" /> Upcoming
        </span>
      )}
      {schedule.status === "overdue" && (
        <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest flex items-center w-fit gap-1">
          <AlertCircle className="w-3 h-3" /> Overdue
        </span>
      )}
    </td>
  </tr>
));
ScheduleRow.displayName = "ScheduleRow";

// --- Digital Vault Button ---
const VaultButton = memo(({ label }: { label: string }) => (
  <button className="flex flex-col items-center p-6 bg-white border border-[#171512]/5 rounded-2xl hover:border-[#d0a539]/50 transition-all group hover:shadow-lg">
    <FileText className="w-8 h-8 text-[#d0a539] mb-3 group-hover:scale-110 transition-transform" />
    <span className="text-[10px] font-black uppercase tracking-widest text-[#171512] text-center">
      {label}
    </span>
    <span className="text-[9px] text-[#171512]/40 mt-1 uppercase">Unavailable</span>
  </button>
));
VaultButton.displayName = "VaultButton";

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
interface DetailProps {
  id: number;
  onBack: () => void;
}

const InvestmentDetail = ({ id, onBack }: DetailProps) => {
  const [investment, setInvestment] = useState<Investment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await investmentClient.getInvestmentDetail(id);
        setInvestment(data);
      } catch (error) {
        console.error("Failed to load investment details", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <main className="flex-1 p-10 bg-[#f8f7f6] min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-pulse text-[#171512]/40 font-black tracking-widest uppercase">
          Loading Details...
        </div>
      </main>
    );
  }

  if (!investment) return null;

  const isAgric = investment.investment_type === "agriculture";
  const nextPayment = investment.next_payment_data;

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-10 bg-[#f8f7f6] min-h-screen text-[#171512] pt-24">
      {/* Header */}
      <header className="flex justify-between items-start md:items-center mb-10 gap-4">
        <div className="flex items-start md:items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 bg-white border border-[#171512]/10 rounded-full hover:bg-[#d0a539] hover:text-white transition-colors group shrink-0 mt-1 md:mt-0"
          >
            <ArrowLeft className="w-5 h-5 text-[#171512] group-hover:text-white" />
          </button>
          <div>
            <h2 className="text-lg lg:text-3xl font-black text-[#171512] tracking-tight uppercase">
              Investment Details
            </h2>
            <p className="text-[#171512]/50 text-xs lg:text-sm font-medium">
              Overview & Schedule
            </p>
          </div>
        </div>
        <NotificationComponent />
      </header>

      <div className="space-y-6 md:space-y-8">
        {/* Main Card */}
        <div className="bg-white rounded-2xl md:rounded-[2rem] border border-[#171512]/5 shadow-md overflow-hidden ring-1 ring-[#d0a539]/20">
          
          {/* Top Section: Overview */}
          <div className="p-5 md:p-8 border-b border-[#171512]/5 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start bg-white">
            
            {/* Image (Optimized) */}
            <div className="w-full lg:w-72 h-48 sm:h-64 lg:h-48 rounded-2xl overflow-hidden shrink-0 relative bg-gray-100">
              <div className="absolute top-3 left-3 lg:hidden z-10">
                <span className="bg-green-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-md">
                  {investment.status}
                </span>
              </div>
              <Image
                src={`${IMAGE_URL}${investment.project_image}`}
                alt={investment.project_name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 300px"
                priority
              />
            </div>

            {/* Content */}
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                <div>
                  <span className="hidden lg:inline-block bg-green-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-3">
                    {investment.status}
                  </span>
                  <h3 className="text-xl xl:text-2xl font-black text-[#171512] tracking-tighter uppercase leading-tight">
                    {investment.project_name}
                  </h3>
                  <p className="flex items-center gap-2 text-[#171512]/40 text-xs sm:text-sm font-bold uppercase tracking-widest mt-2">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" /> {investment.location}
                  </p>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto bg-[#f8f7f6] sm:bg-transparent p-3 sm:p-0 rounded-xl">
                  <p className="text-[10px] text-[#171512]/40 font-black uppercase tracking-widest mb-1">Total Value</p>
                  <p className="text-xl xl:text-3xl font-black text-[#171512]">{formatCurrency(investment.agreed_amount)}</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className={`grid gap-4 sm:gap-6 ${isAgric ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3"}`}>
                <StatCard 
                  label="Balance" 
                  value={formatCurrency(investment.balance)} 
                  highlightColor="text-[#d0a539]" 
                  isFullWidth={true}
                />
                
                {isAgric && (
                  <StatCard 
                    label="Expected ROI" 
                    value={`${investment.roi}%`} 
                    subText={<span className="text-[10px] text-[#171512]/30">p.a.</span>}
                  />
                )}

                <StatCard 
                  label="Progress" 
                  value={`${investment.percentage_completion}%`} 
                />

                <div className="p-3 sm:p-0 bg-[#f8f7f6] sm:bg-transparent rounded-xl">
                  <p className="text-[9px] sm:text-[10px] text-[#171512]/40 font-black uppercase tracking-widest">Next Due</p>
                  <p className="text-base sm:text-lg font-black text-[#171512]">
                    {nextPayment ? formatDate(nextPayment.due_date) : "Completed"}
                  </p>
                  {nextPayment && (
                    <p className="text-[10px] font-bold text-[#d0a539]">{nextPayment.days_left} Days Left</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="p-5 md:p-8 bg-[#f8f7f6]/30">
            <div className="lg:col-span-2 space-y-8">
              
              {/* Payment Schedule */}
              <div>
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="bg-[#d0a539]/10 p-2 rounded-lg text-[#d0a539]">
                    <CalendarClock className="w-5 h-5" />
                  </div>
                  <h4 className="text-base sm:text-lg font-black uppercase tracking-tight">Payment Schedule</h4>
                </div>

                <div className="bg-white rounded-2xl border border-[#171512]/5 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                      <thead>
                        <tr className="bg-[#171512] text-white text-[10px] font-black uppercase tracking-[0.2em]">
                          <th className="px-6 py-4">Title</th>
                          <th className="px-6 py-4">Due Date</th>
                          <th className="px-6 py-4">Amount</th>
                          <th className="px-6 py-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#171512]/5">
                        {investment.schedules?.map((schedule) => (
                          <ScheduleRow key={schedule.id} schedule={schedule} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Digital Vault */}
              <div className="mt-8 pt-8 border-t border-[#171512]/5">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-[#d0a539]/10 p-2 rounded-lg text-[#d0a539]">
                        <Shield className="w-5 h-5" />
                      </div>
                      <h4 className="text-base sm:text-lg font-black uppercase tracking-tight">Digital Vault</h4>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {["Allocation Letter", "Contract of Sale", "Certificate"].map((doc) => (
                        <VaultButton key={doc} label={doc} />
                      ))}
                    </div>
                  </div>

                  {/* Support Card */}
                  <div className="bg-[#171512] text-white p-6 sm:p-8 rounded-2xl shadow-xl h-full flex flex-col justify-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                      <Headphones className="w-24 h-24" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4">
                        <Headphones className="w-5 h-5 text-[#d0a539]" />
                        <h4 className="text-sm font-black uppercase tracking-widest text-[#d0a539]">Need Support?</h4>
                      </div>
                      <p className="text-white/60 text-xs mb-6 leading-relaxed font-medium">
                        Have questions about your payments? Your dedicated portfolio manager is available.
                      </p>
                      <button className="w-full py-3.5 bg-white/10 hover:bg-[#d0a539] hover:text-[#171512] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                        Contact Manager
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default InvestmentDetail;