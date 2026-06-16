"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";

export type CartItem = { id: string; qty: number };

type StoreContextType = {
  favorites: string[];
  cart: CartItem[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  favCount: number;
  ready: boolean;
};

const StoreContext = createContext<StoreContextType | null>(null);

const FAV_KEY = "ma_favorites";
const CART_KEY = "ma_cart";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const f = localStorage.getItem(FAV_KEY);
      const c = localStorage.getItem(CART_KEY);
      if (f) setFavorites(JSON.parse(f));
      if (c) setCart(JSON.parse(c));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites, ready]);

  useEffect(() => {
    if (ready) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, ready]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const addToCart = useCallback((id: string, qty: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id, qty }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const favCount = favorites.length;

  return (
    <StoreContext.Provider
      value={{
        favorites,
        cart,
        toggleFavorite,
        isFavorite,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
        favCount,
        ready,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
