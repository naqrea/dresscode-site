"use client";

import Image from "next/image";
import type { Tenue } from "@/types/tenue";

interface OutfitCardProps {
  tenue: Tenue;
  onSelect: (tenue: Tenue) => void;
  /** Preload the first visible rows instead of lazy-loading them. */
  priority?: boolean;
  /** Reports back once the image has loaded (or failed), for a loading veil. */
  onImageSettled?: (id: string) => void;
}

export function OutfitCard({ tenue, onSelect, priority, onImageSettled }: OutfitCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(tenue)}
      className="group flex flex-col text-left"
      aria-label={`Voir la tenue ${tenue.nom}`}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-dc-bg-light">
        {tenue.image ? (
          <Image
            src={tenue.image}
            alt={tenue.nom}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onLoad={() => onImageSettled?.(tenue.id)}
            onError={() => onImageSettled?.(tenue.id)}
          />
        ) : (
          <div className="flex h-full items-center justify-center font-heading text-3xl text-dc-white/15">
            DC
          </div>
        )}

        {!tenue.disponible && (
          <span className="absolute left-2 top-2 bg-dc-bg px-2 py-1 font-sans text-[10px] uppercase tracking-wide text-dc-white/80">
            Indisponible
          </span>
        )}
      </div>

      <div className="mt-3">
        {tenue.collection && (
          <p className="font-sans text-[11px] uppercase tracking-widest text-dc-white/40">
            {tenue.collection}
          </p>
        )}
        <h3 className="mt-1 font-heading text-base uppercase tracking-wide text-dc-white">
          {tenue.nom}
        </h3>
        <p className="mt-1 font-sans text-sm text-dc-accent">{tenue.prixAffiche}</p>
      </div>
    </button>
  );
}
