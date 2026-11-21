"use client";

import { useState } from "react";

const NAV = [
  { label: "Work", href: "#work" },
  { label: "Why Us", href: "#clipping" },
  { label: "Process", href: "#editing" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#contact" },
];

const ctaClass =
  "inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-bold text-neutral-900 shadow-[0_8px_30px_-8px_rgba(250,204,21,0.9)] transition hover:-translate-y-0.5 hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8 sm:py-4">
        <a href="#" className="text-yellow-300 font-serif text-2xl font-bold tracking-tight sm:text-3xl">
          Sabr Media Co
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-700 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="hover:text-neutral-900 hover:underline hover:decoration-yellow-400 hover:decoration-4 hover:underline-offset-8"
            >
              {n.label}
            </a>
          ))}
          <a href="#contact" className={ctaClass}>Book a Call</a>
        </nav>

        <button
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-neutral-300 lg:hidden"
        >
          <span className={`h-0.5 w-5 bg-neutral-900 transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-5 bg-neutral-900 transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-5 bg-neutral-900 transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-neutral-200 bg-white px-4 pb-4 lg:hidden">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              onClick={() => setOpen(false)}
              className="text-black rounded-lg px-3 py-3 font-medium hover:bg-yellow-100"
            >
              {n.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className={`${ctaClass} mt-2`}>
            Book a Call
          </a>
        </div>
      )}
    </header>
  );
}