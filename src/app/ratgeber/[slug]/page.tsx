import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { RATGEBER, getBySlug } from "@/lib/content-data";

export async function generateStaticParams() {
  return RATGEBER.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const a = getBySlug(params.slug);
  if (!a) return {};
  return { title: `${a.titel} | liva Ratgeber`, description: a.beschreibung };
}

function renderMarkdown(md: string) {
  const lines = md.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="font-serif text-3xl text-gray-900 mt-10 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="font-semibold text-xl text-gray-900 mt-7 mb-3">{line.slice(4)}</h3>);
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) { items.push(lines[i].slice(2)); i++; }
      elements.push(<ul key={i} className="list-disc list-inside space-y-1.5 text-gray-600 mb-4 ml-2">{items.map((it, j) => <li key={j}>{it}</li>)}</ul>);
      continue;
    } else if (line.match(/^\d+\. /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) { items.push(lines[i].replace(/^\d+\. /, "")); i++; }
      elements.push(
        <ol key={i} className="space-y-2 mb-4 ml-2">
          {items.map((it, j) => (
            <li key={j} className="flex gap-3 text-gray-600 text-sm">
              <span className="w-5 h-5 rounded-full bg-brand-light text-brand text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{j + 1}</span>
              {it.split(/\*\*(.*?)\*\*/g).map((p, k) => k % 2 === 1 ? <strong key={k} className="text-gray-900">{p}</strong> : p)}
            </li>
          ))}
        </ol>
      );
      continue;
    } else if (line.trim()) {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      elements.push(<p key={i} className="text-gray-600 leading-relaxed mb-4">{parts.map((p, k) => k % 2 === 1 ? <strong key={k} className="text-gray-900">{p}</strong> : p)}</p>);
    }
    i++;
  }
  return elements;
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getBySlug(params.slug);
  if (!article) notFound();

  return (
    <>
      <main>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid lg:grid-cols-[1fr_280px] gap-14">
          <article>
            <Link href="/ratgeber" className="inline-flex items-center gap-1.5 text-sm text-brand mb-8 hover:underline">
              <ArrowLeft size={14} /> Zurück zum Ratgeber
            </Link>
            <span className="text-xs font-semibold bg-brand-light text-brand px-3 py-1 rounded-full">{article.kategorie}</span>
            <h1 className="font-serif text-4xl text-gray-900 mt-4 mb-4 leading-tight">{article.titel}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-[#E0EDE7]">
              <span className="flex items-center gap-1.5"><Clock size={13} />{article.lesezeit}</span>
              <span className="flex items-center gap-1.5"><Calendar size={13} />{article.datum}</span>
            </div>
            {renderMarkdown(article.inhalt)}
            <div className="mt-12 p-6 bg-brand-light rounded-[12px]">
              {article.affiliate ? (
                <>
                  <h3 className="font-semibold text-gray-900 mb-2">Jetzt direkt beantragen</h3>
                  <p className="text-gray-600 text-sm mb-4">100% kostenlos – die Pflegekasse übernimmt. Antrag dauert ca. 5 Minuten.</p>
                  <a href={article.affiliate} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">Jetzt kostenlos beantragen <ArrowRight size={15} /></a>
                  <p className="text-[10px] text-gray-400 mt-1">Über unseren Partner</p>
                </>
              ) : (
                <>
                  <h3 className="font-semibold text-gray-900 mb-2">Bereit loszulegen?</h3>
                  <p className="text-gray-600 text-sm mb-4">Prüfe was dir mit deinem Pflegegrad zusteht – in 2 Minuten, kostenlos.</p>
                  <Link href="/leistungen-check" className="btn-primary text-sm">Was steht mir zu? <ArrowRight size={15} /></Link>
                </>
              )}
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              <div className="card p-5">
                {article.affiliate ? (
                  <>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">Direkt beantragen</h3>
                    <p className="text-gray-500 text-xs mb-4 leading-relaxed">100% kostenlos – Pflegekasse übernimmt. Antrag in 5 Minuten fertig.</p>
                    <a href={article.affiliate} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center text-xs py-2.5">Jetzt kostenlos beantragen <ArrowRight size={14} /></a>
                    <p className="text-[10px] text-gray-400 mt-1 text-center">Über unseren Partner</p>
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">Was steht dir zu?</h3>
                    <p className="text-gray-500 text-xs mb-4 leading-relaxed">Wähle deinen Pflegegrad – wir zeigen dir in 2 Minuten alle Leistungen.</p>
                    <Link href="/leistungen-check" className="btn-primary w-full justify-center text-xs py-2.5">Was steht mir zu? <ArrowRight size={14} /></Link>
                  </>
                )}
              </div>
              <div className="card p-5">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Weitere Artikel</h3>
                <div className="space-y-3">
                  {RATGEBER.filter((a) => a.slug !== article.slug).slice(0, 3).map((a) => (
                    <Link key={a.slug} href={`/ratgeber/${a.slug}`} className="block group">
                      <p className="text-xs text-gray-700 group-hover:text-brand transition-colors leading-snug">{a.titel}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{a.lesezeit}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
