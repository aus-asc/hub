import React from "react";
import ascLogo from "../assets/asc-logo.jpg";

export const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          <img
            src={ascLogo}
            alt="ASC"
            className="h-7 w-7 rounded-full object-cover"
          />
          <span className="text-xs text-gray-400">
            © 2026 Academic Support Center · AUS
          </span>
        </div>
        <div className="flex gap-1">
          {[
            "bg-[#c8a135]",
            "bg-[#8a72a8]",
            "bg-[#b85450]",
            "bg-[#4a9e6d]",
            "bg-[#3d8cc4]",
            "bg-[#c47a5a]",
          ].map((c, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
          ))}
        </div>
      </div>
    </footer>
  );
};
