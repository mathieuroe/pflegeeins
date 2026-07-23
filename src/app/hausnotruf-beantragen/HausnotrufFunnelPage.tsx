"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Bell, CheckCircle2, ArrowRight, Phone, Mail, MapPin,
  ShieldCheck, Clock, RefreshCw, ChevronDown, Lock,
  User, Heart, AlertCircle, ChevronLeft, Calendar,
  CreditCard, Package, Truck, Wifi, Battery,
  Radio, X, Search, PenLine, Check, Home,
} from "lucide-react";
import BeratungsModal from "@/components/BeratungsModal";

// ═══════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════

const TOTAL_STEPS = 10;

const KRANKENKASSEN = [
  "Allianz Private Krankenversicherung",
  "Alte Oldenburger Krankenversicherung",
  "AOK Baden-Württemberg",
  "AOK Bayern",
  "AOK Bremen Bremerhaven",
  "AOK Hessen",
  "AOK Niedersachsen",
  "AOK Nordost",
  "AOK NordWest",
  "AOK Plus (Sachsen/Thüringen)",
  "AOK Rheinland/Hamburg",
  "AOK Rheinland-Pfalz/Saarland",
  "AOK Sachsen-Anhalt",
  "Audi BKK",
  "BARMER",
  "BIG direkt gesund",
  "BKK 24",
  "BKK Diakonie",
  "BKK Firmus",
  "BKK Linde",
  "BKK ProVita",
  "BKK Scheufelen",
  "BKK VerbundPlus",
  "BKK Wirtschaft & Finanzen",
  "BKK Würth",
  "BKK ZF & Partner",
  "Bosch BKK",
  "Continentale Krankenversicherung",
  "DAK-Gesundheit",
  "Debeka BKK",
  "Energie-BKK",
  "HEK – Hanseatische Krankenkasse",
  "HKK Erste Gesundheit",
  "IKK Brandenburg und Berlin",
  "IKK classic",
  "IKK gesund plus",
  "IKK Nord",
  "IKK Südwest",
  "KKH – Kaufmännische Krankenkasse",
  "Knappschaft",
  "mhplus BKK",
  "Mobil Krankenkasse",
  "Novitas BKK",
  "pronova BKK",
  "R+V BKK",
  "Salus BKK",
  "SBK – Siemens-Betriebskrankenkasse",
  "Securvita BKK",
  "Techniker Krankenkasse (TK)",
  "TUI BKK",
  "Viactiv Krankenkasse",
  "WMF BKK",
];

const BUNDESLAENDER = [
  "Baden-Württemberg", "Bayern", "Berlin", "Brandenburg",
  "Bremen", "Hamburg", "Hessen", "Mecklenburg-Vorpommern",
  "Niedersachsen", "Nordrhein-Westfalen", "Rheinland-Pfalz",
  "Saarland", "Sachsen", "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen",
];

const BESTELLITEMS = [
  { icon: Radio, label: "Basisstation", desc: "easierLife HOME – mit SIM-Karte & Notakku" },
  { icon: Bell, label: "Notrufknopf (Handsender)", desc: "Wasserdicht · als Arm- oder Halsband" },
  { icon: Package, label: "Halskettenhülle", desc: "Für den Notrufknopf" },
  { icon: Package, label: "Armbandhülle", desc: "Für den Notrufknopf" },
];

const BENEFITS = [
  { icon: ShieldCheck, label: "100% kostenlos", sub: "Pflegekasse zahlt 27 € / Monat" },
  { icon: Clock, label: "24h Notrufzentrale", sub: "SIM-Karte inklusive – kein Internet nötig" },
  { icon: RefreshCw, label: "Einfach einstecken", sub: "Kein Techniker, kein Internet, kein Router" },
  { icon: Battery, label: "5,5 Jahre Akkulaufzeit", sub: "Wasserdichter Knopf – auch in der Dusche" },
];

const GERAETE = [
  { icon: Radio, label: "Basisstation easierLife HOME", text: "Funktioniert ohne Internet & Telefon – mit integriertem Akku auch bei Stromausfall" },
  { icon: Battery, label: "Notrufknopf (Arm oder Hals)", text: "Wasserdicht, bis zu 5,5 Jahre Akkulaufzeit – auch in Bad und Dusche tragbar" },
  { icon: Wifi, label: "24h Notrufzentrale", text: "Sofortverbindung zu geschulten Fachkräften – SIM-Karte bereits enthalten" },
  { icon: Phone, label: "Kostenlose Angehörigen-App", text: "Familie erhält Benachrichtigungen – jederzeit informiert bei Notruf oder Inaktivität" },
];

const STEPS_INFO = [
  { num: "01", title: "Online beantragen", text: "Fülle das kurze Formular aus – dauert 2 Minuten. Wir übernehmen den Antrag bei deiner Pflegekasse." },
  { num: "02", title: "Pflegekasse genehmigt", text: "Deine Pflegekasse bestätigt die Kostenübernahme. Das dauert in der Regel nur wenige Tage." },
  { num: "03", title: "Installation & fertig", text: "Das Gerät kommt per Post. Einfach einstecken, einrichten – fertig. Bei Bedarf helfen wir telefonisch." },
];

const FAQS = [
  { q: "Wer zahlt für den Hausnotruf?", a: "Die Pflegekasse übernimmt die Kosten für einen Hausnotruf (§ 40 SGB XI) vollständig – in der Regel 27 € pro Monat. Du zahlst keinen Eigenanteil." },
  { q: "Ab welchem Pflegegrad habe ich Anspruch?", a: "Ab Pflegegrad 1 hast du Anspruch, wenn du überwiegend allein lebst oder im Notfall keine Person in der Lage ist, dir zu helfen." },
  { q: "Muss ein Techniker die Installation durchführen?", a: "Nein. Das Gerät wird einfach an die Steckdose angeschlossen – kein Techniker nötig. Das Einrichten ist per Telefon möglich, wenn du Unterstützung brauchst." },
  { q: "Was passiert, wenn ich den Knopf drücke?", a: "Du wirst sofort mit der 24h-Notrufzentrale verbunden. Die geschulten Mitarbeiter koordinieren Hilfe – von Familie und Nachbarn bis zum Rettungsdienst." },
  { q: "Ist der Knopf wasserdicht?", a: "Ja. Du kannst den Notrufknopf auch unter der Dusche und beim Baden tragen – gerade dort passieren viele Unfälle." },
  { q: "Kann ich kündigen?", a: "Ja, jederzeit. Es gibt keine Mindestlaufzeit. Eine kurze Mitteilung reicht aus." },
];

// ═══════════════════════════════════════════════════════
// HELPER COMPONENTS
// ═══════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════
// KRANKENKASSE SEARCHABLE SELECT
// ═══════════════════════════════════════════════════════

function KrankenkasseSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = KRANKENKASSEN.filter(k => k.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label className="block text-xs font-medium text-gray-600 mb-1">Krankenkasse / Pflegeversicherung *</label>
      <button type="button" onClick={() => setOpen(!open)}
        className="input w-full flex items-center justify-between gap-2 text-sm cursor-pointer text-left">
        <span className={value ? "text-gray-900" : "text-gray-400"}>{value || "Krankenkasse auswählen"}</span>
        <ChevronDown size={14} className={`text-gray-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input autoFocus type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Suche..." className="w-full pl-7 pr-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-brand" />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filtered.length === 0 && <p className="text-sm text-gray-400 p-3 text-center">Keine Ergebnisse</p>}
            {filtered.map(k => (
              <button key={k} type="button" onClick={() => { onChange(k); setOpen(false); setSearch(""); }}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-brand-light transition-colors cursor-pointer ${k === value ? "text-brand font-semibold bg-brand-light" : "text-gray-700"}`}>
                {k}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// SIGNATURE CANVAS
// ═══════════════════════════════════════════════════════

function SignatureCanvas({ onSign }: { onSign: (dataUrl: string | null) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const [hasSignature, setHasSignature] = useState(false);

  const getPos = useCallback((e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e instanceof TouchEvent) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#0F6E56";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const start = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      isDrawing.current = true;
      const pos = getPos(e, canvas);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    };
    const draw = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      if (!isDrawing.current) return;
      const pos = getPos(e, canvas);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      setHasSignature(true);
      onSign(canvas.toDataURL());
    };
    const stop = () => { isDrawing.current = false; };

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stop);
    canvas.addEventListener("touchstart", start, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", stop);

    return () => {
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stop);
      canvas.removeEventListener("touchstart", start);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stop);
    };
  }, [getPos, onSign]);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    onSign(null);
  };

  return (
    <div>
      <div className="relative rounded-xl border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50 hover:border-brand/40 transition-colors">
        <canvas ref={canvasRef} width={560} height={200} className="w-full touch-none cursor-crosshair" />
        {!hasSignature && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <PenLine size={24} className="text-gray-300 mb-2" />
            <p className="text-sm text-gray-400 text-center leading-relaxed">Zeichne deine Unterschrift mit der Maus oder dem Finger.</p>
            <p className="text-xs text-gray-300 mt-1 text-center">Sollte es nicht beim ersten Mal klappen, kannst du sie löschen und neu zeichnen.</p>
          </div>
        )}
      </div>
      {hasSignature && (
        <button type="button" onClick={clear} className="mt-2 text-xs text-brand hover:underline cursor-pointer">
          Löschen und nochmal versuchen
        </button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// FUNNEL MODAL
// ═══════════════════════════════════════════════════════

type ModalStep = "welcome"|1|2|3|4|5|6|7|8|9|10|"success";

interface FunnelModalProps {
  onClose: () => void;
}

function FunnelModal({ onClose }: FunnelModalProps) {
  const [step, setStep] = useState<ModalStep>("welcome");
  const contentRef = useRef<HTMLDivElement>(null);

  // Step 1
  const [fuerWen, setFuerWen] = useState<"" | "ich" | "angehoerige">("");
  // Step 2
  const [pflegegrad, setPflegegrad] = useState("");
  // Step 3
  const [gruende, setGruende] = useState<string[]>([]);
  // Step 4
  const [werPflegt, setWerPflegt] = useState("");
  // Step 5
  const [bereitsVorhanden, setBereitsVorhanden] = useState<"" | "ja" | "nein">("");
  // Step 6
  const [krankenkasse, setKrankenkasse] = useState("");
  const [versichertennummer, setVersichertennummer] = useState("");
  const [sozialamtVersichert, setSozialamtVersichert] = useState(false);
  // Step 7
  const [anrede, setAnrede] = useState("");
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [geburtsdatum, setGeburtsdatum] = useState("");
  const [tel, setTel] = useState("");
  const [strasse, setStrasse] = useState("");
  const [hausnummer, setHausnummer] = useState("");
  const [plz, setPlz] = useState("");
  const [ort, setOrt] = useState("");
  const [bundesland, setBundesland] = useState("");
  // Step 8
  const [lieferOption, setLieferOption] = useState<"gleich" | "anders">("gleich");
  const [lieferStrasse, setLieferStrasse] = useState("");
  const [lieferHausnummer, setLieferHausnummer] = useState("");
  const [lieferPlz, setLieferPlz] = useState("");
  const [lieferOrt, setLieferOrt] = useState("");
  // Step 9
  const [einwilligung, setEinwilligung] = useState(false);
  // Step 10
  const [signatureData, setSignatureData] = useState<string | null>(null);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Scroll content to top on step change
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setError("");
  }, [step]);

  const numericStep = typeof step === "number" ? step : (step === "success" ? TOTAL_STEPS : 0);
  const progress = Math.round((numericStep / TOTAL_STEPS) * 100);

  function goBack() {
    const map: Partial<Record<ModalStep, ModalStep>> = {
      1: "welcome", 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9,
    };
    const prev = map[step];
    if (prev !== undefined) setStep(prev);
  }

  function toggleGrund(g: string) {
    setGruende(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  }

  async function handleSubmit() {
    if (!signatureData) { setError("Bitte unterschreibe den Antrag."); return; }
    setSubmitting(true);
    setError("");
    try {
      const lieferAdresse = lieferOption === "gleich"
        ? `${strasse} ${hausnummer}, ${plz} ${ort}`
        : `${lieferStrasse} ${lieferHausnummer}, ${lieferPlz} ${lieferOrt}`;

      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vorname, nachname, geburtsdatum,
          phone: tel, plz, pflegegrad,
          path: "hausnotruf-beantragen",
          fuer_wen: fuerWen,
          gruende: gruende.join(", "),
          wer_pflegt: werPflegt,
          bereits_vorhanden: bereitsVorhanden,
          krankenkasse, versichertennummer,
          adresse: `${strasse} ${hausnummer}, ${plz} ${ort}, ${bundesland}`,
          lieferadresse: lieferAdresse,
          bundesland, anrede,
          signature: !!signatureData,
          tags: [
            "Hausnotruf Bestellung",
            pflegegrad,
            `Für: ${fuerWen === "ich" ? "mich selbst" : "Angehörige/n"}`,
            krankenkasse,
            `| ${vorname} ${nachname}`,
          ].filter(Boolean).join(" "),
          timestamp: new Date().toISOString(),
          consent_beratung: einwilligung,
          consent_weitergabe: einwilligung,
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

  // ── Render step content ──────────────────────────────
  function renderStep() {
    if (step === "success") return (
      <div className="flex flex-col items-center text-center py-8 px-4">
        <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center mb-5">
          <CheckCircle2 size={32} className="text-brand" />
        </div>
        <h3 className="font-serif text-2xl text-gray-900 mb-2">Antrag eingegangen!</h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-6">
          Wir melden uns <strong className="text-gray-700">innerhalb von 24 Stunden</strong> telefonisch bei dir. Wir klären alle Details und stellen den Antrag bei deiner Pflegekasse.
        </p>
        <div className="bg-brand-light rounded-2xl p-4 text-left w-full max-w-sm mb-6">
          <p className="text-xs font-bold text-brand uppercase tracking-wider mb-3">Was jetzt passiert</p>
          {["Wir rufen dich an und prüfen deine Angaben", "Wir beantragen die Kostenübernahme bei deiner Pflegekasse", "Das Gerät kommt per Post – einfach einstecken", "Fragen? Wir helfen telefonisch weiter"].map((s, i) => (
            <div key={i} className="flex items-start gap-2.5 mb-2 last:mb-0">
              <span className="w-5 h-5 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
              <span className="text-sm text-gray-700">{s}</span>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="btn-secondary px-8 py-3">Schließen</button>
      </div>
    );

    // Welcome: Produktübersicht + easierLife Kooperation
    if (step === "welcome") return (
      <div>
        <h2 className="font-serif text-xl sm:text-2xl text-gray-900 mb-2">Kostenloses Hausnotruf-Komplettpaket</h2>
        <div className="flex items-center gap-2 mb-5">
          <span className="text-sm text-gray-500">In Kooperation mit</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.easierlife.de/wp-content/uploads/2021/01/el_logo_rgb_800x200.png"
            alt="easierLife"
            className="h-5 w-auto object-contain"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          {/* Produktbild */}
          <div className="rounded-xl overflow-hidden border border-[#E0EDE7] row-span-2 min-h-[180px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.easierlife.de/wp-content/uploads/2026/04/1080_1080_home_blau_1.jpg"
              alt="easierLife HOME Basisstation und Notrufknopf"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Komponentenliste */}
          <div className="space-y-3">
            <div>
              <p className="text-sm font-bold text-gray-900 mb-1">1. Basisstation</p>
              <ul className="space-y-0.5">
                {["Integrierte SIM-Karte & Notakku", "Kein Internet oder Telefon nötig", "Lautsprecher & Mikrofon integriert"].map(f => (
                  <li key={f} className="flex items-center gap-1.5 text-xs text-gray-500"><Check size={10} className="text-brand flex-shrink-0" />{f}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 mb-1">2. Notrufknopf (Handsender)</p>
              <ul className="space-y-0.5">
                {["Als Armband oder Halskette tragbar", "Wasserdicht – auch in Bad & Dusche", "5,5 Jahre Akkulaufzeit"].map(f => (
                  <li key={f} className="flex items-center gap-1.5 text-xs text-gray-500"><Check size={10} className="text-brand flex-shrink-0" />{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="p-3.5 bg-brand-light rounded-xl border border-brand/15">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-brand">27 € / Monat – komplett von der Pflegekasse</p>
              <p className="text-xs text-brand/70 mt-0.5">Kein Eigenanteil · Monatlich kündbar · Kostenloser Versand</p>
            </div>
            <CheckCircle2 size={20} className="text-brand flex-shrink-0" />
          </div>
        </div>
      </div>
    );

    // Step 1: Für wen?
    if (step === 1) return (
      <div className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl text-gray-900 mb-5">Für wen stellst du den Antrag?</h2>
        {[
          { val: "ich" as const, label: "Für mich selbst", sub: "Ich bin die pflegebedürftige Person", icon: User },
          { val: "angehoerige" as const, label: "Für eine andere Person", sub: "z. B. Elternteil, Partner, Angehörigen", icon: Heart },
        ].map(({ val, label, sub, icon: Icon }) => (
          <button key={val} type="button" onClick={() => { setFuerWen(val); setTimeout(() => setStep(2), 180); }}
            className={`w-full flex items-center justify-between gap-4 px-5 py-4 rounded-xl border-2 text-left transition-all duration-150 cursor-pointer active:scale-[0.98] ${fuerWen === val ? "border-brand bg-brand-light" : "border-gray-200 hover:border-brand/40 hover:bg-gray-50"}`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${fuerWen === val ? "bg-brand" : "bg-gray-100"}`}>
                <Icon size={18} className={fuerWen === val ? "text-white" : "text-gray-400"} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-gray-300 flex-shrink-0" />
          </button>
        ))}
      </div>
    );

    // Step 2: Pflegegrad
    if (step === 2) return (
      <div>
        <h2 className="font-serif text-xl sm:text-2xl text-gray-900 mb-1">Welcher Pflegegrad liegt vor?</h2>
        <p className="text-sm text-gray-400 mb-5">Der Pflegegrad steht im Bescheid der Pflegekasse.</p>
        <div className="space-y-2.5">
          {["Pflegegrad 1", "Pflegegrad 2", "Pflegegrad 3", "Pflegegrad 4", "Pflegegrad 5"].map(pg => (
            <label key={pg} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 cursor-pointer transition-all ${pflegegrad === pg ? "border-brand bg-brand-light" : "border-gray-200 hover:border-brand/30"}`}>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${pflegegrad === pg ? "border-brand bg-brand" : "border-gray-300"}`}>
                {pflegegrad === pg && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <input type="radio" value={pg} checked={pflegegrad === pg} onChange={() => setPflegegrad(pg)} className="sr-only" />
              <span className="text-sm font-semibold text-gray-900">{pg}</span>
            </label>
          ))}
        </div>
        <div className="mt-4 p-3.5 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-xs text-amber-700 leading-relaxed">
            <strong>Noch kein Pflegegrad?</strong> Du kannst den Antrag trotzdem stellen – wir beraten dich kostenlos zu deinen Möglichkeiten. Wähle in dem Fall keinen Pflegegrad aus.
          </p>
        </div>
        {error && <p className="text-red-500 text-xs mt-3">{error}</p>}
      </div>
    );

    // Step 3: Warum?
    if (step === 3) return (
      <div>
        <h2 className="font-serif text-xl sm:text-2xl text-gray-900 mb-1">Warum wird ein Hausnotruf benötigt?</h2>
        <p className="text-sm text-gray-400 mb-5">Mehrere Antworten möglich – mindestens eine erforderlich.</p>
        <div className="space-y-2.5">
          {[
            "Die Person lebt alleine",
            "Die Person ist weite Teile des Tages allein",
            "Die Person lebt mit jemandem zusammen, der im Notfall nicht helfen kann",
          ].map(g => (
            <label key={g} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 cursor-pointer transition-all ${gruende.includes(g) ? "border-brand bg-brand-light" : "border-gray-200 hover:border-brand/30"}`}>
              <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-colors ${gruende.includes(g) ? "border-brand bg-brand" : "border-gray-300"}`}>
                {gruende.includes(g) && <Check size={11} className="text-white" />}
              </div>
              <input type="checkbox" checked={gruende.includes(g)} onChange={() => toggleGrund(g)} className="sr-only" />
              <span className="text-sm font-medium text-gray-900">{g}</span>
            </label>
          ))}
        </div>
        {error && <p className="text-red-500 text-xs mt-3">{error}</p>}
      </div>
    );

    // Step 4: Wer pflegt?
    if (step === 4) return (
      <div>
        <h2 className="font-serif text-xl sm:text-2xl text-gray-900 mb-1">Wer führt die Pflege durch?</h2>
        <p className="text-sm text-gray-400 mb-5">Wähle die zutreffende Option.</p>
        <div className="space-y-2.5">
          {[
            { val: "angehoerige", label: "Familienangehörige, Freunde oder Nachbarn" },
            { val: "pflegedienst", label: "Ein ambulanter Pflegedienst" },
            { val: "kombination", label: "Kombination aus Angehörigen und Pflegedienst" },
          ].map(({ val, label }) => (
            <label key={val} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 cursor-pointer transition-all ${werPflegt === val ? "border-brand bg-brand-light" : "border-gray-200 hover:border-brand/30"}`}>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${werPflegt === val ? "border-brand bg-brand" : "border-gray-300"}`}>
                {werPflegt === val && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <input type="radio" checked={werPflegt === val} onChange={() => setWerPflegt(val)} className="sr-only" />
              <span className="text-sm font-semibold text-gray-900">{label}</span>
            </label>
          ))}
        </div>
        {error && <p className="text-red-500 text-xs mt-3">{error}</p>}
      </div>
    );

    // Step 5: Bereits vorhanden?
    if (step === 5) return (
      <div>
        <h2 className="font-serif text-xl sm:text-2xl text-gray-900 mb-1">Ist bereits ein Hausnotruf vorhanden?</h2>
        <p className="text-sm text-gray-400 mb-5">Den die Pflegekasse bereits (mit-)finanziert.</p>
        <div className="space-y-3">
          {[
            { val: "nein" as const, label: "Nein, noch kein Hausnotruf vorhanden" },
            { val: "ja" as const, label: "Ja, bereits vorhanden" },
          ].map(({ val, label }) => (
            <button key={val} type="button" onClick={() => { setBereitsVorhanden(val); setTimeout(() => setStep(6), 180); }}
              className={`w-full flex items-center justify-between gap-4 px-5 py-4 rounded-xl border-2 text-left transition-all duration-150 cursor-pointer active:scale-[0.98] ${bereitsVorhanden === val ? "border-brand bg-brand-light" : "border-gray-200 hover:border-brand/40 hover:bg-gray-50"}`}>
              <span className="text-sm font-semibold text-gray-900">{label}</span>
              <ArrowRight size={16} className="text-gray-300 flex-shrink-0" />
            </button>
          ))}
        </div>
        {bereitsVorhanden === "ja" && (
          <div className="mt-4 p-3.5 bg-brand-light rounded-xl border border-brand/20">
            <p className="text-xs text-brand leading-relaxed">
              <strong>Kein Problem.</strong> Du kannst kostenlos zum easierLife-Hausnotruf wechseln. Wir übernehmen alle Formalitäten mit der Pflegekasse.
            </p>
          </div>
        )}
      </div>
    );

    // Step 6: Pflegeversicherung
    if (step === 6) return (
      <div>
        <h2 className="font-serif text-xl sm:text-2xl text-gray-900 mb-1">Angaben zur Pflegeversicherung</h2>
        <p className="text-sm text-gray-400 mb-5">Wir benötigen diese Daten für den Antrag bei deiner Pflegekasse.</p>
        <div className="space-y-4">
          <KrankenkasseSelect value={krankenkasse} onChange={setKrankenkasse} />
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Versichertennummer *</label>
            <div className="relative">
              <CreditCard size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand" />
              <input type="text" value={versichertennummer} onChange={e => setVersichertennummer(e.target.value.toUpperCase())}
                placeholder="z. B. A123456789" disabled={sozialamtVersichert}
                className={`input pl-8 text-sm font-mono tracking-wider ${sozialamtVersichert ? "opacity-50" : ""}`} maxLength={10} />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Steht auf der Krankenversicherungskarte (10 Zeichen)</p>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <div onClick={() => setSozialamtVersichert(!sozialamtVersichert)}
              className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 cursor-pointer transition-colors ${sozialamtVersichert ? "bg-brand border-brand" : "border-gray-300"}`}>
              {sozialamtVersichert && <Check size={10} className="text-white" />}
            </div>
            <span className="text-xs text-gray-600">Ich bin über das örtliche Amt / Sozialamt versichert</span>
          </label>
        </div>
        {error && <p className="text-red-500 text-xs mt-3">{error}</p>}
      </div>
    );

    // Step 7: Kontaktdaten
    if (step === 7) return (
      <div>
        <h2 className="font-serif text-xl sm:text-2xl text-gray-900 mb-1">Deine Kontaktdaten</h2>
        <p className="text-sm text-gray-400 mb-5">Angaben zur {fuerWen === "ich" ? "versicherten Person" : "pflegebedürftigen Person"} und Kontaktadresse.</p>

        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Persönliche Daten</p>
        <div className="space-y-3 mb-5">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Anrede *</label>
            <select value={anrede} onChange={e => setAnrede(e.target.value)} className="input text-sm">
              <option value="">Bitte wählen</option>
              <option>Herr</option>
              <option>Frau</option>
              <option>Divers</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Vorname *</label>
              <input type="text" value={vorname} onChange={e => setVorname(e.target.value)} placeholder="Max" className="input text-sm" autoComplete="given-name" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nachname *</label>
              <input type="text" value={nachname} onChange={e => setNachname(e.target.value)} placeholder="Mustermann" className="input text-sm" autoComplete="family-name" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Geburtsdatum *</label>
            <div className="relative">
              <Calendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand" />
              <input type="date" value={geburtsdatum} onChange={e => setGeburtsdatum(e.target.value)} className="input pl-8 text-sm" max={new Date().toISOString().split("T")[0]} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Telefonnummer *</label>
            <div className="relative">
              <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand" />
              <input type="tel" value={tel} onChange={e => setTel(e.target.value)} placeholder="0170 123 456 7" className="input pl-8 text-sm" autoComplete="tel" />
            </div>
          </div>
        </div>

        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Kontaktadresse</p>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Straße *</label>
              <div className="relative">
                <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand" />
                <input type="text" value={strasse} onChange={e => setStrasse(e.target.value)} placeholder="Musterstraße" className="input pl-8 text-sm" autoComplete="address-line1" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nr. *</label>
              <input type="text" value={hausnummer} onChange={e => setHausnummer(e.target.value)} placeholder="12a" className="input text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">PLZ *</label>
              <input type="text" inputMode="numeric" value={plz} onChange={e => setPlz(e.target.value.replace(/\D/g, ""))} placeholder="12345" maxLength={5} className="input text-sm" autoComplete="postal-code" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Stadt *</label>
              <input type="text" value={ort} onChange={e => setOrt(e.target.value)} placeholder="Berlin" className="input text-sm" autoComplete="address-level2" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Bundesland *</label>
            <select value={bundesland} onChange={e => setBundesland(e.target.value)} className="input text-sm">
              <option value="">Bitte wählen</option>
              {BUNDESLAENDER.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
        </div>
        {error && <p className="text-red-500 text-xs mt-3">{error}</p>}
      </div>
    );

    // Step 8: Lieferadresse
    if (step === 8) return (
      <div>
        <h2 className="font-serif text-xl sm:text-2xl text-gray-900 mb-1">Lieferadresse auswählen</h2>
        <p className="text-sm text-gray-400 mb-5">Wohin soll das Gerät geliefert werden?</p>
        <div className="space-y-3 mb-5">
          {[
            { val: "gleich" as const, label: "An meine Anschrift verschicken", sub: `${strasse} ${hausnummer}, ${plz} ${ort}` },
            { val: "anders" as const, label: "An eine andere Anschrift verschicken", sub: "z. B. direkt zur pflegebedürftigen Person" },
          ].map(({ val, label, sub }) => (
            <label key={val} className={`flex items-start gap-3 px-4 py-3.5 rounded-xl border-2 cursor-pointer transition-all ${lieferOption === val ? "border-brand bg-brand-light" : "border-gray-200 hover:border-brand/30"}`}>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${lieferOption === val ? "border-brand bg-brand" : "border-gray-300"}`}>
                {lieferOption === val && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <input type="radio" checked={lieferOption === val} onChange={() => setLieferOption(val)} className="sr-only" />
              <div>
                <p className="text-sm font-semibold text-gray-900">{label}</p>
                {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
              </div>
            </label>
          ))}
        </div>
        {lieferOption === "anders" && (
          <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Lieferanschrift</p>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Straße *</label>
                <input type="text" value={lieferStrasse} onChange={e => setLieferStrasse(e.target.value)} placeholder="Musterstraße" className="input text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Nr. *</label>
                <input type="text" value={lieferHausnummer} onChange={e => setLieferHausnummer(e.target.value)} placeholder="12a" className="input text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">PLZ *</label>
                <input type="text" inputMode="numeric" value={lieferPlz} onChange={e => setLieferPlz(e.target.value.replace(/\D/g, ""))} placeholder="12345" maxLength={5} className="input text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Stadt *</label>
                <input type="text" value={lieferOrt} onChange={e => setLieferOrt(e.target.value)} placeholder="Berlin" className="input text-sm" />
              </div>
            </div>
          </div>
        )}
        {error && <p className="text-red-500 text-xs mt-3">{error}</p>}
      </div>
    );

    // Step 9: Produktvorschau
    // Step 9: Bestellübersicht
    if (step === 9) return (
      <div>
        <h2 className="font-serif text-xl sm:text-2xl text-gray-900 mb-1">Fast fertig. Stimmt alles?</h2>
        <p className="text-xs text-gray-400 mb-5">Bitte prüfe deine Angaben und bestätige die Bestellung.</p>

        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          {/* Lieferadresse */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Lieferadresse</p>
            <p className="text-sm font-semibold text-gray-900">{anrede} {vorname} {nachname}</p>
            <p className="text-sm text-gray-600 mt-1">
              {lieferOption === "gleich"
                ? <>{strasse} {hausnummer}<br />{plz} {ort}</>
                : <>{lieferStrasse} {lieferHausnummer}<br />{lieferPlz} {lieferOrt}</>
              }
            </p>
            <p className="text-xs text-gray-400 mt-2">{krankenkasse}</p>
          </div>

          {/* Bestellübersicht */}
          <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.easierlife.de/wp-content/uploads/2026/04/1080_1080_home_blau_1.jpg"
              alt="easierLife HOME – Basisstation und Notrufknopf"
              className="w-full h-36 object-cover"
            />
            <div className="p-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Bestellübersicht</p>
              {BESTELLITEMS.map(({ label, desc }) => (
                <div key={label} className="flex items-center gap-3 mb-2.5 last:mb-0">
                  <div className="w-5 h-5 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
                    <Check size={10} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-900 leading-tight">{label}</p>
                    <p className="text-[10px] text-gray-400 leading-tight mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
              <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs text-gray-500">Gesamt (Pflegekasse)</span>
                <span className="text-xs font-bold text-brand">0 € für dich</span>
              </div>
            </div>
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer mb-4">
          <div onClick={() => setEinwilligung(!einwilligung)}
            className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 cursor-pointer transition-colors ${einwilligung ? "bg-brand border-brand" : "border-gray-300"}`}>
            {einwilligung && <Check size={10} className="text-white" />}
          </div>
          <span className="text-xs text-gray-500 leading-relaxed">
            Ich habe die <a href="/datenschutz" className="text-brand underline" target="_blank">Einwilligungserklärung</a> zur Übermittlung meiner Daten zur Kenntnis genommen. Die Einwilligung kann jederzeit widerrufen werden.
          </span>
        </label>

        <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-400 leading-relaxed mb-2">
          Durch Klicken auf „Unterschreiben" erkläre ich mich einverstanden, dass meine Angaben an liva und den Geräteanbieter easierLife zur Bearbeitung weitergegeben werden. liva beauftragt im Rahmen des Antrags die Beantragung der Kostenübernahme bei der Pflegekasse.
        </div>

        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </div>
    );

    // Step 10: Unterschrift
    if (step === 10) return (
      <div>
        <h2 className="font-serif text-xl sm:text-2xl text-gray-900 mb-1">Unterschreiben</h2>
        <p className="text-sm text-gray-400 mb-5">Mit deiner Unterschrift bestätigst du die Richtigkeit deiner Angaben und den Antrag auf Kostenübernahme.</p>
        <SignatureCanvas onSign={setSignatureData} />
        {error && <p className="text-red-500 text-xs mt-3">{error}</p>}
        <p className="text-[10px] text-gray-400 mt-4 flex items-center gap-1"><Lock size={9} /> Deine Unterschrift wird verschlüsselt übertragen</p>
      </div>
    );

    return null;
  }

  // ── Footer buttons per step ──────────────────────────
  function renderFooter() {
    if (step === "success") return null;
    const autoSteps = [1, 5]; // auto-advance, no footer
    if (autoSteps.includes(step as number)) return null;

    const isLast = step === 10;
    const isSummary = step === 9;

    const weiterLabel = isLast ? (submitting ? "Wird gesendet…" : "Antrag abschicken") : isSummary ? "Unterschreiben" : "Weiter";

    function handleWeiter() {
      setError("");
      if (step === "welcome") {
        setStep(1);
      } else if (step === 2) {
        if (!pflegegrad) { setError("Bitte wähle einen Pflegegrad aus."); return; }
        setStep(3);
      } else if (step === 3) {
        if (gruende.length === 0) { setError("Bitte wähle mindestens eine Option aus."); return; }
        setStep(4);
      } else if (step === 4) {
        if (!werPflegt) { setError("Bitte wähle eine Option aus."); return; }
        setStep(5);
      } else if (step === 6) {
        if (!krankenkasse) { setError("Bitte wähle eine Krankenkasse aus."); return; }
        if (!versichertennummer && !sozialamtVersichert) { setError("Bitte gib deine Versichertennummer an."); return; }
        setStep(7);
      } else if (step === 7) {
        if (!vorname || !nachname || !geburtsdatum || !tel || !strasse || !hausnummer || !plz || !ort || !bundesland) {
          setError("Bitte fülle alle Pflichtfelder aus."); return;
        }
        setStep(8);
      } else if (step === 8) {
        if (lieferOption === "anders" && (!lieferStrasse || !lieferHausnummer || !lieferPlz || !lieferOrt)) {
          setError("Bitte fülle alle Lieferadress-Felder aus."); return;
        }
        setStep(9);
      } else if (step === 9) {
        if (!einwilligung) { setError("Bitte stimme der Einwilligungserklärung zu."); return; }
        setStep(10);
      } else if (step === 10) {
        handleSubmit();
      }
    }

    return (
      <div className="flex items-center justify-between gap-3 p-4 sm:px-6 border-t border-gray-100 bg-white">
        {step !== 1 && step !== "welcome" ? (
          <button type="button" onClick={goBack}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer">
            <ChevronLeft size={14} /> Zurück
          </button>
        ) : <span />}
        <button type="button" onClick={handleWeiter} disabled={submitting}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand text-white text-sm font-semibold hover:bg-brand-hover transition-all cursor-pointer disabled:opacity-60 active:scale-[0.97]">
          {weiterLabel}
          {!isLast && <ArrowRight size={14} />}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center" onClick={e => { if (e.target === e.currentTarget && step === "success") onClose(); }}>
      <div className="bg-white w-full sm:max-w-2xl sm:rounded-2xl shadow-2xl flex flex-col h-[92dvh] sm:h-[700px] overflow-hidden animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 sm:fade-in duration-300">

        {/* Progress bar */}
        {step !== "success" && (
          <div className="h-1 bg-gray-100 flex-shrink-0">
            <div className="h-full bg-brand transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
          </div>
        )}

        {/* Modal header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-brand-light flex items-center justify-center">
              <Bell size={14} className="text-brand" />
            </div>
            <span className="text-sm font-semibold text-gray-700">
              {step === "success" ? "Antrag eingegangen" : "Antrag auf Hausnotruf"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {step !== "success" && typeof step === "number" && (
              <span className="text-[11px] text-gray-400 font-medium">Schritt {step}/{TOTAL_STEPS}</span>
            )}
            <button type="button" onClick={onClose} aria-label="Schließen"
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6 py-5 sm:py-6">
          {renderStep()}
        </div>

        {/* Footer */}
        {renderFooter()}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════

export default function HausnotrufFunnelPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [beratungOpen, setBeratungOpen] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  function openModal() { setModalOpen(true); }

  return (
    <div ref={pageRef}>
      {modalOpen && (
        <FunnelModal
          onClose={() => setModalOpen(false)}
        />
      )}
      {beratungOpen && (
        <BeratungsModal
          quelle="Hausnotruf"
          onClose={() => setBeratungOpen(false)}
        />
      )}

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E0EDE7] py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-brand-light text-brand text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wide">
              <CheckCircle2 size={12} /> Pflegekasse zahlt – du nicht
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-gray-900 leading-tight mb-4">
              Hausnotruf <span className="text-brand">kostenlos</span> beantragen
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              Ab Pflegegrad 1 zahlt die Pflegekasse <strong className="text-gray-700">27 € im Monat</strong> – du zahlst nichts. Notruf per Knopfdruck, 24h Notrufzentrale, SIM-Karte inklusive. Kein Internet, kein Router, kein Techniker.
            </p>
            <div className="space-y-2.5 mb-8">
              {["Kein Eigenanteil – Pflegekasse übernimmt alles", "SIM-Karte inklusive – funktioniert ohne Internet & Router", "Wasserdichter Knopf mit 5,5 Jahren Akkulaufzeit", "Kostenlose Angehörigen-App – Familie bleibt informiert"].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-brand flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={openModal} className="btn-primary text-base px-7 py-4">Jetzt kostenlos beantragen <ArrowRight size={18} /></button>
              <button onClick={() => setBeratungOpen(true)} className="btn-secondary text-sm px-6 py-4 flex items-center gap-2 cursor-pointer"><Phone size={15} /> Kostenloses Beratungsgespräch</button>
            </div>
            <p className="text-xs text-gray-400 mt-3">Kostenlose Beratung · Mo–Fr 8–18 Uhr</p>
          </div>
          <div className="flex justify-center">
            <div className="bg-brand-light rounded-3xl p-8 w-full max-w-sm">
              <div className="w-14 h-14 rounded-2xl bg-brand flex items-center justify-center mb-5">
                <Bell size={28} className="text-white" />
              </div>
              <p className="font-serif text-3xl text-brand mb-1">27 € / Monat</p>
              <p className="text-brand/70 text-sm mb-5">Vollständig von der Pflegekasse übernommen</p>
              <div className="bg-white rounded-2xl p-4 space-y-3">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">easierLife HOME – Lieferumfang</p>
                {["Basisstation mit Lautsprecher & Mikrofon", "Notrufknopf (Arm oder Hals) – wasserdicht", "SIM-Karte inklusive – kein Internet nötig", "24h Notrufzentrale rund um die Uhr", "Kostenlose App für Angehörige", "Monatlich kündbar – kein Risiko"].map(item => (
                  <div key={item} className="flex items-center gap-2.5"><CheckCircle2 size={13} className="text-brand flex-shrink-0" /><span className="text-sm text-gray-700">{item}</span></div>
                ))}
              </div>
              <p className="text-xs text-center text-brand/60 mt-4 font-medium">Ab Pflegegrad 1 · Alle Pflegekassen</p>
              <div className="mt-3 flex items-center justify-center gap-2 opacity-60">
                <span className="text-[10px] text-gray-400">Gerät von</span>
                <span className="text-[11px] font-semibold text-gray-500 tracking-tight">easierLife</span>
              </div>
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

      {/* ── Trust Bar ────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E0EDE7] py-5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-4">easierLife-Geräte werden eingesetzt bei</p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              { name: "Caritas", color: "#C8102E" },
              { name: "DRK", color: "#CC0000" },
              { name: "ASB", color: "#E2001A" },
              { name: "AWO", color: "#E2001A" },
            ].map(({ name, color }) => (
              <div key={name} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                <span className="text-sm font-bold text-gray-500 tracking-tight">{name}</span>
              </div>
            ))}
            <div className="hidden sm:block w-px h-5 bg-gray-200" />
            <div className="flex items-center gap-2 opacity-60">
              <div className="w-2 h-2 rounded-full bg-[#4A6FA5] flex-shrink-0" />
              <span className="text-sm font-bold text-[#4A6FA5] tracking-tight">easierLife</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Wie es funktioniert ──────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label">So einfach geht&apos;s</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-gray-900">In 3 Schritten zum Hausnotruf</h2>
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
            <button onClick={openModal} className="btn-primary px-8 py-3.5">Jetzt beantragen <ArrowRight size={16} /></button>
          </div>
        </div>
      </section>

      {/* ── Das Gerät: easierLife HOME ───────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white border-b border-[#E0EDE7]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center">
              <div className="relative bg-[#F7FAF9] rounded-3xl p-10 w-full max-w-sm flex flex-col items-center gap-5">
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white border border-gray-100 rounded-full px-3 py-1 shadow-sm">
                  <span className="text-[10px] text-gray-400 font-medium">Gerät von</span>
                  <span className="text-[11px] font-bold text-gray-600 tracking-tight">easierLife</span>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-6 w-full flex flex-col items-center gap-2 border border-gray-100">
                  <div className="w-14 h-14 rounded-2xl bg-brand-light flex items-center justify-center mb-1">
                    <Radio size={28} className="text-brand" />
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">Basisstation</p>
                  <p className="text-[11px] text-gray-400 text-center leading-snug">Steckdose genügt – kein Internet, kein Router, kein Techniker</p>
                  <div className="flex flex-wrap gap-1.5 mt-1 justify-center">
                    {["SIM inklusive", "Stromausfall-Akku", "Lautsprecher & Mikrofon"].map(t => (
                      <span key={t} className="text-[9px] font-semibold bg-brand-light text-brand px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-4 w-full flex items-center gap-4 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0"><Battery size={18} className="text-brand" /></div>
                  <div><p className="font-semibold text-gray-900 text-sm">Notrufknopf</p><p className="text-[11px] text-gray-400 leading-snug">Wasserdicht · 5,5 Jahre Akku · Arm oder Hals</p></div>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-4 w-full flex items-center gap-4 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0"><Phone size={18} className="text-brand" /></div>
                  <div><p className="font-semibold text-gray-900 text-sm">Angehörigen-App</p><p className="text-[11px] text-gray-400 leading-snug">Kostenlos · Echtzeit-Benachrichtigungen bei Notruf</p></div>
                </div>
              </div>
            </div>
            <div>
              <p className="section-label">Das Gerät</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 mb-4">easierLife HOME – alles dabei</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Wir arbeiten mit <strong className="text-gray-700">easierLife</strong> zusammen – einem der führenden Hausnotruf-Anbieter in Deutschland. Das Gerät kommt fertig konfiguriert per Post. Einfach einstecken – fertig.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {GERAETE.map(({ icon: Icon, label, text }) => (
                  <div key={label} className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-brand-light flex items-center justify-center flex-shrink-0 mt-0.5"><Icon size={15} className="text-brand" /></div>
                    <div><p className="font-semibold text-gray-900 text-sm">{label}</p><p className="text-gray-500 text-xs leading-relaxed">{text}</p></div>
                  </div>
                ))}
              </div>
              <button onClick={openModal} className="btn-primary mt-6 px-7 py-3.5">Jetzt kostenlos beantragen <ArrowRight size={16} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50 border-b border-[#E0EDE7]">
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
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-3">Sicherheit auf Knopfdruck – jeden Monat kostenlos.</h2>
          <p className="text-white/70 text-base mb-8 leading-relaxed">Kein Papierkram, keine Kosten, kein Risiko. Wir regeln alles mit der Pflegekasse.</p>
          <button onClick={openModal} className="inline-flex items-center gap-2 bg-white text-brand font-bold px-8 py-4 rounded-full hover:bg-brand-light transition-colors text-sm shadow-sm hover:shadow-md">
            Jetzt kostenlos beantragen <ArrowRight size={16} />
          </button>
          <p className="text-white/40 text-xs mt-4">100% kostenlos · DSGVO-konform · Unverbindlich</p>
        </div>
      </section>
    </div>
  );
}
