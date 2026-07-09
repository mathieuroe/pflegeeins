"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import LeadForm from "./LeadForm";

const PG_LABELS = ["Kein PG", "PG 1", "PG 2", "PG 3", "PG 4", "PG 5"];

const OPTIONEN = [
  { id: "pflegebox", label: "Pflegebox fehlt noch", icon: "📦" },
  { id: "hausnotruf", label: "Hausnotruf fehlt noch", icon: "🔔" },
  { id: "leistungen", label: "Ich kenne meine Leistungen nicht genau", icon: "💶" },
  { id: "ueberlastet", label: "Die Pflege belastet mich selbst sehr", icon: "😓" },
];

const fade = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };

export default function PfadC() {
  const [step, setStep] = useState(0);
  const [pflegegrad, setPflegegrad] = useState<number | null>(null);
  const [auswahl, setAuswahl] = useState<string[]>([]);

  function toggleAuswahl(id: string) {
    setAuswahl((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">

        {/* SCHRITT 1 – Pflegegrad */}
        {step === 0 && (
          <motion.div key="step0" {...fade} transition={{ duration: 0.3 }}>
            <p className="section-label">Schritt 1 von 2</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Welchen Pflegegrad habt ihr aktuell?</h2>
            <p className="text-gray-500 mb-8">Wir schauen dann gemeinsam was noch fehlt oder besser werden könnte.</p>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-8">
              {PG_LABELS.map((label, i) => (
                <button key={i} onClick={() => setPflegegrad(i)}
                  className={`rounded-full py-2.5 text-sm font-semibold border transition-all ${
                    pflegegrad === i ? "bg-brand text-white border-brand" : "bg-white text-gray-700 border-[#E0EDE7] hover:border-brand hover:text-brand"
                  }`}>
                  {label}
                </button>
              ))}
            </div>

            {pflegegrad !== null && (
              <button onClick={() => setStep(1)} className="btn-primary">
                Weiter <ArrowRight size={16} />
              </button>
            )}
          </motion.div>
        )}

        {/* SCHRITT 2 – Was fehlt */}
        {step === 1 && (
          <motion.div key="step1" {...fade} transition={{ duration: 0.3 }}>
            <p className="section-label">Schritt 2 von 2</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Was läuft noch nicht rund?</h2>
            <p className="text-gray-500 mb-6">Mehrfachauswahl möglich – wir schauen uns alles an.</p>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {OPTIONEN.map((o) => (
                <button key={o.id} onClick={() => toggleAuswahl(o.id)}
                  className={`flex items-center gap-4 p-4 rounded-[12px] border text-left transition-all ${
                    auswahl.includes(o.id) ? "border-brand bg-brand-light shadow-card-active" : "border-[#E0EDE7] bg-white hover:border-brand/40"
                  }`}>
                  <span className="text-2xl">{o.icon}</span>
                  <span className={`text-sm font-medium ${auswahl.includes(o.id) ? "text-brand-hover" : "text-gray-700"}`}>{o.label}</span>
                </button>
              ))}
            </div>

            {auswahl.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 mb-8">
                {/* Immer sichtbar */}
                <div className="card p-5 border-l-4 border-brand">
                  <p className="font-semibold text-gray-900 text-sm mb-1">💡 Entlastungsbetrag</p>
                  <p className="text-gray-500 text-sm">131 € / Monat die verfallen wenn du sie nicht nutzt. Für Alltagshilfe, Betreuung, Haushaltshilfe.</p>
                </div>
                <div className="card p-5 border-l-4 border-brand">
                  <p className="font-semibold text-gray-900 text-sm mb-1">🌴 Verhinderungspflege</p>
                  <p className="text-gray-500 text-sm">Bis 3.539 € / Jahr als gemeinsames Budget damit du auch mal Pause machen kannst. Für Urlaub, Krankheit oder einfach Luft holen.</p>
                </div>
                <div className="card p-5 border-l-4 border-amber-400">
                  <p className="font-semibold text-gray-900 text-sm mb-1">📈 Pflegegrad erhöhen</p>
                  <p className="text-gray-500 text-sm">Hat sich der Zustand verschlechtert? Ein neuer Antrag lohnt sich. In ~35% aller Fälle wird der PG heraufgestuft.</p>
                </div>

                {auswahl.includes("pflegebox") && (
                  <div className="card p-5 bg-brand-light border-brand/20">
                    <p className="font-semibold text-gray-900 text-sm mb-1">📦 Pflegebox nachholen</p>
                    <p className="text-gray-500 text-sm">Du bekommst noch keine Pflegebox? Das holen wir sofort nach – kostenlos, kein Aufwand für dich.</p>
                  </div>
                )}
                {auswahl.includes("hausnotruf") && (
                  <div className="card p-5 bg-brand-light border-brand/20">
                    <p className="font-semibold text-gray-900 text-sm mb-1">🔔 Hausnotruf einrichten</p>
                    <p className="text-gray-500 text-sm">Wir finden den passenden Anbieter in eurer Region und beantragen den Zuschuss bei der Pflegekasse.</p>
                  </div>
                )}
                {auswahl.includes("ueberlastet") && (
                  <div className="card p-5 bg-amber-50 border-amber-200">
                    <p className="font-semibold text-gray-900 text-sm mb-2">💛 Du bist genauso wichtig</p>
                    <p className="text-gray-600 text-sm leading-relaxed">Pflegende Angehörige vergessen sich oft selbst. Verhinderungspflege und Kurzzeitpflege sind genau dafür da. Außerdem: Jede Pflegekasse bietet kostenlose Beratung für Angehörige an – ruf dort einfach an.</p>
                  </div>
                )}
              </motion.div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="btn-ghost">← Zurück</button>
              {auswahl.length > 0 && (
                <button onClick={() => setStep(2)} className="btn-primary">
                  Jetzt angehen <ArrowRight size={16} />
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* LEAD FORM */}
        {step === 2 && (
          <motion.div key="step2" {...fade} transition={{ duration: 0.3 }}>
            <button onClick={() => setStep(1)} className="btn-ghost mb-6">← Zurück</button>
            <LeadForm
              title="Wir schauen gemeinsam was ihr noch holen könnt"
              subtitle="Kostenlos, ohne Druck, auf dein Tempo."
              cta="Jetzt kostenlos melden"
              path="pfad-c"
              pflegegrad={pflegegrad !== null ? `PG ${pflegegrad}` : undefined}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
