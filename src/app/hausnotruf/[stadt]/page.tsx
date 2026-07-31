import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Bell, Shield, Clock, Phone } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { CITIES, getCityBySlug } from "@/lib/cities";

export async function generateStaticParams() {
  return CITIES.map((c) => ({ stadt: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { stadt: string };
}): Promise<Metadata> {
  const city = getCityBySlug(params.stadt);
  if (!city) return {};
  return {
    title: `Hausnotruf ${city.name} – Kostenlos ab Pflegegrad 1 | liva`,
    description: `Hausnotruf in ${city.name}: Die Pflegekasse übernimmt bis zu 27 € pro Monat – bei günstigen Anbietern zahlst du nichts. Jetzt kostenlos beantragen.`,
    alternates: { canonical: `https://liva-pflege.de/hausnotruf/${city.slug}` },
  };
}

const jsonLd = (city: ReturnType<typeof getCityBySlug>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: `Was kostet ein Hausnotruf in ${city?.name}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `Ein Hausnotruf in ${city?.name} kostet dich ab Pflegegrad 1 nichts. Die Pflegekasse zahlt bis zu 27 € pro Monat – bei günstigen Anbietern entsteht kein Eigenanteil.`,
      },
    },
    {
      "@type": "Question",
      name: "Wie schnell kommt das Gerät?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nach der Beantragung wird das Hausnotruf-Gerät in der Regel innerhalb von 3–5 Werktagen geliefert – bundesweit, auch nach " + city?.name + ".",
      },
    },
    {
      "@type": "Question",
      name: "Brauche ich einen Pflegegrad für einen Hausnotruf?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, für den Pflegekasse-Zuschuss brauchst du mindestens Pflegegrad 1. Den Hausnotruf kannst du auch privat nutzen – dann ohne Zuschuss.",
      },
    },
  ],
});

export default function HausnotrufStadtPage({
  params,
}: {
  params: { stadt: string };
}) {
  const city = getCityBySlug(params.stadt);
  if (!city) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(city)) }}
      />
      <main className="bg-white min-h-screen">
        {/* Hero */}
        <section className="bg-white border-b border-[#E0EDE7] py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <p className="section-label mb-3">
              Hausnotruf · {city.state}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl text-gray-900 leading-tight mb-4">
              Hausnotruf {city.name} –<br className="hidden sm:block" /> kostenlos ab Pflegegrad 1
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              Die Pflegekasse übernimmt bis zu 27 € pro Monat für deinen Hausnotruf. Bei günstigen Anbietern zahlst du keinen Eigenanteil – egal ob du in {city.name} oder anderswo wohnst. Beantragen dauert 3 Minuten.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2 mb-8">
              {[
                { icon: Shield, text: "100 % von der Pflegekasse" },
                { icon: Clock, text: "Lieferung in 3–5 Werktagen" },
                { icon: Phone, text: "Kein Papierkram" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Icon size={14} className="text-brand" /> {text}
                </span>
              ))}
            </div>
            <Link
              href="/hausnotruf-beantragen?start=1"
              className="btn-primary inline-flex text-sm px-7 py-3.5"
            >
              Jetzt kostenlos beantragen <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Wie funktioniert es */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="font-serif text-3xl text-gray-900 mb-6">
            Wie funktioniert der Hausnotruf?
          </h2>
          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {[
              {
                step: "1",
                title: "Online beantragen",
                text: "Formular ausfüllen – dauert 3 Minuten. Der Anbieter stellt den Antrag bei deiner Pflegekasse.",
              },
              {
                step: "2",
                title: "Gerät erhalten",
                text: `Lieferung nach ${city.name} in 3–5 Werktagen. Einfache Einrichtung per Anleitung.`,
              },
              {
                step: "3",
                title: "Sicher zuhause",
                text: "Ein Knopfdruck genügt – sofort ist die Notrufzentrale erreichbar, rund um die Uhr.",
              },
            ].map(({ step, title, text }) => (
              <div key={step} className="card p-5">
                <div className="w-8 h-8 rounded-full bg-brand text-white text-sm font-bold flex items-center justify-center mb-3">
                  {step}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-2">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          {/* Wer hat Anspruch */}
          <h2 className="font-serif text-2xl text-gray-900 mb-4">
            Wer hat Anspruch auf den Pflegekasse-Zuschuss?
          </h2>
          <div className="space-y-2.5 mb-10">
            {[
              "Mindestens Pflegegrad 1 vorhanden",
              "Gesetzlich pflegeversichert",
              "Überwiegend alleine zuhause (zumindest zeitweise)",
              "Anerkannter Hausnotruf-Anbieter gewählt",
            ].map((t) => (
              <div key={t} className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-brand flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{t}</span>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <h2 className="font-serif text-2xl text-gray-900 mb-4">Häufige Fragen</h2>
          <div className="space-y-3 mb-10">
            {[
              {
                f: `Was kostet ein Hausnotruf in ${city.name}?`,
                a: `Ein Hausnotruf in ${city.name} kostet dich ab Pflegegrad 1 nichts. Die Pflegekasse zahlt bis zu 27 € pro Monat – bei günstigen Anbietern entsteht kein Eigenanteil.`,
              },
              {
                f: "Wie schnell kommt das Gerät?",
                a: `Das Hausnotruf-Gerät wird bundesweit in 3–5 Werktagen geliefert – also auch nach ${city.name}.`,
              },
              {
                f: "Muss ich einen Vertrag abschließen?",
                a: "Die meisten Anbieter haben keine lange Mindestlaufzeit. Kündigung ist meist mit einem Monat Frist möglich.",
              },
              {
                f: "Brauche ich einen Pflegegrad?",
                a: "Für den Pflegekasse-Zuschuss ja – ab Pflegegrad 1. Ohne Pflegegrad kannst du den Hausnotruf privat nutzen, zahlst dann aber den vollen Preis.",
              },
            ].map(({ f, a }) => (
              <div key={f} className="card p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-1.5">{f}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-brand-light/30 border border-[#E0EDE7] p-6 text-center">
            <Bell size={28} className="text-brand mx-auto mb-3" />
            <h2 className="font-serif text-2xl text-gray-900 mb-2">
              Jetzt kostenlos beantragen
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Dauert 3 Minuten. Kein Papierkram. Lieferung nach {city.name} in 3–5 Werktagen.
            </p>
            <Link
              href="/hausnotruf-beantragen?start=1"
              className="btn-primary inline-flex text-sm px-7 py-3.5"
            >
              Hausnotruf beantragen <ArrowRight size={16} />
            </Link>
          </div>

          {/* Breadcrumb-Links */}
          <div className="mt-8 pt-6 border-t border-[#E0EDE7]">
            <p className="text-xs text-gray-400 mb-3">Mehr zum Thema</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/vergleich#hausnotruf" className="text-xs text-brand hover:underline">
                Hausnotruf Anbieter im Vergleich
              </Link>
              <span className="text-gray-300">·</span>
              <Link href="/ratgeber/hausnotruf-kosten" className="text-xs text-brand hover:underline">
                Was kostet ein Hausnotruf?
              </Link>
              <span className="text-gray-300">·</span>
              <Link href="/ratgeber/was-ist-pflegegrad-1" className="text-xs text-brand hover:underline">
                Was ist Pflegegrad 1?
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
