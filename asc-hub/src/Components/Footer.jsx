import React from "react";
import ascLogo from "../assets/asc-logo-no-circle.svg";
import ausLogo from "../assets/aus-logo-bilingual.svg";

export const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center sm:gap-6 gap-5">
          <img src={ausLogo} alt="AUS Logo" className="h-3 sm:h-4 object-fit" />
          <div className="w-px h-8 bg-gray-200 sm:block" />
          <img src={ascLogo} alt="ASC" className="h-4 sm:h-5 object-fit" />
        </div>
        <span className="text-[0.5rem] sm:text-xs text-gray-400">
          © 2026 American University of Sharjah · Academic Support Center
        </span>
        <div className="flex gap-1">
          {[
            "bg-[var(--color-gold)]",
            "bg-[var(--color-purple)]",
            "bg-[var(--color-red)]",
            "bg-[var(--color-green)]",
            "bg-[var(--color-blue)]",
            "bg-[var(--color-bronze)]",
          ].map((c, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
          ))}
        </div>
      </div>
    </footer>
  );
};
