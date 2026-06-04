"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Users, HeartHandshake, Building2, Battery, HelpCircle, Shield, HandHelping, Package, Bell, Mail, ListChecks, ClipboardList } from "lucide-react";
import LeadForm from "./LeadForm";
import Checkliste from "./Checkliste";

const fade = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };

type Modus = "leistungen" | "checkliste" | null;

type PGLeistung = { name: string; betrag: string };
const PG_LEISTUNGEN: Record<number, PGLeistung[]> = {
  1: [
    { name: "Pflegebox (Pflegehilfsmittel)", betrag: "42 € / Monat" },
    { name: "Hausnotruf-Zuschuss", betrag: "25,50 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Wohnraumanpassung", betrag: "bis 4.180 €" },
  ],
  2: [
    { name: "Pflegebox (Pflegehilfsmittel)", betrag: "42 € / Monat" },
    { name: "Hausnotruf-Zuschuss", betrag: "25,50 € / Monat" },
    { name: "Pflegegeld", betrag: "332 € / Monat" },
    { name: "Pflegesachleistungen", betrag: "724 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Verhinderungspflege", betrag: "bis 1.612 € / Jahr" },
  ],
  3: [
    { name: "Pflegebox (Pflegehilfsmittel)", betrag: "42 € / Monat" },
    { name: "Hausnotruf-Zuschuss", betrag: "25,50 € / Monat" },
    { name: "Pflegegeld", betrag: "572 € / Monat" },
    { name: "Pflegesachleistungen", betrag: "1.363 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Kurzzeitpflege", betrag: "1.774 € / Jahr" },
    { name: "Verhinderungspflege", betrag: "bis 1.612 € / Jahr" },
  ],
  4: [
    { name: "Pflegebox (Pflegehilfsmittel)", betrag: "42 € / Monat" },
    { name: "Hausnotruf-Zuschuss", betrag: "25,50 € / Monat" },
    { name: "Pflegegeld", betrag: "764 € / Monat" },
    { name: "Pflegesachleistungen", betrag: "1.693 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Verhinderungspflege", betrag: "bis 1.612 € / Jahr" },
    { name: "Kurzzeitpflege", betrag: "1.774 € / Jahr" },
  ],
  5: [
    { name: "Pflegebox (Pflegehilfsmittel)", betrag: "42 € / Monat" },
    { name: "Hausnotruf-Zuschuss", betrag: "25,50 € / Monat" },
    { name: "Pflegegeld", betrag: "946 € / Monat" },
    { name: "Pflegesachleistungen", betrag: "2.095 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Verhinderungspflege", betrag: "bis 1.612 € / Jahr" },
    { name: "Kurzzeitpflege", betrag: "1.774 € / Jahr" },
  ],
};

const WOHNSITUATIONEN = [
  { id: "selbst", label: "Zuhause – ich pflege selbst", icon: <Home size={20} className="text-brand" /> },
  { id: "dienst", label: "Zuhause – ein Pflegedienst kommt", icon: <HeartHandshake size={20} className="text-brand" /> },
  { id: "beides", label: "Zuhause – ich pflege und ein Dienst kommt", icon: <Users size={20} className="text-brand" /> },
  { id: "heim", label: "Im Pflegeheim", icon: <Building2 size={20} className="text-brand" /> },
];

const HERAUSFORDERUNGEN = [
  { id: "erschoepft", label: "Ich bin oft erschöpft und komme kaum zur Ruhe", icon: <Battery size={20} className="text-brand" /> },
  { id: "unsicher", label: "Ich weiß nicht ob wir alles richtig machen", icon: <HelpCircle size={20} className="text-brand" /> },
  { id: "familie", label: "Die Familie ist sich nicht immer einig", icon: <Users size={20} className="text-brand" /> },
  { id: "sicherheit", label: "Ich mache mir Sorgen ob zuhause alles sicher ist", icon: <Shield size={20} className="text-brand" /> },
  { id: "unterstuetzung", label: "Ich bräuchte einfach mehr Unterstützung im Alltag", icon: <HandHelping size={20} className="text-brand" /> },
];

const ERGEBNIS_TEXT: Record<string, { titel: string; text: string }> = {
  erschoepft: {
    titel: "Du trägst gerade sehr viel.",
    text: "Pflegende Angehörige sind oft die unsichtbaren Helden – und die, die am seltensten gefragt werden wie es ihnen geht. Das ist keine Schwäche. Es gibt Möglichkeiten die genau für dich gemacht sind.",
  },
  unsicher: {
    titel: "Du machst das besser als du denkst.",
    text: "Niemand wird als Pflegeexperte geboren. Das Gefühl 'mache ich das richtig?' kennen fast alle. Lass uns gemeinsam Klarheit schaffen.",
  },
  familie: {
    titel: "Pflege bringt Familien an ihre Grenzen – das ist normal.",
    text: "Wer entscheidet was das Beste ist? Wer übernimmt wie viel? Eine strukturierte Aufgabenverteilung hilft mehr als man denkt.",
  },
  sicherheit: {
    titel: "Sicherheit zuhause ist kein Luxus.",
    text: "Sturzgefahr, Orientierungsprobleme, alleine sein – reale Risiken. Viele davon lassen sich mit den richtigen Mitteln deutlich entschärfen.",
  },
  unterstuetzung: {
    titel: "Mehr Unterstützung annehmen ist keine Schwäche.",
    text: "Viele organisieren die Pflege komplett alleine. Aber: Unterstützung annehmen ist klug – und oft einfacher als gedacht.",
  },
};

const PG_LABELS = ["", "PG 1", "PG 2", "PG 3", "PG 4", "PG 5"];

function buildMailtoLink(pflegegrad: number): string {
  const subject = encodeURIComponent("Antrag auf Pflegeleistungen – Bitte um Beratungstermin");
  const body = encodeURIComponent(
    `Sehr geehrte Damen und Herren,\n\n` +
    `ich bin Angehöriger einer pflegebedürftigen Person mit Pflegegrad ${pflegegrad} und möchte sicherstellen, dass alle zustehenden Leistungen beantragt sind.\n\n` +
    `Ich bitte um:\n` +
    `1. Einen kostenlosen Pflegeberatungstermin nach §7a SGB XI\n` +
    `2. Eine Übersicht aller Leistungen für Pflegegrad ${pflegegrad}\n` +
    `3. Informationen zur Beantragung von Pflegehilfsmitteln (§40 SGB XI)\n` +
    `4. Informationen zum Hausnotruf-Zuschuss (§40 SGB XI)\n\n` +
    `Bitte nehmen Sie Kontakt mit mir auf.\n\nMit freundlichen Grüßen`
  );
  return `mailto:?subject=${subject}&body=${body}`;
}

export default function PfadB() {
  const [step, setStep] = useState(0);
  const [pflegegrad, setPflegegrad] = useState<number | null>(null);
  const [modus, setModus] = useState<Modus>(null);
  const [wohnsituation, setWohnsituation] = useState<string | null>(null);
  const [herausforderung, setHerausforderung] = useState<string | null>(null);

  const ergebnisText = herausforderung ? ERGEBNIS_TEXT[herausforderung] : null;

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">

        {/* SCHRITT 1 – Pflegegrad */}
        {step === 0 && (
          <motion.div key="step0" {...fade} transition={{ duration: 0.3 }}>
            <p className="section-label">Schritt 1 von 2</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Welchen Pflegegrad habt ihr?</h2>
            <p className="text-gray-500 mb-8">Das hilft uns einzuschätzen was euch zusteht.</p>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((pg) => (
                <button
                  key={pg}
                  onClick={() => { setPflegegrad(pg); setStep(1); }}
                  className={`rounded-full py-2.5 text-sm font-semibold border transition-all ${
                    pflegegrad === pg
                      ? "bg-brand text-white border-brand"
                      : "bg-white text-gray-700 border-[#E0EDE7] hover:border-brand hover:text-brand"
                  }`}
                >
                  PG {pg}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* SCHRITT 2 – Modus wählen */}
        {step === 1 && pflegegrad && (
          <motion.div key="step1" {...fade} transition={{ duration: 0.3 }}>
            <p className="section-label">Schritt 2 von 2</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Was möchtest du?</h2>
            <p className="text-gray-500 mb-8">Wähle was gerade besser passt.</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => { setModus("leistungen"); setStep(2); }}
                className={`flex flex-col text-left p-5 rounded-[12px] border-2 transition-all ${
                  modus === "leistungen" ? "border-brand bg-brand-light" : "border-[#E0EDE7] bg-white hover:border-brand/40"
                }`}
              >
                <ClipboardList size={24} className="text-brand mb-3" />
                <p className="font-semibold text-gray-900 mb-1">Leistungen prüfen</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Ich möchte wissen was mir mit {PG_LABELS[pflegegrad]} zusteht und was ich noch nicht beantragt habe.
                </p>
              </button>

              <button
                onClick={() => { setModus("checkliste"); setStep(5); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className={`flex flex-col text-left p-5 rounded-[12px] border-2 transition-all ${
                  modus === "checkliste" ? "border-brand bg-brand-light" : "border-[#E0EDE7] bg-white hover:border-brand/40"
                }`}
              >
                <ListChecks size={24} className="text-brand mb-3" />
                <p className="font-semibold text-gray-900 mb-1">Checkliste anzeigen</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Ich möchte wissen was ich organisieren, prüfen und nicht vergessen darf.
                </p>
              </button>
            </div>

            <button onClick={() => setStep(0)} className="btn-ghost">← Zurück</button>
          </motion.div>
        )}

        {/* LEISTUNGEN – Wohnsituation */}
        {step === 2 && (
          <motion.div key="step2" {...fade} transition={{ duration: 0.3 }}>
            <p className="section-label">Leistungen – Schritt 1</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Wie ist die Wohnsituation?</h2>
            <p className="text-gray-500 mb-8">Wo lebt die pflegebedürftige Person gerade?</p>
            <div className="space-y-3 mb-8">
              {WOHNSITUATIONEN.map((w) => (
                <button
                  key={w.id}
                  onClick={() => { setWohnsituation(w.id); setStep(3); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-[12px] border-2 text-left transition-all ${
                    wohnsituation === w.id ? "border-brand bg-brand-light" : "border-[#E0EDE7] bg-white hover:border-brand/40"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-light flex items-center justify-center flex-shrink-0">{w.icon}</div>
                  <span className="font-medium text-gray-900 text-sm">{w.label}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="btn-ghost">← Zurück</button>
          </motion.div>
        )}

        {/* LEISTUNGEN – Herausforderung */}
        {step === 3 && (
          <motion.div key="step3" {...fade} transition={{ duration: 0.3 }}>
            <p className="section-label">Leistungen – Schritt 2</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Wie geht es dir gerade?</h2>
            <p className="text-gray-500 mb-8">Wähle was am ehesten zutrifft.</p>
            <div className="space-y-3 mb-8">
              {HERAUSFORDERUNGEN.map((h) => (
                <button
                  key={h.id}
                  onClick={() => { setHerausforderung(h.id); setStep(4); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-[12px] border-2 text-left transition-all ${
                    herausforderung === h.id ? "border-brand bg-brand-light" : "border-[#E0EDE7] bg-white hover:border-brand/40"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-light flex items-center justify-center flex-shrink-0">{h.icon}</div>
                  <span className="font-medium text-gray-900 text-sm">{h.label}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="btn-ghost">← Zurück</button>
          </motion.div>
        )}

        {/* LEISTUNGEN – Ergebnis */}
        {step === 4 && ergebnisText && pflegegrad && (
          <motion.div key="step4" {...fade} transition={{ duration: 0.3 }} className="space-y-8">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h2 className="font-serif text-2xl text-gray-900 mb-3">{ergebnisText.titel}</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{ergebnisText.text}</p>
            </div>

            {/* Pflegebox + Hausnotruf */}
            <div>
              <p className="section-label mb-3">Als erstes – immer</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="card p-5">
                  <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center mb-3">
                    <Package size={22} className="text-brand" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Pflegebox</h3>
                  <p className="text-brand font-bold text-sm mb-2">42 € / Monat – kostenlos</p>
                  <p className="text-gray-500 text-xs leading-relaxed">Handschuhe, Desinfektion, Bettschutz – jeden Monat nach Hause. Pflegekasse zahlt vollständig.</p>
                </div>
                <div className="card p-5">
                  <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center mb-3">
                    <Bell size={22} className="text-brand" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Hausnotruf</h3>
                  <p className="text-brand font-bold text-sm mb-2">ab 0 € / Monat</p>
                  <p className="text-gray-500 text-xs leading-relaxed">Pflegekasse zahlt 25,50 € / Monat. Bei günstigen Anbietern entstehen keine Kosten.</p>
                </div>
              </div>
            </div>

            {/* Alle Leistungen */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Alle Leistungen mit {PG_LABELS[pflegegrad]}</p>
              <div className="space-y-2 mb-4">
                {PG_LEISTUNGEN[pflegegrad]?.map((l) => (
                  <div key={l.name} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                    <span className="text-sm text-gray-700">{l.name}</span>
                    <span className="text-xs text-brand font-bold">{l.betrag}</span>
                  </div>
                ))}
              </div>
              <a href={buildMailtoLink(pflegegrad)} className="btn-secondary text-sm inline-flex">
                <Mail size={15} /> Anschreiben an Pflegekasse öffnen
              </a>
            </div>

            <div className="border-t border-[#E0EDE7] pt-8">
              <LeadForm
                title="Wir helfen euch die Leistungen zu beantragen"
                subtitle="Kostenlos, persönlich – auf dein Tempo."
                cta="Jetzt kostenlos melden"
                path="pfad-b"
                pflegegrad={`PG ${pflegegrad}`}
              />
            </div>
            <button onClick={() => setStep(3)} className="btn-ghost">← Zurück</button>
          </motion.div>
        )}

        {/* CHECKLISTE */}
        {step === 5 && pflegegrad && (
          <motion.div key="step5" {...fade} transition={{ duration: 0.3 }} className="space-y-6">
            <div>
              <p className="section-label mb-1">Dein persönlicher Aktionsplan</p>
              <h2 className="font-serif text-3xl text-gray-900 mb-2">Was ihr nicht vergessen dürft</h2>
              <p className="text-gray-500 text-sm">Klicke auf jeden Punkt für Details und konkrete nächste Schritte.</p>
            </div>

            {/* Pflegebox + Hausnotruf prominent */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="card p-5 border-brand/30">
                <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center mb-3">
                  <Package size={22} className="text-brand" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Pflegebox</h3>
                <p className="text-brand font-bold text-sm mb-2">42 € / Monat – kostenlos</p>
                <p className="text-gray-500 text-xs leading-relaxed">Handschuhe, Desinfektion, Bettschutz. Die Pflegekasse zahlt vollständig. Geht in 5 Minuten.</p>
              </div>
              <div className="card p-5 border-brand/30">
                <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center mb-3">
                  <Bell size={22} className="text-brand" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Hausnotruf</h3>
                <p className="text-brand font-bold text-sm mb-2">ab 0 € / Monat</p>
                <p className="text-gray-500 text-xs leading-relaxed">Pflegekasse zahlt 25,50 € / Monat. Sicherheit für euch beide – auch wenn du kurz weg bist.</p>
              </div>
            </div>

            <Checkliste />

            <div className="border-t border-[#E0EDE7] pt-8">
              <LeadForm
                title="Wir helfen euch die Checkliste abzuhaken"
                subtitle="Kostenlos, persönlich – auf dein Tempo."
                cta="Jetzt kostenlos melden"
                path="pfad-b-checkliste"
                pflegegrad={`PG ${pflegegrad}`}
              />
            </div>
            <button onClick={() => setStep(1)} className="btn-ghost">← Zurück</button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
