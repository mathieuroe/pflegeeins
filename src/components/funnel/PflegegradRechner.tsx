"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ArrowLeft, Check, Clock, Layers, Lock, Heart } from "lucide-react";

interface Props {
  onErgebnis: (pflegegrad: number, gesamtpunkte: number) => void;
}

/* ─── Farb-Tokens ─────────────────────────────────────────────────────────── */
const C = {
  primary:       "#0F6E56",
  primaryLight:  "#1D9E75",
  primarySoft:   "#E1F5EE",
  primaryBorder: "#9FE1CB",
  accent:        "#0F6E56",
  accentSoft:    "#E1F5EE",
  ink:           "#0F1F1A",
  inkSoft:       "#2D4A3E",
  inkFaint:      "#5C7A6F",
  bg:            "#F6FAF8",
  surface:       "#FFFFFF",
  line:          "#E0EDE7",
  lineSoft:      "#EDF3F1",
};

/* ─── Antwort-Sets ────────────────────────────────────────────────────────── */
const SELBST = [
  { lab: "Selbstständig",               sub: "Allein – auch langsamer oder mit Hilfsmitteln", v: 0 },
  { lab: "Überwiegend selbstständig",   sub: "Nur wenig Hilfe oder gelegentliche Aufforderung nötig", v: 1 },
  { lab: "Überwiegend unselbstständig", sub: "Kann wenig beitragen, braucht viel Hilfe", v: 2 },
  { lab: "Unselbstständig",             sub: "Eine andere Person muss (fast) alles übernehmen", v: 3 },
];
const FAEHIG = [
  { lab: "Voll vorhanden",           sub: "(Fast) uneingeschränkt da", v: 0 },
  { lab: "Größtenteils vorhanden",   sub: "Meistens da, bei Schwierigem Probleme", v: 1 },
  { lab: "Nur wenig vorhanden",      sub: "Stark eingeschränkt, aber erkennbar", v: 2 },
  { lab: "Nicht vorhanden",          sub: "Fehlt (fast) ganz", v: 3 },
];
const HAEUFIG = [
  { lab: "Nie oder sehr selten", v: 0 },
  { lab: "Selten",  sub: "1- bis 3-mal in zwei Wochen", v: 1 },
  { lab: "Häufig",  sub: "Mehrmals pro Woche, aber nicht täglich", v: 3 },
  { lab: "Täglich", v: 5 },
];
const INKONT = [
  { lab: "Trifft nicht zu / mache ich selbstständig", v: 0 },
  { lab: "Überwiegend selbstständig",   v: 1 },
  { lab: "Überwiegend unselbstständig", v: 2 },
  { lab: "Unselbstständig",             v: 3 },
];

/* ─── Modul-Daten ─────────────────────────────────────────────────────────── */
const MODULES = [
  {
    n: 1, title: "Mobilität",
    lead: "Wie gut kannst du dich bewegen?", weight: "10 %",
    questions: [
      { id: "1.1", q: "Kannst du im Bett selbst die Position verändern?", hint: "Sich drehen oder aus dem Liegen aufrichten.", o: SELBST },
      { id: "1.2", q: "Kannst du aufrecht sitzen bleiben?", hint: "Auf Bett, Stuhl oder Sessel ohne Hilfe aufrecht halten.", o: SELBST },
      { id: "1.3", q: "Kannst du dich selbst umsetzen?", hint: "Von einer Sitzgelegenheit aufstehen und sich woanders hinsetzen.", o: SELBST },
      { id: "1.4", q: "Kannst du dich in der Wohnung fortbewegen?", hint: "Sicher zwischen den Zimmern bewegen (mindestens 8 Meter).", o: SELBST },
      { id: "1.5", q: "Kannst du Treppen steigen?", hint: "Eine Treppe zwischen zwei Etagen überwinden.", o: SELBST },
      { id: "1.6", role: "special", q: "Sind beide Arme UND beide Beine dauerhaft nicht gebrauchsfähig?",
        hint: "Diese seltene Situation führt unabhängig von der Punktzahl automatisch zu Pflegegrad 5.",
        o: [{ lab: "Nein", v: 0 }, { lab: "Ja, beide Arme und Beine sind gebrauchsunfähig", v: 0 }] },
    ],
  },
  {
    n: 2, title: "Kognition & Kommunikation",
    lead: "Wie gut funktionieren Denken, Erinnern und Verständigung?", weight: "15 %",
    questions: [
      { id: "2.1",  q: "Erkennst du Menschen aus deinem näheren Umfeld?",      hint: "Personen mit regelmäßigem Kontakt.", o: FAEHIG },
      { id: "2.2",  q: "Findest du dich örtlich zurecht?",                      hint: "Wissen, wo du bist, und gezielt andere Orte ansteuern.", o: FAEHIG },
      { id: "2.3",  q: "Findest du dich zeitlich zurecht?",                     hint: "Tageszeit, Wochentag, Jahreszeit erkennen.", o: FAEHIG },
      { id: "2.4",  q: "Erinnerst du dich an wichtige Ereignisse?",             hint: "An kürzlich und länger Zurückliegendes.", o: FAEHIG },
      { id: "2.5",  q: "Kannst du mehrschrittige Handlungen steuern?",         hint: "Alltagsabläufe mit mehreren Schritten zielgerichtet durchführen.", o: FAEHIG },
      { id: "2.6",  q: "Kannst du Alltagsentscheidungen treffen?",             hint: "Sinnvolle, passende Entscheidungen im Alltag.", o: FAEHIG },
      { id: "2.7",  q: "Verstehst du Sachverhalte und Informationen?",         hint: "Dinge inhaltlich einordnen können.", o: FAEHIG },
      { id: "2.8",  q: "Erkennst du Risiken und Gefahren?",                   hint: "", o: FAEHIG },
      { id: "2.9",  q: "Kannst du elementare Bedürfnisse mitteilen?",          hint: "Z.B. Hunger, Durst, Schmerzen – verbal oder nonverbal.", o: FAEHIG },
      { id: "2.10", q: "Verstehst du Aufforderungen?",                         hint: "Bitten rund um alltägliche Grundbedürfnisse.", o: FAEHIG },
      { id: "2.11", q: "Kannst du dich an einem Gespräch beteiligen?",         hint: "Inhalte aufnehmen, sinnvoll antworten, weiterführen.", o: FAEHIG },
    ],
  },
  {
    n: 3, title: "Verhalten & Psyche",
    lead: "Treten Verhaltensweisen auf, bei denen Unterstützung nötig ist?", weight: "15 %",
    intro: "Wie oft ist deshalb die Hilfe einer anderen Person erforderlich?",
    questions: [
      { id: "3.1",  q: "Unruhiges, zielloses Bewegungsverhalten?",                  hint: "Z.B. Umhergehen, Aufstehen/Hinsetzen, Hin- und Herrutschen.", o: HAEUFIG },
      { id: "3.2",  q: "Nächtliche Unruhe?",                                        hint: "Z.B. nachts umherirren, vertauschter Tag-Nacht-Rhythmus.", o: HAEUFIG },
      { id: "3.3",  q: "Selbstschädigendes Verhalten?",                             hint: "Z.B. sich verletzen, ungenießbare Dinge essen/trinken.", o: HAEUFIG },
      { id: "3.4",  q: "Gegenstände beschädigen / aggressiv gegen Sachen?",         hint: "Z.B. wegstoßen, schlagen, zerstören.", o: HAEUFIG },
      { id: "3.5",  q: "Körperlich aggressiv gegen andere Personen?",               hint: "Z.B. schlagen, treten, stoßen.", o: HAEUFIG },
      { id: "3.6",  q: "Verbale Aggression?",                                       hint: "Z.B. Beschimpfungen oder Bedrohungen.", o: HAEUFIG },
      { id: "3.7",  q: "Auffälliges lautes Verhalten?",                             hint: "Z.B. Rufen, Schreien, Klagen, Fluchen, Wiederholen.", o: HAEUFIG },
      { id: "3.8",  q: "Abwehr von Pflege oder Unterstützung?",                     hint: "Z.B. Pflege/Medikamente verweigern, an Kathetern manipulieren.", o: HAEUFIG },
      { id: "3.9",  q: "Wahnvorstellungen?",                                        hint: "Z.B. das Gefühl, verfolgt oder bestohlen zu werden.", o: HAEUFIG },
      { id: "3.10", q: "Starke Ängste?",                                            hint: "Wiederkehrende Angstattacken, die als bedrohlich erlebt werden.", o: HAEUFIG },
      { id: "3.11", q: "Antriebslosigkeit bei gedrückter Stimmung?",               hint: "Z.B. kaum Interesse, kaum Eigeninitiative, wirkt apathisch.", o: HAEUFIG },
      { id: "3.12", q: "Sozial unpassendes Verhalten?",                             hint: "Z.B. distanzloses Verhalten, unangemessenes Greifen.", o: HAEUFIG },
      { id: "3.13", q: "Sonstige unpassende Handlungen?",                           hint: "Z.B. Verstecken/Horten, planlose Aktivitäten.", o: HAEUFIG },
    ],
  },
  {
    n: 4, title: "Selbstversorgung",
    lead: "Wie selbstständig bist du bei Körperpflege, Anziehen und Essen?", weight: "40 %",
    questions: [
      { id: "4.1",  q: "Kannst du dir den vorderen Oberkörper waschen?",              hint: "Hände, Gesicht, Hals, Arme, Achseln, Brust.", o: SELBST },
      { id: "4.2",  q: "Kannst du dich um den Kopfbereich kümmern?",                   hint: "Kämmen, Zähne/Prothese, Rasieren.", o: SELBST },
      { id: "4.3",  q: "Kannst du den Intimbereich waschen?",                          hint: "", o: SELBST },
      { id: "4.4",  q: "Kannst du duschen oder baden (inkl. Haarewaschen)?",           hint: "", o: SELBST },
      { id: "4.5",  q: "Kannst du den Oberkörper an- und auskleiden?",                 hint: "Bereitliegende Kleidung anziehen und ausziehen.", o: SELBST },
      { id: "4.6",  q: "Kannst du den Unterkörper an- und auskleiden?",                hint: "Inklusive Strümpfe und Schuhe.", o: SELBST },
      { id: "4.7",  q: "Kannst du Essen mundgerecht zubereiten und Getränke eingießen?", hint: "Z.B. Essen klein schneiden, Getränk einschenken.", o: SELBST },
      { id: "4.8",  q: "Kannst du selbstständig essen?",
        hint: "Bereitgestellte, mundgerecht zubereitete Speisen essen.",
        o: [{ lab: "Selbstständig", v: 0 }, { lab: "Überwiegend selbstständig", v: 3 }, { lab: "Überwiegend unselbstständig", v: 6 }, { lab: "Unselbstständig", v: 9 }] },
      { id: "4.9",  q: "Kannst du selbstständig trinken?",
        hint: "Bereitstehende Getränke aufnehmen, ggf. mit Strohhalm/Spezialbecher.",
        o: [{ lab: "Selbstständig", v: 0 }, { lab: "Überwiegend selbstständig", v: 2 }, { lab: "Überwiegend unselbstständig", v: 4 }, { lab: "Unselbstständig", v: 6 }] },
      { id: "4.10", q: "Kannst du die Toilette selbstständig benutzen?",
        hint: "Zur Toilette gehen, hinsetzen/aufstehen, Hygiene, Kleidung richten.",
        o: [{ lab: "Selbstständig", v: 0 }, { lab: "Überwiegend selbstständig", v: 2 }, { lab: "Überwiegend unselbstständig", v: 4 }, { lab: "Unselbstständig", v: 6 }] },
      { id: "4.11", q: "Wie kommst du mit Blasenschwäche oder Blasenkatheter/Urostoma zurecht?",
        hint: "Inkontinenz-/Stomasysteme verwenden, wechseln, entsorgen.", o: INKONT },
      { id: "4.12", q: "Wie kommst du mit Darmschwäche oder einem Stoma zurecht?",
        hint: "Inkontinenz-/Stomasysteme verwenden, wechseln, entsorgen.", o: INKONT },
      { id: "4.13", q: "Wirst du über eine Sonde oder einen Zugang ernährt?",
        hint: "Z.B. Port oder PEG. Hinweis: 'täglich zusätzlich zum Essen' zählt hier am stärksten.",
        o: [
          { lab: "Nein / Ernähre mich normal / versorge das selbst", v: 0 },
          { lab: "Ja, aber nur gelegentlich oder vorübergehend",     v: 0 },
          { lab: "Ja, täglich – zusätzlich zum normalen Essen",      v: 6 },
          { lab: "Ja, (fast) ausschließlich über Sonde/Zugang",      v: 3 },
        ] },
    ],
  },
  {
    n: 5, title: "Krankheitsbewältigung",
    lead: "Wie viel Unterstützung brauchst du bei Behandlungen?", weight: "20 %",
    intro: "Gewertet werden ärztlich angeordnete Maßnahmen, die voraussichtlich mindestens 6 Monate nötig sind.",
    questions: [
      { id: "5A", role: "5A",
        q: "Wie oft am Tag brauchst du Hilfe bei einfachen medizinischen Maßnahmen?",
        hint: "Z.B. Medikamente, Injektionen, Sauerstoff, Blutdruck-/Blutzuckermessen, An-/Ablegen von Prothese, Hörgerät oder Kompressionsstrümpfen – alle zusammenzählen.",
        o: [{ lab: "Gar nicht oder seltener als 1× täglich", v: 0 }, { lab: "1- bis 3-mal täglich", v: 1 }, { lab: "4- bis 8-mal täglich", v: 2 }, { lab: "Mehr als 8-mal täglich", v: 3 }] },
      { id: "5B", role: "5B",
        q: "Wie oft brauchst du Hilfe bei aufwändigeren Maßnahmen?",
        hint: "Z.B. Verbandswechsel, Stoma-Versorgung, Katheter/Abführen, Therapien zu Hause (Krankengymnastik, Atemübungen).",
        o: [{ lab: "Gar nicht oder seltener als 1× pro Woche", v: 0 }, { lab: "1-mal bis mehrmals pro Woche", v: 1 }, { lab: "1- bis unter 3-mal täglich", v: 2 }, { lab: "Mindestens 3-mal täglich", v: 3 }] },
      { id: "5C1", role: "5C",
        q: "Brauchst du sehr aufwändige Behandlungen zu Hause oder lange Termine über 3 Stunden?",
        hint: "Z.B. Dialyse oder Beatmung mit ständiger Überwachung zu Hause – oder lange Behandlungen in einer Einrichtung.",
        o: [{ lab: "Nein", v: 0 }, { lab: "Ja, etwa 1× pro Woche", v: 8.6 }, { lab: "Ja, etwa 2× pro Woche", v: 17.2 }, { lab: "Ja, etwa 3× pro Woche", v: 25.8 }, { lab: "Ja, (fast) täglich", v: 60 }] },
      { id: "5C2", role: "5C",
        q: "Wie oft brauchst du Begleitung zu Arzt- oder Therapieterminen (bis 3 Stunden)?",
        hint: "Z.B. Hausarzt, Facharzt, Physiotherapie, Logopädie – wenn du dabei Begleitung benötigst.",
        o: [{ lab: "Selten oder nie", v: 0 }, { lab: "Etwa 1× pro Woche", v: 4.3 }, { lab: "Etwa 2× pro Woche", v: 8.6 }, { lab: "Etwa 3× pro Woche", v: 12.9 }, { lab: "4× pro Woche oder öfter", v: 17.2 }] },
      { id: "5.16", role: "516",
        q: "Musst du eine Diät oder andere ärztlich verordnete Verhaltensregeln einhalten?",
        hint: "Und wie viel Unterstützung brauchst du dabei?",
        o: [{ lab: "Nicht nötig / halte sie selbstständig ein", v: 0 }, { lab: "Brauche gelegentlich Erinnerung oder Anleitung", v: 1 }, { lab: "Brauche mehrmals täglich Anleitung/Aufsicht", v: 2 }, { lab: "Brauche durchgehend Anleitung/Aufsicht", v: 3 }] },
    ],
  },
  {
    n: 6, title: "Alltag & soziale Kontakte",
    lead: "Wie selbstständig gestaltest du Alltag und soziale Kontakte?", weight: "15 %",
    questions: [
      { id: "6.1", q: "Kannst du deinen Tagesablauf selbst gestalten?",                         hint: "Den Tag einteilen und sich an Veränderungen anpassen.", o: SELBST },
      { id: "6.2", q: "Kannst du für Ruhe und Schlaf sorgen?",                                 hint: "Einen Tag-Nacht-Rhythmus einhalten.", o: SELBST },
      { id: "6.3", q: "Kannst du dich selbst beschäftigen?",                                   hint: "Die Zeit mit Aktivitäten füllen, die dir entsprechen.", o: SELBST },
      { id: "6.4", q: "Kannst du über den Tag hinaus planen?",                                 hint: "Längere Zeitabschnitte überschauen und planen.", o: SELBST },
      { id: "6.5", q: "Kannst du mit Menschen im direkten Kontakt umgehen?",                   hint: "Kontakt aufnehmen, ansprechen, auf Ansprache reagieren.", o: SELBST },
      { id: "6.6", q: "Kannst du Kontakte außerhalb des direkten Umfelds pflegen?",            hint: "Z.B. zu Freunden, Bekannten, Nachbarn.", o: SELBST },
    ],
  },
] as const;

/* ─── Punkte-Umrechnung ───────────────────────────────────────────────────── */
const W = {
  m1: (s: number) => s<=1?0 : s<=3?2.5  : s<=5?5     : s<=9?7.5   : 10,
  m2: (s: number) => s<=1?0 : s<=5?3.75 : s<=10?7.5  : s<=16?11.25: 15,
  m3: (s: number) => s<=0?0 : s<=2?3.75 : s<=4?7.5   : s<=6?11.25 : 15,
  m4: (s: number) => s<=2?0 : s<=7?10   : s<=18?20   : s<=36?30   : 40,
  m6: (s: number) => s<=0?0 : s<=3?3.75 : s<=6?7.5   : s<=11?11.25: 15,
  m5: (e: number) => e<=0?0 : e<=1?5    : e<=3?10    : e<=5?15    : 20,
  c:  (p: number) => p<4.3?0 : p<8.6?1 : p<12.9?2 : p<60?3 : 6,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ALL_Q: any[] = [];
MODULES.forEach(m => m.questions.forEach((q: any) => ALL_Q.push({ ...q, mod: m.n }))); // eslint-disable-line @typescript-eslint/no-explicit-any
const TOTAL_Q = ALL_Q.length;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function computeResult(answers: Record<string, number>) {
  const raw: Record<number, number> = { 1:0, 2:0, 3:0, 4:0, 6:0 };
  const m5  = { a:0, b:0, c:0, d:0 };
  let special = false;

  ALL_Q.forEach((q: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const idx = answers[q.id];
    if (idx == null) return;
    const opt = q.o[idx];
    if (q.role === "special") { if (idx === 1) special = true; return; }
    if (q.mod === 5) {
      if (q.role === "5A")  m5.a = opt.v;
      else if (q.role === "5B")  m5.b = opt.v;
      else if (q.role === "5C")  m5.c += opt.v;
      else if (q.role === "516") m5.d = opt.v;
      return;
    }
    raw[q.mod] += opt.v;
  });

  const w: Record<number, number> = {
    1: W.m1(raw[1]), 2: W.m2(raw[2]), 3: W.m3(raw[3]),
    4: W.m4(raw[4]), 5: W.m5(m5.a + m5.b + W.c(m5.c) + m5.d), 6: W.m6(raw[6]),
  };
  const h23  = Math.max(w[2], w[3]);
  const total = Math.round((w[1] + h23 + w[4] + w[5] + w[6]) * 100) / 100;

  let pg = 0;
  if (special || total >= 90) pg = 5;
  else if (total >= 70)   pg = 4;
  else if (total >= 47.5) pg = 3;
  else if (total >= 27)   pg = 2;
  else if (total >= 12.5) pg = 1;

  return { w, h23, total, pg, special };
}

/* ─── Wizard-Schritte ─────────────────────────────────────────────────────── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const STEPS: any[] = [{ type: "intro" }];
MODULES.forEach(m => {
  STEPS.push({ type: "modIntro", mod: m });
  m.questions.forEach((q: any) => STEPS.push({ type: "q", q: { ...q, mod: m.n }, mod: m })); // eslint-disable-line @typescript-eslint/no-explicit-any
});

/* ─── Globale Styles ──────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @keyframes optIn { from { opacity:0; transform:translateY(7px) } to { opacity:1; transform:none } }
  @keyframes rise  { from { opacity:0; transform:translateY(11px) } to { opacity:1; transform:none } }
  .pgr-btn:focus-visible { outline: 3px solid #2F5D4F; outline-offset: 3px; }
`;

const sBtn = {
  primary: {
    padding:"13px 26px", background:C.primary, color:"#fff", border:"none",
    borderRadius:99, fontSize:"1rem", fontWeight:700, cursor:"pointer",
    fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap:8,
    boxShadow:`0 4px 14px ${C.primary}44`, transition:"transform .15s, box-shadow .2s",
  } as React.CSSProperties,
  ghost: {
    padding:"12px 22px", background:"transparent", color:C.inkSoft,
    border:`1.5px solid ${C.line}`, borderRadius:99, fontSize:"1rem",
    fontWeight:600, cursor:"pointer", fontFamily:"inherit",
    display:"inline-flex", alignItems:"center", gap:8, transition:"background .15s, color .15s",
  } as React.CSSProperties,
};

/* ─── Antwort-Karte ───────────────────────────────────────────────────────── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function OptionCard({ opt, idx, selected, onSelect, delay }: any) {
  const sel = selected === idx;
  const [hov, setHov] = useState(false);
  return (
    <button className="pgr-btn" onClick={() => onSelect(idx)} aria-pressed={sel}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display:"flex", alignItems:"center", gap:14, textAlign:"left", width:"100%",
        padding:"14px 15px", borderRadius:13, border:`2px solid ${sel ? C.primary : hov ? C.primaryBorder : C.line}`,
        background: sel ? C.primarySoft : "#fff",
        boxShadow: sel ? `0 0 0 1px ${C.primary} inset` : hov ? "0 2px 8px rgba(38,34,25,.07)" : "0 1px 3px rgba(38,34,25,.04)",
        transition:"border-color .15s, background .15s, box-shadow .15s, transform .12s",
        transform: hov && !sel ? "translateY(-1px)" : "none",
        cursor:"pointer", outline:"none", fontFamily:"inherit",
        animation:`optIn .38s ${delay}ms both`,
      }}>
      <div style={{
        width:31, height:31, borderRadius:9, flexShrink:0, display:"grid", placeItems:"center",
        background: sel ? C.primary : "#fff",
        border:`1.5px solid ${sel ? C.primary : C.line}`,
        fontSize:".86rem", fontWeight:700, color: sel ? "#fff" : C.inkFaint,
        transition:"all .15s",
      }}>
        {sel ? <Check size={15} color="#fff"/> : idx + 1}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontWeight:600, fontSize:"1rem", color: sel ? C.primary : C.ink, lineHeight:1.25 }}>{opt.lab}</div>
        {opt.sub && <div style={{ fontSize:".87rem", color:C.inkSoft, marginTop:2 }}>{opt.sub}</div>}
      </div>
    </button>
  );
}

/* ─── Intro-Screen ────────────────────────────────────────────────────────── */
function IntroScreen({ onStart }: { onStart: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ textAlign:"center", padding:"38px 26px 32px" }}>
      <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:C.primarySoft,
        border:`1px solid ${C.primaryBorder}`, borderRadius:99, padding:"7px 16px", marginBottom:22 }}>
        <Heart size={14} color={C.primary} fill={C.primary}/>
        <span style={{ fontSize:".76rem", fontWeight:700, letterSpacing:".13em", textTransform:"uppercase", color:C.primary }}>
          Pflegegrad selbst einschätzen
        </span>
      </div>
      <h1 style={{ fontFamily:"var(--font-dm-serif), Georgia, serif", fontSize:"clamp(1.85rem,5.5vw,2.5rem)",
        fontWeight:400, lineHeight:1.07, letterSpacing:"-.02em", marginBottom:16, color:C.ink }}>
        In wenigen Minuten zu deinem{" "}
        <em style={{ fontStyle:"italic", color:C.primary }}>voraussichtlichen Pflegegrad</em>
      </h1>
      <p style={{ fontSize:"1.05rem", color:C.inkSoft, maxWidth:"46ch", margin:"0 auto 26px", lineHeight:1.55 }}>
        Beantworte einfache Fragen aus sechs Lebensbereichen – für dich selbst oder eine Person, die du pflegst.
      </p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center", marginBottom:30 }}>
        {([[<Layers key="l" size={14}/>, "6 Lebensbereiche"], [<Clock key="c" size={14}/>, "ca. 5 Minuten"], [<Lock key="k" size={14}/>, "Anonym & ohne Speicherung"]] as [React.ReactNode, string][]).map(([icon, txt], i) => (
          <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:8, fontSize:".89rem", fontWeight:500,
            color:C.inkSoft, background:"#fff", border:`1px solid ${C.line}`, padding:"9px 15px", borderRadius:99 }}>
            <span style={{ color:C.primary }}>{icon}</span>{txt}
          </span>
        ))}
      </div>
      <button className="pgr-btn" onClick={onStart}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ ...sBtn.primary, fontSize:"1.06rem", padding:"15px 36px",
          transform: hov ? "translateY(-2px)" : "none",
          boxShadow: hov ? `0 8px 24px ${C.primary}55` : `0 4px 16px ${C.primary}44` }}>
        Jetzt kostenlos berechnen <ArrowRight size={18}/>
      </button>
      <p style={{ marginTop:20, fontSize:".81rem", color:C.inkFaint, lineHeight:1.5 }}>
        Deine Angaben werden nur in deinem Browser verarbeitet – keine Speicherung oder Übertragung.
      </p>
    </div>
  );
}

/* ─── Modul-Intro ─────────────────────────────────────────────────────────── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ModIntroScreen({ mod, onNext, onBack, isFirst }: any) {
  return (
    <div style={{ textAlign:"center", padding:"38px 26px 34px" }}>
      <div style={{ fontSize:".76rem", fontWeight:600, letterSpacing:".12em", textTransform:"uppercase", color:C.inkFaint, marginBottom:18 }}>
        Modul {mod.n} von 6
      </div>
      <div style={{ width:70, height:70, borderRadius:18, margin:"0 auto 20px",
        background:`linear-gradient(150deg,${C.primarySoft},#fff)`,
        border:`1.5px solid ${C.primaryBorder}`, display:"grid", placeItems:"center",
        boxShadow:"0 2px 10px rgba(47,93,79,.12)" }}>
        <span style={{ fontFamily:"var(--font-dm-serif), Georgia, serif", fontWeight:700, fontSize:"1.9rem", color:C.primary }}>{mod.n}</span>
      </div>
      <h2 style={{ fontFamily:"var(--font-dm-serif), Georgia, serif", fontWeight:700, fontSize:"1.75rem", lineHeight:1.12,
        letterSpacing:"-.015em", marginBottom:10 }}>{mod.title}</h2>
      <p style={{ fontSize:"1.04rem", color:C.inkSoft, maxWidth:"42ch", margin:"0 auto 8px" }}>{mod.lead}</p>
      {mod.intro && <p style={{ fontSize:".93rem", color:C.inkSoft, fontStyle:"italic", maxWidth:"44ch", margin:"0 auto 8px" }}>{mod.intro}</p>}
      <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:C.accentSoft,
        padding:"7px 14px", borderRadius:99, margin:"12px 0 26px", fontSize:".83rem", fontWeight:600, color:C.accent }}>
        Gewichtung {mod.weight}
      </div>
      <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
        {!isFirst && (
          <button className="pgr-btn" onClick={onBack} style={sBtn.ghost}>
            <ArrowLeft size={15}/> Zurück
          </button>
        )}
        <button className="pgr-btn" onClick={onNext} style={sBtn.primary}>
          Weiter <ArrowRight size={15}/>
        </button>
      </div>
    </div>
  );
}

/* ─── Frage-Screen ────────────────────────────────────────────────────────── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function QuestionScreen({ q, mod, selected, onSelect, onBack }: any) {
  return (
    <div style={{ padding:"26px 22px 20px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:16,
        fontSize:".77rem", fontWeight:600, letterSpacing:".04em", color:C.inkFaint }}>
        <span style={{ color:C.primary, textTransform:"uppercase", letterSpacing:".09em" }}>
          Modul {mod.n} · {mod.title}
        </span>
      </div>
      <h2 style={{ fontFamily:"var(--font-dm-serif), Georgia, serif", fontWeight:700,
        fontSize:"clamp(1.4rem,4vw,1.8rem)", lineHeight:1.15, letterSpacing:"-.015em",
        color:C.ink, marginBottom: q.hint ? 9 : 18 }}>{q.q}</h2>
      {q.hint && <p style={{ fontSize:".96rem", color:C.inkSoft, marginBottom:18, lineHeight:1.5 }}>{q.hint}</p>}
      <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
        {q.o.map((opt: any, i: number) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
          <OptionCard key={i} opt={opt} idx={i} selected={selected} onSelect={onSelect} delay={i * 48 + 25}/>
        ))}
      </div>
      <div style={{ marginTop:18 }}>
        <button className="pgr-btn" onClick={onBack}
          style={{ background:"none", border:"none", cursor:"pointer", display:"inline-flex",
            alignItems:"center", gap:6, fontSize:".93rem", fontWeight:600,
            color:C.inkFaint, padding:"6px 0", fontFamily:"inherit" }}>
          <ArrowLeft size={14}/> Zurück
        </button>
      </div>
    </div>
  );
}

/* ─── Haupt-Komponente ────────────────────────────────────────────────────── */
export default function PflegegradRechner({ onErgebnis }: Props) {
  const [step,    setStep]    = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((s: number) => { setStep(s); setAnimKey(k => k + 1); }, []);
  const goNext = useCallback(() => goTo(step + 1), [step, goTo]);
  const goBack = useCallback(() => { if (step > 0) goTo(step - 1); }, [step, goTo]);

  const cur = STEPS[step];
  const answered = ALL_Q.filter((q: any) => answers[q.id] != null).length; // eslint-disable-line @typescript-eslint/no-explicit-any
  const showProgress = cur.type === "q" || cur.type === "modIntro";

  // Psychologischer Fortschritt: easeOut-Kurve (schnell am Anfang, langsam am Ende)
  // + Modul-Boost: beim Starten eines Moduls springt der Balken sofort vor
  const easeOut = (x: number) => 1 - (1 - x) ** 2.2;
  const rawProgress = (() => {
    if (cur.type === "modIntro" || cur.type === "q") {
      const before = ALL_Q.filter((q: any) => q.mod < cur.mod.n).length; // eslint-disable-line @typescript-eslint/no-explicit-any
      const inMod  = ALL_Q.filter((q: any) => q.mod === cur.mod.n).length; // eslint-disable-line @typescript-eslint/no-explicit-any
      return Math.max(answered, before + inMod * 0.35) / TOTAL_Q;
    }
    return answered / TOTAL_Q;
  })();
  const displayPct = easeOut(rawProgress) * 100;

  const selectOpt = useCallback((qid: string, idx: number) => {
    setAnswers(a => ({ ...a, [qid]: idx }));
    const updatedAnswers = { ...answers, [qid]: idx };
    // PG-5-Automatik: Sonderfall-Frage mit "Ja" beantwortet → sofort Ergebnis
    if (cur.type === "q" && cur.q.role === "special" && idx === 1) {
      const R = computeResult(updatedAnswers);
      setTimeout(() => onErgebnis(R.pg, R.total), 260);
      return;
    }
    const nextStep = step + 1;
    if (nextStep >= STEPS.length) {
      const R = computeResult(updatedAnswers);
      setTimeout(() => onErgebnis(R.pg, R.total), 260);
    } else {
      setTimeout(() => goTo(nextStep), 260);
    }
  }, [step, goTo, answers, onErgebnis, cur]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (cur.type === "q") {
        const n = parseInt(e.key, 10);
        if (n >= 1 && n <= cur.q.o.length) { e.preventDefault(); selectOpt(cur.q.id, n - 1); return; }
      }
      if (e.key === "Backspace" && !/input|textarea/i.test((e.target as HTMLElement).tagName)) { e.preventDefault(); goBack(); }
      if (e.key === "Enter" && (cur.type === "intro" || cur.type === "modIntro")) { e.preventDefault(); goNext(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [cur, selectOpt, goBack, goNext]);

  return (
    <div style={{ fontFamily:"inherit", color:C.ink }}>
      <style>{GLOBAL_CSS}</style>

      {/* Fortschrittsbalken */}
      {showProgress && (
        <div style={{ marginBottom:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between",
            fontSize:".78rem", fontWeight:500, color:C.inkFaint, marginBottom:5 }}>
            <span>{`Modul ${cur.mod.n} · ${cur.mod.title}`}</span>
            <span style={{ fontWeight:700, color:C.primary }}>{cur.mod.n} / 6</span>
          </div>
          <div style={{ height:5, background:C.line, borderRadius:99, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${displayPct}%`, borderRadius:99,
              background:`linear-gradient(90deg,${C.primaryLight},${C.primary})`,
              transition:"width .5s cubic-bezier(.25,.1,.25,1)" }}/>
          </div>
        </div>
      )}

      {/* Wizard-Karte */}
      <div key={animKey} style={{ animation:"rise .44s cubic-bezier(.2,.7,.2,1) both" }}>
        <div style={{ background:C.surface, borderRadius:22,
          border:`1px solid ${C.line}`,
          boxShadow:"0 4px 14px rgba(38,34,25,.07), 0 12px 32px rgba(38,34,25,.05)" }}>

          {cur.type === "intro" && <IntroScreen onStart={goNext}/>}

          {cur.type === "modIntro" && (
            <ModIntroScreen mod={cur.mod} onNext={goNext} onBack={goBack} isFirst={step <= 1}/>
          )}

          {cur.type === "q" && (
            <QuestionScreen q={cur.q} mod={cur.mod}
              selected={answers[cur.q.id] ?? null}
              onSelect={(i: number) => selectOpt(cur.q.id, i)}
              onBack={goBack}/>
          )}
        </div>
      </div>

      <p style={{ marginTop:16, textAlign:"center", fontSize:".74rem", color:C.inkFaint, lineHeight:1.5 }}>
        Methodik nach dem VdK-Selbsteinschätzungsbogen &amp; den Begutachtungs-Richtlinien des GKV-Spitzenverbandes (SGB XI)
      </p>
    </div>
  );
}
