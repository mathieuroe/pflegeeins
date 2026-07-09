import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { RATGEBER } from "@/lib/content-data";

export const metadata: Metadata = {
  title: "Ratgeber Pflege 2026 – Erste Schritte, Pflegegrad & Leistungen | liva",
  description:
    "Wie beantrage ich einen Pflegegrad? Was passiert beim MD? Welche Leistungen stehen mir zu? Alle wichtigen Themen – verständlich, aktuell, kostenlos.",
  alternates: {
    canonical: "https://liva-pflege.de/ratgeber",
  },
};

const schemaHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Pflegegrad beantragen – Schritt für Schritt",
  description: "So beantragst du einen Pflegegrad in Deutschland: vom ersten Anruf bei der Pflegekasse bis zum Bescheid.",
  step: [
    { "@type": "HowToStep", position: 1, name: "Was ist ein Pflegegrad?", text: "Ein Pflegegrad bestimmt, wie viel Unterstützung jemand täglich braucht – und wie viel Geld die Pflegekasse zahlt. Es gibt 5 Pflegegrade (PG 1–5)." },
    { "@type": "HowToStep", position: 2, name: "Wer hat Anspruch?", text: "Wer mindestens 6 Monate lang täglich Hilfe benötigt – beim Aufstehen, Essen, Waschen oder Orientieren – hat Anspruch auf einen Pflegegrad (§14 SGB XI)." },
    { "@type": "HowToStep", position: 3, name: "Pflegegrad beantragen", text: "Ruf deine Pflegekasse an (dieselbe wie die Krankenkasse) und sage: Ich moechte einen Pflegegrad beantragen. Der Antrag selbst dauert ca. 15 Minuten." },
    { "@type": "HowToStep", position: 4, name: "MD-Besuch", text: "Der Medizinische Dienst (MD) kommt vorbei und bewertet die Selbstständigkeit in 6 Lebensbereichen. Das Gespräch dauert ca. 45–60 Minuten." },
    { "@type": "HowToStep", position: 5, name: "Bescheid erhalten", text: "Du bekommst per Post einen Bescheid. Alle Leistungen gelten rückwirkend ab Antragsdatum – jetzt Pflegebox, Hausnotruf & Co. beantragen." },
    { "@type": "HowToStep", position: 6, name: "Widerspruch einlegen", text: "Ist der Pflegegrad zu niedrig? Du hast 1 Monat Zeit für einen schriftlichen Widerspruch. In ca. 35 % aller Fälle wird der Pflegegrad heraufgestuft." },
  ],
};

const SCHRITTE = [
  {
    nr: "01",
    title: "Was ist ein Pflegegrad?",
    text: "Ein Pflegegrad bestimmt, wie viel Unterstützung jemand täglich braucht – und wie viel Geld die Pflegekasse zahlt. Es gibt 5 Pflegegrade, von leichter Beeinträchtigung (PG 1) bis zur schwersten Pflegebedürftigkeit (PG 5).",
    tag: "Grundwissen",
    link: null,
  },
  {
    nr: "02",
    title: "Wer hat Anspruch?",
    text: "Wer mindestens 6 Monate lang täglich Hilfe benötigt – beim Aufstehen, Essen, Waschen oder Orientieren – hat Anspruch (§14 SGB XI). Das gilt für ältere Menschen genauso wie für Menschen mit Behinderungen oder chronischen Erkrankungen.",
    tag: "Anspruch",
    link: null,
  },
  {
    nr: "03",
    title: "Wie beantrage ich einen Pflegegrad?",
    text: "Ruf deine Pflegekasse an (dieselbe wie die Krankenkasse) und sage: 'Ich möchte einen Pflegegrad beantragen.' Sie schicken dir ein Formular oder erklären den Online-Weg. Der Antrag selbst dauert ca. 15 Minuten.",
    tag: "Antrag",
    link: "/pflegegrad-rechner",
    linkLabel: "Vorab Pflegegrad einschätzen",
  },
  {
    nr: "04",
    title: "Was ist der MD-Besuch?",
    text: "Nach dem Antrag kommt jemand vom Medizinischen Dienst (MD) vorbei. Das Gespräch dauert ca. 45–60 Minuten. Der MD bewertet die Selbstständigkeit in 6 Lebensbereichen und empfiehlt einen Pflegegrad.",
    tag: "MD",
    link: "/ratgeber/mdk-besuch-vorbereitung",
    linkLabel: "MD-Besuch vorbereiten",
  },
  {
    nr: "05",
    title: "Was passiert nach dem Bescheid?",
    text: "Du bekommst per Post einen Bescheid mit dem Pflegegrad. Alle Leistungen gelten rückwirkend ab Antragsdatum. Jetzt Pflegebox, Hausnotruf und Entlastungsbetrag beantragen – am besten sofort.",
    tag: "Nach dem Bescheid",
    link: "/leistungen",
    linkLabel: "Alle Leistungen im Überblick",
  },
  {
    nr: "06",
    title: "Was tun wenn der Pflegegrad zu niedrig ist?",
    text: "Du hast 1 Monat Zeit für einen Widerspruch – einfach schriftlich an die Pflegekasse: 'Ich lege Widerspruch gegen den Bescheid vom [Datum] ein.' In ca. 35 % aller Fälle wird der Pflegegrad heraufgestuft.",
    tag: "Widerspruch",
    link: null,
  },
];

export default function RatgeberPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaHowTo) }}
      />
      <main>

        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 border-b border-[#E0EDE7]">
          <div className="max-w-4xl mx-auto">
            <p className="section-label">Ratgeber & Erste Schritte</p>
            <h1 className="font-serif text-4xl sm:text-5xl text-gray-900 mb-4 leading-tight">
              Pflege verstehen –<br className="hidden sm:block" /> von Anfang an.
            </h1>
            <p className="text-gray-500 text-lg max-w-xl leading-relaxed mb-6">
              Wie beantrage ich einen Pflegegrad? Was passiert beim MD? Welche Leistungen stehen mir zu? Hier findest du alles – in einfacher Sprache, ohne Bürokratie-Deutsch.
            </p>
            <Link href="/pflegegrad-rechner" className="btn-secondary">
              Pflegegrad kostenlos berechnen <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        {/* ── Erste Schritte ──────────────────────────────────────── */}
        <section className="py-14 px-4 sm:px-6 bg-gray-50 border-b border-[#E0EDE7]">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-semibold text-brand mb-1">Schritt für Schritt</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Pflegegrad beantragen – so funktioniert es</h2>
            <p className="text-sm text-gray-500 mb-8">Von der ersten Frage bis zum Bescheid – die 6 wichtigsten Schritte im Überblick.</p>
            <div className="space-y-3">
              {SCHRITTE.map((s) => (
                <div key={s.nr} className="card bg-white p-5 flex gap-5 items-start">
                  <div className="hidden sm:block flex-shrink-0 w-10 text-right">
                    <span className="font-serif text-3xl font-bold text-[#E0EDE7]">{s.nr}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="font-semibold text-gray-900 text-sm">{s.title}</h3>
                      <span className="text-xs bg-brand-light text-brand font-semibold px-2.5 py-0.5 rounded-full">{s.tag}</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{s.text}</p>
                    {s.link && (
                      <Link href={s.link} className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand mt-2 hover:underline">
                        <CheckCircle2 size={12} /> {s.linkLabel}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Ratgeber Artikel ────────────────────────────────────── */}
        <section className="py-14 px-4 sm:px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-semibold text-brand mb-1">Ratgeber</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Alle Themen im Detail</h2>
            <p className="text-sm text-gray-500 mb-8">Pflegebox, MD, Entlastungsbetrag, Verhinderungspflege – verständlich und aktuell erklärt.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {RATGEBER.map((a) =>
                a.affiliate ? (
                  <div key={a.slug} className="card bg-white p-5 flex flex-col">
                    <span className="text-xs font-semibold bg-brand-light text-brand px-3 py-1 rounded-full self-start mb-3">{a.kategorie}</span>
                    <Link href={`/ratgeber/${a.slug}`} className="group flex-1">
                      <h3 className="font-semibold text-gray-900 leading-snug mb-2 text-sm group-hover:text-brand transition-colors">{a.titel}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed mb-4">{a.beschreibung}</p>
                    </Link>
                    <a
                      href={a.affiliate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full justify-center text-xs mb-3"
                    >
                      Jetzt kostenlos beantragen <ArrowRight size={13} />
                    </a>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1.5"><Clock size={11} /> {a.lesezeit}</span>
                      <span>{a.datum}</span>
                    </div>
                  </div>
                ) : (
                  <Link key={a.slug} href={`/ratgeber/${a.slug}`} className="card bg-white p-5 flex flex-col group hover:shadow-card-hover transition-shadow">
                    <span className="text-xs font-semibold bg-brand-light text-brand px-3 py-1 rounded-full self-start mb-3">{a.kategorie}</span>
                    <h3 className="font-semibold text-gray-900 leading-snug mb-2 text-sm group-hover:text-brand transition-colors">{a.titel}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed flex-1 mb-4">{a.beschreibung}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1.5"><Clock size={11} /> {a.lesezeit}</span>
                      <span>{a.datum}</span>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ──────────────────────────────────────────── */}
        <section className="py-14 px-4 sm:px-6 bg-brand-hover">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-4xl text-white mb-4">Welcher Pflegegrad ist es bei dir?</h2>
            <p className="text-white/70 mb-8 leading-relaxed">In 5 Minuten hast du eine fundierte Einschätzung – anonym, kostenlos, ohne Anmeldung.</p>
            <Link href="/pflegegrad-rechner" className="inline-flex items-center gap-2 bg-white text-brand font-semibold px-8 py-4 rounded-full hover:bg-gray-50 transition-colors">
              Pflegegrad kostenlos einschätzen <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
