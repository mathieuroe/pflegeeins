"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Users } from "lucide-react";
import dynamic from "next/dynamic";

const LeistungsLeadModal = dynamic(() => import("./LeistungsLeadModal"), { ssr: false });

const DEEPLINKS: Record<string, { href: string; label: string }> = {
  "pflegebox-karte": {
    href: "/pflegebox-beantragen?start=1",
    label: "Jetzt kostenlos beantragen",
  },
  "hausnotruf-karte": {
    href: "/hausnotruf-beantragen?start=1",
    label: "Jetzt kostenlos beantragen",
  },
};

const LEISTUNGEN = [
  {
    id: "entlastung",
    tabId: "grundpflege",
    name: "Entlastungsbetrag",
    betrag: "131 € / Monat",
    pg: "Ab PG 1",
    text: "Monatlich 131 € für qualifizierte Unterstützung im Alltag – Alltagsbegleitung, Haushaltshilfe, Fahrdienste oder Betreuungsgruppen. Nicht verbrauchte Beträge werden angespart und können grundsätzlich bis zum 30. Juni des Folgejahres genutzt werden.",
    beantragen: "Anerkannten Anbieter kontaktieren, Leistungen in Anspruch nehmen, Rechnung bei der Pflegekasse einreichen.",
  },
  {
    id: "tagespflege",
    tabId: "stationaer",
    name: "Tagespflege",
    betrag: "bis 2.085 € / Monat",
    pg: "Ab PG 2",
    text: "Tagesbetreuung in einer Pflegeeinrichtung – tagsüber betreut, abends wieder zuhause. Wird zusätzlich zu ambulanten Leistungen und Pflegegeld gewährt. PG 2: bis 721 €, PG 3: bis 1.357 €, PG 4: bis 1.685 €, PG 5: bis 2.085 € monatlich.",
    beantragen: "Tagespflegeeinrichtung in der Nähe finden, Platz anfragen – die Einrichtung rechnet direkt mit der Pflegekasse ab.",
  },
  {
    id: "sachleistung",
    tabId: "grundpflege",
    name: "Pflegesachleistungen",
    betrag: "bis 2.299 € / Monat",
    pg: "Ab PG 2",
    text: "Für professionelle Pflege durch einen ambulanten Pflegedienst. Die Pflegekasse zahlt direkt an den Dienst – du wählst den Anbieter. PG 2: bis 796 €, PG 3: bis 1.497 €, PG 4: bis 1.859 €, PG 5: bis 2.299 € monatlich.",
    beantragen: "Ambulanten Pflegedienst wählen, Pflegevertrag abschließen – der Dienst rechnet direkt mit der Pflegekasse ab.",
  },
  {
    id: "verhinderung",
    tabId: "stationaer",
    name: "Verhinderungs- & Kurzzeitpflege",
    betrag: "bis 3.539 € / Jahr",
    pg: "Ab PG 2",
    highlight: true,
    text: "Seit 01.07.2025 gemeinsames Budget: bis zu 3.539 € pro Jahr. Verhinderungspflege wenn die Hauptpflegeperson Urlaub braucht, Kurzzeitpflege für vorübergehende stationäre Aufenthalte. Beides flexibel kombinierbar.",
    beantragen: "Vertretung oder Einrichtung organisieren, Antrag mit Nachweis bei der Pflegekasse einreichen – Erstattung in 2–4 Wochen.",
  },
  {
    id: "wohnraum",
    tabId: "grundpflege",
    name: "Wohnraumanpassung",
    betrag: "bis 4.180 € / Maßnahme",
    pg: "Ab PG 1",
    text: "Zuschuss für barrierefreie Umbauten: Haltegriffe, Duschumbau, Türverbreiterung, Treppenlifte. Bis zu 4.180 € je Maßnahme, mehrere Maßnahmen möglich. Antrag muss vor Beginn gestellt werden.",
    beantragen: "Antrag bei der Pflegekasse stellen, Kostenvoranschlag beifügen – erst nach Genehmigung mit dem Umbau beginnen.",
  },
  {
    id: "24h-pflege",
    tabId: "24h",
    name: "24/7 Pflege",
    betrag: "individuell",
    pg: "Ab PG 3",
    text: "Rund-um-die-Uhr-Betreuung zuhause – meist durch osteuropäische Betreuungskräfte. Kombinierbar mit Pflegegeld und Pflegesachleistungen. Die Kosten variieren je nach Anbieter und Pflegebedarf.",
    beantragen: "Seriösen 24h-Pflegeanbieter vergleichen, Bedarfseinschätzung anfragen – liva hilft dir bei der Auswahl.",
  },
  {
    id: "residenz-karte",
    tabId: "residenz",
    name: "Senioren Residenz",
    betrag: "ab 2.500 € / Monat",
    pg: "Ab PG 2",
    text: "Vollstationäre Pflege in einer Pflegeeinrichtung oder Seniorenresidenz. Die Pflegekasse übernimmt einen festen Anteil (PG 2–5: 770–2.005 €). Komfortangebote und Hotelleistungen werden separat berechnet.",
    beantragen: "Einrichtung besichtigen, Heimvertrag abschließen – die Einrichtung stellt den Antrag bei der Pflegekasse.",
  },
  {
    id: "pflegebox-karte",
    name: "Pflegehilfsmittelbox",
    betrag: "bis 42 € / Monat",
    pg: "Ab PG 1",
    text: "Monatlich bis zu 42 € für Pflegeverbrauchsmittel – Einmalhandschuhe, Desinfektionsmittel, Bettschutzeinlagen, Mundschutz. Die Pflegekasse erstattet direkt an den Anbieter, für dich entstehen keine Kosten.",
    beantragen: "Unser Partner Pflegehase stellt für dich den Antrag bei der Pflegekasse und liefert kostenfrei monatlich zu dir nachhause.",
  },
  {
    id: "hausnotruf-karte",
    name: "Hausnotruf",
    betrag: "27 € / Monat",
    pg: "Ab PG 1",
    text: "Kleine Basisstation mit Notrufknopf als Armband oder Halskette – ein Druck genügt, sofort antwortet jemand. Die Pflegekasse zahlt 27 € / Monat (§ 40 Abs. 4 SGB XI). Bei günstigen Anbietern entstehen keine Kosten.",
    beantragen: "Unser Partner Pflegehase stellt für dich den Antrag bei der Pflegekasse und liefert dir deinen Hausnotruf – Genehmigung in ca. 3–5 Werktagen.",
  },
];

const PFLEGEGELD = {
  name: "Pflegegeld",
  betrag: "347 – 990 € / Monat",
  pg: "Ab PG 2",
  text: "Direktzahlung an dich, wenn Angehörige oder nahestehende Personen die Pflege übernehmen. Kein Nachweis einzelner Leistungen nötig – einfach bei der Pflegekasse beantragen. PG 2: 347 €, PG 3: 599 €, PG 4: 800 €, PG 5: 990 € pro Monat.",
  beantragen: "Formloser Antrag bei der Pflegekasse – schriftlich, telefonisch oder online über das Kassenportal.",
};

export default function LeistungenGrid() {
  const [activeLeistung, setActiveLeistung] = useState<string | null>(null);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {LEISTUNGEN.map((l) => (
          <div
            key={l.id}
            id={l.id}
            className={`card p-5 hover:shadow-card-hover transition-shadow flex flex-col ${l.highlight ? "border-brand/30 border-2" : ""}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs bg-brand-light text-brand px-2 py-0.5 rounded-full font-semibold">{l.pg}</span>
              {l.highlight && (
                <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-semibold">Häufig vergessen</span>
              )}
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">{l.name}</h3>
            <p className="text-brand font-bold text-base mb-2">{l.betrag}</p>
            <p className="text-gray-500 text-xs leading-relaxed mb-3">{l.text}</p>
            <div className="flex items-start gap-1.5 bg-brand-light/60 rounded-lg px-3 py-2 mb-4">
              <ArrowUpRight size={12} className="text-brand flex-shrink-0 mt-0.5" />
              <p className="text-xs text-brand leading-relaxed">{l.beantragen}</p>
            </div>

            <div className="mt-auto">
              {DEEPLINKS[l.id] ? (
                <Link
                  href={DEEPLINKS[l.id].href}
                  className="w-full flex items-center justify-center gap-2 bg-brand text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-brand-hover transition-colors"
                >
                  {DEEPLINKS[l.id].label} <ArrowRight size={13} />
                </Link>
              ) : (
                <button
                  onClick={() => setActiveLeistung(l.name)}
                  className="w-full flex items-center justify-center gap-2 bg-brand text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-brand-hover transition-colors"
                >
                  <Users size={13} />
                  Passenden Anbieter finden
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pflegegeld – Zusätzliche Info */}
      <div className="mt-5 card p-5 border-dashed flex flex-col sm:flex-row gap-5">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs bg-brand-light text-brand px-2 py-0.5 rounded-full font-semibold">{PFLEGEGELD.pg}</span>
            <span className="text-xs text-gray-400">Zusätzliche Info</span>
          </div>
          <h3 className="font-semibold text-gray-900 text-sm mb-1">{PFLEGEGELD.name}</h3>
          <p className="text-brand font-bold text-base mb-2">{PFLEGEGELD.betrag}</p>
          <p className="text-gray-500 text-xs leading-relaxed">{PFLEGEGELD.text}</p>
        </div>
        <div className="flex items-start gap-1.5 bg-brand-light/60 rounded-lg px-3 py-2 sm:max-w-xs">
          <ArrowUpRight size={12} className="text-brand flex-shrink-0 mt-0.5" />
          <p className="text-xs text-brand leading-relaxed">{PFLEGEGELD.beantragen}</p>
        </div>
      </div>

      {activeLeistung && (
        <LeistungsLeadModal
          leistung={activeLeistung}
          onClose={() => setActiveLeistung(null)}
        />
      )}
    </>
  );
}
