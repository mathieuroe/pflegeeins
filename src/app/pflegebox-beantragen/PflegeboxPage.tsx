"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import PflegeboxLanding from "./PflegeboxLanding";
import PflegeboxFunnelPage from "./PflegeboxFunnelPage";

export default function PflegeboxPage() {
  const searchParams = useSearchParams();
  const [showFunnel, setShowFunnel] = useState(searchParams.get("start") === "1");

  return (
    <>
      <PflegeboxLanding onStart={() => setShowFunnel(true)} />

      {showFunnel && (
        <div
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center"
          onClick={(e) => { if (e.target === e.currentTarget) setShowFunnel(false); }}
        >
          <div className="relative w-full sm:max-w-5xl bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            style={{ maxHeight: "92vh" }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowFunnel(false)}
              className="absolute top-3 right-3 z-50 w-9 h-9 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white shadow-sm transition-colors cursor-pointer"
              aria-label="Schließen"
            >
              <X size={16} />
            </button>

            {/* Funnel content – scrollable */}
            <div className="overflow-y-auto flex-1">
              <PflegeboxFunnelPage />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
