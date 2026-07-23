import type { Metadata } from "next";
import PflegeboxFunnelPage from "./PflegeboxFunnelPage";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Pflegebox kostenlos beantragen | liva – bis zu 42 € / Monat",
  description:
    "Pflegebox ab Pflegegrad 1 komplett kostenlos. Die Pflegekasse zahlt bis zu 42 € im Monat – du zahlst nichts. Monatliche Lieferung direkt nach Hause.",
};

export default function Page() {
  return (
    <>
      <main>
        <PflegeboxFunnelPage />
      </main>
      <Footer />
    </>
  );
}
