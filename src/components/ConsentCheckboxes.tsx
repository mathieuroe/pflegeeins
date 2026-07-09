"use client";

import Link from "next/link";

interface Props {
  consentBeratung: boolean;
  consentWeitergabe: boolean;
  onChangeBeratung: (v: boolean) => void;
  onChangeWeitergabe: (v: boolean) => void;
  showError: boolean;
}

export default function ConsentCheckboxes({
  consentBeratung,
  consentWeitergabe,
  onChangeBeratung,
  onChangeWeitergabe,
  showError,
}: Props) {
  return (
    <div className="space-y-3">
      {/* Pflicht-Einwilligung */}
      <div className={`rounded-xl p-3 border transition-colors ${showError && !consentBeratung ? "border-red-400 bg-red-50" : "border-[#E0EDE7] bg-gray-50/60"}`}>
        <label className="flex items-start gap-3 cursor-pointer">
          <div className="relative flex-shrink-0 mt-0.5">
            <input
              type="checkbox"
              checked={consentBeratung}
              onChange={(e) => onChangeBeratung(e.target.checked)}
              className="sr-only"
            />
            <div
              onClick={() => onChangeBeratung(!consentBeratung)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                consentBeratung ? "bg-brand border-brand" : showError ? "border-red-400 bg-white" : "border-gray-300 bg-white"
              }`}
            >
              {consentBeratung && (
                <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                  <path d="M1 4.5L4 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-xs text-gray-500 leading-relaxed">
            Ich möchte kostenlos und unverbindlich zu passenden Pflegeleistungen beraten werden. Ich willige ein, dass die RegioCare UG (haftungsbeschränkt), Freiburg, mich hierzu telefonisch, per E-Mail und SMS kontaktiert und meine Angaben – einschließlich Angaben zu meinem Pflegegrad und Gesundheitszustand (Art.&nbsp;9 DSGVO) – zum Zweck der Beratung und Vermittlung passender Leistungen (u.&nbsp;a. Pflegehilfsmittel, Hausnotruf, Pflegedienste) verarbeitet. Die Beratung kann auch weitere Pflege- und Unterstützungsangebote umfassen. Ich kann diese Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen (z.&nbsp;B. per E-Mail an info@liva-pflege.de). Details in der{" "}
            <Link href="/datenschutz" className="underline hover:text-brand" onClick={(e) => e.stopPropagation()}>
              Datenschutzerklärung
            </Link>
            .
          </span>
        </label>
        {showError && !consentBeratung && (
          <p className="text-xs text-red-500 mt-2 ml-8 font-medium">
            Bitte bestätigen Sie die Einwilligung um fortzufahren.
          </p>
        )}
      </div>

      {/* Optionale Weitergabe-Einwilligung */}
      <label className="flex items-start gap-3 cursor-pointer">
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            type="checkbox"
            checked={consentWeitergabe}
            onChange={(e) => onChangeWeitergabe(e.target.checked)}
            className="sr-only"
          />
          <div
            onClick={() => onChangeWeitergabe(!consentWeitergabe)}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
              consentWeitergabe ? "bg-brand border-brand" : "border-gray-300 bg-white"
            }`}
          >
            {consentWeitergabe && (
              <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                <path d="M1 4.5L4 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        </div>
        <div>
          <span className="text-xs text-gray-600 leading-relaxed font-medium">
            Ja, ich möchte direkt passende Angebote von geprüften Anbietern erhalten (empfohlen – spart Ihnen die Suche).
          </span>
          <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
            Dazu wird meine Anfrage an passende, geprüfte Partnerunternehmen (z.&nbsp;B. Pflegedienste, Hausnotruf- und Hilfsmittelanbieter) weitergegeben. Widerruf jederzeit möglich.
          </p>
        </div>
      </label>
    </div>
  );
}
