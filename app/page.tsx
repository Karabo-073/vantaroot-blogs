"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Stage = "intro" | "video" | "main";

const VIDEO_SRC = "/videos/vantaroot-intro.mp4"; // your 33-second video

const introLines = [
  "My name is Molapo Manuel, a Security Researcher, Bug Bounty Hunter, and Founder of VantaRoot.",
  "My research interests include wireless security, vulnerability research, penetration testing, and cybersecurity.",
  "I enjoy solving CTF challenges, investigating security vulnerabilities, and publishing technical research.",
];

const tabs = [
  { label: "50 CTF Writeups", href: "/ctf", tag: "01" },
  { label: "CVE Writeups", href: "/cve", tag: "02" },
  { label: "Bug Bounty Writeups", href: "/bug-bounty", tag: "03" },
];

export default function Home() {
  const [stage, setStage] = useState<Stage>("intro");
  const [step, setStep] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Intro: reveal one line at a time, then move on to the video
  useEffect(() => {
    if (stage !== "intro") return;

    const delay = step >= introLines.length ? 2500 : 2800;
    const timer = window.setTimeout(() => {
      if (step >= introLines.length) {
        setStage("video");
      } else {
        setStep((current) => current + 1);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [stage, step]);

  // ---------- STAGE 1: INTRO (blog.png background) ----------
  if (stage === "intro") {
    return (
      <main
        className="flex min-h-screen items-center justify-center bg-black bg-cover bg-center px-4 py-10"
        style={{ backgroundImage: "url('/blog.png')" }}
      >
        <div className="w-full max-w-3xl rounded-xl bg-black/75 p-6 shadow-2xl shadow-black/50 sm:p-10">
          <p className="mb-6 font-mono text-xs tracking-[0.35em] text-emerald-400">
            &gt; VANTAROOT / BLOGS
          </p>

          <div aria-live="polite" className="min-h-[260px] space-y-6">
            {introLines.slice(0, step).map((line) => (
              <p
                key={line}
                className="animate-pulse-once font-mono text-base leading-8 text-red-500 sm:text-xl md:text-2xl"
              >
                {line}
              </p>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setStage("video")}
            className="mt-6 font-mono text-xs text-slate-400 underline-offset-4 transition hover:text-red-400 hover:underline"
          >
            SKIP INTRO →
          </button>
        </div>
      </main>
    );
  }

  // ---------- STAGE 2: VIDEO (33 seconds) ----------
  if (stage === "video") {
    return (
      <main className="relative flex min-h-screen items-center justify-center bg-black">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          autoPlay
          muted={muted}
          playsInline
          onEnded={() => setStage("main")}
          onError={() => setStage("main")}
          className="h-screen w-full object-cover"
        />

        <div className="absolute bottom-6 right-6 flex gap-3">
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            className="rounded border border-white/20 bg-black/70 px-4 py-2 font-mono text-xs text-white transition hover:border-red-500 hover:text-red-400"
          >
            {muted ? "UNMUTE" : "MUTE"}
          </button>
          <button
            type="button"
            onClick={() => setStage("main")}
            className="rounded border border-red-500/60 bg-black/70 px-4 py-2 font-mono text-xs text-red-400 transition hover:bg-red-500 hover:text-black"
          >
            SKIP VIDEO →
          </button>
        </div>
      </main>
    );
  }

  // ---------- STAGE 3: NAVIGATION TABS (hacker.png background) ----------
  return (
    <main
      className="flex min-h-screen flex-col bg-black bg-cover bg-center bg-fixed text-slate-300"
      style={{ backgroundImage: "url('/hacker.png')" }}
    >
      <header className="border-b border-white/[0.08] bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-4 lg:px-10">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 font-mono text-sm font-bold text-red-400">
            VR
          </div>
          <p className="text-sm font-semibold text-white">
            Vantaroot <span className="text-red-500">/</span> Blogs
          </p>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 py-16">
        <h1 className="mb-10 text-center text-3xl font-black tracking-widest text-white sm:text-5xl">
          VANTAROOT<span className="text-red-500"> / </span>BLOGS
        </h1>

        <nav
          aria-label="Writeup categories"
          className="grid w-full gap-4 md:grid-cols-3"
        >
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className="group rounded-xl border border-white/[0.1] bg-black/80 p-6 text-center transition hover:border-red-500/50 hover:bg-red-500/[0.06]"
            >
              <p className="font-mono text-xs text-red-500">/ {tab.tag}</p>
              <p className="mt-3 text-lg font-semibold text-white transition group-hover:text-red-400">
                {tab.label}
              </p>
              <p className="mt-4 text-xs text-slate-500 transition group-hover:text-red-400">
                Open ↗
              </p>
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}