// "use client";

// import {
//   Sprout,
//   PawPrint,
//   Bot,
//   ArrowRight,
//   LucideIcon,
//   Leaf,
//   Coins,
// } from "lucide-react";
// import { motion } from "framer-motion";

// // --- Data Configuration ---

// const SERVICES = [
//   {
//     title: "Crop Management",
//     description:
//       "Advanced soil health monitoring using real-time IoT sensors and proprietary high-yield biological strategies.",
//     icon: Sprout,
//   },
//   {
//     title: "Livestock Excellence",
//     description:
//       "Ethical, tech-integrated livestock welfare management using biometric tracking and precision nutrition protocols.",
//     icon: PawPrint,
//   },
//   {
//     title: "Precision Ag-Tech",
//     description:
//       "AI-integrated irrigation systems and drone-enabled field mapping for hyper-efficient resource distribution.",
//     icon: Bot,
//   },
// ];

// const SUSTAINABILITY_FEATURES = [
//   {
//     title: "Turnkey Land Ownership",
//     description:
//       "Secure titled agricultural land through our platform. We handle the legalities and infrastructure, moving you from buyer to landlord instantly.",
//     icon: Leaf,
//   },
//   {
//     title: "Managed Tenant Leasing",
//     description:
//       "We connect your acreage with high-performance commercial farmers, targeting up to 30% annual returns through managed lease agreements and yield-sharing.",
//     icon: Coins,
//   },
// ];

// // --- Utility: Fade In Animation (From V1) ---

// const FadeIn = ({
//   children,
//   delay = 0,
//   className,
// }: {
//   children: React.ReactNode;
//   delay?: number;
//   className?: string;
// }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 30 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true, margin: "-50px" }}
//     transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
//     className={className}
//   >
//     {children}
//   </motion.div>
// );

// // --- Reusable Components ---

// const ServiceCard = ({
//   title,
//   description,
//   icon: Icon,
// }: {
//   title: string;
//   description: string;
//   icon: LucideIcon;
// }) => (
//   <motion.div
//     whileHover={{ y: -5 }}
//     className="group p-6 sm:p-8 rounded-3xl bg-white border border-transparent hover:border-[var(--primary)]/30 transition-all duration-300 shadow-sm hover:shadow-xl h-full flex flex-col"
//   >
//     <div className="size-12 sm:size-14 bg-[#d0a539]/10 rounded-xl flex items-center justify-center text-[var(--primary)] mb-5 sm:mb-6 group-hover:bg-primary group-hover:text-[var(--foreground)] transition-colors">
//       <Icon className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
//     </div>
//     <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{title}</h4>
//     <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
//       {description}
//     </p>
//     <a
//       href="#"
//       className="flex items-center gap-2 text-[var(--primary)] font-bold text-xs sm:text-sm uppercase tracking-wider mt-auto"
//     >
//       Learn More <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
//     </a>
//   </motion.div>
// );

// const FeatureItem = ({
//   title,
//   description,
//   icon: Icon,
// }: {
//   title: string;
//   description: string;
//   icon: LucideIcon;
// }) => (
//   <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
//     <div className="size-12 rounded-full border border-primary flex items-center justify-center shrink-0 bg-primary/5">
//       <Icon
//         className="text-[var(--primary)] w-5 h-5 sm:w-6 sm:h-6"
//         strokeWidth={1.5}
//       />
//     </div>
//     <div className="space-y-2">
//       <h5 className="text-white text-lg sm:text-xl font-bold leading-tight">
//         {title}
//       </h5>
//       <p className="text-gray-400 text-sm leading-relaxed max-w-md">
//         {description}
//       </p>
//       {/* Visual Badge for the 30% Return */}
//       {title.includes("Leasing") && (
//         <span className="inline-block mt-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest">
//           Up to 30% Annual ROI
//         </span>
//       )}
//     </div>
//   </div>
// );

// interface FormFieldProps extends React.InputHTMLAttributes<
//   HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
// > {
//   label: string;
//   as?: "input" | "textarea" | "select";
// }

// const FormField = ({
//   label,
//   as = "input",
//   className = "",
//   ...props
// }: FormFieldProps) => {
//   const Component = as;
//   const baseStyles =
//     "bg-white border-gray-200 focus:border-primary focus:ring-primary rounded-xl p-4 transition-all outline-none border w-full text-sm sm:text-base";

//   return (
//     <div className="flex flex-col gap-2 w-full">
//       <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[var(--primary)]">
//         {label}
//       </label>
//       <Component className={`${baseStyles} ${className}`} {...props} />
//     </div>
//   );
// };

// // --- Main Layout ---

// export function Main() {
//   return (
//     <main className="container-width py-4 sm:py-6 overflow-hidden">
//       {/* --- Hero Section --- */}
//       <section className="mb-8 sm:mb-12">
//         <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[var(--foreground)] min-h-[500px] sm:min-h-[600px] flex items-end">
//           <div className="absolute inset-0 z-0">
//             <div className="absolute inset-0 bg-gradient-to-t from-[var(--foreground)] via-[var(--foreground)]/40 to-transparent z-10" />
//             <img
//               src="/img2.png"
//               alt="Golden wheat field at sunset with drone"
//               className="w-full h-full object-cover opacity-80"
//             />
//           </div>

//           <div className="relative z-20 p-6 sm:p-10 md:p-16 max-w-3xl">
//             <FadeIn>
//               <div className="inline-block px-3 py-1 mb-4 sm:mb-6 border border-primary text-[var(--primary)] text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded bg-black/20 backdrop-blur-sm">
//                 Established Legacy
//               </div>
//             </FadeIn>

//             <FadeIn delay={0.2}>
//               <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-black leading-[1.1] tracking-tight mb-4 sm:mb-6">
//                 The Golden Standard <br />
//                 <span className="text-[var(--primary)] italic font-light">
//                   of Agri-Wealth
//                 </span>
//               </h1>
//             </FadeIn>

//             <FadeIn delay={0.4}>
//               <p className="text-gray-300 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-6 sm:mb-8 max-w-xl">
//                 Own the land, reap the rewards. We bridge high-yield capital
//                 with autonomous precision to deliver up to 30% annual returns on
//                 your agricultural assets.
//               </p>
//             </FadeIn>

//             <FadeIn delay={0.6}>
//               <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
//                 <button className="px-8 py-4 bg-primary text-[var(--foreground)] font-bold rounded-xl hover:scale-105 transition-transform w-full sm:w-auto text-center">
//                   Explore Services
//                 </button>
//                 <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 font-bold rounded-xl hover:bg-white/20 transition-all w-full sm:w-auto text-center">
//                   Our Portfolio
//                 </button>
//               </div>
//             </FadeIn>
//           </div>
//         </div>
//       </section>

//       {/* --- Services Grid --- */}
//       <section className="px-4 sm:px-6 py-12 sm:py-20">
//         <div className="flex flex-col md:flex-row justify-between items-end mb-8 sm:mb-12 gap-6">
//           <FadeIn className="max-w-xl">
//             <h2 className="text-[var(--primary)] text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-3 sm:mb-4">
//               Core Competencies
//             </h2>
//             <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
//               Precision-Driven <br /> Agriculture Services
//             </h3>
//           </FadeIn>
//           <FadeIn delay={0.2}>
//             <p className="text-gray-500 dark:text-zinc-400 max-w-md text-sm leading-relaxed">
//               Our approach integrates AI-driven analytics with biological
//               optimization to ensure yield resilience and environmental
//               stewardship.
//             </p>
//           </FadeIn>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
//           {SERVICES.map((service, index) => (
//             <FadeIn key={index} delay={0.1 * index} className="h-full">
//               <ServiceCard {...service} />
//             </FadeIn>
//           ))}
//         </div>
//       </section>

//       {/* --- Sustainability/Investment Feature --- */}
//       <section className="px-6 py-12 sm:py-20 bg-[var(--foreground)] rounded-2xl sm:rounded-3xl mx-0 sm:mx-6 mb-12 sm:mb-20 overflow-hidden relative">
//         <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 hidden lg:block">
//           <img
//             src="/img3.png"
//             alt="Sustainable green field"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="relative z-10 max-w-2xl">
//           <FadeIn>
//             <h2 className="text-[var(--primary)] text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-4 sm:mb-6">
//               Investment Opportunity
//             </h2>
//             <h3 className="text-white text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-8">
//               Passive Wealth Generation <br /> Through Managed Acreage
//             </h3>
//           </FadeIn>

//           <div className="space-y-8 sm:space-y-10">
//             {SUSTAINABILITY_FEATURES.map((feature, index) => (
//               <FadeIn key={index} delay={0.2 * index}>
//                 <FeatureItem {...feature} />
//               </FadeIn>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* --- Contact/Inquiry Form --- */}
//       <section className="px-4 sm:px-6 pb-20 sm:pb-24 max-w-4xl mx-auto">
//         <FadeIn className="text-center mb-12 sm:mb-16">
//           <h3 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
//             Engage with the Kingdom
//           </h3>
//           <p className="text-gray-500 dark:text-zinc-400 text-sm sm:text-base">
//             Inquire about partnership opportunities or technical consultancy.
//           </p>
//         </FadeIn>

//         <FadeIn delay={0.2}>
//           <form
//             className="space-y-4 sm:space-y-6"
//             onSubmit={(e) => e.preventDefault()}
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//               <FormField label="Full Name" placeholder="Johnathan King" />
//               <FormField
//                 label="Organization"
//                 placeholder="Global Ag-Tech Inc."
//               />
//             </div>

//             <FormField
//               label="Email Address"
//               type="email"
//               placeholder="j.king@empire.com"
//             />

//             <FormField label="Investment Scale / Inquiry Type" as="select">
//               <option>Partnership Inquiry</option>
//               <option>Precision Technology Consultation</option>
//               <option>Investment Portfolio Discussion</option>
//               <option>Sustainability Audit</option>
//             </FormField>

//             <FormField
//               label="Message"
//               as="textarea"
//               rows={4}
//               placeholder="How can we advance your agricultural legacy?"
//             />

//             <button
//               type="submit"
//               className="w-full py-4 sm:py-5 bg-primary text-[var(--foreground)] font-black text-base sm:text-lg rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
//             >
//               Submit Inquiry to the Kingdom
//             </button>
//           </form>
//         </FadeIn>
//       </section>
//     </main>
//   );
// }





"use client";

import {
  Sprout,
  PawPrint,
  Bot,
  ArrowRight,
  LucideIcon,
  Leaf,
  Coins,
} from "lucide-react";
import { motion } from "framer-motion";

// --- Data Configuration ---

const SERVICES = [
  {
    title: "Crop Management",
    description:
      "Advanced soil health monitoring using real-time IoT sensors and proprietary high-yield biological strategies.",
    icon: Sprout,
  },
  {
    title: "Livestock Excellence",
    description:
      "Ethical, tech-integrated livestock welfare management using biometric tracking and precision nutrition protocols.",
    icon: PawPrint,
  },
  {
    title: "Precision Ag-Tech",
    description:
      "AI-integrated irrigation systems and drone-enabled field mapping for hyper-efficient resource distribution.",
    icon: Bot,
  },
];

const SUSTAINABILITY_FEATURES = [
  {
    title: "Turnkey Land Ownership",
    description:
      "Secure titled agricultural land through our platform. We handle the legalities and infrastructure, moving you from buyer to landlord instantly.",
    icon: Leaf,
  },
  {
    title: "Managed Tenant Leasing",
    description:
      "We connect your acreage with high-performance commercial farmers, targeting up to 30% annual returns through managed lease agreements and yield-sharing.",
    icon: Coins,
  },
];

// --- Utility: Fade In Animation (From V1) ---

const FadeIn = ({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- Reusable Components ---

const ServiceCard = ({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="group p-6 sm:p-8 rounded-3xl bg-white border border-transparent hover:border-[var(--primary)]/30 transition-all duration-300 shadow-sm hover:shadow-xl h-full flex flex-col"
  >
    <div className="size-12 sm:size-14 bg-[#d0a539]/10 rounded-xl flex items-center justify-center text-[var(--primary)] mb-5 sm:mb-6 group-hover:bg-primary group-hover:text-[var(--foreground)] transition-colors">
      <Icon className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
    </div>
    <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{title}</h4>
    <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
      {description}
    </p>
    <a
      href="#"
      className="flex items-center gap-2 text-[var(--primary)] font-bold text-xs sm:text-sm uppercase tracking-wider mt-auto"
    >
      Learn More <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
    </a>
  </motion.div>
);

const FeatureItem = ({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) => (
  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
    <div className="size-12 rounded-full border border-primary flex items-center justify-center shrink-0 bg-primary/5">
      <Icon
        className="text-[var(--primary)] w-5 h-5 sm:w-6 sm:h-6"
        strokeWidth={1.5}
      />
    </div>
    <div className="space-y-2">
      <h5 className="text-white text-lg sm:text-xl font-bold leading-tight">
        {title}
      </h5>
      <p className="text-gray-400 text-sm leading-relaxed max-w-md">
        {description}
      </p>
      {/* Visual Badge for the 30% Return */}
      {title.includes("Leasing") && (
        <span className="inline-block mt-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest">
          Up to 30% Annual ROI
        </span>
      )}
    </div>
  </div>
);

// --- FIXED INTERFACE HERE ---
interface FormFieldProps extends React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
> {
  label: string;
  as?: "input" | "textarea" | "select";
  rows?: number; // Added this property to resolve the TS error
}

const FormField = ({
  label,
  as = "input",
  className = "",
  ...props
}: FormFieldProps) => {
  // We need to cast 'as' to any here because TS struggles with dynamic JSX tag types 
  // derived from string unions that share different attributes (like input vs textarea)
  const Component = as as any;
  const baseStyles =
    "bg-white border-gray-200 focus:border-primary focus:ring-primary rounded-xl p-4 transition-all outline-none border w-full text-sm sm:text-base";

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[var(--primary)]">
        {label}
      </label>
      <Component className={`${baseStyles} ${className}`} {...props} />
    </div>
  );
};

// --- Main Layout ---

export function Main() {
  return (
    <main className="container-width py-4 sm:py-6 overflow-hidden">
      {/* --- Hero Section --- */}
      <section className="mb-8 sm:mb-12">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[var(--foreground)] min-h-[500px] sm:min-h-[600px] flex items-end">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--foreground)] via-[var(--foreground)]/40 to-transparent z-10" />
            <img
              src="/img2.png"
              alt="Golden wheat field at sunset with drone"
              className="w-full h-full object-cover opacity-80"
            />
          </div>

          <div className="relative z-20 p-6 sm:p-10 md:p-16 max-w-3xl">
            <FadeIn>
              <div className="inline-block px-3 py-1 mb-4 sm:mb-6 border border-primary text-[var(--primary)] text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded bg-black/20 backdrop-blur-sm">
                Established Legacy
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-black leading-[1.1] tracking-tight mb-4 sm:mb-6">
                The Golden Standard <br />
                <span className="text-[var(--primary)] italic font-light">
                  of Agri-Wealth
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-gray-300 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-6 sm:mb-8 max-w-xl">
                Own the land, reap the rewards. We bridge high-yield capital
                with autonomous precision to deliver up to 30% annual returns on
                your agricultural assets.
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <button className="px-8 py-4 bg-primary text-[var(--foreground)] font-bold rounded-xl hover:scale-105 transition-transform w-full sm:w-auto text-center">
                  Explore Services
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 font-bold rounded-xl hover:bg-white/20 transition-all w-full sm:w-auto text-center">
                  Our Portfolio
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- Services Grid --- */}
      <section className="px-4 sm:px-6 py-12 sm:py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 sm:mb-12 gap-6">
          <FadeIn className="max-w-xl">
            <h2 className="text-[var(--primary)] text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-3 sm:mb-4">
              Core Competencies
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Precision-Driven <br /> Agriculture Services
            </h3>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-gray-500 dark:text-zinc-400 max-w-md text-sm leading-relaxed">
              Our approach integrates AI-driven analytics with biological
              optimization to ensure yield resilience and environmental
              stewardship.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service, index) => (
            <FadeIn key={index} delay={0.1 * index} className="h-full">
              <ServiceCard {...service} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* --- Sustainability/Investment Feature --- */}
      <section className="px-6 py-12 sm:py-20 bg-[var(--foreground)] rounded-2xl sm:rounded-3xl mx-0 sm:mx-6 mb-12 sm:mb-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 hidden lg:block">
          <img
            src="/img3.png"
            alt="Sustainable green field"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-2xl">
          <FadeIn>
            <h2 className="text-[var(--primary)] text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-4 sm:mb-6">
              Investment Opportunity
            </h2>
            <h3 className="text-white text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-8">
              Passive Wealth Generation <br /> Through Managed Acreage
            </h3>
          </FadeIn>

          <div className="space-y-8 sm:space-y-10">
            {SUSTAINABILITY_FEATURES.map((feature, index) => (
              <FadeIn key={index} delay={0.2 * index}>
                <FeatureItem {...feature} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- Contact/Inquiry Form --- */}
      <section className="px-4 sm:px-6 pb-20 sm:pb-24 max-w-4xl mx-auto">
        <FadeIn className="text-center mb-12 sm:mb-16">
          <h3 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Engage with the Kingdom
          </h3>
          <p className="text-gray-500 dark:text-zinc-400 text-sm sm:text-base">
            Inquire about partnership opportunities or technical consultancy.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <form
            className="space-y-4 sm:space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <FormField label="Full Name" placeholder="Johnathan King" />
              <FormField
                label="Organization"
                placeholder="Global Ag-Tech Inc."
              />
            </div>

            <FormField
              label="Email Address"
              type="email"
              placeholder="j.king@empire.com"
            />

            <FormField label="Investment Scale / Inquiry Type" as="select">
              <option>Partnership Inquiry</option>
              <option>Precision Technology Consultation</option>
              <option>Investment Portfolio Discussion</option>
              <option>Sustainability Audit</option>
            </FormField>

            <FormField
              label="Message"
              as="textarea"
              rows={4}
              placeholder="How can we advance your agricultural legacy?"
            />

            <button
              type="submit"
              className="w-full py-4 sm:py-5 bg-primary text-[var(--foreground)] font-black text-base sm:text-lg rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              Submit Inquiry to the Kingdom
            </button>
          </form>
        </FadeIn>
      </section>
    </main>
  );
}