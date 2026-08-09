"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { useCart } from "./CartProvider";
import { CartItemRow } from "./CartItemRow";

export function CartDrawer() {
  const { items, isOpen, closeCart, totalPrix, hasUnpricedItem } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Fermer le panier"
        onClick={closeCart}
        className="absolute inset-0 bg-black/60"
        tabIndex={isOpen ? 0 : -1}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Panier"
        tabIndex={-1}
        className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-dc-bg shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-dc-white/10 px-5 py-4">
          <h2 className="font-heading text-lg uppercase tracking-wide">Panier</h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Fermer le panier"
            className="flex h-9 w-9 items-center justify-center text-2xl leading-none text-dc-white/70 hover:text-dc-accent"
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="font-heading text-base uppercase text-dc-white/80">
              Votre panier est vide
            </p>
            <p className="text-sm text-dc-white/50">
              Découvrez la boutique pour trouver votre prochaine tenue.
            </p>
            <Button href="/boutique" variant="outline" size="sm" onClick={closeCart}>
              Voir la boutique
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-dc-white/10 overflow-y-auto px-5">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </ul>
            <div className="border-t border-dc-white/10 px-5 py-5">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-dc-white/70">Sous-total</span>
                <span className="font-heading text-lg">
                  {totalPrix.toLocaleString("fr-FR")} $
                  {hasUnpricedItem && (
                    <span className="ml-1 text-xs font-sans text-dc-white/50">
                      + articles sur devis
                    </span>
                  )}
                </span>
              </div>
              <Button href="/panier" className="w-full" onClick={closeCart}>
                Commander
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
