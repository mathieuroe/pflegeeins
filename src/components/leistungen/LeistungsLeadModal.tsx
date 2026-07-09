"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle2, ArrowRight, Lock, Phone, Mail, MapPin } from "lucide-react";

const PFLEGEGRADE = ["Weiß ich nicht", "Noch kein Pflegegrad", "Pflegegrad 1", "Pflegegrad 2", "Pflegegrad 3", "Pflegegrad 4", "Pflegegrad 5"];

const WEITERE_LEISTUNGEN = [
  "Entlastungsbetrag",
  "Pflegegeld",
  "Pflegesachleistungen",
  "Verhinderungs- & Kurzzeitpflege",
  "Tagespflege",
  "Wohnraumanpassung",
  "Pflegehilfsmittelbox",
  "Hausnotruf",
  "24/7 Pflege",
  "Senioren Residenz",
];

interface Props {
  leistung: string;
  onClose: () => void;
}

export default function LeistungsLeadModal({ leistung, onClose }: Props) {
  const [form, setForm] = useState({
    plz: "",
    phone: "",
    email: "",
    pflegegrad: "",
    interessen: [] as string[],
  });
  const [einverstaendnis, setEinverstaendnis] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function toggleInteresse(item: string) {
    setForm((f) => ({
      ...f,
      interessen: f.interessen.includes(item)
        ? f.interessen.filter((i) => i !== item)
        : [...f.interessen, item],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          phone: form.phone,
          plz: form.plz,
          pflegegrad: form.pflegegrad,
          path: `leistungen-anfrage (${leistung})`,
          tags: [leistung, ...form.interessen].join(", "),
          timestamp: new Date().toISOString(),
          consent_beratung: einverstaendnis,
          consent_weitergabe: false,
          consent_timestamp: new Date().toISOString(),
        }),
      });
      sessionStorage.setItem("liva_tel", form.phone);
      sessionStorage.setItem("liva_email", form.email);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {!submitted ? (
          <>
            {/* Header */}
            <div className="flex items-start justify-between p-5 pb-4 border-b border-gray-100">
              <div>
                <span className="inline-block text-[10px] font-bold text-brand uppercase tracking-widest bg-brand-light px-2 py-0.5 rounded-full mb-2">
                  {leistung}
                </span>
                <h2 className="font-serif text-xl text-gray-900 leading-snug">
                  Wir schicken dir passende<br />Anbieter – kostenlos.
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Kein Papierkram. Kein Risiko. Du entscheidest.
                </p>
              </div>
              <button onClick={onClose} className="text-gray-300 hover:text-gray-500 flex-shrink-0 ml-3 mt-1">
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 space-y-3">

              {/* PLZ */}
              <div className="relative">
                <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand" />
                <input
                  type="text"
                  required
                  inputMode="numeric"
                  maxLength={5}
                  placeholder="Deine Postleitzahl"
                  value={form.plz}
                  onChange={(e) => setForm({ ...form, plz: e.target.value.replace(/\D/g, "") })}
                  className="input pl-9 text-sm"
                />
              </div>

              {/* Telefon */}
              <div className="relative">
                <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand" />
                <input
                  type="tel"
                  required
                  placeholder="Deine Telefonnummer"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input pl-9 text-sm"
                />
              </div>

              {/* E-Mail */}
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand" />
                <input
                  type="email"
                  required
                  placeholder="Deine E-Mail-Adresse"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input pl-9 text-sm"
                />
              </div>

              {/* Pflegegrad */}
              <div className="relative">
                <select
                  value={form.pflegegrad}
                  onChange={(e) => setForm({ ...form, pflegegrad: e.target.value })}
                  className="input text-sm text-gray-600 appearance-none w-full pr-9"
                >
                  <option value="" disabled>Pflegegrad</option>
                  {PFLEGEGRADE.map((pg) => (
                    <option key={pg} value={pg}>{pg}</option>
                  ))}
                </select>
                <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </div>

              {/* Weitere Leistungen */}
              <div>
                <p className="text-xs text-gray-400 mb-2">Auch interessant? <span className="text-gray-500">(optional)</span></p>
                <div className="flex flex-wrap gap-1.5">
                  {WEITERE_LEISTUNGEN.filter((l) => l !== leistung).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleInteresse(item)}
                      className={`text-[11px] px-2.5 py-1 rounded-full border font-medium transition-all ${
                        form.interessen.includes(item)
                          ? "bg-brand text-white border-brand"
                          : "bg-white text-gray-500 border-gray-200 hover:border-brand/40"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full justify-center py-3.5 text-sm mt-1"
              >
                {submitting ? "Wird gesendet…" : <>Anbieter kostenlos anfordern <ArrowRight size={16} /></>}
              </button>

              {/* Einverständnis */}
              <label className="flex items-start gap-2 cursor-pointer">
                <div
                  onClick={() => setEinverstaendnis(!einverstaendnis)}
                  className={`w-3.5 h-3.5 rounded flex-shrink-0 border flex items-center justify-center mt-0.5 transition-colors ${
                    einverstaendnis ? "bg-brand border-brand" : "border-gray-300"
                  }`}
                >
                  {einverstaendnis && <CheckCircle2 size={9} className="text-white" />}
                </div>
                <span className="text-[10px] text-gray-400 leading-relaxed">
                  Ich bin einverstanden, dass mich ein geprüfter Partner zu meiner Anfrage kontaktiert.{" "}
                  <a href="/datenschutz" className="underline hover:text-brand">Datenschutz</a>
                </span>
              </label>

              <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1">
                <Lock size={9} /> Kostenlos · Unverbindlich · DSGVO-konform
              </p>
            </form>
          </>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-brand" />
            </div>
            <h3 className="font-serif text-2xl text-gray-900 mb-2">Auf dem Weg zu dir!</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Wir schicken dir passende Anbieter für <strong>{leistung}</strong> direkt ins Postfach. Innerhalb von 24 Stunden.
            </p>
            <button onClick={onClose} className="btn-primary text-sm px-6 py-2.5">
              Schließen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
