export default function Footer() {
  return (
    <footer className="mt-20 border-t-4 border-leaf bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-8 sm:grid-cols-4 sm:gap-4">
        <div>
          <h3 className="font-display text-base font-extrabold text-sky">C.S.P.G — LA GRÂCE</h3>
          <p className="mt-2 max-w-xs text-xs text-cream/70">
            Lycée d'enseignement technique et moderne. Vision · Discipline · Accomplissement.
          </p>
        </div>
        <div>
          <h4 className="font-display text-xs font-bold uppercase tracking-wide text-crimson">
            Liens rapides
          </h4>
          <ul className="mt-2 space-y-1 text-xs text-cream/80">
            <li>
              <a href="/a-propos" className="hover:text-sky">À propos</a>
            </li>
            <li>
              <a href="/series" className="hover:text-sky">Séries & filières</a>
            </li>
            <li>
              <a href="/vie-etudiante" className="hover:text-sky">Vie étudiante</a>
            </li>
            <li>
              <a href="/galerie" className="hover:text-sky">Galerie</a>
            </li>
            <li>
              <a href="/actualites" className="hover:text-sky">Actualités</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-xs font-bold uppercase tracking-wide text-crimson">
            Contact
          </h4>
          <ul className="mt-2 space-y-1 text-xs text-cream/80">
            <li>+228 90 16 95 16</li>
            <li>+228 98 74 69 46</li>
            <li>+228 91 50 96 69</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-xs font-bold uppercase tracking-wide text-crimson">
            Diplômes préparés
          </h4>
          <p className="mt-2 text-xs text-cream/80">
            Brevet de Technicien (BT) · Certificat d'Aptitude Professionnelle (CAP)
          </p>
        </div>
      </div>
      <div className="border-t border-cream/10 px-5 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Complexe Scolaire Polyvalent La Grâce (C.S.P.G)
      </div>
    </footer>
  );
}
