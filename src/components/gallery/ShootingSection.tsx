import Image from "next/image";
import type { PhotoShooting } from "@/types/galerie";
import { cn } from "@/lib/cn";
import { optimizedImageUrl } from "@/lib/image";

const SPAN_PATTERN = ["col-span-2 row-span-2", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-2", "col-span-1 row-span-1"];

export function ShootingSection({ shooting }: { shooting: PhotoShooting }) {
  return (
    <article className="border-b border-dc-white/10 py-16 last:border-b-0">
      <header className="mb-8 max-w-xl">
        {shooting.date && (
          <p className="font-sans text-xs uppercase tracking-widest text-dc-accent">
            {shooting.date}
          </p>
        )}
        <h2 className="mt-2 font-heading text-3xl uppercase tracking-wide text-dc-white sm:text-4xl">
          {shooting.nom}
        </h2>
        {shooting.description && (
          <p className="mt-3 text-sm leading-relaxed text-dc-white/60 sm:text-base">
            {shooting.description}
          </p>
        )}
      </header>

      {shooting.photos.length > 0 && (
        <div className="grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-4">
          {shooting.photos.map((photo, i) => (
            <div
              key={photo.src}
              className={cn(
                "relative overflow-hidden bg-dc-bg-light",
                SPAN_PATTERN[i % SPAN_PATTERN.length]
              )}
            >
              <Image
                src={optimizedImageUrl(photo.src)}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
