import { sql } from "@vercel/postgres";

async function initLeadsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id                  SERIAL PRIMARY KEY,
      email               TEXT,
      phone               TEXT,
      plz                 TEXT,
      source              TEXT,
      pflegegrad          TEXT,
      tags                TEXT,
      created_at          TIMESTAMPTZ DEFAULT NOW(),
      status              TEXT DEFAULT 'neu',
      consent_beratung    BOOLEAN DEFAULT FALSE,
      consent_weitergabe  BOOLEAN DEFAULT FALSE,
      consent_timestamp   TIMESTAMPTZ
    )
  `;
  // Spalten nachrüsten falls Tabelle schon existiert
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS tags TEXT`;
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS consent_beratung BOOLEAN DEFAULT FALSE`;
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS consent_weitergabe BOOLEAN DEFAULT FALSE`;
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS consent_timestamp TIMESTAMPTZ`;
  // Hausnotruf Funnel-Felder
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS vorname TEXT`;
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS nachname TEXT`;
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS geburtsdatum TEXT`;
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS anrede TEXT`;
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS adresse TEXT`;
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS lieferadresse TEXT`;
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS bundesland TEXT`;
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS fuer_wen TEXT`;
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS gruende TEXT`;
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS wer_pflegt TEXT`;
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS bereits_vorhanden TEXT`;
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS krankenkasse TEXT`;
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS versichertennummer TEXT`;
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS signature_data TEXT`;
  // email auf nullable ändern (falls Spalte noch NOT NULL ist)
  await sql`ALTER TABLE leads ALTER COLUMN email DROP NOT NULL`;
}

async function initNotesTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS lead_notes (
      id         SERIAL PRIMARY KEY,
      lead_id    INTEGER NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
      text       TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

// ── Leads ────────────────────────────────────────────────

async function tryInit() {
  try { await initLeadsTable(); } catch { /* Tabelle existiert bereits – kein Problem */ }
}

export async function insertLead(data: {
  email: string;
  phone?: string | null;
  plz?: string | null;
  source?: string | null;
  pflegegrad?: string | null;
  tags?: string | null;
  consent_beratung?: boolean | null;
  consent_weitergabe?: boolean | null;
  consent_timestamp?: string | null;
  // Hausnotruf Funnel
  vorname?: string | null;
  nachname?: string | null;
  geburtsdatum?: string | null;
  anrede?: string | null;
  adresse?: string | null;
  lieferadresse?: string | null;
  bundesland?: string | null;
  fuer_wen?: string | null;
  gruende?: string | null;
  wer_pflegt?: string | null;
  bereits_vorhanden?: string | null;
  krankenkasse?: string | null;
  versichertennummer?: string | null;
  signature_data?: string | null;
}) {
  if (!process.env.POSTGRES_URL) return;
  await tryInit();
  await sql`
    INSERT INTO leads (
      email, phone, plz, source, pflegegrad, tags,
      consent_beratung, consent_weitergabe, consent_timestamp,
      vorname, nachname, geburtsdatum, anrede,
      adresse, lieferadresse, bundesland,
      fuer_wen, gruende, wer_pflegt, bereits_vorhanden,
      krankenkasse, versichertennummer, signature_data
    )
    VALUES (
      ${data.email},
      ${data.phone ?? null},
      ${data.plz ?? null},
      ${data.source ?? null},
      ${data.pflegegrad ?? null},
      ${data.tags ?? null},
      ${data.consent_beratung ?? false},
      ${data.consent_weitergabe ?? false},
      ${data.consent_timestamp ?? null},
      ${data.vorname ?? null},
      ${data.nachname ?? null},
      ${data.geburtsdatum ?? null},
      ${data.anrede ?? null},
      ${data.adresse ?? null},
      ${data.lieferadresse ?? null},
      ${data.bundesland ?? null},
      ${data.fuer_wen ?? null},
      ${data.gruende ?? null},
      ${data.wer_pflegt ?? null},
      ${data.bereits_vorhanden ?? null},
      ${data.krankenkasse ?? null},
      ${data.versichertennummer ?? null},
      ${data.signature_data ?? null}
    )
  `;
}

export async function getAllLeads() {
  if (!process.env.POSTGRES_URL) return [];
  await initLeadsTable();
  const { rows } = await sql`SELECT * FROM leads ORDER BY created_at DESC`;
  return rows;
}

export async function updateLeadStatus(id: number, status: string) {
  if (!process.env.POSTGRES_URL) return;
  await sql`UPDATE leads SET status = ${status} WHERE id = ${id}`;
}

export async function updateLeadFull(id: number, data: {
  email: string;
  phone: string | null;
  plz: string | null;
  pflegegrad: string | null;
  status: string;
  tags: string | null;
}) {
  if (!process.env.POSTGRES_URL) return;
  await sql`
    UPDATE leads
    SET email      = ${data.email},
        phone      = ${data.phone},
        plz        = ${data.plz},
        pflegegrad = ${data.pflegegrad},
        status     = ${data.status},
        tags       = ${data.tags}
    WHERE id = ${id}
  `;
}

// ── Notizen ──────────────────────────────────────────────

export async function getLeadNotes(leadId: number) {
  if (!process.env.POSTGRES_URL) return [];
  await initNotesTable();
  const { rows } = await sql`
    SELECT * FROM lead_notes WHERE lead_id = ${leadId} ORDER BY created_at DESC
  `;
  return rows;
}

export async function addLeadNote(leadId: number, text: string) {
  if (!process.env.POSTGRES_URL) return null;
  await initNotesTable();
  const { rows } = await sql`
    INSERT INTO lead_notes (lead_id, text) VALUES (${leadId}, ${text}) RETURNING *
  `;
  return rows[0];
}
