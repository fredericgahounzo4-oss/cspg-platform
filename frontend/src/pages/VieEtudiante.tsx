import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { Activite } from "../types";
import { GraduationCap, Dumbbell, Drama, PartyPopper } from "lucide-react";
import Reveal from "../components/Reveal";

const CATEGORIES: {
  key: Activite["categorie"];
  label: string;
  accent: string;
  Icon: typeof GraduationCap;
}[] = [
  { key: "club", label: "Clubs", accent: "bg-sky/10 text-sky border-sky/30", Icon: GraduationCap },
  { key: "sport", label: "Sport", accent: "bg-leaf/10 text-leaf-dark border-leaf/30", Icon: Dumbbell },
  { key: "culture", label: "Culture", accent: "bg-crimson/10 text-crimson border-crimson/30", Icon: Drama },
  { key: "evenement", label: "Événements", accent: "bg-peach/40 text-ink border-peach", Icon: PartyPopper },
];

const CHIFFRES = [
  { valeur: "8", label: "séries générales & techniques" },
  { valeur: "10+", label: "clubs et activités" },
  { valeur: "2", label: "diplômes préparés (BT, CAP)" },
  { valeur: "6j/7", label: "vie scolaire animée" },
];

export default function VieEtudiante() {
  const [activites, setActivites] = useState<Activite[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    api
      .getActivites()
      .then((data) => {
        setActivites(data.results);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div>
      {/* En-tête */}
      <section className="relative overflow-hidden bg-ink">
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-crimson/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-sky/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 text-center">
          <h1 className="animate-fade-up font-display text-3xl font-extrabold text-white sm:text-4xl">
            La vie étudiante à La Grâce
          </h1>
          <p className="animate-fade-up delay-1 mx-auto mt-4 max-w-2xl text-white/80">
            Au-delà des cours, le C.S.P.G La Grâce cultive l'épanouissement de chaque élève à
            travers ses clubs, ses activités sportives, culturelles et ses grands événements
            de l'année scolaire.
          </p>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="relative mx-auto -mt-8 max-w-6xl px-5">
        <div className="grid grid-cols-2 gap-4 rounded-xl bg-white p-6 shadow-lg ring-1 ring-black/[0.03] sm:grid-cols-4">
          {CHIFFRES.map((c) => (
            <div key={c.label} className="text-center">
              <p className="font-display text-2xl font-extrabold text-crimson sm:text-3xl">
                {c.valeur}
              </p>
              <p className="mt-1 text-xs font-medium text-ink-soft">{c.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Activités */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <Reveal>
          <h2 className="font-display text-2xl font-extrabold text-ink">
            Clubs, sports, culture & événements
          </h2>
          <p className="mt-2 max-w-2xl text-ink-soft">
            Chaque élève est encouragé à rejoindre au moins une activité extrascolaire. Elles
            sont encadrées par des enseignants et animateurs du complexe.
          </p>
        </Reveal>

        {status === "loading" && <p className="mt-8 text-ink-soft">Chargement…</p>}
        {status === "error" && (
          <p className="mt-8 text-crimson">
            Impossible de charger la vie étudiante pour le moment. Le serveur est peut-être
            indisponible.
          </p>
        )}
        {status === "ready" && activites.length === 0 && (
          <p className="mt-8 text-ink-soft">
            Aucune activité publiée pour le moment. Revenez bientôt !
          </p>
        )}

        {status === "ready" && activites.length > 0 && (
          <div className="mt-8 space-y-12">
            {CATEGORIES.map(({ key, label, accent, Icon }) => {
              const items = activites.filter((a) => a.categorie === key);
              if (items.length === 0) return null;
              return (
                <div key={key}>
                  <Reveal>
                    <h3 className="font-display text-lg font-bold text-ink">{label}</h3>
                  </Reveal>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((a, i) => (
                      <Reveal key={a.id} delay={(i % 3) * 100}>
                        <div
                          className={`hover-lift h-full overflow-hidden rounded-lg border bg-white shadow-sm ${accent}`}
                        >
                          {a.image ? (
                            <img src={a.image} alt="" className="h-36 w-full object-cover" />
                          ) : (
                            <div className="grid h-36 w-full place-items-center bg-gradient-to-br from-white to-current/10">
                              <Icon className="h-10 w-10" strokeWidth={1.5} />
                            </div>
                          )}
                          <div className="p-4">
                            <h4 className="font-display text-sm font-bold text-ink">{a.titre}</h4>
                            {a.description && (
                              <p className="mt-1 text-sm text-ink-soft">{a.description}</p>
                            )}
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-leaf">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="relative mx-auto max-w-6xl px-5 py-10 text-center text-white">
          <h2 className="font-display text-xl font-extrabold">
            Envie de rejoindre la grande famille La Grâce ?
          </h2>
          <p className="mt-1 text-sm text-white/85">
            Fais ta pré-inscription dès aujourd'hui et intègre la vie du complexe.
          </p>
          <a
            href="/inscription"
            className="mt-5 inline-block rounded-md bg-white px-5 py-3 font-display text-sm font-bold text-leaf-dark shadow transition-all hover:-translate-y-0.5 hover:bg-cream hover:shadow-lg"
          >
            Faire une pré-inscription
          </a>
        </div>
      </section>
    </div>
  );
}
