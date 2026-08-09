"use client";

import { useEffect, useRef } from "react";
import type { TenueFiltres } from "@/types/tenue";
import { cn } from "@/lib/cn";

export interface SelectedFiltres {
  collections: string[];
  couleurs: string[];
  tags: string[];
  sexes: string[];
}

interface FiltersSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filtres: TenueFiltres;
  selected: SelectedFiltres;
  onToggle: (category: keyof SelectedFiltres, value: string) => void;
  onReset: () => void;
  resultCount: number;
}

const GROUPS: Array<{ key: keyof SelectedFiltres; label: string }> = [
  { key: "sexes", label: "Catégorie" },
  { key: "collections", label: "Collection" },
  { key: "couleurs", label: "Couleur" },
  { key: "tags", label: "Tags" },
];

export function FiltersSheet({
  isOpen,
  onClose,
  filtres,
  selected,
  onToggle,
  onReset,
  resultCount,
}: FiltersSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-300",
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Fermer les filtres"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
        tabIndex={isOpen ? 0 : -1}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filtrer les tenues"
        tabIndex={-1}
        className={cn(
          "absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col bg-dc-bg-light shadow-2xl transition-transform duration-300 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:top-6 sm:w-96",
          isOpen ? "translate-y-0" : "translate-y-full sm:translate-y-8",
        )}
      >
        <div className="flex items-center justify-between border-b border-dc-white/10 px-5 py-4">
          <h2 className="font-heading text-lg uppercase tracking-wide">
            Filtres
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer les filtres"
            className="flex h-9 w-9 items-center justify-center text-2xl leading-none text-dc-white/70 hover:text-dc-accent"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {GROUPS.filter((group) => filtres[group.key].length > 0).map(
            (group) => (
              <fieldset key={group.key} className="mb-6">
                <legend className="mb-3 font-sans text-xs uppercase tracking-widest text-dc-white/40">
                  {group.label}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {filtres[group.key].map((value) => {
                    const isActive = selected[group.key].includes(value);
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => onToggle(group.key, value)}
                        aria-pressed={isActive}
                        className={cn(
                          "min-h-9 rounded-full border px-4 py-1.5 font-sans text-sm transition-colors",
                          isActive
                            ? "border-dc-accent bg-dc-accent text-dc-white"
                            : "border-dc-white/20 text-dc-white/80 hover:border-dc-accent",
                        )}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ),
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-dc-white/10 px-5 py-4">
          <button
            type="button"
            onClick={onReset}
            className="font-sans text-sm text-dc-white/60 underline-offset-2 hover:text-dc-accent hover:underline"
          >
            Réinitialiser
          </button>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 flex-1 bg-dc-accent px-4 font-sans text-sm uppercase tracking-wide text-dc-white hover:bg-dc-white hover:text-dc-bg sm:flex-none sm:px-8"
          >
            Voir {resultCount} résultat{resultCount > 1 ? "s" : ""}
          </button>
        </div>
      </div>
    </div>
  );
}
