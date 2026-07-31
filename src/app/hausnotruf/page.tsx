import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, PhoneCall, Wifi, ShieldCheck, ArrowRight, Bell } from "lucide-react";
import Footer from "@/components/layout/Footer";
import HausnotrufLeadForm from "@/components/HausnotrufLeadForm";

export const metadata: Metadata = {
  title: "Hausnotruf kostenlos beantragen – 27 € Pflegekasse-Zuschuss | liva",
  description: "Die Pflegekasse zahlt 27 € pro Monat für deinen Hausnotruf – ab Pflegegrad 1, kein Eigenanteil. 24/7-Notrufzentrale, Sturzerkennung, Genehmigung in 3–5 Werktagen. Jetzt kostenlos beantragen.",
  keywords: "Hausnotruf beantragen, Hausnotruf kostenlos, Hausnotruf Pflegekasse, Hausnotruf Zuschuss, Hausnotruf Pflegegrad 1, Notrufknopf Senioren, Hausnotruf Kosten, § 40 SGB XI",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "liva",
    title: "Hausnotruf kostenlos beantragen – 27 € Pflegekasse-Zuschuss | liva",
    description: "Die Pflegekasse zahlt 27 € / Monat für deinen Hausnotruf. Ab Pflegegrad 1, kein Eigenanteil. Jetzt kostenlos beantragen.",
    url: "https://liva-pflege.de/hausnotruf",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Hausnotruf kostenlos beantragen – liva" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hausnotruf kostenlos beantragen – 27 € Pflegekasse-Zuschuss | liva",
    description: "Die Pflegekasse zahlt 27 € / Monat für deinen Hausnotruf. Ab Pflegegrad 1, kein Eigenanteil.",
  },
  alternates: {
    canonical: "https://liva-pflege.de/hausnotruf",
  },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://liva-pflege.de" },
        { "@type": "ListItem", "position": 2, "name": "Hausnotruf", "item": "https://liva-pflege.de/hausnotruf" },
      ],
    },
    {
      "@type": "Service",
      "@id": "https://liva-pflege.de/hausnotruf#service",
      "name": "Hausnotruf beantragen",
      "alternateName": "Hausnotruf mit Pflegekasse-Zuschuss",
      "description": "Hausnotruf-System mit 24/7-Notrufzentrale und Sturzerkennung. Die Pflegekasse übernimmt 27 € pro Monat gemäß § 40 Abs. 4 SGB XI – ab Pflegegrad 1, kein Eigenanteil bei unseren Partnern.",
      "provider": { "@id": "https://liva-pflege.de/#organization" },
      "areaServed": { "@type": "Country", "name": "Deutschland" },
      "audience": { "@type": "Audience", "audienceType": "Pflegebedürftige ab Pflegegrad 1 und deren Angehörige" },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR",
        "description": "Kostenlos durch Pflegekassen-Zuschuss von 27 € / Monat (§ 40 Abs. 4 SGB XI)",
      },
    },
  ],
};

export default function HausnotrufPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <main>
        <section className="bg-white py-16 px-4 sm:px-6 border-b border-[#E0EDE7]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-brand-light text-brand text-xs font-semibold px-4 py-1.5 rounded-full mb-6">Ab Pflegegrad 1 – oft zum Nulltarif</span>
              <h1 className="font-serif text-5xl text-gray-900 mb-4 leading-tight">Hausnotruf mit Pflegekasse-Zuschuss.</h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">Die Pflegekasse zahlt 27 € pro Monat für ein Hausnotruf-System. Bei unseren Partnern entstehen für dich keine Kosten.</p>
              {["Kein Eigenanteil bei unseren Partnern", "Sofort nach Pflegegrad-Anerkennung beantragbar", "Kein langfristiger Vertrag nötig"].map((item) => (
                <div key={item} className="flex items-center gap-3 mt-3">
                  <CheckCircle2 size={18} className="text-brand flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/hausnotruf-beantragen?start=1"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Jetzt kostenlos beantragen <ArrowRight size={16} />
                </Link>
                <a href="#anfrage" className="btn-secondary inline-flex items-center gap-2 mt-2">
                  Erst Fragen stellen
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-brand-light rounded-[20px] p-8 text-center w-full max-w-sm">
                <div className="w-16 h-16 rounded-2xl bg-brand flex items-center justify-center mx-auto mb-4">
                  <Bell size={32} className="text-white" />
                </div>
                <p className="font-serif text-3xl text-brand mb-1">27 € / Monat</p>
                <p className="text-brand/70 text-sm mb-4">Zuschuss von der Pflegekasse</p>
                <div className="bg-white rounded-xl p-4 text-left">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Das bekommst du</p>
                  <p className="text-sm text-gray-700 leading-relaxed">Notrufsystem · 24/7 Zentrale · Sturzerkennung · Sofortinstallation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl text-gray-900 mb-10 text-center">Wie es funktioniert</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: <PhoneCall size={22} className="text-brand" />, title: "24/7 Notrufzentrale", text: "Rund um die Uhr erreichbare Fachkräfte, die sofort handeln – ob Sturz, Ohnmacht oder Notfall." },
                { icon: <Wifi size={22} className="text-brand" />, title: "Einfache Installation", text: "Kleines Gerät mit Steckdose, fertig. Kein Techniker, keine Montage. In 5 Minuten einsatzbereit." },
                { icon: <ShieldCheck size={22} className="text-brand" />, title: "Sturzerkennung", text: "Moderne Geräte erkennen Stürze automatisch – der Knopf muss nicht mal gedrückt werden." },
              ].map((f) => (
                <div key={f.title} className="card bg-white p-6">
                  <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center mb-4">{f.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="anfrage" className="py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-xl mx-auto">
            <h2 className="font-serif text-3xl text-gray-900 mb-2 text-center">Du hast noch Fragen?</h2>
            <p className="text-gray-500 text-center mb-8 text-sm">Hinterlasse deine Kontaktdaten – wir melden uns bei dir.</p>
            <HausnotrufLeadForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
