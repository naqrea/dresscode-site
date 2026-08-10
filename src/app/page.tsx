import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/home/ServiceCard";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-dc-white/10 px-4 py-24 sm:px-6 sm:py-64">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[url('/hero-image.png')] bg-cover bg-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-dc-bg/50" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-dc-accent/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-dc-accent/10 blur-3xl"
        />

        <div className="relative mx-auto flex max-w-6xl flex-col items-start">
          <h1 className="mt-2 font-heading text-5xl uppercase leading-[1.05] tracking-wide text-dc-white sm:text-7xl">
            Dresscode
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-dc-white/70 sm:text-lg">
            Nous concevons des tenues uniques, organisons des shootings et
            transformons chaque essayage en véritable scène de mode.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/boutique" size="md">
              Découvrir la boutique
            </Button>
            <Button href="/galerie" variant="outline" size="md">
              Voir la galerie
            </Button>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-xl">
            <span className="font-sans text-xs uppercase tracking-widest text-dc-accent">
              Découvrez
            </span>
            <h2 className="mt-3 font-heading text-3xl uppercase tracking-wide text-dc-white sm:text-4xl">
              NOS SERVICES
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ServiceCard
              href="/boutique"
              number="01"
              title="Acheter une tenue"
              description="Parcourez le catalogue de créations Dresscode et composez votre garde-robe."
              cta="Voir la boutique"
            />
            <ServiceCard
              href="/shooting"
              number="02"
              title="Réserver un shooting"
              description="Un thème, un lieu, une équipe : donnez vie à un shooting photo pensé sur-mesure pour votre projet."
              cta="Réserver un shooting"
            />
            <ServiceCard
              href="/relooking"
              number="03"
              title="Réserver un relooking"
              description="Confiez votre image à nos stylistes pour une transformation complète."
              cta="Réserver un relooking"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-dc-white/10 bg-dc-bg-light px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <span className="font-accent text-4xl text-dc-accent">
              Notre univers
            </span>
            <h2 className="mt-3 font-heading text-3xl uppercase tracking-wide text-dc-white sm:text-4xl">
              Une maison, une scène
            </h2>
          </div>
          <div className="space-y-5 text-sm leading-relaxed text-dc-white/70 sm:text-base">
            <p>
              Dresscode conçoit des tenues originales et les propose à la vente
              auprès des citoyens, tout en organisant des événements autour de
              la mode et de la création : shootings photo, défilés et sessions
              d&apos;essayage.
            </p>
            <p>
              Chaque shooting repose sur un thème précis, des mannequins et un
              photographe réunis pour produire un contenu à la hauteur de
              l&apos;ambition de la maison. Chaque commande se prépare en
              boutique, l&apos;essayage se vit au local de Dresscode.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 text-center sm:px-6 sm:py-28">
        <div className="mx-auto max-w-xl">
          <h2 className="font-heading text-3xl uppercase tracking-wide text-dc-white sm:text-4xl">
            Prêt pour votre prochain outfit ?
          </h2>
          <p className="mt-4 text-sm text-dc-white/60 sm:text-base">
            La boutique Dresscode est ouverte : parcourez les collections et
            passez votre commande en quelques instants.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/boutique">Entrer dans la boutique</Button>
          </div>
        </div>
      </section>
    </>
  );
}
