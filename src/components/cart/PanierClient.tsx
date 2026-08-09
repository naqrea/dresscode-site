"use client";

import { useCart } from "@/components/cart/CartProvider";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { OrderForm } from "@/components/forms/OrderForm";
import { Button } from "@/components/ui/Button";

export function PanierClient() {
  const { items, isLoaded } = useCart();

  if (!isLoaded) return null;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="font-heading text-2xl uppercase text-dc-white/80">Votre panier est vide</p>
        <p className="max-w-sm text-sm text-dc-white/50">
          Ajoutez une tenue depuis la boutique pour préparer votre commande.
        </p>
        <Button href="/boutique">Voir la boutique</Button>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <h2 className="mb-4 font-sans text-xs uppercase tracking-widest text-dc-white/40">
          Récapitulatif
        </h2>
        <ul className="divide-y divide-dc-white/10 border-y border-dc-white/10">
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </ul>
      </div>

      <div>
        <h2 className="mb-4 font-sans text-xs uppercase tracking-widest text-dc-white/40">
          Vos coordonnées
        </h2>
        <OrderForm />
      </div>
    </div>
  );
}
