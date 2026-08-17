"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Tenue, TenueFiltres } from "@/types/tenue";
import { SearchBar } from "./SearchBar";
import { FiltersSheet, type SelectedFiltres } from "./FiltersSheet";
import { OutfitGrid } from "./OutfitGrid";
import { OutfitQuickView } from "./OutfitQuickView";
import { RevealOverlay } from "@/components/layout/RevealOverlay";

const EMPTY_SELECTION: SelectedFiltres = {
  collections: [],
  couleurs: [],
  tags: [],
  sexes: [],
};

/** Never keep the catalogue hidden if an image request stalls. */
const IMAGES_SAFETY_TIMEOUT_MS = 3500;

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function BoutiqueClient({
  tenues,
  filtres,
}: {
  tenues: Tenue[];
  filtres: TenueFiltres;
}) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<SelectedFiltres>(EMPTY_SELECTION);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedTenue, setSelectedTenue] = useState<Tenue | null>(null);

  // Reveal the catalogue only once its (initial, unfiltered) images have
  // settled, so the grid doesn't pop in piecemeal on first arrival.
  const [settledImageIds, setSettledImageIds] = useState<Set<string>>(new Set());
  const [imagesTimedOut, setImagesTimedOut] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setImagesTimedOut(true), IMAGES_SAFETY_TIMEOUT_MS);
    return () => clearTimeout(timeout);
  }, []);

  const handleImageSettled = useCallback((id: string) => {
    setSettledImageIds((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);

  const tenuesWithImage = useMemo(() => tenues.filter((t) => t.image), [tenues]);
  const isReady =
    imagesTimedOut || tenuesWithImage.every((tenue) => settledImageIds.has(tenue.id));

  const filteredTenues = useMemo(() => {
    const query = normalize(search.trim());

    return tenues.filter((tenue) => {
      if (query && !normalize(tenue.nom).includes(query)) return false;
      if (selected.collections.length && (!tenue.collection || !selected.collections.includes(tenue.collection)))
        return false;
      if (selected.sexes.length && (!tenue.sexe || !selected.sexes.includes(tenue.sexe)))
        return false;
      if (selected.couleurs.length && !tenue.couleurs.some((c) => selected.couleurs.includes(c)))
        return false;
      if (selected.tags.length && !tenue.tags.some((t) => selected.tags.includes(t))) return false;
      return true;
    });
  }, [tenues, search, selected]);

  const activeFilterCount =
    selected.collections.length + selected.couleurs.length + selected.tags.length + selected.sexes.length;

  function toggleFilter(category: keyof SelectedFiltres, value: string) {
    setSelected((prev) => {
      const current = prev[category];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [category]: next };
    });
  }

  function resetFilters() {
    setSelected(EMPTY_SELECTION);
  }

  return (
    <div className="relative">
      <RevealOverlay isReady={isReady} variant="absolute" />

      <div className="flex gap-3">
        <SearchBar value={search} onChange={setSearch} />
        <button
          type="button"
          onClick={() => setIsFiltersOpen(true)}
          className="relative flex h-11 shrink-0 items-center gap-2 border border-dc-white/20 px-4 font-sans text-sm text-dc-white hover:border-dc-accent"
        >
          <FilterIcon />
          Filtres
          {activeFilterCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-dc-accent px-1 text-[10px]">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <p className="mt-4 font-sans text-xs uppercase tracking-widest text-dc-white/40">
        {filteredTenues.length} tenue{filteredTenues.length > 1 ? "s" : ""}
      </p>

      <div className="mt-6">
        <OutfitGrid
          tenues={filteredTenues}
          onSelect={setSelectedTenue}
          onImageSettled={handleImageSettled}
        />
      </div>

      <FiltersSheet
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        filtres={filtres}
        selected={selected}
        onToggle={toggleFilter}
        onReset={resetFilters}
        resultCount={filteredTenues.length}
      />

      <OutfitQuickView
        key={selectedTenue?.id ?? "closed"}
        tenue={selectedTenue}
        onClose={() => setSelectedTenue(null)}
      />
    </div>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6h16M7 12h10M10 18h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
