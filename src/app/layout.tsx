import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/layout/SiteShell";
import CookieBanner from "@/components/layout/CookieBanner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://liva-pflege.de"),
  title: "Pflegedienste vergleichen & Pflegeleistungen beantragen | liva",
  description: "Pflegedienste in deiner Nähe vergleichen, Hausnotruf & Pflegebox kostenlos beantragen. Pflegegrad ermitteln – in 2 Minuten. Bundesweit, unverbindlich.",
  keywords: "Pflegedienst Vergleich, Pflegebox beantragen, Hausnotruf Vergleich, Pflegegrad ermitteln, ambulante Pflege",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "liva",
    title: "Pflegedienste vergleichen & Pflegeleistungen beantragen | liva",
    description: "Pflegedienste in deiner Nähe vergleichen, Hausnotruf & Pflegebox kostenlos beantragen. Pflegegrad ermitteln – in 2 Minuten. Bundesweit, unverbindlich.",
    url: "https://liva-pflege.de",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "liva – Pflegeleistungen einfach beantragen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pflegedienste vergleichen & Pflegeleistungen beantragen | liva",
    description: "Pflegedienste vergleichen, Hausnotruf & Pflegebox kostenlos beantragen. Pflegegrad ermitteln – in 2 Minuten.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NLT25JVG');`,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NLT25JVG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://liva-pflege.de/#organization",
                name: "liva",
                legalName: "RegioCare UG (haftungsbeschränkt)",
                url: "https://liva-pflege.de",
                logo: {
                  "@type": "ImageObject",
                  url: "https://liva-pflege.de/og-image.jpg",
                  width: 1200,
                  height: 630,
                },
                email: "info@liva-pflege.de",
                telephone: "+4976188785990",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Zita-Kaiser-Straße 3",
                  addressLocality: "Freiburg im Breisgau",
                  postalCode: "79106",
                  addressCountry: "DE",
                },
                description: "liva hilft pflegenden Angehörigen, Pflegeleistungen wie Hausnotruf und Pflegebox kostenlos zu beantragen und Pflegedienste in ihrer Nähe zu vergleichen.",
                foundingDate: "2024",
                areaServed: "DE",
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://liva-pflege.de/#website",
                url: "https://liva-pflege.de",
                name: "liva",
                description: "Pflegeleistungen beantragen, Pflegedienste vergleichen, Pflegegrad ermitteln.",
                publisher: { "@id": "https://liva-pflege.de/#organization" },
                potentialAction: {
                  "@type": "SearchAction",
                  target: { "@type": "EntryPoint", urlTemplate: "https://liva-pflege.de/pflegedienste?plz={search_term_string}" },
                  "query-input": "required name=search_term_string",
                },
                inLanguage: "de-DE",
              },
            ]),
          }}
        />
        <SiteShell>{children}</SiteShell>
        <CookieBanner />
      </body>
    </html>
  );
}
