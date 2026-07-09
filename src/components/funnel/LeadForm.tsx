"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
  cta: string;
  path: string;
  pflegegrad?: string;
}

export default function LeadForm({ title, subtitle, cta, path, pflegegrad }: Props) {
  const [form, setForm] = useState({ email: "", phone: "", plz: "", pflegegradInput: pflegegrad || "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, path, pflegegrad: form.pflegegradInput || pflegegrad, timestamp: new Date().toISOString() }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} className="text-brand" />
        </div>
        <h3 className="font-serif text-2xl text-gray-900 mb-2">Super, wir melden uns!</h3>
        <p className="text-gray-500 text-sm">Innerhalb von 24 Stunden bekommst du eine Nachricht von uns.</p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h3 className="font-serif text-2xl text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500 text-sm mb-6">{subtitle}</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="email" required placeholder="E-Mail-Adresse" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
        <input type="tel" placeholder="Telefonnummer (optional)" value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
        <input type="text" placeholder="PLZ (optional)" maxLength={5} value={form.plz}
          onChange={(e) => setForm({ ...form, plz: e.target.value })} className="input" />
        {!pflegegrad && (
          <select
            value={form.pflegegradInput}
            onChange={(e) => setForm({ ...form, pflegegradInput: e.target.value })}
            className="input"
          >
            <option value="">Pflegegrad (optional)</option>
            <option value="Kein Pflegegrad">Kein Pflegegrad</option>
            <option value="Pflegegrad 1">Pflegegrad 1</option>
            <option value="Pflegegrad 2">Pflegegrad 2</option>
            <option value="Pflegegrad 3">Pflegegrad 3</option>
            <option value="Pflegegrad 4">Pflegegrad 4</option>
            <option value="Pflegegrad 5">Pflegegrad 5</option>
          </select>
        )}
        <button type="submit" disabled={submitting} className="btn-primary w-full justify-center py-3.5 text-base mt-2">
          {submitting ? "Wird gesendet..." : <>{cta} <ArrowRight size={18} /></>}
        </button>
        <p className="text-xs text-gray-400 text-center pt-1">
          100% kostenlos · Kein Spam · DSGVO-konform
        </p>
      </form>
    </div>
  );
}
