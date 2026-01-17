// "use client";

// import { ArrowRight, Briefcase, Handshake, Users } from "lucide-react";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   useInView,
//   useSpring,
//   Variants,
// } from "framer-motion";
// import { useRef, useEffect, useState } from "react";
// import Link from "next/link"; // 1. Import Link

// // --- Configuration Data ---
// // Edit content here without touching the UI logic

// const HERO_DATA = {
//   bgImage: "/img1.png",
//   titleLine1: "The Standard of Excellence",
//   titleLine2: "Across Every Frontier",
//   description:
//     "A premier global conglomerate delivering excellence through smart technology, sustainable agriculture, and strategic real estate",
// };

// const STATS_DATA = [
//   {
//     icon: Users,
//     label: "Customers Served",
//     value: 1500,
//     suffix: "+",
//     isStatic: false,
//   },
//   {
//     icon: Briefcase,
//     label: "Service Provided",
//     value: 120,
//     suffix: "+",
//     isStatic: false,
//   },
//   {
//     icon: Handshake,
//     label: "Industry Collaborations",
//     value: 20,
//     suffix: "+",
//     isStatic: true,
//     staticLabel: "10k+",
//   },
// ];

// const SECTORS_DATA = [
//   {
//     title: "BugaKing",
//     description:
//       "From strategic real estate to profitable farming, Bugaking Global offers verified plots and expert-managed agricultural investments.",
//     image: "/farmland.jpg",
//     button: "View Sector",
//     href: "/agriculture", // 2. Added href
//   },
//   {
//     title: "Billvest",
//     description:
//       "Simplify your bills with Billvest. Fast, secure, and rewarding payments for airtime, data, utilities, and more.",
//     image: "/phone.png",
//     button: "Visit site",
//     href: "https://billvest.ng", // 2. Added href (can be external)
//   },
//   {
//     title: "Brickgold Homes & Properties",
//     description:
//       "Brickgold Homes develops modern, sustainable, and affordable housing. As part of Bugaking Group, we provide expert property management and investment advisory.",
//     image: "/landre.jpg",
//     button: "View Sector",
//     href: "/real-estate", // 2. Added href
//   },
// ];

// // --- Utility Components ---

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

// const Counter = ({
//   value,
//   suffix = "",
// }: {
//   value: number;
//   suffix?: string;
// }) => {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-100px" });
//   const springValue = useSpring(0, { stiffness: 50, damping: 20, duration: 2 });
//   const [displayValue, setDisplayValue] = useState(0);

//   useEffect(() => {
//     if (inView) springValue.set(value);
//   }, [inView, value, springValue]);

//   useEffect(() => {
//     springValue.on("change", (latest) => setDisplayValue(Math.floor(latest)));
//   }, [springValue]);

//   return (
//     <span ref={ref}>
//       {displayValue}
//       {suffix}
//     </span>
//   );
// };

// // --- Sub-Components ---

// const StatCard = ({
//   item,
//   variants,
// }: {
//   item: (typeof STATS_DATA)[0];
//   variants: Variants;
// }) => {
//   const Icon = item.icon;

//   return (
//     <motion.div
//       variants={variants}
//       className="flex flex-col gap-2 sm:gap-3 rounded-brand p-6 sm:p-8 border border-border bg-surface hover:border-primary/30 transition-colors duration-500"
//     >
//       <div className="text-primary mb-1 sm:mb-2">
//         <Icon className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />
//       </div>

//       <p className="text-foreground/60 text-xs sm:text-sm font-bold uppercase tracking-wider sm:tracking-widest">
//         {item.label}
//       </p>
//       <p className="text-foreground text-3xl sm:text-4xl font-black">
//         {item.isStatic ? (
//           item.staticLabel
//         ) : (
//           <Counter value={item.value} suffix={item.suffix} />
//         )}
//       </p>
//     </motion.div>
//   );
// };

// const SectorCard = ({
//   item,
//   variants,
// }: {
//   item: (typeof SECTORS_DATA)[0];
//   variants: Variants;
// }) => (
//   <motion.div
//     variants={variants}
//     className="group flex flex-col gap-4 sm:gap-6 p-5 sm:p-6 rounded-brand-lg bg-surface border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
//   >
//     <div className="relative w-full aspect-[4/5] overflow-hidden rounded-brand">
//       <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
//       <div
//         className="w-full h-full bg-center bg-no-repeat bg-cover transform group-hover:scale-110 transition-transform duration-700"
//         style={{ backgroundImage: `url("${item.image}")` }}
//       />
//     </div>
//     <div className="space-y-2 sm:space-y-3 flex flex-col flex-grow">
//       <h3 className="text-foreground text-xl sm:text-2xl font-black uppercase tracking-tight">
//         {item.title}
//       </h3>
//       <p className="text-foreground/70 text-sm sm:text-base leading-relaxed mb-4">
//         {item.description}
//       </p>

//       {/* 3. Changed button to Link and used item.href */}
//       <div className="mt-auto pt-2">
//         <Link
//           href={item.href}
//           className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm hover:gap-4 transition-all"
//         >
//           {item.button}
//           <span className="material-symbols-outlined text-base sm:text-xl">
//             <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
//           </span>
//         </Link>
//       </div>
//     </div>
//   </motion.div>
// );

// // --- Main Layout Component ---

// export function Main() {
//   const { scrollY } = useScroll();
//   const yBg = useTransform(scrollY, [0, 500], [0, 150]);
//   const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);

//   const containerVariants: Variants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.2, delayChildren: 0.1 },
//     },
//   };

//   const itemVariants: Variants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
//     },
//   };

//   return (
//     <main className="container-width py-4 sm:py-6 overflow-hidden">
//       {/* --- HERO SECTION --- */}
//       <section className="relative overflow-hidden rounded-2xl sm:rounded-brand-lg mb-8 sm:mb-12 h-[500px] sm:h-[600px] lg:h-[700px]">
//         <motion.div
//           style={{
//             y: yBg,
//             backgroundImage: `linear-gradient(rgba(23, 21, 18, 0.5) 0%, rgba(23, 21, 18, 0.8) 100%), url("${HERO_DATA.bgImage}")`,
//           }}
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
//         />

//         <motion.div
//           style={{ opacity: opacityHero }}
//           className="relative z-10 flex flex-col h-full gap-6 sm:gap-8 items-center justify-center p-6 sm:p-8 lg:p-12 text-center"
//         >
//           <div className="max-w-4xl space-y-6 sm:space-y-8">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 1, delay: 0.2 }}
//             >
//               <span className="inline-block px-3 sm:px-4 py-1 rounded-full border border-primary text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] bg-black/30 backdrop-blur-sm">
//                 Excellence Reimagined
//               </span>
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
//               className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-tight tracking-tight px-4 sm:px-0 drop-shadow-xl"
//             >
//               {HERO_DATA.titleLine1} <br className="hidden md:block" />{" "}
//               {HERO_DATA.titleLine2}
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 1, delay: 0.7 }}
//               className="text-white/90 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed px-4 sm:px-0 drop-shadow-md"
//             >
//               {HERO_DATA.description}
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 1 }}
//               className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4 px-4 sm:px-0"
//             >
//               <button className="bg-primary text-charcoal px-8 sm:px-10 py-3 sm:py-4 rounded-brand text-sm sm:text-base font-black uppercase tracking-wider sm:tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(208,165,57,0.3)]">
//                 Explore Portfolio
//               </button>
//               <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 sm:px-10 py-3 sm:py-4 rounded-brand text-sm sm:text-base font-black uppercase tracking-wider sm:tracking-widest hover:bg-white/20 transition-all">
//                 Our Mission
//               </button>
//             </motion.div>
//           </div>
//         </motion.div>
//       </section>

//       {/* --- STATS GRID --- */}
//       <motion.section
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-100px" }}
//         className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16"
//       >
//         {STATS_DATA.map((stat, idx) => (
//           <StatCard key={idx} item={stat} variants={itemVariants} />
//         ))}
//       </motion.section>

//       {/* --- SECTION HEADER --- */}
//       <FadeIn className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8 px-4 border-l-2 sm:border-l-4 border-primary ml-1">
//         <div>
//           <p className="text-primary text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-1 sm:mb-2">
//             Subsidiaries
//           </p>
//           <h2 className="text-foreground text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
//             Pillars of Prosperity
//           </h2>
//         </div>
//         <p className="text-foreground/60 text-sm sm:text-base lg:max-w-sm">
//           Our diversified portfolio represents the cutting edge of industry
//           standards.
//         </p>
//       </FadeIn>

//       {/* --- SUBSIDIARIES GRID --- */}
//       <motion.section
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-50px" }}
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20"
//       >
//         {SECTORS_DATA.map((sector, index) => (
//           <SectorCard key={index} item={sector} variants={itemVariants} />
//         ))}
//       </motion.section>

//       {/* --- LEGACY SECTION --- */}
//       <section className="relative mb-16 sm:mb-20">
//         <motion.div
//           initial={{ clipPath: "inset(10% 10% 10% 10%)", opacity: 0 }}
//           whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
//           transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
//           viewport={{ once: true, margin: "-100px" }}
//           className="bg-[var(--foreground)] rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-20 text-white relative overflow-hidden"
//         >
//           <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--primary)]/5 skew-x-12 transform translate-x-1/4" />

//           <div className="relative z-10 flex flex-col lg:flex-row gap-8 sm:gap-12 items-center">
//             {/* Text Content */}
//             <div className="flex-1 space-y-5 sm:space-y-8">
//               <FadeIn>
//                 <span className="text-primary text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.5em]">
//                   The Legacy
//                 </span>
//               </FadeIn>
//               <FadeIn delay={0.2}>
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight italic">
//                   Built on values, <br />
//                   Driven by <span className="text-primary">Vision</span>.
//                 </h2>
//               </FadeIn>
//               <FadeIn delay={0.4}>
//                 <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl">
//                   For over three decades, BugaKing has stood as a beacon of
//                   multifaceted excellence. What started as a commitment to the
//                   land has evolved into a global powerhouse spanning the most
//                   critical sectors of the modern economy.
//                 </p>
//               </FadeIn>

//               <motion.div
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.6 }}
//                 className="flex gap-3 sm:gap-4"
//               >
//                 <div className="p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10">
//                   <p className="text-primary font-black text-xl sm:text-2xl">
//                     5+
//                   </p>
//                   <p className="text-[10px] sm:text-xs uppercase font-bold text-white/40 tracking-tight sm:tracking-tighter">
//                     Years of History
//                   </p>
//                 </div>
//                 <div className="p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10">
//                   <p className="text-primary font-black text-xl sm:text-2xl">
//                     Global
//                   </p>
//                   <p className="text-[10px] sm:text-xs uppercase font-bold text-white/40 tracking-tight sm:tracking-tighter">
//                     Reach
//                   </p>
//                 </div>
//               </motion.div>
//             </div>

//             {/* Image Circle */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
//               whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
//               transition={{ duration: 1, ease: "easeOut" }}
//               viewport={{ once: true }}
//               className="flex-1 relative w-full max-w-md lg:max-w-none"
//             >
//               <div className="w-full aspect-square rounded-full border-2 border-primary/20 flex items-center justify-center p-6 sm:p-8">
//                 <div
//                   className="w-full h-full rounded-full bg-cover bg-center border-4 border-primary shadow-2xl shadow-primary/20"
//                   style={{
//                     backgroundImage: "url('/legacy1.png')",
//                   }}
//                 />
//               </div>
//               <motion.div
//                 initial={{ y: 50, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.8, duration: 0.5 }}
//                 className="absolute bottom-2 sm:bottom-4 -left-2 sm:-left-4 bg-primary text-charcoal p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl max-w-[160px] sm:max-w-[200px]"
//               >
//                 <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest mb-1">
//                   Our Pledge
//                 </p>
//                 <p className="text-xs sm:text-sm font-bold leading-tight">
//                   Zero compromise on quality and sustainability.
//                 </p>
//               </motion.div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </section>
//     </main>
//   );
// }







"use client";

import { ArrowRight, Briefcase, Handshake, Users } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  Variants,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

// --- Configuration Data ---

const HERO_DATA = {
  bgImage: "/img1.png",
  titleLine1: "The Standard of Excellence",
  titleLine2: "Across Every Frontier",
  description:
    "A premier global conglomerate delivering excellence through smart technology, sustainable agriculture, and strategic real estate",
};

const STATS_DATA = [
  {
    icon: Users,
    label: "Customers Served",
    value: 1500,
    suffix: "+",
    isStatic: false,
  },
  {
    icon: Briefcase,
    label: "Service Provided",
    value: 120,
    suffix: "+",
    isStatic: false,
  },
  {
    icon: Handshake,
    label: "Industry Collaborations",
    value: 20,
    suffix: "+",
    isStatic: true,
    staticLabel: "10k+",
  },
];

const SECTORS_DATA = [
  {
    title: "BugaKing",
    description:
      "From strategic real estate to profitable farming, Bugaking Global offers verified plots and expert-managed agricultural investments.",
    image: "/farmland.jpg",
    button: "View Sector",
    href: "/agriculture",
  },
  {
    title: "Billvest",
    description:
      "Simplify your bills with Billvest. Fast, secure, and rewarding payments for airtime, data, utilities, and more.",
    image: "/phone.png",
    button: "Visit site",
    href: "https://billvest.ng",
  },
  {
    title: "Brickgold Homes & Properties",
    description:
      "Brickgold Homes develops modern, sustainable, and affordable housing. As part of Bugaking Group, we provide expert property management and investment advisory.",
    image: "/landre.jpg",
    button: "View Sector",
    href: "/real-estate",
  },
];

// --- Utility Components ---

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
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 1.0] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Counter = ({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) => {
  const ref = useRef(null);
  // Adjusted margin and amount for better mobile triggering
  const inView = useInView(ref, { once: true, margin: "-30px", amount: "some" });
  const springValue = useSpring(0, { stiffness: 40, damping: 20 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      springValue.set(value);
    }
  }, [inView, value, springValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return () => unsubscribe();
  }, [springValue]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
};

// --- Sub-Components ---

const StatCard = ({
  item,
  variants,
}: {
  item: (typeof STATS_DATA)[0];
  variants: Variants;
}) => {
  const Icon = item.icon;

  return (
    <motion.div
      variants={variants}
      className="flex flex-col gap-2 sm:gap-3 rounded-brand p-6 sm:p-8 border border-border bg-surface hover:border-primary/30 transition-colors duration-500"
    >
      <div className="text-primary mb-1 sm:mb-2">
        <Icon className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />
      </div>

      <p className="text-foreground/60 text-xs sm:text-sm font-bold uppercase tracking-wider sm:tracking-widest">
        {item.label}
      </p>
      <p className="text-foreground text-3xl sm:text-4xl font-black">
        {item.isStatic ? (
          item.staticLabel
        ) : (
          <Counter value={item.value} suffix={item.suffix} />
        )}
      </p>
    </motion.div>
  );
};

const SectorCard = ({
  item,
  variants,
}: {
  item: (typeof SECTORS_DATA)[0];
  variants: Variants;
}) => (
  <motion.div
    variants={variants}
    className="group flex flex-col gap-4 sm:gap-6 p-5 sm:p-6 rounded-brand-lg bg-surface border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
  >
    <div className="relative w-full aspect-[4/5] overflow-hidden rounded-brand">
      <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
      <div
        className="w-full h-full bg-center bg-no-repeat bg-cover transform group-hover:scale-110 transition-transform duration-700"
        style={{ backgroundImage: `url("${item.image}")` }}
      />
    </div>
    <div className="space-y-2 sm:space-y-3 flex flex-col flex-grow">
      <h3 className="text-foreground text-xl sm:text-2xl font-black uppercase tracking-tight">
        {item.title}
      </h3>
      <p className="text-foreground/70 text-sm sm:text-base leading-relaxed mb-4">
        {item.description}
      </p>

      <div className="mt-auto pt-2">
        <Link
          href={item.href}
          className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm hover:gap-4 transition-all"
        >
          {item.button}
          <span className="material-symbols-outlined text-base sm:text-xl">
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </span>
        </Link>
      </div>
    </div>
  </motion.div>
);

// --- Main Layout Component ---

export function Main() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <main className="container-width py-4 sm:py-6 overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-brand-lg mb-8 sm:mb-12 h-[500px] sm:h-[600px] lg:h-[700px]">
        <motion.div
          style={{
            y: yBg,
            backgroundImage: `linear-gradient(rgba(23, 21, 18, 0.5) 0%, rgba(23, 21, 18, 0.8) 100%), url("${HERO_DATA.bgImage}")`,
          }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        />

        <motion.div
          style={{ opacity: opacityHero }}
          className="relative z-10 flex flex-col h-full gap-6 sm:gap-8 items-center justify-center p-6 sm:p-8 lg:p-12 text-center"
        >
          <div className="max-w-4xl space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="inline-block px-3 sm:px-4 py-1 rounded-full border border-primary text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] bg-black/30 backdrop-blur-sm">
                Excellence Reimagined
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-tight tracking-tight px-4 sm:px-0 drop-shadow-xl"
            >
              {HERO_DATA.titleLine1} <br className="hidden md:block" />{" "}
              {HERO_DATA.titleLine2}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-white/90 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed px-4 sm:px-0 drop-shadow-md"
            >
              {HERO_DATA.description}
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4 px-4 sm:px-0">
              <button className="bg-primary text-charcoal px-8 sm:px-10 py-3 sm:py-4 rounded-brand text-sm sm:text-base font-black uppercase tracking-wider sm:tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(208,165,57,0.3)]">
                Explore Portfolio
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 sm:px-10 py-3 sm:py-4 rounded-brand text-sm sm:text-base font-black uppercase tracking-wider sm:tracking-widest hover:bg-white/20 transition-all">
                Our Mission
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- STATS GRID --- */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-30px", amount: "some" }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16"
      >
        {STATS_DATA.map((stat, idx) => (
          <StatCard key={idx} item={stat} variants={itemVariants} />
        ))}
      </motion.section>

      {/* --- SECTION HEADER --- */}
      <FadeIn className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8 px-4 border-l-2 sm:border-l-4 border-primary ml-1">
        <div>
          <p className="text-primary text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-1 sm:mb-2">
            Subsidiaries
          </p>
          <h2 className="text-foreground text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            Pillars of Prosperity
          </h2>
        </div>
        <p className="text-foreground/60 text-sm sm:text-base lg:max-w-sm">
          Our diversified portfolio represents the cutting edge of industry
          standards.
        </p>
      </FadeIn>

      {/* --- SUBSIDIARIES GRID --- */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-30px", amount: "some" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20"
      >
        {SECTORS_DATA.map((sector, index) => (
          <SectorCard key={index} item={sector} variants={itemVariants} />
        ))}
      </motion.section>

      {/* --- LEGACY SECTION --- */}
      <section className="relative mb-16 sm:mb-20">
        <motion.div
          initial={{ clipPath: "inset(10% 10% 10% 10%)", opacity: 0 }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          viewport={{ once: true, margin: "-30px" }}
          className="bg-[var(--foreground)] rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-20 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--primary)]/5 skew-x-12 transform translate-x-1/4" />

          <div className="relative z-10 flex flex-col lg:flex-row gap-8 sm:gap-12 items-center">
            <div className="flex-1 space-y-5 sm:space-y-8">
              <FadeIn>
                <span className="text-primary text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.5em]">
                  The Legacy
                </span>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight italic">
                  Built on values, <br />
                  Driven by <span className="text-primary">Vision</span>.
                </h2>
              </FadeIn>
              <FadeIn delay={0.4}>
                <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl">
                  For over three decades, BugaKing has stood as a beacon of
                  multifaceted excellence. What started as a commitment to the
                  land has evolved into a global powerhouse spanning the most
                  critical sectors of the modern economy.
                </p>
              </FadeIn>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex gap-3 sm:gap-4"
              >
                <div className="p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-primary font-black text-xl sm:text-2xl">
                    5+
                  </p>
                  <p className="text-[10px] sm:text-xs uppercase font-bold text-white/40 tracking-tight sm:tracking-tighter">
                    Years of History
                  </p>
                </div>
                <div className="p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-primary font-black text-xl sm:text-2xl">
                    Global
                  </p>
                  <p className="text-[10px] sm:text-xs uppercase font-bold text-white/40 tracking-tight sm:tracking-tighter">
                    Reach
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex-1 relative w-full max-w-md lg:max-w-none"
            >
              <div className="w-full aspect-square rounded-full border-2 border-primary/20 flex items-center justify-center p-6 sm:p-8">
                <div
                  className="w-full h-full rounded-full bg-cover bg-center border-4 border-primary shadow-2xl shadow-primary/20"
                  style={{
                    backgroundImage: "url('/legacy1.png')",
                  }}
                />
              </div>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute bottom-2 sm:bottom-4 -left-2 sm:-left-4 bg-primary text-charcoal p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl max-w-[160px] sm:max-w-[200px]"
              >
                <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest mb-1">
                  Our Pledge
                </p>
                <p className="text-xs sm:text-sm font-bold leading-tight">
                  Zero compromise on quality and sustainability.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}