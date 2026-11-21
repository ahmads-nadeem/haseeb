"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { DM_Sans, Caveat } from "next/font/google";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

const sans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });
const script = Caveat({ subsets: ["latin"], weight: ["600", "700"] });

/* ---------- data ---------- */
const SERVICES = ["Clipping", "Short-Form Editing", "YouTube Packaging", "AI Content"];

const MARQUEE = [
  "AI Videos That Sell",
  "Clips That Go Viral",
  "Edits That Retain",
  "Packaging That Earns the Click",
];

const PLATFORMS = ["YouTube", "Instagram", "TikTok", "Facebook"];

const PROOF_SLIDES = [
  { views: "1.9M", stats: [["Views", "1.9M"], ["Watch time (hours)", "8.0K"], ["Subscribers", "+1.8K"]] },
  { views: "1.9M", stats: [["Views", "1.9M"], ["Watch time (hours)", "35.5K"], ["Subscribers", "+6.2K"], ["Est. revenue", "$320.60"]] },
];

const CHANNELS = [
  { platform: "Instagram", stat: "322K followers", tag: "bg-pink-100 text-pink-700" },
  { platform: "TikTok", stat: "69.5K followers · 1.3M likes", tag: "bg-neutral-200 text-neutral-800" },
  { platform: "TikTok", stat: "45.6K followers · 845.3K likes", tag: "bg-neutral-200 text-neutral-800" },
  { platform: "YouTube", stat: "25.7K subs · 1.2K videos", tag: "bg-red-100 text-red-700" },
  { platform: "TikTok", stat: "38.9K followers · 488K likes", tag: "bg-neutral-200 text-neutral-800" },
];

const EDITS = ["Chopped & hooked", "Captions that land", "Sound design", "Clean talking head", "Fast cuts"];

const PRICING = [
  { name: "Single video", price: "$30", unit: "/video", note: "Pay as you go", items: ["Hook-driven cuts", "Captions + sound design", "24–48 hour turnaround"], cta: "Get Started" },
  { name: "15 videos", price: "$375", unit: "/mo", note: "$25/video · save $75", items: ["Everything in single", "15 videos every month", "Priority queue"], cta: "Choose 15" },
  { name: "30 videos", price: "$600", unit: "/mo", note: "$20/video · save $300", items: ["Everything in 15", "30 videos every month", "Fastest turnaround"], cta: "Choose 30", best: true },
];

const PACK_POINTS = [
  "Scroll-stopping thumbnail built for CTR",
  "SEO-optimized title written to match",
  "Algorithm + keyword research included",
  "3+ years of packaging experience",
];

const BEST = [
  { title: "Would You Defend a Muslim? *SHOCKING SOCIAL EXPERIMENT*", meta: "1.5M views · 1 year ago", len: "28:18" },
  { title: "The Quran Disguised as The Bible! *SOCIAL EXPERIMENT*", meta: "1M views · 1 year ago", len: "28:34", hot: true },
  { title: "Surprising Medina University Students with MacBooks! *EMOTIONAL*", meta: "507K views · 2 years ago", len: "24:10" },
  { title: "Get Out!! Social Experiment", meta: "800K views · 1 year ago", len: "22:05" },
];

const AI_VIDEOS = ["LED Downlight", "Showing You", "Unboxing", "Baxton LED", "Recharge"];

const WHY = [
  { title: "Proven on real accounts", text: "Every method we use has been tested on our own pages and channels first. We built and grew them before ever selling this as a service. You're not a guinea pig." },
  { title: "Performance over aesthetics", text: "Every deliverable is judged on retention, click-through rate, and follow conversion. A beautiful reel that gets no views is a failed reel. We care about what actually works." },
  { title: "Four services. Nothing else.", text: "We don't take every job. We create ads we don't run or manage paid ad campaigns. We don't do logos or full website builds. Four services done exceptionally well beats twenty done poorly. That focus is what makes us better at each one." },
];

const STEPS = [
  { title: "Discovery Call", text: "Free 30-minute strategy call. We look at your account, understand your goals, and identify exactly where the gap is. If we are not the right fit, we will tell you straight." },
  { title: "Strategy and Setup", text: "Content pillars, hook bank, posting schedule, and brand language all agreed before we touch a single asset. No guessing, no surprises." },
  { title: "Full Execution", text: "Our team produces, edits, designs, and posts everything. You review and approve. The day-to-day is completely off your plate." },
  { title: "Report, Refine, Scale", text: "Monthly performance reports showing exactly what moved and what didn't. What works gets doubled down. What doesn't gets cut. The results compound every month you stay in." },
];

const SERVICE_CARDS = [
  { tag: "01 · Clipping", price: "Custom", sub: "quoted to your volume", chips: ["TikTok / Reels / Shorts", "Distributed at scale"], text: "We turn one long video into dozens of short clips, cut for retention and ready to post.", cta: "Request a Quote" },
  { tag: "02 · Short-Form Editing", price: "$30", sub: "/video or save with a batch", chips: ["15 videos $375/mo", "30 videos $600/mo"], text: "Fully edited short-form videos with captions and sound design, built for watch-time.", cta: "Get Started" },
  { tag: "03 · YouTube Packaging", price: "Custom", sub: "thumbnail + title, source PSD", chips: ["Clean / Talking Head", "Cinematic / High CTR"], text: "Thumbnail and title designed together as one strategy. Judged on click-through, not just looks.", cta: "Request a Quote" },
  { tag: "04 · AI Content Creation", price: "Custom", sub: "quoted to your project", chips: ["AI Avatars", "Faceless Content"], text: "AI-generated videos and avatars, scripted and produced for ads, faceless channels, and scale.", cta: "Request a Quote" },
];

const FAQS = [
  { q: "How fast is turnaround?", a: "Single short-form videos come back in 24–48 hours. The 15 and 30 video plans get priority and the fastest turnaround. Packaging and AI projects are timed when we send your quote." },
  { q: "Do you work with non-creators / business brands?", a: "Yes. We work with creators and brands alike. For businesses we also produce AI avatar videos and ads, so you can publish consistently without being on camera." },
  { q: "Do you take on faith-aligned content?", a: "Yes. A lot of the channels in our proof section are faith-aligned. Tell us about your message and audience on the call and we'll make sure it's a good fit." },
  { q: "What's the minimum commitment?", a: "There isn't one for editing. Single videos are pay as you go, and monthly plans are there if you want a lower per-video price. Everything else is scoped per project." },
  { q: "How is Sabr Media different?", a: "We test every method on our own accounts first, judge work on retention and click-through rather than looks, and only offer four services so each one is done well." },
];

const SERVICE_OPTIONS = ["Clipping", "Short-Form Editing", "YouTube Packaging", "AI Content Creation", "Not sure yet"];
const BUDGET_OPTIONS = ["Under $500", "$500 – $1,000", "$1,000 – $3,000", "$3,000+"];

/* ---------- small pieces ---------- */
const Yellow = ({ children }: { children: ReactNode }) => (
  <span className={`${script.className} relative inline-block px-2 text-neutral-900`}>
    <span className="absolute inset-x-0 bottom-1 top-[38%] -z-10 -rotate-1 rounded-sm bg-yellow-300" />
    {children}
  </span>
);

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div className="mb-5 flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-neutral-700 sm:text-sm">
    <span className="h-0.5 w-8 bg-yellow-400" />
    {children}
  </div>
);

const Btn = ({ children, href = "#contact", variant = "solid", className = "" }: { children: ReactNode; href?: string; variant?: "solid" | "ghost"; className?: string }) => (
  <a
    href={href}
    className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 sm:px-8 sm:py-4 sm:text-base ${
      variant === "solid"
        ? "bg-yellow-400 text-neutral-900 shadow-[0_8px_30px_-8px_rgba(250,204,21,0.9)] hover:bg-yellow-300"
        : "border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-900"
    } ${className}`}
  >
    {children}
  </a>
);

function Carousel({ children, hint = true }: { children: ReactNode; hint?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (dir: number) => ref.current?.scrollBy({ left: dir * (ref.current.clientWidth * 0.8), behavior: "smooth" });
  return (
    <div className="relative">
      <div ref={ref} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:gap-6 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
      <div className="mt-2 hidden items-center justify-center gap-4 sm:flex">
        <button aria-label="Previous" onClick={() => go(-1)} className="h-10 w-10 rounded-full border border-neutral-300 bg-white font-bold hover:border-yellow-400 hover:bg-yellow-300">‹</button>
        {hint && <span className="text-xs tracking-widest text-neutral-500">SWIPE OR DRAG</span>}
        <button aria-label="Next" onClick={() => go(1)} className="h-10 w-10 rounded-full border border-neutral-300 bg-white font-bold hover:border-yellow-400 hover:bg-yellow-300">›</button>
      </div>
    </div>
  );
}

const Phone = ({ label }: { label: string }) => (
  <div className="w-52 shrink-0 snap-center rounded-[2rem] border-4 border-neutral-900 bg-neutral-900 p-1 shadow-xl sm:w-60">
    <div className="relative aspect-[9/16] overflow-hidden rounded-[1.6rem] bg-gradient-to-b from-yellow-100 via-white to-yellow-200">
      <div className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-neutral-900" />
      <button aria-label={`Play ${label}`} className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-yellow-400 text-xl shadow-lg transition hover:scale-105">▶</button>
      <p className="absolute inset-x-3 bottom-8 text-center text-xl font-extrabold uppercase leading-tight text-neutral-900 [text-shadow:0_2px_0_#fff]">{label}</p>
    </div>
  </div>
);

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-neutral-200">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium sm:py-6 sm:text-xl"
      >
        {q}
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xl transition ${open ? "rotate-45 border-yellow-400 bg-yellow-300" : "border-neutral-300"}`}>+</span>
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="pb-6 pr-12 text-neutral-600 sm:text-lg">{a}</p>
        </div>
      </div>
    </div>
  );
}

const fieldClass =
  "w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-base placeholder:text-neutral-400 focus:border-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-200";

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <label className="block text-sm font-bold">
    <span className="mb-2 block">{label}</span>
    {children}
  </label>
);

/* ---------- page ---------- */
export default function Home() {
  const [platform, setPlatform] = useState("YouTube");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data); // TODO: yahan API / EmailJS call lagayen
    setSent(true);
  };

  return (
    <main className={`${sans.className} min-h-screen bg-white text-neutral-900 antialiased`}>
      {/* <Header /> */}

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-yellow-50 via-white to-white">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-yellow-200/60 blur-3xl" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pb-16 pt-16 text-center sm:px-8 sm:pb-24 sm:pt-24">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-300 bg-yellow-100 px-4 py-2 text-[11px] font-bold tracking-[0.2em] sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-yellow-500" /> SHORT-FORM CONTENT AGENCY
          </span>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            We turn long videos into{" "}
            <span className="whitespace-nowrap text-5xl sm:text-7xl lg:text-8xl"><Yellow>scroll-stoppers.</Yellow></span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-neutral-600 sm:text-xl">
            We turn long-form content into short-form clips, polished edits, and click-worthy packaging for creators and brands who want to grow.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Btn>Book a Free Call →</Btn>
            <Btn href="#work" variant="ghost">See Our Work ↓</Btn>
          </div>
          <ul className="mt-12 flex flex-wrap justify-center gap-3">
            {SERVICES.map((s, i) => (
              <li key={s} className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium shadow-sm sm:px-5 sm:py-3 sm:text-base">
                <span className="text-xs font-bold text-yellow-600">0{i + 1}</span> {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-neutral-900 bg-neutral-900 py-4 text-white">
        <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10 whitespace-nowrap motion-reduce:animate-none">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="flex items-center gap-10 text-sm font-bold sm:text-base">
              {m} <span className="text-yellow-400">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* 01 Clipping */}
      <section id="clipping" className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
        <Eyebrow>01 CLIPPING</Eyebrow>
        <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">One long video. <Yellow>Dozens of clips.</Yellow></h2>
        <p className="mt-5 max-w-2xl text-base text-neutral-600 sm:text-xl">
          We turn your long-form content into short-form clips built for TikTok, Reels, and Shorts, then distribute them to grow your reach. Real accounts, real results.
        </p>
        <div className="mt-8 inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-neutral-200 bg-neutral-100 p-1.5">
          {PLATFORMS.map((p) => (
            <button key={p} onClick={() => setPlatform(p)} aria-pressed={platform === p}
              className={`rounded-full px-4 py-2 text-sm font-bold transition sm:px-6 sm:py-3 ${platform === p ? "bg-yellow-400 text-neutral-900 shadow" : "text-neutral-600 hover:text-neutral-900"}`}>
              {p}
            </button>
          ))}
        </div>

        <div className="mt-10">
          <Carousel hint={false}>
            {PROOF_SLIDES.map((s, i) => (
              <article key={i} className="w-[88%] shrink-0 snap-center rounded-3xl border border-neutral-200 bg-gradient-to-br from-yellow-50 to-white p-6 shadow-lg sm:w-[560px] sm:p-8">
                <span className="inline-block rounded-full bg-yellow-300 px-3 py-1 text-[11px] font-bold tracking-[0.15em]">{platform.toUpperCase()} PROOF</span>
                <p className="mt-4 text-6xl font-bold leading-none sm:text-8xl">{s.views}</p>
                <p className="text-4xl font-bold sm:text-6xl">Views</p>
                <p className="mt-3 text-neutral-600">Real growth. Real impact. Verified analytics.</p>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {s.stats.map(([k, v]) => (
                    <div key={k} className="rounded-2xl border border-neutral-200 bg-white p-3 text-center">
                      <p className="text-xs text-neutral-500">{k}</p>
                      <p className="text-xl font-bold sm:text-2xl">{v}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-center text-[11px] font-bold tracking-[0.2em] text-neutral-500">✔ VERIFIED DATA</p>
              </article>
            ))}
          </Carousel>
        </div>
        <div className="mt-10 flex justify-center"><Btn>Book a Growth Audit →</Btn></div>
      </section>

      {/* The proof */}
      <section id="work" className="bg-neutral-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <Eyebrow>THE PROOF</Eyebrow>
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">Content that <Yellow>performs.</Yellow></h2>
          <p className="mt-5 max-w-2xl text-base text-neutral-600 sm:text-xl">
            A selection of the pages and channels we work with across every platform. Identities blurred to protect our clients.
          </p>
          <div className="mt-10">
            <Carousel>
              {CHANNELS.map((c, i) => (
                <article key={i} className="w-64 shrink-0 snap-center overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-md sm:w-72">
                  <div className="flex flex-col items-center gap-3 p-5">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 blur-[2px]" />
                    <div className="h-3 w-32 rounded bg-neutral-200 blur-[2px]" />
                    <div className="grid w-full grid-cols-3 gap-2 text-center text-xs text-neutral-500">
                      {[1, 2, 3].map((n) => <div key={n} className="h-8 rounded bg-neutral-100" />)}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-0.5">
                    {Array.from({ length: 6 }).map((_, n) => <div key={n} className="aspect-[3/4] bg-gradient-to-b from-neutral-200 to-neutral-300 blur-[1px]" />)}
                  </div>
                  <div className="p-5">
                    <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.15em] ${c.tag}`}>{c.platform.toUpperCase()}</span>
                    <p className="mt-3 font-medium">{c.stat}</p>
                  </div>
                </article>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* 02 Editing */}
      <section id="editing" className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
        <Eyebrow>02 SHORT-FORM EDITING</Eyebrow>
        <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">Edits built to <Yellow>stop the scroll.</Yellow></h2>
        <p className="mt-5 max-w-2xl text-base text-neutral-600 sm:text-xl">
          Every edit is engineered for retention, watch-time, and follow-through, with hook-driven cuts, clean captions, and sound design. Hit play to watch with sound.
        </p>
        <div className="mt-10">
          <Carousel>{EDITS.map((e) => <Phone key={e} label={e} />)}</Carousel>
        </div>

        <div id="pricing" className="mt-20 scroll-mt-24">
          <p className="mb-8 text-center text-xs font-bold tracking-[0.25em] text-neutral-600">SHORT-FORM EDITING PRICING</p>
          <div className="grid gap-6 pt-4 md:grid-cols-3">
            {PRICING.map((p) => (
              <article key={p.name} className={`relative flex flex-col rounded-3xl border p-7 ${p.best ? "border-2 border-yellow-400 bg-yellow-50 shadow-[0_20px_50px_-20px_rgba(250,204,21,0.8)]" : "border-neutral-200 bg-white shadow-sm"}`}>
                {p.best && <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400 px-4 py-1.5 text-xs font-bold tracking-[0.15em]">★ BEST VALUE</span>}
                <h3 className="text-xs font-bold tracking-[0.2em] text-neutral-600">{p.name.toUpperCase()}</h3>
                <p className="mt-4 text-5xl font-bold sm:text-6xl">{p.price}<span className="text-lg font-medium text-neutral-500">{p.unit}</span></p>
                <p className="mt-2 text-neutral-500">{p.note}</p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-neutral-200 pt-6">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-3"><span className="font-bold text-yellow-600">✓</span>{it}</li>
                  ))}
                </ul>
                <Btn className="mt-8 w-full">{p.cta} →</Btn>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 03 Packaging */}
      <section className="bg-neutral-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <Eyebrow>03 YOUTUBE PACKAGING</Eyebrow>
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">Packaging that <Yellow>earns the click.</Yellow></h2>
          <p className="mt-5 max-w-2xl text-base text-neutral-600 sm:text-xl">
            A scroll-stopping thumbnail and an SEO-driven title, designed together as one strategy and researched against what the algorithm is already pushing. Judged on click-through, not just looks.
          </p>
          <ul className="mt-8 grid gap-3 border-y border-neutral-200 py-6 sm:grid-cols-2 lg:grid-cols-4">
            {PACK_POINTS.map((p) => (
              <li key={p} className="flex gap-2 text-sm font-medium sm:text-base"><span className="font-bold text-yellow-600">✓</span>{p}</li>
            ))}
          </ul>

          <p className="mb-5 mt-12 text-xs font-bold tracking-[0.2em]">★ BEST PERFORMING</p>
          <Carousel hint={false}>
            {BEST.map((b) => (
              <article key={b.title} className={`w-72 shrink-0 snap-center rounded-2xl border bg-white p-3 shadow-md sm:w-80 ${b.hot ? "border-yellow-400 ring-2 ring-yellow-300" : "border-neutral-200"}`}>
                <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-yellow-300 via-yellow-100 to-neutral-200">
                  <span className="absolute bottom-3 left-3 rounded bg-yellow-400 px-2 py-1 text-sm font-extrabold uppercase">Social Experiment</span>
                  <span className="absolute bottom-3 right-3 rounded bg-neutral-900 px-1.5 py-0.5 text-xs font-bold text-white">{b.len}</span>
                </div>
                <h3 className="mt-3 line-clamp-2 font-bold">{b.title}</h3>
                <p className="mt-1 text-sm text-neutral-500">{b.meta}</p>
              </article>
            ))}
          </Carousel>

          <div className="mx-auto mt-14 max-w-3xl rounded-[2rem] border-2 border-yellow-400 bg-white p-8 text-center shadow-xl sm:p-12">
            <p className="text-xs font-bold tracking-[0.25em] text-neutral-600">THUMBNAIL PACKAGING</p>
            <h3 className="mt-4 text-3xl font-bold sm:text-5xl">Priced to the project, not a menu.</h3>
            <p className="mx-auto mt-4 max-w-xl text-neutral-600">Two styles depending on what your video needs. We quote you once we see the channel and the goal. Source PSD always included, judged on CTR, not just looks.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {["Clean / Talking Head", "Cinematic / High CTR"].map((t) => (
                <span key={t} className="rounded-full border border-yellow-300 bg-yellow-100 px-5 py-2 text-sm font-bold">{t}</span>
              ))}
            </div>
            <Btn className="mt-8">Request a Quote →</Btn>
          </div>
        </div>
      </section>

      {/* 04 AI Content */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
        <Eyebrow>04 AI CONTENT CREATION</Eyebrow>
        <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">AI content, <Yellow>built to convert.</Yellow></h2>
        <p className="mt-5 max-w-2xl text-base text-neutral-600 sm:text-xl">
          AI-generated videos and avatars, scripted and produced for you. Perfect for ads, faceless channels, and publishing content at scale.
        </p>
        <div className="mt-10">
          <Carousel>{AI_VIDEOS.map((v) => <Phone key={v} label={v} />)}</Carousel>
        </div>
        <div className="mx-auto mt-14 max-w-3xl rounded-[2rem] border-2 border-yellow-400 bg-yellow-50 p-8 text-center shadow-xl sm:p-12">
          <h3 className="text-3xl font-bold sm:text-5xl">Priced to the project.</h3>
          <p className="mx-auto mt-4 max-w-xl text-neutral-600">AI videos and avatars are scoped to what you need: format, length, and volume. Tell us the goal and we&apos;ll send a quote fast.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {["AI Avatars", "Faceless Content", "AI Ads"].map((t) => (
              <span key={t} className="rounded-full border border-yellow-300 bg-white px-5 py-2 text-sm font-bold">{t}</span>
            ))}
          </div>
          <Btn className="mt-8">Request a Quote →</Btn>
        </div>
      </section>

      {/* Why Sabr Media */}
      <section id="why" className="scroll-mt-20 bg-neutral-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <Eyebrow>WHY SABR MEDIA</Eyebrow>
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Most agencies make content. <br className="hidden sm:block" />
            <Yellow>We make outcomes.</Yellow>
          </h2>
          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <figure className="relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl border border-yellow-200 bg-gradient-to-br from-yellow-100 via-yellow-50 to-white p-8 shadow-lg sm:min-h-[460px] sm:p-10">
              <div className="flex items-start justify-between">
                <span className="font-serif text-8xl leading-none text-yellow-400">&ldquo;</span>
                <span className={`${script.className} text-3xl`}>★ Sabr ★</span>
              </div>
              <div>
                <blockquote className="font-serif text-2xl italic leading-snug sm:text-3xl">
                  Sabr means patience and persistence. We don&apos;t chase trends. We build the systems that outlast them.
                </blockquote>
                <figcaption className="mt-8 text-xs font-bold tracking-[0.25em] text-neutral-500">THE SABR MEDIA APPROACH</figcaption>
              </div>
            </figure>
            <ol className="divide-y divide-neutral-200">
              {WHY.map((w, i) => (
                <li key={w.title} className="py-6 first:pt-0 last:pb-0">
                  <span className="font-serif text-lg italic text-yellow-600">0{i + 1}</span>
                  <h3 className="mt-2 text-2xl font-bold">{w.title}</h3>
                  <p className="mt-3 text-neutral-600 sm:text-lg">{w.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-14 flex justify-center"><Btn>Book a Free Strategy Call →</Btn></div>
        </div>
      </section>

      {/* How we work */}
      <section id="process" className="scroll-mt-20 mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
        <Eyebrow>HOW WE WORK</Eyebrow>
        <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">From first call to <Yellow>finished content.</Yellow></h2>
        <p className="mt-5 max-w-2xl text-base text-neutral-600 sm:text-xl">Four steps. No jargon, no endless back-and-forth. You brief us once, we execute.</p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((st, i) => (
            <article key={st.title} className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm transition hover:border-yellow-400 hover:shadow-lg">
              <p className="font-serif text-5xl font-bold text-yellow-500">0{i + 1}</p>
              <h3 className="mt-6 text-xl font-bold">{st.title}</h3>
              <p className="mt-3 text-neutral-600">{st.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 flex justify-center"><Btn>Start the Process →</Btn></div>
      </section>

      {/* All services */}
      <section id="services" className="scroll-mt-20 bg-neutral-50 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          <Eyebrow>ALL SERVICES</Eyebrow>
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">Every service. <Yellow>One view.</Yellow></h2>
          <p className="mt-5 max-w-2xl text-base text-neutral-600 sm:text-xl">
            Short-form editing has simple, fixed pricing. Everything else is scoped and quoted to what you need, tell us your goal and we&apos;ll send pricing fast.
          </p>
          <p className="mt-6 inline-block rounded-full border border-yellow-300 bg-yellow-100 px-5 py-3 text-sm font-bold">
            50% deposit to begin · 50% on delivery · simple and secure for both sides
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {SERVICE_CARDS.map((c) => (
              <article key={c.tag} className="flex flex-col rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm sm:p-8">
                <p className="text-xs font-bold tracking-[0.15em] text-yellow-700">{c.tag.toUpperCase()}</p>
                <p className="mt-5 text-4xl font-bold sm:text-5xl">{c.price} <span className="text-base font-normal text-neutral-500">{c.sub}</span></p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {c.chips.map((ch) => (
                    <span key={ch} className="rounded-full border border-yellow-300 bg-yellow-100 px-4 py-2 text-sm font-bold">{ch}</span>
                  ))}
                </div>
                <p className="mt-5 flex-1 text-neutral-600">{c.text}</p>
                <Btn className="mt-6 w-full">{c.cta} →</Btn>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 mx-auto max-w-4xl px-4 py-16 sm:px-8 sm:py-24">
        <Eyebrow>QUESTIONS</Eyebrow>
        <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">Things people <Yellow>actually ask.</Yellow></h2>
        <div className="mt-10 border-t border-neutral-200">
          {FAQS.map((f) => <FaqItem key={f.q} {...f} />)}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 bg-gradient-to-b from-white via-yellow-50 to-yellow-100 px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className={`${script.className} text-3xl`}>★ Ready to scale?</p>
          <h2 className="mt-3 text-5xl font-bold tracking-tight sm:text-7xl">Let&apos;s <Yellow>talk.</Yellow></h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-neutral-600 sm:text-xl">
            Tell us what you need. We&apos;ll get back to you fast with a plan, whether we work together or not.
          </p>

          {sent ? (
            <div role="status" className="mt-10 rounded-3xl border-2 border-yellow-400 bg-white p-10 shadow-xl">
              <p className="text-3xl font-bold">Message sent ✓</p>
              <p className="mt-3 text-neutral-600">Thanks! We&apos;ll reply with a plan soon.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-10 grid gap-5 text-left sm:grid-cols-2">
              <Field label="Full Name">
                <input name="name" required placeholder="Your name" className={fieldClass} />
              </Field>
              <Field label="Email Address">
                <input name="email" type="email" required placeholder="you@email.com" className={fieldClass} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Social Media Handle / Website">
                  <input name="handle" placeholder="Instagram, YouTube, TikTok, Facebook, or website link" className={fieldClass} />
                </Field>
              </div>
              <Field label="What service are you interested in?">
                <select name="service" required defaultValue="" className={fieldClass}>
                  <option value="" disabled>Select a service</option>
                  {SERVICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Budget">
                <select name="budget" required defaultValue="" className={fieldClass}>
                  <option value="" disabled>Select a range</option>
                  {BUDGET_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <button
                type="submit"
                className="mt-2 rounded-full bg-yellow-400 px-8 py-5 text-lg font-bold text-neutral-900 shadow-[0_8px_30px_-8px_rgba(250,204,21,0.9)] transition hover:-translate-y-0.5 hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 sm:col-span-2"
              >
                Send &amp; Book a Call →
              </button>
            </form>
          )}
          <p className="mt-8 text-neutral-600">
            Prefer to message?{" "}
            <a href="#" className="font-bold text-neutral-900 underline decoration-yellow-400 decoration-4 underline-offset-4">DM us on Instagram →</a>
          </p>
        </div>
      </section>

      {/* <Footer /> */}

      {/* Floating CTA */}
      <a href="#contact" className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-3 text-sm font-bold text-neutral-900 shadow-[0_10px_30px_-5px_rgba(250,204,21,0.9)] transition hover:-translate-y-0.5 hover:bg-yellow-300 sm:bottom-6 sm:right-6 sm:px-7 sm:py-4 sm:text-base">
        <span className="h-2 w-2 rounded-full bg-neutral-900" /> Book a Free Call →
      </a>

      <style jsx global>{`
        @keyframes marquee {
          to { transform: translateX(-33.333%); }
        }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
      `}</style>
    </main>
  );
}