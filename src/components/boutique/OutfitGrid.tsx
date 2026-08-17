import type { Tenue } from "@/types/tenue";
import { OutfitCard } from "./OutfitCard";

/** Roughly the first row on the widest grid breakpoint — worth preloading. */
const PRIORITY_COUNT = 4;

interface OutfitGridProps {
  tenues: Tenue[];
  onSelect: (tenue: Tenue) => void;
  onImageSettled?: (id: string) => void;
}

export function OutfitGrid({ tenues, onSelect, onImageSettled }: OutfitGridProps) {
  if (tenues.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-24 text-center">
        <p className="font-heading text-xl uppercase text-dc-white/80">Aucun résultat</p>
        <p className="max-w-sm text-sm text-dc-white/50">
          Essayez d&apos;ajuster votre recherche ou vos filtres pour découvrir d&apos;autres
          tenues Dresscode.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
      {tenues.map((tenue, index) => (
        <OutfitCard
          key={tenue.id}
          tenue={tenue}
          onSelect={onSelect}
          priority={index < PRIORITY_COUNT}
          onImageSettled={onImageSettled}
        />
      ))}
    </div>
  );
}
