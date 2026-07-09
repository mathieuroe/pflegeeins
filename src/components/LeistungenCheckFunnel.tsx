"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Leistung {
  id: string;
  name: string;
  betrag: string;
  beschreibung: string;
  pflegegrade: number[];
  antragsSchritte: string[];
  icon: string;
  affiliateUrl?: string;
  affiliateCta?: string;
}

const LEISTUNGEN: Leistung[] = [
  {
    id: "pflegehilfsmittel",
    name: "Pflegebox (Pflegehilfsmittel)",
    betrag: "42 € / Monat – kostenlos",
    beschreibung: "Einmalhandschuhe, Bettschutzeinlagen, Desinfektion – monatlich gratis nach Hause. Unser Partner übernimmt die Beantragung bei deiner Pflegekasse kostenlos für dich.",
    pflegegrade: [1, 2, 3, 4, 5],
    icon: "📦",
    affiliateUrl: "https://t.adcell.com/p/click?promoId=273407&slotId=149760&subId=leistungen_check_pflegebox&param0=https%3A%2F%2Fpflegehase.de%2Fpflegehilfsmittel-bestellung%2F",
    affiliateCta: "Pflegebox kostenlos bestellen",
    antragsSchritte: [],
  },
  {
    id: "hausnotruf",
    name: "Hausnotruf",
    betrag: "27 € / Monat – kostenlos",
    beschreibung: "Die Pflegekasse zahlt bis zu 27 € pro Monat – bei unserem Partner entstehen für dich keine Kosten. Er stellt den Antrag bei deiner Pflegekasse und liefert das Gerät in 3–5 Werktagen.",
    pflegegrade: [1, 2, 3, 4, 5],
    icon: "🔔",
    affiliateUrl: "https://t.adcell.com/p/click?promoId=307657&slotId=149760&subId=leistungen_check_hausnotruf&param0=https%3A%2F%2Fpflegehase.de%2Fhausnotruf-bestellung%2F",
    affiliateCta: "Hausnotruf kostenlos beantragen",
    antragsSchritte: [],
  },
  {
    id: "entlastungsbetrag",
    name: "Entlastungsbetrag",
    betrag: "131 € / Monat",
    beschreibung: "Für qualifizierte Alltagsbegleitung, Betreuung und Haushaltshilfe. Nicht ausgegebene Beträge können angespart werden.",
    pflegegrade: [1, 2, 3, 4, 5],
    icon: "💶",
    antragsSchritte: [
      "Anerkannten Anbieter für Alltagsbegleitung finden",
      "Leistungen in Anspruch nehmen und Rechnungen sammeln",
      "Rechnungen bei der Pflegekasse einreichen (bis zu 131 €/Monat)",
      "Erstattung erfolgt innerhalb von 2–4 Wochen",
    ],
  },
  {
    id: "wohnraumanpassung",
    name: "Wohnraumanpassung",
    betrag: "bis 4.180 € / Maßnahme",
    beschreibung: "Zuschuss für barrierefreie Umbauten wie Haltegriffe, Duschumbau, Türverbreiterung oder Treppenlifte.",
    pflegegrade: [1, 2, 3, 4, 5],
    icon: "🔨",
    antragsSchritte: [
      "Maßnahme planen und Kostenvoranschlag einholen",
      "Antrag bei der Pflegekasse stellen (§40 SGB XI) – VOR Durchführung",
      "Genehmigung abwarten (ca. 2–4 Wochen)",
      "Umbau durchführen, Rechnung einreichen, Zuschuss wird erstattet",
    ],
  },
  {
    id: "verhinderungspflege",
    name: "Verhinderungspflege",
    betrag: "bis 1.612 € / Jahr",
    beschreibung: "Wenn die Hauptpflegeperson verhindert ist (Urlaub, Krankheit), übernimmt jemand anderes die Pflege – die Pflegekasse zahlt.",
    pflegegrade: [2, 3, 4, 5],
    icon: "🌴",
    antragsSchritte: [
      "Vertretungspflegekraft organisieren (Pflegedienst oder Privatperson)",
      "Abwesenheitszeit dokumentieren",
      "Antrag mit Nachweisen bei der Pflegekasse einreichen",
      "Erstattung bis 1.612 € pro Jahr",
    ],
  },
  {
    id: "pflegegeld",
    name: "Pflegegeld",
    betrag: "bis 990 € / Monat",
    beschreibung: "Wird an die pflegebedürftige Person gezahlt, wenn Pflege durch Angehörige oder Freunde erfolgt.",
    pflegegrade: [2, 3, 4, 5],
    icon: "👐",
    antragsSchritte: [
      "Formloser Antrag bei der Pflegekasse stellen",
      "Pflegegrad muss anerkannt sein (PG 2 oder höher)",
      "Nachweis dass Pflege privat organisiert wird",
      "Auszahlung erfolgt monatlich direkt auf das Konto",
    ],
  },
  {
    id: "tagespflege",
    name: "Tagespflege",
    betrag: "bis 131 € / Monat zusätzlich",
    beschreibung: "Betreuung in einer Tageseinrichtung – wird zusätzlich zu ambulanten Leistungen bezahlt.",
    pflegegrade: [1, 2, 3, 4, 5],
    icon: "☀️",
    antragsSchritte: [
      "Tagespflege-Einrichtung in der Nähe suchen",
      "Antrag bei der Pflegekasse stellen (§41 SGB XI)",
      "Bedarfsprüfung durch Pflegekasse",
      "Kosten werden direkt mit der Einrichtung abgerechnet",
    ],
  },
  {
    id: "pflegesachleistung",
    name: "Pflegesachleistung",
    betrag: "bis 2.200 € / Monat",
    beschreibung: "Für professionelle Pflege durch einen zugelassenen ambulanten Pflegedienst.",
    pflegegrade: [2, 3, 4, 5],
    icon: "🏥",
    antragsSchritte: [
      "Zugelassenen Pflegedienst auswählen",
      "Pflegedienst koordiniert Antrag mit der Pflegekasse",
      "Pflegevertrag abschließen",
      "Pflegekasse zahlt direkt an den Pflegedienst",
    ],
  },
];

const pgLabels = ["Kein PG", "PG 1", "PG 2", "PG 3", "PG 4", "PG 5"];

export default function LeistungenCheckFunnel() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [pflegegrad, setPflegegrad] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", telefon: "", plz: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const relevantLeistungen = pflegegrad !== null && pflegegrad > 0
    ? LEISTUNGEN.filter((l) => l.pflegegrade.includes(pflegegrad))
    : [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: formData.telefon,
          pflegegrad: pflegegrad !== null ? `PG ${pflegegrad}` : "Kein PG",
          funnel: "leistungen-check",
          tags: relevantLeistungen.map((l) => l.name).join(", ") || "Leistungen-Check",
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center gap-2 justify-center mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${step >= s ? "bg-brand text-white" : "bg-gray-200 text-gray-500"}`}>
              {step > s ? <CheckCircle2 size={16} /> : s}
            </div>
            {s < 3 && <div className={`w-12 h-0.5 ${step > s ? "bg-brand" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      <div className="card p-6 sm:p-8">
        <h2 className="font-semibold text-gray-900 text-lg mb-1">Schritt 1: Pflegegrad wählen</h2>
        <p className="text-gray-500 text-sm mb-6">Welchen Pflegegrad hat die pflegebedürftige Person?</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
          {pgLabels.map((label, i) => (
            <button
              key={i}
              onClick={() => { setPflegegrad(i); setStep(2); }}
              className={`rounded-full py-2.5 text-sm font-semibold border transition-all ${pflegegrad === i ? "bg-brand text-white border-brand" : "bg-white text-gray-700 border-[#E0EDE7] hover:border-brand hover:text-brand"}`}
            >
              {label}
            </button>
          ))}
        </div>
        {pflegegrad === 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-800 font-semibold mb-1">Noch kein Pflegegrad?</p>
            <p className="text-sm text-amber-700 mb-3">Mit unserem kostenlosen Rechner siehst du sofort, welcher Pflegegrad dir zusteht.</p>
            <Link href="/pflegegrad-rechner" className="inline-flex items-center gap-2 bg-amber-700 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-amber-800 transition-colors">
              Zum Pflegegrad-Rechner <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>

      {/* Step 2 */}
      {step >= 2 && pflegegrad !== null && (
        <div className="card p-6 sm:p-8">
          <h2 className="font-semibold text-gray-900 text-lg mb-1">Schritt 2: Deine Leistungen</h2>
          {pflegegrad === 0 ? (
            <p className="text-gray-500 text-sm mb-4">Ohne Pflegegrad gibt es noch keine Ansprüche. Wir begleiten dich bei der Beantragung.</p>
          ) : (
            <>
              <p className="text-gray-500 text-sm mb-6">
                Mit <strong>{pgLabels[pflegegrad]}</strong> stehen dir <strong className="text-brand">{relevantLeistungen.length} Leistungen</strong> zu:
              </p>
              <div className="space-y-3">
                {relevantLeistungen.map((l) => (
                  <div key={l.id} className="border border-[#E0EDE7] rounded-[12px] overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                      onClick={() => setExpandedId(expandedId === l.id ? null : l.id)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{l.icon}</span>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{l.name}</p>
                          <p className="text-brand font-bold text-sm">{l.betrag}</p>
                        </div>
                      </div>
                      {expandedId === l.id ? <ChevronUp size={18} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />}
                    </button>
                    {expandedId === l.id && (
                      <div className="px-4 pb-4 border-t border-[#E0EDE7]">
                        <p className="text-gray-500 text-sm leading-relaxed mt-3 mb-4">{l.beschreibung}</p>
                        {l.affiliateUrl ? (
                          <a
                            href={l.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex items-center gap-2 text-sm"
                          >
                            {l.affiliateCta} <ExternalLink size={14} />
                          </a>
                        ) : (
                          <>
                            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">So beantragst du es:</h4>
                            <ol className="space-y-2">
                              {l.antragsSchritte.map((schritt, i) => (
                                <li key={i} className="flex gap-3 text-sm text-gray-600">
                                  <span className="w-5 h-5 rounded-full bg-brand-light text-brand text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold">{i + 1}</span>
                                  {schritt}
                                </li>
                              ))}
                            </ol>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
          <button className="btn-primary w-full justify-center mt-6" onClick={() => setStep(3)}>
            Jetzt kostenlos beantragen lassen <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Step 3 */}
      {step >= 3 && (
        <div className="card p-6 sm:p-8">
          <h2 className="font-semibold text-gray-900 text-lg mb-1">Schritt 3: Kostenlos beantragen lassen</h2>
          <p className="text-gray-500 text-sm mb-6">Wir übernehmen die Bürokratie für dich – 100% kostenlos und unverbindlich.</p>
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-brand" />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Anfrage erhalten!</h3>
              <p className="text-gray-500 text-sm">Wir melden uns innerhalb von 24 Stunden bei dir.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Name</label>
                  <input type="text" required placeholder="Maria Müller" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Telefon</label>
                  <input type="tel" required placeholder="+49 151 ..." value={formData.telefon} onChange={(e) => setFormData({ ...formData, telefon: e.target.value })} className="input" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">PLZ</label>
                  <input type="text" required placeholder="79100" value={formData.plz} onChange={(e) => setFormData({ ...formData, plz: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">E-Mail</label>
                  <input type="email" placeholder="maria@beispiel.de" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="input" />
                </div>
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full justify-center py-3.5">
                {submitting ? "Wird gesendet..." : "Kostenlos anfragen →"}
              </button>
              <p className="text-xs text-gray-400 text-center">Deine Daten werden vertraulich behandelt.</p>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
