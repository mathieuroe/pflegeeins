/**
 * Generiert wöchentlich einen News-Artikel für /news auf liva-pflege.de.
 *
 * Quellen: Offizielle Behörden, große Tageszeitungen, Fachzeitschriften.
 * Schreibt direkt in src/lib/content-data.ts → NEWS-Array mit typ: "news".
 * Wird via GitHub Actions jeden Samstag um 07:00 UTC ausgeführt.
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import Groq from "groq-sdk";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const SOURCES = [
  // Behörden & offizielle Stellen
  { name: "Bundesgesundheitsministerium (BMG)", url: "https://www.bundesgesundheitsministerium.de/presse/aktuelles.html" },
  { name: "GKV-Spitzenverband", url: "https://www.gkv-spitzenverband.de/gkv_spitzenverband/presse/pressemitteilungen_und_statements/pressemitteilungen_und_statements.jsp" },
  { name: "vdek – Verband der Ersatzkassen", url: "https://www.vdek.com/presse/pressemitteilungen.html" },
  { name: "Medizinischer Dienst Bund", url: "https://www.medizinischerdienst.de/presse/pressemitteilungen/" },
  // Große Tageszeitungen
  { name: "Süddeutsche Zeitung – Gesundheit", url: "https://www.sueddeutsche.de/thema/pflege" },
  { name: "Zeit Online – Gesundheit", url: "https://www.zeit.de/thema/pflege" },
  { name: "Spiegel – Gesundheit", url: "https://www.spiegel.de/thema/pflege/" },
  // Fachzeitschriften & Portale
  { name: "Pflegezeitschrift (Kohlhammer)", url: "https://www.pflegezeitschrift.de/aktuell/" },
  { name: "Soziale Sicherheit – WSI", url: "https://www.boeckler.de/de/soziale-sicherheit.htm" },
];

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; liva-pflege-news-bot/2.0; +https://liva-pflege.de)",
      Accept: "text/html,application/xhtml+xml",
    },
    signal: AbortSignal.timeout(12_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function extractText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim()
    .slice(0, 3500);
}

async function fetchSource(source) {
  try {
    const html = await fetchPage(source.url);
    return `=== ${source.name} ===\n${extractText(html)}`;
  } catch (err) {
    console.warn(`⚠ Nicht erreichbar: ${source.name} – ${err.message}`);
    return null;
  }
}

function germanMonthYear(date) {
  return date.toLocaleDateString("de-DE", { month: "long", year: "numeric" });
}

function toSlug(titel) {
  return titel
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    .slice(0, 60);
}

async function main() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY fehlt");

  const client = new Groq({ apiKey });

  // 1. News von Quellen laden
  console.log("📰 Lade aktuelle Pflegenews...");
  const results = await Promise.allSettled(SOURCES.map(fetchSource));
  const newsContent = results
    .filter((r) => r.status === "fulfilled" && r.value)
    .map((r) => r.value);

  if (newsContent.length === 0) throw new Error("Keine Quelle erreichbar – Abbruch");
  console.log(`✓ ${newsContent.length}/${SOURCES.length} Quellen geladen`);

  // 2. content-data.ts lesen – vorhandene Slugs ermitteln
  const filePath = join(ROOT, "src/lib/content-data.ts");
  const currentFile = readFileSync(filePath, "utf-8");

  const existingSlugs = (currentFile.match(/slug: "([^"]+)"/g) || [])
    .map((m) => m.replace(/slug: "|"/g, ""));

  // 3. Artikel generieren
  console.log("✍  Generiere News-Artikel...");

  const prompt = `Du bist Redakteur bei liva-pflege.de, einem deutschen Pflegeinformationsportal für pflegende Angehörige (40–65 Jahre).

Hier sind aktuelle Meldungen von offiziellen Quellen und großen deutschen Medien:

${newsContent.join("\n\n")}

Bereits veröffentlichte Slugs – diese Themen NICHT wiederholen:
${existingSlugs.join(", ")}

Aufgabe:
Wähle eine AKTUELLE, RELEVANTE Neuigkeit aus den obigen Quellen, die direkt für pflegende Angehörige oder Pflegebedürftige wichtig ist.

ERLAUBTE Themen: Pflegeleistungen, Pflegeversicherung, Pflegegeld, Pflegegrad, Pflegereform, Pflegekasse, Hausnotruf, Verhinderungspflege, Kurzzeitpflege, Tagespflege, ambulante Pflege, Pflegeheim-Kosten, Entlastungsbetrag, pflegende Angehörige, Pflegepolitik.

VERBOTENE Themen: Kinderpflege, Kindergesundheit, Krankenhausreform ohne Pflegebezug, allgemeine Innenpolitik, Wirtschaftspolitik ohne Pflegebezug.

Falls keine passende Neuigkeit vorhanden ist: Schreibe über eine aktuelle Entwicklung im deutschen Pflegesystem die noch nicht behandelt wurde.

Schreibe einen sachlichen, faktenbasierten News-Artikel – kein Ratgeber, sondern eine Nachricht.

Regeln:
- Nur Fakten aus den obigen offiziellen Quellen
- Duzen (Du, Dein, Dir)
- Neutraler, journalistischer Ton – keine Werbung
- Markdown: ## für Abschnitte, **fett** für Schlüsselbegriffe
- Länge: 300–500 Wörter
- Ggf. Quellenhinweis am Ende (z.B. "Quelle: BMG, Juli 2026")

Kategorie muss EXAKT eine dieser sein: Politik | Leistungen | MD-Besuch | Widerspruch | Finanzen | Pflegegrad | Hausnotruf | Pflegeleistungen | Ambulante Pflege

Antworte NUR mit einem JSON-Objekt (kein weiterer Text, kein Markdown drumherum):
{
  "titel": "Präziser Nachrichtentitel",
  "beschreibung": "1–2 Sätze Teaser, max 160 Zeichen",
  "kategorie": "Exakt eine der erlaubten Kategorien",
  "lesezeit": "X Min.",
  "inhalt": "Vollständiger Markdown-Inhalt des Artikels"
}`;

  const message = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 2500,
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  const responseText = message.choices[0].message.content.trim();
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error(`Kein JSON in Antwort: ${responseText.slice(0, 200)}`);

  const article = JSON.parse(jsonMatch[0]);

  // Slug generieren
  let slug = toSlug(article.titel);
  if (existingSlugs.includes(slug)) slug = `${slug}-${new Date().getFullYear()}`;
  article.slug = slug;
  article.datum = germanMonthYear(new Date());

  console.log(`✓ Artikel: "${article.titel}" (slug: ${slug})`);
  console.log(`  Kategorie: ${article.kategorie} | Datum: ${article.datum}`);

  // 4. In content-data.ts → NEWS-Array einfügen (oben, neuester zuerst)
  const escapedInhalt = article.inhalt
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");

  const escapedTitel = article.titel.replace(/"/g, '\\"');
  const escapedBeschreibung = article.beschreibung.replace(/"/g, '\\"');

  const newEntry = `  {
    slug: "${slug}",
    titel: "${escapedTitel}",
    beschreibung: "${escapedBeschreibung}",
    kategorie: "${article.kategorie}",
    lesezeit: "${article.lesezeit}",
    datum: "${article.datum}",
    typ: "news",
    inhalt: \`${escapedInhalt}\`,
  },`;

  const marker = "export const NEWS: ContentItem[] = [\n";
  if (!currentFile.includes(marker)) throw new Error("NEWS-Marker nicht gefunden in content-data.ts");

  const updatedFile = currentFile.replace(marker, `${marker}${newEntry}\n`);
  writeFileSync(filePath, updatedFile, "utf-8");

  console.log(`✅ News-Artikel erfolgreich in content-data.ts eingefügt`);
}

main().catch((err) => {
  console.error("❌ Fehler:", err.message);
  process.exit(1);
});
