import Link from "next/link";

type WriteupGridProps = {
  title: string;
  subtitle: string;
  count?: number;
};

export default function WriteupGrid({
  title,
  subtitle,
  count = 20,
}: WriteupGridProps) {
  const cards = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <main
      className="min-h-screen bg-black bg-cover bg-center bg-fixed text-slate-300"
      style={{ backgroundImage: "url('/hacker.png')" }}
    >
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-black/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 font-mono text-sm font-bold text-red-400">
              VR
            </div>
            <p className="text-sm font-semibold text-white">
              Vantaroot <span className="text-red-500">/</span> Blogs
            </p>
          </Link>

          <Link
            href="/"
            className="rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-400 transition hover:border-red-500/30 hover:text-red-400"
          >
            ← Back
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-10">
        <p className="font-mono text-xs tracking-[0.25em] text-red-500">
          / {subtitle}
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-5xl">
          {title}
        </h1>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map((n) => (
            <article
              key={n}
              aria-label={`Empty card ${n}`}
              className="group flex min-h-[200px] flex-col justify-between rounded-xl border border-white/[0.08] bg-black/80 p-5 transition hover:-translate-y-1 hover:border-red-500/40"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-red-500">
                  / {String(n).padStart(2, "0")}
                </span>
                <span className="h-2 w-2 rounded-full bg-white/20 transition group-hover:bg-red-500" />
              </div>

              <div className="space-y-2">
                <div className="h-3 w-3/4 rounded bg-white/[0.06]" />
                <div className="h-3 w-1/2 rounded bg-white/[0.04]" />
              </div>

              <p className="font-mono text-[10px] tracking-widest text-slate-600">
                COMING SOON
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}