"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import ProductCard from "@/components/ProductCard";
import { useCatalog } from "@/context/CatalogContext";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/format";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { products, categories, ready } = useCatalog();
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const [active, setActive] = useState(0);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === id);

  if (ready && !product) return notFound();
  if (!product) {
    return (
      <SiteShell>
        <div className="container-site py-20">Chargement…</div>
      </SiteShell>
    );
  }

  const category = categories.find((c) => c.slug === product.categorySlug);
  const related = products.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 3);
  const fav = isFavorite(product.id);

  return (
    <SiteShell>
      <div className="container-site py-8">
        <nav className="text-xs text-charcoal/60 mb-6">
          <Link href="/" className="hover:text-brand">Accueil</Link> /{" "}
          <Link href="/collection" className="hover:text-brand">Collection</Link>
          {category && (
            <>
              {" "}/ <Link href={`/collection?categorie=${category.slug}`} className="hover:text-brand">{category.name}</Link>
            </>
          )}
        </nav>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square border border-sand/70 bg-beige overflow-hidden">
              <Image
                src={product.images[active]}
                alt={product.title}
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="mt-3 flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActive(i)}
                    className={`relative w-20 h-20 border overflow-hidden ${
                      i === active ? "border-brand" : "border-sand"
                    }`}
                  >
                    <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {category && (
              <span className="text-xs uppercase tracking-wide text-brand">{category.name}</span>
            )}
            <h1 className="font-serif text-3xl text-charcoal mt-1">{product.title}</h1>
            <p className="font-serif text-3xl text-brand font-semibold mt-3">{formatPrice(product.price)}</p>
            <p className="mt-4 text-charcoal/75 leading-relaxed">{product.description}</p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  addToCart(product.id);
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1500);
                }}
                className="btn-primary flex-1"
              >
                {added ? "Ajouté ✓" : "Ajouter au panier"}
              </button>
              <button
                onClick={() => toggleFavorite(product.id)}
                aria-label="Favoris"
                className={`w-12 flex items-center justify-center border transition-colors ${
                  fav ? "border-brand text-brand bg-brand/5" : "border-sand text-charcoal hover:border-brand"
                }`}
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 21s-7.5-4.6-10-9.2C.4 8.3 2 5 5.2 5 7 5 8.4 6 12 9c3.6-3 5-4 6.8-4C22 5 23.6 8.3 22 11.8 19.5 16.4 12 21 12 21z" />
                </svg>
              </button>
            </div>

            {/* Specs */}
            <div className="mt-8 border-t border-sand/70 pt-6">
              <h2 className="font-serif text-xl text-charcoal mb-3">Caractéristiques</h2>
              <dl className="divide-y divide-sand/60">
                {product.specs.map((s) => (
                  <div key={s.label} className="flex justify-between py-2 text-sm">
                    <dt className="text-charcoal/60">{s.label}</dt>
                    <dd className="text-charcoal font-medium text-right">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="section-title mb-6">Produits similaires</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteShell>
  );
}
