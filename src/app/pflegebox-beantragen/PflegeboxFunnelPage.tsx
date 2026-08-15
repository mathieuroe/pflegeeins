"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight, ChevronLeft, CheckCircle2, Package,
  X, RefreshCw, Lock, Plus, Minus, Trash2, ChevronDown, Search,
  Calendar, MapPin, Phone as PhoneIcon, Mail,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const BUDGET_MAX = 42;
const AFFILIATE_URL =
  "https://www.adcell.de/click.php?promoId=273407&slotId=149760&subId=pflegebox_funnel";

const KRANKENKASSEN = [
  "Allianz Private Krankenversicherung","Alte Oldenburger Krankenversicherung",
  "AOK Baden-Württemberg","AOK Bayern","AOK Bremen Bremerhaven","AOK Hessen",
  "AOK Niedersachsen","AOK Nordost","AOK NordWest","AOK Plus (Sachsen/Thüringen)",
  "AOK Rheinland/Hamburg","AOK Rheinland-Pfalz/Saarland","AOK Sachsen-Anhalt",
  "Audi BKK","BARMER","BIG direkt gesund","BKK 24","BKK Diakonie","BKK Firmus",
  "BKK Linde","BKK ProVita","BKK Scheufelen","BKK VerbundPlus",
  "BKK Wirtschaft & Finanzen","BKK Würth","BKK ZF & Partner","Bosch BKK",
  "Continentale Krankenversicherung","DAK-Gesundheit","Debeka BKK","Energie-BKK",
  "HEK – Hanseatische Krankenkasse","HKK Erste Gesundheit",
  "IKK Brandenburg und Berlin","IKK classic","IKK gesund plus","IKK Nord","IKK Südwest",
  "KKH – Kaufmännische Krankenkasse","Knappschaft","mhplus BKK","Mobil Krankenkasse",
  "Novitas BKK","pronova BKK","R+V BKK","Salus BKK",
  "SBK – Siemens-Betriebskrankenkasse","Securvita BKK","Techniker Krankenkasse (TK)",
  "TUI BKK","Viactiv Krankenkasse","WMF BKK",
];

function KrankenkasseSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const filtered = KRANKENKASSEN.filter(k => k.toLowerCase().includes(search.toLowerCase()));
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div ref={ref} className="relative mt-3">
      <label className="block text-xs font-medium text-gray-600 mb-1">Krankenkasse / Pflegeversicherung *</label>
      <button type="button" onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-brand cursor-pointer text-left">
        <span className={value ? "text-gray-900" : "text-gray-400"}>{value || "Krankenkasse auswählen"}</span>
        <ChevronDown size={14} className={`text-gray-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input autoFocus type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Suche..." className="w-full pl-7 pr-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-brand" />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filtered.length === 0 && <p className="text-sm text-gray-400 p-3 text-center">Keine Ergebnisse</p>}
            {filtered.map(k => (
              <button key={k} type="button" onClick={() => { onChange(k); setOpen(false); setSearch(""); }}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-brand-light transition-colors cursor-pointer ${k === value ? "text-brand font-semibold bg-brand-light" : "text-gray-700"}`}>
                {k}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4 | 5;

interface Variant {
  label: string;
  price: number;
}
interface Product {
  id: string;
  name: string;
  subtitle: string;
  basePrice: number;
  img: string;
  info: string;
  variants?: Variant[];
}
interface CartItem {
  productId: string;
  variantLabel?: string;
  price: number;
  qty: number;
}

// ─── Product Catalog ──────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  { id: "fd",   name: "Flächendesinfektion",                   subtitle: "500 ml",               basePrice: 6.72,  img: "/products/fd.png",
    info: "Gebrauchsfertiges Flächendesinfektionsmittel zur schnellen Desinfektion von kleinen Flächen und Instrumenten. Wirkt gegen Bakterien, Pilze und Viren (inkl. HBV, HIV). Geeignet für alle alkoholbeständigen Materialien. Einwirkzeit: 30 Sekunden." },
  { id: "fdt",  name: "Flächendesinfektionstücher",            subtitle: "57 Stk / 114 Stk",     basePrice: 5.71,  img: "/products/fdt.webp",
    info: "Gebrauchsfertige Desinfektionstücher zur schnellen Wischdesinfektion von Flächen und Oberflächen. Alkoholfrei, angenehm im Umgang. Besonders geeignet für empfindliche Oberflächen wie Bildschirme, Tastaturen und Pflegeutensilien.",
    variants: [{ label: "57 Stk", price: 5.71 }, { label: "114 Stk", price: 11.42 }] },
  { id: "hd",   name: "Händedesinfektion",                     subtitle: "500 ml",               basePrice: 8.27,  img: "/products/hd.png",
    info: "Hygienische und chirurgische Händedesinfektion mit breitem Wirkspektrum. Tötet 99,9 % aller Bakterien, Viren und Pilze ab. Mit rückfettenden Wirkstoffen für schonende Hautpflege. Dermatologisch getestet. Einwirkzeit: 30 Sekunden." },
  { id: "dhg",  name: "Desinfizierendes Handgel",              subtitle: "500 ml",               basePrice: 8.27,  img: "/products/dhg.webp",
    info: "Schnell wirksames desinfizierendes Handgel auf Alkoholbasis. Ideal für den mobilen Einsatz. Tötet Bakterien und Viren zuverlässig ab, trocknet schnell und hinterlässt kein klebriges Gefühl. Mit Panthenol für gepflegte Hände." },
  { id: "hdt",  name: "Händedesinfektionstücher",              subtitle: "15 Stk",               basePrice: 2.14,  img: "/products/hdt.png",
    info: "Praktische Einmaltücher zur hygienischen Händedesinfektion – ideal für unterwegs oder wenn kein Wasser verfügbar ist. Wirksam gegen Bakterien und begrenzt viruzid. Einzeln dosiert für hygienische Entnahme." },
  { id: "dwl",  name: "Desinfizierende Waschlotion",           subtitle: "500 ml",               basePrice: 8.27,  img: "/products/dwl.png",
    info: "Milde, desinfizierende Waschlotion zur Ganzkörperpflege pflegebedürftiger Personen. Reinigt schonend und tötet dabei Keime ab. Ohne Ausspülen anwendbar – ideal für die Grundpflege im Bett. Hautverträglich und pH-hautneutral." },
  { id: "eh",   name: "Einmalhandschuhe",                      subtitle: "50 Stk / 100 Stk",     basePrice: 5.36,  img: "/products/eh.webp",
    info: "Latexfreie Nitrilhandschuhe für den hygienischen Einsatz in der Pflege. Bieten zuverlässigen Schutz vor Krankheitserregern. Puderfrei, allergikergeeignet und angenehm zu tragen. CE-zertifiziert als Medizinprodukt Klasse I.",
    variants: [{ label: "50 Stk", price: 5.36 }, { label: "100 Stk", price: 10.71 }] },
  { id: "fi",   name: "Fingerlinge",                           subtitle: "100 Stk",              basePrice: 5.95,  img: "/products/fi.webp",
    info: "Latexfreie Fingerlinge aus Vinyl für hygienische Wundversorgung, Verbandswechsel oder Medikamentengabe. Schützen den Finger ohne die volle Handfläche zu bedecken. Puderfrei und anatomisch geformt für sicheren Sitz." },
  { id: "ffp2", name: "FFP2-Masken",                           subtitle: "10 Stk, Schwarz & Weiß", basePrice: 1.54, img: "/products/ffp2.webp",
    info: "Zertifizierte FFP2-Atemschutzmasken (CE-Kennzeichnung) mit mindestens 94 % Filterleistung. Schützen vor Krankheitserregern und Aerosolen. Geeignet für den täglichen Pflegeeinsatz sowie für Besuche in medizinischen Einrichtungen. Verfügbar in Schwarz und Weiß." },
  { id: "ms",   name: "Medizinischer Mundschutz",              subtitle: "50 Stk",               basePrice: 7.14,  img: "/products/ms.webp",
    info: "3-lagiger medizinischer Mund-Nasen-Schutz nach EN 14683 Typ IIR. Schützt Pflegeperson und Pflegebedürftige vor Tröpfcheninfektion. Mit Nasenbügel für sicheren Sitz. Geprüfte Filterleistung ≥ 98 %. Latexfrei." },
  { id: "msk",  name: "Medizinischer Mundschutz für Kinder",   subtitle: "50 Stk",               basePrice: 7.14,  img: "/products/msk.webp",
    info: "Speziell für Kinder entwickelter medizinischer Mundschutz in kindgerechter Größe (13 × 9 cm). 3-lagig, nach EN 14683 geprüft. Weiche Materialien für hohen Tragekomfort. Latexfrei und mit Nasenbügel. Ideal wenn Kinder in die Pflege einbezogen werden." },
  { id: "bs",   name: "Bettschutzeinlagen (einmal verwendbar)", subtitle: "25 Stk",              basePrice: 12.19, img: "/products/bs.webp",
    info: "Saugstarke Einmal-Bettschutzeinlagen (60 × 90 cm) mit Flüssigkeitssperrschicht. Schützen Matratze und Bettwäsche zuverlässig. Soft-Oberfläche für angenehmes Hautgefühl. Schnelle Aufnahme von Flüssigkeiten. Geeignet für Inkontinenz und Wundpflege." },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cartTotal(cart: CartItem[]): number {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function budgetPct(cart: CartItem[]): number {
  return Math.min(100, Math.round((cartTotal(cart) / BUDGET_MAX) * 100));
}

function canAdd(cart: CartItem[], price: number): boolean {
  return cartTotal(cart) + price <= BUDGET_MAX + 0.001;
}

function fmtEur(n: number): string {
  return n.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

// ─── Step Indicator ───────────────────────────────────────────────────────────

const STEP_LABELS = ["Produktauswahl", "Dateneingabe", "Antrag", "Fertig"];

function StepIndicator({ current }: { current: Step }) {
  return (
    <div className="flex items-stretch w-full border-b border-[#E0EDE7] bg-white sticky top-0 z-40">
      {STEP_LABELS.map((label, i) => {
        const num = (i + 1) as Step;
        const done = num < current;
        const active = num === current;
        return (
          <div
            key={label}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-[11px] font-semibold border-r border-[#E0EDE7] last:border-r-0 transition-colors ${
              active ? "bg-brand text-white" : done ? "bg-brand-light text-brand" : "text-gray-400 bg-white"
            }`}
          >
            {done ? (
              <CheckCircle2 size={13} />
            ) : (
              <span
                className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                  active ? "border-white text-white" : "border-gray-300 text-gray-400"
                }`}
              >
                {num}
              </span>
            )}
            <span className="hidden sm:block truncate">{label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Variant Modal ────────────────────────────────────────────────────────────

function VariantModal({
  product,
  onSelect,
  onClose,
}: {
  product: Product;
  onSelect: (v: Variant) => void;
  onClose: () => void;
}) {
  const [sel, setSel] = useState<Variant | null>(null);
  if (!product.variants) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-4 py-6">
      <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-xl">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900 text-base">{product.name}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer"><X size={16} /></button>
        </div>
        <p className="text-xs text-gray-400 mb-4">Bitte wähle eine Produktvariante:</p>
        <div className="relative w-full aspect-[3/1] bg-brand-light rounded-xl overflow-hidden mb-5">
          <Image src={product.img} alt={product.name} fill className="object-contain p-4" />
        </div>
        <div className="flex gap-2 mb-5">
          {product.variants.map((v) => (
            <button
              key={v.label}
              onClick={() => setSel(v)}
              className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-semibold transition-colors cursor-pointer ${
                sel?.label === v.label ? "border-brand bg-brand text-white" : "border-gray-200 text-gray-700 hover:border-brand/40"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
        <button
          disabled={!sel}
          onClick={() => sel && onSelect(sel)}
          className="w-full btn-primary justify-center py-3 text-sm disabled:opacity-40 cursor-pointer"
        >
          In die Box legen <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

// ─── Info Modal ───────────────────────────────────────────────────────────────

function InfoModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 text-base leading-tight pr-2">{product.name}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer flex-shrink-0">
            <X size={16} />
          </button>
        </div>
        <div className="relative w-full aspect-[4/3] bg-brand-light rounded-xl overflow-hidden mb-4">
          <Image src={product.img} alt={product.name} fill className="object-contain p-6" />
        </div>
        <p className="text-xs text-gray-400 mb-1 font-medium">{product.subtitle}</p>
        <p className="text-sm text-gray-700 leading-relaxed">{product.info}</p>
      </div>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({
  product,
  cart,
  onAdd,
  onRemove,
  onInfo,
  isFull,
}: {
  product: Product;
  cart: CartItem[];
  onAdd: (p: Product) => void;
  onRemove: (p: Product) => void;
  onInfo: (p: Product) => void;
  isFull: boolean;
}) {
  const item = cart.find((c) => c.productId === product.id);
  const qty = item?.qty ?? 0;
  const canAddThis = !isFull || qty > 0;

  return (
    <div
      className={`relative bg-white rounded-2xl border-2 p-3 flex flex-col gap-2 transition-all ${
        qty > 0 ? "border-brand shadow-sm" : isFull ? "border-gray-100" : "border-gray-100 hover:border-brand/30"
      }`}
    >
      {/* Info button */}
      <button
        onClick={() => onInfo(product)}
        className="absolute top-2 left-2 z-10 w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-brand hover:border-brand transition-colors cursor-pointer shadow-sm"
        aria-label={`Info: ${product.name}`}
      >
        <span className="text-[10px] font-bold leading-none">i</span>
      </button>
      {qty > 0 && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center z-10">
          {qty}
        </div>
      )}
      {isFull && qty === 0 && (
        <div className="absolute inset-0 rounded-2xl bg-white/85 flex items-end justify-center pb-3 z-10">
          <span className="text-[10px] text-gray-500 font-semibold text-center px-2 leading-snug">
            Weitere Auswahl<br />nicht möglich
          </span>
        </div>
      )}
      <div className="relative w-full aspect-square bg-brand-light rounded-xl overflow-hidden">
        <Image src={product.img} alt={product.name} fill className="object-contain p-3" loading="eager" />
      </div>
      <div className="flex-1">
        <p className="text-[11px] font-semibold text-gray-900 leading-tight">{product.name}</p>
        <p className="text-[10px] text-gray-400 mt-0.5">{product.subtitle}</p>
      </div>
      <div className="flex items-center justify-between gap-1">
        <button
          onClick={() => qty > 0 && onRemove(product)}
          className={`w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-brand hover:text-brand transition-colors cursor-pointer ${
            qty === 0 ? "invisible" : ""
          }`}
        >
          <Minus size={12} />
        </button>
        <span className="text-sm font-bold text-gray-700 tabular-nums">{qty}</span>
        <button
          disabled={!canAddThis}
          onClick={() => canAddThis && onAdd(product)}
          className="w-7 h-7 rounded-lg bg-brand-light flex items-center justify-center text-brand hover:bg-brand hover:text-white transition-colors disabled:opacity-30 cursor-pointer"
        >
          <Plus size={12} />
        </button>
      </div>
    </div>
  );
}

// ─── Step 1: Produktauswahl ───────────────────────────────────────────────────

function Step1({
  cart,
  setCart,
  onNext,
}: {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onNext: () => void;
}) {
  const [variantProduct, setVariantProduct] = useState<Product | null>(null);
  const [infoProduct, setInfoProduct] = useState<Product | null>(null);
  const total = cartTotal(cart);
  const pct = budgetPct(cart);
  const isFull = pct >= 100;

  function addToCart(product: Product) {
    if (product.variants) {
      setVariantProduct(product);
      return;
    }
    if (!canAdd(cart, product.basePrice)) return;
    setCart((prev) => {
      const existing = prev.find((c) => c.productId === product.id);
      if (existing) return prev.map((c) => c.productId === product.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { productId: product.id, price: product.basePrice, qty: 1 }];
    });
  }

  function addVariant(product: Product, variant: Variant) {
    if (!canAdd(cart, variant.price)) return;
    setCart((prev) => {
      const existing = prev.find((c) => c.productId === product.id && c.variantLabel === variant.label);
      if (existing) return prev.map((c) =>
        c.productId === product.id && c.variantLabel === variant.label ? { ...c, qty: c.qty + 1 } : c
      );
      return [...prev, { productId: product.id, variantLabel: variant.label, price: variant.price, qty: 1 }];
    });
    setVariantProduct(null);
  }

  function removeFromCart(product: Product) {
    setCart((prev) => {
      const item = prev.find((c) => c.productId === product.id);
      if (!item) return prev;
      if (item.qty <= 1) return prev.filter((c) => c.productId !== product.id);
      return prev.map((c) => c.productId === product.id ? { ...c, qty: c.qty - 1 } : c);
    });
  }

  function removeCartItem(productId: string, variantLabel?: string) {
    setCart((prev) =>
      prev.filter((c) => !(c.productId === productId && c.variantLabel === variantLabel))
    );
  }

  return (
    <>
      {variantProduct && (
        <VariantModal
          product={variantProduct}
          onSelect={(v) => addVariant(variantProduct, v)}
          onClose={() => setVariantProduct(null)}
        />
      )}
      {infoProduct && (
        <InfoModal product={infoProduct} onClose={() => setInfoProduct(null)} />
      )}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid md:grid-cols-[1fr_300px] gap-6 items-start">
          {/* Left: Product Grid */}
          <div>
            <h1 className="font-serif text-2xl text-gray-900 mb-1">Wähle deine Produkte</h1>
            <p className="text-sm text-gray-400 mb-5">
              Die Pflegekasse übernimmt bis zu <strong className="text-gray-700">42 € / Monat</strong> – du zahlst nichts.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {PRODUCTS.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  cart={cart}
                  onAdd={addToCart}
                  onRemove={removeFromCart}
                  onInfo={setInfoProduct}
                  isFull={isFull}
                />
              ))}
            </div>
          </div>

          {/* Right: Cart */}
          <div className="md:sticky md:top-[calc(3.5rem+45px)] bg-white rounded-2xl border border-[#E0EDE7] p-5 shadow-sm">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Meine Pflegebox</p>

            {/* Budget bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5 text-xs">
                <span className={pct >= 100 ? "text-brand font-semibold" : "text-gray-500"}>
                  {fmtEur(total)} von {fmtEur(BUDGET_MAX)}
                </span>
                <span className={`font-bold ${pct >= 100 ? "text-brand" : "text-gray-700"}`}>{pct}%</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${pct}%`,
                    background: pct >= 100 ? "#0F6E56" : pct >= 75 ? "#22c55e" : "#0F6E56",
                  }}
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1">
                {pct < 100
                  ? `Du kannst noch ${fmtEur(BUDGET_MAX - total)} hinzufügen`
                  : "Budget vollständig ausgeschöpft"}
              </p>
            </div>

            {/* Cart items */}
            {cart.length === 0 ? (
              <p className="text-xs text-gray-400 py-2 text-center">Noch keine Produkte ausgewählt</p>
            ) : (
              <div className="space-y-2 mb-4">
                {cart.map((item) => {
                  const product = PRODUCTS.find((p) => p.id === item.productId);
                  if (!product) return null;
                  return (
                    <div key={`${item.productId}-${item.variantLabel}`} className="flex items-center gap-2">
                      <div className="relative w-8 h-8 rounded-lg bg-brand-light flex-shrink-0 overflow-hidden">
                        <Image src={product.img} alt={product.name} fill className="object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-gray-800 leading-tight truncate">{product.name}</p>
                        <p className="text-[10px] text-gray-400">{item.variantLabel ?? product.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <span className="text-xs font-bold text-gray-600 tabular-nums">{item.qty}</span>
                        <button
                          onClick={() => removeCartItem(item.productId, item.variantLabel)}
                          className="w-5 h-5 flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <button
              disabled={cart.length === 0}
              onClick={onNext}
              className="btn-primary w-full justify-center py-3 text-sm disabled:opacity-40 cursor-pointer"
            >
              Weiter <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Step 2: Dateneingabe ─────────────────────────────────────────────────────

interface FormData {
  anrede: string;
  vorname: string;
  nachname: string;
  geburtsdatum: string;
  pflegegrad: string;
  strasse: string;
  hausnummer: string;
  plz: string;
  ort: string;
  adresszusatz: string;
  lieferadresse: string;
  abweichendeLieferadresse: boolean;
  telefon: string;
  email: string;
  bereitsVersorgt: boolean;
  onlineVerwalten: boolean;
  beratung: string;
}

const BERATUNG_OPTIONS = [
  "Ja, ich möchte telefonisch beraten werden.",
  "Nein, ich wurde bereits beraten (z. B. durch einen Pflegedienst oder meine Krankenkasse).",
  "Nein, ich kenne meinen Bedarf und die Produkte.",
  "Nein, ich erhalte bereits Pflegehilfsmittel und kenne mich aus.",
  "Nein, ich möchte nicht beraten werden.",
  "Nein, aus einem anderen Grund.",
];

function Step2({
  form,
  setForm,
  onNext,
  onBack,
}: {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  onBack: () => void;
}) {
  const [showAdresszusatz, setShowAdresszusatz] = useState(false);
  const [showKeinPflegegrad, setShowKeinPflegegrad] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof FormData>(k: K, v: FormData[K]) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  function validate() {
    if (!form.anrede) return "Bitte Anrede auswählen.";
    if (!form.vorname.trim()) return "Bitte Vorname eingeben.";
    if (!form.nachname.trim()) return "Bitte Nachname eingeben.";
    if (!form.geburtsdatum) return "Bitte Geburtsdatum eingeben.";
    if (!form.pflegegrad) return "Bitte Pflegegrad auswählen.";
    if (!form.strasse.trim()) return "Bitte Straße eingeben.";
    if (!form.hausnummer.trim()) return "Bitte Hausnummer eingeben.";
    if (!form.plz.trim()) return "Bitte PLZ eingeben.";
    if (!form.ort.trim()) return "Bitte Stadt eingeben.";
    if (!form.telefon.trim()) return "Bitte Telefonnummer eingeben.";
    if (!form.email.trim()) return "Bitte E-Mail eingeben.";
    if (!form.beratung) return "Bitte Beratungspräferenz auswählen.";
    return "";
  }

  function handleNext() {
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    onNext();
  }

  const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors";
  const sectionCls = "bg-white rounded-2xl border border-[#E0EDE7] p-5 mb-4";

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-8">
      <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-brand transition-colors cursor-pointer mb-5">
        <ChevronLeft size={14} /> zurück zur Produktauswahl
      </button>
      <h2 className="font-serif text-2xl text-gray-900 mb-6">Daten der zu pflegenden Person</h2>

      {/* 1: Angaben zur Person */}
      <div className={sectionCls}>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-7 h-7 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</div>
          <p className="font-semibold text-gray-900 text-sm">Angaben zur Person</p>
        </div>
        <div className="space-y-3">
          <select value={form.anrede} onChange={(e) => update("anrede", e.target.value)} className={inputCls}>
            <option value="">Anrede</option>
            <option>Herr</option>
            <option>Frau</option>
            <option>Divers</option>
          </select>
          <input type="text" placeholder="Vorname" value={form.vorname} onChange={(e) => update("vorname", e.target.value)} className={inputCls} autoComplete="given-name" />
          <input type="text" placeholder="Nachname" value={form.nachname} onChange={(e) => update("nachname", e.target.value)} className={inputCls} autoComplete="family-name" />
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Geburtsdatum *</label>
            <div className="relative">
              <Calendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand pointer-events-none" />
              <input type="date" value={form.geburtsdatum} onChange={(e) => update("geburtsdatum", e.target.value)} className={`${inputCls} pl-8`} max={new Date().toISOString().split("T")[0]} />
            </div>
          </div>
        </div>
      </div>

      {/* 2: Pflegegrad */}
      <div className={sectionCls}>
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-7 h-7 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center flex-shrink-0">2</div>
          <p className="font-semibold text-gray-900 text-sm">Pflegegrad</p>
        </div>
        <p className="text-xs text-gray-400 mb-3">Bitte wähle den Pflegegrad der zu pflegenden Person aus.</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {[1, 2, 3, 4, 5].map((pg) => (
            <button
              key={pg}
              onClick={() => update("pflegegrad", `Pflegegrad ${pg}`)}
              className={`px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-colors cursor-pointer ${
                form.pflegegrad === `Pflegegrad ${pg}` ? "border-brand bg-brand text-white" : "border-gray-200 text-gray-700 hover:border-brand/40"
              }`}
            >
              Pflegegrad {pg}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowKeinPflegegrad(!showKeinPflegegrad)}
          className="flex items-center justify-between w-full text-xs text-gray-500 py-1 cursor-pointer"
        >
          Kein Pflegegrad vorhanden?
          <ChevronDown size={14} className={`transition-transform ${showKeinPflegegrad ? "rotate-180" : ""}`} />
        </button>
        {showKeinPflegegrad && (
          <p className="text-xs text-gray-500 mt-2 leading-relaxed bg-gray-50 rounded-xl p-3">
            Ohne Pflegegrad besteht kein gesetzlicher Anspruch auf die kostenlose Pflegebox. Wir beraten dich gerne kostenlos:{" "}
            <a href="tel:+4976188785999" className="text-brand font-semibold">0761 88785999</a>
          </p>
        )}
      </div>

      {/* 3: Adresse */}
      <div className={sectionCls}>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-7 h-7 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center flex-shrink-0">3</div>
          <p className="font-semibold text-gray-900 text-sm">Adresse</p>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Straße *</label>
              <div className="relative">
                <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand pointer-events-none" />
                <input type="text" value={form.strasse} onChange={(e) => update("strasse", e.target.value)} className={`${inputCls} pl-8`} autoComplete="street-address" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nr. *</label>
              <input type="text" value={form.hausnummer} onChange={(e) => update("hausnummer", e.target.value)} className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">PLZ *</label>
              <input type="text" inputMode="numeric" value={form.plz} onChange={(e) => update("plz", e.target.value)} className={inputCls} maxLength={5} autoComplete="postal-code" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Stadt *</label>
              <input type="text" value={form.ort} onChange={(e) => update("ort", e.target.value)} className={inputCls} autoComplete="address-level2" />
            </div>
          </div>
          <button
            onClick={() => setShowAdresszusatz(!showAdresszusatz)}
            className="flex items-center justify-between w-full text-xs text-gray-500 cursor-pointer"
          >
            Adresszusatz hinzufügen
            <ChevronDown size={14} className={`transition-transform ${showAdresszusatz ? "rotate-180" : ""}`} />
          </button>
          {showAdresszusatz && (
            <input type="text" placeholder="Adresszusatz (z. B. Appartement, Etage)" value={form.adresszusatz} onChange={(e) => update("adresszusatz", e.target.value)} className={inputCls} />
          )}
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              onClick={() => update("abweichendeLieferadresse", !form.abweichendeLieferadresse)}
              className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${form.abweichendeLieferadresse ? "bg-brand border-brand" : "border-gray-300"}`}
            >
              {form.abweichendeLieferadresse && <CheckCircle2 size={10} className="text-white" />}
            </div>
            <span className="text-xs text-gray-600">Abweichende Lieferadresse</span>
          </label>
          {form.abweichendeLieferadresse && (
            <input type="text" placeholder="Lieferadresse eingeben" value={form.lieferadresse} onChange={(e) => update("lieferadresse", e.target.value)} className={inputCls} />
          )}
        </div>
      </div>

      {/* 4: Kontakt */}
      <div className={sectionCls}>
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-7 h-7 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center flex-shrink-0">4</div>
          <p className="font-semibold text-gray-900 text-sm">Kontakt</p>
        </div>
        <p className="text-xs text-gray-400 mb-3">Wir benötigen diese Angaben, um dich bei Rückfragen kontaktieren zu können.</p>
        <div className="space-y-3">
          <input type="tel" placeholder="Telefonnummer" value={form.telefon} onChange={(e) => update("telefon", e.target.value)} className={inputCls} autoComplete="tel" />
          <input type="email" placeholder="E-Mail" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputCls} autoComplete="email" />
        </div>
      </div>

      {/* 5: Bereits versorgt */}
      <div className={sectionCls}>
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-7 h-7 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center flex-shrink-0">5</div>
          <p className="font-semibold text-gray-900 text-sm">Werden Sie bereits mit Pflegehilfsmitteln versorgt?</p>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <div
            onClick={() => update("bereitsVersorgt", !form.bereitsVersorgt)}
            className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${form.bereitsVersorgt ? "bg-brand border-brand" : "border-gray-300"}`}
          >
            {form.bereitsVersorgt && <CheckCircle2 size={10} className="text-white" />}
          </div>
          <span className="text-xs text-gray-600">Ja, ich werde von einem anderen Anbieter beliefert</span>
        </label>
      </div>

      {/* 6: Beratung */}
      <div className={sectionCls}>
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-7 h-7 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center flex-shrink-0">6</div>
          <p className="font-semibold text-gray-900 text-sm">Benötigst du ein Beratungsgespräch zu den Pflegehilfsmitteln?</p>
        </div>
        <p className="text-xs text-gray-400 mb-3">
          Wir beraten dich gerne telefonisch. Diese Angabe wird für deine Pflegekasse benötigt.
        </p>
        <div className="space-y-2">
          {BERATUNG_OPTIONS.map((opt) => (
            <label key={opt} className="flex items-start gap-2.5 cursor-pointer group">
              <div
                onClick={() => update("beratung", opt)}
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                  form.beratung === opt ? "border-brand bg-brand" : "border-gray-300"
                }`}
              >
                {form.beratung === opt && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <span className="text-xs text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {error && <p className="text-red-500 text-xs mb-3 px-1">{error}</p>}

      <button onClick={handleNext} className="btn-primary w-full justify-center py-3.5 text-sm cursor-pointer">
        Jetzt bestellen <ArrowRight size={16} />
      </button>
    </div>
  );
}

// ─── Signature Canvas ─────────────────────────────────────────────────────────

function SignatureCanvas({
  onSign,
}: {
  onSign: (signed: boolean) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [hasSig, setHasSig] = useState(false);

  function getCtx() {
    const c = canvasRef.current;
    if (!c) return null;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    return ctx;
  }

  function pos(e: MouseEvent | TouchEvent) {
    const c = canvasRef.current!;
    const rect = c.getBoundingClientRect();
    const src = "touches" in e ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  }

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;

    function start(e: MouseEvent | TouchEvent) {
      e.preventDefault();
      drawing.current = true;
      const ctx = getCtx();
      if (!ctx) return;
      const { x, y } = pos(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
    function move(e: MouseEvent | TouchEvent) {
      if (!drawing.current) return;
      e.preventDefault();
      const ctx = getCtx();
      if (!ctx) return;
      const { x, y } = pos(e);
      ctx.lineTo(x, y);
      ctx.stroke();
      if (!hasSig) { setHasSig(true); onSign(true); }
    }
    function end() { drawing.current = false; }

    c.addEventListener("mousedown", start);
    c.addEventListener("mousemove", move);
    c.addEventListener("mouseup", end);
    c.addEventListener("touchstart", start, { passive: false });
    c.addEventListener("touchmove", move, { passive: false });
    c.addEventListener("touchend", end);
    return () => {
      c.removeEventListener("mousedown", start);
      c.removeEventListener("mousemove", move);
      c.removeEventListener("mouseup", end);
      c.removeEventListener("touchstart", start);
      c.removeEventListener("touchmove", move);
      c.removeEventListener("touchend", end);
    };
  }, [hasSig, onSign]);

  function clear() {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    ctx?.clearRect(0, 0, c.width, c.height);
    setHasSig(false);
    onSign(false);
  }

  return (
    <div className="space-y-2">
      <div className="border-2 border-dashed border-gray-200 rounded-xl overflow-hidden bg-gray-50">
        <canvas
          ref={canvasRef}
          width={500}
          height={120}
          className="w-full h-28 cursor-crosshair touch-none"
        />
      </div>
      {hasSig ? (
        <button onClick={clear} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-brand transition-colors cursor-pointer">
          <RefreshCw size={12} /> Neuer Versuch
        </button>
      ) : (
        <p className="text-[11px] text-gray-400">Bitte hier unterschreiben (durch Maus- oder Fingerbewegung)</p>
      )}
    </div>
  );
}

// ─── Step 3: Antrag ───────────────────────────────────────────────────────────

function Step3({
  form,
  onSubmit,
  onBack,
  submitting,
}: {
  form: FormData;
  onSubmit: (versicherung: string, unterschrift: string) => void;
  onBack: () => void;
  submitting: boolean;
}) {
  const [versicherung, setVersicherung] = useState("");
  const [krankenkasse, setKrankenkasse] = useState("");
  const [unterschrift, setUnterschrift] = useState("");
  const [signed, setSigned] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  const VERSICHERUNG = ["gesetzlich versichert", "privat versichert", "Orts-/Sozialamt"];

  function handleSubmit() {
    if (!versicherung) { setError("Bitte Versicherungstyp auswählen."); return; }
    if (versicherung === "gesetzlich versichert" && !krankenkasse) { setError("Bitte Krankenkasse auswählen."); return; }
    if (!unterschrift.trim()) { setError("Bitte Vor- und Nachname eingeben."); return; }
    if (!signed) { setError("Bitte unterschreiben."); return; }
    if (!confirmed) { setError("Bitte bestätige die Kostenübernahme."); return; }
    onSubmit(versicherung === "gesetzlich versichert" ? krankenkasse : versicherung, unterschrift);
  }

  const sectionCls = "bg-white rounded-2xl border border-[#E0EDE7] p-5 mb-4";

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-8">
      <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-brand transition-colors cursor-pointer mb-5">
        <ChevronLeft size={14} /> Zurück
      </button>
      <h2 className="font-serif text-2xl text-gray-900 mb-2">Antrag für die Pflegebox</h2>
      <p className="text-sm text-gray-500 mb-6">
        Vervollständige deinen Antrag online, indem du deine Versicherungsdaten angibst und unterschreibst.
      </p>

      {/* 1: Versicherung */}
      <div className={sectionCls}>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-7 h-7 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</div>
          <p className="font-semibold text-gray-900 text-sm">Angaben zur Kranken- bzw. Pflegekasse</p>
        </div>
        <div className="space-y-2">
          {VERSICHERUNG.map((v) => (
            <label key={v} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => { setVersicherung(v); setKrankenkasse(""); }}
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  versicherung === v ? "border-brand bg-brand" : "border-gray-300"
                }`}
              >
                {versicherung === v && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <span className="text-sm text-gray-700">{v}</span>
            </label>
          ))}
        </div>
        {versicherung === "gesetzlich versichert" && (
          <KrankenkasseSelect value={krankenkasse} onChange={setKrankenkasse} />
        )}
      </div>

      {/* 2: Unterschrift */}
      <div className={sectionCls}>
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-7 h-7 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center flex-shrink-0">2</div>
          <p className="font-semibold text-gray-900 text-sm">Antrag unterschreiben</p>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Dein Antrag ist bereits ausgefüllt. Hier kannst du alles nochmal prüfen.
        </p>
        <div className="mb-4">
          <label className="block text-xs text-gray-500 mb-1">Vor- und Nachname (Druckbuchstaben)</label>
          <input
            type="text"
            placeholder={`${form.vorname} ${form.nachname}`}
            value={unterschrift}
            onChange={(e) => setUnterschrift(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
          />
          <p className="text-[10px] text-gray-400 mt-1">Deine Unterschrift in Druckbuchstaben</p>
        </div>
        <SignatureCanvas onSign={setSigned} />
        <label className="flex items-start gap-2.5 cursor-pointer mt-4">
          <div
            onClick={() => setConfirmed(!confirmed)}
            className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${confirmed ? "bg-brand border-brand" : "border-gray-300"}`}
          >
            {confirmed && <CheckCircle2 size={10} className="text-white" />}
          </div>
          <span className="text-xs text-gray-600 leading-relaxed">Hiermit unterschreibe ich den Antrag auf Kostenübernahme</span>
        </label>
        <p className="text-[10px] text-gray-400 mt-3 leading-relaxed">
          Sofern ich diesen Antrag für eine dritte, pflegebedürftige Person einreiche, versichere ich, dass mich die dritte Person dazu bevollmächtigt hat. Ich bestätige, dass die gewünschten Produkte ausnahmslos für die häusliche Pflege durch eine private Pflegeperson verwendet werden.
        </p>
      </div>

      <p className="text-[11px] text-center text-gray-400 mb-4">
        Mit Klick auf &quot;Jetzt beantragen&quot; stimmst du den{" "}
        <a href="/datenschutz" className="underline hover:text-brand">AGB</a> und{" "}
        <a href="/datenschutz" className="underline hover:text-brand">Datenschutzbestimmungen</a> zu.
      </p>

      {error && <p className="text-red-500 text-xs mb-3 text-center">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="btn-primary w-full justify-center py-3.5 text-sm disabled:opacity-60 cursor-pointer"
      >
        {submitting ? "Wird gesendet…" : <>Jetzt beantragen <ArrowRight size={16} /></>}
      </button>
      <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1 mt-3">
        <Lock size={9} /> Sicher verschlüsselt · DSGVO-konform
      </p>
    </div>
  );
}

// ─── Step 4: Hausnotruf Upsell ────────────────────────────────────────────────

function Step4({ onNext, onSkip }: { onNext: () => void; onSkip: () => void }) {
  const [addBettschutz, setAddBettschutz] = useState(0);
  const [addHausnotruf, setAddHausnotruf] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-4 py-6">
      <div className="bg-gradient-to-b from-[#E8F5F0] to-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">
        <div className="p-5 sm:p-6">
          <p className="text-xs font-semibold text-brand mb-1">Einfach zusätzlich mit beantragen</p>
          <h3 className="font-serif text-xl text-gray-900 mb-4">Kostenlose Zusatzoptionen</h3>

          <button
            onClick={() => setShowInfo(!showInfo)}
            className="flex items-center justify-between w-full border border-[#E0EDE7] rounded-xl px-4 py-3 text-sm text-gray-600 mb-5 cursor-pointer hover:bg-white transition-colors"
          >
            Mehr Infos
            <ChevronDown size={16} className={`transition-transform ${showInfo ? "rotate-180" : ""}`} />
          </button>
          {showInfo && (
            <div className="mb-4 text-xs text-gray-500 leading-relaxed bg-white rounded-xl p-4 border border-[#E0EDE7]">
              <p><strong className="text-gray-700">Waschbare Bettschutzeinlage:</strong> Bis zu 4 Stück im Jahr, komplett kostenlos über deine Pflegekasse nach § 40 SGB XI.</p>
              <p className="mt-2"><strong className="text-gray-700">Hausnotrufsystem:</strong> Sicherheit für daheim – ein Knopfdruck und Hilfe ist 24/7 erreichbar. Ab Pflegegrad 1 kostenlos.</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mb-5">
            {/* Bettschutzeinlage */}
            <div className="bg-white rounded-2xl border-2 border-[#E0EDE7] p-4 flex flex-col items-center gap-3">
              <p className="text-[10px] text-brand font-semibold">bis zu 4 Stück im Jahr</p>
              <p className="text-sm font-bold text-gray-900 text-center leading-snug">Waschbare Bettschutzeinlage</p>
              <div className="relative w-full aspect-square bg-brand-light rounded-xl overflow-hidden">
                <Image src="/products/bs.webp" alt="Waschbare Bettschutzeinlage" fill className="object-contain p-3" />
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-center">
                <span className="text-[9px] font-black text-gray-900 leading-tight">KOSTEN-<br/>FREI</span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setAddBettschutz(Math.max(0, addBettschutz - 1))} className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-brand hover:text-brand cursor-pointer">
                  <Minus size={12} />
                </button>
                <span className="text-sm font-bold w-4 text-center tabular-nums">{addBettschutz}</span>
                <button onClick={() => setAddBettschutz(Math.min(4, addBettschutz + 1))} className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-brand hover:text-brand cursor-pointer">
                  <Plus size={12} />
                </button>
              </div>
            </div>

            {/* Hausnotruf */}
            <div
              onClick={() => setAddHausnotruf(!addHausnotruf)}
              className={`bg-white rounded-2xl border-2 p-4 flex flex-col items-center gap-3 cursor-pointer transition-all ${addHausnotruf ? "border-brand shadow-sm" : "border-[#E0EDE7]"}`}
            >
              <p className="text-[10px] text-brand font-semibold">von easierLife</p>
              <p className="text-sm font-bold text-gray-900 text-center leading-snug">Hausnotrufsystem</p>
              <div className="w-full rounded-xl overflow-hidden">
                <img
                  src="https://www.easierlife.de/wp-content/uploads/2026/04/1080_1080_home_blau_1.jpg"
                  alt="easierLife HOME – Basisstation und Notrufknopf"
                  className="w-full aspect-square object-cover"
                />
              </div>
              <ul className="w-full space-y-1 text-[11px] text-gray-600">
                <li className="flex items-start gap-1.5"><CheckCircle2 size={12} className="text-brand flex-shrink-0 mt-0.5" /> Basisstation mit SIM-Karte & Notakku</li>
                <li className="flex items-start gap-1.5"><CheckCircle2 size={12} className="text-brand flex-shrink-0 mt-0.5" /> Notrufknopf – wasserdicht, 5,5 J. Akku</li>
                <li className="flex items-start gap-1.5"><CheckCircle2 size={12} className="text-brand flex-shrink-0 mt-0.5" /> 24/7 Notrufzentrale inklusive</li>
              </ul>
              <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-center">
                <span className="text-[9px] font-black text-gray-900 leading-tight">KOSTEN-<br/>FREI</span>
              </div>
              {addHausnotruf ? (
                <button
                  onClick={(e) => { e.stopPropagation(); setAddHausnotruf(false); }}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <Trash2 size={11} /> Entfernen
                </button>
              ) : (
                <button
                  onClick={() => setAddHausnotruf(true)}
                  className="flex items-center gap-1.5 text-xs text-brand font-semibold cursor-pointer hover:text-brand/70 transition-colors"
                >
                  <Plus size={11} /> Hinzufügen
                </button>
              )}
            </div>
          </div>

          {(addBettschutz > 0 || addHausnotruf) ? (
            <button onClick={onNext} className="btn-primary w-full justify-center py-3.5 text-sm cursor-pointer">
              Weiter <ArrowRight size={15} />
            </button>
          ) : (
            <button onClick={onSkip} className="w-full py-3.5 text-sm text-gray-500 border border-gray-200 rounded-2xl hover:border-brand/40 hover:text-brand transition-colors cursor-pointer">
              Ohne fortfahren
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Step 5: Fertig ───────────────────────────────────────────────────────────

function Step5() {
  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 size={40} className="text-brand" />
      </div>
      <h2 className="font-serif text-3xl text-gray-900 mb-3">Antrag eingegangen!</h2>
      <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
        Wir melden uns <strong className="text-gray-700">innerhalb von 24 Stunden</strong> bei dir.
        Deine Pflegekasse wird über deinen Antrag informiert – du musst nichts weiter tun.
      </p>
      <div className="bg-brand-light rounded-2xl p-5 text-left mb-8">
        <p className="text-xs font-bold text-brand uppercase tracking-wider mb-4">Was jetzt passiert</p>
        {[
          "Dein Antrag wird bei deiner Pflegekasse eingereicht",
          "Wir melden uns telefonisch zur Bestätigung",
          "Die erste Pflegebox kommt innerhalb weniger Tage",
        ].map((s, i) => (
          <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
            <span className="w-5 h-5 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
              {i + 1}
            </span>
            <span className="text-sm text-gray-700">{s}</span>
          </div>
        ))}
      </div>
      <a href="/" className="btn-secondary text-sm px-6 py-3 inline-flex">
        Zurück zur Startseite
      </a>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const EMPTY_FORM: FormData = {
  anrede: "", vorname: "", nachname: "", geburtsdatum: "",
  pflegegrad: "", strasse: "", hausnummer: "", plz: "", ort: "",
  adresszusatz: "", lieferadresse: "",
  abweichendeLieferadresse: false, telefon: "", email: "",
  bereitsVersorgt: false, onlineVerwalten: false, beratung: "",
};

export default function PflegeboxFunnelPage() {
  const [step, setStep] = useState<Step>(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);
  const [pendingVersicherung, setPendingVersicherung] = useState("");
  const [pendingUnterschrift, setPendingUnterschrift] = useState("");
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  function handleAntragSubmit(versicherung: string, unterschrift: string) {
    setPendingVersicherung(versicherung);
    setPendingUnterschrift(unterschrift);
    setShowUpsell(true);
  }

  async function submitLead(hausnotruf: boolean) {
    const produkteListe = cart
      .map((c) => {
        const name = PRODUCTS.find((p) => p.id === c.productId)?.name ?? c.productId;
        return `${name}${c.variantLabel ? ` (${c.variantLabel})` : ""} x${c.qty}`;
      })
      .join(", ");
    try {
      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          phone: form.telefon,
          path: "pflegebox-beantragen",
          pflegegrad: form.pflegegrad,
          tags: `Pflegebox | ${form.pflegegrad} | ${pendingVersicherung} | ${cart.length} Produkte`,
          vorname: form.vorname,
          nachname: form.nachname,
          geburtsdatum: form.geburtsdatum,
          adresse: `${form.strasse} ${form.hausnummer}, ${form.plz} ${form.ort}`,
          krankenkasse: pendingVersicherung,
          signature: pendingUnterschrift,
          gruende: produkteListe,
          hausnotruf,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {
      // Non-blocking
    }
  }

  async function handleUpsellNext() {
    setShowUpsell(false);
    setSubmitting(true);
    await submitLead(true);
    setSubmitting(false);
    setStep(5);
  }

  async function handleUpsellSkip() {
    setShowUpsell(false);
    setSubmitting(true);
    await submitLead(false);
    setSubmitting(false);
    setStep(5);
  }

  return (
    <div ref={topRef} className="min-h-screen bg-[#F6FAF8]">
      {step < 5 && <StepIndicator current={step} />}

      {step === 1 && (
        <Step1
          cart={cart}
          setCart={setCart}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <Step2
          form={form}
          setForm={setForm}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <>
          <Step3
            form={form}
            onSubmit={handleAntragSubmit}
            onBack={() => setStep(2)}
            submitting={submitting}
          />
          {showUpsell && (
            <Step4 onNext={handleUpsellNext} onSkip={handleUpsellSkip} />
          )}
        </>
      )}

      {step === 5 && <Step5 />}
    </div>
  );
}
