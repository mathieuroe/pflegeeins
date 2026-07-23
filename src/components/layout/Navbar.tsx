"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowRight, Calculator, Phone, Mail, Bell, Package } from "lucide-react";

const links = [
  { href: "/leistungen", label: "Leistungen" },
  { href: "/vergleich", label: "Vergleich" },
  { href: "/ratgeber", label: "Ratgeber" },
  { href: "/news", label: "News aus der Pflege" },
];

const HAUSNOTRUF_HREF = "/hausnotruf-beantragen";
const PFLEGEBOX_HREF = "/pflegebox-beantragen";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-[#E0EDE7]">
      {/* Contact bar – desktop only */}
      <div className="hidden md:flex justify-end items-center gap-5 max-w-6xl mx-auto px-4 sm:px-6 py-1.5 border-b border-[#E0EDE7]/60">
        <span className="text-xs text-gray-400 font-medium">Kostenlose Beratung:</span>
        <a href="tel:+4976188785999" className="flex items-center gap-1.5 text-xs text-brand font-medium hover:text-brand-hover transition-colors">
          <Phone size={12} />
          0761 88785999
        </a>
        <a href="mailto:info@liva-pflege.de" className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand transition-colors font-medium">
          <Mail size={12} />
          info@liva-pflege.de
        </a>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
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
          {/* Phone icon – mobile only */}
          <a href="tel:+4976188785999" className="md:hidden p-2 text-brand rounded-lg hover:bg-brand-light transition-colors" aria-label="Anrufen">
            <Phone size={20} />
          </a>
          <Link href="/pflegegrad-rechner" className="hidden sm:inline-flex btn-secondary text-xs px-2.5 py-2 md:text-sm md:px-4 md:py-2.5">
            <Calculator size={14} />
            <span className="md:hidden">Rechner</span>
            <span className="hidden md:inline">Pflegegrad-Rechner</span>
          </Link>
          <Link
            href={PFLEGEBOX_HREF}
            className="hidden md:inline-flex btn-secondary text-xs px-3 py-2.5 md:text-sm md:px-4 border-brand/50 text-brand"
          >
            <Package size={14} />
            Pflegebox
          </Link>
          <Link
            href={HAUSNOTRUF_HREF}
            className="hidden md:inline-flex btn-secondary text-xs px-3 py-2.5 md:text-sm md:px-4 border-brand/50 text-brand"
          >
            <Bell size={14} />
            Hausnotruf
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
          <a href="mailto:info@liva-pflege.de" className="flex items-center gap-2 text-sm text-gray-500 font-medium py-2 border-b border-gray-50">
            <Mail size={14} /> info@liva-pflege.de
          </a>
          <Link href="/pflegegrad-rechner" className="btn-secondary mt-3 text-center justify-center" onClick={() => setOpen(false)}>
            <Calculator size={15} /> Pflegegrad-Rechner
          </Link>
          <Link href={PFLEGEBOX_HREF} className="btn-secondary mt-2 text-center justify-center border-brand text-brand" onClick={() => setOpen(false)}>
            <Package size={15} /> Pflegebox beantragen
          </Link>
          <Link href={HAUSNOTRUF_HREF} className="btn-secondary mt-2 text-center justify-center border-brand text-brand" onClick={() => setOpen(false)}>
            <Bell size={15} /> Hausnotruf beantragen
          </Link>
          <Link href="/leistungen#leistungen-sofort" className="btn-primary mt-2 text-center justify-center" onClick={() => setOpen(false)}>
            Pflegeleistungen <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </header>
  );
}
