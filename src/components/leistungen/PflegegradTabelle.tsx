"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const ROWS = [
  { name: "Entlastungsbetrag",              werte: ["131 €",    "131 €",      "131 €",      "131 €",      "131 €"     ] },
  { name: "Pflegehilfsmittelbox",           werte: ["42 €",     "42 €",       "42 €",       "42 €",       "42 €"      ] },
  { name: "Hausnotruf",                     werte: ["27 €",     "27 €",       "27 €",       "27 €",       "27 €"      ] },
  { name: "Wohnraumanpassung",              werte: ["4.180 €*", "4.180 €*",   "4.180 €*",   "4.180 €*",   "4.180 €*"  ] },
  { name: "Pflegegeld",                     werte: ["–",        "347 €",      "599 €",      "800 €",      "990 €"     ] },
  { name: "Pflegesachleistungen",           werte: ["–",        "796 €",      "1.497 €",    "1.859 €",    "2.299 €"   ] },
  { name: "Tagespflege",                    werte: ["–",        "721 €",      "1.357 €",    "1.685 €",    "2.085 €"   ] },
  { name: "Verhinderungs-/Kurzzeitpflege",  werte: ["–",        "3.539 €/J.", "3.539 €/J.", "3.539 €/J.", "3.539 €/J."] },
];

export default function PflegegradTabelle() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 text-xs font-semibold text-brand border border-brand/30 bg-brand-light/50 hover:bg-brand-light rounded-xl px-4 py-2 transition-colors"
      >
        Übersicht nach Pflegegrad
        <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="mt-4">
          <div className="overflow-x-auto rounded-2xl border border-[#E0EDE7]">
            <table className="w-full text-xs min-w-[580px]">
              <thead>
                <tr className="bg-brand-light/60">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 w-44">Leistung</th>
                  {["PG 1","PG 2","PG 3","PG 4","PG 5"].map((pg) => (
                    <th key={pg} className="text-center px-3 py-3 font-semibold text-brand">{pg}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0EDE7]">
                {ROWS.map((row, i) => (
                  <tr key={row.name} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="px-4 py-2.5 font-medium text-gray-800 leading-tight">{row.name}</td>
                    {row.werte.map((w, j) => (
                      <td key={j} className={`text-center px-3 py-2.5 ${w === "–" ? "text-gray-300" : "text-gray-700 font-medium"}`}>{w}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 ml-1">* Einmalig je Maßnahme · Beträge monatlich, Stand 01.07.2025 · Quelle: SGB XI, GKV-Spitzenverband</p>
        </div>
      )}
    </div>
  );
}
