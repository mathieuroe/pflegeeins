import nodemailer from "nodemailer";

const BRAND = "#0F6E56";
const BRAND_LIGHT = "#E1F5EE";

function getTransporter() {
  return nodemailer.createTransport({
    host: "smtp.ionos.de",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function wrapEmail(content: string) {
  return `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F6FAF8;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F6FAF8;padding:24px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:${BRAND};padding:24px 32px;">
              <span style="font-family:Georgia,serif;font-size:22px;font-weight:700;color:#ffffff;">liva</span>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;color:#0F1F1A;font-size:15px;line-height:1.6;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background:${BRAND_LIGHT};font-size:12px;color:#5C7A6F;">
              liva · <a href="https://www.liva-pflege.de" style="color:${BRAND};text-decoration:none;">www.liva-pflege.de</a><br>
              <a href="https://www.liva-pflege.de/datenschutz" style="color:#5C7A6F;">Datenschutz</a> ·
              <a href="https://www.liva-pflege.de/impressum" style="color:#5C7A6F;">Impressum</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendInternalLeadNotification(data: {
  email?: string | null;
  phone?: string | null;
  plz?: string | null;
  pflegegrad?: string | null;
  tags?: string | null;
  source: string;
  timestamp: string;
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
  hausnotruf?: boolean | null;
  dbSaved?: boolean;
}) {
  const row = (label: string, value: string | null | undefined) => value ? `
    <tr>
      <td style="padding:5px 12px 5px 0;color:#5C7A6F;width:160px;vertical-align:top;font-size:13px;">${label}</td>
      <td style="padding:5px 0;color:#0F1F1A;font-weight:600;font-size:13px;">${value}</td>
    </tr>` : "";

  const section = (title: string, rows: string) => rows.trim() ? `
    <p style="margin:20px 0 6px;font-size:11px;font-weight:700;color:${BRAND};text-transform:uppercase;letter-spacing:0.08em;">${title}</p>
    <table cellpadding="0" cellspacing="0" style="width:100%;border-top:1px solid #E1F5EE;">
      ${rows}
    </table>` : "";

  const name = [data.anrede, data.vorname, data.nachname].filter(Boolean).join(" ") || null;
  const hausnotrufLabel = data.hausnotruf === true ? "Ja" : data.hausnotruf === false ? "Nein" : null;
  const fuerWenLabel = data.fuer_wen === "ich" ? "Mich selbst" : data.fuer_wen === "angehoerige" ? "Angehörige/n" : data.fuer_wen ?? null;
  const bereitsLabel = data.bereits_vorhanden === "ja" ? "Ja" : data.bereits_vorhanden === "nein" ? "Nein" : data.bereits_vorhanden ?? null;
  const lieferInfo = data.lieferadresse && data.lieferadresse !== data.adresse ? data.lieferadresse : data.lieferadresse ? "= Wohnanschrift" : null;
  const dbWarning = data.dbSaved === false ? `
    <div style="margin:0 0 20px;padding:10px 16px;background:#FEF3C7;border:1px solid #F59E0B;border-radius:8px;font-size:13px;color:#92400E;">
      ⚠️ <strong>Achtung:</strong> Dieser Lead wurde NICHT in der Datenbank gespeichert (DB-Fehler). Bitte manuell sichern!
    </div>` : "";

  const html = wrapEmail(`
    <h2 style="margin:0 0 4px;font-size:18px;color:#0F1F1A;">Neuer Lead eingegangen</h2>
    <p style="margin:0 0 16px;font-size:13px;color:#5C7A6F;">${data.source} · ${new Date(data.timestamp).toLocaleString("de-DE")}</p>
    ${dbWarning}
    ${section("Kontakt", `
      ${row("Name", name)}
      ${row("E-Mail", data.email)}
      ${row("Telefon", data.phone)}
      ${row("Geburtsdatum", data.geburtsdatum)}
    `)}
    ${section("Adresse", `
      ${row("Wohnanschrift", data.adresse)}
      ${row("Bundesland", data.bundesland)}
      ${row("Lieferadresse", lieferInfo)}
      ${!data.adresse ? row("PLZ", data.plz) : ""}
    `)}
    ${section("Pflegesituation", `
      ${row("Pflegegrad", data.pflegegrad)}
      ${row("Antrag für", fuerWenLabel)}
      ${row("Wer pflegt", data.wer_pflegt)}
      ${row("Gerät bereits vorhanden", bereitsLabel)}
      ${row("Hausnotruf gewünscht", hausnotrufLabel)}
    `)}
    ${section("Versicherung", `
      ${row("Krankenkasse", data.krankenkasse)}
      ${row("Versichertennr.", data.versichertennummer)}
    `)}
    ${section("Interesse / Produkte", `
      ${row("Auswahl", data.gruende || data.tags)}
    `)}
    <div style="margin-top:28px;">
      <a href="https://www.liva-pflege.de/admin" style="display:inline-block;background:${BRAND};color:#ffffff;text-decoration:none;padding:10px 24px;border-radius:100px;font-size:14px;font-weight:600;">Im Admin öffnen →</a>
    </div>
  `);

  const subject = [
    data.dbSaved === false ? "⚠️ DB-FEHLER –" : null,
    "Neuer Lead",
    name,
    data.tags ?? data.pflegegrad,
    `[${data.source}]`,
  ].filter(Boolean).join(" ");

  const textLines = [
    "=== NEUER LEAD ===",
    `Quelle:           ${data.source}`,
    `Zeitstempel:      ${new Date(data.timestamp).toLocaleString("de-DE")}`,
    data.dbSaved === false ? "!!! DB-FEHLER: Lead nicht gespeichert !!!" : "",
    "",
    "--- KONTAKT ---",
    name         ? `Name:             ${name}` : "",
    data.email   ? `E-Mail:           ${data.email}` : "",
    data.phone   ? `Telefon:          ${data.phone}` : "",
    data.geburtsdatum ? `Geburtsdatum:     ${data.geburtsdatum}` : "",
    "",
    "--- ADRESSE ---",
    data.adresse    ? `Wohnanschrift:    ${data.adresse}` : data.plz ? `PLZ:              ${data.plz}` : "",
    data.bundesland ? `Bundesland:       ${data.bundesland}` : "",
    lieferInfo      ? `Lieferadresse:    ${lieferInfo}` : "",
    "",
    "--- PFLEGESITUATION ---",
    data.pflegegrad       ? `Pflegegrad:       ${data.pflegegrad}` : "",
    fuerWenLabel          ? `Antrag für:       ${fuerWenLabel}` : "",
    data.wer_pflegt       ? `Wer pflegt:       ${data.wer_pflegt}` : "",
    bereitsLabel          ? `Gerät vorhanden:  ${bereitsLabel}` : "",
    hausnotrufLabel       ? `Hausnotruf:       ${hausnotrufLabel}` : "",
    "",
    "--- VERSICHERUNG ---",
    data.krankenkasse      ? `Krankenkasse:     ${data.krankenkasse}` : "",
    data.versichertennummer ? `Versichertennr.:  ${data.versichertennummer}` : "",
    "",
    "--- INTERESSE / PRODUKTE ---",
    (data.gruende || data.tags) ? `Auswahl:          ${data.gruende || data.tags}` : "",
  ].filter(Boolean).join("\n");

  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"liva Leads" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    subject,
    html,
    text: textLines,
  });
}

export async function sendLeadConfirmation(data: {
  email: string;
  pflegegrad?: string;
  tags?: string;
  einrichtung?: {
    name: string;
    adresse: string;
    telefon?: string;
    website?: string;
    bewertung: number | null;
    anzahlBewertungen: number;
    leistungen: string[];
    reaktionszeit: string;
  };
}) {
  const { einrichtung, tags, pflegegrad } = data;

  // Pflegedienst-Vergleich: Einrichtungsdetails anzeigen
  if (einrichtung) {
    const einrichtungBlock = `
      <div style="margin:24px 0;background:#F6FAF8;border-radius:12px;padding:20px;border:1px solid #C8E6D8;">
        <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:${BRAND};text-transform:uppercase;letter-spacing:0.05em;">Deine angefragte Einrichtung</p>
        <h3 style="margin:0 0 8px;font-size:17px;color:#0F1F1A;font-family:Georgia,serif;">${einrichtung.name}</h3>
        ${einrichtung.bewertung ? `<p style="margin:0 0 8px;font-size:13px;color:#5C7A6F;">⭐ ${einrichtung.bewertung.toFixed(1)} / 5 (${einrichtung.anzahlBewertungen} Google-Bewertungen)</p>` : ""}
        <p style="margin:0 0 4px;font-size:13px;color:#0F1F1A;">📍 ${einrichtung.adresse}</p>
        ${einrichtung.telefon ? `<p style="margin:0 0 4px;font-size:13px;color:#0F1F1A;">📞 <a href="tel:${einrichtung.telefon}" style="color:${BRAND};text-decoration:none;">${einrichtung.telefon}</a></p>` : ""}
        ${einrichtung.website ? `<p style="margin:0 0 4px;font-size:13px;color:#0F1F1A;">🌐 <a href="${einrichtung.website}" style="color:${BRAND};text-decoration:none;">${einrichtung.website}</a></p>` : ""}
        ${einrichtung.leistungen.length ? `<p style="margin:8px 0 0;font-size:12px;color:#5C7A6F;">Leistungen: ${einrichtung.leistungen.join(" · ")}</p>` : ""}
        <p style="margin:8px 0 0;font-size:12px;color:#5C7A6F;">Antwortet meist innerhalb von ${einrichtung.reaktionszeit}</p>
      </div>`;

    const html = wrapEmail(`
      <h2 style="margin:0 0 16px;font-size:20px;color:#0F1F1A;font-family:Georgia,serif;">Dein Ergebnis von liva</h2>
      <p style="margin:0 0 16px;">
        Hier sind die Informationen zur Einrichtung, die du angefragt hast${pflegegrad ? ` (Pflegegrad ${pflegegrad})` : ""}:
      </p>
      ${einrichtungBlock}
      <p style="margin:16px 0 0;color:#5C7A6F;font-size:13px;">
        Falls du Fragen hast oder weitere Einrichtungen vergleichen möchtest, antworte einfach auf diese E-Mail oder besuche uns auf <a href="https://www.liva-pflege.de" style="color:${BRAND};">liva-pflege.de</a>.
      </p>
    `);

    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"liva" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Dein Ergebnis: ${einrichtung.name}`,
      html,
      text: `Dein Ergebnis von liva\n\n${einrichtung.name}\n${einrichtung.adresse}\nliva-pflege.de`,
    });
    return;
  }

  // Alle anderen Funnels: generische Bestätigung mit Kontext aus Tags
  const tagList = tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

  const interestBlock = tagList.length ? `
    <div style="margin:20px 0;background:#F6FAF8;border-radius:12px;padding:16px 20px;border:1px solid #C8E6D8;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:${BRAND};text-transform:uppercase;letter-spacing:0.05em;">Das hast du angefragt</p>
      ${tagList.map((t) => `<p style="margin:0 0 4px;font-size:14px;color:#0F1F1A;">✓ ${t}</p>`).join("")}
      ${pflegegrad ? `<p style="margin:8px 0 0;font-size:12px;color:#5C7A6F;">Pflegegrad: ${pflegegrad}</p>` : ""}
    </div>` : "";

  const html = wrapEmail(`
    <h2 style="margin:0 0 12px;font-size:20px;color:#0F1F1A;font-family:Georgia,serif;">Danke, dass du liva nutzt.</h2>
    <p style="margin:0 0 16px;color:#374151;">
      Wir haben deine Anfrage erhalten und melden uns in Kürze bei dir.
    </p>
    ${interestBlock}
    <p style="margin:16px 0;color:#374151;">
      In der Zwischenzeit kannst du auf <a href="https://www.liva-pflege.de" style="color:${BRAND};text-decoration:none;">liva-pflege.de</a> weitere Leistungen entdecken, die dir zustehen.
    </p>
    <div style="margin-top:24px;">
      <a href="https://www.liva-pflege.de/leistungen" style="display:inline-block;background:${BRAND};color:#ffffff;text-decoration:none;padding:10px 24px;border-radius:100px;font-size:14px;font-weight:600;">Alle Leistungen ansehen →</a>
    </div>
    <p style="margin:24px 0 0;color:#5C7A6F;font-size:13px;">
      Fragen? Antworte einfach auf diese E-Mail.
    </p>
  `);

  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"liva" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: tagList.length ? `Deine Anfrage: ${tagList.join(", ")}` : "Deine Anfrage bei liva",
    html,
    text: [
      "Danke, dass du liva nutzt.",
      "",
      "Wir haben deine Anfrage erhalten und melden uns in Kürze.",
      tagList.length ? `\nDein Interesse: ${tagList.join(", ")}` : "",
      pflegegrad ? `Pflegegrad: ${pflegegrad}` : "",
      "",
      "liva-pflege.de",
    ].filter(Boolean).join("\n"),
  });
}
