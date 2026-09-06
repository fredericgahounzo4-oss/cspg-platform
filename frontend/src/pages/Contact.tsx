import { useState, type FormEvent } from "react";
import { api } from "../api/client";

const initialForm = { nom: "", email: "", telephone: "", sujet: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<"idle" | "success" | "error">("idle");

  function update<K extends keyof typeof initialForm>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setResult("idle");
    try {
      await api.submitContact(form);
      setResult("success");
      setForm(initialForm);
    } catch {
      setResult("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="font-display text-3xl font-extrabold text-ink">Contact</h1>
      <p className="mt-2 text-ink-soft">Une question ? Écrivez-nous ou appelez-nous directement.</p>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-lg font-bold text-sky">Coordonnées</h2>
          <ul className="mt-3 space-y-2 text-ink-soft">
            <li>
              <a href="tel:+22890169516" className="font-semibold text-crimson">
                +228 90 16 95 16
              </a>
            </li>
            <li>
              <a href="tel:+22898746946" className="font-semibold text-crimson">
                +228 98 74 69 46
              </a>
            </li>
            <li>
              <a href="tel:+22891509669" className="font-semibold text-crimson">
                +228 91 50 96 69
              </a>
            </li>
          </ul>

          {result === "success" && (
            <div className="mt-6 rounded-md border border-leaf bg-leaf/10 p-4 text-leaf-dark">
              Message envoyé. Merci, nous vous répondrons rapidement.
            </div>
          )}
          {result === "error" && (
            <div className="mt-6 rounded-md border border-crimson bg-crimson/10 p-4 text-crimson-dark">
              L'envoi a échoué. Merci de réessayer ou de nous appeler.
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            placeholder="Nom complet"
            className="input"
            value={form.nom}
            onChange={(e) => update("nom", e.target.value)}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="email"
              placeholder="Email (optionnel)"
              className="input"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
            <input
              type="tel"
              placeholder="Téléphone (optionnel)"
              className="input"
              value={form.telephone}
              onChange={(e) => update("telephone", e.target.value)}
            />
          </div>
          <input
            placeholder="Sujet"
            className="input"
            value={form.sujet}
            onChange={(e) => update("sujet", e.target.value)}
          />
          <textarea
            required
            placeholder="Votre message"
            className="input min-h-32"
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-sky px-5 py-3 font-display text-sm font-bold text-white shadow hover:bg-sky-dark disabled:opacity-60"
          >
            {submitting ? "Envoi en cours…" : "Envoyer le message"}
          </button>
        </form>
      </div>
    </div>
  );
}
