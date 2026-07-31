"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { MapPin, Loader2 } from "lucide-react";

interface AddressSuggestion {
  label: string;
  strasse: string;
  hausnummer: string;
  plz: string;
  ort: string;
}

interface Props {
  strasse: string;
  hausnummer: string;
  plz: string;
  ort: string;
  onChange: (fields: { strasse: string; hausnummer: string; plz: string; ort: string }) => void;
  inputCls?: string;
}

function parsePhoton(feature: Record<string, unknown>): AddressSuggestion | null {
  const p = feature.properties as Record<string, string> | undefined;
  if (!p) return null;
  const strasse = (p.street || p.name || "").trim();
  const hausnummer = (p.housenumber || "").trim();
  const plz = (p.postcode || "").trim();
  const ort = (p.city || p.town || p.village || p.county || "").trim();
  if (!strasse || !plz || !ort) return null;
  const label = [
    strasse,
    hausnummer,
    plz && ort ? `${plz} ${ort}` : plz || ort,
  ].filter(Boolean).join(", ");
  return { label, strasse, hausnummer, plz, ort };
}

export default function AddressAutocomplete({ strasse, hausnummer, plz, ort, onChange, inputCls = "" }: Props) {
  const [query, setQuery] = useState(strasse);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync external strasse → query when changed from outside
  useEffect(() => {
    if (selected) return;
    setQuery(strasse);
  }, [strasse, selected]);

  const search = useCallback(async (q: string) => {
    if (q.length < 3) { setSuggestions([]); setOpen(false); return; }
    setLoading(true);
    try {
      const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q + " Deutschland")}&lang=de&limit=6&layer=house&layer=street&bbox=5.8,47.2,15.1,55.1`;
      const res = await fetch(url);
      const json = await res.json();
      const results: AddressSuggestion[] = (json.features || [])
        .map(parsePhoton)
        .filter((s: AddressSuggestion | null): s is AddressSuggestion => s !== null)
        .filter((s: AddressSuggestion, i: number, arr: AddressSuggestion[]) =>
          arr.findIndex((x) => x.label === s.label) === i
        );
      setSuggestions(results);
      setOpen(results.length > 0);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  function handleInput(val: string) {
    setQuery(val);
    setSelected(false);
    onChange({ strasse: val, hausnummer, plz, ort });
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(val), 350);
  }

  function handleSelect(s: AddressSuggestion) {
    setQuery(s.strasse);
    setSelected(true);
    setSuggestions([]);
    setOpen(false);
    onChange({ strasse: s.strasse, hausnummer: s.hausnummer, plz: s.plz, ort: s.ort });
  }

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand pointer-events-none z-10" />
      {loading && <Loader2 size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 animate-spin" />}
      <input
        type="text"
        value={query}
        onChange={(e) => handleInput(e.target.value)}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        placeholder="Straße eingeben…"
        className={`${inputCls} pl-8`}
        autoComplete="off"
      />
      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-56 overflow-y-auto text-sm">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onMouseDown={(e) => { e.preventDefault(); handleSelect(s); }}
              className="flex items-start gap-2 px-3 py-2 hover:bg-[#F0FAF5] cursor-pointer"
            >
              <MapPin size={12} className="text-brand mt-0.5 flex-shrink-0" />
              <span className="text-gray-800">{s.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
