"use client";

import React, { useEffect, useState, useCallback, useMemo, memo } from "react";
import Image from "next/image"; // Optimization: Use Next Image
import { Headphones, CreditCard } from "lucide-react";
import { investmentClient, Investment } from "../../api/portfolioApi";
import { usePaystackPayment } from "react-paystack";
import { useAuth } from "@/context/AuthContext";

// ==========================================
// 1. STATIC HELPERS (Moved outside to prevent recreation)
// ==========================================
const formatCurrency = (amount: string | number) => {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(num);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-green-600";
    case "earning": return "bg-[#d0a539]";
    default: return "bg-[#171512]";
  }
};

// ==========================================
// 2. MEMOIZED SUB-COMPONENTS
// ==========================================

// --- Payment Button ---
interface PaymentButtonProps {
  amount: number;
  email: string;
  investmentId: number;
  onSuccess: (reference: any, id: number) => void;
  onClose: () => void;
  disabled: boolean;
}

const PaymentButton = memo(({ amount, email, investmentId, onSuccess, onClose, disabled }: PaymentButtonProps) => {
  
  // Optimization: Memoize config to prevent hook thrashing
  const config = useMemo(() => ({
    reference: "BKG_" + new Date().getTime().toString(),
    email: email,
    amount: amount * 100, // Paystack expects Kobo
    publicKey: "pk_live_c1fb7ac4aad4294f6325d0831b232ff029394d6d", // Replace with env variable in prod
    metadata: {
      investment_id: investmentId,
      custom_fields: [
        {
          display_name: "Investment ID",
          variable_name: "investment_id",
          value: investmentId.toString(),
        },
      ],
    },
  }), [amount, email, investmentId]);

  const initializePayment = usePaystackPayment(config);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        initializePayment({ 
          onSuccess: (ref: any) => onSuccess(ref, investmentId), 
          onClose 
        });
      }}
      disabled={disabled}
      className="w-full bg-[#d0a539] disabled:bg-gray-300 disabled:text-gray-500 text-[#171512] font-black uppercase tracking-widest py-3 rounded-lg text-[10px] hover:bg-[#d0a539]/90 transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
    >
      {disabled ? (
        "Completed"
      ) : (
        <>
          <CreditCard className="w-3 h-3" />
          Make Payment
        </>
      )}
    </button>
  );
});
PaymentButton.displayName = "PaymentButton";

// --- Investment Card ---
interface InvestmentCardProps {
  inv: Investment;
  emailToUse: string;
  onNavigate: (id: number) => void;
  onPaymentSuccess: (ref: any, id: number) => void;
}

const InvestmentCard = memo(({ inv, emailToUse, onNavigate, onPaymentSuccess }: InvestmentCardProps) => {
  
  const handleNavigate = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate(inv.id);
  }, [inv.id, onNavigate]);

  const handleDocsClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // Add logic for docs later
    console.log("Docs clicked for", inv.id);
  }, [inv.id]);

  return (
    <div
      onClick={handleNavigate}
      className="cursor-pointer bg-white rounded-2xl p-4 sm:p-6 flex flex-col xl:flex-row items-stretch gap-6 xl:gap-8 shadow-sm hover:shadow-xl transition-all border border-[#171512]/5 group"
    >
      {/* Image Section (Optimized with Next/Image) */}
      <div className="relative w-full xl:w-72 h-40 sm:h-52 rounded-xl overflow-hidden shrink-0 bg-gray-100">
        <Image
          src={inv.project_image || "/placeholder.jpg"}
          alt={inv.project_name}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span className={`text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg ${getStatusColor(inv.status)}`}>
            {inv.status}
          </span>
        </div>
      </div>

      {/* Details Section */}
      <div className="flex-1 flex flex-col justify-between h-full w-full">
        <div className="mb-4">
          {inv.category_tag && (
            <p className="text-[#d0a539] text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-1">
              {inv.category_tag}
            </p>
          )}
          <h3 className="text-xl sm:text-2xl font-serif font-black text-[#171512] leading-tight group-hover:text-[#d0a539] transition-colors">
            {inv.project_name}
          </h3>
          {inv.location && (
            <p className="text-xs sm:text-sm text-[#171512]/40 mt-1 font-medium">
              {inv.location}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-6">
          <div>
            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#171512]/40 mb-1">
              Total Invested
            </p>
            <p className="text-lg sm:text-xl font-black text-[#171512]">
              {formatCurrency(inv.agreed_amount)}
            </p>
          </div>
          <div>
            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#171512]/40 mb-1">
              Balance Remaining
            </p>
            <p className="text-lg sm:text-xl font-black text-[#171512]/30">
              {formatCurrency(inv.balance)}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#171512]/40">
              Completion
            </span>
            <span className="text-sm font-black text-[#d0a539]">
              {inv.percentage_completion}%
            </span>
          </div>
          <div className="w-full h-2 sm:h-3 bg-[#171512]/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#d0a539] rounded-full transition-all"
              style={{ width: `${inv.percentage_completion}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Action Sidebar */}
      <div className="w-full xl:w-64 border-t xl:border-t-0 xl:border-l border-[#171512]/5 pt-6 xl:pt-0 xl:pl-8 flex flex-col justify-between gap-6">
        <div className="grid grid-cols-1 gap-4">
          {inv.next_payment_data ? (
            <div className="bg-[#d0a539]/10 p-3 sm:p-4 rounded-xl border border-[#d0a539]/20 relative overflow-hidden">
               {/* Subtle background pattern could go here */}
              <div className="flex justify-between items-start relative z-10">
                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#d0a539]/80 mb-1">
                  Next Due
                </p>
                <p className="text-[9px] font-bold text-[#171512]/40">
                  {formatDate(inv.next_payment_data.due_date)}
                </p>
              </div>

              <p className="text-base sm:text-lg font-black text-[#171512] relative z-10">
                {formatCurrency(inv.next_payment_data.amount)}
              </p>

              <div className="relative z-10 mt-1">
                 <p className="text-xs sm:text-sm font-bold text-[#d0a539]">
                    {inv.next_payment_data.title}
                 </p>
                 <span className="block text-[10px] text-[#171512]/50 font-normal">
                    {inv.next_payment_data.days_left > 0
                        ? `${inv.next_payment_data.days_left} Days remaining`
                        : "Due Now"}
                 </span>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 p-3 sm:p-4 rounded-xl border border-green-200 text-center">
              <p className="text-xs font-black uppercase text-green-700 tracking-widest">
                Fully Paid
              </p>
            </div>
          )}

          {inv.roi && (
            <div className="flex flex-row justify-between items-center px-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#171512]/40">
                ROI
              </p>
              <p className="text-base sm:text-lg font-black text-[#171512]">
                {inv.roi}% <span className="text-xs text-[#171512]/30">p.a.</span>
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <PaymentButton
            amount={inv.next_payment_data ? inv.next_payment_data.amount : 0}
            email={emailToUse}
            investmentId={inv.id}
            disabled={inv.balance <= 0}
            onSuccess={onPaymentSuccess}
            onClose={() => console.log("Payment closed")}
          />

          <div className="flex gap-2">
            <button
              onClick={handleNavigate}
              className="flex-1 bg-[#171512]/5 text-[#171512] text-[10px] font-black uppercase tracking-widest py-3 rounded-lg hover:bg-[#171512]/10 transition-colors"
            >
              Details
            </button>
            {/* <button
              onClick={handleDocsClick}
              className="flex-1 bg-[#171512]/5 text-[#171512] text-[10px] font-black uppercase tracking-widest py-3 rounded-lg hover:bg-[#171512]/10 transition-colors"
            >
              Docs
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
});
InvestmentCard.displayName = "InvestmentCard";

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
interface MainProps {
  onNavigateToDetail: (id: number) => void;
  userEmail?: string;
}

const Main = ({ onNavigateToDetail, userEmail }: MainProps) => {
  const { user } = useAuth();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  // Fallback email
  const emailToUse = user?.email || userEmail || "customer@example.com";

  const fetchInvestments = useCallback(async (category?: string) => {
    setLoading(true);
    try {
      const apiCategory = category === "all" ? undefined : category;
      const data = await investmentClient.getInvestments(apiCategory);
      setInvestments(data);
    } catch (error) {
      console.error("Error fetching investments:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvestments(activeFilter);
  }, [activeFilter, fetchInvestments]);

  const handlePaymentSuccess = useCallback((reference: any, id: number) => {
    console.log("Payment successful for", id, reference);
    // Refresh list to update balance
    fetchInvestments(activeFilter);
    alert("Payment Successful! Your dashboard has been updated");
  }, [activeFilter, fetchInvestments]);

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-10 bg-[#f8f7f6] min-h-screen text-[#171512] pt-24 lg:pt-10">
      <header className="flex justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-lg lg:text-3xl font-black text-[#171512] tracking-tight uppercase">
            My Investment Portfolio
          </h2>
          <p className="text-[#171512]/50 text-xs lg:text-sm font-medium">
            Tracking your real estate and agriculture assets
          </p>
        </div>
        {/* <NotificationComponent /> */}
      </header>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex flex-wrap gap-3">
          {["all", "real-estate", "agriculture"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest transition-colors border ${
                activeFilter === filter
                  ? "bg-[#171512] text-white border-[#171512]"
                  : "bg-white text-[#171512]/60 border-[#171512]/10 hover:border-[#d0a539]"
              }`}
            >
              {filter.replace("-", " ")} {filter === "all" ? "Assets" : ""}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-left md:text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#171512]/40">
              Active Investments
            </p>
            <p className="text-lg font-black text-[#171512]">
              {loading ? "..." : `${investments.length} Active Projects`}
            </p>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="space-y-6">
        {loading ? (
          // Skeleton Loader
          <>
             <div className="bg-white h-64 rounded-2xl animate-pulse border border-[#171512]/5" />
             <div className="bg-white h-64 rounded-2xl animate-pulse border border-[#171512]/5" />
          </>
        ) : investments.length === 0 ? (
          <div className="text-center py-20 text-[#171512]/40">
            <p className="font-bold">No investments found</p>
            <p className="text-sm mt-1">Try selecting a different category.</p>
          </div>
        ) : (
          investments.map((inv) => (
            <InvestmentCard 
                key={inv.id} 
                inv={inv} 
                emailToUse={emailToUse}
                onNavigate={onNavigateToDetail}
                onPaymentSuccess={handlePaymentSuccess}
            />
          ))
        )}
      </div>

      {/* Support Section */}
      <div className="mt-12 p-6 sm:p-8 border border-[#171512]/5 bg-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <Headphones className="w-10 h-10 text-[#d0a539] bg-[#d0a539]/10 p-2 rounded-xl" />
          <div>
            <h4 className="font-black text-base sm:text-lg uppercase tracking-tight">
              Need assistance?
            </h4>
            <p className="text-xs sm:text-sm text-[#171512]/50">
              Our dedicated investment advisors are available 24/7.
            </p>
          </div>
        </div>
        <button className="w-full sm:w-auto px-8 py-3 border-2 border-[#171512] text-[#171512] font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#171512] hover:text-white transition-all">
          Contact Advisor
        </button>
      </div>
    </main>
  );
};

export default Main;