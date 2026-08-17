"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import logoWhite from "../../../public/logo-white.png";

/** Must match the transition duration below. */
const FADE_DURATION_MS = 500;

interface RevealOverlayProps {
  /** Flip to true once whatever this overlay is hiding is ready to show. */
  isReady: boolean;
  /**
   * "viewport" covers the whole screen (site-wide arrival splash).
   * "absolute" covers its nearest `relative` ancestor instead, for a
   * section-scoped loading veil (e.g. a page's image-heavy content).
   */
  variant?: "viewport" | "absolute";
}

/**
 * Sober "logo on navy" loading veil shared by the site-wide Preloader and
 * any page-level loading state, so every "let things load before revealing"
 * moment on the site looks and feels the same.
 */
export function RevealOverlay({ isReady, variant = "viewport" }: RevealOverlayProps) {
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    if (!isReady) return;
    const timeout = setTimeout(() => setIsMounted(false), FADE_DURATION_MS);
    return () => clearTimeout(timeout);
  }, [isReady]);

  if (!isMounted) return null;

  return (
    <>
      {/* Never trap no-JS visitors behind the veil. */}
      <noscript>
        <style>{".dc-reveal-overlay{display:none}"}</style>
      </noscript>
      <div
        aria-hidden="true"
        className={`dc-reveal-overlay flex justify-center bg-dc-bg transition-opacity duration-500 ${
          variant === "viewport"
            ? "fixed inset-0 z-100 items-center"
            : // The covered content (e.g. a full product grid) can be much
              // taller than the screen, so anchor near the top instead of
              // centering in the full height — a true center could land
              // well below the fold.
              "absolute inset-0 z-20 pt-24 sm:pt-32"
        } ${isReady ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        <Image
          src={logoWhite}
          alt=""
          priority
          className="h-14 w-auto animate-fade-in sm:h-16"
        />
      </div>
    </>
  );
}
