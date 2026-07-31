import { Suspense } from "react";
import type { Metadata } from "next";
import HausnotrufFunnelPage from "./HausnotrufFunnelPage";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Hausnotruf kostenlos beantragen | liva – 100% Pflegekasse",
  description:
    "Hausnotruf ab Pflegegrad 1 komplett kostenlos. Die Pflegekasse zahlt 27 € im Monat – du zahlst nichts. In 2 Minuten online beantragen.",
};

export default function Page() {
  return (
    <>
      <main>
        <Suspense>
          <HausnotrufFunnelPage />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
