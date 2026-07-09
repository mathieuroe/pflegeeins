"use client";

import { useState, useEffect } from "react";
import { ArrowRight, X, CheckCircle2, Lock, Mail } from "lucide-react";

export type Leistung = { name: string; anchor: string };

export const LEISTUNGEN_PG: Record<number, Leistung[]> = {
  0: [
    { name: "Widerspruch prüfen lassen", anchor: "" },
    { name: "Kostenlose Beratung bei liva", anchor: "" },
  ],
  1: [
    { name: "Pflegehilfsmittel + Hausnotruf – 0 € / Monat", anchor: "pflegebox-karte" },
    { name: "Entlastungsbetrag – 131 € / Monat", anchor: "entlastung" },
  ],
  2: [
    { name: "Pflegehilfsmittel + Hausnotruf – 0 € / Monat", anchor: "pflegebox-karte" },
    { name: "Pflegegeld – 347 € / Monat", anchor: "pflegegeld" },
    { name: "Entlastungsbetrag – 131 € / Monat", anchor: "entlastung" },
  ],
  3: [
    { name: "Pflegehilfsmittel + Hausnotruf – 0 € / Monat", anchor: "pflegebox-karte" },
    { name: "Pflegegeld – 599 € / Monat", anchor: "pflegegeld" },
    { name: "Pflegesachleistungen – bis 1.497 € / Monat", anchor: "sachleistung" },
    { name: "Verhinderungs- & Kurzzeitpflege", anchor: "verhinderung" },
  ],
  4: [
    { name: "Pflegehilfsmittel + Hausnotruf – 0 € / Monat", anchor: "pflegebox-karte" },
    { name: "Pflegegeld – 800 € / Monat", anchor: "pflegegeld" },
    { name: "Pflegesachleistungen – bis 1.859 € / Monat", anchor: "sachleistung" },
    { name: "Verhinderungs- & Kurzzeitpflege", anchor: "verhinderung" },
  ],
  5: [
    { name: "Pflegehilfsmittel + Hausnotruf – 0 € / Monat", anchor: "pflegebox-karte" },
    { name: "Pflegegeld – 990 € / Monat", anchor: "pflegegeld" },
    { name: "Pflegesachleistungen – bis 2.299 € / Monat", anchor: "sachleistung" },
    { name: "Tagespflege", anchor: "tagespflege" },
  ],
};

const KASSEN_NAMEN = [
  "TK – Techniker Krankenkasse", "AOK", "Barmer", "DAK-Gesundheit",
  "KKH", "hkk", "IKK classic", "Sonstige / Weiß ich nicht",
];

export function LeistungenListe({ pflegegrad }: { pflegegrad: number }) {
  const leistungen = LEISTUNGEN_PG[pflegegrad] ?? LEISTUNGEN_PG[0];
  return (
    <div className="bg-white rounded-xl border border-[#E0EDE7] p-5">
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Das steht dir zu</p>
      <ul className="space-y-2">
        {leistungen.map((l) => (
          <li key={l.name} className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-sm text-gray-800">
              <CheckCircle2 size={15} className="text-brand flex-shrink-0" />
              {l.name}
            </span>
            {l.anchor && (
              <a
                href={`/leistungen#${l.anchor}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 text-brand hover:text-brand-hover transition-colors"
                title="Mehr erfahren"
              >
                <ArrowRight size={14} />
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ErgebnisModal({ pflegegrad, path, onClose }: { pflegegrad: number; path: string; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", plz: "", versicherung: "" });
  const [consent, setConsent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const leistungen = LEISTUNGEN_PG[pflegegrad] ?? LEISTUNGEN_PG[0];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          pflegegrad: pflegegrad.toString(),
          tags: "Ergebnis-PDF",
          path,
          timestamp: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
          <X size={20} />
        </button>

        <div className="p-6 sm:p-7">
          {!submitted ? (
            <>
              <div className="mb-5">
                <p className="text-xs font-bold text-brand uppercase tracking-widest mb-1.5">Kostenlos & unverbindlich</p>
                <h2 className="font-serif text-2xl text-gray-900 leading-snug mb-1">
                  Wir schicken dir alles zu, was dir zusteht
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Deine persönliche Übersicht für {pflegegrad > 0 ? `Pflegegrad ${pflegegrad}` : "deine Situation"} – mit konkreten Beträgen und nächsten Schritten.
                </p>
              </div>

              <div className="bg-brand-light rounded-xl p-4 mb-5">
                <p className="text-xs font-semibold text-brand uppercase tracking-wider mb-2.5">Das bekommst du:</p>
                <ul className="space-y-1.5">
                  {leistungen.map((l) => (
                    <li key={l.name} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={15} className="text-brand flex-shrink-0 mt-0.5" />
                      {l.name}
                    </li>
                  ))}
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input required type="text" placeholder="Dein Name" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} className="input w-full" />
                <input required type="email" placeholder="E-Mail-Adresse" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} className="input w-full" />
                <div className="grid grid-cols-2 gap-3">
                  <input required type="tel" placeholder="Telefonnummer" value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input w-full" />
                  <input required type="text" inputMode="numeric" maxLength={5} placeholder="Postleitzahl" value={form.plz}
                    onChange={(e) => setForm({ ...form, plz: e.target.value.replace(/\D/g, "") })} className="input w-full" />
                </div>
                <select required value={form.versicherung}
                  onChange={(e) => setForm({ ...form, versicherung: e.target.value })} className="input w-full text-gray-700">
                  <option value="">Krankenkasse wählen</option>
                  {KASSEN_NAMEN.map((k) => <option key={k} value={k}>{k}</option>)}
                </select>

                <label className="flex items-start gap-2.5 cursor-pointer mt-1">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 accent-brand flex-shrink-0" />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    Ich bin einverstanden, dass liva mich per E-Mail über meine Leistungsansprüche informiert.
                    <span className="text-gray-400"> Ein Partner kann mich auch kostenlos kontaktieren.</span>
                  </span>
                </label>

                <button type="submit" disabled={submitting || !consent}
                  className="btn-primary w-full py-3.5 justify-center text-base mt-1">
                  {submitting ? "Wird gesendet…" : <><Mail size={16} /> Ergebnis kostenlos erhalten</>}
                </button>
                <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
                  <Lock size={10} /> DSGVO-konform · Kein Spam · Jederzeit abmeldbar
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-white" />
              </div>
              <h3 className="font-serif text-2xl text-gray-900 mb-2">Deine Übersicht ist unterwegs.</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Schau in dein Postfach – du bekommst gleich alles für {pflegegrad > 0 ? `Pflegegrad ${pflegegrad}` : "deine Situation"}: Leistungen, Beträge und nächste Schritte.
              </p>
              <button onClick={onClose} className="btn-primary px-8 py-3 justify-center">Weiter <ArrowRight size={16} /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
