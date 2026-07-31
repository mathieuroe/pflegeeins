"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin, User, Phone, Mail, ChevronRight, Bell, Package, Heart, Home, Brain, Car, CheckCircle2 } from "lucide-react";

const LEISTUNGEN = [
  {
    id: "hausnotruf",
    label: "Hausnotruf",
    sub: "27 € / Monat – von der Pflegekasse",
    icon: Bell,
    affiliate: null,
    internalHref: "/hausnotruf-beantragen?start=1",
  },
  {
    id: "pflegebox",
    label: "Pflegebox",
    sub: "bis 42 € / Monat – von der Pflegekasse",
    icon: Package,
    affiliate: null,
    internalHref: "/pflegebox-beantragen?start=1",
  },
  { id: "grundpflege", label: "Ambulante Pflege", sub: "Körperpflege, Wundversorgung", icon: Heart, affiliate: null, internalHref: null },
  { id: "hauswirtschaft", label: "Hauswirtschaft", sub: "Putzen, Kochen, Einkaufen", icon: Home, affiliate: null, internalHref: null },
  { id: "demenz", label: "Demenzbetreuung", sub: "Begleitung & Betreuung", icon: Brain, affiliate: null, internalHref: null },
  { id: "terminbegleitung", label: "Terminbegleitung", sub: "Arzt, Behörden, Alltag", icon: Car, affiliate: null, internalHref: null },
];

const PFLEGEGRADE = ["Noch kein Pflegegrad", "Pflegegrad 1", "Pflegegrad 2", "Pflegegrad 3", "Pflegegrad 4", "Pflegegrad 5"];
const FUER_WEN = ["Für mich selbst", "Für einen Angehörigen"];

export default function SuchForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [leistung, setLeistung] = useState<typeof LEISTUNGEN[0] | null>(null);
  const [affiliateClicked, setAffiliateClicked] = useState(false);
  const [plz, setPlz] = useState("");
  const [pflegegrad, setPflegegrad] = useState("");
  const [fuerWen, setFuerWen] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [plzError, setPlzError] = useState("");

  function handleLeistungSelect(l: typeof LEISTUNGEN[0]) {
    setLeistung(l);
    if (l.internalHref) {
      router.push(l.internalHref);
    } else if (l.affiliate) {
      setAffiliateClicked(true);
      window.open(l.affiliate, "_blank", "noopener,noreferrer");
    } else {
      setStep(1);
    }
  }

  function validatePlz() {
    if (!/^\d{5}$/.test(plz)) {
      setPlzError("Bitte gib eine gültige 5-stellige PLZ ein.");
      return false;
    }
    setPlzError("");
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone: tel,
          plz,
          pflegegrad,
          path: "pflegedienst-vergleich",
          tags: [leistung?.label, fuerWen].filter(Boolean).join(", "),
          timestamp: new Date().toISOString(),
        }),
      });
      sessionStorage.setItem("liva_tel", tel);
      sessionStorage.setItem("liva_email", email);
      router.push(`/pflegedienste?plz=${plz}&pg=${encodeURIComponent(pflegegrad)}&fuer=${encodeURIComponent(fuerWen)}&leistung=${encodeURIComponent(leistung?.label ?? "")}`);
    } finally {
      setSubmitting(false);
    }
  }

  /* ── Step 0: Leistungsauswahl ── */
  if (step === 0) {
    if (affiliateClicked && leistung) {
      return (
        <div className="bg-white rounded-2xl shadow-xl border border-[#E0EDE7] p-6 text-center">
          <div className="w-14 h-14 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 size={28} className="text-brand" />
          </div>
          <h3 className="font-serif text-xl text-gray-900 mb-2">Du wirst weitergeleitet!</h3>
          <p className="text-sm text-gray-500 mb-4">
            Unser Partner Pflegehase kümmert sich um deinen <strong>{leistung.label}</strong>. Die Seite sollte sich geöffnet haben.
          </p>
          <button
            onClick={() => { setAffiliateClicked(false); setLeistung(null); }}
            className="text-sm text-brand underline"
          >
            Zurück zur Auswahl
          </button>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-2xl shadow-xl border border-[#E0EDE7] overflow-hidden">
        <div className="px-6 pt-6 pb-3">
          <p className="text-xs font-bold text-brand uppercase tracking-widest mb-1">Was benötigst du?</p>
          <h3 className="font-serif text-2xl text-gray-900">Wähle deine Leistung</h3>
        </div>
        <div className="px-4 pb-5 grid grid-cols-2 gap-2.5">
          {LEISTUNGEN.map((l) => {
            const Icon = l.icon;
            const isAffiliate = !!l.affiliate || !!l.internalHref;
            return (
              <button
                key={l.id}
                onClick={() => handleLeistungSelect(l)}
                className={`relative text-left p-3.5 rounded-xl border-2 transition-all hover:-translate-y-0.5 hover:shadow-sm group ${
                  isAffiliate
                    ? "border-brand bg-gradient-to-br from-[#F0F8F4] to-white"
                    : "border-[#E0EDE7] hover:border-brand"
                }`}
              >
                {isAffiliate && (
                  <span className="absolute top-2 right-2 text-[9px] font-bold text-brand bg-brand-light px-1.5 py-0.5 rounded-full">
                    KOSTENLOS
                  </span>
                )}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                  isAffiliate ? "bg-brand" : "bg-gray-100 group-hover:bg-brand-light"
                }`}>
                  <Icon size={16} className={isAffiliate ? "text-white" : "text-gray-600 group-hover:text-brand"} />
                </div>
                <p className="font-semibold text-gray-900 text-sm leading-tight">{l.label}</p>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">{l.sub}</p>
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-gray-400 text-center pb-4">Kostenlos · Unverbindlich · DSGVO-konform</p>
      </div>
    );
  }

  /* ── Stepper (Steps 1–3) ── */
  const stepperSteps = [
    { n: 1, label: "Ort" },
    { n: 2, label: "Situation" },
    { n: 3, label: "Kontakt" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-[#E0EDE7] overflow-hidden">
      {/* Back to step 0 */}
      <div className="px-5 pt-3 pb-0">
        <button
          onClick={() => { setStep(0); setLeistung(null); setPlz(""); setPflegegrad(""); setFuerWen(""); }}
          className="text-xs text-gray-400 hover:text-brand transition-colors flex items-center gap-1"
        >
          ← {leistung?.label ?? "Auswahl"} ändern
        </button>
      </div>

      {/* Stepper */}
      <div className="flex border-b border-[#E0EDE7] mt-2">
        {stepperSteps.map((s, i) => (
          <div
            key={s.n}
            className={`flex-1 py-3 flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors ${
              step === s.n
                ? "bg-brand text-white"
                : step > s.n
                ? "bg-brand-light text-brand"
                : "text-gray-400"
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border ${
              step === s.n ? "border-white bg-white/20 text-white" : step > s.n ? "border-brand text-brand bg-white" : "border-gray-300"
            }`}>{s.n}</span>
            {s.label}
            {i < 2 && <ChevronRight size={12} className="opacity-40" />}
          </div>
        ))}
      </div>

      <div className="p-6 sm:p-8">
        {/* Step 1 – PLZ */}
        {step === 1 && (
          <div>
            <p className="text-xs font-bold text-brand uppercase tracking-widest mb-1">Schritt 1 von 3</p>
            <h3 className="font-serif text-2xl text-gray-900 mb-1">Wo wohnst du?</h3>
            <p className="text-sm text-gray-500 mb-5">Wir zeigen dir verfügbare Pflegedienste für <strong>{leistung?.label}</strong> in deiner Nähe.</p>
            <div className="relative mb-2">
              <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand" />
              <input
                type="text"
                inputMode="numeric"
                maxLength={5}
                placeholder="PLZ eingeben (z.B. 80331)"
                value={plz}
                onChange={(e) => { setPlz(e.target.value.replace(/\D/g, "")); setPlzError(""); }}
                className="input pl-9 text-lg tracking-widest"
                autoFocus
              />
            </div>
            {plzError && <p className="text-red-500 text-xs mb-2">{plzError}</p>}
            <button
              onClick={() => { if (validatePlz()) setStep(2); }}
              className="btn-primary w-full justify-center py-4 text-base mt-3"
            >
              Pflegedienste in meiner Nähe finden <ArrowRight size={18} />
            </button>
            <p className="text-[11px] text-gray-400 text-center mt-3">Kostenlos · Unverbindlich · DSGVO-konform</p>
          </div>
        )}

        {/* Step 2 – Pflegegrad + Für wen */}
        {step === 2 && (
          <div>
            <p className="text-xs font-bold text-brand uppercase tracking-widest mb-1">Schritt 2 von 3</p>
            <h3 className="font-serif text-2xl text-gray-900 mb-1">Kurz zur Situation</h3>
            <p className="text-sm text-gray-500 mb-5">Damit wir die passenden Pflegedienste für dich filtern können.</p>

            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Welcher Pflegegrad liegt vor?</label>
              <div className="grid grid-cols-2 gap-2">
                {PFLEGEGRADE.map((pg) => (
                  <button
                    key={pg}
                    onClick={() => setPflegegrad(pg)}
                    className={`px-3 py-2.5 rounded-xl border text-sm font-medium transition-all text-left ${
                      pflegegrad === pg
                        ? "border-brand bg-brand text-white"
                        : "border-[#E0EDE7] text-gray-700 hover:border-brand"
                    }`}
                  >
                    {pg}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Für wen suchst du?</label>
              <div className="grid gap-2">
                {FUER_WEN.map((fw) => (
                  <button
                    key={fw}
                    onClick={() => setFuerWen(fw)}
                    className={`px-3 py-2.5 rounded-xl border text-sm font-medium transition-all text-left flex items-center gap-2 ${
                      fuerWen === fw
                        ? "border-brand bg-brand text-white"
                        : "border-[#E0EDE7] text-gray-700 hover:border-brand"
                    }`}
                  >
                    <User size={14} className="flex-shrink-0" /> {fw}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => { if (pflegegrad && fuerWen) setStep(3); }}
              disabled={!pflegegrad || !fuerWen}
              className="btn-primary w-full justify-center py-4 text-base disabled:opacity-40"
            >
              Weiter <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* Step 3 – Kontakt */}
        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <p className="text-xs font-bold text-brand uppercase tracking-widest mb-1">Schritt 3 von 3</p>
            <h3 className="font-serif text-2xl text-gray-900 mb-1">Deine Ergebnisse sind bereit</h3>
            <p className="text-sm text-gray-500 mb-5">
              Gib deine Kontaktdaten ein – damit Pflegedienste dich erreichen können.
            </p>
            <div className="space-y-3 mb-5">
              <div className="relative">
                <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand" />
                <input
                  type="tel"
                  required
                  placeholder="Telefonnummer"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  className="input pl-9"
                />
              </div>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand" />
                <input
                  type="email"
                  required
                  placeholder="E-Mail-Adresse"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-9"
                />
              </div>
            </div>
            <button type="submit" disabled={submitting} className="btn-primary w-full justify-center py-4 text-base">
              {submitting ? "Einen Moment…" : <><span>Pflegedienste jetzt anzeigen</span> <ArrowRight size={18} /></>}
            </button>
            <p className="text-[11px] text-gray-400 text-center mt-3">
              Kein Spam · Wir rufen nur zurück wenn du es wünschst · DSGVO-konform
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
