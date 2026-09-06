# Plateforme — Complexe Scolaire Polyvalent La Grâce (C.S.P.G)

Site public + espace de gestion interne pour le C.S.P.G La Grâce.

- **Frontend** : React + TypeScript (Vite, Tailwind CSS, React Router)
- **Backend** : Django + Django REST Framework (API), avec **Django Admin**
  comme espace de gestion interne (aucune authentification à construire
  côté frontend : le personnel se connecte sur `/admin`).

## Structure

```
cspg-platform/
├── backend/     # Projet Django (API + admin)
└── frontend/    # Application React + TypeScript
```

## Fonctionnalités livrées (v1)

- Page d'accueil présentant l'école (reprend les couleurs et le style du
  panneau : bleu, magenta, cadre vert).
- Page **Séries & filières** listant les 8 séries (A4, S, G1, G2, G3, F2,
  F3, F4), chargées depuis l'API.
- Page **Actualités** (annonces publiées depuis l'admin).
- Formulaire de **pré-inscription** public (enregistré en base, visible et
  gérable dans l'admin).
- Formulaire de **contact** public.
- **Espace de gestion interne** = Django Admin (`/admin`) : gérer les
  séries, publier des actualités, traiter les pré-inscriptions et les
  messages de contact.

## Démarrage — Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows : venv\Scripts\activate
pip install -r requirements.txt

python manage.py migrate
python manage.py seed_series    # pré-remplit les 8 séries
python manage.py createsuperuser
python manage.py runserver 8000
```

L'API est disponible sur `http://127.0.0.1:8000/api/` et l'admin sur
`http://127.0.0.1:8000/admin/`.

Un superutilisateur de démonstration a déjà été créé lors du build :
- **utilisateur** : `admin`
- **mot de passe** : `changeme123`

**⚠️ Changez ce mot de passe (ou recréez un superutilisateur) avant toute
mise en production.**

## Démarrage — Frontend

```bash
cd frontend
cp .env.example .env    # ajustez VITE_API_URL si besoin
npm install
npm run dev
```

Le site est disponible sur `http://127.0.0.1:5173/`.

## Endpoints API principaux

| Méthode | URL                    | Description                          |
|---------|------------------------|---------------------------------------|
| GET     | `/api/series/`         | Liste des séries actives              |
| GET     | `/api/actualites/`     | Liste des actualités publiées         |
| POST    | `/api/inscriptions/`   | Soumettre une pré-inscription         |
| POST    | `/api/contact/`        | Envoyer un message de contact         |

## Prochaines étapes possibles

- Gestion des notes/bulletins et emploi du temps (nécessiterait un espace
  de connexion élèves/parents avec authentification par token).
- Suivi des paiements de scolarité.
- Déploiement (ex : backend sur Railway/Render, frontend sur Vercel/Netlify,
  variables d'environnement `DJANGO_ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`,
  `VITE_API_URL` à adapter).
