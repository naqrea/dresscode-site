import type { Metadata } from "next";
import { ShootingForm } from "@/components/forms/ShootingForm";

export const metadata: Metadata = {
  title: "Réserver un shooting",
  description: "Réservez un shooting photo avec Dresscode.",
};

export default function ShootingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <span className="font-sans text-xs uppercase tracking-widest text-dc-accent">
            Shooting photo
          </span>
          <h1 className="mt-3 font-heading text-4xl uppercase tracking-wide text-dc-white sm:text-5xl">
            Réserver un shooting
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-dc-white/60 sm:text-base">
            Les shootings photo sont les événements les plus réguliers organisés par Dresscode.
            Chaque séance repose sur un thème précis : nos stylistes créent des tenues adaptées
            au concept, recrutent des mannequins, choisissent un lieu et font appel à un
            photographe pour réunir tous les participants.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-dc-white/60 sm:text-base">
            Décrivez votre projet ci-contre : Dresscode vous recontactera pour organiser la
            séance.
          </p>
        </div>

        <div className="border border-dc-white/10 bg-dc-bg-light p-6 sm:p-8">
          <ShootingForm />
        </div>
      </div>
    </div>
  );
}
