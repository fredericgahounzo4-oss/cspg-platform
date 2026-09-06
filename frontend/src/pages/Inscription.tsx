import { useEffect, useState, type FormEvent } from "react";
import { api } from "../api/client";
import type { Serie } from "../types";

const initialForm = {
  nom: "",
  prenom: "",
  date_naissance: "",
  telephone: "",
  email: "",
  serie_souhaitee: "",
  classe_precedente: "",
  message: "",
};

export default function Inscription() {
  const [series, setSeries] = useState<Serie[]>([]);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    api.getSeries().then((data) => setSeries(data.results)).catch(() => {});
  }, []);

  function update<K extends keyof typeof initialForm>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setResult("idle");
    try {
      await api.submitInscription({
        nom: form.nom,
        prenom: form.prenom,
        date_naissance: form.date_naissance || undefined,
        telephone: form.telephone,
        email: form.email || undefined,
        serie_souhaitee: form.serie_souhaitee ? Number(form.serie_souhaitee) : null,
        classe_precedente: form.classe_precedente || undefined,
        message: form.message || undefined,
      });
      setResult("success");
      setForm(initialForm);
    } catch {
      setResult("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="font-display text-3xl font-extrabold text-ink">Pré-inscription</h1>
      <p className="mt-2 text-ink-soft">
        Remplissez ce formulaire ; notre équipe vous rappellera pour finaliser l'inscription.
      </p>

      {result === "success" && (
        <div className="mt-6 rounded-md border border-leaf bg-leaf/10 p-4 text-leaf-dark">
          Votre demande a bien été envoyée. Nous vous contacterons très prochainement.
        </div>
      )}
      {result === "error" && (
        <div className="mt-6 rounded-md border border-crimson bg-crimson/10 p-4 text-crimson-dark">
          Une erreur est survenue lors de l'envoi. Merci de réessayer, ou de nous appeler directement.
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nom" required>
            <input
              required
              className="input"
              value={form.nom}
              onChange={(e) => update("nom", e.target.value)}
            />
          </Field>
          <Field label="Prénom" required>
            <input
              required
              className="input"
              value={form.prenom}
              onChange={(e) => update("prenom", e.target.value)}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Date de naissance">
            <input
              type="date"
              className="input"
              value={form.date_naissance}
              onChange={(e) => update("date_naissance", e.target.value)}
            />
          </Field>
          <Field label="Téléphone" required>
            <input
              required
              type="tel"
              placeholder="+228 ..."
              className="input"
              value={form.telephone}
              onChange={(e) => update("telephone", e.target.value)}
            />
          </Field>
        </div>

        <Field label="Email (optionnel)">
          <input
            type="email"
            className="input"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Série souhaitée">
            <select
              className="input"
              value={form.serie_souhaitee}
              onChange={(e) => update("serie_souhaitee", e.target.value)}
            >
              <option value="">— Sélectionner —</option>
              {series.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code} — {s.nom}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Classe précédente">
            <input
              className="input"
              placeholder="Ex: 3ème, 2nde..."
              value={form.classe_precedente}
              onChange={(e) => update("classe_precedente", e.target.value)}
            />
          </Field>
        </div>

        <Field label="Message (optionnel)">
          <textarea
            className="input min-h-28"
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
          />
        </Field>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-crimson px-5 py-3 font-display text-sm font-bold text-white shadow hover:bg-crimson-dark disabled:opacity-60"
        >
          {submitting ? "Envoi en cours…" : "Envoyer la demande"}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-crimson"> *</span>}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
