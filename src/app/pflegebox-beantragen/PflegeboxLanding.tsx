"use client";

import { useState } from "react";
import {
  ArrowRight, Package, ShieldCheck, Clock, CheckCircle2,
  Phone, ChevronDown, Star, Users, Heart, Truck, RefreshCw,
  Droplets, Hand, Wind, Shield,
} from "lucide-react";
import BeratungsModal from "@/components/BeratungsModal";

interface PflegeboxLandingProps {
  onStart: () => void;
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "Ab welchem Pflegegrad habe ich Anspruch auf eine Pflegebox?",
    a: "Ab Pflegegrad 1 übernimmt deine Pflegekasse bis zu 42 € monatlich für Pflegehilfsmittel zum Verbrauch. Du zahlst keinen Eigenanteil.",
  },
  {
    q: "Was genau kommt in die Box?",
    a: "Du stellst deine Box selbst zusammen – aus Desinfektionsmitteln, Einmalhandschuhen, Mundschutz, FFP2-Masken, Bettschutzeinlagen und mehr. Alles Produkte, die du in der häuslichen Pflege wirklich brauchst.",
  },
  {
    q: "Wie oft bekomme ich die Box geliefert?",
    a: "Monatlich, kostenlos direkt zu dir nach Hause. Du kannst die Zusammenstellung jederzeit anpassen.",
  },
  {
    q: "Muss ich die Produkte selbst bezahlen?",
    a: "Nein. Solange der Warenwert innerhalb des monatlichen Budgets von 42 € liegt, übernimmt die Pflegekasse alles. Du zahlst nichts.",
  },
  {
    q: "Kann ich den Inhalt jeden Monat ändern?",
    a: "Ja. Du kannst deine Auswahl monatlich neu zusammenstellen – je nach aktuellem Bedarf. Einfach neu beantragen.",
  },
  {
    q: "Wie lange dauert es bis die erste Box ankommt?",
    a: "Nach Antragsgenehmigung durch die Pflegekasse erhältst du die erste Lieferung in der Regel innerhalb von 3–5 Werktagen.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E0EDE7] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-gray-900 hover:text-brand transition-colors cursor-pointer"
        aria-expanded={open}
      >
        {q}
        <ChevronDown size={16} className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="pb-4 text-sm text-gray-500 leading-relaxed">{a}</p>}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function PflegeboxLanding({ onStart }: PflegeboxLandingProps) {
  const [beratungOpen, setBeratungOpen] = useState(false);

  return (
    <div className="bg-white">
      {beratungOpen && (
        <BeratungsModal quelle="Pflegebox" onClose={() => setBeratungOpen(false)} />
      )}

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E0EDE7] py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          {/* Badge + Headline */}
          <div className="max-w-2xl mb-6">
            <span className="inline-flex items-center gap-1.5 bg-brand-light text-brand text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wide">
              <CheckCircle2 size={12} /> Pflegekasse zahlt – du nicht
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-gray-900 leading-tight mb-4">
              Pflegebox <span className="text-brand">kostenlos</span> beantragen
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Gemeinsam mit unserem Partner <strong className="text-gray-700">Blubox</strong> erhältst du ab Pflegegrad 1 monatlich Pflegehilfsmittel kostenlos. Bis zu 42 € übernimmt die Pflegekasse – du wählst selbst was du brauchst.
            </p>
          </div>

          {/* Bullets */}
          <div className="space-y-2.5 mb-8">
            {[
              "Kein Eigenanteil – Pflegekasse übernimmt bis zu 42 €/Monat",
              "Produkte frei wählbar – aus über 12 Pflegehilfsmitteln",
              "Kostenloser Versand monatlich direkt zu dir nach Hause",
              "Kein Abo, keine Mindestlaufzeit – jederzeit kündbar",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-brand flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 items-start">
            <button onClick={onStart} className="btn-primary text-base px-7 py-4">
              Pflegebox zusammenstellen <ArrowRight size={18} />
            </button>
            <button
              onClick={() => setBeratungOpen(true)}
              className="btn-secondary text-sm px-6 py-4 flex items-center gap-2 cursor-pointer"
            >
              <Phone size={15} /> Kostenloses Beratungsgespräch
            </button>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ──────────────────────────────────────────────────────── */}
      <section className="bg-brand-light border-b border-[#E0EDE7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: ShieldCheck, label: "Gesetzlicher Anspruch", sub: "§ 40 SGB XI" },
              { icon: Package,     label: "Produkte frei wählbar", sub: "Deine Box, dein Mix" },
              { icon: Truck,       label: "Kostenloser Versand",   sub: "Monatlich zu dir" },
              { icon: RefreshCw,   label: "Jederzeit kündbar",     sub: "Kein Risiko" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Icon size={16} className="text-brand" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">{label}</p>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ablauf ─────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 border-b border-[#E0EDE7]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label">So einfach geht's</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 mb-3 leading-tight">
              In 3 Schritten zur kostenlosen Pflegebox
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 relative">
            <div className="hidden sm:block absolute top-10 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px bg-gradient-to-r from-brand/30 via-brand/60 to-brand/30" />
            {[
              { num: "1", title: "Produkte wählen",  desc: "Stell dir deine Box aus Pflegehilfsmitteln zusammen – bis zu 42 € monatlich." },
              { num: "2", title: "Antrag absenden",  desc: "Wir reichen den Antrag bei deiner Pflegekasse ein. Dauert ca. 2 Minuten." },
              { num: "3", title: "Box kommt zu dir", desc: "Die erste Lieferung kommt nach Genehmigung direkt zu dir nach Hause – kostenlos." },
            ].map(({ num, title, desc }) => (
              <div key={num} className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-brand text-white font-bold text-base flex items-center justify-center mb-4 relative z-10 shadow-md shadow-brand/20">
                  {num}
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Was ist die Pflegebox? ──────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="section-label">Was ist die Pflegebox?</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 mb-5 leading-tight">
                Pflegehilfsmittel, die du wirklich brauchst – jeden Monat neu
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Wer einen anerkannten Pflegegrad hat, hat gesetzlichen Anspruch auf
                <strong className="text-gray-900"> Pflegehilfsmittel zum Verbrauch</strong> im Wert von bis zu 42 € monatlich.
                Die Pflegekasse übernimmt die Kosten vollständig – du wählst einfach aus, was du brauchst.
              </p>
              <div className="space-y-2.5 mb-6">
                {[
                  "Selbst zusammenstellen – nur was du wirklich brauchst",
                  "Monatliche Lieferung direkt nach Hause",
                  "Pflegekasse zahlt – du zahlst nichts",
                  "Keine Vertragsbindung, jederzeit kündbar",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-brand flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category cards */}
            <div className="bg-brand-light rounded-3xl p-6 grid grid-cols-2 gap-3">
              {[
                { icon: Droplets, title: "Desinfektion für Flächen", desc: "Flächendesinfektion, Desinfektionstücher" },
                { icon: Hand,     title: "Direkter Kontakt",         desc: "Einmalhandschuhe, Fingerlinge, Handgel" },
                { icon: Wind,     title: "Atemwegschutz",            desc: "FFP2-Masken, medizinischer Mundschutz" },
                { icon: Shield,   title: "Körperflüssigkeiten",      desc: "Bettschutzeinlagen, Waschlotion" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center mb-3">
                    <Icon size={15} className="text-brand" />
                  </div>
                  <p className="text-xs font-semibold text-gray-900 mb-1 leading-tight">{title}</p>
                  <p className="text-[10px] text-gray-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Wer hat Anspruch? ───────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-gray-50 border-y border-[#E0EDE7]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-label">Anspruchsberechtigung</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 mb-3 leading-tight">
              Wer bekommt die Pflegebox kostenlos?
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Der Anspruch gilt für alle, die einen anerkannten Pflegegrad haben – unabhängig vom Alter.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Star,        title: "Pflegegrad 1–5",              desc: "Ab Pflegegrad 1 hast du Anspruch auf bis zu 42 € monatlich für Pflegehilfsmittel." },
              { icon: Heart,       title: "Häusliche Pflege",            desc: "Du lebst zuhause und wirst dort gepflegt – ambulant oder durch Angehörige." },
              { icon: Users,       title: "Pflegende Angehörige",        desc: "Auch wenn du als Angehöriger pflegst, kannst du die Box für die pflegebedürftige Person beantragen." },
              { icon: Clock,       title: "Erstmaliger Antrag",          desc: "Noch keine Pflegebox? Du kannst den Anspruch rückwirkend für bis zu 3 Monate geltend machen." },
              { icon: RefreshCw,   title: "Wechsel des Anbieters",       desc: "Du hast schon eine Pflegebox woanders? Kein Problem – wechseln ist jederzeit möglich." },
              { icon: ShieldCheck, title: "Kein Pflegedienst nötig",     desc: "Du brauchst keinen ambulanten Pflegedienst. Der Anspruch gilt unabhängig davon." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-[#E0EDE7] p-5 hover:border-brand/30 hover:shadow-sm transition-all">
                <div className="w-9 h-9 rounded-xl bg-brand-light flex items-center justify-center mb-4">
                  <Icon size={16} className="text-brand" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">Nicht sicher ob du Anspruch hast?</p>
            <button onClick={onStart} className="btn-primary px-6 py-3 text-sm">
              Kostenlos prüfen lassen <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Kostenübersicht ────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-brand text-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-brand-light/80 text-xs font-bold uppercase tracking-widest mb-3">Was zahlt die Pflegekasse?</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-white mb-5 leading-tight">
                Du zahlst nichts – die Pflegekasse zahlt alles
              </h2>
              <p className="text-white/75 leading-relaxed mb-6">
                Gemäß <strong className="text-white">§ 40 SGB XI</strong> übernimmt die Pflegekasse bei anerkanntem Pflegegrad
                bis zu <strong className="text-white">42 € monatlich</strong> für Pflegehilfsmittel zum Verbrauch.
                Du zahlst keinen Cent – weder für die Produkte noch für den Versand.
              </p>
              <div className="space-y-2.5 mb-6">
                {[
                  "Produkte vollständig gedeckt (bis 42 €)",
                  "Versand kostenlos",
                  "Kein Eigenanteil, keine versteckten Kosten",
                  "Antrag läuft automatisch weiter",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-brand-light flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/90">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/50">Rechtsgrundlage: § 40 Abs. 1–3 SGB XI. Stand: 2025.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-7 border border-white/20">
              <p className="text-xs text-white/60 uppercase tracking-widest font-semibold mb-5">Kostenübersicht</p>
              <div className="space-y-4">
                {[
                  { label: "Monatliche Kosten für dich", value: "0,00 €",   highlight: true },
                  { label: "Pflegekasse übernimmt",       value: "bis 42 €" },
                  { label: "Versandkosten",               value: "0,00 €" },
                  { label: "Vertragsbindung",             value: "Keine" },
                ].map(({ label, value, highlight }) => (
                  <div key={label} className={`flex items-center justify-between py-3 border-b border-white/10 last:border-0 ${highlight ? "font-bold" : ""}`}>
                    <span className={`text-sm ${highlight ? "text-white" : "text-white/70"}`}>{label}</span>
                    <span className={`text-sm tabular-nums ${highlight ? "text-brand-light text-base" : "text-white"}`}>{value}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={onStart}
                className="w-full mt-6 bg-white text-brand font-semibold py-3 rounded-2xl hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                Jetzt kostenlos beantragen <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-label">Häufige Fragen</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-3">Deine Fragen – unsere Antworten</h2>
          </div>
          <div className="border border-[#E0EDE7] rounded-2xl px-5">
            {FAQ_ITEMS.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-2">Noch eine Frage?</p>
            <button
              onClick={() => setBeratungOpen(true)}
              className="inline-flex items-center gap-2 text-brand font-semibold text-sm hover:underline cursor-pointer"
            >
              <Phone size={15} /> Kostenloses Beratungsgespräch vereinbaren
            </button>
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-gray-50 border-t border-[#E0EDE7]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-brand flex items-center justify-center mx-auto mb-5 shadow-lg shadow-brand/20">
            <Package size={24} className="text-white" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 mb-4 leading-tight">
            Stell jetzt deine Pflegebox<br className="hidden sm:block" /> zusammen – kostenlos
          </h2>
          <p className="text-gray-500 text-base mb-8 max-w-md mx-auto leading-relaxed">
            Der Antrag dauert 2 Minuten. Du zahlst nichts.
            Die Pflegekasse übernimmt bis zu 42 € monatlich – ab Pflegegrad 1.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={onStart} className="btn-primary text-base px-8 py-4">
              Pflegebox zusammenstellen <ArrowRight size={18} />
            </button>
            <button
              onClick={() => setBeratungOpen(true)}
              className="btn-secondary text-sm px-6 py-4 flex items-center gap-2 justify-center cursor-pointer"
            >
              <Phone size={15} /> Kostenloses Beratungsgespräch
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-4">Kostenlos · Unverbindlich · Kein Abo</p>
        </div>
      </section>

    </div>
  );
}
