"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import {
  products as seedProducts,
  categories as seedCategories,
  Product,
  Category,
} from "@/data/catalog";

// NOTE: This context centralises all catalog reads/writes.
// Currently backed by localStorage. To connect Supabase later, replace the
// load/persist functions with Supabase queries — the component API stays the same.

type CatalogContextType = {
  products: Product[];
  categories: Category[];
  ready: boolean;
  getProduct: (id: string) => Product | undefined;
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  addCategory: (c: Category) => void;
  updateCategory: (c: Category) => void;
  deleteCategory: (id: string) => void;
  resetCatalog: () => void;
};

const CatalogContext = createContext<CatalogContextType | null>(null);

const PRODUCTS_KEY = "ma_products";
const CATEGORIES_KEY = "ma_categories";

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [categories, setCategories] = useState<Category[]>(seedCategories);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const p = localStorage.getItem(PRODUCTS_KEY);
      const c = localStorage.getItem(CATEGORIES_KEY);
      if (p) setProducts(JSON.parse(p));
      if (c) setCategories(JSON.parse(c));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const persistProducts = useCallback((next: Product[]) => {
    setProducts(next);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(next));
  }, []);

  const persistCategories = useCallback((next: Category[]) => {
    setCategories(next);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(next));
  }, []);

  const getProduct = useCallback((id: string) => products.find((p) => p.id === id), [products]);

  const addProduct = useCallback((p: Product) => persistProducts([...products, p]), [products, persistProducts]);
  const updateProduct = useCallback(
    (p: Product) => persistProducts(products.map((x) => (x.id === p.id ? p : x))),
    [products, persistProducts]
  );
  const deleteProduct = useCallback(
    (id: string) => persistProducts(products.filter((x) => x.id !== id)),
    [products, persistProducts]
  );

  const addCategory = useCallback((c: Category) => persistCategories([...categories, c]), [categories, persistCategories]);
  const updateCategory = useCallback(
    (c: Category) => persistCategories(categories.map((x) => (x.id === c.id ? c : x))),
    [categories, persistCategories]
  );
  const deleteCategory = useCallback(
    (id: string) => persistCategories(categories.filter((x) => x.id !== id)),
    [categories, persistCategories]
  );

  const resetCatalog = useCallback(() => {
    persistProducts(seedProducts);
    persistCategories(seedCategories);
  }, [persistProducts, persistCategories]);

  return (
    <CatalogContext.Provider
      value={{
        products,
        categories,
        ready,
        getProduct,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        resetCatalog,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within CatalogProvider");
  return ctx;
}
