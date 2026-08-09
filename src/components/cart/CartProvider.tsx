"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem } from "@/types/cart";
import type { Tenue } from "@/types/tenue";

const STORAGE_KEY = "dresscode_cart_v1";
const MAX_QUANTITE = 99;

interface CartContextValue {
  items: CartItem[];
  isLoaded: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (tenue: Tenue, quantite?: number) => void;
  removeItem: (id: string) => void;
  setQuantite: (id: string, quantite: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrix: number;
  hasUnpricedItem: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // One-time, hydration-safe read of localStorage: the server has no
    // access to it, so this must stay in an effect (post-mount) rather than
    // an initializer, or the client's first render would mismatch the SSR
    // markup.
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      // Corrupted/blocked storage: start with an empty cart rather than crash.
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage full or unavailable: cart still works for the session.
    }
  }, [items, isLoaded]);

  const addItem = useCallback((tenue: Tenue, quantite = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === tenue.id);
      if (existing) {
        return prev.map((item) =>
          item.id === tenue.id
            ? { ...item, quantite: Math.min(MAX_QUANTITE, item.quantite + quantite) }
            : item
        );
      }
      return [
        ...prev,
        {
          id: tenue.id,
          nom: tenue.nom,
          prix: tenue.prix,
          image: tenue.image,
          quantite: Math.min(MAX_QUANTITE, quantite),
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const setQuantite = useCallback((id: string, quantite: number) => {
    setItems((prev) => {
      if (quantite < 1) return prev.filter((item) => item.id !== id);
      return prev.map((item) =>
        item.id === id ? { ...item, quantite: Math.min(MAX_QUANTITE, quantite) } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantite, 0),
    [items]
  );
  const totalPrix = useMemo(
    () =>
      items.reduce(
        (sum, item) => (item.prix !== null ? sum + item.prix * item.quantite : sum),
        0
      ),
    [items]
  );
  const hasUnpricedItem = useMemo(() => items.some((item) => item.prix === null), [items]);

  const value: CartContextValue = {
    items,
    isLoaded,
    isOpen,
    openCart,
    closeCart,
    addItem,
    removeItem,
    setQuantite,
    clearCart,
    totalItems,
    totalPrix,
    hasUnpricedItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé à l'intérieur de <CartProvider>.");
  return ctx;
}
