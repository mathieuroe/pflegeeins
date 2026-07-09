"use client";

import { useState } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import ConsentCheckboxes from "@/components/ConsentCheckboxes";

const pgLabels = ["Kein PG", "PG 1", "PG 2", "PG 3", "PG 4", "PG 5"];

export default function HausnotrufLeadForm() {
  const [pflegegrad, setPflegegrad] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", telefon: "", plz: "", email: "" });
  const [consentBeratung, setConsentBeratung] = useState(false);
  const [consentWeitergabe, setConsentWeitergabe] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consentBeratung) {
      setShowConsentError(true);
      return;
    }
    setSubmitting(true);
    try {
      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          phone: form.telefon,
          pflegegrad: pflegegrad !== null ? `PG ${pflegegrad}` : "",
          funnel: "hausnotruf",
          tags: "Hausnotruf",
          consent_beratung: consentBeratung,
          consent_weitergabe: consentWeitergabe,
          consent_timestamp: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
    } finally { setSubmitting(false); }
  }

  if (submitted) {
    return (
      <div className="card p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} className="text-brand" />
        </div>
        <h3 className="font-semibold text-gray-900 text-xl mb-2">Anfrage erhalten!</h3>
        <p className="text-gray-500 text-sm">Wir melden uns innerhalb von 24 Stunden mit passenden Angeboten.</p>
      </div>
    );
  }

  return (
    <div className="card p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">Pflegegrad (optional)</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {pgLabels.map((label, i) => (
              <button key={i} type="button" onClick={() => setPflegegrad(i)}
                className={`rounded-full py-2 text-sm font-semibold border transition-all ${pflegegrad === i ? "bg-brand text-white border-brand" : "bg-white text-gray-700 border-[#E0EDE7] hover:border-brand hover:text-brand"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Name</label>
            <input type="text" required placeholder="Maria Müller" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Telefon</label>
            <input type="tel" required placeholder="+49 151 ..." value={form.telefon} onChange={(e) => setForm({ ...form, telefon: e.target.value })} className="input" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">PLZ</label>
            <input type="text" required placeholder="79100" value={form.plz} onChange={(e) => setForm({ ...form, plz: e.target.value })} className="input" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">E-Mail (optional)</label>
            <input type="email" placeholder="maria@beispiel.de" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
          </div>
        </div>

        <ConsentCheckboxes
          consentBeratung={consentBeratung}
          consentWeitergabe={consentWeitergabe}
          onChangeBeratung={(v) => { setConsentBeratung(v); if (v) setShowConsentError(false); }}
          onChangeWeitergabe={setConsentWeitergabe}
          showError={showConsentError}
        />

        <button type="submit" disabled={submitting} className="btn-primary w-full justify-center py-3.5">
          {submitting ? "Wird gesendet..." : "Kostenloses Angebot anfordern →"}
        </button>
        <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
          <Lock size={10} /> Kostenlos & unverbindlich · DSGVO-konform
        </p>
      </form>
    </div>
  );
}
