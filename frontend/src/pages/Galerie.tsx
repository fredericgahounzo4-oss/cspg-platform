import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { Photo } from "../types";

export default function Galerie() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [selected, setSelected] = useState<Photo | null>(null);

  useEffect(() => {
    api
      .getGalerie()
      .then((data) => {
        setPhotos(data.results);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="animate-fade-up font-display text-3xl font-extrabold text-ink">
        Galerie photos
      </h1>
      <p className="animate-fade-up delay-1 mt-2 max-w-2xl text-ink-soft">
        Un aperçu du quotidien au C.S.P.G La Grâce : bâtiments, cours, activités et
        événements.
      </p>

      {status === "loading" && <p className="mt-8 text-ink-soft">Chargement…</p>}
      {status === "error" && (
        <p className="mt-8 text-crimson">
          Impossible de charger la galerie pour le moment. Le serveur est peut-être
          indisponible.
        </p>
      )}
      {status === "ready" && photos.length === 0 && (
        <p className="mt-8 text-ink-soft">
          Aucune photo publiée pour le moment. Revenez bientôt !
        </p>
      )}

      {status === "ready" && photos.length > 0 && (
        <div className="mt-8 columns-2 gap-4 sm:columns-3">
          {photos.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className={`hover-lift animate-fade-up delay-${Math.min((i % 3) + 1, 3)} mb-4 block w-full overflow-hidden rounded-lg border border-peach bg-white shadow-sm`}
            >
              <img src={p.image} alt={p.titre} className="w-full object-cover" />
              {(p.titre || p.legende) && (
                <div className="p-2 text-left">
                  {p.titre && <p className="font-display text-xs font-bold text-ink">{p.titre}</p>}
                  {p.legende && <p className="text-xs text-ink-soft">{p.legende}</p>}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-ink/90 p-5"
          onClick={() => setSelected(null)}
        >
          <div className="max-h-full max-w-3xl">
            <img
              src={selected.image}
              alt={selected.titre}
              className="max-h-[80vh] w-full rounded-lg object-contain"
            />
            {(selected.titre || selected.legende) && (
              <div className="mt-3 text-center text-white">
                {selected.titre && (
                  <p className="font-display text-sm font-bold">{selected.titre}</p>
                )}
                {selected.legende && <p className="text-sm text-white/80">{selected.legende}</p>}
              </div>
            )}
          </div>
          <button
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setSelected(null)}
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
