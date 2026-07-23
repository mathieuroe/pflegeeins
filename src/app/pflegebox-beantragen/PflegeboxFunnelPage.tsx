"use client";

import { useState, useRef } from "react";
import {
  Package, CheckCircle2, ArrowRight, Phone, Mail, MapPin,
  ShieldCheck, Clock, RefreshCw, ChevronDown, Lock,
  Droplets, Layers, Sparkles, User, Bell, Plus, Home,
  Users, Building2, AlertCircle, Star, ChevronLeft, Calendar,
  CreditCard, Truck, Heart,
} from "lucide-react";

// ─── Types & Constants ───────────────────────────────────────────────────────

type StepState = 1 | 2 | 3 | 4 | 5 | 6 | 7 | "disqualified" | "success";

const TOTAL_STEPS = 7;

const PFLEGEGRADE = [
  { value: "Pflegegrad 1", label: "Pflegegrad 1", note: "Geringe Beeinträchtigung" },
  { value: "Pflegegrad 2", label: "Pflegegrad 2", note: "Erhebliche Beeinträchtigung" },
  { value: "Pflegegrad 3", label: "Pflegegrad 3", note: "Schwere Beeinträchtigung" },
  { value: "Pflegegrad 4", label: "Pflegegrad 4", note: "Schwerste Beeinträchtigung" },
  { value: "Pflegegrad 5", label: "Pflegegrad 5", note: "Schwerste Beeinträchtigung mit besonderen Anforderungen" },
  { value: "Kein Pflegegrad", label: "Noch kein Pflegegrad", note: "Antrag läuft oder noch nicht gestellt" },
];

const WOHNSITUATIONEN = [
  { value: "alleine", label: "Zuhause – alleine lebend", icon: Home },
  { value: "mit-angehoerigen", label: "Zuhause – mit Angehörigen", icon: Users },
  { value: "wg", label: "Pflege-Wohngemeinschaft", icon: Building2 },
  { value: "pflegeheim", label: "Pflegeheim / stationär", icon: Building2, disqualify: true },
];

const BOXEN = [
  {
    id: "basis",
    name: "Basis-Box",
    tag: null,
    description: "Für den einfachen Einstieg",
    items: [
      "Einmalhandschuhe (100 Stk, Latex)",
      "Händedesinfektionsmittel (500 ml)",
    ],
    icon: Package,
  },
  {
    id: "klassik",
    name: "Pflege-Klassik",
    tag: "Beliebt",
    description: "Die meistgewählte Kombination",
    items: [
      "Einmalhandschuhe (100 Stk, Latex)",
      "Händedesinfektionsmittel (500 ml)",
      "Bettschutzeinlagen (25 Stk)",
      "Medizinischer Mundschutz (50 Stk)",
    ],
    icon: Heart,
  },
  {
    id: "komfort",
    name: "Komfort-Box",
    tag: "Rundum versorgt",
    description: "Maximale Ausstattung",
    items: [
      "Einmalhandschuhe (100 Stk, Latex)",
      "Händedesinfektionsmittel (500 ml)",
      "Bettschutzeinlagen (25 Stk)",
      "Medizinischer Mundschutz (50 Stk)",
      "FFP2-Masken (10 Stk)",
      "Desinfektionstücher (57 Stk)",
    ],
    icon: Sparkles,
  },
];

const BENEFITS = [
  { icon: ShieldCheck, label: "100% kostenlos", sub: "Pflegekasse zahlt bis zu 42 € / Monat" },
  { icon: RefreshCw, label: "Monatliche Lieferung", sub: "Automatisch, pünktlich, nach Hause" },
  { icon: Clock, label: "In 2 Minuten beantragt", sub: "Wir übernehmen den Papierkram" },
  { icon: Package, label: "Kein Risiko", sub: "Jederzeit kündbar, kein Vertrag" },
];

const STEPS_INFO = [
  { num: "01", title: "Online beantragen", text: "Fülle das kurze Formular aus – dauert 2 Minuten. Wir übernehmen den Antrag bei deiner Pflegekasse." },
  { num: "02", title: "Pflegekasse genehmigt", text: "Deine Pflegekasse bestätigt die Kostenübernahme. Das dauert in der Regel nur wenige Tage." },
  { num: "03", title: "Monatliche Lieferung", text: "Das Paket kommt jeden Monat automatisch zu dir. Du musst nichts nachbestellen." },
];

const LIEFERUMFANG = [
  { icon: Layers, label: "Einmalhandschuhe", text: "Latex oder Vinyl – in praktischer Spenderbox." },
  { icon: Droplets, label: "Desinfektionsmittel", text: "Für Hände und Flächen – hygienisch und wirksam." },
  { icon: Layers, label: "Bettschutzeinlagen", text: "Saugstark und diskret – schützt Matratze und Wäsche." },
  { icon: ShieldCheck, label: "Mundschutz", text: "Einmal-Masken für die tägliche Pflege." },
  { icon: Sparkles, label: "Weitere Hygieneartikel", text: "Je nach Wunsch-Box individuell zusammengestellt." },
];

const FAQS = [
  { q: "Wer zahlt für die Pflegebox?", a: "Die Pflegekasse übernimmt bis zu 42 € im Monat für anerkannte Pflegehilfsmittel (§ 40 SGB XI). Bei unseren Partneranbietern entstehen dir keine Kosten – du zahlst nichts." },
  { q: "Ab welchem Pflegegrad habe ich Anspruch?", a: "Ab Pflegegrad 1 hast du Anspruch auf monatliche Pflegehilfsmittel im Wert von bis zu 42 €. Die Pflegekasse übernimmt die Kosten direkt." },
  { q: "Was ist der Unterschied zwischen den drei Boxen?", a: "Alle Boxen sind kostenlos – die Pflegekasse zahlt für alle. Der Unterschied liegt im Umfang: Von der schlanken Basis-Box bis zur vollausgestatteten Komfort-Box mit FFP2-Masken und Desinfektionstüchern." },
  { q: "Wie oft kommt die Pflegebox?", a: "Einmal im Monat – automatisch, direkt nach Hause geliefert. Du musst nichts bestellen oder nachbestellen." },
  { q: "Was passiert nach meiner Anfrage?", a: "Wir melden uns innerhalb von 24 Stunden bei dir. Wir klären alle Details und stellen den Antrag bei deiner Pflegekasse – du musst nichts weiter tun." },
  { q: "Kann ich die Pflegebox kündigen?", a: "Ja, jederzeit. Es gibt keine Mindestlaufzeit. Eine kurze Mitteilung reicht aus." },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E0EDE7] last:border-0">
      <button className="w-full flex items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-gray-900 hover:text-brand transition-colors cursor-pointer" onClick={() => setOpen(!open)} aria-expanded={open}>
        {q}
        <ChevronDown size={16} className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="pb-4 text-sm text-gray-500 leading-relaxed">{a}</p>}
    </div>
  );
}

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400 font-medium">Schritt {step} von {total}</span>
        <span className="text-xs text-brand font-semibold">{pct}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-brand rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button type="button" onClick={onBack} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-brand transition-colors cursor-pointer mb-5">
      <ChevronLeft size={14} /> Zurück
    </button>
  );
}

function SelectionCard({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-150 cursor-pointer active:scale-[0.98] ${selected ? "border-brand bg-brand-light" : "border-gray-200 bg-white hover:border-brand/40 hover:bg-gray-50"}`}>
      {children}
    </button>
  );
}

// ─── Order Form ───────────────────────────────────────────────────────────────

function OrderForm({ addHausnotruf, setAddHausnotruf }: { addHausnotruf: boolean; setAddHausnotruf: (v: boolean) => void }) {
  const [step, setStep] = useState<StepState>(1);
  const [fuerWen, setFuerWen] = useState<"" | "ich" | "angehoerige">("");
  const [pflegegrad, setPflegegrad] = useState("");
  const [wohnsituation, setWohnsituation] = useState("");
  const [selectedBox, setSelectedBox] = useState("");
  // Personaldaten
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [geburtsdatum, setGeburtsdatum] = useState("");
  const [versichertennummer, setVersichertennummer] = useState("");
  // Adresse
  const [strasse, setStrasse] = useState("");
  const [hausnummer, setHausnummer] = useState("");
  const [plz, setPlz] = useState("");
  const [ort, setOrt] = useState("");
  // Kontakt
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const currentStepNum = typeof step === "number" ? step : 0;

  function goBack() {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === 4) setStep(3);
    else if (step === 5) setStep(4);
    else if (step === 6) setStep(5);
    else if (step === 7) setStep(6);
    else if (step === "disqualified") setStep(3);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!tel) { setError("Bitte Telefonnummer angeben."); return; }
    if (!consent) { setError("Bitte stimme der Kontaktaufnahme zu."); return; }
    setError("");
    setSubmitting(true);
    try {
      const tags = [
        `Pflegebox ${BOXEN.find(b => b.id === selectedBox)?.name || selectedBox}`,
        `Für: ${fuerWen === "ich" ? "mich selbst" : "Angehörige/n"}`,
        pflegegrad,
        `Wohnsituation: ${wohnsituation}`,
        addHausnotruf ? "Hausnotruf Interesse" : null,
        (vorname || nachname) ? `| ${[vorname, nachname].filter(Boolean).join(" ")}` : null,
      ].filter(Boolean).join(" ");

      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email, phone: tel, plz, pflegegrad,
          path: "pflegebox-beantragen",
          tags,
          vorname, nachname, geburtsdatum, versichertennummer,
          adresse: `${strasse} ${hausnummer}, ${plz} ${ort}`,
          box: selectedBox,
          fuer_wen: fuerWen,
          wohnsituation,
          timestamp: new Date().toISOString(),
          consent_beratung: consent,
          consent_weitergabe: false,
          consent_timestamp: new Date().toISOString(),
        }),
      });
      setStep("success");
    } catch {
      setError("Etwas ist schiefgelaufen. Bitte versuche es erneut.");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Success ──────────────────────────────────────────────────────────────
  if (step === "success") {
    return (
      <div className="text-center py-6 px-2">
        <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={32} className="text-brand" />
        </div>
        <h3 className="font-serif text-2xl text-gray-900 mb-2">Anfrage eingegangen!</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
          Wir melden uns <strong className="text-gray-700">innerhalb von 24 Stunden</strong> telefonisch bei dir. Wir klären alles – du musst nichts weiter tun.
        </p>
        <div className="bg-brand-light rounded-2xl p-4 text-left max-w-sm mx-auto">
          <p className="text-xs font-semibold text-brand uppercase tracking-wider mb-3">Was jetzt passiert</p>
          {[
            "Wir prüfen deine Angaben und rufen dich an",
            "Wir stellen den Antrag bei deiner Pflegekasse",
            addHausnotruf ? "Pflegebox + Hausnotruf kommen direkt zu dir" : "Die erste Pflegebox kommt in wenigen Tagen",
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-2.5 mb-2 last:mb-0">
              <span className="w-5 h-5 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
              <span className="text-sm text-gray-700">{s}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Disqualified ─────────────────────────────────────────────────────────
  if (step === "disqualified") {
    return (
      <div className="text-center py-4 px-2">
        <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={28} className="text-amber-500" />
        </div>
        <h3 className="font-serif text-xl text-gray-900 mb-2">Pflegeheim – andere Regelung</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-5 max-w-xs mx-auto">
          Die monatliche Pflegebox ist für die <strong>häusliche Pflege</strong> vorgesehen. Im Pflegeheim übernimmt die Einrichtung die Versorgung mit Pflegehilfsmitteln.
        </p>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
          Für Fragen zur Versorgung im Pflegeheim helfen wir dir gerne telefonisch weiter.
        </p>
        <a href="tel:+4976188785999" className="btn-primary inline-flex px-6 py-3">
          <Phone size={15} /> 0761 88785999
        </a>
        <button type="button" onClick={() => setStep(3)} className="block w-full text-center text-xs text-gray-400 hover:text-brand mt-4 cursor-pointer">
          ← Zurück zur Wohnsituation
        </button>
      </div>
    );
  }

  // ── Step 1: Für wen? ─────────────────────────────────────────────────────
  if (step === 1) {
    return (
      <div>
        <ProgressBar step={1} total={TOTAL_STEPS} />
        <p className="text-base font-semibold text-gray-900 mb-1">Für wen beantragst du die Pflegebox?</p>
        <p className="text-sm text-gray-400 mb-5">Das hilft uns, die richtigen Daten abzufragen.</p>
        <div className="space-y-3">
          {[
            { val: "ich" as const, label: "Für mich selbst", sub: "Ich bin die pflegebedürftige Person", icon: User },
            { val: "angehoerige" as const, label: "Für eine andere Person", sub: "z. B. Elternteil, Partner, Angehörigen", icon: Heart },
          ].map(({ val, label, sub, icon: Icon }) => (
            <SelectionCard key={val} selected={fuerWen === val} onClick={() => { setFuerWen(val); setTimeout(() => setStep(2), 150); }}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${fuerWen === val ? "bg-brand" : "bg-gray-100"}`}>
                  <Icon size={17} className={fuerWen === val ? "text-white" : "text-gray-400"} />
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900 block">{label}</span>
                  <span className="text-[11px] text-gray-400">{sub}</span>
                </div>
              </div>
              <ArrowRight size={14} className="text-gray-300 flex-shrink-0" />
            </SelectionCard>
          ))}
        </div>
      </div>
    );
  }

  // ── Step 2: Pflegegrad ───────────────────────────────────────────────────
  if (step === 2) {
    return (
      <div>
        <ProgressBar step={2} total={TOTAL_STEPS} />
        <BackButton onBack={goBack} />
        <p className="text-base font-semibold text-gray-900 mb-1">
          Welchen Pflegegrad {fuerWen === "ich" ? "hast du?" : "hat die Person?"}
        </p>
        <p className="text-sm text-gray-400 mb-5">Der Pflegegrad steht im Bescheid der Pflegekasse.</p>
        <div className="space-y-2">
          {PFLEGEGRADE.map((pg) => (
            <SelectionCard key={pg.value} selected={pflegegrad === pg.value} onClick={() => { setPflegegrad(pg.value); setTimeout(() => setStep(3), 150); }}>
              <div>
                <span className="text-sm font-semibold text-gray-900 block">{pg.label}</span>
                <span className="text-[11px] text-gray-400">{pg.note}</span>
              </div>
              <ArrowRight size={14} className="text-gray-300 flex-shrink-0" />
            </SelectionCard>
          ))}
        </div>
        {pflegegrad === "Kein Pflegegrad" && (
          <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>Hinweis:</strong> Ohne Pflegegrad besteht kein gesetzlicher Anspruch. Du kannst trotzdem eine Anfrage stellen – wir beraten dich kostenlos.
            </p>
          </div>
        )}
      </div>
    );
  }

  // ── Step 3: Wohnsituation ────────────────────────────────────────────────
  if (step === 3) {
    return (
      <div>
        <ProgressBar step={3} total={TOTAL_STEPS} />
        <BackButton onBack={goBack} />
        <p className="text-base font-semibold text-gray-900 mb-1">
          Wie wohnt {fuerWen === "ich" ? "du?" : "die pflegebedürftige Person?"}
        </p>
        <p className="text-sm text-gray-400 mb-5">Voraussetzung: häusliche Pflege (zuhause oder Wohngemeinschaft).</p>
        <div className="space-y-2">
          {WOHNSITUATIONEN.map(({ value, label, icon: Icon, disqualify }) => (
            <SelectionCard key={value} selected={wohnsituation === value} onClick={() => {
              setWohnsituation(value);
              setTimeout(() => disqualify ? setStep("disqualified") : setStep(4), 150);
            }}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${wohnsituation === value ? "bg-brand" : "bg-gray-100"}`}>
                  <Icon size={17} className={wohnsituation === value ? "text-white" : "text-gray-400"} />
                </div>
                <span className="text-sm font-semibold text-gray-900">{label}</span>
              </div>
              {disqualify
                ? <span className="text-[10px] text-amber-500 font-semibold">ℹ Hinweis</span>
                : <ArrowRight size={14} className="text-gray-300 flex-shrink-0" />
              }
            </SelectionCard>
          ))}
        </div>
      </div>
    );
  }

  // ── Step 4: Box-Auswahl ──────────────────────────────────────────────────
  if (step === 4) {
    return (
      <div>
        <ProgressBar step={4} total={TOTAL_STEPS} />
        <BackButton onBack={goBack} />
        <p className="text-base font-semibold text-gray-900 mb-1">Welche Box möchtest du?</p>
        <p className="text-sm text-gray-400 mb-5">Alle Boxen sind kostenlos – die Pflegekasse übernimmt bis zu 42 € / Monat.</p>
        <div className="space-y-3">
          {BOXEN.map((box) => {
            const Icon = box.icon;
            const isSelected = selectedBox === box.id;
            return (
              <button key={box.id} type="button" onClick={() => { setSelectedBox(box.id); setTimeout(() => setStep(5), 150); }}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-150 cursor-pointer active:scale-[0.99] ${isSelected ? "border-brand bg-brand-light" : "border-gray-200 bg-white hover:border-brand/40"}`}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isSelected ? "bg-brand" : "bg-gray-100"}`}>
                      <Icon size={16} className={isSelected ? "text-white" : "text-gray-400"} />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-900">{box.name}</span>
                      {box.tag && (
                        <span className={`ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${box.id === "klassik" ? "bg-brand text-white" : "bg-gray-100 text-gray-600"}`}>
                          {box.tag}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-brand bg-brand-light px-2 py-0.5 rounded-full flex-shrink-0">KOSTENLOS</span>
                </div>
                <p className="text-xs text-gray-400 mb-2 pl-[2.625rem]">{box.description}</p>
                <ul className="pl-[2.625rem] space-y-1">
                  {box.items.map((item) => (
                    <li key={item} className="flex items-center gap-1.5 text-xs text-gray-600">
                      <CheckCircle2 size={10} className="text-brand flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Step 5: Personaldaten ────────────────────────────────────────────────
  if (step === 5) {
    return (
      <div>
        <ProgressBar step={5} total={TOTAL_STEPS} />
        <BackButton onBack={goBack} />
        <p className="text-base font-semibold text-gray-900 mb-1">
          Angaben zur {fuerWen === "ich" ? "versicherten Person (du)" : "pflegebedürftigen Person"}
        </p>
        <p className="text-sm text-gray-400 mb-5">
          Diese Daten benötigen wir für den Antrag bei der Pflegekasse.
        </p>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Vorname *</label>
              <div className="relative">
                <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand" />
                <input type="text" value={vorname} onChange={e => setVorname(e.target.value)} placeholder="Vorname" required className="input pl-8 text-sm" autoComplete="given-name" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nachname *</label>
              <input type="text" value={nachname} onChange={e => setNachname(e.target.value)} placeholder="Nachname" required className="input text-sm" autoComplete="family-name" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Geburtsdatum *</label>
            <div className="relative">
              <Calendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand" />
              <input type="date" value={geburtsdatum} onChange={e => setGeburtsdatum(e.target.value)} required className="input pl-8 text-sm" max={new Date().toISOString().split("T")[0]} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Versichertennummer *</label>
            <div className="relative">
              <CreditCard size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand" />
              <input type="text" value={versichertennummer} onChange={e => setVersichertennummer(e.target.value.toUpperCase())} placeholder="z. B. A123456789" required className="input pl-8 text-sm font-mono tracking-wider" maxLength={10} />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Steht auf der Krankenversicherungskarte (10 Zeichen)</p>
          </div>
        </div>
        <button type="button" onClick={() => { if (!vorname || !nachname || !geburtsdatum || !versichertennummer) { setError("Bitte alle Felder ausfüllen."); return; } setError(""); setStep(6); }}
          className="btn-primary w-full justify-center py-3.5 text-sm mt-5">
          Weiter <ArrowRight size={16} />
        </button>
        {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
        <p className="text-[10px] text-gray-400 text-center mt-2 flex items-center justify-center gap-1"><Lock size={9} /> Sicher verschlüsselt</p>
      </div>
    );
  }

  // ── Step 6: Adresse ──────────────────────────────────────────────────────
  if (step === 6) {
    return (
      <div>
        <ProgressBar step={6} total={TOTAL_STEPS} />
        <BackButton onBack={goBack} />
        <p className="text-base font-semibold text-gray-900 mb-1">Lieferadresse</p>
        <p className="text-sm text-gray-400 mb-5">Wohin soll die Pflegebox monatlich geliefert werden?</p>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Straße *</label>
              <div className="relative">
                <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand" />
                <input type="text" value={strasse} onChange={e => setStrasse(e.target.value)} placeholder="Musterstraße" required className="input pl-8 text-sm" autoComplete="address-line1" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nr. *</label>
              <input type="text" value={hausnummer} onChange={e => setHausnummer(e.target.value)} placeholder="12a" required className="input text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">PLZ *</label>
              <input type="text" inputMode="numeric" value={plz} onChange={e => setPlz(e.target.value.replace(/\D/g, ""))} placeholder="12345" required maxLength={5} className="input text-sm" autoComplete="postal-code" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Ort *</label>
              <input type="text" value={ort} onChange={e => setOrt(e.target.value)} placeholder="Berlin" required className="input text-sm" autoComplete="address-level2" />
            </div>
          </div>
        </div>
        <button type="button" onClick={() => { if (!strasse || !hausnummer || !plz || !ort) { setError("Bitte alle Adressfelder ausfüllen."); return; } setError(""); setStep(7); }}
          className="btn-primary w-full justify-center py-3.5 text-sm mt-5">
          Weiter <ArrowRight size={16} />
        </button>
        {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
      </div>
    );
  }

  // ── Step 7: Kontakt + Submit ─────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit}>
      <ProgressBar step={7} total={TOTAL_STEPS} />
      <BackButton onBack={goBack} />
      <p className="text-base font-semibold text-gray-900 mb-1">Wie können wir dich erreichen?</p>
      <p className="text-sm text-gray-400 mb-5">Wir melden uns innerhalb von 24 Stunden und klären alles mit der Pflegekasse.</p>
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Telefonnummer *</label>
          <div className="relative">
            <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand" />
            <input type="tel" value={tel} onChange={e => setTel(e.target.value)} placeholder="0 170 123 456 7" required className="input pl-8 text-sm" autoComplete="tel" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">E-Mail-Adresse</label>
          <div className="relative">
            <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand" />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="max@beispiel.de" className="input pl-8 text-sm" autoComplete="email" />
          </div>
        </div>
      </div>

      {/* Cross-sell Hausnotruf */}
      <button type="button" onClick={() => setAddHausnotruf(!addHausnotruf)}
        className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 mt-4 transition-all duration-150 cursor-pointer text-left ${addHausnotruf ? "border-brand bg-brand-light" : "border-dashed border-gray-200 hover:border-brand/40 hover:bg-gray-50"}`}>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${addHausnotruf ? "bg-brand" : "bg-gray-100"}`}>
          {addHausnotruf ? <CheckCircle2 size={16} className="text-white" /> : <Plus size={16} className="text-gray-400" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-gray-900">Hausnotruf dazubuchen</p>
            <span className="text-[10px] font-bold text-brand bg-brand-light border border-brand/20 px-2 py-0.5 rounded-full">KOSTENLOS</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5"><Bell size={9} className="inline mr-1" />27 € / Monat – vollständig von der Pflegekasse</p>
        </div>
      </button>

      {error && <p className="text-red-500 text-xs mt-3 px-1">{error}</p>}

      <button type="submit" disabled={submitting} className="btn-primary w-full justify-center py-3.5 text-sm mt-4 disabled:opacity-60">
        {submitting ? "Wird gesendet…"
          : addHausnotruf ? <>Pflegebox + Hausnotruf beantragen <ArrowRight size={16} /></>
          : <>Jetzt kostenlos beantragen <ArrowRight size={16} /></>}
      </button>

      <label className="flex items-start gap-2 cursor-pointer mt-3">
        <div onClick={() => setConsent(!consent)} className={`w-3.5 h-3.5 rounded flex-shrink-0 border flex items-center justify-center mt-0.5 cursor-pointer transition-colors ${consent ? "bg-brand border-brand" : "border-gray-300"}`}>
          {consent && <CheckCircle2 size={9} className="text-white" />}
        </div>
        <span className="text-[10px] text-gray-400 leading-relaxed">
          Ich bin einverstanden, dass mich liva oder ein geprüfter Partner zu meiner Anfrage kontaktiert.{" "}
          <a href="/datenschutz" className="underline hover:text-brand">Datenschutz</a>
        </span>
      </label>
      <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1 mt-2"><Lock size={9} /> Kostenlos · Unverbindlich · DSGVO-konform</p>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PflegeboxFunnelPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const [addHausnotruf, setAddHausnotruf] = useState(false);

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E0EDE7] py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-brand-light text-brand text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wide">
              <CheckCircle2 size={12} /> Pflegekasse zahlt – du nicht
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-gray-900 leading-tight mb-4">
              Pflegebox <span className="text-brand">kostenlos</span> beantragen
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              Ab Pflegegrad 1 zahlt die Pflegekasse bis zu <strong className="text-gray-700">42 € im Monat</strong> für Pflegehilfsmittel – du zahlst nichts. Monatliche Lieferung direkt nach Hause.
            </p>
            <div className="space-y-2.5 mb-8">
              {["Kein Eigenanteil – Pflegekasse übernimmt alles", "Wir stellen den Antrag bei deiner Pflegekasse", "Monatliche Lieferung automatisch nach Hause", "Jederzeit kündbar – ohne Risiko"].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-brand flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={scrollToForm} className="btn-primary text-base px-7 py-4">Jetzt kostenlos beantragen <ArrowRight size={18} /></button>
              <a href="tel:+4976188785999" className="btn-secondary text-sm px-6 py-4 flex items-center gap-2"><Phone size={15} /> 0761 88785999</a>
            </div>
            <p className="text-xs text-gray-400 mt-3">Kostenlose Beratung · Mo–Fr 8–18 Uhr</p>
          </div>
          <div className="flex justify-center">
            <div className="bg-brand-light rounded-3xl p-8 w-full max-w-sm">
              <div className="w-14 h-14 rounded-2xl bg-brand flex items-center justify-center mb-5">
                <Package size={28} className="text-white" />
              </div>
              <p className="font-serif text-3xl text-brand mb-1">42 € / Monat</p>
              <p className="text-brand/70 text-sm mb-5">Vollständig von der Pflegekasse übernommen</p>
              <div className="bg-white rounded-2xl p-4 space-y-3">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Enthalten im Paket</p>
                {["Einmalhandschuhe (Latex oder Vinyl)", "Desinfektionsmittel für Hände & Flächen", "Bettschutzeinlagen / Matratzenschoner", "Mund-Nasen-Masken", "Monatliche Lieferung frei Haus"].map(item => (
                  <div key={item} className="flex items-center gap-2.5"><CheckCircle2 size={13} className="text-brand flex-shrink-0" /><span className="text-sm text-gray-700">{item}</span></div>
                ))}
              </div>
              <p className="text-xs text-center text-brand/60 mt-4 font-medium">Ab Pflegegrad 1 · Alle Pflegekassen</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefit Bar ──────────────────────────────────────────────── */}
      <section className="bg-brand py-5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {BENEFITS.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0"><Icon size={17} className="text-white" /></div>
              <div><p className="text-white text-sm font-semibold leading-tight">{label}</p><p className="text-white/60 text-[11px] leading-snug">{sub}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Wie es funktioniert ──────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label">So einfach geht&apos;s</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-gray-900">In 3 Schritten zur Pflegebox</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS_INFO.map(s => (
              <div key={s.num} className="card bg-white p-7 relative">
                <span className="absolute top-5 right-5 font-serif text-5xl text-brand/10 font-bold leading-none select-none">{s.num}</span>
                <div className="w-10 h-10 rounded-full bg-brand text-white text-sm font-bold flex items-center justify-center mb-4">{parseInt(s.num)}</div>
                <h3 className="font-semibold text-gray-900 text-base mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={scrollToForm} className="btn-primary px-8 py-3.5">Jetzt beantragen <ArrowRight size={16} /></button>
          </div>
        </div>
      </section>

      {/* ── Lieferumfang ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white border-b border-[#E0EDE7]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label">Lieferumfang</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-gray-900">Das bekommst du</h2>
            <p className="text-gray-500 mt-2 text-sm">Alles inklusive – kein versteckter Eigenanteil.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LIEFERUMFANG.map(({ icon: Icon, label, text }) => (
              <div key={label} className="flex gap-4 p-5 rounded-2xl border border-[#E0EDE7] bg-white hover:border-brand/30 hover:shadow-soft transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0"><Icon size={18} className="text-brand" /></div>
                <div><p className="font-semibold text-gray-900 text-sm mb-1">{label}</p><p className="text-gray-500 text-xs leading-relaxed">{text}</p></div>
              </div>
            ))}
            <div className="flex gap-4 p-5 rounded-2xl bg-brand-light border border-brand/20">
              <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center flex-shrink-0"><CheckCircle2 size={18} className="text-white" /></div>
              <div><p className="font-semibold text-brand text-sm mb-1">Komplett kostenlos</p><p className="text-brand/70 text-xs leading-relaxed">Die Pflegekasse zahlt bis zu 42 € / Monat ab Pflegegrad 1.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bestellformular ──────────────────────────────────────────── */}
      <section ref={formRef} id="beantragen" className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div className="md:sticky md:top-24">
            <p className="section-label">Kostenlose Anfrage</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 mb-4">Jetzt Pflegebox beantragen</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">Füll das kurze Formular aus – wir melden uns innerhalb von <strong className="text-gray-700">24 Stunden</strong> telefonisch bei dir und regeln alles mit der Pflegekasse.</p>
            <div className="space-y-4 mb-8">
              {[
                { icon: ShieldCheck, title: "DSGVO-konform", sub: "Deine Daten werden sicher verarbeitet" },
                { icon: Truck, title: "Wir übernehmen den Antrag", sub: "Kein Papierkram für dich" },
                { icon: CheckCircle2, title: "Kostenlos & unverbindlich", sub: "Kein Vertrag, keine Kosten" },
              ].map(({ icon: Icon, title, sub }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0 mt-0.5"><Icon size={16} className="text-brand" /></div>
                  <div><p className="text-sm font-semibold text-gray-900">{title}</p><p className="text-xs text-gray-400">{sub}</p></div>
                </div>
              ))}
            </div>
            <div className="bg-brand-light rounded-2xl p-4">
              <p className="text-sm font-semibold text-brand mb-1">Lieber gleich anrufen?</p>
              <a href="tel:+4976188785999" className="flex items-center gap-2 text-brand font-bold text-base hover:text-brand-hover transition-colors"><Phone size={16} /> 0761 88785999</a>
              <p className="text-xs text-brand/60 mt-1">Mo–Fr, 8–18 Uhr</p>
            </div>
          </div>
          <div className="card bg-white p-6 sm:p-8 shadow-card-hover">
            <OrderForm addHausnotruf={addHausnotruf} setAddHausnotruf={setAddHausnotruf} />
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white border-b border-[#E0EDE7]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-label">Häufige Fragen</p>
            <h2 className="font-serif text-3xl text-gray-900">Noch Fragen?</h2>
          </div>
          <div className="card bg-white p-1 sm:p-2">
            {FAQS.map(faq => (
              <div key={faq.q} className="px-4 sm:px-5"><FaqItem q={faq.q} a={faq.a} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 bg-brand">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-3">Pflegehilfsmittel – jeden Monat kostenlos.</h2>
          <p className="text-white/70 text-base mb-8 leading-relaxed">Kein Papierkram, keine Kosten, kein Risiko. Wir regeln alles mit der Pflegekasse.</p>
          <button onClick={scrollToForm} className="inline-flex items-center gap-2 bg-white text-brand font-bold px-8 py-4 rounded-full hover:bg-brand-light transition-colors text-sm shadow-sm hover:shadow-md">
            Jetzt kostenlos beantragen <ArrowRight size={16} />
          </button>
          <p className="text-white/40 text-xs mt-4">100% kostenlos · DSGVO-konform · Unverbindlich</p>
        </div>
      </section>
    </>
  );
}
