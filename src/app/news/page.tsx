import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { NEWS } from "@/lib/content-data";
import NewsClient from "./NewsClient";

export const metadata: Metadata = {
  title: "News aus der Pflege 2026 – Aktuell & verständlich erklärt | liva",
  description:
    "Aktuelle Neuigkeiten aus der Pflegepolitik: Pflegereform 2026, Leistungsänderungen, MD-Tipps und neue Beträge – klar erklärt von liva, deinem Pflegebegleiter.",
  alternates: { canonical: "https://liva-pflege.de/news" },
  openGraph: {
    title: "News aus der Pflege 2026 | liva",
    description:
      "Pflegereform, neue Leistungsbeträge, MD-Tipps – alles was pflegende Angehörige jetzt wissen müssen. Verständlich erklärt von liva.",
    url: "https://liva-pflege.de/news",
    type: "website",
    siteName: "liva – Orientierung im Pflegesystem",
  },
  keywords: [
    "Pflege News 2026",
    "Pflegereform 2026",
    "Pflegegeld 2026",
    "Pflegeversicherung Änderungen",
    "MD Wartezeit",
    "Pflegeleistungen aktuell",
    "Entlastungsbetrag 2026",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "News aus der Pflege | liva",
  description:
    "Aktuelle Neuigkeiten aus der Pflegepolitik und dem deutschen Pflegesystem – verständlich erklärt für pflegende Angehörige.",
  url: "https://liva-pflege.de/news",
  publisher: {
    "@type": "Organization",
    name: "liva",
    url: "https://liva-pflege.de",
    logo: {
      "@type": "ImageObject",
      url: "https://liva-pflege.de/hero.jpg",
    },
  },
  blogPost: NEWS.slice(0, 5).map((a) => ({
    "@type": "BlogPosting",
    headline: a.titel,
    description: a.beschreibung,
    url: `https://liva-pflege.de/news/${a.slug}`,
    datePublished: a.datum,
    author: { "@type": "Organization", name: "liva" },
  })),
};

export default function NewsPage() {
  return (
    <main className="bg-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero – warm & willkommen */}
      <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 border-b border-[#E0EDE7]">
        <div className="max-w-4xl mx-auto">
          <p className="section-label">News aus der Pflege</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-gray-900 mb-4 leading-tight">
            Willkommen in unserem<br className="hidden sm:block" /> Pflege-Newsroom
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mb-6">
            Das Pflegesystem ändert sich ständig – neue Leistungsbeträge, Gesetzesreformen, MD-Fristen.
            Wir beobachten das für dich und übersetzen alles in klare Antworten:
            Was ändert sich gerade, und was bedeutet das konkret für deine Familie?
          </p>
          {/* Trust-Bar */}
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block" />
              {NEWS.length} Artikel
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block" />
              Zuletzt aktualisiert: {NEWS[0].datum}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block" />
              Kostenlos & werbefrei lesbar
            </span>
          </div>
        </div>
      </section>

      {/* Client-Teil: Newsletter + Filter + Artikel */}
      <NewsClient />

      {/* Bottom CTA */}
      <section className="py-14 px-4 sm:px-6 bg-brand mt-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl sm:text-3xl text-white mb-3">
            Was steht dir persönlich zu?
          </h2>
          <p className="text-white/75 mb-6 text-sm sm:text-base leading-relaxed">
            Starte den kostenlosen Pflegegrad-Rechner – in 5 Minuten weißt du genau welche Leistungen du beantragen kannst.
          </p>
          <Link
            href="/pflegegrad-rechner"
            className="inline-flex items-center gap-2 bg-white text-brand font-semibold px-8 py-4 rounded-2xl hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            Pflegegrad-Rechner starten <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
