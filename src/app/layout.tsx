// src/app/layout.tsx
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Booga King",
  description: "Booga King - Agriculture, Technology & Real Estate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-black">
        {/* You could add a global footer here if needed */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
