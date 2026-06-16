"use client";

import Link from "next/link";
import Image from "next/image";
import SiteShell from "@/components/SiteShell";
import { useStore } from "@/context/StoreContext";
import { useCatalog } from "@/context/CatalogContext";
import { formatPrice, whatsappLink } from "@/lib/format";

export default function CartPage() {
  const { cart, ready, updateQty, removeFromCart, clearCart } = useStore();
  const { products } = useCatalog();

  const lines = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { ...item, product } : null;
    })
    .filter(Boolean) as { id: string; qty: number; product: (typeof products)[number] }[];

  const total = lines.reduce((s, l) => s + l.product.price * l.qty, 0);

  const orderMessage =
    "Bonjour Meuble Aziz, je souhaite commander :\n" +
    lines.map((l) => `• ${l.product.title} x${l.qty}`).join("\n") +
    `\nTotal estimé : ${formatPrice(total)}`;

  return (
    <SiteShell>
      <div className="container-site py-10">
        <h1 className="section-title mb-8">Mon Panier</h1>

        {!ready ? (
          <p className="text-charcoal/60">Chargement…</p>
        ) : lines.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-charcoal/70">Votre panier est vide.</p>
            <Link href="/collection" className="btn-primary mt-6 inline-flex">Voir la collection</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            <div className="space-y-3">
              {lines.map((l) => (
                <div key={l.id} className="flex gap-4 border border-sand/70 bg-white p-3">
                  <div className="relative w-24 h-24 flex-shrink-0 bg-beige">
                    <Image src={l.product.images[0]} alt={l.product.title} fill sizes="96px" className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <Link href={`/produit/${l.id}`} className="font-medium text-charcoal hover:text-brand">
                      {l.product.title}
                    </Link>
                    <span className="text-brand font-serif text-lg">{formatPrice(l.product.price)}</span>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-sand">
                        <button onClick={() => updateQty(l.id, l.qty - 1)} className="px-3 py-1 hover:bg-beige">−</button>
                        <span className="px-3 py-1 min-w-[40px] text-center">{l.qty}</span>
                        <button onClick={() => updateQty(l.id, l.qty + 1)} className="px-3 py-1 hover:bg-beige">+</button>
                      </div>
                      <button onClick={() => removeFromCart(l.id)} className="text-xs text-charcoal/60 hover:text-brand uppercase">
                        Retirer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={clearCart} className="text-xs uppercase text-charcoal/60 hover:text-brand">
                Vider le panier
              </button>
            </div>

            {/* Summary */}
            <aside className="border border-sand/70 bg-white p-6 h-fit">
              <h2 className="font-serif text-xl text-charcoal mb-4">Récapitulatif</h2>
              <div className="flex justify-between py-2 text-sm">
                <span className="text-charcoal/70">Sous-total</span>
                <span className="text-charcoal">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-sand/60 mt-2 font-semibold">
                <span>Total</span>
                <span className="text-brand">{formatPrice(total)}</span>
              </div>
              <button className="btn-primary w-full mt-4">Passer la commande</button>
              <a
                href={whatsappLink(orderMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 text-sm font-medium uppercase tracking-wide hover:opacity-90"
              >
                Commander via WhatsApp
              </a>
              <p className="mt-3 text-[11px] text-charcoal/50 text-center">
                Le paiement en ligne n&apos;est pas encore disponible.
              </p>
            </aside>
          </div>
        )}
      </div>
    </SiteShell>
  );
}
