import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Datenschutz | liva",
  description: "Datenschutzerklärung von liva gemäß DSGVO.",
};

export default function DatenschutzPage() {
  return (
    <>
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="font-serif text-3xl text-brand-dark mb-8">Datenschutz</h1>

        <section className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <div>
            <h2 className="font-semibold text-gray-900 mb-1">1. Verantwortlicher</h2>
            <p>
              RegioCare UG (haftungsbeschränkt)<br />
              Zita-Kaiser-Straße 3, 79106 Freiburg im Breisgau<br />
              E-Mail: info@liva-pflege.de · Telefon: 0761 88785990
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-1">2. Allgemeines zur Datenverarbeitung</h2>
            <p>
              Wir nehmen den Schutz deiner personenbezogenen Daten ernst. Personenbezogene Daten erheben wir nur im technisch notwendigen Umfang. Eine Weitergabe an Dritte erfolgt nur, soweit dies gesetzlich zulässig oder zur Erbringung unseres Angebots erforderlich ist.
            </p>
            <p className="mt-2">
              Rechtsgrundlagen der Datenverarbeitung sind je nach Einzelfall Art. 6 Abs. 1 lit. a (Einwilligung), lit. b (Vertragserfüllung), lit. c (rechtliche Verpflichtung) und lit. f DSGVO (berechtigtes Interesse).
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-1">3. Server-Logfiles</h2>
            <p className="mb-2">
              Beim Aufruf unserer Website übermittelt dein Browser automatisch Informationen an unseren Hosting-Anbieter, die in sogenannten Server-Logfiles gespeichert werden:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>IP-Adresse des anfragenden Geräts (anonymisiert)</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Aufgerufene URL</li>
              <li>Browsertyp und -version</li>
              <li>Betriebssystem</li>
              <li>Referrer-URL</li>
            </ul>
            <p className="mt-2">
              Diese Daten werden nach spätestens 7 Tagen automatisch gelöscht. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-1">4. Cookies</h2>
            <p className="mb-2">Unsere Website verwendet Cookies. Wir unterscheiden:</p>
            <p className="mb-1">
              <span className="font-medium text-gray-800">Technisch notwendige Cookies:</span> Erforderlich für den Betrieb der Website. Rechtsgrundlage: § 25 Abs. 2 TTDSG.
            </p>
            <p>
              <span className="font-medium text-gray-800">Analyse- und Marketing-Cookies:</span> Werden nur nach deiner ausdrücklichen Einwilligung gesetzt. Rechtsgrundlage: § 25 Abs. 1 TTDSG i. V. m. Art. 6 Abs. 1 lit. a DSGVO.
            </p>
            <p className="mt-2">
              Du kannst deine Einwilligung jederzeit über unser Cookie-Banner widerrufen.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-1">5. Google Tag Manager</h2>
            <p>
              Wir verwenden den Google Tag Manager der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Der Tag Manager selbst setzt keine Cookies und erhebt keine personenbezogenen Daten direkt, löst jedoch die nachfolgend beschriebenen Drittdienste aus.
            </p>
            <p className="mt-2">
              Google ist nach dem EU-US Data Privacy Framework zertifiziert. Weitere Informationen: policies.google.com/privacy
            </p>
            <p className="mt-2">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung über Cookie-Consent-Banner).
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-1">6. Affiliate-Marketing und Partnerlinks</h2>
            <p className="mb-2">
              Auf unserer Website befinden sich Affiliate-Links zu Partnerunternehmen (erkennbar am Hinweis "Werbung" oder "Partnerlink"). Wenn du über einen solchen Link einen Vertrag abschließt, erhalten wir eine Vermittlungsprovision. Für dich entstehen dabei keine zusätzlichen Kosten.
            </p>
            <p className="mb-2">
              Für das Affiliate-Tracking nutzen wir Adcell (Firstlead GmbH, Rosenthaler Str. 13, 10119 Berlin). Beim Klick auf einen Affiliate-Link können folgende Daten übermittelt werden:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>IP-Adresse (anonymisiert)</li>
              <li>Browsertyp</li>
              <li>Referrer-URL</li>
              <li>Zeitstempel des Klicks</li>
              <li>Cookie zur Zuordnung einer Conversion (sofern eingewilligt)</li>
            </ul>
            <p className="mt-2">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. a und lit. f DSGVO. Datenschutzerklärung von Adcell: adcell.de/datenschutz
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-1">7. Kontaktaufnahme per E-Mail</h2>
            <p>
              Wenn du uns per E-Mail kontaktierst, werden die mitgeteilten Daten zum Zweck der Bearbeitung deiner Anfrage gespeichert und nicht ohne deine Einwilligung weitergegeben. Die Daten werden gelöscht, sobald die Anfrage vollständig bearbeitet ist. Rechtsgrundlage: Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-1">8. Pflegegrad-Rechner und Gesundheitsdaten</h2>
            <p className="mb-2">
              Unser Pflegegrad-Rechner erfasst Angaben zur körperlichen und kognitiven Situation einer pflegebedürftigen Person. Diese Angaben stellen besondere Kategorien personenbezogener Daten im Sinne von Art. 9 Abs. 1 DSGVO (Gesundheitsdaten) dar.
            </p>
            <p className="mb-2">
              Die Verarbeitung dieser Daten erfolgt ausschließlich auf Grundlage deiner ausdrücklichen Einwilligung gemäß Art. 9 Abs. 2 lit. a DSGVO, die du durch Aktivierung der Einwilligungs-Checkbox im Formular erteilst. Ohne Einwilligung werden keine Ergebnisse übermittelt oder gespeichert.
            </p>
            <p>
              Die Angaben werden verwendet, um dir deine persönliche Leistungsübersicht per E-Mail zuzusenden. Eine Weitergabe an Dritte erfolgt nicht. Du kannst deine Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen (info@liva-pflege.de). Bereits übersandte Ergebnisse können auf Anfrage gelöscht werden.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-1">9. Deine Rechte</h2>
            <p className="mb-2">Du hast gegenüber uns folgende Rechte hinsichtlich deiner personenbezogenen Daten:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Auskunft (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch (Art. 21 DSGVO)</li>
              <li>Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
            </ul>
            <p className="mt-2">
              Anfragen an: info@liva-pflege.de. Zuständige Aufsichtsbehörde: Landesbeauftragter für den Datenschutz und die Informationsfreiheit Baden-Württemberg (
              <a href="https://www.baden-wuerttemberg.datenschutz.de" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                www.baden-wuerttemberg.datenschutz.de
              </a>
              ).
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-1">10. Aktualität dieser Erklärung</h2>
            <p>
              Stand: Juni 2026. Die jeweils aktuelle Version findest du unter liva-pflege.de/datenschutz.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
