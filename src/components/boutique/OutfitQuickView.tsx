"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Tenue } from "@/types/tenue";
import { useCart } from "@/components/cart/CartProvider";

interface OutfitQuickViewProps {
  tenue: Tenue | null;
  onClose: () => void;
}

export function OutfitQuickView({ tenue, onClose }: OutfitQuickViewProps) {
  const { addItem } = useCart();
  const [quantite, setQuantite] = useState(1);
  const panelRef = useRef<HTMLDivElement>(null);
  const isOpen = tenue !== null;

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!tenue) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Fermer la fiche tenue"
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={tenue.nom}
        tabIndex={-1}
        className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-y-auto bg-dc-bg sm:flex-row"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-dc-bg/80 text-2xl leading-none text-dc-white hover:text-dc-accent"
        >
          ×
        </button>

        <div className="relative aspect-square w-full shrink-0 bg-dc-bg-light sm:w-3/5">
          {tenue.image ? (
            <Image
              src={tenue.image}
              alt={tenue.nom}
              fill
              unoptimized
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-heading text-4xl text-dc-white/15">
              DC
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-8">
          {tenue.collection && (
            <p className="font-sans text-xs uppercase tracking-widest text-dc-white/40">
              {tenue.collection}
            </p>
          )}
          <h2 className="mt-1 font-heading text-2xl uppercase tracking-wide text-dc-white">
            {tenue.nom}
          </h2>
          <p className="mt-2 font-sans text-lg text-dc-accent">
            {tenue.prixAffiche}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {tenue.sexe && <Tag>{tenue.sexe}</Tag>}
            {tenue.couleurs.map((c) => (
              <Tag key={c}>{c}</Tag>
            ))}
            {tenue.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          {!tenue.disponible && (
            <p className="mt-4 font-sans text-sm text-dc-white/60">
              Cette tenue n&apos;est actuellement pas disponible à la commande.
            </p>
          )}

          <div className="mt-auto flex items-center gap-4 pt-8">
            <div
              className="flex items-center border border-dc-white/20"
              role="group"
              aria-label="Quantité"
            >
              <button
                type="button"
                onClick={() => setQuantite((q) => Math.max(1, q - 1))}
                className="flex h-11 w-11 items-center justify-center text-dc-white hover:text-dc-accent"
                aria-label="Diminuer la quantité"
              >
                −
              </button>
              <span className="w-8 text-center tabular-nums">{quantite}</span>
              <button
                type="button"
                onClick={() => setQuantite((q) => Math.min(99, q + 1))}
                className="flex h-11 w-11 items-center justify-center text-dc-white hover:text-dc-accent"
                aria-label="Augmenter la quantité"
              >
                +
              </button>
            </div>

            <button
              type="button"
              disabled={!tenue.disponible}
              onClick={() => {
                addItem(tenue, quantite);
                onClose();
              }}
              className="min-h-11 flex-1 bg-dc-accent px-6 font-sans text-sm uppercase tracking-wide text-dc-white transition-colors hover:bg-dc-white hover:text-dc-bg disabled:cursor-not-allowed disabled:opacity-40"
            >
              {tenue.disponible ? "Ajouter au panier" : "Indisponible"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-dc-white/15 px-3 py-1 font-sans text-xs text-dc-white/70">
      {children}
    </span>
  );
}
