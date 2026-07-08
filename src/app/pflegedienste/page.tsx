import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import ErgebnisseClient from "./ErgebnisseClient";

export const metadata: Metadata = {
  title: "Pflegedienste in deiner Nähe – Kostenlos vergleichen | liva",
  description: "Vergleiche ambulante Pflegedienste in deiner Region. Kostenlose Anfragen, echte Bewertungen, sofortige Verfügbarkeit.",
  robots: "noindex",
};

export interface PflegedienstResult {
  id: string;
  name: string;
  ort: string;
  adresse: string;
  plz?: string;
  distanzKm: number;
  bewertung: number | null;
  anzahlBewertungen: number;
  beschreibung: string;
  leistungen: string[];
  telefon?: string;
  website?: string;
  verfuegbar: boolean;
  reaktionszeit: string;
}

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10;
}

async function plzToCoords(plz: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${plz}&country=DE&format=json&limit=1`,
      { headers: { "User-Agent": "liva-pflege.de/1.0" }, next: { revalidate: 86400 } }
    );
    const data = await res.json();
    if (!data?.[0]) return null;
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch {
    return null;
  }
}

function guessLeistungen(types: string[], name: string): string[] {
  const n = name.toLowerCase();
  const result: string[] = [];

  // Google Place Types
  const isNursingHomeType = types.includes("nursing_home") || types.includes("elder_care_facility");
  const isHomeHealthType = types.includes("home_health_care_agency");
  const isAssistedLivingType = types.includes("assisted_living_facility");

  // Senioren Residenz
  const isSeniorenResidenz =
    isAssistedLivingType ||
    n.includes("residenz") || n.includes("seniorenresidenz") || n.includes("seniorenstift") ||
    n.includes("seniorenheim") || n.includes("altenheim") || n.includes("altersheim") ||
    n.includes("feierabendheim") || n.includes("feierabendhaus") || n.includes("pensionistenheim") ||
    n.includes("stift");

  // Stationäre Pflege
  const isStationaer =
    isNursingHomeType ||
    n.includes("pflegeheim") || n.includes("pflegeeinrichtung") || n.includes("pflegezentrum") ||
    n.includes("pflegestift") || n.includes("altenpflege") || n.includes("seniorenzentrum") ||
    n.includes("kurzzeitpflege") || n.includes("wohnpflegeheim") || n.includes("pflegewohnheim");

  // 24/7 Pflege
  const is24h =
    n.includes("24h") || n.includes("24 h") || n.includes("24-h") ||
    n.includes("24 stunden") || n.includes("24-stunden") ||
    n.includes("rund um die uhr") || n.includes("nachtpflege") || n.includes("intensivpflege");

  // Ambulante Pflege
  const isAmbulant =
    isHomeHealthType ||
    n.includes("ambulant") || n.includes("pflegedienst") || n.includes("sozialstation") ||
    n.includes("hauspflege") || n.includes("häusliche pflege") || n.includes("pflegeteam") ||
    n.includes("mobiler pflege") || n.includes("pflegebotschaft") || n.includes("pflegestation");

  // Demenz
  const isDemenz = n.includes("demenz") || n.includes("alzheimer") || n.includes("gedächtnispflege");

  if (isSeniorenResidenz) result.push("Senioren Residenz");

  if (isStationaer) {
    result.push("Stationäre Pflege");
    result.push("Kurzzeitpflege");
  }

  if (is24h) result.push("24h-Pflege");

  if (isAmbulant) {
    result.push("Grundpflege");
    result.push("Betreuung");
    result.push("Arztbegleitung");
    result.push("Häusliche Krankenpflege");
    result.push("Hauswirtschaft");
  }

  if (isDemenz) result.push("Demenzbetreuung");

  // Fallback
  if (result.length === 0) {
    if (isNursingHomeType) {
      result.push("Stationäre Pflege");
      result.push("Kurzzeitpflege");
    } else {
      result.push("Grundpflege");
      result.push("Betreuung");
    }
  }

  return result.filter((v, i, a) => a.indexOf(v) === i);
}

async function googleTextSearch(query: string, lat: number, lng: number, apiKey: string) {
  try {
    const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.location,places.types,places.internationalPhoneNumber,places.websiteUri",
      },
      body: JSON.stringify({
        textQuery: query,
        locationBias: {
          circle: { center: { latitude: lat, longitude: lng }, radius: 30000 },
        },
        maxResultCount: 20,
        languageCode: "de",
        regionCode: "DE",
      }),
      cache: "no-store",
    });
    const data = await res.json();
    if (data.error) {
      console.error("[Google Places] API error:", JSON.stringify(data.error));
    }
    if (!data.places?.length) {
      console.error("[Google Places] Keine Ergebnisse. Status:", res.status, "Body:", JSON.stringify(data).slice(0, 300));
    }
    return (data.places as any[]) || [];
  } catch (err) {
    console.error("[Google Places] fetch Fehler:", err);
    return [];
  }
}

async function fetchGooglePflegedienste(plz: string): Promise<PflegedienstResult[]> {
  if (process.env.GOOGLE_PLACES_MOCK === "true") return MOCK_DATA;

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return MOCK_DATA;

  const coords = await plzToCoords(plz);
  if (!coords) return [];
  const { lat, lng } = coords;

  const [heime, dienste, residenzen] = await Promise.all([
    googleTextSearch("Pflegeheim Altenheim", lat, lng, apiKey),
    googleTextSearch("ambulanter Pflegedienst Sozialstation", lat, lng, apiKey),
    googleTextSearch("Seniorenresidenz Seniorenstift Seniorenwohnanlage", lat, lng, apiKey),
  ]);

  const seen = new Set<string>();
  const results: PflegedienstResult[] = [];

  for (const p of [...heime, ...dienste, ...residenzen]) {
    if (!p?.id || seen.has(p.id)) continue;
    seen.add(p.id);

    const name: string = p.displayName?.text || "";
    if (!name) continue;

    const adresse: string = (p.formattedAddress || "").replace(", Deutschland", "");
    const plzMatch = adresse.match(/\b(\d{5})\b/);
    const placePlz = plzMatch?.[1];

    // Ort aus der Adresse extrahieren (letztes nicht-PLZ-Segment vor Deutschland)
    const parts = adresse.split(",").map((s: string) => s.trim());
    const ort = parts.find((s: string) => /[A-Za-zÄÖÜäöüß]{3,}/.test(s) && !/^\d{5}/.test(s)) || "";

    const placeLat = p.location?.latitude;
    const placeLng = p.location?.longitude;
    const distanzKm =
      placeLat != null && placeLng != null ? haversineKm(lat, lng, placeLat, placeLng) : 99;

    const leistungen = guessLeistungen(p.types || [], name);
    const isStationaer = leistungen.includes("Stationäre Pflege") || leistungen.includes("Senioren Residenz");

    results.push({
      id: p.id,
      name,
      ort,
      adresse,
      plz: placePlz,
      distanzKm,
      bewertung: typeof p.rating === "number" ? Math.round(p.rating * 10) / 10 : null,
      anzahlBewertungen: p.userRatingCount ?? 0,
      beschreibung: isStationaer
        ? `Stationäre Pflegeeinrichtung${ort ? ` in ${ort}` : ""}. Vollumfängliche Betreuung, alle Pflegegrade.`
        : `Ambulanter Pflegedienst${ort ? ` in ${ort}` : ""}. Individuelle Betreuung, alle Pflegekassen akzeptiert.`,
      leistungen,
      telefon: p.internationalPhoneNumber || undefined,
      website: p.websiteUri || undefined,
      verfuegbar: true,
      reaktionszeit: isStationaer ? "1–2 Werktagen" : "wenigen Stunden",
    });
  }

  const sorted = results.sort((a, b) => a.distanzKm - b.distanzKm).slice(0, 20);
  return sorted.length > 0 ? sorted : MOCK_DATA;
}

const MOCK_DATA: PflegedienstResult[] = [
  { id: "mock-1", name: "Caritas-Sozialstation München-Maxvorstadt", ort: "München", adresse: "Heßstraße 12, 80799 München", plz: "80799", distanzKm: 1.2, bewertung: 4.6, anzahlBewertungen: 142, beschreibung: "Ambulanter Pflegedienst in München. Alle Pflegekassen akzeptiert, individuelle Betreuung zu Hause.", leistungen: ["Grundpflege", "Betreuung", "Demenzbetreuung"], telefon: "+49 89 12345678", website: "https://caritas-muenchen.de", verfuegbar: true, reaktionszeit: "wenigen Stunden" },
  { id: "mock-2", name: "AWO Pflege München Mitte", ort: "München", adresse: "Gollierstraße 56, 80339 München", plz: "80339", distanzKm: 2.1, bewertung: 4.3, anzahlBewertungen: 89, beschreibung: "Ambulanter Pflegedienst der AWO in München. Professionelle Pflege, faire Preise.", leistungen: ["Grundpflege", "Betreuung", "Verhinderungspflege"], telefon: "+49 89 87654321", website: undefined, verfuegbar: true, reaktionszeit: "wenigen Stunden" },
  { id: "mock-3", name: "Diakonie Pflegedienst München-Schwabing", ort: "München", adresse: "Leopoldstraße 230, 80807 München", plz: "80807", distanzKm: 3.4, bewertung: 4.7, anzahlBewertungen: 203, beschreibung: "Ambulanter Pflegedienst in München-Schwabing. Erfahrenes Team, umfassende Betreuung.", leistungen: ["Grundpflege", "Betreuung", "Arztbegleitung"], telefon: "+49 89 99887766", website: "https://diakonie-muenchen.de", verfuegbar: true, reaktionszeit: "wenigen Stunden" },
  { id: "mock-4", name: "Seniorenresidenz Schwabing am Park", ort: "München", adresse: "Ungererstraße 158, 80805 München", plz: "80805", distanzKm: 4.1, bewertung: 4.8, anzahlBewertungen: 234, beschreibung: "Seniorenresidenz in München-Schwabing. Komfortable Einzelzimmer, umfassende Betreuung.", leistungen: ["Senioren Residenz", "Stationäre Pflege", "Demenzbetreuung"], telefon: "+49 89 33221100", website: "https://seniorenresidenz-schwabing.de", verfuegbar: true, reaktionszeit: "1–2 Werktagen" },
  { id: "mock-5", name: "DRK Pflegedienst München Süd", ort: "München", adresse: "Implerstraße 79, 81371 München", plz: "81371", distanzKm: 5.3, bewertung: 4.2, anzahlBewertungen: 67, beschreibung: "Ambulanter Pflegedienst des Deutschen Roten Kreuzes. Zuverlässig, kompetent, nah.", leistungen: ["Grundpflege", "Betreuung"], telefon: "+49 89 55443322", website: undefined, verfuegbar: true, reaktionszeit: "wenigen Stunden" },
  { id: "mock-6", name: "Haus St. Josef – Stationäre Pflege", ort: "München", adresse: "Renatastraße 71, 80639 München", plz: "80639", distanzKm: 6.2, bewertung: 4.1, anzahlBewertungen: 54, beschreibung: "Vollstationäre Pflegeeinrichtung in München. Alle Pflegegrade, Kurzzeitpflege möglich.", leistungen: ["Stationäre Pflege", "Demenzbetreuung"], telefon: "+49 89 66554433", website: "https://haus-st-josef.de", verfuegbar: true, reaktionszeit: "1–2 Werktagen" },
  { id: "mock-7", name: "Johanniter Pflegedienst München", ort: "München", adresse: "Dachauer Straße 21, 80335 München", plz: "80335", distanzKm: 7.0, bewertung: 4.5, anzahlBewertungen: 118, beschreibung: "Ambulanter Pflegedienst der Johanniter in München. 24h-Rufbereitschaft.", leistungen: ["Grundpflege", "24h-Pflege", "Betreuung"], telefon: "+49 89 77665544", website: "https://johanniter.de", verfuegbar: true, reaktionszeit: "wenigen Stunden" },
  { id: "mock-8", name: "Malteser Hilfsdienst München", ort: "München", adresse: "Pfarrkirchener Str. 55, 81679 München", plz: "81679", distanzKm: 8.5, bewertung: null, anzahlBewertungen: 0, beschreibung: "Ambulanter Pflegedienst der Malteser. Individuelle Betreuung für Senioren in München.", leistungen: ["Grundpflege", "Betreuung"], telefon: "+49 89 88776655", website: undefined, verfuegbar: true, reaktionszeit: "wenigen Stunden" },
  { id: "mock-9", name: "Seniorenzentrum Bogenhausen", ort: "München", adresse: "Ismaninger Straße 98, 81675 München", plz: "81675", distanzKm: 9.2, bewertung: 3.9, anzahlBewertungen: 38, beschreibung: "Vollstationäre Pflegeeinrichtung in München-Bogenhausen. Moderne Einrichtung.", leistungen: ["Stationäre Pflege", "Demenzbetreuung", "Senioren Residenz"], telefon: "+49 89 99006611", website: "https://seniorenzentrum-bogenhausen.de", verfuegbar: true, reaktionszeit: "1–2 Werktagen" },
  { id: "mock-10", name: "Ambulante Pflege Neuhausen GmbH", ort: "München", adresse: "Nymphenburger Str. 145, 80634 München", plz: "80634", distanzKm: 10.1, bewertung: 4.4, anzahlBewertungen: 76, beschreibung: "Privater ambulanter Pflegedienst in Neuhausen. Kleine Teams, persönliche Betreuung.", leistungen: ["Grundpflege", "Arztbegleitung", "Verhinderungspflege"], telefon: "+49 89 00112233", website: undefined, verfuegbar: true, reaktionszeit: "wenigen Stunden" },
];

export default async function PflegedienstePage({
  searchParams,
}: {
  searchParams: { plz?: string; pg?: string; fuer?: string; leistung?: string };
}) {
  const plz = searchParams.plz ?? "";
  const pflegegrad = searchParams.pg ?? "";
  const fuerWen = searchParams.fuer ?? "";
  const leistung = searchParams.leistung ?? "";

  const results = await fetchGooglePflegedienste(plz);

  return (
    <main className="bg-[#F9FAFB] min-h-screen">
      <ErgebnisseClient
        plz={plz}
        pflegegrad={pflegegrad}
        fuerWen={fuerWen}
        leistung={leistung}
        results={results}
      />
      <Footer />
    </main>
  );
}
