export interface Serie {
  id: number;
  code: string;
  nom: string;
  cycle: "general" | "technique";
  description: string;
  ordre: number;
}

export interface Actualite {
  id: number;
  titre: string;
  contenu: string;
  image: string | null;
  date_publication: string;
}

export interface Activite {
  id: number;
  titre: string;
  categorie: "club" | "sport" | "culture" | "evenement";
  description: string;
  image: string | null;
}

export interface Photo {
  id: number;
  titre: string;
  image: string;
  legende: string;
}

export interface InscriptionPayload {
  nom: string;
  prenom: string;
  date_naissance?: string;
  telephone: string;
  email?: string;
  serie_souhaitee?: number | null;
  classe_precedente?: string;
  message?: string;
}

export interface ContactPayload {
  nom: string;
  email?: string;
  telephone?: string;
  sujet?: string;
  message: string;
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
