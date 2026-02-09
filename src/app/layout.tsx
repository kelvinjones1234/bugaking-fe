// import { AuthProvider } from "@/context/AuthContext"; // 1. Import the Provider
// import "./globals.css";

// export const metadata = {
//   title: "BugaKing",
//   description: "BugaKing - Agriculture, Technology & Real Estate",
//   icons: {
//     icon: "/bugakingLogo.png",
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="text-black">
//         {/* 2. Wrap the entire app (children) with AuthProvider */}
//         <AuthProvider>
//           {children}
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }





import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import Script from "next/script";
import GAListener from "@/components/GAListener";
import { Suspense } from "react";
export const metadata = {
  title: "BugaKing",
  description: "BugaKing - Agriculture, Technology & Real Estate",
  icons: {
    icon: "/bugakingLogo.png",
  },
};

const GA_ID = "G-GP814MESP6"; // replace with your real ID

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>

      <body className="text-black">
        <AuthProvider>
          <Suspense fallback={null}>
            <GAListener />
          </Suspense>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
