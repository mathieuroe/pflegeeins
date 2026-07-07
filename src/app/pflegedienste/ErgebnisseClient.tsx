"use client";

import { MapPin, ArrowRight, Bell, Package } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import PflegedienstCard from "@/components/vergleich/PflegedienstCard";
import type { PflegedienstResult } from "./page";

interface Props {
  plz: string;
  pflegegrad: string;
  fuerWen: string;
  leistung: string;
  results: PflegedienstResult[];
}

type Kategorie = "Ambulante Pflege" | "24/7 Pflege" | "Stationäre Pflege" | "Senioren Residenz";

const KATEGORIE_FILTER: Record<Kategorie, { include: string[]; exclude: string[] }> = {
  "Ambulante Pflege":  { include: ["Grundpflege", "Betreuung", "Arztbegleitung", "Verhinderungspflege", "Demenzbetreuung"], exclude: ["Stationäre Pflege", "Senioren Residenz", "24h-Pflege"] },
  "24/7 Pflege":       { include: ["24h-Pflege"], exclude: [] },
  "Stationäre Pflege": { include: ["Stationäre Pflege", "Demenzbetreuung"], exclude: ["Senioren Residenz"] },
  "Senioren Residenz": { include: ["Senioren Residenz"], exclude: [] },
};

function filterByKategorie(results: PflegedienstResult[], kategorie: Kategorie): PflegedienstResult[] {
  const { include, exclude } = KATEGORIE_FILTER[kategorie];
  return results.filter((pd) => {
    if (exclude.some((l) => pd.leistungen.includes(l))) return false;
    return include.some((l) => pd.leistungen.includes(l));
  });
}

type SortMode = "distanz" | "bewertung";

export default function ErgebnisseClient({ plz, pflegegrad, fuerWen, leistung, results }: Props) {
  const kategorie = leistung as Kategorie;
  const isKategorie = kategorie in KATEGORIE_FILTER;
  const [sortMode, setSortMode] = useState<SortMode>("distanz");

  const gefiltert = (isKategorie ? filterByKategorie(results, kategorie) : results).slice().sort((a, b) => {
    if (sortMode === "bewertung") {
      const ra = a.bewertung ?? -1;
      const rb = b.bewertung ?? -1;
      return rb - ra;
    }
    return a.distanzKm - b.distanzKm;
  });
  const noResults = results.length === 0;

  const subtitle = isKategorie ? kategorie : "Pflegeeinrichtungen";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 flex-wrap">
          <MapPin size={14} className="text-brand" />
          <span>PLZ {plz}</span>
          {pflegegrad && <><span>·</span><span>{pflegegrad}</span></>}
          {fuerWen && <><span>·</span><span>{fuerWen}</span></>}
          {isKategorie && <><span>·</span><span className="text-brand font-medium">{kategorie}</span></>}
        </div>
        <h1 className="font-serif text-3xl text-gray-900 mb-1">
          {noResults
            ? "Suche läuft…"
            : `${gefiltert.length} ${subtitle} in deiner Nähe`}
        </h1>
        <p className="text-gray-500 text-sm flex items-center gap-1.5">
          {noResults ? (
            "Ergebnisse werden geladen"
          ) : (
            <>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400" />
              Echte Google-Bewertungen · Kostenlose Anfragen über liva
            </>
          )}
        </p>
        {!noResults && (
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-gray-400">Sortieren:</span>
            {(["distanz", "bewertung"] as SortMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setSortMode(mode)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                  sortMode === mode
                    ? "bg-brand text-white border-brand"
                    : "border-gray-200 text-gray-500 hover:border-brand hover:text-brand"
                }`}
              >
                {mode === "distanz" ? "Nächste zuerst" : "Beste Bewertung"}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Ergebnisse */}
      <div className="space-y-4 mb-8">
        {noResults && (
          <div className="text-center py-16 text-gray-400">
            <div className="w-10 h-10 border-2 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm">Pflegeeinrichtungen werden geladen…</p>
          </div>
        )}
        {!noResults && gefiltert.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-sm mb-2">Keine passenden Einrichtungen gefunden.</p>
            <Link href="/" className="text-brand text-sm underline">Neue Suche starten</Link>
          </div>
        )}
        {gefiltert.map((pd, i) => (
          <PflegedienstCard
            key={pd.id}
            pd={pd}
            plz={plz}
            pflegegrad={pflegegrad}
            activeLeistung={isKategorie ? kategorie : undefined}
            featured={i === 0}
          />
        ))}
      </div>

      {/* Affiliate Banner: Hausnotruf */}
      <div className="rounded-2xl border-2 border-brand bg-gradient-to-br from-[#F0F8F4] to-white p-5 mb-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center flex-shrink-0">
            <Bell size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-brand uppercase tracking-widest mb-0.5">Zusätzlich kostenlos</p>
            <h3 className="font-serif text-lg text-gray-900 mb-1">Hausnotruf – 27 € / Monat von der Pflegekasse</h3>
            <ul className="space-y-1 mb-3">
              {["27 € / Monat – komplett von der Pflegekasse übernommen", "24/7 Hilfe auf Knopfdruck", "In 3–5 Werktagen eingerichtet"].map((t) => (
                <li key={t} className="flex items-center gap-1.5 text-xs text-gray-600">
                  <span className="w-1 h-1 rounded-full bg-brand flex-shrink-0" />{t}
                </li>
              ))}
            </ul>
            <a
              href="https://t.adcell.com/p/click?promoId=307657&slotId=149760&subId=pflegedienste_hausnotruf&param0=https%3A%2F%2Fpflegehase.de%2Fhausnotruf-bestellung%2F"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-brand/90 transition-colors"
            >
              Jetzt kostenlos beantragen <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Affiliate Banner: Pflegebox */}
      <div className="rounded-2xl border border-[#E0EDE7] bg-white p-5 mb-8">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0">
            <Package size={20} className="text-brand" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-brand uppercase tracking-widest mb-0.5">Bis zu 42 € / Monat kostenlos</p>
            <h3 className="font-serif text-lg text-gray-900 mb-1">Pflegehilfsmittelbox – vollständig von der Pflegekasse</h3>
            <ul className="space-y-1 mb-3">
              {["Bis zu 42 € / Monat – vollständig von der Pflegekasse", "Monatliche Lieferung – ohne Papierkram", "Ab Pflegegrad 1 sofort beantragbar"].map((t) => (
                <li key={t} className="flex items-center gap-1.5 text-xs text-gray-600">
                  <span className="w-1 h-1 rounded-full bg-brand flex-shrink-0" />{t}
                </li>
              ))}
            </ul>
            <a
              href="https://t.adcell.com/p/click?promoId=273407&slotId=149760&subId=pflegedienste_box&param0=https%3A%2F%2Fpflegehase.de%2Fpflegehilfsmittel-bestellung%2F"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-brand text-brand text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-brand hover:text-white transition-colors"
            >
              Pflegebox jetzt beantragen <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link href="/" className="text-sm text-gray-400 hover:text-brand transition-colors">
          ← Neue Suche starten
        </Link>
      </div>
    </div>
  );
}
