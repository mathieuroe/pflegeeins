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
  vorname?: string;
  nachname?: string;
  pflegegrad?: string;
  path?: string;
  gruende?: string;
  krankenkasse?: string;
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
  const { einrichtung, tags, pflegegrad, vorname, nachname, path, gruende, krankenkasse } = data;
  const firstName = vorname || "";
  const greeting = firstName ? `Hallo ${firstName},` : "Hallo,";

  // ── Pflegedienst-Vergleich ────────────────────────────────────────────
  if (einrichtung) {
    const html = wrapEmail(`
      <!-- Hero -->
      <div style="text-align:center;padding:8px 0 28px;">
        <div style="width:56px;height:56px;background:${BRAND_LIGHT};border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
          <span style="font-size:24px;line-height:1;">✓</span>
        </div>
        <h1 style="margin:0 0 6px;font-size:26px;color:#0F1F1A;font-family:Georgia,serif;">Dein Ergebnis ist da.</h1>
        <p style="margin:0;font-size:15px;font-weight:600;color:${BRAND};">Vielen Dank für dein Vertrauen.</p>
      </div>

      <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.7;">${greeting}<br><br>
        Wir haben die passende Einrichtung für dich gefunden${pflegegrad ? ` (Pflegegrad ${pflegegrad})` : ""}. Hier sind alle Informationen auf einen Blick:
      </p>

      <!-- Einrichtungs-Card -->
      <div style="background:#F6FAF8;border-radius:12px;padding:20px;border:1px solid #C8E6D8;margin-bottom:24px;">
        <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:${BRAND};text-transform:uppercase;letter-spacing:0.08em;">Deine angefragte Einrichtung</p>
        <h3 style="margin:0 0 8px;font-size:18px;color:#0F1F1A;font-family:Georgia,serif;line-height:1.4;">${einrichtung.name}</h3>
        ${einrichtung.bewertung ? `<p style="margin:0 0 10px;font-size:13px;color:#5C7A6F;">${einrichtung.bewertung.toFixed(1)} / 5 &nbsp;(${einrichtung.anzahlBewertungen} Google-Bewertungen)</p>` : ""}
        <div style="border-top:1px solid #C8E6D8;padding-top:12px;margin-top:4px;">
          <p style="margin:0 0 6px;font-size:13px;color:#0F1F1A;">${einrichtung.adresse}</p>
          ${einrichtung.telefon ? `<p style="margin:0 0 6px;font-size:13px;"><a href="tel:${einrichtung.telefon}" style="color:${BRAND};text-decoration:none;font-weight:500;">${einrichtung.telefon}</a></p>` : ""}
          ${einrichtung.website ? `<p style="margin:0 0 6px;font-size:13px;word-break:break-all;"><a href="${einrichtung.website}" style="color:${BRAND};text-decoration:none;">${einrichtung.website}</a></p>` : ""}
          ${einrichtung.leistungen.length ? `<p style="margin:8px 0 0;font-size:12px;color:#5C7A6F;">Leistungen: ${einrichtung.leistungen.join(" · ")}</p>` : ""}
          ${einrichtung.reaktionszeit ? `<p style="margin:6px 0 0;font-size:12px;color:#5C7A6F;">Antwortet meist innerhalb von ${einrichtung.reaktionszeit}</p>` : ""}
        </div>
      </div>

      <p style="margin:0 0 24px;color:#374151;font-size:14px;line-height:1.7;">
        Wir melden uns <strong>innerhalb von 24 Stunden</strong> bei dir, um alle weiteren Schritte gemeinsam zu klären. Du musst nichts weiter tun.
      </p>

      <!-- CTAs -->
      <div style="text-align:center;margin-bottom:12px;">
        <a href="https://www.liva-pflege.de/" style="display:inline-block;background:${BRAND};color:#ffffff;text-decoration:none;padding:13px 28px;border-radius:100px;font-size:15px;font-weight:600;">Leistungs-Check starten →</a>
      </div>
      <div style="text-align:center;margin-bottom:28px;">
        <a href="https://www.liva-pflege.de/news" style="display:inline-block;background:#ffffff;color:${BRAND};text-decoration:none;padding:12px 28px;border-radius:100px;font-size:14px;font-weight:600;border:2px solid ${BRAND};">Zum Newsroom</a>
      </div>

      <p style="margin:0;color:#5C7A6F;font-size:13px;line-height:1.6;">Fragen? Antworte einfach auf diese E-Mail.</p>
    `);
    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"liva" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Dein Ergebnis: ${einrichtung.name}`,
      html,
      text: `${greeting}\n\n${einrichtung.name}\n${einrichtung.adresse}${einrichtung.telefon ? `\n${einrichtung.telefon}` : ""}\n\nliva-pflege.de`,
    });
    return;
  }

  const isHausnotruf = path?.includes("hausnotruf");
  const isPflegebox = path?.includes("pflegebox");

  // ── Hausnotruf ────────────────────────────────────────────────────────
  if (isHausnotruf) {
    const steps = [
      "Wir rufen dich an und prüfen deine Angaben",
      "Wir beantragen die Kostenübernahme bei deiner Pflegekasse",
      "Der Antrag wird in der Regel innerhalb von 3–10 Tagen genehmigt",
      "Du erhältst innerhalb von 3–5 Tagen nach Genehmigung dein Hausnotruf-Gerät per Post nachhause. Einfach einstecken – fertig. Kein Techniker, kein WLAN, kein Telefon nötig.",
      "Fragen? Ruf uns einfach an oder schreibe uns eine E-Mail",
    ];

    const html = wrapEmail(`
      <!-- Hero -->
      <div style="text-align:center;padding:8px 0 28px;">
        <div style="width:56px;height:56px;background:${BRAND_LIGHT};border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
          <span style="font-size:24px;line-height:1;">✓</span>
        </div>
        <h1 style="margin:0 0 6px;font-size:26px;color:#0F1F1A;font-family:Georgia,serif;">Antrag eingegangen!</h1>
        <p style="margin:0;font-size:15px;font-weight:600;color:${BRAND};">Vielen Dank für dein Vertrauen.</p>
      </div>

      <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.7;">${greeting}<br><br>
        Wir melden uns <strong>innerhalb von 24 Stunden</strong> bei dir, klären alle Details und stellen den Antrag für dich bei deiner Pflegekasse.
      </p>

      <!-- Produktbild -->
      <div style="border-radius:14px;overflow:hidden;margin-bottom:24px;">
        <img src="https://www.easierlife.de/wp-content/uploads/2026/04/1080_1080_home_blau_1.jpg"
          alt="easierLife HOME – Hausnotruf-Gerät" width="496" style="width:100%;max-width:496px;display:block;border:0;" />
      </div>

      ${krankenkasse ? `
      <!-- Bestätigung -->
      <div style="background:#F6FAF8;border-radius:12px;padding:16px 20px;border:1px solid #C8E6D8;margin-bottom:24px;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:${BRAND};text-transform:uppercase;letter-spacing:0.08em;">Dein Antrag</p>
        <p style="margin:4px 0;font-size:14px;color:#0F1F1A;">Hausnotruf – kostenloses Komplettpaket</p>
        ${pflegegrad ? `<p style="margin:4px 0;font-size:13px;color:#5C7A6F;">Pflegegrad: ${pflegegrad}</p>` : ""}
        <p style="margin:4px 0;font-size:13px;color:#5C7A6F;">Versicherung: ${krankenkasse}</p>
      </div>` : ""}

      <!-- Was jetzt passiert -->
      <div style="background:#F6FAF8;border-radius:12px;padding:20px;border:1px solid #C8E6D8;margin-bottom:28px;">
        <p style="margin:0 0 16px;font-size:11px;font-weight:700;color:${BRAND};text-transform:uppercase;letter-spacing:0.08em;">Was jetzt passiert</p>
        ${steps.map((s, i) => `
        <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:${i < steps.length - 1 ? "12px" : "0"};">
          <div style="min-width:22px;height:22px;background:${BRAND};border-radius:50%;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">
            <span style="font-size:11px;font-weight:700;color:#fff;">${i + 1}</span>
          </div>
          <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">${s}</p>
        </div>`).join("")}
      </div>

      <!-- CTA -->
      <div style="text-align:center;margin-bottom:24px;">
        <a href="https://www.liva-pflege.de/" style="display:inline-block;background:${BRAND};color:#ffffff;text-decoration:none;padding:13px 28px;border-radius:100px;font-size:15px;font-weight:600;">Weitere Leistungen entdecken →</a>
      </div>

      <p style="margin:0;color:#5C7A6F;font-size:13px;line-height:1.6;">Fragen? Antworte einfach auf diese E-Mail.</p>
    `);

    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"liva" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: "Dein Hausnotruf-Antrag ist eingegangen ✓",
      html,
      text: [
        `${greeting}`,
        "",
        "Dein Hausnotruf-Antrag ist eingegangen!",
        "Wir melden uns innerhalb von 24 Stunden bei dir.",
        "",
        "Was jetzt passiert:",
        ...steps.map((s, i) => `${i + 1}. ${s}`),
        "",
        "liva-pflege.de",
      ].join("\n"),
    });
    return;
  }

  // ── Pflegebox ─────────────────────────────────────────────────────────
  if (isPflegebox) {
    const produktListe = gruende ? gruende.split(",").map((p) => p.trim()).filter(Boolean) : [];
    const steps = [
      "Wir rufen dich an und prüfen deine Angaben",
      "Wir beantragen die Kostenübernahme bei deiner Pflegekasse",
      "Der Antrag wird in der Regel innerhalb von 3–14 Tagen genehmigt",
      "Du erhältst innerhalb von 3–5 Tagen nach Genehmigung deine Pflegehilfsmittel nachhause geliefert – jeden Monat.",
      "Fragen? Ruf uns einfach an oder schreibe uns eine E-Mail",
    ];

    const html = wrapEmail(`
      <!-- Hero -->
      <div style="text-align:center;padding:8px 0 28px;">
        <div style="width:56px;height:56px;background:${BRAND_LIGHT};border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
          <span style="font-size:24px;line-height:1;">✓</span>
        </div>
        <h1 style="margin:0 0 6px;font-size:26px;color:#0F1F1A;font-family:Georgia,serif;">Antrag eingegangen!</h1>
        <p style="margin:0;font-size:15px;font-weight:600;color:${BRAND};">Vielen Dank für dein Vertrauen.</p>
      </div>

      <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.7;">${greeting}<br><br>
        Wir melden uns <strong>innerhalb von 24 Stunden</strong> bei dir, klären alle Details und stellen den Antrag für dich bei deiner Pflegekasse.
      </p>

      ${produktListe.length ? `
      <!-- Ausgewählte Produkte -->
      <div style="background:#F6FAF8;border-radius:12px;padding:20px;border:1px solid #C8E6D8;margin-bottom:24px;">
        <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:${BRAND};text-transform:uppercase;letter-spacing:0.08em;">Deine ausgewählten Pflegeprodukte</p>
        ${produktListe.map((p) => `
        <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:8px;">
          <span style="color:${BRAND};font-weight:700;font-size:14px;flex-shrink:0;">✓</span>
          <p style="margin:0;font-size:14px;color:#0F1F1A;line-height:1.5;">${p}</p>
        </div>`).join("")}
        ${pflegegrad ? `<p style="margin:12px 0 0;font-size:12px;color:#5C7A6F;border-top:1px solid #C8E6D8;padding-top:10px;">Pflegegrad: ${pflegegrad}${krankenkasse ? ` · Versicherung: ${krankenkasse}` : ""}</p>` : ""}
      </div>` : ""}

      <!-- Was jetzt passiert -->
      <div style="background:#F6FAF8;border-radius:12px;padding:20px;border:1px solid #C8E6D8;margin-bottom:28px;">
        <p style="margin:0 0 16px;font-size:11px;font-weight:700;color:${BRAND};text-transform:uppercase;letter-spacing:0.08em;">Was jetzt passiert</p>
        ${steps.map((s, i) => `
        <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:${i < steps.length - 1 ? "12px" : "0"};">
          <div style="min-width:22px;height:22px;background:${BRAND};border-radius:50%;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">
            <span style="font-size:11px;font-weight:700;color:#fff;">${i + 1}</span>
          </div>
          <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">${s}</p>
        </div>`).join("")}
      </div>

      <!-- CTA -->
      <div style="text-align:center;margin-bottom:24px;">
        <a href="https://www.liva-pflege.de/" style="display:inline-block;background:${BRAND};color:#ffffff;text-decoration:none;padding:13px 28px;border-radius:100px;font-size:15px;font-weight:600;">Weitere Leistungen entdecken →</a>
      </div>

      <p style="margin:0;color:#5C7A6F;font-size:13px;line-height:1.6;">Fragen? Antworte einfach auf diese E-Mail.</p>
    `);

    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"liva" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: "Deine Pflegebox ist beantragt ✓",
      html,
      text: [
        `${greeting}`,
        "",
        "Deine Pflegebox ist beantragt!",
        "Wir melden uns innerhalb von 24 Stunden bei dir.",
        produktListe.length ? `\nDeine Produkte:\n${produktListe.map((p) => `- ${p}`).join("\n")}` : "",
        "",
        "Was jetzt passiert:",
        ...steps.map((s, i) => `${i + 1}. ${s}`),
        "",
        "liva-pflege.de",
      ].filter(Boolean).join("\n"),
    });
    return;
  }

  // ── Fallback: alle anderen Funnels ────────────────────────────────────
  const tagList = tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const html = wrapEmail(`
    <!-- Hero -->
    <div style="text-align:center;padding:8px 0 28px;">
      <div style="width:56px;height:56px;background:${BRAND_LIGHT};border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
        <span style="font-size:24px;line-height:1;">✓</span>
      </div>
      <h1 style="margin:0 0 6px;font-size:26px;color:#0F1F1A;font-family:Georgia,serif;">Danke, dass du liva nutzt.</h1>
      <p style="margin:0;font-size:15px;font-weight:600;color:${BRAND};">Vielen Dank für dein Vertrauen.</p>
    </div>

    <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.7;">${greeting}<br><br>
      Schön, dass du da bist. Wir haben deine Anfrage erhalten und melden uns <strong>innerhalb von 24 Stunden</strong> bei dir – zu genau dem Thema, das dich beschäftigt.
    </p>

    ${tagList.length ? `
    <!-- Anfrage-Übersicht -->
    <div style="background:#F6FAF8;border-radius:12px;padding:20px;border:1px solid #C8E6D8;margin-bottom:24px;">
      <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:${BRAND};text-transform:uppercase;letter-spacing:0.08em;">Deine Anfrage</p>
      ${tagList.map((t) => `
      <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:8px;">
        <span style="color:${BRAND};font-weight:700;font-size:14px;flex-shrink:0;">✓</span>
        <p style="margin:0;font-size:14px;color:#0F1F1A;line-height:1.5;">${t}</p>
      </div>`).join("")}
      ${pflegegrad ? `<p style="margin:12px 0 0;font-size:12px;color:#5C7A6F;border-top:1px solid #C8E6D8;padding-top:10px;">Pflegegrad: ${pflegegrad}</p>` : ""}
    </div>` : ""}

    <!-- Trennlinie -->
    <p style="margin:0 0 24px;color:#374151;font-size:14px;line-height:1.7;">
      Während du wartest: Auf <a href="https://www.liva-pflege.de/" style="color:${BRAND};text-decoration:none;font-weight:600;">liva-pflege.de</a> findest du alle Leistungen, die dir als Pflegebedürftiger oder pflegende Person zustehen – kostenlos und ohne Bürokratie.
    </p>

    <!-- CTAs -->
    <div style="text-align:center;margin-bottom:12px;">
      <a href="https://www.liva-pflege.de/" style="display:inline-block;background:${BRAND};color:#ffffff;text-decoration:none;padding:13px 28px;border-radius:100px;font-size:15px;font-weight:600;">Leistungs-Check starten →</a>
    </div>
    <div style="text-align:center;margin-bottom:28px;">
      <a href="https://www.liva-pflege.de/news" style="display:inline-block;background:#ffffff;color:${BRAND};text-decoration:none;padding:12px 28px;border-radius:100px;font-size:14px;font-weight:600;border:2px solid ${BRAND};">Zum Newsroom</a>
    </div>

    <p style="margin:0;color:#5C7A6F;font-size:13px;line-height:1.6;">Fragen? Antworte einfach auf diese E-Mail.</p>
  `);

  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"liva" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: "Deine Anfrage bei liva ist eingegangen ✓",
    html,
    text: [
      `${greeting}`,
      "",
      "Danke, dass du liva nutzt.",
      "Wir melden uns innerhalb von 24 Stunden bei dir.",
      tagList.length ? `\nDeine Anfrage:\n${tagList.map((t) => `- ${t}`).join("\n")}` : "",
      pflegegrad ? `Pflegegrad: ${pflegegrad}` : "",
      "",
      "liva-pflege.de",
    ].filter(Boolean).join("\n"),
  });
}
