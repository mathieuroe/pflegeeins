"use client";

import { useState, useEffect, useRef } from "react";

import { Home, Users, HeartHandshake, Building2, Package, Bell, ListChecks, ClipboardList, Check, ArrowRight, Info, X } from "lucide-react";
import LeadForm from "./LeadForm";
import Checkliste from "./Checkliste";


type Modus = "leistungen" | "checkliste" | null;

type PGLeistung = { name: string; betrag: string };
const PG_LEISTUNGEN: Record<number, PGLeistung[]> = {
  1: [
    { name: "Pflegebox (Pflegehilfsmittel)", betrag: "42 € / Monat" },
    { name: "Hausnotruf-Zuschuss", betrag: "27 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Wohnraumanpassung", betrag: "bis 4.180 €" },
  ],
  2: [
    { name: "Pflegebox (Pflegehilfsmittel)", betrag: "42 € / Monat" },
    { name: "Hausnotruf-Zuschuss", betrag: "27 € / Monat" },
    { name: "Pflegegeld", betrag: "347 € / Monat" },
    { name: "Pflegesachleistungen", betrag: "796 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Verhinderungspflege", betrag: "bis 3.539 € / Jahr (gemeinsames Budget)" },
  ],
  3: [
    { name: "Pflegebox (Pflegehilfsmittel)", betrag: "42 € / Monat" },
    { name: "Hausnotruf-Zuschuss", betrag: "27 € / Monat" },
    { name: "Pflegegeld", betrag: "599 € / Monat" },
    { name: "Pflegesachleistungen", betrag: "1.497 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Kurzzeitpflege", betrag: "1.774 € / Jahr" },
    { name: "Verhinderungspflege", betrag: "bis 3.539 € / Jahr (gemeinsames Budget)" },
  ],
  4: [
    { name: "Pflegebox (Pflegehilfsmittel)", betrag: "42 € / Monat" },
    { name: "Hausnotruf-Zuschuss", betrag: "27 € / Monat" },
    { name: "Pflegegeld", betrag: "800 € / Monat" },
    { name: "Pflegesachleistungen", betrag: "1.859 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Verhinderungspflege", betrag: "bis 3.539 € / Jahr (gemeinsames Budget)" },
    { name: "Kurzzeitpflege", betrag: "1.774 € / Jahr" },
  ],
  5: [
    { name: "Pflegebox (Pflegehilfsmittel)", betrag: "42 € / Monat" },
    { name: "Hausnotruf-Zuschuss", betrag: "27 € / Monat" },
    { name: "Pflegegeld", betrag: "990 € / Monat" },
    { name: "Pflegesachleistungen", betrag: "2.299 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Verhinderungspflege", betrag: "bis 3.539 € / Jahr (gemeinsames Budget)" },
    { name: "Kurzzeitpflege", betrag: "1.774 € / Jahr" },
  ],
};

const WOHNSITUATIONEN = [
  { id: "alleine", label: "Ich lebe alleine zuhause", icon: <Home size={18} className="text-brand" /> },
  { id: "selbst", label: "Angehörige helfen zuhause", icon: <Users size={18} className="text-brand" /> },
  { id: "dienst", label: "Ein Pflegedienst unterstützt zuhause", icon: <HeartHandshake size={18} className="text-brand" /> },
  { id: "heim", label: "Ich lebe im Pflegeheim", icon: <Building2 size={18} className="text-brand" /> },
];



const PG_LABELS = ["", "PG 1", "PG 2", "PG 3", "PG 4", "PG 5"];

const WOHN_EVENT_MAP: Record<string, string> = {
  alleine: "has_pg_living_alone_selected",
  selbst: "has_pg_living_family_selected",
  dienst: "has_pg_living_care_service_selected",
  heim: "has_pg_living_care_home_selected",
};

function pushDataLayerEvent(eventName: string) {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dl = window as any;
  dl.dataLayer = dl.dataLayer || [];
  dl.dataLayer.push({ event: eventName });
}


interface PfadBProps {
  onStepChange?: (step: number) => void;
}

function ProgressBar({ step, modus }: { step: number; modus: Modus }) {
  // Leistungen: steps 0→1→2→4 = 4 Schritte
  // Checkliste: steps 0→1→5 = 3 Schritte
  const isCheckliste = modus === "checkliste";
  const total = isCheckliste ? 3 : 4;

  const current = (() => {
    if (step === 0) return 1;
    if (step === 1) return 2;
    if (step === 5) return 3; // Checkliste-Ergebnis
    if (step === 2) return 3;
    if (step === 4) return 4;
    return 1;
  })();

  const percent = Math.round((current / total) * 100);

  return (
    <div className="mb-6">
      <div className="mb-1.5">
        <span className="text-xs text-gray-400">Schritt {current} von {total}</span>
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default function PfadB({ onStepChange }: PfadBProps = {}) {
  const [step, setStep] = useState(0);

  function gotoStep(s: number) {
    setStep(s);
    onStepChange?.(s);
  }
  const [pflegegrad, setPflegegrad] = useState<number | null>(null);
  const [modus, setModus] = useState<Modus>(null);
  const [wohnsituation, setWohnsituation] = useState<string | null>(null);
  const [infoPopup, setInfoPopup] = useState<"box" | "hausnotruf" | null>(null);

  const leistungenResultFired = useRef(false);
  const checklistResultFired = useRef(false);

  useEffect(() => {
    pushDataLayerEvent("has_pg_funnel_landing_view");
  }, []);

  useEffect(() => {
    if (step === 4 && !leistungenResultFired.current) {
      leistungenResultFired.current = true;
      pushDataLayerEvent("has_pg_leistungen_result_viewed");
    }
    if (step === 5 && !checklistResultFired.current) {
      checklistResultFired.current = true;
      pushDataLayerEvent("has_pg_checklist_result_viewed");
    }
  }, [step]);

  const INFO_CONTENT = {
    box: {
      titel: "Pflegehilfsmittelbox – bis zu 42 € / Monat",
      intro: "Die Pflegekasse übernimmt bis zu 42 € pro Monat für Pflegeverbrauchsmittel. Einmal beantragen – jeden Monat automatisch geliefert, ohne Kosten für dich.",
      fakten: [
        { label: "Inhalt", wert: "Einmalhandschuhe, Desinfektion, Bettschutzeinlagen, Mundschutz u.v.m." },
        { label: "Kosten", wert: "0 € Eigenanteil – Pflegekasse zahlt bis zu 42 € / Monat direkt" },
        { label: "Voraussetzung", wert: "Pflegegrad 1, 2, 3, 4 oder 5" },
        { label: "Aufwand", wert: "Einmaliger Antrag – unser Partner Pflegehase erledigt alles" },
        { label: "Lieferung", wert: "Kostenlos, monatlich, direkt nach Hause" },
      ],
    },
    hausnotruf: {
      titel: "Hausnotruf – 27 € / Monat von der Pflegekasse",
      intro: "Ein Knopfdruck genügt – sofort ist Hilfe unterwegs. Die Pflegekasse zahlt 27 € pro Monat, bei günstigen Anbietern ohne Eigenanteil.",
      fakten: [
        { label: "Funktion", wert: "Notrufknopf als Armband oder Halskette – 24 h Bereitschaft" },
        { label: "Zuschuss", wert: "Pflegekasse zahlt 27 € / Monat" },
        { label: "Eigenanteil", wert: "Bei günstigen Anbietern 0 € – kein Risiko" },
        { label: "Voraussetzung", wert: "Pflegegrad 1, 2, 3, 4 oder 5" },
        { label: "Einrichtung", wert: "Genehmigung in 3–5 Werktagen, Lieferung inklusive" },
      ],
    },
  };

  return (
    <div className="space-y-6">

      {/* Info-Popup – immer im DOM, nur per CSS sichtbar */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-200 ${
          infoPopup ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        onClick={() => setInfoPopup(null)}
      >
        <div
          className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-serif text-lg text-gray-900 leading-snug pr-4">
              {infoPopup ? INFO_CONTENT[infoPopup].titel : ""}
            </h3>
            <button onClick={() => setInfoPopup(null)} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
              <X size={20} />
            </button>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            {infoPopup ? INFO_CONTENT[infoPopup].intro : ""}
          </p>
          <div className="space-y-2">
            {infoPopup && INFO_CONTENT[infoPopup].fakten.map((f) => (
              <div key={f.label} className="flex gap-3 bg-brand-light/60 rounded-xl px-3 py-2.5">
                <span className="text-xs font-bold text-brand w-20 flex-shrink-0 pt-0.5">{f.label}</span>
                <span className="text-xs text-gray-700 leading-relaxed">{f.wert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProgressBar step={step} modus={modus} />
      <>

        {/* SCHRITT 1 – Pflegegrad */}
        {step === 0 && (
          <div>
            <h2 className="font-serif text-2xl text-gray-900 mb-2">Welchen Pflegegrad hast du?</h2>
            <p className="text-gray-500 text-sm mb-5">Davon hängt ab, welche Leistungen für dich infrage kommen.</p>
            <div className="flex flex-col gap-2">
              {[1, 2, 3, 4, 5].map((pg) => (
                <button
                  key={pg}
                  onClick={() => {
                    setPflegegrad(pg);
                    pushDataLayerEvent(`has_pg_pg${pg}_selected`);
                    gotoStep(1);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                    pflegegrad === pg
                      ? "bg-brand text-white border-brand"
                      : "bg-white text-gray-700 border-[#E0EDE7] hover:border-brand hover:text-brand"
                  }`}
                >
                  <span>Pflegegrad {pg}</span>
                  <ArrowRight size={16} className="flex-shrink-0 opacity-40" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SCHRITT 2 – Modus wählen */}
        {step === 1 && pflegegrad && (
          <div>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Was möchtest du als Erstes erledigen?</h2>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">Wir helfen dir dabei, die wichtigsten Leistungen und nächsten Schritte zu finden.</p>

            <div className="flex flex-col gap-3 mb-6">
              {/* Karte 1 – Leistungen prüfen */}
              <button
                onClick={() => {
                  setModus("leistungen");
                  pushDataLayerEvent("has_pg_leistungen_selected");
                  gotoStep(2);
                }}
                className="flex items-center gap-4 text-left px-5 py-5 rounded-2xl border-2 border-brand bg-brand-light/40 hover:bg-brand-light/60 transition-all w-full"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0">
                  <ClipboardList size={22} className="text-brand" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-base mb-1">Leistungen prüfen</p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-2">
                    Finde heraus, welche Leistungen und Zuschüsse dir mit deinem Pflegegrad zustehen.
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-brand text-white px-2.5 py-1 rounded-full">
                    ★ Empfohlen
                  </span>
                </div>
                <ArrowRight size={18} className="text-gray-400 flex-shrink-0" />
              </button>

              {/* Karte 2 – Checkliste erhalten */}
              <button
                onClick={() => {
                  setModus("checkliste");
                  pushDataLayerEvent("has_pg_checklist_selected");
                  gotoStep(5);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-4 text-left px-5 py-5 rounded-2xl border-2 border-[#E0EDE7] bg-white hover:border-brand/40 transition-all w-full"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0">
                  <ListChecks size={22} className="text-brand" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-base mb-1">Checkliste erhalten</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Erfahre Schritt für Schritt, was jetzt wichtig ist und nichts Wichtiges vergisst.
                  </p>
                </div>
                <ArrowRight size={18} className="text-gray-400 flex-shrink-0" />
              </button>
            </div>

            <button onClick={() => gotoStep(0)} className="btn-ghost">← Zurück</button>
          </div>
        )}

        {/* LEISTUNGEN – Wohnsituation */}
        {step === 2 && (
          <div>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Wie ist die Pflege aktuell organisiert?</h2>
            <p className="text-gray-500 text-sm mb-5 leading-relaxed">Damit zeigen wir dir nur Leistungen, die wirklich zu deiner Situation passen.</p>
            <div className="space-y-2 mb-6">
              {WOHNSITUATIONEN.map((w) => (
                <button
                  key={w.id}
                  onClick={() => {
                    setWohnsituation(w.id);
                    pushDataLayerEvent(WOHN_EVENT_MAP[w.id]);
                    gotoStep(4);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl border-2 text-left transition-all ${
                    wohnsituation === w.id ? "border-brand bg-brand-light" : "border-[#E0EDE7] bg-white hover:border-brand/40"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-light flex items-center justify-center flex-shrink-0">{w.icon}</div>
                  <span className="font-medium text-gray-900 text-sm leading-snug flex-1">{w.label}</span>
                  <ArrowRight size={16} className="text-gray-300 flex-shrink-0" />
                </button>
              ))}
            </div>
            <button onClick={() => gotoStep(1)} className="btn-ghost">← Zurück</button>
          </div>
        )}

        {/* LEISTUNGEN – Ergebnis */}
        {step === 4 && pflegegrad && (
          <div className="space-y-4">

            {/* Header – konsistent mit anderen Steps */}
            <div>
              <p className="section-label mb-1">Deine Leistungen mit {PG_LABELS[pflegegrad]}</p>
              <h2 className="font-serif text-3xl text-gray-900 leading-snug">
                Das steht dir zu – lass es nicht liegen.
              </h2>
            </div>

            {/* Pflegehilfsmittelbox – Haupt-CTA */}
            <div className="card p-5 border-2 border-brand relative transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
              <button
                onClick={() => setInfoPopup("box")}
                className="absolute top-4 right-4 text-gray-300 hover:text-brand transition-colors"
                aria-label="Mehr Infos zur Pflegehilfsmittelbox"
              >
                <Info size={17} />
              </button>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center flex-shrink-0">
                    <Package size={20} className="text-white" />
                  </div>
                  <h3 className="font-serif text-lg text-gray-900 leading-tight">Kostenlose Pflegebox</h3>
                </div>
                <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full flex-shrink-0 mr-5">
                  Ab Pflegegrad 1
                </span>
              </div>
              <ul className="space-y-2 mb-3">
                {[
                  "Bis zu 42 € / Monat – vollständig von der Pflegekasse",
                  "Monatliche Lieferung nach Hause – ohne Papierkram",
                  "Antrag in unter 2 Minuten – unser Partner erledigt den Rest",
                ].map((v) => (
                  <li key={v} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={15} className="text-brand flex-shrink-0" />
                    {v}
                  </li>
                ))}
              </ul>
              <a
                href="/pflegebox-beantragen?start=1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => pushDataLayerEvent("has_pg_leistungen_pflegebox_click")}
                className="btn-primary w-full justify-center py-3 text-sm text-center"
              >
                Jetzt kostenlos beantragen <ArrowRight size={16} />
              </a>
              <p className="text-center text-[11px] text-gray-400 mt-2">Über unseren geprüften Partner Pflegehase</p>
            </div>

            {/* Hausnotruf */}
            <div className="card p-5 relative transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
              <button
                onClick={() => setInfoPopup("hausnotruf")}
                className="absolute top-4 right-4 text-gray-300 hover:text-brand transition-colors"
                aria-label="Mehr Infos zum Hausnotruf"
              >
                <Info size={17} />
              </button>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0">
                    <Bell size={20} className="text-brand" />
                  </div>
                  <h3 className="font-serif text-lg text-gray-900 leading-tight">Kostenloser Hausnotruf</h3>
                </div>
                <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full flex-shrink-0 mr-5">
                  Ab Pflegegrad 1
                </span>
              </div>
              <ul className="space-y-2 mb-3">
                {[
                  "27 € / Monat – komplett von der Pflegekasse übernommen",
                  "Notrufknopf: 24/7 Hilfe auf Knopfdruck",
                  "In 3–5 Werktagen eingerichtet – inkl. Lieferung",
                ].map((v) => (
                  <li key={v} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={15} className="text-brand flex-shrink-0" />
                    {v}
                  </li>
                ))}
              </ul>
              <a
                href="/hausnotruf-beantragen?start=1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => pushDataLayerEvent("has_pg_leistungen_hausnotruf_click")}
                className="btn-primary w-full justify-center py-3 text-sm text-center"
              >
                Jetzt kostenlos beantragen <ArrowRight size={16} />
              </a>
              <p className="text-center text-[11px] text-gray-400 mt-2">Über unseren geprüften Partner Pflegehase</p>
            </div>

            {/* Weitere Leistungen */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Weitere Leistungen mit {PG_LABELS[pflegegrad]}
              </p>
              <div className="space-y-1.5">
                {PG_LEISTUNGEN[pflegegrad]?.map((l) => (
                  <div key={l.name} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5">
                    <span className="text-sm text-gray-700">{l.name}</span>
                    <span className="text-xs text-brand font-bold">{l.betrag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Kontaktformular */}
            <div className="border-t border-[#E0EDE7] pt-6">
              <LeadForm
                title="Persönliche Unterstützung gewünscht?"
                subtitle="Wenn du Hilfe bei Anträgen oder Fragen zu den Leistungen möchtest, begleiten wir dich kostenlos und unverbindlich."
                cta="Kostenlose Unterstützung anfragen"
                path="pfad-b"
                pflegegrad={`PG ${pflegegrad}`}
              />
            </div>

            <button onClick={() => gotoStep(2)} className="btn-ghost">← Zurück</button>
          </div>
        )}

        {/* CHECKLISTE */}
        {step === 5 && pflegegrad && (
          <div className="space-y-6">
            <div>
              <p className="section-label mb-1">Dein persönlicher Aktionsplan</p>
              <h2 className="font-serif text-3xl text-gray-900 mb-2">Was du nicht vergessen darfst</h2>
              <p className="text-gray-500 text-sm">Klicke auf jeden Punkt für Details und konkrete nächste Schritte.</p>
            </div>

            {/* Pflegehilfsmittelbox + Hausnotruf – identisch zur Leistungsseite */}
            <div className="card p-5 border-2 border-brand relative transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
              <button
                onClick={() => setInfoPopup("box")}
                className="absolute top-4 right-4 text-gray-300 hover:text-brand transition-colors"
                aria-label="Mehr Infos zur Pflegehilfsmittelbox"
              >
                <Info size={17} />
              </button>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center flex-shrink-0">
                    <Package size={20} className="text-white" />
                  </div>
                  <h3 className="font-serif text-lg text-gray-900 leading-tight">Kostenlose Pflegebox</h3>
                </div>
                <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full flex-shrink-0 mr-5">
                  Ab Pflegegrad 1
                </span>
              </div>
              <ul className="space-y-2 mb-3">
                {[
                  "Bis zu 42 € / Monat – vollständig von der Pflegekasse",
                  "Monatliche Lieferung nach Hause – ohne Papierkram",
                  "Antrag in unter 2 Minuten – unser Partner erledigt den Rest",
                ].map((v) => (
                  <li key={v} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={15} className="text-brand flex-shrink-0" />
                    {v}
                  </li>
                ))}
              </ul>
              <a
                href="/pflegebox-beantragen?start=1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => pushDataLayerEvent("has_pg_checklist_pflegebox_click")}
                className="btn-primary w-full justify-center py-3 text-sm text-center"
              >
                Jetzt kostenlos beantragen <ArrowRight size={16} />
              </a>
              <p className="text-center text-[11px] text-gray-400 mt-2">Über unseren geprüften Partner Pflegehase</p>
            </div>

            <div className="card p-5 relative transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
              <button
                onClick={() => setInfoPopup("hausnotruf")}
                className="absolute top-4 right-4 text-gray-300 hover:text-brand transition-colors"
                aria-label="Mehr Infos zum Hausnotruf"
              >
                <Info size={17} />
              </button>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0">
                    <Bell size={20} className="text-brand" />
                  </div>
                  <h3 className="font-serif text-lg text-gray-900 leading-tight">Kostenloser Hausnotruf</h3>
                </div>
                <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full flex-shrink-0 mr-5">
                  Ab Pflegegrad 1
                </span>
              </div>
              <ul className="space-y-2 mb-3">
                {[
                  "27 € / Monat – komplett von der Pflegekasse übernommen",
                  "Notrufknopf: 24/7 Hilfe auf Knopfdruck",
                  "In 3–5 Werktagen eingerichtet – inkl. Lieferung",
                ].map((v) => (
                  <li key={v} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={15} className="text-brand flex-shrink-0" />
                    {v}
                  </li>
                ))}
              </ul>
              <a
                href="/hausnotruf-beantragen?start=1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => pushDataLayerEvent("has_pg_checklist_hausnotruf_click")}
                className="btn-primary w-full justify-center py-3 text-sm text-center"
              >
                Jetzt kostenlos beantragen <ArrowRight size={16} />
              </a>
              <p className="text-center text-[11px] text-gray-400 mt-2">Über unseren geprüften Partner Pflegehase</p>
            </div>

            <Checkliste />

            <div className="border-t border-[#E0EDE7] pt-8">
              <LeadForm
                title="Wir helfen dir die Checkliste abzuhaken"
                subtitle="Kostenlos, persönlich – auf dein Tempo."
                cta="Jetzt kostenlos melden"
                path="pfad-b-checkliste"
                pflegegrad={`PG ${pflegegrad}`}
              />
            </div>
            <button onClick={() => gotoStep(1)} className="btn-ghost">← Zurück</button>
          </div>
        )}

      </>
    </div>
  );
}
