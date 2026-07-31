"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ArrowRight, Calculator, Phone, Mail, Bell, Package, ChevronDown, BookOpen, BarChart2, Newspaper, Zap, ClipboardList } from "lucide-react";

const GUIDE_LINKS = [
  { href: "/leistungen", label: "Leistungen", icon: Zap, desc: "Was dir die Pflegekasse zahlt" },
  { href: "/vergleich", label: "Vergleich", icon: BarChart2, desc: "Anbieter vergleichen" },
  { href: "/ratgeber", label: "Ratgeber", icon: BookOpen, desc: "Schritt für Schritt erklärt" },
  { href: "/news", label: "News aus der Pflege", icon: Newspaper, desc: "Aktuelle Meldungen" },
  { href: "/pflegegrad-rechner", label: "Pflegegrad-Rechner", icon: Calculator, desc: "Pflegegrad kostenlos einschätzen" },
];

const HAUSNOTRUF_HREF = "/hausnotruf-beantragen";
const PFLEGEBOX_HREF = "/pflegebox-beantragen";
const PFLEGECHECK_HREF = "/leistungen-check";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-[#E0EDE7]">
      {/* Contact bar – desktop only */}
      <div className="hidden md:flex justify-end items-center gap-5 max-w-6xl mx-auto px-4 sm:px-6 py-1.5 border-b border-[#E0EDE7]/60">
        <span className="text-xs text-gray-400 font-medium">Kostenlose Beratung:</span>
        <a href="tel:+4976188785999" className="flex items-center gap-1.5 text-xs text-brand font-medium hover:text-brand-hover transition-colors">
          <Phone size={12} /> 0761 88785999
        </a>
        <a href="mailto:info@liva-pflege.de" className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand transition-colors font-medium">
          <Mail size={12} /> info@liva-pflege.de
        </a>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-serif text-[1.6rem] text-brand leading-none">
          liva.
        </Link>

        {/* Desktop nav – Mitte */}
        <nav className="hidden md:flex items-center gap-2">
          <Link href={PFLEGECHECK_HREF} className="btn-secondary text-sm px-4 py-2.5 border-brand/50 text-brand">
            <ClipboardList size={14} /> Pflegecheck
          </Link>
          <Link href={PFLEGEBOX_HREF} className="btn-secondary text-sm px-4 py-2.5 border-brand/50 text-brand">
            <Package size={14} /> Pflegebox
          </Link>
          <Link href={HAUSNOTRUF_HREF} className="btn-primary text-sm px-4 py-2.5">
            <Bell size={14} /> Hausnotruf
          </Link>
        </nav>

        <div className="flex items-center gap-1.5">
          {/* Phone icon – mobile only */}
          <a href="tel:+4976188785999" className="md:hidden p-2 text-brand rounded-lg hover:bg-brand-light transition-colors" aria-label="Anrufen">
            <Phone size={20} />
          </a>
          {/* Mobile: Pflegecheck + Pflegebox + Hausnotruf */}
          <Link href={PFLEGECHECK_HREF} className="md:hidden btn-secondary text-xs px-2.5 py-2 border-brand/50 text-brand">
            <ClipboardList size={14} />
          </Link>
          <Link href={PFLEGEBOX_HREF} className="md:hidden btn-secondary text-xs px-2.5 py-2 border-brand/50 text-brand">
            <Package size={14} />
          </Link>
          <Link href={HAUSNOTRUF_HREF} className="md:hidden btn-primary text-xs px-2.5 py-2">
            <Bell size={14} />
          </Link>
          {/* Desktop: Pflege-Guide Dropdown – rechts */}
          <div ref={dropdownRef} className="relative hidden md:block">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 text-sm text-brand font-medium px-3 py-2 rounded-full border border-brand/40 hover:bg-brand-light transition-colors"
            >
              Pflege-Guide
              <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border border-[#E0EDE7] py-2 z-50">
                {GUIDE_LINKS.map(({ href, label, icon: Icon, desc }) => (
                  <Link key={href} href={href} onClick={() => setDropdownOpen(false)}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-brand-light/50 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-brand-light flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-brand transition-colors">
                      <Icon size={13} className="text-brand group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-brand transition-colors leading-tight">{label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <button className="md:hidden p-2 ml-0.5 text-gray-600 rounded-lg hover:bg-gray-100" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#E0EDE7] bg-white px-4 pb-5 pt-3 flex flex-col gap-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 pt-1 pb-2">Pflege-Guide</p>
          {GUIDE_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 text-sm text-gray-700 font-medium py-2.5 px-2 rounded-xl hover:bg-brand-light/50 border-b border-gray-50"
              onClick={() => setOpen(false)}
            >
              <div className="w-7 h-7 rounded-lg bg-brand-light flex items-center justify-center flex-shrink-0">
                <Icon size={13} className="text-brand" />
              </div>
              {label}
            </Link>
          ))}
          <a href="mailto:info@liva-pflege.de" className="flex items-center gap-3 text-sm text-gray-500 font-medium py-2.5 px-2 mt-1 border-t border-gray-100">
            <Mail size={14} /> info@liva-pflege.de
          </a>
          <Link href={PFLEGECHECK_HREF} className="btn-secondary mt-2 text-center justify-center border-brand text-brand" onClick={() => setOpen(false)}>
            <ClipboardList size={15} /> Pflegecheck starten
          </Link>
          <Link href={PFLEGEBOX_HREF} className="btn-secondary mt-1 text-center justify-center border-brand text-brand" onClick={() => setOpen(false)}>
            <Package size={15} /> Pflegebox beantragen
          </Link>
          <Link href={HAUSNOTRUF_HREF} className="btn-secondary mt-1 text-center justify-center border-brand text-brand" onClick={() => setOpen(false)}>
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
