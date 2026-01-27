// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import {
//   Search,
//   FileText,
//   File,
//   Download,
//   Building,
//   BarChart,
//   CreditCard,
//   ChevronDown,
//   Filter,
//   Eye,
//   FolderOpen,
//   Shield,
//   Clock,
// } from "lucide-react";

// // --- Reusable Document Row Component ---
// interface DocumentRowProps {
//   title: string;
//   meta: string;
//   icon: React.ElementType;
//   fileSize: string;
//   fileType: string;
//   uploadDate: string;
// }

// const DocumentRow: React.FC<DocumentRowProps> = ({ 
//   title,
//   meta,
//   icon: Icon,
//   fileSize,
//   fileType,
//   uploadDate,
// }) => (
//   <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 bg-white border border-[#171512]/5 rounded-xl transition-all hover:shadow-md hover:border-[#d0a539]/30 hover:-translate-y-0.5">
//     {/* Icon & Info */}
//     <div className="flex items-start gap-3 sm:gap-4 flex-1 w-full">
//       <div className="bg-[#d0a539]/10 text-[#d0a539] p-2.5 sm:p-3 rounded-lg shrink-0 group-hover:bg-[#d0a539] group-hover:text-white transition-all">
//         <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
//       </div>
//       <div className="flex-1 min-w-0">
//         <h4 className="text-[#171512] font-bold text-sm sm:text-base mb-1 line-clamp-1 group-hover:text-[#d0a539] transition-colors">
//           {title}
//         </h4>
//         <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs text-[#171512]/50 font-medium">
//           <span className="flex items-center gap-1">
//             <Clock className="w-3 h-3" />
//             {uploadDate}
//           </span>
//           <span className="hidden sm:inline">•</span>
//           <span className="px-2 py-0.5 bg-[#171512]/5 rounded uppercase font-bold">
//             {fileType}
//           </span>
//           <span className="hidden sm:inline">•</span>
//           <span>{fileSize}</span>
//         </div>
//       </div>
//     </div>

//     {/* Action Buttons */}
//     <div className="flex gap-2 w-full sm:w-auto">
//       <button className="flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold uppercase tracking-wider border border-[#d0a539]/30 text-[#d0a539] hover:bg-[#d0a539]/10 rounded-lg transition-all flex items-center justify-center gap-2">
//         <Eye className="w-3.5 h-3.5" />
//         <span className="hidden sm:inline">Preview</span>
//         <span className="sm:hidden">View</span>
//       </button>
//       <button className="flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold uppercase tracking-wider bg-[#d0a539] text-[#171512] hover:bg-[#d0a539]/90 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm">
//         <Download className="w-3.5 h-3.5" />
//         <span className="hidden sm:inline">Download</span>
//         <span className="sm:hidden">Get</span>
//       </button>
//     </div>
//   </div>
// );

// // --- Stats Card Component ---
// interface StatsCardProps {
//   icon: React.ElementType;
//   label: string;
//   value: string;
// }

// const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, label, value }) => (
//   <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
//     <div className="flex items-center gap-3">
//       <div className="bg-[#d0a539]/20 text-[#d0a539] p-2.5 rounded-lg">
//         <Icon className="w-5 h-5" />
//       </div>
//       <div>
//         <p className="text-white/50 text-xs font-medium uppercase tracking-wide">
//           {label}
//         </p>
//         <p className="text-white text-lg font-black">{value}</p>
//       </div>
//     </div>
//   </div>
// );

// // --- Main Page Component ---
// const Main = () => {
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showMobileFilters, setShowMobileFilters] = useState(false);

//   return (
//     <div className="bg-[#f8f7f6] text-[#171512] font-sans min-h-screen">
//       {/* --- HERO / VAULT HEADER --- */}
//       <section className="relative bg-gradient-to-br from-[#171512] via-[#1f1f1f] to-[#171512] pt-20 lg:pt-8 pb-20 border-b border-[#d0a539]/20">
//         <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
//           {/* Header */}
//           <div className="mb-8">
//             <div className="flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//               <div>
//                 <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight mb-2">
//                   Secure Documents
//                 </h1>
//                 <p className="text-white/60 text-sm sm:text-base max-w-2xl">
//                   Access your investment agreements, property deeds, and
//                   financial reports in one secure location.
//                 </p>
//               </div>
//             </div>

//             {/* Stats Grid */}
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
//               <StatsCard icon={FolderOpen} label="Total Documents" value="12" />
//               <StatsCard icon={FileText} label="Agreements" value="8" />
//               <StatsCard icon={Building} label="Deeds" value="2" />
//               <StatsCard icon={BarChart} label="Reports" value="2" />
//             </div>
//           </div>

//           {/* Search & Filters */}
//           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//             {/* Search Bar */}
//             <div className="relative flex-1">
//               <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 sm:w-5 sm:h-5" />
//               <input
//                 className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-white text-sm focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539]/20 outline-none transition-all placeholder:text-white/30"
//                 placeholder="Search documents..."
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>

//             {/* Filter Dropdown - Desktop */}
//             <div className="hidden sm:block relative min-w-[200px]">
//               <select
//                 className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-white text-sm focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539]/20 outline-none cursor-pointer appearance-none"
//                 value={activeFilter}
//                 onChange={(e) => setActiveFilter(e.target.value)}
//               >
//                 <option className="bg-[#171512]" value="all">
//                   All Documents
//                 </option>
//                 <option className="bg-[#171512]" value="agreements">
//                   Agreements
//                 </option>
//                 <option className="bg-[#171512]" value="deeds">
//                   Property Deeds
//                 </option>
//                 <option className="bg-[#171512]" value="reports">
//                   Financial Reports
//                 </option>
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 pointer-events-none" />
//             </div>

//             {/* Filter Button - Mobile */}
//             <button
//               className="sm:hidden bg-white/5 border border-white/10 text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
//               onClick={() => setShowMobileFilters(!showMobileFilters)}
//             >
//               <Filter className="w-4 h-4" />
//               Filters
//             </button>
//           </div>

//           {/* Mobile Filter Menu */}
//           {showMobileFilters && (
//             <div className="sm:hidden mt-3 bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
//               {["all", "agreements", "deeds", "reports"].map((filter) => (
//                 <button
//                   key={filter}
//                   onClick={() => {
//                     setActiveFilter(filter);
//                     setShowMobileFilters(false);
//                   }}
//                   className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
//                     activeFilter === filter
//                       ? "bg-[#d0a539] text-[#171512]"
//                       : "text-white hover:bg-white/10"
//                   }`}
//                 >
//                   {filter === "all"
//                     ? "All Documents"
//                     : filter.charAt(0).toUpperCase() + filter.slice(1)}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* --- DOCUMENT LIST --- */}
//       <section className="py-8 sm:py-12">
//         <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10 sm:space-y-12">
//           {/* Section 1: Investment Agreements */}
//           <div className="space-y-4 sm:space-y-6">
//             <div className="flex items-center gap-3 sm:gap-4">
//               <div className="h-px flex-1 bg-[#171512]/5"></div>
//               <h3 className="text-[#171512]/40 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] whitespace-nowrap">
//                 Investment Agreements
//               </h3>
//               <div className="h-px flex-1 bg-[#171512]/5"></div>
//             </div>
//             <div className="grid gap-3 sm:gap-4">
//               <DocumentRow
//                 title="Agricultural Yield Agreement - Q3 2024"
//                 meta="Uploaded Oct 12, 2024 • PDF • 2.4 MB"
//                 icon={FileText}
//                 fileSize="2.4 MB"
//                 fileType="PDF"
//                 uploadDate="Oct 12, 2024"
//               />
//               <DocumentRow
//                 title="Tech Infrastructure Equity Grant"
//                 meta="Uploaded Sep 28, 2024 • DOCX • 1.1 MB"
//                 icon={File}
//                 fileSize="1.1 MB"
//                 fileType="DOCX"
//                 uploadDate="Sep 28, 2024"
//               />
//               <DocumentRow
//                 title="Renewable Energy Partnership Agreement"
//                 meta="Uploaded Aug 05, 2024 • PDF • 3.2 MB"
//                 icon={FileText}
//                 fileSize="3.2 MB"
//                 fileType="PDF"
//                 uploadDate="Aug 05, 2024"
//               />
//             </div>
//           </div>

//           {/* Section 2: Property Deeds */}
//           <div className="space-y-4 sm:space-y-6">
//             <div className="flex items-center gap-3 sm:gap-4">
//               <div className="h-px flex-1 bg-[#171512]/5"></div>
//               <h3 className="text-[#171512]/40 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] whitespace-nowrap">
//                 Property Deeds
//               </h3>
//               <div className="h-px flex-1 bg-[#171512]/5"></div>
//             </div>
//             <div className="grid gap-3 sm:gap-4">
//               <DocumentRow
//                 title="Royal Exchange Executive Wing Deed"
//                 meta="Uploaded Aug 15, 2024 • PDF • 14.2 MB"
//                 icon={Building}
//                 fileSize="14.2 MB"
//                 fileType="PDF"
//                 uploadDate="Aug 15, 2024"
//               />
//               <DocumentRow
//                 title="Marina Heights Commercial Plot - Title Deed"
//                 meta="Uploaded Jun 22, 2024 • PDF • 8.7 MB"
//                 icon={Building}
//                 fileSize="8.7 MB"
//                 fileType="PDF"
//                 uploadDate="Jun 22, 2024"
//               />
//             </div>
//           </div>

//           {/* Section 3: Financial Reports */}
//           <div className="space-y-4 sm:space-y-6">
//             <div className="flex items-center gap-3 sm:gap-4">
//               <div className="h-px flex-1 bg-[#171512]/5"></div>
//               <h3 className="text-[#171512]/40 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] whitespace-nowrap">
//                 Financial Reports
//               </h3>
//               <div className="h-px flex-1 bg-[#171512]/5"></div>
//             </div>
//             <div className="grid gap-3 sm:gap-4">
//               <DocumentRow
//                 title="Annual Portfolio Performance 2023"
//                 meta="Uploaded Jan 10, 2024 • PDF • 8.9 MB"
//                 icon={BarChart}
//                 fileSize="8.9 MB"
//                 fileType="PDF"
//                 uploadDate="Jan 10, 2024"
//               />
//               <DocumentRow
//                 title="Q2 Dividend Distribution Statement"
//                 meta="Uploaded Jul 05, 2024 • PDF • 1.2 MB"
//                 icon={CreditCard}
//                 fileSize="1.2 MB"
//                 fileType="PDF"
//                 uploadDate="Jul 05, 2024"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- CALL TO ACTION --- */}
//       <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16">
//         <div className="bg-gradient-to-br from-[#171512] to-[#2a2a2a] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden">
//           {/* Decorative Background */}
//           <div className="absolute top-0 right-0 w-1/2 sm:w-1/3 h-full bg-[#d0a539]/5 -skew-x-12 translate-x-1/2"></div>
//           <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#d0a539]/10 rounded-full blur-3xl"></div>

//           {/* Content */}
//           <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
//             <div className="space-y-3 sm:space-y-4 flex-1">
//               <span className="inline-block text-[#d0a539] text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.5em]">
//                 High Security
//               </span>
//               <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">
//                 Need assistance with your records?
//               </h2>
//               <p className="text-white/60 text-sm sm:text-base max-w-lg leading-relaxed">
//                 Our dedicated concierge team is available 24/7 for
//                 high-net-worth document requests and physical audits.
//               </p>
//             </div>
//             <button className="w-full md:w-auto bg-[#d0a539] text-[#171512] px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:bg-[#d0a539]/90 hover:scale-105 transition-all shadow-xl shadow-[#d0a539]/20">
//               Contact Concierge
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Empty State (if no documents match search/filter) */}
//       {/* <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-16 text-center">
//         <div className="bg-white rounded-2xl p-12 border border-[#171512]/5">
//           <div className="bg-[#d0a539]/10 text-[#d0a539] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FolderOpen className="w-8 h-8" />
//           </div>
//           <h3 className="text-xl font-bold text-[#171512] mb-2">No documents found</h3>
//           <p className="text-[#171512]/60 text-sm">Try adjusting your search or filter criteria.</p>
//         </div>
//       </section> */}
//     </div>
//   );
// };

// export default Main;
















"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  FileText,
  File,
  Download,
  Building,
  BarChart,
  CreditCard,
  ChevronDown,
  Filter,
  Eye,
  FolderOpen,
  Clock,
  Loader2,
  AlertCircle
} from "lucide-react";

// 1. Import your API and Interfaces
// (Assuming the API code you provided is in a file named 'documentsApi.ts' or similar)
import { documentsApi, DocumentItem, DocumentStats } from "../../api/documentsApi";

// --- Updated Document Row Component ---
// Modified to accept the DocumentItem interface directly
interface DocumentRowProps {
  doc: DocumentItem;
}

const DocumentRow: React.FC<DocumentRowProps> = ({ doc }) => {
  // Helper to determine icon based on category or file type
  const getIcon = () => {
    switch (doc.category) {
      case "agreement": return FileText;
      case "deed": return Building;
      case "report": return BarChart;
      default: return File;
    }
  };

  const Icon = getIcon();

  // Helper to format date
  const formattedDate = new Date(doc.upload_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 bg-white border border-[#171512]/5 rounded-xl transition-all hover:shadow-sm hover:border-[#d0a539]/30 hover:-translate-y-0.5">
      {/* Icon & Info */}
      <div className="flex items-start gap-3 sm:gap-4 flex-1 w-full">
        <div className="bg-[#d0a539]/10 text-[#d0a539] p-2.5 sm:p-3 rounded-lg shrink-0 group-hover:bg-[#d0a539] group-hover:text-white transition-all">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-[#171512] font-bold text-sm sm:text-base mb-1 line-clamp-1 group-hover:text-[#d0a539] transition-colors">
            {doc.title}
          </h4>
          <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs text-[#171512]/50 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formattedDate}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="px-2 py-0.5 bg-[#171512]/5 rounded uppercase font-bold">
              {doc.file_type}
            </span>
            <span className="hidden sm:inline">•</span>
            <span>{doc.file_size}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 w-full sm:w-auto">
        {/* View/Preview Button */}
        <a 
          href={doc.file_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold uppercase tracking-wider border border-[#d0a539]/30 text-[#d0a539] hover:bg-[#d0a539]/10 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <Eye className="w-3.5 h-3.5 mb-1" />
          <span className="hidden sm:inline">Preview</span>
          <span className="sm:hidden">View</span>
        </a>

        {/* Download Button */}
        <a
          href={doc.file_url}
          download
          className="flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold uppercase tracking-wider bg-[#d0a539] text-[#171512] hover:bg-[#d0a539]/90 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <Download className="w-3.5 h-3.5 mb-1" />
          <span className="hidden sm:inline">Download</span>
          <span className="sm:hidden">Get</span>
        </a>
      </div>
    </div>
  );
};

// --- Stats Card Component (Unchanged) ---
interface StatsCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, label, value }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
    <div className="flex items-center gap-3">
      <div className="bg-[#d0a539]/20 text-[#d0a539] p-2.5 rounded-lg">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-white/50 text-xs font-medium uppercase tracking-wide">
          {label}
        </p>
        <p className="text-white text-lg font-black">{value}</p>
      </div>
    </div>
  </div>
);

// --- Main Page Component ---
const Main = () => {
  // State
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [stats, setStats] = useState<DocumentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fetch Data on Mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Execute both requests in parallel
        const [docsData, statsData] = await Promise.all([
          documentsApi.getDocuments(),
          documentsApi.getDocumentStats()
        ]);

        setDocuments(docsData);
        setStats(statsData);
      } catch (err) {
        console.error("Error fetching documents:", err);
        setError("Failed to load documents. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter Logic
  // We filter in-memory because the dataset is likely small enough for UI fluidity,
  // and we want to preserve the "Grouped" section layout.
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      // 1. Check Search Query
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 2. Check Category Filter
      // Note: The API uses singular "agreement", UI filter uses plural "agreements"
      // We map UI values to API values here
      let matchesFilter = true;
      if (activeFilter !== "all") {
        if (activeFilter === "agreements") matchesFilter = doc.category === "agreement";
        else if (activeFilter === "deeds") matchesFilter = doc.category === "deed";
        else if (activeFilter === "reports") matchesFilter = doc.category === "report";
        else matchesFilter = false;
      }

      return matchesSearch && matchesFilter;
    });
  }, [documents, searchQuery, activeFilter]);

  // Group filtered documents by section
  const agreements = filteredDocuments.filter((d) => d.category === "agreement");
  const deeds = filteredDocuments.filter((d) => d.category === "deed");
  const reports = filteredDocuments.filter((d) => d.category === "report");
  const others = filteredDocuments.filter((d) => d.category === "other");

  return (
    <div className="bg-[#f8f7f6] text-[#171512] font-sans min-h-screen">
      {/* --- HERO / VAULT HEADER --- */}
      <section className="relative bg-gradient-to-br from-[#171512] via-[#1f1f1f] to-[#171512] pt-20 lg:pt-8 pb-20 border-b border-[#d0a539]/20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight mb-2">
                  Secure Documents
                </h1>
                <p className="text-white/60 text-sm sm:text-base max-w-2xl">
                  Access your investment agreements, property deeds, and
                  financial reports in one secure location.
                </p>
              </div>
            </div>

            {/* Stats Grid - Using API Data */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <StatsCard 
                icon={FolderOpen} 
                label="Total Documents" 
                value={stats ? stats.total : 0} 
              />
              <StatsCard 
                icon={FileText} 
                label="Agreements" 
                value={stats ? stats.agreements : 0} 
              />
              <StatsCard 
                icon={Building} 
                label="Deeds" 
                value={stats ? stats.deeds : 0} 
              />
              <StatsCard 
                icon={BarChart} 
                label="Reports" 
                value={stats ? stats.reports : 0} 
              />
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-white text-sm focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539]/20 outline-none transition-all placeholder:text-white/30"
                placeholder="Search documents..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Dropdown - Desktop */}
            <div className="hidden sm:block relative min-w-[200px]">
              <select
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-white text-sm focus:border-[#d0a539] focus:ring-2 focus:ring-[#d0a539]/20 outline-none cursor-pointer appearance-none"
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
              >
                <option className="bg-[#171512]" value="all">
                  All Documents
                </option>
                <option className="bg-[#171512]" value="agreements">
                  Agreements
                </option>
                <option className="bg-[#171512]" value="deeds">
                  Property Deeds
                </option>
                <option className="bg-[#171512]" value="reports">
                  Financial Reports
                </option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 pointer-events-none" />
            </div>

            {/* Filter Button - Mobile */}
            <button
              className="sm:hidden bg-white/5 border border-white/10 text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Mobile Filter Menu */}
          {showMobileFilters && (
            <div className="sm:hidden mt-3 bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
              {["all", "agreements", "deeds", "reports"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setShowMobileFilters(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? "bg-[#d0a539] text-[#171512]"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {filter === "all"
                    ? "All Documents"
                    : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- DOCUMENT LIST --- */}
      <section className="py-8 sm:py-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10 sm:space-y-12">
          
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 opacity-50">
              <Loader2 className="w-10 h-10 text-[#d0a539] animate-spin mb-4" />
              <p className="text-[#171512]/50 font-bold uppercase tracking-widest text-xs">Loading Documents...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <AlertCircle className="w-10 h-10 text-red-500 mb-4" />
              <p className="text-red-500 font-bold">{error}</p>
            </div>
          )}

          {/* No Results State */}
          {!loading && !error && filteredDocuments.length === 0 && (
             <div className="bg-white rounded-2xl p-12 border border-[#171512]/5 text-center">
                <div className="bg-[#d0a539]/10 text-[#d0a539] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FolderOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#171512] mb-2">No documents found</h3>
                <p className="text-[#171512]/60 text-sm">Try adjusting your search or filter criteria.</p>
              </div>
          )}

          {/* Content Sections - Only render if not loading and has items */}
          {!loading && !error && (
            <>
              {/* Section 1: Investment Agreements */}
              {agreements.length > 0 && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="h-px flex-1 bg-[#171512]/5"></div>
                    <h3 className="text-[#171512]/40 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] whitespace-nowrap">
                      Investment Agreements
                    </h3>
                    <div className="h-px flex-1 bg-[#171512]/5"></div>
                  </div>
                  <div className="grid gap-3 sm:gap-4">
                    {agreements.map((doc) => (
                      <DocumentRow key={doc.id} doc={doc} />
                    ))}
                  </div>
                </div>
              )}

              {/* Section 2: Property Deeds */}
              {deeds.length > 0 && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="h-px flex-1 bg-[#171512]/5"></div>
                    <h3 className="text-[#171512]/40 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] whitespace-nowrap">
                      Property Deeds
                    </h3>
                    <div className="h-px flex-1 bg-[#171512]/5"></div>
                  </div>
                  <div className="grid gap-3 sm:gap-4">
                    {deeds.map((doc) => (
                      <DocumentRow key={doc.id} doc={doc} />
                    ))}
                  </div>
                </div>
              )}

              {/* Section 3: Financial Reports */}
              {reports.length > 0 && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="h-px flex-1 bg-[#171512]/5"></div>
                    <h3 className="text-[#171512]/40 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] whitespace-nowrap">
                      Financial Reports
                    </h3>
                    <div className="h-px flex-1 bg-[#171512]/5"></div>
                  </div>
                  <div className="grid gap-3 sm:gap-4">
                    {reports.map((doc) => (
                      <DocumentRow key={doc.id} doc={doc} />
                    ))}
                  </div>
                </div>
              )}

              {/* Section 4: Other/Misc Documents */}
              {others.length > 0 && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="h-px flex-1 bg-[#171512]/5"></div>
                    <h3 className="text-[#171512]/40 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] whitespace-nowrap">
                      Other Documents
                    </h3>
                    <div className="h-px flex-1 bg-[#171512]/5"></div>
                  </div>
                  <div className="grid gap-3 sm:gap-4">
                    {others.map((doc) => (
                      <DocumentRow key={doc.id} doc={doc} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16">
        <div className="bg-gradient-to-br from-[#171512] to-[#2a2a2a] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 sm:w-1/3 h-full bg-[#d0a539]/5 -skew-x-12 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#d0a539]/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4 flex-1">
              <span className="inline-block text-[#d0a539] text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.5em]">
                High Security
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">
                Need assistance with your records?
              </h2>
              <p className="text-white/60 text-sm sm:text-base max-w-lg leading-relaxed">
                Our dedicated concierge team is available 24/7 for
                high-net-worth document requests and physical audits.
              </p>
            </div>
            <button className="w-full md:w-auto bg-[#d0a539] text-[#171512] px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:bg-[#d0a539]/90 hover:scale-105 transition-all shadow-xl shadow-[#d0a539]/20">
              Contact Concierge
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;











