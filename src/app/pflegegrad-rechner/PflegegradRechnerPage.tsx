"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Shield, Clock, Lock, Mail, ChevronDown, CheckCircle2 } from "lucide-react";
import PflegegradRechner from "@/components/funnel/PflegegradRechner";

const AFFILIATE_LEISTUNGEN = [
  {
    id: "pflegebox",
    name: "Pflegehilfsmittelbox",
    emoji: "📦",
    betrag: "42 € / Monat – kostenlos",
    beschreibung: "Handschuhe, Einlagen, Desinfektion und mehr – jeden Monat neu geliefert. Vollständig von der Pflegekasse übernommen. Unser Partner stellt den Antrag kostenlos für dich.",
    affiliateUrl: "/pflegebox-beantragen?start=1",
    affiliateCta: "Jetzt kostenlos bestellen",
    minPg: 1,
  },
  {
    id: "hausnotruf",
    name: "Hausnotruf",
    emoji: "🔔",
    betrag: "27 € / Monat – kostenlos",
    beschreibung: "24/7 Notrufzentrale mit Sturzerkennung. Die Pflegekasse übernimmt die Kosten vollständig. Bei unseren Partnern entstehen für dich keine Kosten – in wenigen Minuten beantragt.",
    affiliateUrl: "/hausnotruf-beantragen?start=1",
    affiliateCta: "Jetzt kostenlos beantragen",
    minPg: 1,
  },
];

const WEITERE_LEISTUNGEN: Record<number, { name: string; betrag: string; schritte: string[] }[]> = {
  1: [
    { name: "Entlastungsbetrag", betrag: "131 € / Monat", schritte: ["Antrag bei deiner Pflegekasse stellen", "Quittungen von anerkannten Dienstleistern sammeln", "Monatlich bis zu 131 € erstattet bekommen"] },
  ],
  2: [
    { name: "Pflegegeld", betrag: "347 € / Monat", schritte: ["Antrag bei deiner Pflegekasse stellen", "Pflegeperson benennen (Angehörige oder Ehrenamtliche)", "Monatliche Auszahlung auf dein Konto"] },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat", schritte: ["Antrag bei deiner Pflegekasse stellen", "Anerkannte Dienstleister nutzen", "Monatlich bis zu 131 € erstattet bekommen"] },
  ],
  3: [
    { name: "Pflegegeld", betrag: "599 € / Monat", schritte: ["Antrag bei deiner Pflegekasse stellen", "Pflegeperson benennen", "Monatliche Auszahlung auf dein Konto"] },
    { name: "Pflegesachleistungen", betrag: "bis 1.497 € / Monat", schritte: ["Ambulanten Pflegedienst beauftragen", "Pflegedienst rechnet direkt mit der Kasse ab", "Bis 1.497 € / Monat werden übernommen"] },
    { name: "Verhinderungs- & Kurzzeitpflege", betrag: "bis 3.539 € / Jahr", schritte: ["Bei Urlaub oder Krankheit der Pflegeperson beantragen", "Antrag bei deiner Pflegekasse stellen", "Wird rückwirkend erstattet"] },
  ],
  4: [
    { name: "Pflegegeld", betrag: "800 € / Monat", schritte: ["Antrag bei deiner Pflegekasse stellen", "Pflegeperson benennen", "Monatliche Auszahlung auf dein Konto"] },
    { name: "Pflegesachleistungen", betrag: "bis 1.859 € / Monat", schritte: ["Ambulanten Pflegedienst beauftragen", "Pflegedienst rechnet direkt mit der Kasse ab", "Bis 1.859 € / Monat werden übernommen"] },
    { name: "Verhinderungs- & Kurzzeitpflege", betrag: "bis 3.539 € / Jahr", schritte: ["Bei Urlaub oder Krankheit der Pflegeperson beantragen", "Antrag bei deiner Pflegekasse stellen", "Wird rückwirkend erstattet"] },
  ],
  5: [
    { name: "Pflegegeld", betrag: "990 € / Monat", schritte: ["Antrag bei deiner Pflegekasse stellen", "Pflegeperson benennen", "Monatliche Auszahlung auf dein Konto"] },
    { name: "Pflegesachleistungen", betrag: "bis 2.299 € / Monat", schritte: ["Ambulanten Pflegedienst beauftragen", "Pflegedienst rechnet direkt mit der Kasse ab", "Bis 2.299 € / Monat werden übernommen"] },
    { name: "Tagespflege", betrag: "bis 2.085 € / Monat", schritte: ["Tagespflegeeinrichtung in deiner Nähe finden", "Antrag bei deiner Pflegekasse stellen", "Kosten werden direkt übernommen"] },
  ],
};

const PFLEGEGRAD_LABELS: Record<number, { titel: string; farbe: string; beschreibung: string }> = {
  0: { titel: "Kein Pflegegrad", farbe: "#6B7280", beschreibung: "Aktuell reicht die Punktzahl noch nicht – aber das kann sich ändern. Wir zeigen dir, was jetzt sinnvoll ist." },
  1: { titel: "Pflegegrad 1", farbe: "#10B981", beschreibung: "Erste Leistungen stehen dir zu – darunter die kostenlose Pflegebox und der Hausnotruf-Zuschuss." },
  2: { titel: "Pflegegrad 2", farbe: "#F59E0B", beschreibung: "Ab hier gibt es Pflegegeld – Geld, das direkt auf dein Konto fließt. Jeden Monat." },
  3: { titel: "Pflegegrad 3", farbe: "#F97316", beschreibung: "Erhebliche Unterstützung: bis zu 599 € Pflegegeld und bis zu 1.497 € Sachleistungen monatlich." },
  4: { titel: "Pflegegrad 4", farbe: "#EF4444", beschreibung: "Umfassende Leistungen: 800 € Pflegegeld und bis zu 1.859 € Pflegesachleistungen pro Monat." },
  5: { titel: "Pflegegrad 5", farbe: "#7C3AED", beschreibung: "Höchste Einstufung – mit dem vollen Leistungsumfang der Pflegeversicherung." },
};


export default function PflegegradRechnerPage() {
  const [ergebnis, setErgebnis] = useState<{ pflegegrad: number; punkte: number } | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleErgebnis(pflegegrad: number, gesamtpunkte: number) {
    setErgebnis({ pflegegrad, punkte: gesamtpunkte });
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ergebnis) return;
    setSubmitting(true);
    try {
      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          pflegegrad: ergebnis.pflegegrad.toString(),
          tags: "Ergebnis-Email",
          path: "/pflegegrad-rechner",
          timestamp: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  const pg = ergebnis ? PFLEGEGRAD_LABELS[ergebnis.pflegegrad] : null;

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E0EDE7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-10">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-brand-light text-brand text-xs font-semibold px-3 py-1.5 rounded-full">
              <Shield size={12} /> Anonym & kostenlos
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full">
              <Clock size={12} /> ca. 5–10 Minuten
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full">
              <Lock size={12} /> Kein Login nötig
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl text-gray-900 leading-tight mb-4">
            Pflegegrad Rechner 2026 –<br className="hidden sm:block" /> Kostenlos &amp; anonym
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            Du weißt nicht sicher, ob Anspruch auf Pflegeleistungen besteht – und was dann eigentlich passiert? In 5 Minuten hast du eine klare Einschätzung. Und weißt, welche Leistungen du beantragen kannst.
          </p>

        </div>
      </section>

      {/* ── Rechner oder Ergebnis ────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        {!ergebnis ? (
          <PflegegradRechner onErgebnis={handleErgebnis} />
        ) : (
          <div className="space-y-6">

            {/* Hinweis */}
            <p className="font-serif text-2xl text-gray-800">Gut, dass du dich jetzt kümmerst.</p>

            {/* Ergebnis-Card */}
            <div
              className="rounded-2xl p-7 text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, ${pg!.farbe}ee, ${pg!.farbe}bb)` }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-2">Dein geschätztes Ergebnis</p>
              <h2 className="font-serif text-4xl font-bold mb-1">{pg!.titel}</h2>
              <p className="text-sm opacity-70">{ergebnis.punkte.toLocaleString("de-DE")} von 100 Punkten</p>
              {ergebnis.pflegegrad === 5 && ergebnis.punkte < 90 && (
                <p className="text-xs opacity-80 mt-1 leading-relaxed">Aufgrund der vollständigen Gebrauchsunfähigkeit von Armen und Beinen erfolgt die Einstufung in Pflegegrad 5 unabhängig von der Gesamtpunktzahl.</p>
              )}
              <p className="text-sm opacity-90 mt-3 leading-relaxed">{pg!.beschreibung}</p>
            </div>

            {/* Leistungen */}
            {ergebnis.pflegegrad === 0 ? (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <p className="font-semibold text-amber-900 mb-2">Noch kein Pflegegrad – was jetzt?</p>
                <p className="text-sm text-amber-800 leading-relaxed mb-4">
                  Die Punktzahl reicht aktuell noch nicht – aber das kann sich ändern. Viele Menschen unterschätzen den Hilfebedarf beim ersten Anlauf. Ein Widerspruch oder eine Neubewertung lohnt sich oft.
                </p>
                <Link href="/pflegegrad-rechner" className="btn-secondary inline-flex items-center gap-2 text-sm">
                  Rechner nochmal starten <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Das steht dir zu</p>
                  <div className="space-y-3">

                    {/* Affiliate Leistungen: Pflegebox + Hausnotruf immer zuerst */}
                    {AFFILIATE_LEISTUNGEN.filter((l) => ergebnis.pflegegrad >= l.minPg).map((l) => {
                      const open = expandedId === l.id;
                      return (
                        <div key={l.id} className="bg-white border border-[#E0EDE7] rounded-2xl overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setExpandedId(open ? null : l.id)}
                            className="w-full flex items-center justify-between gap-3 p-4 text-left"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{l.emoji}</span>
                              <div>
                                <p className="font-semibold text-gray-900 text-sm">{l.name}</p>
                                <p className="text-xs text-brand font-medium">{l.betrag}</p>
                              </div>
                            </div>
                            <ChevronDown size={18} className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                          </button>
                          {open && (
                            <div className="px-4 pb-5 border-t border-[#E0EDE7] pt-4">
                              <p className="text-sm text-gray-600 leading-relaxed mb-4">{l.beschreibung}</p>
                              <Link
                                href={l.affiliateUrl}
                                className="btn-primary inline-flex items-center gap-2 text-sm"
                              >
                                {l.affiliateCta} <ArrowRight size={14} />
                              </Link>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Weitere Leistungen je nach PG */}
                    {(WEITERE_LEISTUNGEN[ergebnis.pflegegrad] ?? []).map((l) => {
                      const id = l.name;
                      const open = expandedId === id;
                      return (
                        <div key={id} className="bg-white border border-[#E0EDE7] rounded-2xl overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setExpandedId(open ? null : id)}
                            className="w-full flex items-center justify-between gap-3 p-4 text-left"
                          >
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">{l.name}</p>
                              <p className="text-xs text-brand font-medium">{l.betrag}</p>
                            </div>
                            <ChevronDown size={18} className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                          </button>
                          {open && (
                            <div className="px-4 pb-5 border-t border-[#E0EDE7] pt-4">
                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Wie beantragen?</p>
                              <ol className="space-y-2">
                                {l.schritte.map((s, i) => (
                                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                                    <span className="w-5 h-5 rounded-full bg-brand-light text-brand text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                                    {s}
                                  </li>
                                ))}
                              </ol>
                            </div>
                          )}
                        </div>
                      );
                    })}

                  </div>
                </div>
              </>
            )}

            {/* Inline Kontaktformular */}
            <div className="bg-white border border-[#E0EDE7] rounded-2xl p-6">
              {!submitted ? (
                <>
                  <p className="text-xs font-bold text-brand uppercase tracking-widest mb-1.5">Kostenlos & unverbindlich</p>
                  <h3 className="font-serif text-xl text-gray-900 mb-1">Ergebnis kostenlos erhalten</h3>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    Wir schicken dir deine persönliche Leistungsübersicht per E-Mail – mit konkreten Beträgen und nächsten Schritten.
                  </p>
                  <form onSubmit={handleFormSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Dein Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input w-full"
                    />
                    <input
                      required
                      type="email"
                      placeholder="E-Mail-Adresse *"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input w-full"
                    />
                    <input
                      type="tel"
                      placeholder="Telefonnummer (optional)"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="input w-full"
                    />
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={consent}
                        onClick={() => setConsent(c => !c)}
                        className={`mt-0.5 w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${consent ? "bg-brand border-brand" : "border-gray-300"}`}
                      >
                        {consent && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </button>
                      <span className="text-xs text-gray-500 leading-relaxed">
                        Ich stimme der Verarbeitung meiner Daten gemäß{" "}
                        <Link href="/datenschutz" className="text-brand hover:underline underline-offset-2" target="_blank">Datenschutzerklärung</Link>
                        {" "}zu. Die Angaben zum Pflegegrad werden vertraulich behandelt (Art. 9 DSGVO).
                      </span>
                    </label>
                    <button
                      type="submit"
                      disabled={submitting || !consent}
                      className="btn-primary w-full py-3.5 justify-center text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Wird gesendet…" : <><Mail size={16} /> Ergebnis kostenlos erhalten</>}
                    </button>
                    <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
                      <Lock size={10} /> DSGVO-konform · Kein Spam · Jederzeit abmeldbar
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 size={24} className="text-white" />
                  </div>
                  <h3 className="font-serif text-xl text-gray-900 mb-1">Unterwegs zu dir.</h3>
                  <p className="text-sm text-gray-500">Schau in dein Postfach – deine Übersicht ist auf dem Weg.</p>
                </div>
              )}
            </div>

            {/* Neu berechnen */}
            <div className="text-center">
              <button
                onClick={() => { setErgebnis(null); setSubmitted(false); setForm({ name: "", email: "", phone: "" }); }}
                className="text-sm text-gray-400 hover:text-brand underline underline-offset-2 transition-colors"
              >
                Rechner neu starten
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ── Erklärung Pflegegrade ───────────────────────────────── */}
      {!ergebnis && (
        <section className="bg-white border-t border-[#E0EDE7] py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-serif text-2xl text-gray-900 mb-8">Die 5 Pflegegrade im Überblick</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { pg: 1, punkte: "12,5–27", label: "Geringe Beeinträchtigung", farbe: "#10B981" },
                { pg: 2, punkte: "27–47,5", label: "Erhebliche Beeinträchtigung", farbe: "#F59E0B" },
                { pg: 3, punkte: "47,5–70", label: "Schwere Beeinträchtigung", farbe: "#F97316" },
                { pg: 4, punkte: "70–90", label: "Schwerste Beeinträchtigung", farbe: "#EF4444" },
                { pg: 5, punkte: "90–100", label: "Schwerste + besondere Anforderungen", farbe: "#7C3AED" },
              ].map((item) => (
                <div key={item.pg} className="rounded-xl border border-[#E0EDE7] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: item.farbe }}>
                      {item.pg}
                    </span>
                    <span className="font-semibold text-gray-900 text-sm">Pflegegrad {item.pg}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.punkte} Punkte</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      {!ergebnis && (
        <section className="py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-serif text-2xl text-gray-900 mb-8">Häufige Fragen zum Pflegegrad Rechner</h2>
            <div className="space-y-5">
              {[
                {
                  q: "Wie genau ist das Ergebnis?",
                  a: "Der Rechner orientiert sich am neuen Begutachtungsassessment (NBA) und den Begutachtungs-Richtlinien. Das Ergebnis ist eine unverbindliche Selbsteinschätzung und kann von der Begutachtung des Medizinischen Dienstes abweichen. Als Vorbereitung auf den Begutachtungstermin ist er dennoch sehr hilfreich.",
                },
                {
                  q: "Muss ich meinen Namen oder meine Daten angeben?",
                  a: "Nein. Der Rechner ist vollständig anonym. Keine Anmeldung, kein Name, keine Krankenversicherungsnummer. Deine Antworten werden nicht gespeichert. Du kannst ihn so oft nutzen wie du möchtest.",
                },
                {
                  q: "Wie lange dauert es?",
                  a: "Die meisten schließen den Rechner in 5–8 Minuten ab. Du kannst zwischendurch pausieren und weitermachen. Das Ergebnis siehst du sofort – kein Warten, keine E-Mail nötig.",
                },
                {
                  q: "Was bekomme ich mit Pflegegrad 1?",
                  a: "Mehr als die meisten erwarten: Entlastungsbetrag (131 € / Monat für Alltagshilfe), die kostenlose Pflegebox (bis 42 € / Monat), und den Hausnotruf-Zuschuss (27 € / Monat). Pflegegeld gibt es erst ab Pflegegrad 2 – aber auch PG 1 bringt echte monatliche Entlastung.",
                },
                {
                  q: "Was, wenn das Ergebnis niedriger ist als erwartet?",
                  a: "Das kommt vor – und du hast Möglichkeiten. Nach dem offiziellen MD-Bescheid kannst du innerhalb eines Monats Widerspruch einlegen. In rund 35% aller Widersprüche wird der Pflegegrad heraufgestuft. Wir helfen dir dabei, die richtigen Argumente zu sammeln.",
                },
                {
                  q: "Was sind die nächsten Schritte nach dem Rechner?",
                  a: "Stell einen Antrag bei deiner Pflegekasse – das geht schriftlich, telefonisch oder online. Der MD kommt dann zur Begutachtung. Mit unserem kostenlosen Ergebnis-PDF weißt du vorab genau, was bewertet wird – und wie du dich am besten vorbereitest.",
                },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-white rounded-xl border border-[#E0EDE7] p-5 cursor-pointer">
                  <summary className="font-semibold text-gray-900 text-sm list-none flex items-center justify-between gap-3">
                    {q}
                    <span className="text-brand text-lg leading-none group-open:rotate-45 transition-transform duration-200 flex-shrink-0">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Interne Verlinkung ─────────────────────────────────────── */}
      {!ergebnis && (
        <section className="bg-white border-t border-[#E0EDE7] py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-serif text-xl text-gray-900 mb-6">Mehr zum Pflegesystem</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link href="/leistungen" className="group rounded-xl border border-[#E0EDE7] p-5 hover:border-brand/40 hover:shadow-sm transition-all">
                <p className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-brand transition-colors">Alle Pflegeleistungen</p>
                <p className="text-xs text-gray-500 leading-relaxed">Pflegebox, Hausnotruf, Entlastungsbetrag – was dir ab welchem Pflegegrad zusteht.</p>
              </Link>
              <Link href="/ratgeber/erste-30-tage-mit-pflegegrad" className="group rounded-xl border border-[#E0EDE7] p-5 hover:border-brand/40 hover:shadow-sm transition-all">
                <p className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-brand transition-colors">Die ersten 30 Tage</p>
                <p className="text-xs text-gray-500 leading-relaxed">Du hast gerade den Bescheid bekommen – hier ist die Schritt-für-Schritt-Checkliste.</p>
              </Link>
              <Link href="/ratgeber/mdk-besuch-vorbereitung" className="group rounded-xl border border-[#E0EDE7] p-5 hover:border-brand/40 hover:shadow-sm transition-all">
                <p className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-brand transition-colors">MD-Besuch vorbereiten</p>
                <p className="text-xs text-gray-500 leading-relaxed">So bereitest du dich auf die Begutachtung vor – und bekommst den Pflegegrad, der wirklich zutrifft.</p>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ─────────────────────────────────────────────── */}
      {!ergebnis && (
        <section className="bg-brand py-14">
          <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-serif text-3xl text-white mb-3">In 5 Minuten weißt du, wo du stehst.</h2>
            <p className="text-white/70 mb-6 text-sm leading-relaxed">
              Anonym, kostenlos – orientiert am neuen Begutachtungsassessment (NBA) und den Begutachtungs-Richtlinien.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-white text-brand font-semibold px-8 py-3.5 text-base rounded-2xl hover:bg-brand-light transition-colors"
            >
              Rechner starten <ArrowRight size={18} />
            </button>
          </div>
        </section>
      )}


    </main>
  );
}
