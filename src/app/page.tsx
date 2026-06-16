"use client";

import Link from "next/link";
import Image from "next/image";
import SiteShell from "@/components/SiteShell";
import ProductCard from "@/components/ProductCard";
import { useCatalog } from "@/context/CatalogContext";
import { PHONE_DISPLAY, whatsappLink } from "@/lib/format";

export default function HomePage() {
  const { products, categories } = useCatalog();
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const projects = products.slice(0, 6);
  // Only show the main 5 categories requested on the homepage
  const homeCatSlugs = ["meubles-tv", "cuisines", "dressings", "coiffeuses", "chambres"];
  const homeCategories = homeCatSlugs
    .map((s) => categories.find((c) => c.slug === s))
    .filter(Boolean) as typeof categories;

  return (
    <SiteShell>
      {/* HERO — image only, no text overlay, just 2 buttons near the bottom */}
      <section id="hero-section" className="relative w-full">
        <div className="relative w-full aspect-[2/1] sm:aspect-[2.2/1]">
          <Image
            src="/images/brand/hero.png"
            alt="Meuble Aziz — L'élégance de votre intérieur"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 sm:gap-4 px-4 pb-4 sm:pb-8">
            <Link
              href="/collection"
              className="btn-primary text-[10px] sm:text-sm px-3 py-1.5 sm:px-6 sm:py-3"
            >
              Découvrir la collection
            </Link>
            <Link
              href="/contact"
              className="btn-outline bg-white/80 text-[10px] sm:text-sm px-3 py-1.5 sm:px-6 sm:py-3"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section id="collections" className="container-site py-14">
        <header className="mb-8 text-center">
          <h2 className="section-title">Nos Collections</h2>
          <p className="mt-2 text-charcoal/70 text-sm">Des solutions sur mesure pour chaque espace de votre maison.</p>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {homeCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/collection?categorie=${cat.slug}`}
              className="group relative aspect-[3/4] overflow-hidden border border-sand/70"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width:768px) 50vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <span className="absolute bottom-3 left-3 right-3 text-cream font-serif text-lg">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section id="projects" className="bg-beige/50 py-14">
        <div className="container-site">
          <header className="mb-8 text-center">
            <h2 className="section-title">Réalisations</h2>
            <p className="mt-2 text-charcoal/70 text-sm">Une sélection de nos meubles fabriqués sur mesure.</p>
          </header>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {projects.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/collection" className="btn-outline">Voir toute la collection</Link>
          </div>
        </div>
      </section>

      {/* CONTACT PREVIEW */}
      <section id="contact-preview" className="container-site py-14">
        <div className="border border-sand/70 bg-white p-8 sm:p-10 grid gap-6 md:grid-cols-2 items-center">
          <div>
            <h2 className="section-title">Un projet en tête ?</h2>
            <p className="mt-3 text-charcoal/75 leading-relaxed text-sm sm:text-base">
              Contactez-nous pour discuter de votre projet de meuble sur mesure. Nous vous
              accompagnons de la conception à l&apos;installation.
            </p>
            <p className="mt-4 text-charcoal">
              Téléphone :{" "}
              <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className="text-brand font-semibold">
                {PHONE_DISPLAY}
              </a>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:justify-end gap-3">
            <a
              href={whatsappLink("Bonjour Meuble Aziz, je souhaite un devis.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 text-sm font-medium uppercase tracking-wide hover:opacity-90 transition-opacity"
            >
              <svg viewBox="0 0 32 32" className="w-5 h-5" fill="currentColor">
                <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 29l8.3-1.6c1.7.9 3.7 1.4 5.7 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3z" />
              </svg>
              WhatsApp
            </a>
            <Link href="/contact" className="btn-outline">Page contact</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}