import { NextRequest, NextResponse } from "next/server";
import { insertLead } from "@/lib/db";
import { sendInternalLeadNotification, sendLeadConfirmation } from "@/lib/email";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    email, phone, plz, path, pflegegrad, funnel, timestamp, einrichtung,
    tags, interessen, consent_beratung, consent_weitergabe, consent_timestamp,
    vorname, nachname, geburtsdatum, anrede,
    adresse, lieferadresse, bundesland,
    fuer_wen, gruende, wer_pflegt, bereits_vorhanden,
    krankenkasse, versichertennummer, signature, hausnotruf,
  } = body;

  const ts = timestamp || new Date().toISOString();
  const source = path || funnel || "unbekannt";
  const resolvedTags = tags || (Array.isArray(interessen) ? interessen.join(", ") : interessen) || null;

  try {
    await insertLead({
      email, phone, plz, source, pflegegrad, tags: resolvedTags,
      consent_beratung: consent_beratung ?? false,
      consent_weitergabe: consent_weitergabe ?? false,
      consent_timestamp: consent_timestamp ?? null,
      vorname, nachname, geburtsdatum, anrede,
      adresse, lieferadresse, bundesland,
      fuer_wen, gruende, wer_pflegt, bereits_vorhanden,
      krankenkasse, versichertennummer,
      signature_data: typeof signature === "string" ? signature : null,
    });
  } catch (err) {
    console.error("[submit-lead] DB-Speicherung fehlgeschlagen:", err);
  }

  try {
    await sendInternalLeadNotification({
      email, phone, plz, pflegegrad, tags: resolvedTags ?? undefined, source, timestamp: ts,
      vorname, nachname, geburtsdatum, anrede, adresse, krankenkasse, gruende,
      hausnotruf: hausnotruf != null ? Boolean(hausnotruf) : null,
    });
  } catch (err) {
    console.error("[submit-lead] interne E-Mail fehlgeschlagen:", err);
  }

  if (email) {
    try {
      await sendLeadConfirmation({ email, pflegegrad, tags: resolvedTags ?? undefined, einrichtung });
    } catch (err) {
      console.error("[submit-lead] Bestätigungs-E-Mail fehlgeschlagen:", err);
    }
  }

  return NextResponse.json({ success: true });
}
