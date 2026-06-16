"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import ProductCard from "@/components/ProductCard";
import { useCatalog } from "@/context/CatalogContext";

function CollectionContent() {
  const { products, categories } = useCatalog();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(8000);

  useEffect(() => {
    const c = searchParams.get("categorie");
    if (c) setCategory(c);
  }, [searchParams]);

  const priceCeiling = useMemo(
    () => Math.max(1000, ...products.map((p) => p.price)),
    [products]
  );

  useEffect(() => {
    setMaxPrice(priceCeiling);
  }, [priceCeiling]);

  const filtered = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || p.categorySlug === category;
    const matchPrice = p.price <= maxPrice;
    return matchSearch && matchCat && matchPrice;
  });

  return (
    <SiteShell>
      <div className="container-site py-10">
        <header className="mb-8">
          <h1 className="section-title">Collection</h1>
          <p className="mt-2 text-charcoal/70 text-sm">
            {filtered.length} produit{filtered.length > 1 ? "s" : ""} sur mesure
          </p>
        </header>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          {/* Filters */}
          <aside className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wide text-charcoal/60 mb-2">Recherche</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un meuble..."
                className="w-full border border-sand px-3 py-2 bg-white text-sm focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wide text-charcoal/60 mb-2">Catégorie</label>
              <div className="space-y-1">
                <CatBtn active={category === "all"} onClick={() => setCategory("all")}>
                  Toutes
                </CatBtn>
                {categories.map((c) => (
                  <CatBtn key={c.id} active={category === c.slug} onClick={() => setCategory(c.slug)}>
                    {c.name}
                  </CatBtn>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wide text-charcoal/60 mb-2">
                Prix maximum : {maxPrice.toLocaleString("fr-TN")} TND
              </label>
              <input
                type="range"
                min={300}
                max={priceCeiling}
                step={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brand"
              />
            </div>
          </aside>

          {/* Grid */}
          <div>
            {filtered.length === 0 ? (
              <p className="text-charcoal/60 py-20 text-center">Aucun produit ne correspond à votre recherche.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

function CatBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`block w-full text-left px-3 py-2 text-sm border transition-colors ${
        active ? "bg-brand text-cream border-brand" : "bg-white border-sand text-charcoal hover:border-brand"
      }`}
    >
      {children}
    </button>
  );
}

export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="container-site py-20">Chargement…</div>}>
      <CollectionContent />
    </Suspense>
  );
}
