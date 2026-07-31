import type { Metadata } from "next";
import PflegeboxPage from "./PflegeboxPage";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Pflegebox kostenlos beantragen | liva – bis zu 42 € / Monat",
  description:
    "Pflegebox ab Pflegegrad 1 komplett kostenlos – die Pflegekasse zahlt bis zu 42 € monatlich. Was ist die Pflegebox, wer hat Anspruch und wie beantragst du sie? Jetzt informieren und Box zusammenstellen.",
};

export default function Page() {
  return (
    <>
      <main>
        <PflegeboxPage />
      </main>
      <Footer />
    </>
  );
}
