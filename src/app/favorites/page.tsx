"use client";

import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/context/StoreContext";
import { useCatalog } from "@/context/CatalogContext";

export default function FavoritesPage() {
  const { favorites, ready } = useStore();
  const { products } = useCatalog();
  const items = products.filter((p) => favorites.includes(p.id));

  return (
    <SiteShell>
      <div className="container-site py-10">
        <h1 className="section-title mb-8">Mes Favoris</h1>

        {!ready ? (
          <p className="text-charcoal/60">Chargement…</p>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-charcoal/70">Vous n&apos;avez pas encore de favoris.</p>
            <Link href="/collection" className="btn-primary mt-6 inline-flex">Découvrir la collection</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </SiteShell>
  );
}
