import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Package, Shield, Clock, Truck } from "lucide-react";
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
    title: `Pflegebox ${city.name} – Bis 42 € / Monat kostenlos | liva`,
    description: `Pflegebox in ${city.name} kostenlos beantragen: Bis 42 € monatlich für Pflegehilfsmittel – vollständig von der Pflegekasse übernommen ab Pflegegrad 1.`,
    alternates: { canonical: `https://liva-pflege.de/pflegebox/${city.slug}` },
  };
}

const jsonLd = (city: ReturnType<typeof getCityBySlug>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: `Wie beantrage ich eine Pflegebox in ${city?.name}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `Du bestellst die Pflegebox online – der Anbieter liefert dann bundesweit, auch nach ${city?.name}. Antrag bei der Pflegekasse übernimmt der Anbieter. Kostenlos ab Pflegegrad 1.`,
      },
    },
    {
      "@type": "Question",
      name: "Was ist in der Pflegebox enthalten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Pflegebox enthält Pflegehilfsmittel wie Einmalhandschuhe, Mundschutz, Desinfektionsmittel, Bettschutzeinlagen und Händedesinfektionsmittel. Der Inhalt ist oft individuell anpassbar.",
      },
    },
    {
      "@type": "Question",
      name: "Was kostet die Pflegebox?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Pflegebox kostet dich ab Pflegegrad 1 nichts. Die Pflegekasse erstattet bis zu 42 € pro Monat für Pflegehilfsmittel – der Anbieter rechnet direkt mit der Kasse ab.",
      },
    },
  ],
});

export default function PflegeboxStadtPage({
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
              Pflegebox · {city.state}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl text-gray-900 leading-tight mb-4">
              Pflegebox {city.name} –<br className="hidden sm:block" /> bis 42 € / Monat kostenlos
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              Die Pflegekasse zahlt bis zu 42 € pro Monat für Pflegehilfsmittel. Einmalhandschuhe, Mundschutz, Desinfektion – monatlich frei Haus nach {city.name}. Du zahlst nichts. Beantragen dauert 3 Minuten.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2 mb-8">
              {[
                { icon: Shield, text: "100 % von der Pflegekasse" },
                { icon: Truck, text: "Kostenlose Lieferung" },
                { icon: Clock, text: "Monatlich anpassbar" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Icon size={14} className="text-brand" /> {text}
                </span>
              ))}
            </div>
            <Link
              href="/pflegebox-beantragen?start=1"
              className="btn-primary inline-flex text-sm px-7 py-3.5"
            >
              Pflegebox kostenlos bestellen <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Was ist drin */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="font-serif text-3xl text-gray-900 mb-6">
            Was ist in der Pflegebox?
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {[
              { name: "Einmalhandschuhe", desc: "Latex- oder nitrilfrei, verschiedene Größen" },
              { name: "Mundschutz", desc: "Medizinische Masken Typ IIR" },
              { name: "Bettschutzeinlagen", desc: "Waschbar oder als Einwegartikel" },
              { name: "Desinfektionsmittel", desc: "Hände- und Flächendesinfektion" },
              { name: "Fingerlinge", desc: "Für kleine Wunden und Verbände" },
              { name: "Schutzschürzen", desc: "Einweg-Kittel für die Pflege" },
            ].map(({ name, desc }) => (
              <div key={name} className="flex items-start gap-2.5 card p-3.5">
                <CheckCircle2 size={15} className="text-brand flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* So funktioniert es */}
          <h2 className="font-serif text-2xl text-gray-900 mb-4">
            Wie beantragst du die Pflegebox?
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { step: "1", title: "Online bestellen", text: "Anbieter wählen, Formular ausfüllen – dauert 3 Minuten." },
              { step: "2", title: "Antrag läuft", text: "Der Anbieter stellt den Antrag bei deiner Pflegekasse – du musst nichts tun." },
              { step: "3", title: "Monatlich liefern", text: `Erste Lieferung nach ${city.name} in wenigen Tagen. Dann automatisch jeden Monat.` },
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

          {/* FAQ */}
          <h2 className="font-serif text-2xl text-gray-900 mb-4">Häufige Fragen</h2>
          <div className="space-y-3 mb-10">
            {[
              {
                f: `Wie beantrage ich eine Pflegebox in ${city.name}?`,
                a: `Du bestellst online – der Anbieter liefert bundesweit, also auch nach ${city.name}. Der Antrag bei der Pflegekasse wird vom Anbieter gestellt.`,
              },
              {
                f: "Brauche ich Pflegegrad 1?",
                a: "Ja, für die Kostenübernahme durch die Pflegekasse brauchst du mindestens Pflegegrad 1. Dann entstehen keine Kosten für dich.",
              },
              {
                f: "Kann ich den Inhalt anpassen?",
                a: "Viele Anbieter ermöglichen eine individuelle Zusammenstellung des Inhalts – abhängig vom monatlichen Budget von 42 €.",
              },
              {
                f: "Was passiert wenn ich den Anbieter wechseln will?",
                a: "Du kannst jederzeit wechseln – meist reicht eine Kündigung mit einem Monat Frist. Das Budget bleibt dir bei jedem Anbieter erhalten.",
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
            <Package size={28} className="text-brand mx-auto mb-3" />
            <h2 className="font-serif text-2xl text-gray-900 mb-2">
              Jetzt kostenlos bestellen
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Bis 42 € / Monat kostenlos. Lieferung nach {city.name}. Kein Papierkram.
            </p>
            <Link
              href="/pflegebox-beantragen?start=1"
              className="btn-primary inline-flex text-sm px-7 py-3.5"
            >
              Pflegebox bestellen <ArrowRight size={16} />
            </Link>
          </div>

          {/* Breadcrumb-Links */}
          <div className="mt-8 pt-6 border-t border-[#E0EDE7]">
            <p className="text-xs text-gray-400 mb-3">Mehr zum Thema</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/vergleich#pflegebox" className="text-xs text-brand hover:underline">
                Pflegebox Anbieter im Vergleich
              </Link>
              <span className="text-gray-300">·</span>
              <Link href="/ratgeber/was-ist-pflegegrad-1" className="text-xs text-brand hover:underline">
                Was ist Pflegegrad 1?
              </Link>
              <span className="text-gray-300">·</span>
              <Link href="/ratgeber/pflegegrad-beantragen" className="text-xs text-brand hover:underline">
                Pflegegrad beantragen
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
