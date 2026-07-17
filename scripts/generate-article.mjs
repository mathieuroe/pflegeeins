/**
 * Generiert automatisch einen neuen Ratgeber-Artikel basierend auf aktuellen
 * Pflegenews von offiziellen deutschen Quellen.
 *
 * Quellen: BMG, GKV-Spitzenverband, vdek
 * Wird via GitHub Actions wöchentlich ausgeführt.
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import Anthropic from "@anthropic-ai/sdk";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const SOURCES = [
  {
    name: "Bundesgesundheitsministerium (BMG)",
    url: "https://www.bundesgesundheitsministerium.de/presse/aktuelles.html",
  },
  {
    name: "GKV-Spitzenverband",
    url: "https://www.gkv-spitzenverband.de/gkv_spitzenverband/presse/pressemitteilungen_und_statements/pressemitteilungen_und_statements.jsp",
  },
  {
    name: "vdek – Verband der Ersatzkassen",
    url: "https://www.vdek.com/presse/pressemitteilungen.html",
  },
];

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; liva-pflege-ratgeber-bot/1.0)",
      Accept: "text/html",
    },
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function extractText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

async function fetchSourceNews(source) {
  try {
    const html = await fetchPage(source.url);
    const text = extractText(html);
    // Relevante Seite: nimm bis zu 4000 Zeichen aus dem Hauptbereich
    return `=== ${source.name} ===\nURL: ${source.url}\n\n${text.slice(0, 4000)}`;
  } catch (err) {
    console.warn(`⚠ Quelle nicht erreichbar: ${source.name} – ${err.message}`);
    return null;
  }
}

function germanMonthYear(date) {
  return date.toLocaleDateString("de-DE", { month: "long", year: "numeric" });
}

function toSlug(titel) {
  return titel
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY fehlt");

  const client = new Anthropic({ apiKey });

  // 1. News von allen Quellen holen
  console.log("📰 Lade aktuelle Pflegenews...");
  const results = await Promise.all(SOURCES.map(fetchSourceNews));
  const newsContent = results.filter(Boolean);

  if (newsContent.length === 0) {
    throw new Error("Keine Quelle erreichbar – Abbruch");
  }

  console.log(`✓ ${newsContent.length}/${SOURCES.length} Quellen geladen`);

  // 2. Bestehende Artikel lesen, um Duplikate zu vermeiden
  const filePath = join(ROOT, "src/lib/ratgeber-data.ts");
  const currentFile = readFileSync(filePath, "utf-8");

  const existingSlugsMatch = currentFile.match(/slug: "([^"]+)"/g) || [];
  const existingSlugs = existingSlugsMatch.map((m) => m.replace(/slug: "|"/g, ""));

  // 3. Claude API: Artikel generieren
  console.log("✍  Generiere Artikel mit Claude...");

  const prompt = `Du bist Redakteur bei liva-pflege.de, einem deutschen Pflegeportal für pflegende Angehörige (40–65 Jahre, bürokratieskeptisch, zeitknapp).

Hier sind aktuelle News von offiziellen deutschen Pflegequellen:

${newsContent.join("\n\n")}

Bereits vorhandene Artikel-Slugs (diese Themen NICHT wiederholen):
${existingSlugs.join(", ")}

Aufgabe:
Wähle ein AKTUELLES, konkretes Thema aus den News oben – das für pflegende Angehörige praktisch relevant ist.
Schreibe einen hilfreichen, sachlichen Ratgeber-Artikel.

Regeln:
- Nur Fakten aus den oben genannten offiziellen Quellen
- Duzen-Form (Du, Dein, Dir)
- Kein Marketing-Ton, kein Werbesprech
- Markdown: ## für Abschnitte, ### für Unterabschnitte, **fett** für Schlüsselbegriffe
- Länge: 350–550 Wörter
- Praktisch und verständlich – keine Fachbürokratie

Antworte NUR mit einem JSON-Objekt (kein weiterer Text):
{
  "titel": "Aussagekräftiger Artikeltitel",
  "beschreibung": "1–2 Sätze Vorschau, max 160 Zeichen",
  "kategorie": "Eine von: Erste Schritte | Pflegebox | Finanzen | Sicherheit | Pflegegrad | Entlastung | Pflegerecht | Aktuelles",
  "lesezeit": "X Min. Lesezeit",
  "inhalt": "Vollständiger Markdown-Inhalt"
}`;

  const message = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 2500,
    messages: [{ role: "user", content: prompt }],
  });

  const responseText = message.content[0].text.trim();
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error(`Kein JSON in Antwort: ${responseText.slice(0, 200)}`);

  const article = JSON.parse(jsonMatch[0]);

  // Slug generieren und auf Duplikate prüfen
  let slug = toSlug(article.titel);
  if (existingSlugs.includes(slug)) {
    slug = `${slug}-${new Date().getFullYear()}`;
  }
  article.slug = slug;
  article.datum = germanMonthYear(new Date());

  console.log(`✓ Artikel: "${article.titel}" (/${article.slug})`);

  // 4. In ratgeber-data.ts einfügen (vorne – neuester zuerst)
  const escapedInhalt = article.inhalt
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");

  const escapedTitel = article.titel.replace(/"/g, '\\"');
  const escapedBeschreibung = article.beschreibung.replace(/"/g, '\\"');

  const newEntry = `  {
    slug: "${article.slug}",
    titel: "${escapedTitel}",
    beschreibung: "${escapedBeschreibung}",
    kategorie: "${article.kategorie}",
    lesezeit: "${article.lesezeit}",
    datum: "${article.datum}",
    inhalt: \`${escapedInhalt}\`,
  },`;

  const marker = "export const ARTICLES: Article[] = [\n";
  if (!currentFile.includes(marker)) {
    throw new Error("Marker nicht gefunden in ratgeber-data.ts");
  }

  const updatedFile = currentFile.replace(marker, `${marker}${newEntry}\n`);
  writeFileSync(filePath, updatedFile, "utf-8");

  console.log(`✅ Artikel erfolgreich hinzugefügt: ${filePath}`);
  console.log(`   Kategorie: ${article.kategorie}`);
  console.log(`   Datum: ${article.datum}`);
}

main().catch((err) => {
  console.error("❌ Fehler:", err.message);
  process.exit(1);
});
