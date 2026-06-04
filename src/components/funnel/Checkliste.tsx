"use client";

import { useState } from "react";
import {
  ChevronDown, ChevronUp, CheckSquare, Square,
  Package, Bell, FileCheck, Stethoscope,
  Scale, Heart, Calendar, Phone, Wrench
} from "lucide-react";

interface ChecklistItem {
  id: string;
  titel: string;
  erklaerung: string;
  punkte: string[];
  empfehlung?: {
    produkt: "pflegebox" | "hausnotruf";
    text: string;
    info: string;
  };
  prioritaet: "sofort" | "bald" | "optional";
}

interface ChecklistKategorie {
  id: string;
  titel: string;
  icon: React.ReactNode;
  items: ChecklistItem[];
}

const KATEGORIEN: ChecklistKategorie[] = [
  {
    id: "sofort",
    titel: "Sofort erledigen",
    icon: <FileCheck size={18} className="text-brand" />,
    items: [
      {
        id: "bescheid_pruefen",
        titel: "Pflegegrad-Bescheid genau prüfen",
        erklaerung: "Welcher Pflegegrad wurde bewilligt, ab welchem Datum? Wenn der Pflegegrad zu niedrig wirkt, kann man Widerspruch einlegen – in ca. 35% der Fälle wird der PG dann heraufgestuft.",
        punkte: [
          "Bescheid abheften oder scannen",
          "Frist für Widerspruch prüfen (1 Monat ab Bescheid)",
          "Pflegegutachten anfordern falls nicht dabei",
          "Bei Verschlechterung später Höherstufung beantragen",
        ],
        prioritaet: "sofort",
      },
      {
        id: "pflegebox_item",
        titel: "Pflegebox beantragen",
        erklaerung: "Handschuhe, Desinfektion, Bettschutzeinlagen – jeden Monat nach Hause, vollständig von der Pflegekasse bezahlt. Geht in 5 Minuten. Ab Pflegegrad 1.",
        punkte: [
          "Pflegehilfsmittel-Anbieter kontaktieren",
          "Kurzes Formular: Name, Adresse, Pflegekasse, Pflegegrad",
          "Automatische monatliche Lieferung startet",
        ],
        empfehlung: { produkt: "pflegebox", text: "Pflegebox – 42 € / Monat kostenlos", info: "Vollständig von der Pflegekasse bezahlt" },
        prioritaet: "sofort",
      },
      {
        id: "hausnotruf_item",
        titel: "Hausnotruf beantragen",
        erklaerung: "Pflegekasse zahlt 25,50 € / Monat Zuschuss. Bei günstigen Anbietern entstehen keine Kosten. Gibt euch beiden Sicherheit – du kannst auch mal kurz weg.",
        punkte: [
          "Anbieter anfragen",
          "Antrag bei der Pflegekasse stellen (§40 SGB XI)",
          "Genehmigung in ca. 3–5 Werktagen",
        ],
        empfehlung: { produkt: "hausnotruf", text: "Hausnotruf – ab 0 € / Monat", info: "Pflegekasse zahlt 25,50 € / Monat Zuschuss" },
        prioritaet: "sofort",
      },
      {
        id: "entlastungsbetrag_item",
        titel: "Entlastungsbetrag nutzen (131 € / Monat)",
        erklaerung: "Für Alltagsbegleitung, Haushaltshilfe, Fahrten. Das Geld kommt nicht automatisch und verfällt am Jahresende – unbedingt jetzt anfangen.",
        punkte: [
          "Anerkannten Anbieter für Alltagsbegleitung finden",
          "Rechnungen einsammeln und bei Pflegekasse einreichen",
          "Beträge können angespart werden (bis zum nächsten Quartal)",
        ],
        prioritaet: "sofort",
      },
      {
        id: "vollmachten_item",
        titel: "Vollmachten regeln – solange es noch geht",
        erklaerung: "Das wird oft zu spät gemacht. Solange die Person noch geschäftsfähig ist, unbedingt klären. Wer darf mit Ärzten, Pflegekasse, Bank und Behörden sprechen?",
        punkte: [
          "Vorsorgevollmacht erstellen",
          "Patientenverfügung erstellen",
          "Bankvollmacht",
          "Schweigepflichtentbindung für Ärzte",
          "Zugriff auf wichtige Unterlagen sicherstellen",
        ],
        prioritaet: "sofort",
      },
    ],
  },
  {
    id: "alltag",
    titel: "Alltag & Organisation",
    icon: <Calendar size={18} className="text-brand" />,
    items: [
      {
        id: "aufgaben",
        titel: "Aufgaben klar verteilen",
        erklaerung: "Unklare Zuständigkeiten sind eine der häufigsten Konfliktursachen. Eine einfache Tabelle reicht: Wer macht was, wie oft? Schriftlich festhalten hilft mehr als man denkt.",
        punkte: [
          "Wer kauft ein?",
          "Wer kocht und macht Wäsche?",
          "Wer begleitet zu Ärzten?",
          "Wer kümmert sich um Rechnungen?",
          "Wer ruft regelmäßig an?",
          "Wer ist Notfallkontakt und hat Schlüssel?",
          "Gibt es Essen auf Rädern oder einen Fahrdienst?",
        ],
        prioritaet: "sofort",
      },
      {
        id: "organisation",
        titel: "Als Familie koordinieren",
        erklaerung: "Gute Kommunikation spart Zeit und verhindert Missverständnisse – besonders wenn mehrere Personen involviert sind.",
        punkte: [
          "WhatsApp-Gruppe oder Signal für schnelle Absprachen",
          "Geteilter Kalender (Google Calendar, iCal)",
          "Pflegeapp nutzen (z.B. Caregiver, Pflege.de App)",
          "Regelmäßiges kurzes Familien-Update (monatlich)",
          "Angehörigengruppen vor Ort – z.B. für Demenz (Alzheimer Gesellschaft)",
        ],
        prioritaet: "bald",
      },
      {
        id: "wochenplan",
        titel: "Wochenstruktur aufbauen",
        erklaerung: "Eine feste Tagesstruktur gibt der pflegebedürftigen Person Sicherheit und entlastet die Pflegenden durch klare Abläufe.",
        punkte: [
          "Feste Zeiten für Körperpflege und Mahlzeiten",
          "Regelmäßige Arzttermine koordinieren",
          "Tagespflege als Tagesstruktur prüfen",
          "Soziale Kontakte einplanen – Isolation vermeiden",
        ],
        prioritaet: "bald",
      },
    ],
  },
  {
    id: "hilfsmittel",
    titel: "Hilfsmittel & Wohnung",
    icon: <Wrench size={18} className="text-brand" />,
    items: [
      {
        id: "sturzsicherheit",
        titel: "Sturzsicherheit zuhause herstellen",
        erklaerung: "Viele Pflegefälle werden durch Stürze schlimmer. Das ist einer der wichtigsten Punkte. Für Umbauten gibt es bis zu 4.180 € Zuschuss – aber VOR dem Umbau beantragen!",
        punkte: [
          "Stolperfallen und Teppiche entfernen oder sichern",
          "Haltegriffe im Bad installieren",
          "Duschhocker und Toilettensitzerhöhung",
          "Rutschfeste Matten",
          "Nachtlicht",
          "Türschwellen reduzieren",
          "Badumbau und Treppenlift prüfen",
        ],
        empfehlung: { produkt: "hausnotruf", text: "Hausnotruf – Sicherheitsnetz für zuhause", info: "Pflegekasse zahlt 25,50 € / Monat Zuschuss" },
        prioritaet: "sofort",
      },
      {
        id: "technische_hilfsmittel",
        titel: "Technische Hilfsmittel beantragen",
        erklaerung: "Pflegebett, Rollstuhl, Rollator, Badewannenlifter – vieles davon wird von der Pflegekasse leihweise oder dauerhaft gestellt.",
        punkte: [
          "Hausarzt nach Rezept für Hilfsmittel fragen",
          "Rollator / Rollstuhl bei Pflegekasse anfragen",
          "Pflegebett prüfen",
          "Badewannenlifter oder Duschstuhl",
          "Inkontinenzmaterial auf Rezept",
        ],
        prioritaet: "bald",
      },
      {
        id: "wohnraumanpassung",
        titel: "Wohnraumanpassung beantragen",
        erklaerung: "Bis zu 4.180 € Zuschuss pro Maßnahme von der Pflegekasse. Wichtig: Antrag muss VOR Beginn der Maßnahme gestellt werden.",
        punkte: [
          "Maßnahme planen und Kostenvoranschlag holen",
          "Antrag bei Pflegekasse stellen (§40 SGB XI)",
          "Genehmigung abwarten – dann erst umbauen",
          "Rechnung einreichen, Zuschuss wird erstattet",
        ],
        prioritaet: "bald",
      },
    ],
  },
  {
    id: "medizin",
    titel: "Medizinische Versorgung",
    icon: <Stethoscope size={18} className="text-brand" />,
    items: [
      {
        id: "medizin_uebersicht",
        titel: "Medizinische Übersicht erstellen",
        erklaerung: "Eine einfache Übersicht aller medizinischen Informationen – im Notfall Gold wert.",
        punkte: [
          "Hausarzt und Fachärzte notieren",
          "Diagnosen dokumentieren",
          "Medikamentenplan mit Dosierung erstellen",
          "Allergien festhalten",
          "Notfallkontakte zusammenstellen",
          "Letzte Arztbriefe sammeln",
        ],
        prioritaet: "sofort",
      },
      {
        id: "medizin_check",
        titel: "Medikamente und Therapien im Griff haben",
        erklaerung: "Regelmäßige Kontrolle verhindert Fehler – besonders bei vielen Medikamenten oder Demenz.",
        punkte: [
          "Medikamentenplan aktuell halten",
          "Braucht ihr Pflegedienst für Medikamentengabe?",
          "Physio, Ergo, Logopädie – alles beantragt?",
          "Hilfsmittel auf Rezept vorhanden?",
        ],
        prioritaet: "bald",
      },
    ],
  },
  {
    id: "rechtliches",
    titel: "Rechtliches & Unterlagen",
    icon: <Scale size={18} className="text-brand" />,
    items: [
      {
        id: "ordner",
        titel: "Pflege-Ordner anlegen",
        erklaerung: "Alles an einem Ort spart im Ernstfall viel Zeit und Stress – digital oder physisch.",
        punkte: [
          "Pflegegrad-Bescheid und Pflegegutachten",
          "Pflegekassen- / Krankenkassenbriefe",
          "Arztbriefe und Medikamentenplan",
          "Rechnungen, Rezepte, Pflegedienstverträge",
          "Vollmachten und Patientenverfügung",
          "Rentenbescheid",
          "Kontaktdaten aller Beteiligten",
        ],
        prioritaet: "bald",
      },
      {
        id: "schwerbehinderung",
        titel: "Schwerbehindertenausweis prüfen",
        erklaerung: "Oft unbekannt: Ein Schwerbehindertenausweis kann zusätzliche Vergünstigungen bringen (Steuervorteile, kostenloser ÖPNV). Antrag beim Versorgungsamt.",
        punkte: [
          "Beim Versorgungsamt beantragen",
          "Ärztliche Atteste einreichen",
          "GdB (Grad der Behinderung) prüfen lassen",
        ],
        prioritaet: "optional",
      },
    ],
  },
  {
    id: "entlastung",
    titel: "Entlastung für Angehörige",
    icon: <Heart size={18} className="text-brand" />,
    items: [
      {
        id: "auszeit",
        titel: "Auszeiten einplanen – nicht erst wenn alle fertig sind",
        erklaerung: "Pflege ist ein Marathon. Wer dauerhaft pflegt ohne Pausen brennt aus. Die Verhinderungspflege ist genau dafür da – damit du Urlaub machen kannst, krank sein darfst, oder einfach mal Luft holst.",
        punkte: [
          "Verhinderungspflege bei der Pflegekasse anfragen (bis 1.612 € / Jahr)",
          "Kurzzeitpflege nach Krankenhaus oder bei Krisen",
          "Ambulanten Pflegedienst für Teile der Pflege anfragen",
          "Tagespflege als regelmäßige Entlastung prüfen",
        ],
        prioritaet: "sofort",
      },
      {
        id: "unterstuetzung",
        titel: "Unterstützung suchen und annehmen",
        erklaerung: "Unterstützung annehmen ist kein Versagen. Es ist klug. Und es gibt mehr Möglichkeiten als die meisten wissen.",
        punkte: [
          "Anerkannte Alltagsbegleiter und Nachbarschaftshilfe",
          "Pflegekurse für Angehörige (kostenlos)",
          "Angehörigengruppen vor Ort – z.B. für Demenz",
          "Online-Selbsthilfegruppen für pflegende Angehörige",
        ],
        prioritaet: "bald",
      },
    ],
  },
  {
    id: "beratung",
    titel: "Beratung nutzen",
    icon: <Phone size={18} className="text-brand" />,
    items: [
      {
        id: "beratung_item",
        titel: "Kostenlose Pflegeberatung anfragen",
        erklaerung: "Die Pflegekasse muss kostenlose Beratung anbieten – auch zuhause. Das ist kein Verkaufsgespräch, das ist euer Recht. Frag aktiv nach §7a SGB XI.",
        punkte: [
          "Pflegeberatung §7a bei der Pflegekasse anfragen",
          "Pflegestützpunkt in der Region suchen",
          "Liste zugelassener Pflegedienste anfordern",
          "Liste anerkannter Entlastungsangebote anfordern",
        ],
        prioritaet: "bald",
      },
    ],
  },
];

const PRIORITAET_STYLE: Record<string, string> = {
  sofort: "bg-brand text-white",
  bald: "bg-amber-50 text-amber-700 border border-amber-200",
  optional: "bg-gray-100 text-gray-500",
};

const PRIORITAET_LABEL: Record<string, string> = {
  sofort: "Sofort",
  bald: "Diese Woche",
  optional: "Wenn Zeit ist",
};

export default function Checkliste() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<string | null>(null);
  const [openKat, setOpenKat] = useState<string | null>("sofort");

  const allItems = KATEGORIEN.flatMap((k) => k.items);
  const total = allItems.length;
  const erledigtCount = checked.size;

  function toggleCheck(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  }

  return (
    <div className="space-y-3">
      {/* Fortschritt */}
      <div className="flex items-center gap-3 p-4 bg-brand-light rounded-xl">
        <div className="flex-1">
          <div className="h-1.5 bg-brand/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand rounded-full transition-all duration-500"
              style={{ width: `${total > 0 ? (erledigtCount / total) * 100 : 0}%` }}
            />
          </div>
        </div>
        <span className="text-xs font-semibold text-brand whitespace-nowrap">
          {erledigtCount}/{total} erledigt
        </span>
      </div>

      {KATEGORIEN.map((kat) => {
        const katChecked = kat.items.filter((i) => checked.has(i.id)).length;
        const isOpen = openKat === kat.id;

        return (
          <div key={kat.id} className="border border-[#E0EDE7] rounded-[12px] overflow-hidden bg-white">
            <button
              onClick={() => setOpenKat(isOpen ? null : kat.id)}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-brand-light flex items-center justify-center flex-shrink-0">
                {kat.icon}
              </div>
              <span className="flex-1 font-semibold text-sm text-gray-900">{kat.titel}</span>
              {katChecked > 0 && (
                <span className="text-xs text-brand font-semibold">{katChecked}/{kat.items.length}</span>
              )}
              {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </button>

            {isOpen && (
              <div className="border-t border-[#E0EDE7] divide-y divide-[#E0EDE7]">
                {kat.items.map((item) => {
                  const isChecked = checked.has(item.id);
                  const isExpanded = expanded === item.id;

                  return (
                    <div key={item.id} className={isChecked ? "bg-brand-light/20" : "bg-white"}>
                      <div className="flex items-start gap-3 px-4 py-3.5">
                        <button onClick={() => toggleCheck(item.id)} className="flex-shrink-0 mt-0.5">
                          {isChecked
                            ? <CheckSquare size={18} className="text-brand" />
                            : <Square size={18} className="text-gray-300" />
                          }
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-sm font-medium leading-snug ${isChecked ? "line-through text-gray-400" : "text-gray-900"}`}>
                              {item.titel}
                            </p>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${PRIORITAET_STYLE[item.prioritaet]}`}>
                              {PRIORITAET_LABEL[item.prioritaet]}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => setExpanded(isExpanded ? null : item.id)}
                          className="flex-shrink-0 text-gray-400 hover:text-brand transition-colors mt-0.5"
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="px-4 pb-4 bg-gray-50/50">
                          <p className="text-sm text-gray-600 leading-relaxed mb-3">{item.erklaerung}</p>
                          <ul className="space-y-1.5 mb-3">
                            {item.punkte.map((p, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0 mt-2" />
                                {p}
                              </li>
                            ))}
                          </ul>
                          {item.empfehlung && (
                            <div className="flex items-center gap-3 bg-brand-light rounded-xl p-3">
                              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white flex-shrink-0">
                                {item.empfehlung.produkt === "pflegebox" ? <Package size={16} /> : <Bell size={16} />}
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-brand">{item.empfehlung.text}</p>
                                <p className="text-xs text-brand/70 mt-0.5">{item.empfehlung.info}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
