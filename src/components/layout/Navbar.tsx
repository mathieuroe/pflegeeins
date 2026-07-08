"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowRight, Calculator } from "lucide-react";

const links = [
  { href: "/leistungen", label: "Leistungen" },
  { href: "/vergleich", label: "Vergleich" },
  { href: "/ratgeber", label: "Ratgeber" },
  { href: "/news", label: "News aus der Pflege" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-[#E0EDE7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-[1.6rem] text-brand leading-none">
          liva.
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-gray-600 hover:text-brand transition-colors font-medium">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link href="/pflegegrad-rechner" className="btn-secondary text-xs px-2.5 py-2 md:text-sm md:px-4 md:py-2.5">
            <Calculator size={14} />
            <span className="md:hidden">Rechner</span>
            <span className="hidden md:inline">Pflegegrad-Rechner</span>
          </Link>
          <Link href="/leistungen#leistungen-sofort" className="btn-primary text-xs px-2.5 py-2 md:text-sm md:px-5 md:py-2.5">
            <span className="md:hidden">Leistungen</span>
            <span className="hidden md:inline">Pflegeleistungen</span>
            <ArrowRight size={13} />
          </Link>
          <button className="md:hidden p-2 ml-0.5 text-gray-600 rounded-lg hover:bg-gray-100" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#E0EDE7] bg-white px-4 pb-5 pt-3 flex flex-col gap-2">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-gray-700 font-medium py-2 border-b border-gray-50" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/pflegegrad-rechner" className="btn-secondary mt-3 text-center justify-center" onClick={() => setOpen(false)}>
            <Calculator size={15} /> Pflegegrad-Rechner
          </Link>
          <Link href="/leistungen#leistungen-sofort" className="btn-primary mt-2 text-center justify-center" onClick={() => setOpen(false)}>
            Leistungen <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </header>
  );
}
