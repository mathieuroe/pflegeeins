"use client";

import { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";

type Status = "neu" | "kontaktiert" | "abgeschlossen";

type Lead = {
  id: number;
  email: string;
  phone: string | null;
  plz: string | null;
  source: string | null;
  pflegegrad: string | null;
  tags: string | null;
  created_at: string;
  status: Status;
  consent_beratung: boolean | null;
  consent_weitergabe: boolean | null;
  consent_timestamp: string | null;
  vorname: string | null;
  nachname: string | null;
  geburtsdatum: string | null;
  anrede: string | null;
  adresse: string | null;
  lieferadresse: string | null;
  bundesland: string | null;
  fuer_wen: string | null;
  gruende: string | null;
  wer_pflegt: string | null;
  bereits_vorhanden: string | null;
  krankenkasse: string | null;
  versichertennummer: string | null;
  signature_data: string | null;
};

type Note = {
  id: number;
  lead_id: number;
  text: string;
  created_at: string;
};

interface Props {
  lead: Lead;
  onClose: () => void;
  onUpdate: (updated: Lead) => void;
}

const STATUS_OPTIONS: { value: Status; label: string; active: string; inactive: string }[] = [
  { value: "neu",           label: "Neu",          active: "bg-brand text-white border-brand",                inactive: "bg-white text-gray-400 border-[#E0EDE7] hover:border-brand/40" },
  { value: "kontaktiert",   label: "Kontaktiert",  active: "bg-yellow-100 text-yellow-700 border-yellow-300", inactive: "bg-white text-gray-400 border-[#E0EDE7] hover:border-yellow-200" },
  { value: "abgeschlossen", label: "Erledigt",     active: "bg-gray-100 text-gray-600 border-gray-300",       inactive: "bg-white text-gray-400 border-[#E0EDE7] hover:border-gray-300" },
];

const PREDEFINED_TAGS = ["Rückruf", "E-Mail gesendet", "Angebot gesendet", "Warteliste", "Nicht erreichbar", "Kein Interesse"];

function formatDate(ts: string) {
  return new Date(ts).toLocaleDateString("de-DE", {
    day: "2-digit", month: "2-digit", year: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });
}

function Row({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="flex gap-2 text-sm">
      <span className="text-gray-400 w-36 flex-shrink-0">{label}</span>
      <span className="text-gray-800 font-medium">{value}</span>
    </div>
  );
}

export default function LeadPopup({ lead, onClose, onUpdate }: Props) {
  const [tab, setTab] = useState<"details" | "antrag">(lead.vorname ? "antrag" : "details");
  const [form, setForm] = useState({
    email:      lead.email,
    phone:      lead.phone ?? "",
    plz:        lead.plz ?? "",
    pflegegrad: lead.pflegegrad ?? "",
    status:     lead.status,
    tags:       lead.tags ? lead.tags.split(",").filter(Boolean) : [] as string[],
  });
  const [notes, setNotes]           = useState<Note[]>([]);
  const [newNote, setNewNote]       = useState("");
  const [saving, setSaving]         = useState(false);
  const [addingNote, setAddingNote] = useState(false);
  const [customTag, setCustomTag]   = useState("");
  const [showCustom, setShowCustom] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/leads/${lead.id}/notes`)
      .then((r) => r.json())
      .then((d) => setNotes(d.notes ?? []));
  }, [lead.id]);

  function toggleTag(tag: string) {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter((t) => t !== tag) : [...f.tags, tag],
    }));
  }

  function addCustomTag() {
    const t = customTag.trim();
    if (t && !form.tags.includes(t)) setForm((f) => ({ ...f, tags: [...f.tags, t] }));
    setCustomTag("");
    setShowCustom(false);
  }

  async function handleSave() {
    setSaving(true);
    await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email, phone: form.phone || null, plz: form.plz || null,
        pflegegrad: form.pflegegrad || null, status: form.status,
        tags: form.tags.join(",") || null,
      }),
    });
    onUpdate({ ...lead, ...form, phone: form.phone || null, plz: form.plz || null, pflegegrad: form.pflegegrad || null, tags: form.tags.join(",") || null });
    setSaving(false);
    onClose();
  }

  async function handleAddNote() {
    if (!newNote.trim()) return;
    setAddingNote(true);
    const res = await fetch(`/api/admin/leads/${lead.id}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newNote.trim() }),
    });
    const data = await res.json();
    if (data.note) setNotes((prev) => [data.note, ...prev]);
    setNewNote("");
    setAddingNote(false);
  }

  const hasAntrag = !!lead.vorname;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0EDE7] flex-shrink-0">
          <div>
            <p className="font-serif text-lg text-gray-900">
              {lead.vorname ? `${lead.vorname} ${lead.nachname}` : lead.email}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{lead.source ?? "–"} · {formatDate(lead.created_at)}</p>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        {hasAntrag && (
          <div className="flex border-b border-[#E0EDE7] px-6 flex-shrink-0">
            {(["antrag", "details"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`text-sm font-medium py-3 mr-6 border-b-2 transition-colors ${
                  tab === t ? "border-brand text-brand" : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {t === "antrag"
                  ? lead.source === "pflegebox-beantragen" ? "Pflegebox-Antrag" : "Hausnotruf-Antrag"
                  : "Details & Notizen"}
              </button>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="overflow-y-auto flex-1">

          {/* ── TAB: Antrag ── */}
          {tab === "antrag" && hasAntrag && (
            <div className="p-6 space-y-6">

              {/* Person */}
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Antragsteller</p>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <Row label="Anrede" value={lead.anrede} />
                  <Row label="Name" value={`${lead.vorname} ${lead.nachname}`} />
                  <Row label="Geburtsdatum" value={lead.geburtsdatum} />
                  <Row label="Telefon" value={lead.phone} />
                  <Row label="E-Mail" value={lead.email} />
                </div>
              </div>

              {/* Adressen */}
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Adressen</p>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <Row label="Wohnanschrift" value={lead.adresse} />
                  <Row label="Bundesland" value={lead.bundesland} />
                  <Row label="Lieferadresse" value={lead.lieferadresse !== lead.adresse ? lead.lieferadresse : "= Wohnanschrift"} />
                </div>
              </div>

              {/* Pflegesituation */}
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Pflegesituation</p>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <Row label="Antrag für" value={lead.fuer_wen === "ich" ? "Mich selbst" : lead.fuer_wen === "angehoerige" ? "Angehörige/n" : lead.fuer_wen} />
                  <Row label="Pflegegrad" value={lead.pflegegrad} />
                  <Row label={lead.source === "pflegebox-beantragen" ? "Produkte" : "Gründe"} value={lead.gruende} />
                  <Row label="Wer pflegt" value={lead.wer_pflegt} />
                  <Row label="Gerät vorhanden" value={lead.bereits_vorhanden === "ja" ? "Ja" : lead.bereits_vorhanden === "nein" ? "Nein" : lead.bereits_vorhanden} />
                </div>
              </div>

              {/* Krankenversicherung */}
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Krankenversicherung</p>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <Row label="Krankenkasse" value={lead.krankenkasse} />
                  <Row label="Versichertennr." value={lead.versichertennummer || "Sozialamt / Nicht bekannt"} />
                </div>
              </div>

              {/* Unterschrift */}
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Unterschrift</p>
                {lead.signature_data ? (
                  <div className="bg-gray-50 rounded-xl p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={lead.signature_data}
                      alt="Unterschrift"
                      className="max-w-full h-auto border border-gray-200 rounded-lg bg-white"
                    />
                    <p className="text-xs text-gray-400 mt-2">Einwilligung erteilt · {lead.consent_timestamp ? formatDate(lead.consent_timestamp) : "–"}</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-400">Keine Unterschrift gespeichert</div>
                )}
              </div>
            </div>
          )}

          {/* ── TAB: Details & Notizen ── */}
          {(tab === "details" || !hasAntrag) && (
            <div className="p-6 grid md:grid-cols-2 gap-6">

              {/* Links: Details + Status + Tags */}
              <div className="space-y-6">
                <div>
                  <p className="section-label mb-3">Details</p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">E-Mail</label>
                      <input className="input text-sm" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">Telefon</label>
                        <input className="input text-sm" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="–" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">PLZ</label>
                        <input className="input text-sm" value={form.plz} onChange={(e) => setForm((f) => ({ ...f, plz: e.target.value }))} placeholder="–" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Pflegegrad</label>
                      <input className="input text-sm" value={form.pflegegrad} onChange={(e) => setForm((f) => ({ ...f, pflegegrad: e.target.value }))} placeholder="–" />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="section-label mb-3">Status</p>
                  <div className="flex gap-2 flex-wrap">
                    {STATUS_OPTIONS.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => setForm((f) => ({ ...f, status: s.value }))}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full border-2 transition-all ${
                          form.status === s.value ? s.active : s.inactive
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="section-label mb-3">Tags</p>
                  <div className="flex gap-2 flex-wrap">
                    {PREDEFINED_TAGS.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                          form.tags.includes(tag)
                            ? "bg-brand-light border-brand text-brand font-semibold"
                            : "bg-white border-[#E0EDE7] text-gray-500 hover:border-brand/40"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                    {form.tags.filter((t) => !PREDEFINED_TAGS.includes(t)).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className="text-xs px-2.5 py-1 rounded-full bg-brand-light border border-brand text-brand font-semibold flex items-center gap-1"
                      >
                        {tag} <X size={10} />
                      </button>
                    ))}
                    {showCustom ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          autoFocus
                          className="text-xs border border-[#E0EDE7] rounded-full px-2.5 py-1 outline-none focus:border-brand w-32 transition-colors"
                          value={customTag}
                          onChange={(e) => setCustomTag(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") addCustomTag(); if (e.key === "Escape") setShowCustom(false); }}
                          placeholder="Tag eingeben…"
                        />
                        <button onClick={addCustomTag} className="text-xs text-brand font-semibold hover:opacity-70">OK</button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowCustom(true)}
                        className="text-xs px-2.5 py-1 rounded-full border border-dashed border-[#E0EDE7] text-gray-400 hover:border-brand/40 flex items-center gap-1 transition-colors"
                      >
                        <Plus size={10} /> Eigener Tag
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Rechts: Notizen */}
              <div className="flex flex-col gap-4">
                <p className="section-label">Notizen</p>
                <div>
                  <textarea
                    className="input text-sm resize-none"
                    rows={3}
                    placeholder="Neue Notiz hinzufügen…"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleAddNote(); }}
                  />
                  <button
                    onClick={handleAddNote}
                    disabled={addingNote || !newNote.trim()}
                    className="btn-secondary text-xs py-2 mt-2 w-full justify-center disabled:opacity-40"
                  >
                    {addingNote ? "Wird gespeichert…" : "Notiz hinzufügen"}
                  </button>
                </div>
                <div className="space-y-2.5 overflow-y-auto max-h-56 pr-1">
                  {notes.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-6">Noch keine Notizen</p>
                  ) : notes.map((note) => (
                    <div key={note.id} className="bg-gray-50 rounded-xl px-3.5 py-3">
                      <p className="text-[10px] text-gray-400 mb-1 font-medium">{formatDate(note.created_at)}</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E0EDE7] flex justify-end gap-3 flex-shrink-0">
          <button onClick={onClose} className="btn-ghost text-sm">Abbrechen</button>
          {(tab === "details" || !hasAntrag) && (
            <button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2.5 px-5">
              {saving ? "Wird gespeichert…" : "Änderungen speichern"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
