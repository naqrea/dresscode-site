"use client";

import { useEffect, useState } from "react";
import { RevealOverlay } from "./RevealOverlay";

/** Safety net in case a resource stalls: never hide the site forever. */
const SAFETY_TIMEOUT_MS = 4000;

export function Preloader() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    function reveal() {
      setIsReady(true);
    }

    // The browser's "load" event already fired if it happened before this
    // effect ran (e.g. cached assets), so check readyState first.
    if (document.readyState === "complete") {
      reveal();
    } else {
      window.addEventListener("load", reveal);
    }

    const safety = setTimeout(reveal, SAFETY_TIMEOUT_MS);

    return () => {
      window.removeEventListener("load", reveal);
      clearTimeout(safety);
    };
  }, []);

  return <RevealOverlay isReady={isReady} />;
}
