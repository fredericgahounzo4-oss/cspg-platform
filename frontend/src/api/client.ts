import type {
  Serie,
  Actualite,
  Activite,
  Photo,
  InscriptionPayload,
  ContactPayload,
  Paginated,
} from "../types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Erreur API (${res.status}) : ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  getSeries: () => request<Paginated<Serie>>("/series/"),
  getActualites: () => request<Paginated<Actualite>>("/actualites/"),
  getActivites: () => request<Paginated<Activite>>("/vie-etudiante/"),
  getGalerie: () => request<Paginated<Photo>>("/galerie/"),
  submitInscription: (payload: InscriptionPayload) =>
    request<InscriptionPayload & { id: number }>("/inscriptions/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  submitContact: (payload: ContactPayload) =>
    request<ContactPayload & { id: number }>("/contact/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
