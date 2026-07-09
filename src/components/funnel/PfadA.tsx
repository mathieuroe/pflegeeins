"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Copy, Check, ClipboardList, HeartHandshake, Calculator, FileText, Mail } from "lucide-react";
import LeadForm from "./LeadForm";
import PflegegradRechner from "./PflegegradRechner";
import { LeistungenListe, ErgebnisModal } from "./ErgebnisModal";

const PFLEGEKASSEN = [
  { name: "TK – Techniker Krankenkasse", tel: "0800 285 8585", email: "pflege@tk.de" },
  { name: "AOK (je nach Region)", tel: "0800 0 326 326", email: "service@aok.de" },
  { name: "Barmer", tel: "0800 333 1010", email: "pflege@barmer.de" },
  { name: "DAK-Gesundheit", tel: "040 325 325 325", email: "service@dak.de" },
  { name: "KKH", tel: "0800 111 3300", email: "service@kkh.de" },
  { name: "hkk", tel: "0421 3655 0", email: "service@hkk.de" },
  { name: "IKK classic", tel: "01802 455 5444", email: "info@ikk-classic.de" },
  { name: "Sonstige / Weiss ich nicht", tel: "—", email: "—" },
];

const fade = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };

export default function PfadA() {
  const [step, setStep] = useState(-1);
  const [pflegegrad, setPflegegrad] = useState<number>(0);
  const [gesamtpunkte, setGesamtpunkte] = useState<number>(0);
  const [weg, setWeg] = useState<"selbst" | "unterstuetzung" | null>(null);
  const [kasse, setKasse] = useState<typeof PFLEGEKASSEN[0] | null>(null);
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const scriptText = "Ich moechte einen Pflegegrad beantragen. Koennen Sie mir bitte einen Antrag zusenden oder mir erklaeren wie ich das online beantragen kann?";

  function copyScript() {
    navigator.clipboard.writeText(scriptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleRechnerErgebnis(pg: number, punkte: number) {
    setPflegegrad(pg);
    setGesamtpunkte(punkte);
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">

        {/* EINSTIEG – Auswahl */}
        {step === -1 && (
          <motion.div key="einstieg" {...fade} transition={{ duration: 0.3 }}>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Wie möchtest du starten?</h2>
            <p className="text-gray-500 mb-8">Du kannst erst deinen möglichen Pflegegrad ermitteln – oder direkt loslegen und den Antrag stellen.</p>

            <div className="grid sm:grid-cols-2 gap-4">
              <button
                onClick={() => setStep(0)}
                className="flex flex-col text-left p-5 rounded-[12px] border-2 border-[#E0EDE7] bg-white hover:border-brand/50 hover:shadow-card-hover transition-all group"
              >
                <Calculator size={24} className="text-brand mb-3" />
                <p className="font-semibold text-gray-900 mb-1">Pflegegrad erst ermitteln</p>
                <p className="text-xs text-gray-500 leading-relaxed">Beantworte ein paar Fragen – wir schätzen ein welcher Pflegegrad in Frage kommt.</p>
                <span className="mt-4 text-xs text-brand font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Rechner starten <ArrowRight size={13} />
                </span>
              </button>

              <button
                onClick={() => setStep(2)}
                className="flex flex-col text-left p-5 rounded-[12px] border-2 border-[#E0EDE7] bg-white hover:border-brand/50 hover:shadow-card-hover transition-all group"
              >
                <FileText size={24} className="text-brand mb-3" />
                <p className="font-semibold text-gray-900 mb-1">Direkt Pflegegrad beantragen</p>
                <p className="text-xs text-gray-500 leading-relaxed">Du weißt schon was du brauchst – wir zeigen dir wie du den Antrag stellst.</p>
                <span className="mt-4 text-xs text-brand font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Zur Anleitung <ArrowRight size={13} />
                </span>
              </button>
            </div>
          </motion.div>
        )}

        {/* SCHRITT 0 – Pflegegrad-Rechner */}
        {step === 0 && (
          <motion.div key="step0" {...fade} transition={{ duration: 0.3 }}>
            <button onClick={() => setStep(-1)} className="btn-ghost mb-4">← Zurück</button>
            <p className="section-label">Pflegegrad ermitteln</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Welcher Pflegegrad könnte passen?</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Beantworte die Fragen so ehrlich wie möglich – wir orientieren uns am neuen Begutachtungsassessment (NBA) und den Begutachtungs-Richtlinien.
            </p>
            <PflegegradRechner onErgebnis={handleRechnerErgebnis} />
          </motion.div>
        )}

        {/* SCHRITT 1 – Wie vorgehen? */}
        {step === 1 && (
          <motion.div key="step1" {...fade} transition={{ duration: 0.3 }}>
            <p className="section-label">Schritt 2 von 2</p>

            {/* Ergebnis-Card */}
            <div className="bg-brand-light rounded-xl p-5 mb-5">
              <p className="text-xs font-semibold text-brand uppercase tracking-wider mb-1">Deine Einschätzung</p>
              <p className="font-serif text-3xl text-brand">
                {pflegegrad === 0 ? "Kein Pflegegrad" : `Pflegegrad ${pflegegrad}`}
              </p>
              <p className="text-sm text-brand/70 mt-0.5">{gesamtpunkte.toFixed(1)} von 100 Punkten</p>
            </div>

            {/* Das steht dir zu */}
            <div className="mb-4">
              <LeistungenListe pflegegrad={pflegegrad} />
            </div>

            {/* CTA: Alles zuschicken */}
            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-brand text-white font-semibold rounded-2xl py-4 px-6 flex items-center justify-center gap-2 hover:bg-brand-hover transition-colors mb-5 text-base shadow-sm"
            >
              <Mail size={18} />
              Ergebnis kostenlos erhalten
            </button>

            {/* Wie vorgehen */}
            <h2 className="font-serif text-2xl text-gray-900 mb-2">Wie möchtest du vorgehen?</h2>
            <p className="text-gray-500 mb-5 text-sm">Wähle was besser zu dir passt.</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setWeg("selbst")}
                className={`flex flex-col text-left p-5 rounded-[12px] border-2 transition-all ${
                  weg === "selbst" ? "border-brand bg-brand-light" : "border-[#E0EDE7] bg-white hover:border-brand/40"
                }`}
              >
                <ClipboardList size={24} className="text-brand mb-3" />
                <p className="font-semibold text-gray-900 mb-1">Ich beantrage es selbst</p>
                <p className="text-xs text-gray-500 leading-relaxed">Schritt-für-Schritt Anleitung – wir zeigen dir genau wie es geht.</p>
              </button>

              <button
                onClick={() => setWeg("unterstuetzung")}
                className={`flex flex-col text-left p-5 rounded-[12px] border-2 transition-all ${
                  weg === "unterstuetzung" ? "border-brand bg-brand-light" : "border-[#E0EDE7] bg-white hover:border-brand/40"
                }`}
              >
                <HeartHandshake size={24} className="text-brand mb-3" />
                <p className="font-semibold text-gray-900 mb-1">Ich möchte Unterstützung dabei</p>
                <p className="text-xs text-gray-500 leading-relaxed">Wir begleiten dich persönlich durch den Prozess – kostenlos.</p>
              </button>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="btn-ghost">← Zurück</button>
              {weg && (
                <button onClick={() => setStep(weg === "selbst" ? 2 : 4)} className="btn-primary">
                  Weiter <ArrowRight size={16} />
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* SELBST – Pflegekasse */}
        {step === 2 && (
          <motion.div key="step2" {...fade} transition={{ duration: 0.3 }}>
            <button onClick={() => setStep(weg ? 1 : -1)} className="btn-ghost mb-4">← Zurück</button>
            <p className="section-label">Selbst beantragen – Schritt 1</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Welche Pflegekasse ist zuständig?</h2>

            <div className="bg-brand-light border border-brand/20 rounded-xl p-4 mb-6 text-sm text-brand-hover leading-relaxed">
              <strong className="block mb-1">Kurzer Hinweis:</strong>
              Die Pflegekasse ist automatisch dieselbe wie die Krankenkasse. Du musst nichts extra beantragen.
            </div>

            <label className="text-sm font-medium text-gray-700 block mb-2">Krankenkasse wählen</label>
            <select
              className="input mb-6"
              value={kasse?.name || ""}
              onChange={(e) => setKasse(PFLEGEKASSEN.find((k) => k.name === e.target.value) || null)}
            >
              <option value="">— Bitte wählen —</option>
              {PFLEGEKASSEN.map((k) => <option key={k.name} value={k.name}>{k.name}</option>)}
            </select>

            <AnimatePresence>
              {kasse && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <div className="card p-4 mb-4">
                    <p className="font-semibold text-gray-900 mb-2">{kasse.name}</p>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>📞 {kasse.tel}</p>
                      {kasse.email !== "—" && <p>✉ {kasse.email}</p>}
                    </div>
                  </div>
                  <div className="bg-brand-light rounded-xl p-4 mb-6">
                    <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Was du am Telefon sagen kannst:</p>
                    <p className="text-sm text-gray-700 leading-relaxed italic mb-3">&bdquo;{scriptText}&ldquo;</p>
                    <button onClick={copyScript} className="flex items-center gap-2 text-xs font-semibold text-brand hover:text-brand transition-colors">
                      {copied ? <><Check size={14} /> Kopiert!</> : <><Copy size={14} /> Text kopieren</>}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-ghost">← Zurück</button>
              {kasse && <button onClick={() => setStep(3)} className="btn-primary">Weiter <ArrowRight size={16} /></button>}
            </div>
          </motion.div>
        )}

        {/* SELBST – MD Tipps */}
        {step === 3 && (
          <motion.div key="step3" {...fade} transition={{ duration: 0.3 }}>
            <p className="section-label">Selbst beantragen – Schritt 2</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-3">Der MD-Besuch – keine Angst davor</h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Nach dem Antrag kommt jemand vom Medizinischen Dienst vorbei. Mit der richtigen Vorbereitung bekommst du den Pflegegrad der wirklich zutrifft.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { nr: "1", title: "Alles dokumentieren", text: "Schreibe auf was die Person NICHT mehr alleine kann. Je konkreter desto besser." },
                { nr: "2", title: "Schlechten Tag zeigen", text: "Zeig wie es wirklich ist – nicht den guten Tag. Der MD bewertet was er sieht." },
                { nr: "3", title: "Jemanden dabeihaben", text: "Nimm eine Vertrauensperson mit. Vier Augen sehen mehr." },
                { nr: "4", title: "Widerspruch kennen", text: "Pflegegrad zu niedrig? Du hast 1 Monat Zeit Widerspruch einzulegen – lohnt sich fast immer." },
              ].map((tip) => (
                <div key={tip.nr} className="card p-5">
                  <div className="w-7 h-7 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center mb-3">{tip.nr}</div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{tip.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{tip.text}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="btn-ghost">← Zurück</button>
              <button onClick={() => setStep(4)} className="btn-primary">Zum Abschluss <ArrowRight size={16} /></button>
            </div>
          </motion.div>
        )}

        {/* LEAD FORM */}
        {step === 4 && (
          <motion.div key="step4" {...fade} transition={{ duration: 0.3 }}>
            <button onClick={() => setStep(weg === "selbst" ? 3 : 1)} className="btn-ghost mb-6">← Zurück</button>
            <LeadForm
              title={weg === "unterstuetzung" ? "Wir begleiten dich durch den Antrag" : "Noch Fragen? Wir sind da."}
              subtitle={weg === "unterstuetzung" ? "Kostenlos, persönlich, ohne Druck." : "Meld dich wenn du Unterstützung brauchst."}
              cta="Jetzt kostenlos melden"
              path="pfad-a"
              pflegegrad={pflegegrad > 0 ? `PG ${pflegegrad}` : "Kein PG"}
            />
          </motion.div>
        )}

      </AnimatePresence>

      {showModal && (
        <ErgebnisModal pflegegrad={pflegegrad} path="/funnel/pflegegrad-vorhanden" onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
