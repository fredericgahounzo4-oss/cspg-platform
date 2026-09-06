import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, GraduationCap } from "lucide-react";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "À propos" },
  { to: "/series", label: "Séries" },
  { to: "/vie-etudiante", label: "Vie Étudiante" },
  { to: "/galerie", label: "Galerie" },
  { to: "/actualites", label: "Actualités" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b-4 border-leaf bg-cream/95 backdrop-blur transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-2.5">
        <NavLink
          to="/"
          className="flex shrink-0 items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-sky bg-white text-sky shadow-sm">
            <GraduationCap className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <span className="leading-tight">
            <span className="block whitespace-nowrap font-display text-base font-extrabold text-sky">
              C.S.P.G
            </span>
            <span className="block whitespace-nowrap font-display text-[11px] font-semibold tracking-wide text-crimson">
              LA GRÂCE
            </span>
          </span>
        </NavLink>

        <nav className="hidden min-w-0 items-center gap-0.5 md:flex lg:gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative whitespace-nowrap rounded-md px-1.5 py-2 font-body text-xs font-medium transition-colors lg:px-2.5 lg:text-[13px] ${
                  isActive ? "text-crimson" : "text-ink-soft hover:text-sky"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span
                    className={`absolute inset-x-1.5 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-crimson transition-transform duration-300 lg:inset-x-2.5 ${
                      isActive ? "scale-x-100" : ""
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
          <NavLink
            to="/inscription"
            className={({ isActive }) =>
              `ml-1 shrink-0 whitespace-nowrap rounded-md px-2.5 py-2 font-display text-xs font-bold text-white shadow transition-all hover:-translate-y-0.5 hover:shadow-lg lg:px-4 lg:text-[13px] ${
                isActive ? "bg-crimson-dark" : "bg-crimson hover:bg-crimson-dark"
              }`
            }
          >
            Pré-inscription
          </NavLink>
        </nav>

        <button
          className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-ink-soft/30 transition-colors hover:bg-peach-light md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Ouvrir le menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5 text-ink" /> : <Menu className="h-5 w-5 text-ink" />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-peach bg-cream transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-96" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 py-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "bg-peach-light text-crimson" : "text-ink-soft hover:bg-peach-light/60"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/inscription"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-md bg-crimson px-3 py-2 text-center font-display text-sm font-bold text-white shadow"
          >
            Pré-inscription
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
