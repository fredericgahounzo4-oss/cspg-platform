import type { Serie } from "../types";

export default function SerieCard({ serie }: { serie: Serie }) {
  const accent = serie.cycle === "technique" ? "border-crimson text-crimson" : "border-sky text-sky";
  return (
    <div className="hover-lift flex gap-4 rounded-lg border border-peach bg-white p-5 shadow-sm">
      <div
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 font-display text-sm font-extrabold ${accent}`}
      >
        {serie.code}
      </div>
      <div>
        <h3 className="font-display text-base font-bold text-ink">{serie.nom}</h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-soft/60">
          {serie.cycle === "technique" ? "Enseignement Technique" : "Enseignement Général"}
        </p>
        {serie.description && (
          <p className="mt-2 text-sm text-ink-soft">{serie.description}</p>
        )}
      </div>
    </div>
  );
}
