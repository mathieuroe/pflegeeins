import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import Footer from "@/components/layout/Footer";
import HeroClient from "@/components/vergleich/HeroClient";

const TRUST_STATS = [
  { zahl: "6 Mio.", text: "Menschen haben aktuell einen Pflegegrad in Deutschland" },
  { zahl: "86 %", text: "der Pflegebedürftigen werden zu Hause gepflegt" },
  { zahl: "≈ 80 %", text: "der Entlastungsleistungen bleiben ungenutzt" },
];

const WIE_ES_FUNKTIONIERT = [
  { n: "1", titel: "Leistung wählen", text: "Sag uns was du brauchst – Hausnotruf, Pflegebox oder einen Pflegedienst." },
  { n: "2", titel: "Vergleichen", text: "Bewertungen, Leistungen und Entfernung auf einen Blick." },
  { n: "3", titel: "Kostenlos anfragen", text: "Wir leiten deine Anfrage weiter – du wirst direkt kontaktiert." },
];

const TESTIMONIALS = [
  {
    text: "In 5 Minuten hatte ich drei Pflegedienste verglichen und einen Rückruf erhalten. So einfach hätte ich das nicht erwartet.",
    autor: "Thomas R., pflegender Ehemann",
    sterne: 5,
  },
  {
    text: "Endlich eine Seite die mir wirklich hilft. Kein Fachjargon, kein Papierkram – einfach Ergebnisse.",
    autor: "Maria K., Tochter eines Pflegebedürftigen",
    sterne: 5,
  },
];

export default function HomePage() {
  return (
    <main>
      {/* ── Hero mit Leistungsauswahl ─────────────────────────── */}
      <Suspense fallback={<div className="h-64" />}>
        <HeroClient />
      </Suspense>

      {/* ── Trust Stats ──────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E0EDE7] py-6 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-3">
          {TRUST_STATS.map((s) => (
            <div key={s.zahl} className="bg-brand-light/60 rounded-xl px-4 py-3 flex flex-col">
              <span className="font-bold text-brand text-xl leading-none mb-0.5">{s.zahl}</span>
              <span className="text-xs text-gray-700 leading-snug">{s.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Wie es funktioniert ──────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 bg-white border-b border-[#E0EDE7]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] font-bold text-brand uppercase tracking-widest mb-1 text-center">So einfach geht's</p>
          <h2 className="font-serif text-3xl text-gray-900 text-center mb-8">In 3 Schritten zur passenden Leistung</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {WIE_ES_FUNKTIONIERT.map((s) => (
              <div key={s.n} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-brand flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">{s.n}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{s.titel}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6 bg-white border-b border-[#E0EDE7]">
        <div className="max-w-4xl mx-auto">
          <p className="font-serif text-2xl text-gray-900 text-center mb-6">Was andere sagen</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.autor} className="card p-5">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.sterne)].map((_, i) => (
                    <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3 italic">"{t.text}"</p>
                <p className="text-xs text-gray-400">— {t.autor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pflegegrad-Rechner CTA ───────────────────────────────── */}
      <section className="py-10 px-4 sm:px-6 bg-brand-light/20 border-b border-[#E0EDE7]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="text-sm font-semibold text-brand mb-1">Pflegegrad noch unklar?</p>
            <h2 className="font-serif text-2xl text-gray-900 mb-1">In 5 Minuten weißt du deinen voraussichtlichen Pflegegrad.</h2>
            <p className="text-xs text-gray-400">Anonym · Kein Login · Basiert auf dem offiziellen NBA-Begutachtungsverfahren</p>
          </div>
          <Link href="/pflegegrad-rechner" className="btn-primary inline-flex text-sm px-6 py-3 whitespace-nowrap flex-shrink-0">
            Kostenlos ermitteln <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
