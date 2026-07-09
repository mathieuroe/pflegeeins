import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import PflegegradRechnerPage from "./PflegegradRechnerPage";

export const metadata: Metadata = {
  title: "Pflegegrad Rechner 2026 – Kostenlos & anonym | liva",
  description:
    "Pflegegrad berechnen in 5 Minuten – kostenlos und anonym. Orientiert am neuen Begutachtungsassessment (NBA). Ergebnis sofort, ohne Anmeldung.",
  keywords: [
    "Pflegegrad Rechner",
    "Pflegegrad berechnen",
    "Pflegegrad Test",
    "Pflegegrad ermitteln",
    "Pflegegrad Selbsttest",
    "MD Pflegegrad",
    "Pflegegrad 2026",
  ],
  openGraph: {
    title: "Pflegegrad Rechner 2026 – Kostenlos & anonym",
    description:
      "Ermittle in 5 Minuten welcher Pflegegrad für dich oder deine Angehörigen in Frage kommt. Kostenlos, anonym, orientiert am neuen Begutachtungsassessment (NBA) und den Begutachtungs-Richtlinien.",
    url: "https://liva-pflege.de/pflegegrad-rechner",
    siteName: "liva",
    locale: "de_DE",
    type: "website",
  },
  alternates: {
    canonical: "https://liva-pflege.de/pflegegrad-rechner",
  },
};

const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Pflegegrad Rechner 2026",
  url: "https://liva-pflege.de/pflegegrad-rechner",
  applicationCategory: "HealthApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  description:
    "Kostenloser Pflegegrad-Rechner – ermittle in 5 Minuten welcher Pflegegrad in Frage kommt. Orientiert am neuen Begutachtungsassessment (NBA) und den Begutachtungs-Richtlinien. Anonym, ohne Anmeldung.",
  featureList: [
    "Anonym und kostenlos",
    "Orientiert am neuen Begutachtungsassessment (NBA) und den Begutachtungs-Richtlinien",
    "Ergebnis sofort – kein Warten",
    "Kein Login, keine persönlichen Daten nötig",
    "Persönliche Leistungsübersicht nach Ergebnis",
  ],
  inLanguage: "de",
  dateModified: "2026-06-01",
  provider: {
    "@type": "Organization",
    name: "liva",
    legalName: "RegioCare UG (haftungsbeschränkt)",
    url: "https://liva-pflege.de",
    email: "info@liva-pflege.de",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Zita-Kaiser-Straße 3",
      addressLocality: "Freiburg im Breisgau",
      postalCode: "79106",
      addressCountry: "DE",
    },
  },
};

const schemaFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wie genau ist das Ergebnis des Pflegegrad Rechners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der Rechner orientiert sich am neuen Begutachtungsassessment (NBA) und den Begutachtungs-Richtlinien. Das Ergebnis ist eine unverbindliche Selbsteinschätzung und kann von der Begutachtung des Medizinischen Dienstes abweichen. Als Vorbereitung auf den Begutachtungstermin ist er dennoch sehr hilfreich.",
      },
    },
    {
      "@type": "Question",
      name: "Muss ich beim Pflegegrad Rechner meinen Namen oder persönliche Daten angeben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein. Der Pflegegrad Rechner ist vollständig anonym. Keine Anmeldung, kein Name, keine Krankenversicherungsnummer. Die Antworten werden nicht gespeichert. Du kannst ihn so oft nutzen wie du möchtest.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert der Pflegegrad Rechner?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die meisten schließen den Rechner in 5–8 Minuten ab. Das Ergebnis wird sofort angezeigt – kein Warten, keine E-Mail nötig.",
      },
    },
    {
      "@type": "Question",
      name: "Was bekomme ich mit Pflegegrad 1?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mit Pflegegrad 1 hast du Anspruch auf: Entlastungsbetrag (131 € / Monat für Alltagshilfe), die kostenlose Pflegehilfsmittelbox (bis 42 € / Monat) und den Hausnotruf-Zuschuss der Pflegekasse (27 € / Monat + einmalig bis zu 10,49 €). Pflegegeld gibt es erst ab Pflegegrad 2.",
      },
    },
    {
      "@type": "Question",
      name: "Was sind die 5 Pflegegrade?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pflegegrad 1 (geringe Beeinträchtigung, 12,5–27 Punkte), Pflegegrad 2 (erhebliche Beeinträchtigung, 27–47,5 Punkte), Pflegegrad 3 (schwere Beeinträchtigung, 47,5–70 Punkte), Pflegegrad 4 (schwerste Beeinträchtigung, 70–90 Punkte), Pflegegrad 5 (schwerste Beeinträchtigung mit besonderen Anforderungen an die Pflege, 90–100 Punkte).",
      },
    },
    {
      "@type": "Question",
      name: "Was tun wenn das Ergebnis des Pflegegrad Rechners niedriger ist als erwartet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nach dem offiziellen MD-Bescheid kannst du innerhalb eines Monats Widerspruch einlegen – ohne Angabe von Gründen. In rund 35 % aller Widersprüche wird der Pflegegrad heraufgestuft. Eine gute Vorbereitung auf den MD-Termin erhöht die Chancen auf eine korrekte Einstufung.",
      },
    },
    {
      "@type": "Question",
      name: "Was sind die nächsten Schritte nach dem Pflegegrad Rechner?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Stelle einen Antrag bei deiner Pflegekasse – schriftlich, telefonisch oder online. Der Medizinische Dienst (MD) kommt dann zur Begutachtung. Mit der kostenlosen persönlichen Leistungsübersicht von liva weißt du vorab genau, welche Leistungen dir zustehen und wie du dich am besten vorbereitest.",
      },
    },
  ],
};

export default function PflegegradRechnerPageWrapper() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
      />
      <PflegegradRechnerPage />
      <Footer />
    </>
  );
}
