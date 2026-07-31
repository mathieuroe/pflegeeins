"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, Bell, Check, ArrowRight, Info, X } from "lucide-react";

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

export default function LeistungsBoxen() {
  const [infoPopup, setInfoPopup] = useState<"box" | "hausnotruf" | null>(null);

  return (
    <>
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

      <div className="grid md:grid-cols-2 gap-6">

        {/* Pflegehilfsmittelbox */}
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
          <Link
            href="/pflegebox-beantragen?start=1"
            className="btn-primary w-full justify-center py-3 text-sm text-center"
          >
            Jetzt kostenlos beantragen <ArrowRight size={16} />
          </Link>
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
          <Link
            href="/hausnotruf-beantragen?start=1"
            className="btn-primary w-full justify-center py-3 text-sm text-center"
          >
            Jetzt kostenlos beantragen <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </>
  );
}
