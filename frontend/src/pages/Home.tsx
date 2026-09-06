import { Link } from "react-router-dom";
import { GraduationCap, Dumbbell, Drama, Phone, ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";

const highlights = [
  { code: "A4", label: "Lettres et Philosophie" },
  { code: "S", label: "Sciences (C4 et D)" },
  { code: "G1", label: "Organisation Admin. de Secrétariat" },
  { code: "G2", label: "Techniques Quantitatives de Gestion" },
  { code: "G3", label: "Techniques Commerciales" },
  { code: "F2", label: "Electronique" },
  { code: "F3", label: "Electrotechnique" },
  { code: "F4", label: "Génie Civil" },
];

const chiffres = [
  { valeur: "8", label: "séries & filières" },
  { valeur: "10+", label: "clubs et activités" },
  { valeur: "2", label: "diplômes préparés" },
  { valeur: "3", label: "lignes de contact directes" },
];

const vieEtudiante = [
  { Icon: GraduationCap, titre: "Clubs académiques", desc: "Sciences, anglais, informatique…" },
  { Icon: Dumbbell, titre: "Sport", desc: "Football, basketball, athlétisme…" },
  { Icon: Drama, titre: "Culture", desc: "Chorale, théâtre, journée culturelle…" },
];

export default function Home() {
  return (
    <div>
      {/* Hero — photo plein cadre avec dégradé sombre, titre + trait d'accent en bas à gauche */}
      <section
        className="relative flex min-h-[460px] items-end bg-cover bg-center sm:min-h-[540px]"
        style={{ backgroundImage: "url(/hero-eleves.png)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-6 px-5 pb-10 pt-24 sm:grid-cols-[auto_1fr] sm:items-end sm:gap-12 sm:pb-14">
          <div className="animate-fade-up">
            <h1 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Se former à La Grâce
            </h1>
            <span className="mt-3 block h-1 w-20 rounded-full bg-leaf" />
          </div>
          <div className="animate-fade-up delay-1">
            <p className="max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
              Le Complexe Scolaire Polyvalent La Grâce prépare ses élèves au Brevet de
              Technicien (BT) et au Certificat d'Aptitude Professionnelle (CAP), à travers
              huit séries générales et techniques — dans un cadre fondé sur la vision, la
              discipline et l'accomplissement.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/inscription"
                className="group flex items-center gap-2 rounded-md bg-crimson px-5 py-3 font-display text-sm font-bold text-white shadow-lg shadow-crimson/20 transition-all hover:-translate-y-0.5 hover:bg-crimson-dark hover:shadow-xl"
              >
                Faire une pré-inscription
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/series"
                className="rounded-md border-2 border-white px-5 py-3 font-display text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
              >
                Découvrir les séries
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="mx-auto -mt-8 max-w-6xl px-5">
        <div className="animate-fade-up delay-2 grid grid-cols-2 gap-4 rounded-xl bg-white p-6 shadow-xl ring-1 ring-black/[0.03] sm:grid-cols-4">
          {chiffres.map((c) => (
            <div key={c.label} className="text-center">
              <p className="font-display text-2xl font-extrabold text-crimson sm:text-3xl">
                {c.valeur}
              </p>
              <p className="mt-1 text-xs font-medium text-ink-soft">{c.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Séries en un coup d'œil */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-extrabold text-ink">Nos séries & filières</h2>
            <Link
              to="/series"
              className="flex items-center gap-1 text-sm font-semibold text-sky hover:underline"
            >
              Voir le détail <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {highlights.map((s, i) => (
            <Reveal key={s.code} delay={(i % 4) * 80}>
              <div className="hover-lift h-full rounded-lg border border-peach bg-white p-4 text-center shadow-sm">
                <div className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full bg-sky/10 font-display text-sm font-extrabold text-sky">
                  {s.code}
                </div>
                <p className="text-xs font-medium text-ink-soft">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Vie étudiante — teaser */}
      <section className="bg-peach-light">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-extrabold text-ink">La vie étudiante</h2>
              <Link
                to="/vie-etudiante"
                className="flex items-center gap-1 text-sm font-semibold text-crimson hover:underline"
              >
                Tout voir <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-2 max-w-2xl text-ink-soft">
              Clubs, sport, culture et grands événements rythment l'année scolaire à La Grâce.
            </p>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {vieEtudiante.map((v, i) => (
              <Reveal key={v.titre} delay={i * 100}>
                <Link
                  to="/vie-etudiante"
                  className="hover-lift block h-full rounded-lg bg-white p-5 shadow-sm"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-crimson/10 text-crimson">
                    <v.Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="mt-3 font-display text-sm font-bold text-ink">{v.titre}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{v.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bandeau contact rapide */}
      <section className="relative overflow-hidden bg-leaf">
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-white">
          <div className="flex items-center gap-3">
            <div className="hidden h-11 w-11 shrink-0 place-items-center rounded-full bg-white/15 sm:grid">
              <Phone className="h-5 w-5" strokeWidth={2} />
            </div>
            <div>
              <h2 className="font-display text-xl font-extrabold">
                Une question ? Contactez-nous directement.
              </h2>
              <p className="mt-1 text-sm text-white/80">
                Notre équipe répond du lundi au samedi.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 font-display text-sm font-bold">
            <a
              href="tel:+22890169516"
              className="rounded-md bg-white px-4 py-2 text-leaf-dark shadow transition-transform hover:-translate-y-0.5"
            >
              +228 90 16 95 16
            </a>
            <a
              href="tel:+22898746946"
              className="rounded-md bg-white/10 px-4 py-2 transition-colors hover:bg-white/20"
            >
              +228 98 74 69 46
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
