import { Link } from "react-router-dom";
import { Target, Ruler, Trophy, BookOpen, Wrench, ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";

const valeurs = [
  {
    Icon: Target,
    titre: "Vision",
    desc: "Former des citoyens compétents, disciplinés et responsables, prêts à réussir dans la vie active ou les études supérieures.",
    color: "text-sky bg-sky/10",
  },
  {
    Icon: Ruler,
    titre: "Discipline",
    desc: "Un cadre structuré et exigeant, condition d'un apprentissage sérieux et durable.",
    color: "text-crimson bg-crimson/10",
  },
  {
    Icon: Trophy,
    titre: "Accomplissement",
    desc: "Accompagner chaque élève vers la réussite, à son rythme et selon ses talents.",
    color: "text-leaf bg-leaf/10",
  },
];

export default function Apropos() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-sky/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-crimson/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 py-20 text-center">
          <h1 className="animate-fade-up font-display text-3xl font-extrabold text-white sm:text-4xl">
            À propos du C.S.P.G La Grâce
          </h1>
          <p className="animate-fade-up delay-1 mx-auto mt-4 max-w-2xl text-white/80">
            Un complexe scolaire polyvalent au service de la réussite de ses élèves, à travers
            un enseignement général et technique de qualité.
          </p>
        </div>
      </section>

      {/* Histoire */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <Reveal>
          <h2 className="font-display text-2xl font-extrabold text-ink">Notre établissement</h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-4 leading-relaxed text-ink-soft">
            Le Complexe Scolaire Polyvalent (C.S.P.G) La Grâce accueille des élèves dans huit
            séries générales et techniques, du niveau secondaire jusqu'aux diplômes du Brevet
            de Technicien (BT) et du Certificat d'Aptitude Professionnelle (CAP).
            L'établissement combine enseignement académique et formation pratique pour préparer
            les élèves aussi bien à la poursuite d'études supérieures qu'à une insertion directe
            dans la vie active.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-4 leading-relaxed text-ink-soft">
            Au-delà des salles de classe, la vie scolaire à La Grâce s'organise autour de clubs,
            d'activités sportives et culturelles, et d'événements qui rythment l'année et
            renforcent l'esprit de communauté entre élèves et enseignants.
          </p>
        </Reveal>
      </section>

      {/* Valeurs */}
      <section className="bg-peach-light">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold text-ink">Nos valeurs</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {valeurs.map((v, i) => (
              <Reveal key={v.titre} delay={i * 120}>
                <div className="hover-lift h-full rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/[0.03]">
                  <div className={`grid h-12 w-12 place-items-center rounded-full ${v.color}`}>
                    <v.Icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">{v.titre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Offre */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <Reveal>
          <h2 className="font-display text-2xl font-extrabold text-ink">Ce que nous offrons</h2>
        </Reveal>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Reveal delay={0}>
            <div className="hover-lift h-full rounded-xl border border-peach bg-white p-6">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-sky/10 text-sky">
                <BookOpen className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="mt-3 font-display text-sm font-bold text-sky">
                Enseignement général
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                Séries A4, S, G1, G2, G3 — pour les élèves se dirigeant vers les études
                supérieures ou les métiers de gestion et d'administration.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="hover-lift h-full rounded-xl border border-peach bg-white p-6">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-crimson/10 text-crimson">
                <Wrench className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="mt-3 font-display text-sm font-bold text-crimson">
                Enseignement technique
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                Séries F2, F3, F4 — électronique, électrotechnique et génie civil, avec une forte
                composante pratique.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-leaf">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="relative mx-auto max-w-6xl px-5 py-14 text-center text-white">
          <h2 className="font-display text-xl font-extrabold sm:text-2xl">
            Envie de nous rejoindre ?
          </h2>
          <p className="mt-1 text-sm text-white/85">
            Découvrez nos séries ou faites directement votre pré-inscription.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/series"
              className="rounded-md border-2 border-white px-5 py-3 font-display text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
            >
              Voir les séries
            </Link>
            <Link
              to="/inscription"
              className="group flex items-center gap-2 rounded-md bg-white px-5 py-3 font-display text-sm font-bold text-leaf-dark shadow transition-all hover:-translate-y-0.5 hover:bg-cream hover:shadow-lg"
            >
              Faire une pré-inscription
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
