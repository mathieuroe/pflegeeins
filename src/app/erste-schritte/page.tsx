import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Erste Schritte – Wie funktioniert Pflege in Deutschland? | liva",
  description: "Was ist ein Pflegegrad? Wie beantrage ich ihn? Was passiert beim MD? Alle Infos in einfacher Sprache.",
};

const schritte = [
  { nr: "01", title: "Was ist ein Pflegegrad?", text: "Ein Pflegegrad bestimmt wie viel Unterstützung jemand im Alltag braucht – und wie viel Geld die Pflegekasse dafür zahlt. Es gibt 5 Pflegegrade, von leichter Beeinträchtigung (PG 1) bis zur schwersten Pflegebedürftigkeit (PG 5).", tag: "Grundwissen" },
  { nr: "02", title: "Wer hat Anspruch?", text: "Wer mindestens 6 Monate lang täglich Hilfe braucht – beim Aufstehen, Essen, Waschen, Orientieren – hat Anspruch. Das gilt für ältere Menschen genauso wie für Menschen mit Behinderungen oder chronischen Erkrankungen.", tag: "Anspruch" },
  { nr: "03", title: "Wie beantrage ich einen Pflegegrad?", text: "Du rufst die Pflegekasse an (dieselbe wie die Krankenkasse) und sagst: \"Ich moechte einen Pflegegrad beantragen.\" Dann schicken sie dir ein Formular oder erklären den Online-Weg. Der Antrag selbst dauert ca. 15 Minuten.", tag: "Antrag" },
  { nr: "04", title: "Was ist der MD-Besuch?", text: "Nach dem Antrag kommt jemand vom Medizinischen Dienst (MD) vorbei und schaut sich die Situation an. Das Gespräch dauert ca. 45–60 Minuten. Der MD bewertet die Selbstständigkeit in 6 Bereichen und empfiehlt einen Pflegegrad.", tag: "MD" },
  { nr: "05", title: "Was passiert nach dem Bescheid?", text: "Du bekommst per Post einen Bescheid mit dem Pflegegrad. Ab diesem Moment hast du Anspruch auf alle Leistungen – rückwirkend ab Antragsdatum. Jetzt ist der Moment um Pflegebox, Hausnotruf und Co. zu beantragen.", tag: "Nach dem Bescheid" },
  { nr: "06", title: "Was wenn der Pflegegrad zu niedrig ist?", text: "Du hast 1 Monat Zeit um Widerspruch einzulegen. Einfach schriftlich an die Pflegekasse schreiben: \"Ich lege Widerspruch gegen den Bescheid vom [Datum] ein.\" In ca. 35% aller Faelle wird der PG heraufgestuft.", tag: "Widerspruch" },
];

export default function ErsteSchrittePage() {
  return (
    <main>
      <section className="bg-white py-16 px-4 sm:px-6 border-b border-[#E0EDE7]">
        <div className="max-w-3xl mx-auto">
          <p className="section-label">Ratgeber</p>
          <h1 className="font-serif text-5xl text-gray-900 mb-4">Erste Schritte in der Pflege</h1>
          <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
            Das Pflegesystem ist komplex – aber die wichtigsten Schritte sind einfacher als du denkst. Hier erklären wir wie alles funktioniert, ohne Bürokratie-Deutsch.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-4">
          {schritte.map((s) => (
            <div key={s.nr} className="card bg-white p-6 flex gap-5">
              <div className="hidden sm:block flex-shrink-0">
                <span className="font-serif text-4xl font-bold text-[#E0EDE7]">{s.nr}</span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h2 className="font-semibold text-gray-900">{s.title}</h2>
                  <span className="text-xs bg-brand-light text-brand font-semibold px-2.5 py-0.5 rounded-full">{s.tag}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-brand-hover">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl text-white mb-4">Bereit loszulegen?</h2>
          <p className="text-white/70 mb-8">Wir begleiten dich – von Anfang an, kostenlos.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-white text-brand font-semibold px-8 py-4 rounded-full hover:bg-gray-50 transition-colors">
            Jetzt starten <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
