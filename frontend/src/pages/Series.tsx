import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { Serie } from "../types";
import SerieCard from "../components/SerieCard";
import Reveal from "../components/Reveal";

export default function Series() {
  const [series, setSeries] = useState<Serie[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    api
      .getSeries()
      .then((data) => {
        setSeries(data.results);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  const generales = series.filter((s) => s.cycle === "general");
  const techniques = series.filter((s) => s.cycle === "technique");

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="animate-fade-up font-display text-3xl font-extrabold text-ink">
        Séries & filières
      </h1>
      <p className="animate-fade-up delay-1 mt-2 max-w-2xl text-ink-soft">
        Le C.S.P.G La Grâce propose un enseignement général et un enseignement technique,
        chacun menant à des diplômes reconnus (BT, CAP).
      </p>

      {status === "loading" && <p className="mt-8 text-ink-soft">Chargement des séries…</p>}
      {status === "error" && (
        <p className="mt-8 text-crimson">
          Impossible de charger les séries pour le moment. Le serveur est peut-être indisponible.
        </p>
      )}

      {status === "ready" && (
        <div className="mt-10 space-y-12">
          <div>
            <h2 className="font-display text-lg font-bold text-sky">Enseignement Général</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {generales.map((s, i) => (
                <Reveal key={s.id} delay={(i % 4) * 80}>
                  <SerieCard serie={s} />
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-crimson">Enseignement Technique</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {techniques.map((s, i) => (
                <Reveal key={s.id} delay={(i % 4) * 80}>
                  <SerieCard serie={s} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
