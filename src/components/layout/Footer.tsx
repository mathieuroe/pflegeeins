import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-xs text-white/50">
          <span className="font-serif text-sm sm:text-base text-white/80">liva.</span>
          <div className="flex gap-4 sm:gap-5">
            <Link href="/pflegebox-beantragen?start=1" className="hover:text-white transition-colors">Pflegebox</Link>
            <Link href="/hausnotruf-beantragen?start=1" className="hover:text-white transition-colors">Hausnotruf</Link>
            <Link href="/leistungen#entlastung" className="hover:text-white transition-colors">Entlastungsbetrag</Link>
          </div>
          <div className="flex gap-3 sm:gap-4">
            <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
            <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
            <span>© 2026 liva.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
