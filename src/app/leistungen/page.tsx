import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Info } from "lucide-react";
import Footer from "@/components/layout/Footer";
import LeistungsBoxen from "@/components/leistungen/LeistungsBoxen";
import LeistungenGrid from "@/components/leistungen/LeistungenGrid";
import PflegegradTabelle from "@/components/leistungen/PflegegradTabelle";

export const metadata: Metadata = {
  title: "Pflegeleistungen 2026 – Was dir mit deinem Pflegegrad zusteht | liva",
  description:
    "Alle Leistungen der Pflegeversicherung 2026 im Überblick: Pflegebox, Hausnotruf, Pflegegeld, Entlastungsbetrag, Verhinderungspflege & mehr – verständlich erklärt. Kostenlos prüfen.",
  alternates: {
    canonical: "https://liva-pflege.de/leistungen",
  },
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was ist der Entlastungsbetrag?",
      acceptedAnswer: { "@type": "Answer", text: "Der Entlastungsbetrag beträgt 2026 monatlich 131 Euro. Anspruch haben Pflegebedürftige mit Pflegegrad 1 bis 5, die zu Hause gepflegt werden. Er wird für anerkannte Entlastungsleistungen wie Alltagsbegleitung oder Haushaltshilfe eingesetzt. Rechtsgrundlage: § 45b SGB XI." },
    },
    {
      "@type": "Question",
      name: "Wie hoch ist das Pflegegeld 2026?",
      acceptedAnswer: { "@type": "Answer", text: "Das Pflegegeld beträgt je nach Pflegegrad: Pflegegrad 2: 332 €, Pflegegrad 3: 572 €, Pflegegrad 4: 764 €, Pflegegrad 5: 946 € pro Monat. Es wird ausgezahlt wenn Angehörige oder ehrenamtliche Pflegepersonen die Pflege übernehmen. Rechtsgrundlage: § 37 SGB XI." },
    },
    {
      "@type": "Question",
      name: "Ist die Pflegehilfsmittelbox wirklich kostenlos?",
      acceptedAnswer: { "@type": "Answer", text: "Ja. Die Pflegekasse übernimmt bis zu 42 Euro pro Monat für Pflegehilfsmittel zum Verbrauch (Handschuhe, Einlagen, Desinfektion). Ab Pflegegrad 1. Der Anbieter stellt den Antrag direkt bei der Pflegekasse – für dich entstehen keine Kosten. Rechtsgrundlage: § 40 Abs. 2 SGB XI." },
    },
    {
      "@type": "Question",
      name: "Wer hat Anspruch auf einen Hausnotruf?",
      acceptedAnswer: { "@type": "Answer", text: "Pflegebedürftige ab Pflegegrad 1, die alleine leben oder zeitweise alleine sind, haben Anspruch auf einen Hausnotruf. Die Pflegekasse übernimmt die monatlichen Kosten (ca. 23–30 €). Rechtsgrundlage: § 40 Abs. 1 SGB XI." },
    },
  ],
};

const schemaItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Pflegeleistungen 2026 – Übersicht",
  description: "Alle Leistungen der gesetzlichen Pflegeversicherung in Deutschland (Stand Juni 2026)",
  numberOfItems: 7,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Entlastungsbetrag", description: "131 € pro Monat für Alltagsbegleitung und Haushaltshilfe – ab Pflegegrad 1." },
    { "@type": "ListItem", position: 2, name: "Pflegegeld", description: "332–946 € pro Monat wenn Angehörige die Pflege übernehmen – ab Pflegegrad 2." },
    { "@type": "ListItem", position: 3, name: "Pflegesachleistungen", description: "Bis 2.095 € pro Monat für ambulante Pflegedienste – ab Pflegegrad 2." },
    { "@type": "ListItem", position: 4, name: "Kombiniertes Budget Kurzzeit- und Verhinderungspflege", description: "Bis 3.539 € pro Jahr für Ersatzpflege und Kurzzeitaufenthalte – ab Pflegegrad 2 (seit 01.07.2025)." },
    { "@type": "ListItem", position: 5, name: "Tagespflege", description: "Bis 1.995 € pro Monat für Betreuung in einer Tageseinrichtung – ab Pflegegrad 2." },
    { "@type": "ListItem", position: 6, name: "Wohnraumanpassung", description: "Bis 4.180 € je Umbaumaßnahme für barrierefreie Umbauten – ab Pflegegrad 1." },
    { "@type": "ListItem", position: 7, name: "Pflegehilfsmittelbox", description: "Bis 42 € pro Monat für Verbrauchsmittel wie Handschuhe und Desinfektion – ab Pflegegrad 1." },
  ],
};

export default function LeistungenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaItemList) }} />
      <main>

        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 border-b border-[#E0EDE7]">
          <div className="max-w-4xl mx-auto">
            <p className="section-label">Pflegeleistungen 2026</p>
            <h1 className="font-serif text-4xl sm:text-5xl text-gray-900 mb-4 leading-tight">
              Was dir mit deinem<br className="hidden sm:block" /> Pflegegrad zusteht
            </h1>
            <p className="text-gray-500 text-lg max-w-xl leading-relaxed mb-6">
              Die Pflegeversicherung zahlt mehr als die meisten wissen – viele Leistungen werden nie beantragt. Hier ist alles erklärt, ohne Bürokratie-Deutsch.
            </p>
            {/* Trust Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {[
                { zahl: "6 Mio.", text: "Menschen haben aktuell einen Pflegegrad in Deutschland" },
                { zahl: "86 %", text: "der Pflegebedürftigen werden zu Hause gepflegt" },
                { zahl: "≈ 80 %", text: "der Entlastungsleistungen bleiben ungenutzt" },
              ].map((s) => (
                <div key={s.zahl} className="bg-brand-light/60 rounded-xl px-4 py-3 flex flex-col min-w-[160px]">
                  <span className="font-bold text-brand text-xl leading-none mb-0.5">{s.zahl}</span>
                  <span className="text-xs text-gray-700 leading-snug">{s.text}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/leistungen-check" className="btn-primary inline-flex items-center gap-2">
                Was steht mir zu? <ArrowRight size={15} />
              </Link>
              <Link href="/pflegegrad-rechner" className="btn-secondary inline-flex items-center gap-2">
                Pflegegrad kostenlos berechnen <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Sofort-Leistungen (fix, unverändert) ───────────────── */}
        <section id="leistungen-sofort" className="py-12 px-4 sm:px-6 bg-brand-light/30">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm font-semibold text-brand mb-2">Sofort beantragen – noch heute</p>
            <p className="text-xs text-gray-500 mb-6">Beide Leistungen gelten ab Pflegegrad 1 und sind in wenigen Minuten beantragt.</p>
            <LeistungsBoxen />
          </div>
        </section>

        {/* ── Alle weiteren Leistungen ────────────────────────────── */}
        <section className="py-12 px-4 sm:px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm font-semibold text-gray-900 mb-1">Weitere Leistungen der Pflegekasse</p>
            <p className="text-xs text-gray-500 mb-6">Je nach Pflegegrad – Mehrere Leistungen sind kombinierbar.</p>
            <LeistungenGrid />
          </div>
        </section>

        {/* ── Kombinierbarkeit ────────────────────────────────────── */}
        <section className="py-12 px-4 sm:px-6 bg-brand-light/30 border-t border-[#E0EDE7]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-brand flex items-center justify-center flex-shrink-0 mt-0.5">
                <Info size={15} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-0.5">Diese Leistungen kannst du kombinieren</p>
                <p className="text-xs text-gray-500">Du musst dich nicht entscheiden – viele Leistungen laufen gleichzeitig.</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {[
                {
                  titel: "Pflegegeld + Entlastungsbetrag",
                  text: "Beide Leistungen laufen unabhängig voneinander – das Pflegegeld kürzt den Entlastungsbetrag nicht.",
                  beispiel: "Bis zu 463 € / Monat bei PG 2",
                },
                {
                  titel: "Pflegesachleistungen + Entlastungsbetrag",
                  text: "Auch wer einen Pflegedienst nutzt, bekommt den Entlastungsbetrag zusätzlich.",
                  beispiel: "Bis zu 892 € / Monat bei PG 2",
                },
                {
                  titel: "Tagespflege + Pflegegeld",
                  text: "Tagespflege-Budget und Pflegegeld dürfen voll kombiniert werden (§ 41 Abs. 4 SGB XI).",
                  beispiel: "Bis zu 1.021 € / Monat bei PG 2",
                },
                {
                  titel: "Pflegehilfsmittelbox + Hausnotruf",
                  text: "Beide Leistungen gelten ab PG 1 und laufen unabhängig voneinander – auch parallel zu Pflegegeld.",
                  beispiel: "Zusätzlich 69 € / Monat ab PG 1",
                },
              ].map((k) => (
                <div key={k.titel} className="bg-white rounded-2xl px-4 py-4 border border-[#E0EDE7]">
                  <div className="flex items-start gap-2 mb-2">
                    <Check size={13} className="text-brand flex-shrink-0 mt-0.5" />
                    <p className="text-xs font-semibold text-gray-900 leading-snug">{k.titel}</p>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-2">{k.text}</p>
                  <span className="text-[10px] font-semibold text-brand bg-brand-light/70 rounded-full px-2.5 py-1">{k.beispiel}</span>
                </div>
              ))}
            </div>
            <PflegegradTabelle />
            <p className="text-[10px] text-gray-400 mt-3 ml-1">Quellen: §§ 36–45b SGB XI · GKV-Spitzenverband · Bundesministerium für Gesundheit (Stand Juli 2026)</p>
          </div>
        </section>

        {/* ── Mid-Page CTA (Pflegegrad-Rechner) ──────────────────── */}
        <section className="py-10 px-4 sm:px-6 bg-brand-light/40 border-y border-[#E0EDE7]">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm font-semibold text-brand mb-2">Du kennst deinen Pflegegrad noch nicht?</p>
            <h2 className="font-serif text-2xl text-gray-900 mb-3">In 5 Minuten weißt du, welche Leistungen dir zustehen.</h2>
            <Link href="/pflegegrad-rechner" className="btn-primary inline-flex text-sm px-6 py-3">
              Pflegegrad kostenlos berechnen <ArrowRight size={15} />
            </Link>
            <p className="text-xs text-gray-400 mt-3">Anonym · Kein Login · Orientiert am neuen Begutachtungsassessment (NBA)</p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
