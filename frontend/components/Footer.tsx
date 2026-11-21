const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Facebook", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-8 sm:pt-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-serif text-3xl font-bold tracking-tight text-neutral-900">
              Sabr Media Co
            </p>
            <p className="mt-2 font-serif italic text-neutral-500">
              Patience. Performance. Compounded.
            </p>
          </div>

          <nav aria-label="Social links" className="flex flex-wrap gap-x-6 gap-y-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium uppercase tracking-wider text-neutral-600 underline-offset-8 transition hover:text-neutral-900 hover:underline hover:decoration-yellow-400 hover:decoration-4"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-neutral-200 pt-6 sm:mt-10">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Sabr Media Co. All rights reserved.
          </p>
        </div>
      </div>
      <div className="h-1.5 bg-yellow-400" />
    </footer>
  );
}