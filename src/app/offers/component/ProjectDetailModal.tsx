"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  ChevronDown,
  Info,
  BarChart3,
  Loader2,
  CheckCircle2,
  MapPin,
  Home,
} from "lucide-react";
import { apiClient, InvestmentProject } from "../api/projectApi";
import { useAuth } from "@/context/AuthContext";

// --- Props Interface ---
interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: InvestmentProject | null;
  initialPlanId?: string | null;
}

// --- Helper: Currency Formatter ---
const formatCurrency = (amount: string | number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(amount));
};

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  isOpen,
  onClose,
  project,
  initialPlanId,
}) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  // Initialize selection logic
  useEffect(() => {
    if (project?.pricing_options?.length) {
      if (initialPlanId) {
        const exists = project.pricing_options.some(
          (p) => String(p.id) === String(initialPlanId),
        );
        setSelectedPlanId(
          exists
            ? String(initialPlanId)
            : String(project.pricing_options[0].id),
        );
      } else {
        setSelectedPlanId(String(project.pricing_options[0].id));
      }
    }
  }, [project, initialPlanId]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const currentPlan = useMemo(() => {
    return project?.pricing_options.find(
      (p) => String(p.id) === selectedPlanId,
    );
  }, [project, selectedPlanId]);

  const handleProceed = async () => {
    if (!project || !currentPlan) return;

    if (!isAuthenticated) {
      const intent = {
        projectId: project.id,
        planId: selectedPlanId,
        timestamp: Date.now(),
      };
      localStorage.setItem("pending_investment", JSON.stringify(intent));
      router.push("/authentication/signin?returnUrl=/investments");
      return;
    }

    try {
      setStatus("loading");
      await apiClient.submitInvestment(Number(selectedPlanId));
      setStatus("success");
      localStorage.removeItem("pending_investment");
      setTimeout(() => {
        setStatus("idle");
        onClose();
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Investment failed", error);
      setStatus("idle");
      alert("Failed to process investment. Please try again.");
    }
  };

  if (!isOpen || !project) return null;

  return (
    <div 
      // CHANGE 1: Added 'pt-20 sm:pt-0' 
      // 'pt-20' adds space at the top on mobile (approx 80px for navbar). 
      // 'sm:pt-0' removes that padding on desktop since we center it there.
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center font-display pt-20 sm:pt-0"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#171512]/85 backdrop-blur-sm transition-opacity"
        onClick={status === "loading" ? undefined : onClose}
      />

      {/* Modal Container */}
      <div 
        // CHANGE 2: Adjusted max-height 
        // Changed 'max-h-[95vh]' to 'max-h-[85vh] sm:max-h-[90vh]'
        // This ensures the modal stops growing before it hits the navbar area.
        className="bg-white w-full sm:w-[95vw] sm:max-w-5xl sm:rounded-2xl rounded-t-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative z-10 animate-in fade-in slide-in-from-bottom sm:zoom-in-95 duration-300 max-h-[85vh] sm:max-h-[90vh]"
      >
        {/* CLOSE BUTTON */}
        {status === "idle" && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 text-[#171512]/40 hover:text-[#171512] transition-colors bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* ... Rest of the modal content remains exactly the same ... */}
        {/* --- LOADING / SUCCESS STATE --- */}
        {status !== "idle" ? (
          <div className="w-full flex flex-col items-center justify-center p-8 sm:p-12 text-center space-y-6 min-h-[400px]">
             {/* ... content ... */}
             {status === "loading" ? (
              <>
                <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-[#d0a539] animate-spin" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-[#171512]">
                    Processing Request
                  </h3>
                  <p className="text-sm sm:text-base text-[#171512]/60 mt-2">
                    Securing your investment position...
                  </p>
                </div>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-green-600 animate-in zoom-in duration-300" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-[#171512]">
                    Investment Initiated!
                  </h3>
                  <p className="text-sm sm:text-base text-[#171512]/60 mt-2">
                    Redirecting you to your portfolio...
                  </p>
                </div>
              </>
            )}
          </div>
        ) : (
          /* --- NORMAL STATE --- */
          <>
            {/* Left Column: Image */}
            <div className="w-full md:w-2/5 h-48 sm:h-56 md:h-auto relative overflow-hidden bg-[#171512] flex-shrink-0">
               {/* ... image content ... */}
               <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{
                  backgroundImage: `url('${
                    project.project_img || "https://via.placeholder.com/400x300"
                  }')`,
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#171512]/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8">
                <span className="inline-block bg-[#d0a539]/90 text-[#171512] text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 sm:px-3 rounded mb-2 shadow-lg">
                  Verified Listing
                </span>
                <p className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-80">
                  Ref: BK-{project.id.toString().padStart(4, "0")}
                </p>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="w-full md:w-3/5 p-6 sm:p-8 lg:p-10 flex flex-col overflow-y-auto overscroll-contain">
               {/* ... details content ... */}
               {/* Header Badge */}
              <div className="inline-flex items-center gap-2 border-b-2 border-[#d0a539] pb-1 self-start mb-6">
                <BarChart3 className="text-[#d0a539] w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#d0a539]">
                  Investment Overview
                </span>
              </div>

              {/* Project Title & Meta */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#171512] leading-tight mb-3 uppercase tracking-tight">
                  {project.name}
                </h2>

                {/* Location and Asset Type Badges */}
                <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 text-[#171512]/60">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d0a539]" />
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                      {project.location}
                    </span>
                  </div>
                  {project.asset_type && (
                    <div className="flex items-center gap-1.5">
                      <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d0a539]" />
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                        {project.asset_type}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2 sm:space-y-3 pt-3 border-t border-[#171512]/10">
                  <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#d0a539]">
                    Brief Analysis
                  </h4>
                  <p className="text-[#171512]/70 leading-relaxed text-xs sm:text-sm lg:text-base max-h-24 sm:max-h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#d0a539]/20 scrollbar-track-transparent">
                    {project.investment_detail ||
                      "Premium investment opportunity."}
                  </p>
                </div>
              </div>

              {/* Form Section */}
              <div className="space-y-5 sm:space-y-6 mt-auto">
                {/* Plan Selector */}
                <div>
                  <label className="block text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#171512]/60 mb-2 sm:mb-3">
                    Select Payment Plan
                  </label>
                  <div className="relative">
                    <select
                      value={selectedPlanId}
                      onChange={(e) => setSelectedPlanId(e.target.value)}
                      className="w-full appearance-none bg-[#f8f7f6] border-2 border-[#d0a539]/20 focus:border-[#d0a539] rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-xs sm:text-sm font-bold tracking-wide outline-none transition-all cursor-pointer text-[#171512]"
                    >
                      {project.pricing_options.length > 0 ? (
                        project.pricing_options.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.plan_name}
                          </option>
                        ))
                      ) : (
                        <option disabled>No plans available</option>
                      )}
                    </select>
                    <ChevronDown className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#d0a539] pointer-events-none w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="bg-[#d0a539]/5 border border-[#d0a539]/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#171512]/40 mb-1">
                        Total Commitment
                      </p>
                      <p className="text-base sm:text-lg lg:text-xl font-black text-[#171512]">
                        {currentPlan
                          ? formatCurrency(currentPlan.total_price)
                          : "---"}
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#171512]/40 mb-1">
                        Min. Deposit
                      </p>
                      <p className="text-base sm:text-lg lg:text-xl font-black text-[#d0a539]">
                        {currentPlan
                          ? formatCurrency(currentPlan.minimum_deposit)
                          : "---"}
                      </p>
                    </div>

                    <div className="col-span-2">
                      <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#171512]/40 mb-1">
                        ROI Start Date
                      </p>
                      <p className="text-xs sm:text-sm font-black uppercase tracking-tighter mt-1 text-[#171512]">
                        {currentPlan ? currentPlan.roi_start_display : "---"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Area */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 sm:pt-6 border-t border-[#171512]/5 gap-3 sm:gap-4 pb-2">
                  {/* Info Text - Hidden on small mobile */}
                  <div className="hidden sm:flex items-center gap-2 text-[#171512]/40">
                    <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest">
                      {isAuthenticated
                        ? "Next step: Invoice Generation"
                        : "Login Required to Invest"}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={handleProceed}
                    className="w-full sm:w-auto bg-[#d0a539] text-[#171512] px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:bg-[#d0a539]/90 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#d0a539]/20 flex items-center justify-center gap-2"
                  >
                    {isAuthenticated
                      ? "Confirm & Proceed"
                      : "Login to Continue"}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailModal;
