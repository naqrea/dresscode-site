import type { Metadata } from "next";
import { RelookingForm } from "@/components/forms/RelookingForm";

export const metadata: Metadata = {
  title: "Réserver un relooking",
  description: "Réservez un relooking avec les stylistes Dresscode.",
};

export default function RelookingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <span className="font-sans text-xs uppercase tracking-widest text-dc-accent">
            Relooking
          </span>
          <h1 className="mt-3 font-heading text-4xl uppercase tracking-wide text-dc-white sm:text-5xl">
            Réserver un relooking
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-dc-white/60 sm:text-base">
            Confiez votre image à nos stylistes le temps d&apos;une transformation complète :
            silhouette, couleurs, accessoires. Chaque relooking est pensé sur-mesure, dans la
            continuité de l&apos;univers Dresscode.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-dc-white/60 sm:text-base">
            Décrivez votre objectif ci-contre : Dresscode vous recontactera pour organiser votre
            rendez-vous.
          </p>
        </div>

        <div className="border border-dc-white/10 bg-dc-bg-light p-6 sm:p-8">
          <RelookingForm />
        </div>
      </div>
    </div>
  );
}
