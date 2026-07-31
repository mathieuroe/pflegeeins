"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Bell, Package, Heart, Clock, Building2, Star,
  Search, CheckCircle2, ArrowRight, Phone, Mail, MapPin, ChevronLeft, ChevronDown, Lock,
} from "lucide-react";

const LEISTUNGEN = [
  {
    id: "hausnotruf",
    label: "Hausnotruf",
    desc: "100% Übernahme der Pflegekasse",
    filterLabel: null,
    icon: Bell,
    affiliate: "/hausnotruf-beantragen?start=1",
    affiliateExternal: null,
    affiliateDesc: "Deine Pflegekasse übernimmt die monatlichen Kosten – du zahlst nichts.",
  },
  {
    id: "pflegebox",
    label: "Pflegebox",
    desc: "100% Übernahme der Pflegekasse",
    filterLabel: null,
    icon: Package,
    affiliate: "/pflegebox-beantragen?start=1",
    affiliateExternal: null,
    affiliateDesc: "Monatlich bis zu 42 € für Pflegehilfsmittel – vollständig von der Pflegekasse erstattet.",
  },
  {
    id: "grundpflege",
    label: "Ambulante Pflege",
    desc: "Pflegedienst zu Hause",
    filterLabel: "Ambulante Pflege",
    icon: Heart,
    affiliate: null,
    affiliateExternal: null,
    affiliateDesc: null,
  },
  {
    id: "24h",
    label: "24/7 Pflege",
    desc: "Rund-um-die-Uhr",
    filterLabel: "24/7 Pflege",
    icon: Clock,
    affiliate: null,
    affiliateExternal: null,
    affiliateDesc: null,
  },
  {
    id: "stationaer",
    label: "Stationäre Pflege",
    desc: "Pflegeheim in der Nähe",
    filterLabel: "Stationäre Pflege",
    icon: Building2,
    affiliate: null,
    affiliateExternal: null,
    affiliateDesc: null,
  },
  {
    id: "residenz",
    label: "Senioren Residenz",
    desc: "Betreutes Wohnen",
    filterLabel: "Senioren Residenz",
    icon: Star,
    affiliate: null,
    affiliateExternal: null,
    affiliateDesc: null,
  },
];

type Leistung = (typeof LEISTUNGEN)[0];

export default function HeroClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<1 | 2>(1);
  const [selected, setSelected] = useState<Leistung | null>(() => {
    const tab = searchParams.get("tab");
    return LEISTUNGEN.find((l) => l.id === tab) ?? null;
  });
  const [plz, setPlz] = useState("");
  const [plzError, setPlzError] = useState("");
  const [pflegegrad, setPflegegrad] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [einverstaendnis, setEinverstaendnis] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  function handleSelect(l: Leistung) {
    if (l.affiliate) {
      router.push(l.affiliate);
      return;
    }
    setSelected(l);
    setPlzError("");
    setStep(2);
  }

  function handleBack() {
    setStep(1);
    setPlzError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    if (!/^\d{5}$/.test(plz)) {
      setPlzError("Bitte eine gültige 5-stellige PLZ eingeben.");
      return;
    }
    setSubmitting(true);
    try {
      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email, phone: tel, plz, pflegegrad,
          path: "pflegedienst-vergleich",
          tags: selected.label,
          timestamp: new Date().toISOString(),
          consent_beratung: einverstaendnis,
          consent_weitergabe: false,
          consent_timestamp: new Date().toISOString(),
        }),
      });
      sessionStorage.setItem("liva_tel", tel);
      sessionStorage.setItem("liva_email", email);
      router.push(
        `/pflegedienste?plz=${plz}&leistung=${encodeURIComponent(selected.filterLabel ?? "")}`
      );
    } finally {
      setSubmitting(false);
    }
  }

  const Icon = selected?.icon;

  return (
    <section className="bg-white border-b border-[#E0EDE7] py-10 sm:py-14 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Headline */}
        <div className="text-center mb-6">
          <h1 className="font-serif text-4xl sm:text-5xl text-gray-900 leading-tight mb-2">
            Pflege organisieren
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl font-medium mb-1.5">
            Vergleiche Leistungen & Pflegeeinrichtungen
          </p>
          <p className="text-gray-400 text-sm">
            Einfach. Schnell. Kostenlos.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border-2 border-brand shadow-lg overflow-hidden bg-white">

          {/* Progress bar */}
          <div className="flex gap-1 px-4 pt-4 pb-0">
            <div className={`h-1 flex-1 rounded-full transition-colors duration-300 ${step >= 1 ? "bg-brand" : "bg-gray-200"}`} />
            <div className={`h-1 flex-1 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-brand" : "bg-gray-200"}`} />
          </div>

          {/* STEP 1 — Kategorie wählen */}
          {step === 1 && (
            <div className="p-4 sm:p-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                Was suchst du?
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {LEISTUNGEN.map((l) => {
                  const LIcon = l.icon;
                  const isAffiliate = !!l.affiliate;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => handleSelect(l)}
                      className={`group relative flex flex-col items-start gap-1.5 p-3.5 rounded-xl border-2 text-left transition-all duration-150 hover:border-brand hover:bg-brand-light/30 active:scale-[0.97] ${
                        isAffiliate
                          ? "border-brand/30 bg-brand-light/20"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      {isAffiliate && (
                        <span className="absolute top-2.5 right-2.5 text-[9px] font-bold text-brand bg-brand-light px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                          Kostenlos
                        </span>
                      )}
                      <LIcon
                        size={20}
                        className={`${isAffiliate ? "text-brand" : "text-gray-400 group-hover:text-brand"} transition-colors`}
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 leading-tight">
                          {l.label}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">
                          {l.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && selected && (
            <div className="p-4 sm:p-5">
              {/* Back + selected badge */}
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-brand transition-colors mb-3"
              >
                <ChevronLeft size={14} />
                Andere Kategorie wählen
              </button>

              <div className="flex items-center gap-2 mb-4">
                {Icon && <Icon size={16} className="text-brand flex-shrink-0" />}
                <span className="text-sm font-semibold text-brand">{selected.label}</span>
              </div>

              {selected.affiliate ? (
                /* Intern: Kostenlos ab PG 1 */
                <div>
                  <p className="text-base font-semibold text-gray-900 mb-1">
                    Kostenlos ab Pflegegrad 1
                  </p>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    {selected.affiliateDesc}
                  </p>
                  <button
                    type="button"
                    onClick={() => router.push(selected.affiliate!)}
                    className="w-full btn-primary justify-center py-3.5 text-sm"
                  >
                    Jetzt kostenlos beantragen <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                /* Non-affiliate: PLZ + Tel + Email Form */
                <form onSubmit={handleSubmit} className="space-y-2.5">
                  <div className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-brand transition-colors">
                    <MapPin size={15} className="text-brand flex-shrink-0" />
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={5}
                      placeholder="Deine Postleitzahl"
                      value={plz}
                      onChange={(e) => { setPlz(e.target.value.replace(/\D/g, "")); setPlzError(""); }}
                      className="w-full outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-brand transition-colors">
                    <Phone size={15} className="text-brand flex-shrink-0" />
                    <input
                      type="tel"
                      required
                      placeholder="Telefonnummer"
                      value={tel}
                      onChange={(e) => setTel(e.target.value)}
                      className="w-full outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-brand transition-colors">
                    <Mail size={15} className="text-brand flex-shrink-0" />
                    <input
                      type="email"
                      required
                      placeholder="E-Mail-Adresse"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-brand transition-colors">
                    <Star size={15} className="text-brand flex-shrink-0" />
                    <select
                      required
                      value={pflegegrad}
                      onChange={(e) => setPflegegrad(e.target.value)}
                      className="w-full outline-none text-sm bg-transparent appearance-none text-gray-800"
                    >
                      <option value="">Pflegegrad</option>
                      <option value="Kein Pflegegrad">Kein Pflegegrad</option>
                      <option value="Pflegegrad 1">Pflegegrad 1</option>
                      <option value="Pflegegrad 2">Pflegegrad 2</option>
                      <option value="Pflegegrad 3">Pflegegrad 3</option>
                      <option value="Pflegegrad 4">Pflegegrad 4</option>
                      <option value="Pflegegrad 5">Pflegegrad 5</option>
                    </select>
                    <ChevronDown size={14} className="text-gray-400 flex-shrink-0 pointer-events-none" />
                  </div>
                  {plzError && (
                    <p className="text-red-500 text-xs px-1">{plzError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-primary justify-center py-3.5 text-sm disabled:opacity-60 mt-1"
                  >
                    {submitting ? "Wird geladen…" : <>Ergebnisse anzeigen <ArrowRight size={16} /></>}
                  </button>
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
                  <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1 pt-0.5">
                    <Lock size={9} /> Kostenlos · Unverbindlich · DSGVO-konform
                  </p>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Trust */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-5">
          {[
            "26.000+ Pflegeeinrichtungen im Vergleich",
            "Kostenlos & unverbindlich",
            "Sofort Ergebnisse",
          ].map((t) => (
            <span key={t} className="flex items-center gap-1.5 text-sm text-gray-500">
              <CheckCircle2 size={14} className="text-brand flex-shrink-0" /> {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
