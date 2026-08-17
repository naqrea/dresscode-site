"use client";

import Image from "next/image";
import type { CartItem } from "@/types/cart";
import { useCart } from "./CartProvider";

export function CartItemRow({ item }: { item: CartItem }) {
  const { setQuantite, removeItem } = useCart();

  return (
    <li className="flex gap-4 py-4">
      <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-dc-bg-light">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.nom}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-heading text-xs text-dc-white/40">
            DC
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <p className="font-sans text-sm text-dc-white">{item.nom}</p>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            aria-label={`Retirer ${item.nom} du panier`}
            className="text-xs text-dc-white/50 hover:text-dc-accent"
          >
            Retirer
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div
            className="flex items-center border border-dc-white/20"
            role="group"
            aria-label={`Quantité pour ${item.nom}`}
          >
            <button
              type="button"
              onClick={() => setQuantite(item.id, item.quantite - 1)}
              className="flex h-8 w-8 items-center justify-center text-dc-white hover:text-dc-accent"
              aria-label="Diminuer la quantité"
            >
              −
            </button>
            <span className="w-6 text-center text-sm tabular-nums">
              {item.quantite}
            </span>
            <button
              type="button"
              onClick={() => setQuantite(item.id, item.quantite + 1)}
              className="flex h-8 w-8 items-center justify-center text-dc-white hover:text-dc-accent"
              aria-label="Augmenter la quantité"
            >
              +
            </button>
          </div>
          <p className="text-sm text-dc-white/70">
            {item.prix !== null
              ? `${(item.prix * item.quantite).toLocaleString("fr-FR")} $`
              : "Sur devis"}
          </p>
        </div>
      </div>
    </li>
  );
}
