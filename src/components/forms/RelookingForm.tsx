"use client";

import { useState } from "react";
import { TextField } from "./TextField";
import { TextAreaField } from "./TextAreaField";
import { FormError, FormSuccess } from "./FormStatus";

type Status = "idle" | "submitting" | "success" | "error";

export function RelookingForm() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [objectif, setObjectif] = useState("");
  const [budget, setBudget] = useState("");
  const [informations, setInformations] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (status === "success") {
    return (
      <FormSuccess
        title="Demande envoyée"
        message="Votre demande de relooking a bien été transmise à Dresscode. Vous serez recontacté(e) pour organiser votre rendez-vous."
      />
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/relooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          prenom,
          telephone,
          objectif,
          budget: budget || undefined,
          informations: informations || undefined,
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Une erreur est survenue. Merci de réessayer.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Connexion impossible. Vérifiez votre réseau et réessayez.");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {status === "error" && <FormError message={errorMessage} />}

      <TextField
        label="Nom"
        required
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        maxLength={80}
        autoComplete="family-name"
      />
      <TextField
        label="Prénom"
        required
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
        maxLength={80}
        autoComplete="given-name"
      />
      <TextField
        label="Numéro de téléphone"
        required
        type="tel"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
        maxLength={30}
        autoComplete="tel"
      />
      <TextAreaField
        label="Objectif du relooking"
        required
        value={objectif}
        onChange={(e) => setObjectif(e.target.value)}
        maxLength={400}
        placeholder="Style recherché, occasion, envies…"
      />
      <TextField
        label="Budget indicatif (optionnel)"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        maxLength={100}
      />
      <TextAreaField
        label="Informations complémentaires (optionnel)"
        value={informations}
        onChange={(e) => setInformations(e.target.value)}
        maxLength={1000}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="min-h-12 bg-dc-accent px-6 font-sans text-sm uppercase tracking-wide text-dc-white transition-colors hover:bg-dc-white hover:text-dc-bg disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isSubmitting ? "Envoi en cours…" : "Envoyer la demande"}
      </button>
    </form>
  );
}
