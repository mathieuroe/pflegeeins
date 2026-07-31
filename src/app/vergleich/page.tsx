import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Star, Trophy, Shield, Clock, Phone, Bell, Package } from "lucide-react";
import Footer from "@/components/layout/Footer";
import StickyCtaBar from "@/components/vergleich/StickyCtaBar";

export const metadata: Metadata = {
  title: "Hausnotruf Vergleich 2026 & Pflegebox Vergleich – Beste Anbieter | liva",
  description: "Welcher Hausnotruf ist 2026 der beste? Und welche Pflegebox lohnt sich? Unabhängiger Vergleich der Top-Anbieter. Ab Pflegegrad 1 – du zahlst 0 €.",
  keywords: "Hausnotruf Vergleich 2026, bester Hausnotruf, Pflegebox Vergleich, Pflegehilfsmittelbox Anbieter, smartversorgt, Blubox",
  alternates: { canonical: "https://liva-pflege.de/vergleich" },
  openGraph: {
    title: "Hausnotruf & Pflegebox Vergleich 2026 – Testsieger | liva",
    description: "Unabhängiger Vergleich: Welcher Hausnotruf und welche Pflegebox ist die beste? Jetzt kostenlos herausfinden.",
    type: "website",
    locale: "de_DE",
  },
};

const HAUSNOTRUF = [
  {
    rang: 1,
    name: "easierLife",
    badge: "Testsieger",
    bewertung: 4.9,
    preis: "0 € / Monat",
    preisHinweis: "ab Pflegegrad 1 – 100% Pflegekasse",
    vorteile: [
      "Eigener Hersteller – Entwicklung & Produktion in Deutschland",
      "Geräte werden von Caritas, DRK und Malteser eingesetzt",
      "Stationärer & mobiler Hausnotruf verfügbar",
      "24/7 Notrufzentrale in Deutschland",
      "Vollständig von der Pflegekasse übernommen",
    ],
    nachteile: ["Online-Abschluss erforderlich"],
    besonderheit: "Einziger Hersteller im Vergleich – höchste Gerätequalität",
    ctaHref: "/hausnotruf-beantragen?start=1",
    affiliate: null,
    highlight: true,
  },
  {
    rang: 2,
    name: "smartversorgt",
    badge: null,
    bewertung: 4.8,
    preis: "0 € / Monat",
    preisHinweis: "ab Pflegegrad 1 – 100% Pflegekasse",
    vorteile: [
      "Vollständig von der Pflegekasse übernommen",
      "Mobile & stationäre Variante verfügbar",
      "GPS + Sturzalarm inklusive",
      "24/7 Notrufzentrale in Deutschland",
    ],
    nachteile: ["Online-Abschluss nötig"],
    besonderheit: "Beste Erreichbarkeit & einfache Beantragung",
    ctaHref: null,
    affiliate: "https://t.adcell.com/p/click?promoId=307657&slotId=149760&subId=vergleich_hausnotruf_2&param0=https%3A%2F%2Fpflegehase.de%2Fhausnotruf-bestellung%2F",
    highlight: false,
  },
  {
    rang: 3,
    name: "Pflegehase",
    badge: null,
    bewertung: 4.7,
    preis: "0 € / Monat",
    preisHinweis: "ab Pflegegrad 1 – Direktabrechnung mit Pflegekasse",
    vorteile: [
      "Einfache Online-Bestellung ohne Papierkram",
      "Direktabrechnung mit der Pflegekasse",
      "Stationärer & mobiler Hausnotruf verfügbar",
      "Schnelle Lieferung & Inbetriebnahme",
    ],
    nachteile: ["Kein eigener Hersteller – Kooperation mit Partner"],
    besonderheit: "Unkomplizierteste Online-Beantragung",
    ctaHref: null,
    affiliate: "https://t.adcell.com/p/click?promoId=307657&slotId=149760&subId=vergleich_hausnotruf_3&param0=https%3A%2F%2Fpflegehase.de%2Fhausnotruf-bestellung%2F",
    highlight: false,
  },
  {
    rang: 4,
    name: "Gardia",
    badge: null,
    bewertung: 4.5,
    preis: "ab 27 € / Monat",
    preisHinweis: "durch Pflegekasse erstattungsfähig",
    vorteile: [
      "Armband mit integrierter eSIM",
      "21 Tage Akkulaufzeit",
      "GPS-Ortung & automatische Sturzerkennung",
      "Kein Festnetz erforderlich",
    ],
    nachteile: ["Eigenanteil möglich", "Nur mobile Variante"],
    besonderheit: "Bestes Armband mit langer Akkulaufzeit",
    ctaHref: null,
    affiliate: null,
    highlight: false,
  },
  {
    rang: 5,
    name: "Deutsches Rotes Kreuz",
    badge: null,
    bewertung: 4.3,
    preis: "ab 22 € / Monat",
    preisHinweis: "kassenfinanziert möglich",
    vorteile: [
      "Bekannte & vertrauenswürdige Marke",
      "Breites Servicenetz in Deutschland",
      "Stationärer Hausnotruf mit Festnetz",
    ],
    nachteile: ["Nutzt easierLife-Geräte (kein eigener Hersteller)", "Eingeschränkter Online-Abschluss"],
    besonderheit: "Größtes Servicenetz in Deutschland",
    ctaHref: null,
    affiliate: null,
    highlight: false,
  },
  {
    rang: 6,
    name: "Malteser",
    badge: null,
    bewertung: 4.2,
    preis: "ab 23 € / Monat",
    preisHinweis: "kassenfinanziert möglich",
    vorteile: [
      "Bundesweite Abdeckung",
      "Erfahrener Wohlfahrtsanbieter",
      "Stationärer Klassik-Hausnotruf",
    ],
    nachteile: ["Nutzt easierLife-Geräte (kein eigener Hersteller)", "Telefonischer Abschluss nötig"],
    besonderheit: "Bewährter Anbieter mit langer Erfahrung",
    ctaHref: null,
    affiliate: null,
    highlight: false,
  },
];

const PFLEGEBOX = [
  {
    rang: 1,
    name: "Blubox",
    badge: "Empfehlung",
    bewertung: 4.8,
    preis: "0 € / Monat",
    preisHinweis: "bis zu 42 € / Monat – 100% Pflegekasse",
    vorteile: [
      "Deutsches Familienunternehmen",
      "Vollständig von der Pflegekasse übernommen",
      "Lieferung flexibel pause- oder änderbar",
      "Individuell konfigurierbare Produktauswahl",
      "Monatliche Lieferung ohne Mindestlaufzeit",
    ],
    nachteile: [],
    besonderheit: "Flexibelste Pflegebox mit einfachem Wechsel",
    ctaHref: "/pflegebox-beantragen?start=1",
    affiliate: null,
    highlight: true,
  },
  {
    rang: 2,
    name: "Pflegehase",
    badge: null,
    bewertung: 4.7,
    preis: "0 € / Monat",
    preisHinweis: "bis zu 42 € / Monat – Direktabrechnung mit Pflegekasse",
    vorteile: [
      "Einfache Online-Bestellung ohne Papierkram",
      "Direktabrechnung mit der Pflegekasse",
      "Monatliche Lieferung frei Haus",
      "Produktauswahl online anpassbar",
    ],
    nachteile: ["Kein eigener Hersteller – Auswahl aus Partnersortiment"],
    besonderheit: "Unkomplizierteste Online-Beantragung",
    ctaHref: null,
    affiliate: "https://t.adcell.com/p/click?promoId=273407&slotId=149760&subId=vergleich_box_2&param0=https%3A%2F%2Fpflegehase.de%2Fpflegehilfsmittel-bestellung%2F",
    highlight: false,
  },
  {
    rang: 3,
    name: "Pflegetipp",
    badge: null,
    bewertung: 4.6,
    preis: "0 € / Monat",
    preisHinweis: "kassenfinanziert",
    vorteile: [
      "Sehr schnelle Lieferung (1–2 Tage)",
      "Breites Produktsortiment",
    ],
    nachteile: ["Weniger Flexibilität beim Anpassen", "Kaum Bekanntheit"],
    besonderheit: "Schnellste Lieferung im Vergleich",
    ctaHref: null,
    affiliate: null,
    highlight: false,
  },
  {
    rang: 4,
    name: "Pflege4me",
    badge: null,
    bewertung: 4.9,
    preis: "0 € / Monat",
    preisHinweis: "kassenfinanziert",
    vorteile: [
      "Individuell konfigurierbar",
      "Produkte für alle Pflegebedarfe",
      "Einfache Online-Bestellung",
    ],
    nachteile: ["Etwas längere Lieferzeiten", "Eingeschränkter Kundenservice"],
    besonderheit: "Beste Individualisierung",
    ctaHref: null,
    affiliate: null,
    highlight: false,
  },
  {
    rang: 5,
    name: "Satiata",
    badge: null,
    bewertung: 4.7,
    preis: "0 € / Monat",
    preisHinweis: "kassenfinanziert",
    vorteile: [
      "Über 80.000 zufriedene Kunden",
      "Erfahrener Anbieter",
      "Zuverlässige Lieferung",
    ],
    nachteile: ["Weniger Produktauswahl", "Älteres Bestellsystem"],
    besonderheit: "Meiste Kundenerfahrungen",
    ctaHref: null,
    affiliate: null,
    highlight: false,
  },
  {
    rang: 6,
    name: "Domisana",
    badge: null,
    bewertung: 4.6,
    preis: "0 € / Monat",
    preisHinweis: "kassenfinanziert",
    vorteile: [
      "250+ Kooperationspartner",
      "Bundesweite Verfügbarkeit",
      "Zuverlässige Qualität",
    ],
    nachteile: ["Längere Lieferzeiten", "Keine Produktanpassung"],
    besonderheit: "Größtes Partnernetzwerk",
    ctaHref: null,
    affiliate: null,
    highlight: false,
  },
];

function Sterne({ wert }: { wert: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={13}
          className={i <= Math.round(wert) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
        />
      ))}
      <span className="text-sm font-semibold text-gray-700 ml-1">{wert.toFixed(1)}</span>
    </div>
  );
}

function VergleichTabelle({
  eintraege,
  kategorie,
}: {
  eintraege: typeof HAUSNOTRUF;
  kategorie: "hausnotruf" | "pflegebox";
}) {
  return (
    <div className="space-y-3">
      {eintraege.map((e) => (
        <div
          key={e.rang}
          className={`rounded-2xl border-2 bg-white transition-shadow ${
            e.highlight
              ? "border-brand shadow-lg shadow-brand/10"
              : "border-[#E0EDE7]"
          }`}
        >
          {e.highlight && (
            <div className="flex items-center gap-2 bg-brand text-white text-xs font-bold px-4 py-2 rounded-t-[14px]">
              <Trophy size={13} />
              <span>{e.badge ?? "Empfehlung"} – Direkt kostenlos beantragen</span>
            </div>
          )}
          <div className="p-4 sm:p-5">
            <div className="flex items-start gap-4">
              {/* Rang + Name */}
              <div className="flex-shrink-0 text-center w-8">
                <span className={`text-xl font-bold ${e.highlight ? "text-brand" : "text-gray-300"}`}>
                  {e.rang}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-serif text-lg text-gray-900">{e.name}</h3>
                  {e.badge && !e.highlight && (
                    <span className="text-[10px] font-bold bg-brand-light text-brand px-2 py-0.5 rounded-full">
                      {e.badge}
                    </span>
                  )}
                </div>

                <Sterne wert={e.bewertung} />

                <div className="mt-3 grid sm:grid-cols-2 gap-3">
                  {/* Preis */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Preis</p>
                    <p className="font-bold text-gray-900 text-base">{e.preis}</p>
                    <p className="text-xs text-brand font-medium">{e.preisHinweis}</p>
                  </div>

                  {/* Besonderheit */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Besonderheit</p>
                    <p className="text-sm text-gray-700">{e.besonderheit}</p>
                  </div>
                </div>

                {/* Vorteile / Nachteile */}
                <div className="mt-3 grid sm:grid-cols-2 gap-x-4 gap-y-1">
                  <div>
                    {e.vorteile.map((v) => (
                      <div key={v} className="flex items-start gap-1.5 text-xs text-gray-600 mb-1">
                        <CheckCircle2 size={12} className="text-brand flex-shrink-0 mt-0.5" />
                        {v}
                      </div>
                    ))}
                  </div>
                  <div>
                    {e.nachteile.map((n) => (
                      <div key={n} className="flex items-start gap-1.5 text-xs text-gray-400 mb-1">
                        <span className="w-3 h-3 rounded-full border border-gray-300 flex-shrink-0 mt-0.5" />
                        {n}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex-shrink-0 hidden sm:block">
                {e.ctaHref ? (
                  <div className="flex flex-col items-center">
                    <Link href={e.ctaHref} className="btn-primary whitespace-nowrap">
                      Jetzt kostenlos beantragen <ArrowRight size={14} />
                    </Link>
                    <p className="text-[10px] text-gray-400 mt-1">Direkt über liva</p>
                  </div>
                ) : e.affiliate ? (
                  <div className="flex flex-col items-center">
                    <a
                      href={e.affiliate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary whitespace-nowrap"
                    >
                      Jetzt kostenlos beantragen <ArrowRight size={14} />
                    </a>
                    <p className="text-[10px] text-gray-400 mt-1">Über unseren Partner {e.name}</p>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Mobile CTA */}
            {(e.ctaHref || e.affiliate) && (
              <div className="mt-3 sm:hidden">
                {e.ctaHref ? (
                  <>
                    <Link href={e.ctaHref} className="btn-primary w-full justify-center">
                      Jetzt kostenlos beantragen <ArrowRight size={14} />
                    </Link>
                    <p className="text-[10px] text-gray-400 mt-1 text-center">Direkt über liva</p>
                  </>
                ) : (
                  <>
                    <a
                      href={e.affiliate!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full justify-center"
                    >
                      Jetzt kostenlos beantragen <ArrowRight size={14} />
                    </a>
                    <p className="text-[10px] text-gray-400 mt-1 text-center">Über unseren Partner {e.name}</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

const jsonLdItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Hausnotruf & Pflegebox Vergleich 2026",
  "description": "Unabhängiger Vergleich der besten Hausnotruf- und Pflegebox-Anbieter in Deutschland.",
  "itemListElement": [
    ...HAUSNOTRUF.map((e, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": e.name,
      "description": e.besonderheit,
    })),
    ...PFLEGEBOX.map((e, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": e.name,
      "description": e.besonderheit,
    })),
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was kostet ein Hausnotruf wirklich?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein Hausnotruf kostet dich ab Pflegegrad 1 nichts. Die gesetzliche Pflegekasse übernimmt die Kosten bis zu 27 € pro Monat vollständig. Du zahlst keinen Eigenanteil.",
      },
    },
    {
      "@type": "Question",
      "name": "Wie bekomme ich eine Pflegebox?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Du bestellst die Pflegebox einfach online beim Anbieter. Dieser rechnet direkt mit deiner Pflegekasse ab – du bekommst die Box kostenlos nach Hause geliefert. Voraussetzung ist mindestens Pflegegrad 1.",
      },
    },
    {
      "@type": "Question",
      "name": "Kann ich Hausnotruf und Pflegebox gleichzeitig haben?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Beide Leistungen sind unabhängig voneinander und werden von der Pflegekasse getrennt finanziert. Du kannst beides gleichzeitig beantragen und beziehen.",
      },
    },
    {
      "@type": "Question",
      "name": "Was ist in der Pflegebox enthalten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Pflegebox enthält Pflegehilfsmittel wie Einmalhandschuhe, Mundschutz, Bettschutzeinlagen und Desinfektionsmittel. Der genaue Inhalt kann je nach Anbieter variieren und ist oft individuell anpassbar.",
      },
    },
    {
      "@type": "Question",
      "name": "Wie schnell werde ich nach der Beantragung beliefert?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nach erfolgreicher Antragstellung dauert die erste Lieferung in der Regel 3–10 Werktage. smartversorgt und Blubox gehören zu den schnellsten Anbietern.",
      },
    },
  ],
};

export default function VergleichPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <main className="bg-white min-h-screen">
        {/* Hero */}
        <section className="bg-white border-b border-[#E0EDE7] py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <p className="section-label">Unabhängiger Vergleich · Zuletzt aktualisiert: Juli 2026</p>
            <h1 className="font-serif text-4xl sm:text-5xl text-gray-900 leading-tight mb-4">
              Hausnotruf & Pflegebox<br className="hidden sm:block" /> Vergleich 2026
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl leading-relaxed mb-3">
              Du zahlst nichts – beide Leistungen werden ab Pflegegrad 1 vollständig von der Pflegekasse übernommen. Wir haben die wichtigsten Anbieter für dich verglichen.
            </p>
            <p className="text-brand font-semibold text-base mb-6">
              Über 80 % der Berechtigten beantragen es nie. Hol dir, was dir zusteht.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {[
                { icon: Shield, text: "100% von der Pflegekasse" },
                { icon: Clock, text: "Dauert nur 3 Minuten" },
                { icon: Phone, text: "Kein Papierkram" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Icon size={14} className="text-brand" /> {text}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          {/* Sprungnavigation */}
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            <a href="#hausnotruf" className="card p-4 flex items-center gap-3 hover:border-brand transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center flex-shrink-0">
                <Bell size={20} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Hausnotruf Vergleich</p>
                <p className="text-xs text-gray-400">27 € / Monat – Pflegekasse übernimmt</p>
              </div>
              <ArrowRight size={14} className="text-gray-400 ml-auto" />
            </a>
            <a href="#pflegebox" className="card p-4 flex items-center gap-3 hover:border-brand transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center flex-shrink-0">
                <Package size={20} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Pflegebox Vergleich</p>
                <p className="text-xs text-gray-400">Bis 42 € / Monat – 100% kostenlos</p>
              </div>
              <ArrowRight size={14} className="text-gray-400 ml-auto" />
            </a>
          </div>

          {/* Hausnotruf */}
          <section id="hausnotruf" className="mb-14 scroll-mt-6">
            <div className="mb-5">
              <p className="text-[11px] font-bold text-brand uppercase tracking-widest mb-1">Vergleich 2026</p>
              <h2 className="font-serif text-3xl text-gray-900 mb-2">Hausnotruf Anbieter im Vergleich</h2>
              <p className="text-gray-500 text-sm max-w-2xl mb-3">
                Ein Hausnotruf ist ein elektronisches Notrufsystem für zuhause. Per Knopfdruck – am Handgelenk oder als Anhänger – wird eine 24/7-Notrufzentrale alarmiert, die sofort Hilfe schickt. Die gesetzliche Pflegekasse übernimmt die Kosten ab Pflegegrad 1 mit bis zu 27 € pro Monat – du zahlst nichts.
              </p>
              <p className="text-xs text-gray-400">Quellen: GKV-Spitzenverband, SGB XI §40, Stand Juli 2026</p>
            </div>

            {/* Metrik-Legende */}
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-400 mb-4 px-1">
              <span>✓ = Vorteil</span>
              <span>○ = Einschränkung</span>
              <span>⭐ = Bewertung aus Kundenfeedback</span>
            </div>

            <VergleichTabelle eintraege={HAUSNOTRUF} kategorie="hausnotruf" />

            <div className="mt-5 bg-brand-light/30 rounded-xl border border-brand/20 p-4">
              <p className="text-sm text-gray-700">
                <strong>Unser Fazit:</strong> easierLife ist der einzige Hersteller im Vergleich – die Geräte werden von Caritas, DRK und Malteser eingesetzt und gelten als Qualitätsstandard in der Branche. Mit stationärer und mobiler Variante, 24/7-Notrufzentrale und vollständiger Kostenübernahme durch die Pflegekasse ist easierLife unsere klare Empfehlung.
              </p>
              <Link href="/hausnotruf-beantragen?start=1" className="btn-primary mt-3 inline-flex">
                Jetzt kostenlos beantragen <ArrowRight size={14} />
              </Link>
              <p className="text-[10px] text-gray-400 mt-1">Direkt über liva – kostenlos & unverbindlich</p>
            </div>
          </section>

          {/* Pflegebox */}
          <section id="pflegebox" className="mb-14 scroll-mt-6">
            <div className="mb-5">
              <p className="text-[11px] font-bold text-brand uppercase tracking-widest mb-1">Vergleich 2026</p>
              <h2 className="font-serif text-3xl text-gray-900 mb-2">Pflegebox Anbieter im Vergleich</h2>
              <p className="text-gray-500 text-sm max-w-2xl mb-3">
                Eine Pflegebox (Pflegehilfsmittelbox) ist eine monatliche Lieferung mit Verbrauchsmaterialien wie Einmalhandschuhen, Mundschutz, Bettschutzeinlagen und Desinfektionsmitteln. Die Pflegekasse übernimmt die Kosten bis zu 42 € pro Monat – vollständig, ohne Eigenanteil. Beantragbar ab Pflegegrad 1 gemäß §40 SGB XI.
              </p>
              <p className="text-xs text-gray-400">Quellen: GKV-Spitzenverband, SGB XI §40, Stand Juli 2026</p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-400 mb-4 px-1">
              <span>✓ = Vorteil</span>
              <span>○ = Einschränkung</span>
              <span>⭐ = Bewertung aus Kundenfeedback</span>
            </div>

            <VergleichTabelle eintraege={PFLEGEBOX} kategorie="pflegebox" />

            <div className="mt-5 bg-brand-light/30 rounded-xl border border-brand/20 p-4">
              <p className="text-sm text-gray-700">
                <strong>Unser Fazit:</strong> Blubox ist ein deutsches Familienunternehmen und überzeugt durch maximale Flexibilität – du kannst die Box jederzeit pausieren, anpassen oder wechseln.
                Die Inhalte lassen sich individuell auf den Pflegebedarf abstimmen. Und das alles komplett kostenlos über die Pflegekasse.
              </p>
              <Link href="/pflegebox-beantragen?start=1" className="btn-primary mt-3 inline-flex">
                Jetzt kostenlos zusammenstellen <ArrowRight size={14} />
              </Link>
              <p className="text-[10px] text-gray-400 mt-1">Direkt über liva – kostenlos & unverbindlich</p>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-14">
            <h2 className="font-serif text-2xl text-gray-900 mb-5">Häufige Fragen</h2>
            <div className="space-y-3">
              {[
                {
                  f: "Was kostet ein Hausnotruf wirklich?",
                  a: "Ein Hausnotruf kostet dich ab Pflegegrad 1 nichts. Die gesetzliche Pflegekasse übernimmt die Kosten bis zu 27 € pro Monat vollständig. Du zahlst keinen Eigenanteil.",
                },
                {
                  f: "Wie bekomme ich eine Pflegebox?",
                  a: "Du bestellst die Pflegebox einfach online beim Anbieter. Dieser rechnet direkt mit deiner Pflegekasse ab – du bekommst die Box kostenlos nach Hause geliefert. Voraussetzung ist mindestens Pflegegrad 1.",
                },
                {
                  f: "Kann ich Hausnotruf und Pflegebox gleichzeitig haben?",
                  a: "Ja! Beide Leistungen sind unabhängig voneinander. Du kannst sowohl Hausnotruf als auch Pflegebox gleichzeitig beantragen und beziehen – beide werden von der Pflegekasse getrennt finanziert.",
                },
                {
                  f: "Was ist in der Pflegebox enthalten?",
                  a: "Die Pflegebox enthält Pflegehilfsmittel wie Einmalhandschuhe, Mundschutz, Bettschutzeinlagen und Desinfektionsmittel. Der genaue Inhalt kann je nach Anbieter leicht variieren und ist oft individuell anpassbar.",
                },
                {
                  f: "Wie schnell werde ich nach der Beantragung beliefert?",
                  a: "Nach erfolgreicher Antragstellung dauert die erste Lieferung in der Regel 3–10 Werktage, je nach Anbieter. smartversorgt und Blubox gehören zu den schnellsten Anbietern.",
                },
              ].map(({ f, a }) => (
                <div key={f} className="card p-4">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2">{f}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pflegedienst CTA */}
          <section className="rounded-2xl bg-brand-light/20 border border-[#E0EDE7] p-6 text-center mb-6">
            <p className="text-sm font-semibold text-brand mb-1">Mehr Unterstützung gewünscht?</p>
            <h2 className="font-serif text-2xl text-gray-900 mb-2">Auch Pflegeeinrichtungen vergleichen</h2>
            <p className="text-sm text-gray-500 mb-4">
              Vergleiche Pflegedienste, Pflegeheime und Seniorenresidenzen
            </p>
            <Link href="/" className="btn-primary inline-flex text-sm px-6 py-3">
              Pflegeeinrichtung vergleichen <ArrowRight size={15} />
            </Link>
          </section>

          <p className="text-xs text-gray-400 text-center pb-4">
            * Alle Angaben ohne Gewähr. Preise und Leistungen können je nach Pflegekasse variieren. Stand: Juli 2026.
          </p>
        </div>

        <Footer />
      </main>
      <StickyCtaBar />
    </>
  );
}
