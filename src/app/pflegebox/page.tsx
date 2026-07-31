import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Package } from "lucide-react";
import Footer from "@/components/layout/Footer";
import PflegeboxFunnel from "@/components/PflegeboxFunnel";

export const metadata: Metadata = {
  title: "Pflegebox kostenlos beantragen – bis 42 € Pflegekasse-Zuschuss | liva",
  description: "Kostenlose Pflegehilfsmittelbox – jeden Monat neu geliefert. Die Pflegekasse übernimmt bis zu 42 € pro Monat ab Pflegegrad 1. Handschuhe, Einlagen, Desinfektion – kein Eigenanteil. Jetzt beantragen.",
  keywords: "Pflegebox beantragen, Pflegehilfsmittelbox kostenlos, Pflegebox Pflegekasse, Pflegehilfsmittel beantragen, Pflegebox Inhalt, kostenlose Pflegebox Pflegegrad 1, § 40 SGB XI Pflegehilfsmittel",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "liva",
    title: "Pflegebox kostenlos beantragen – bis 42 € Pflegekasse-Zuschuss | liva",
    description: "Kostenlose Pflegehilfsmittelbox – jeden Monat neu. Bis zu 42 € von der Pflegekasse, ab Pflegegrad 1, kein Eigenanteil.",
    url: "https://liva-pflege.de/pflegebox",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Kostenlose Pflegebox beantragen – liva" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pflegebox kostenlos beantragen – bis 42 € Pflegekasse-Zuschuss | liva",
    description: "Kostenlose Pflegehilfsmittelbox – jeden Monat neu. Bis zu 42 € von der Pflegekasse, ab Pflegegrad 1.",
  },
  alternates: {
    canonical: "https://liva-pflege.de/pflegebox",
  },
};

const boxInhalt = [
  "Einmalhandschuhe (Latex oder Vinyl)",
  "Bettschutzeinlagen / Matratzenschoner",
  "Händedesinfektionsmittel",
  "Flächendesinfektionsmittel",
  "Mundschutz / OP-Masken",
  "Einmalschürzen & Fingerlinge",
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://liva-pflege.de" },
        { "@type": "ListItem", "position": 2, "name": "Pflegebox", "item": "https://liva-pflege.de/pflegebox" },
      ],
    },
    {
      "@type": "Service",
      "@id": "https://liva-pflege.de/pflegebox#service",
      "name": "Pflegehilfsmittelbox beantragen",
      "alternateName": "Kostenlose Pflegebox",
      "description": "Monatliche Lieferung von Pflegehilfsmitteln – vollständig finanziert durch die Pflegekasse (bis 42 € / Monat gemäß § 40 SGB XI) ab Pflegegrad 1.",
      "provider": { "@id": "https://liva-pflege.de/#organization" },
      "areaServed": { "@type": "Country", "name": "Deutschland" },
      "audience": { "@type": "Audience", "audienceType": "Pflegebedürftige ab Pflegegrad 1 und deren Angehörige" },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR",
        "description": "Kostenlos durch Pflegekassen-Zuschuss bis 42 € / Monat (§ 40 SGB XI)",
      },
    },
  ],
};

export default function PflegeboxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <main>
        <section className="bg-white py-16 px-4 sm:px-6 border-b border-[#E0EDE7]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-brand-light text-brand text-xs font-semibold px-4 py-1.5 rounded-full mb-6">Kostenlos ab Pflegegrad 1</span>
              <h1 className="font-serif text-5xl text-gray-900 mb-4 leading-tight">Deine kostenlose Pflegebox – jeden Monat neu.</h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">Bis zu 42 € pro Monat für Pflegehilfsmittel – vollständig von der Pflegekasse übernommen. Bei unseren Partnern entstehen für dich keine Kosten.</p>
              <div className="space-y-2.5">
                {boxInhalt.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-brand flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/pflegebox-beantragen?start=1"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Jetzt kostenlos bestellen <ArrowRight size={16} />
                </Link>
                <a href="#anfrage" className="btn-secondary inline-flex items-center gap-2 mt-2">
                  Erst Fragen stellen
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-brand-light rounded-[20px] p-10 text-center w-full max-w-sm">
                <div className="w-16 h-16 rounded-2xl bg-brand flex items-center justify-center mx-auto mb-4">
                  <Package size={32} className="text-white" />
                </div>
                <p className="font-serif text-3xl text-brand mb-1">42 € / Monat</p>
                <p className="text-brand/70 text-sm">vollständig kostenlos</p>
                <div className="mt-6 bg-white rounded-xl p-4 text-left">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Das ist drin</p>
                  <p className="text-sm text-gray-700 leading-relaxed">Handschuhe · Einlagen · Desinfektion · Mundschutz · Schürzen · mehr</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl text-gray-900 mb-10 text-center">So einfach geht&apos;s</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { nr: "1", title: "Pflegegrad angeben", text: "Einfach deinen Pflegegrad wählen – ab PG 1 hast du Anspruch." },
                { nr: "2", title: "Adresse eingeben", text: "Wir brauchen nur deine PLZ um den passenden Anbieter zu finden." },
                { nr: "3", title: "Fertig – wir erledigen den Rest", text: "Wir stellen den Antrag bei deiner Pflegekasse. Erste Lieferung in 1–2 Wochen." },
              ].map((s) => (
                <div key={s.nr} className="card bg-white p-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-brand text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">{s.nr}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="anfrage" className="py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-xl mx-auto">
            <h2 className="font-serif text-3xl text-gray-900 mb-2 text-center">Du hast noch Fragen?</h2>
            <p className="text-gray-500 text-center mb-8 text-sm">Hinterlasse deine Kontaktdaten – wir melden uns bei dir.</p>
            <PflegeboxFunnel />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
