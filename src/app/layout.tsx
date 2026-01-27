// // src/app/layout.tsx
// import { Footer } from "@/components/Footer";
// import "./globals.css";

// export const metadata = {
//   title: "BugaKing",
//   description: "BugaKing - Agriculture, Technology & Real Estate",
//   icons: {
//     icon: "/bugakingLogo.png", // Place image in 'public' folder
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
//         {/* You could add a global footer here if needed */}
//         {children}
//         {/* <Footer /> */}
//       </body>
//     </html>
//   );
// }





import { AuthProvider } from "@/context/AuthContext"; // 1. Import the Provider
import "./globals.css";

export const metadata = {
  title: "BugaKing",
  description: "BugaKing - Agriculture, Technology & Real Estate",
  icons: {
    icon: "/bugakingLogo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-black">
        {/* 2. Wrap the entire app (children) with AuthProvider */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}