"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/catalog";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  const { isFavorite, toggleFavorite, addToCart } = useStore();
  const fav = isFavorite(product.id);

  return (
    <article className="group bg-white border border-sand/70 overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-beige">
        <Link href={`/produit/${product.id}`} className="absolute inset-0 block">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <button
          onClick={() => toggleFavorite(product.id)}
          aria-label="Ajouter aux favoris"
          className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/90 border border-sand/60 transition-colors ${
            fav ? "text-brand" : "text-charcoal hover:text-brand"
          }`}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
            <path d="M12 21s-7.5-4.6-10-9.2C.4 8.3 2 5 5.2 5 7 5 8.4 6 12 9c3.6-3 5-4 6.8-4C22 5 23.6 8.3 22 11.8 19.5 16.4 12 21 12 21z" />
          </svg>
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <Link href={`/produit/${product.id}`} className="flex-1">
          <h3 className="font-medium text-charcoal leading-snug hover:text-brand transition-colors">
            {product.title}
          </h3>
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-serif text-xl text-brand font-semibold">{formatPrice(product.price)}</span>
          <button
            onClick={() => addToCart(product.id)}
            className="text-xs uppercase tracking-wide bg-brand text-cream px-3 py-2 hover:bg-wood-dark transition-colors"
          >
            Ajouter
          </button>
        </div>
      </div>
    </article>
  );
}
