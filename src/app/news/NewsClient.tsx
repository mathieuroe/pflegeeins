"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight, Mail, Check } from "lucide-react";
import { NEWS } from "@/lib/content-data";

const MONATE: Record<string, number> = {
  Januar: 1, Februar: 2, März: 3, April: 4, Mai: 5, Juni: 6,
  Juli: 7, August: 8, September: 9, Oktober: 10, November: 11, Dezember: 12,
};
function datumToNum(datum: string): number {
  const [monat, jahr] = datum.split(" ");
  return parseInt(jahr) * 100 + (MONATE[monat] ?? 0);
}
const NEWS_SORTED = [...NEWS].sort((a, b) => datumToNum(b.datum) - datumToNum(a.datum));

const KATEGORIEN = ["Alle", ...Array.from(new Set(NEWS_SORTED.map((n) => n.kategorie)))];

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          tags: "Newsletter",
          path: "/news",
          timestamp: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-2.5 text-brand text-sm font-semibold">
        <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
          <Check size={13} className="text-white" />
        </div>
        Danke – du bist dabei. Wir melden uns bei Neuigkeiten.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap sm:flex-nowrap">
      <input
        type="email"
        required
        placeholder="Deine E-Mail-Adresse"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input flex-1 min-w-0 text-sm"
      />
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary text-sm px-5 py-2.5 whitespace-nowrap flex-shrink-0"
      >
        <Mail size={15} />
        {submitting ? "Wird eingetragen…" : "Informiert bleiben"}
      </button>
    </form>
  );
}

export default function NewsClient() {
  const [aktiv, setAktiv] = useState("Alle");

  const gefiltert = aktiv === "Alle" ? NEWS_SORTED : NEWS_SORTED.filter((n) => n.kategorie === aktiv);

  return (
    <>
      {/* Newsletter-Leadmagnet */}
      <section className="px-4 sm:px-6 py-6 border-b border-neutral-100 bg-brand-light/40">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-brand uppercase tracking-widest mb-0.5">Keine Änderung verpassen</p>
              <p className="text-sm text-gray-600">Neue Leistungen, Gesetzesänderungen und Tipps – direkt in dein Postfach. Kostenlos, kein Spam.</p>
            </div>
            <div className="sm:w-[420px] flex-shrink-0">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>

      {/* Kategorie-Filter */}
      <section className="px-4 sm:px-6 py-5 border-b border-neutral-200 bg-white sticky top-[60px] z-10">
        <div className="max-w-3xl mx-auto flex gap-2 flex-wrap">
          {KATEGORIEN.map((k) => (
            <button
              key={k}
              onClick={() => setAktiv(k)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                aktiv === k
                  ? "bg-brand text-white border-brand"
                  : "bg-white text-gray-600 border-neutral-200 hover:border-brand hover:text-brand"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </section>

      {/* Artikel-Liste */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {gefiltert.length === 0 && (
          <p className="text-gray-400 text-sm">Keine Artikel in dieser Kategorie.</p>
        )}

        {gefiltert.length > 0 && (
          <div className="space-y-6">
            {gefiltert.map((artikel, i) => {
              const isFeatured = i === 0;
              return (
                <div key={artikel.slug} className="flex gap-3 sm:gap-4 items-start">
                  {/* Datum links – nur Desktop */}
                  <div className="hidden sm:block w-20 shrink-0 text-right pt-2">
                    <span className="text-xs text-gray-400 leading-tight">{artikel.datum}</span>
                  </div>

                  {/* Linie + Dot */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`mt-2 rounded-full border-2 border-brand shrink-0 ${isFeatured ? "w-4 h-4 bg-brand" : "w-3 h-3 bg-brand-light"}`} />
                    <div className="flex-1 w-px bg-[#E0EDE7] mt-1" />
                  </div>

                  {/* Karte */}
                  <Link
                    href={`/news/${artikel.slug}`}
                    className={`group flex-1 rounded-xl border transition-shadow mb-6 ${
                      isFeatured
                        ? "border-[#E0EDE7] bg-[#F6FAF8] p-5 sm:p-7 hover:shadow-md"
                        : "border-[#E0EDE7] bg-white p-4 sm:p-5 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${isFeatured ? "bg-brand-light text-brand" : "bg-gray-100 text-gray-600"}`}>
                        {artikel.kategorie}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock size={11} /> {artikel.lesezeit}
                      </span>
                      <span className="sm:hidden ml-auto text-xs text-gray-400">{artikel.datum}</span>
                    </div>
                    {isFeatured ? (
                      <>
                        <h2 className="font-serif text-xl sm:text-2xl text-gray-900 mb-2 group-hover:text-brand transition-colors leading-snug">
                          {artikel.titel}
                        </h2>
                        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-4">{artikel.beschreibung}</p>
                        <span className="flex items-center gap-1.5 text-sm font-semibold text-brand group-hover:gap-2.5 transition-all">
                          Jetzt lesen <ArrowRight size={14} />
                        </span>
                      </>
                    ) : (
                      <>
                        <h3 className="font-semibold text-gray-900 leading-snug mb-1 group-hover:text-brand transition-colors text-sm sm:text-base">
                          {artikel.titel}
                        </h3>
                        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{artikel.beschreibung}</p>
                      </>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {/* Inline CTA nach Artikeln */}
        <div className="mt-4 bg-brand-light rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm mb-0.5">Was steht dir konkret zu?</p>
            <p className="text-xs text-gray-500">Ermittle deinen Pflegegrad und sieh sofort welche Leistungen du beantragen kannst.</p>
          </div>
          <Link href="/pflegegrad-rechner" className="btn-primary text-sm whitespace-nowrap flex-shrink-0">
            Rechner starten <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </>
  );
}
