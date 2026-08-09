"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { TextField } from "./TextField";
import { TextAreaField } from "./TextAreaField";
import { FormError, FormSuccess } from "./FormStatus";

type Status = "idle" | "submitting" | "success" | "error";

export function OrderForm() {
  const { items, totalPrix, hasUnpricedItem, clearCart } = useCart();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [informations, setInformations] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (status === "success") {
    return (
      <FormSuccess
        title="Commande envoyée"
        message="Votre commande a bien été transmise à Dresscode. Vous serez recontacté(e) pour convenir d'un rendez-vous d'essayage au local."
      />
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          prenom,
          telephone,
          informations: informations || undefined,
          items: items.map((item) => ({
            nom: item.nom,
            quantite: item.quantite,
            prix: item.prix,
          })),
          total: totalPrix,
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Une erreur est survenue. Merci de réessayer.");
        return;
      }
      setStatus("success");
      clearCart();
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
        label="Informations complémentaires (optionnel)"
        value={informations}
        onChange={(e) => setInformations(e.target.value)}
        maxLength={1000}
        placeholder="Taille, couleur préférée, disponibilités…"
      />

      <div className="flex items-center justify-between border-t border-dc-white/10 pt-5">
        <span className="font-sans text-sm text-dc-white/60">Total</span>
        <span className="font-heading text-xl text-dc-white">
          {totalPrix.toLocaleString("fr-FR")} $
          {hasUnpricedItem && (
            <span className="ml-1 text-xs font-sans text-dc-white/50">+ articles sur devis</span>
          )}
        </span>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || items.length === 0}
        className="min-h-12 bg-dc-accent px-6 font-sans text-sm uppercase tracking-wide text-dc-white transition-colors hover:bg-dc-white hover:text-dc-bg disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isSubmitting ? "Envoi en cours…" : "Valider la commande"}
      </button>
    </form>
  );
}
