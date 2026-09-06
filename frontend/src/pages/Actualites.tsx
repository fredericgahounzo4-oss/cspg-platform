import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { Actualite } from "../types";
import Reveal from "../components/Reveal";

export default function Actualites() {
  const [items, setItems] = useState<Actualite[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    api
      .getActualites()
      .then((data) => {
        setItems(data.results);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="font-display text-3xl font-extrabold text-ink">Actualités</h1>
      <p className="mt-2 text-ink-soft">Les dernières annonces du complexe.</p>

      {status === "loading" && <p className="mt-8 text-ink-soft">Chargement…</p>}
      {status === "error" && (
        <p className="mt-8 text-crimson">Impossible de charger les actualités pour le moment.</p>
      )}
      {status === "ready" && items.length === 0 && (
        <p className="mt-8 text-ink-soft">Aucune actualité publiée pour le moment.</p>
      )}

      <div className="mt-8 space-y-6">
        {items.map((a, i) => (
          <Reveal key={a.id} delay={(i % 4) * 80}>
            <article className="hover-lift rounded-lg border border-peach bg-white p-6 shadow-sm">
              {a.image && (
                <img src={a.image} alt="" className="mb-4 max-h-64 w-full rounded-md object-cover" />
              )}
              <time className="text-xs font-semibold uppercase tracking-wide text-sky">
                {new Date(a.date_publication).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <h2 className="mt-1 font-display text-xl font-bold text-ink">{a.titre}</h2>
              <p className="mt-2 whitespace-pre-line text-ink-soft">{a.contenu}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
