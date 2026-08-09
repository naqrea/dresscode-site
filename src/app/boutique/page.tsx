import type { Metadata } from "next";
import { getFiltres, getTenues } from "@/lib/airtable";
import { BoutiqueClient } from "@/components/boutique/BoutiqueClient";

export const metadata: Metadata = {
  title: "Boutique",
  description: "Découvrez et commandez les tenues Dresscode.",
};

export default async function BoutiquePage() {
  const tenues = await getTenues();
  const filtres = getFiltres(tenues);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8 max-w-xl">
        <span className="font-sans text-xs uppercase tracking-widest text-dc-accent">
          Boutique
        </span>
        <h1 className="mt-3 font-heading text-4xl uppercase tracking-wide text-dc-white sm:text-5xl">
          Les créations Dresscode
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-dc-white/60 sm:text-base">
          Chaque pièce est pensée par nos stylistes. Ajoutez vos tenues au panier, puis
          finalisez votre commande — elle sera préparée pour un rendez-vous d&apos;essayage
          au local.
        </p>
      </div>

      {tenues.length === 0 ? (
        <div className="flex flex-col items-center gap-2 border border-dc-white/10 bg-dc-bg-light py-24 text-center">
          <p className="font-heading text-xl uppercase text-dc-white/80">
            La boutique se prépare
          </p>
          <p className="max-w-sm text-sm text-dc-white/50">
            Aucune tenue n&apos;est disponible pour le moment. Revenez très bientôt pour
            découvrir les créations Dresscode.
          </p>
        </div>
      ) : (
        <BoutiqueClient tenues={tenues} filtres={filtres} />
      )}
    </div>
  );
}
