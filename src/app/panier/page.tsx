import type { Metadata } from "next";
import { PanierClient } from "@/components/cart/PanierClient";

export const metadata: Metadata = {
  title: "Panier",
  description: "Finalisez votre commande Dresscode.",
};

export default function PanierPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8">
        <span className="font-sans text-xs uppercase tracking-widest text-dc-accent">Panier</span>
        <h1 className="mt-3 font-heading text-4xl uppercase tracking-wide text-dc-white sm:text-5xl">
          Votre commande
        </h1>
      </div>

      <PanierClient />
    </div>
  );
}
