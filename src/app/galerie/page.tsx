import type { Metadata } from "next";
import { shootings } from "@/lib/galerie-data";
import { ShootingSection } from "@/components/gallery/ShootingSection";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Les shootings photo réalisés par Dresscode.",
};

export default function GaleriePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-4 max-w-xl">
        <span className="font-sans text-xs uppercase tracking-widest text-dc-accent">Galerie</span>
        <h1 className="mt-3 font-heading text-4xl uppercase tracking-wide text-dc-white sm:text-5xl">
          Nos shootings
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-dc-white/60 sm:text-base">
          Un aperçu éditorial des scènes imaginées par Dresscode, shooting après shooting.
        </p>
      </div>

      {shootings.length === 0 ? (
        <div className="flex flex-col items-center gap-2 border border-dc-white/10 bg-dc-bg-light py-24 text-center">
          <p className="font-heading text-xl uppercase text-dc-white/80">
            Aucun shooting publié pour le moment
          </p>
          <p className="max-w-sm text-sm text-dc-white/50">
            La galerie s&apos;enrichira au fil des shootings organisés par Dresscode. Revenez
            bientôt.
          </p>
        </div>
      ) : (
        <div className="mt-12">
          {shootings.map((shooting) => (
            <ShootingSection key={shooting.id} shooting={shooting} />
          ))}
        </div>
      )}
    </div>
  );
}
