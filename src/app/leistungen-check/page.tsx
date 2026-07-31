import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import LeistungenCheckFunnel from "@/components/LeistungenCheckFunnel";

export const metadata: Metadata = {
  title: "Leistungen-Check – Was steht mir zu? | liva",
  description: "Finde in 2 Minuten heraus, welche Pflegeleistungen dir mit deinem Pflegegrad zustehen. Kostenlos, sofort, ohne Anmeldung.",
};

export default function LeistungenCheckPage() {
  return (
    <>
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-brand-light text-brand text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              Kostenlos & unverbindlich
            </span>
            <h1 className="font-serif text-4xl text-gray-900 mb-3">Was steht mir zu?</h1>
            <p className="text-gray-500">Wähle deinen Pflegegrad und sieh sofort alle Leistungen die dir zustehen.</p>
          </div>
          <LeistungenCheckFunnel />
        </div>
      </main>
      <Footer />
    </>
  );
}
