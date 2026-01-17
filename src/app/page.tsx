// app/page.tsx (or wherever your Home component is)
import { Main } from "@/components/Main";
import { Navbar } from "@/components/nav/Navbar";
import OfferManager from "@/components/OfferManager";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Main />

      {/* This component handles all the client-side logic internally */}
      <OfferManager />
    </div>
  );
}
