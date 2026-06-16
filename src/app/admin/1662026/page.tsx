"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCatalog } from "@/context/CatalogContext";
import { Product, Category } from "@/data/catalog";
import { formatPrice } from "@/lib/format";

type Tab = "products" | "categories";

function emptyProduct(): Product {
  return {
    id: "p" + Date.now(),
    title: "",
    categorySlug: "",
    price: 0,
    description: "",
    images: [],
    specs: [{ label: "Matériau", value: "" }],
    featured: false,
  };
}

function emptyCategory(): Category {
  return { id: "c" + Date.now(), slug: "", name: "", image: "" };
}

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}

export default function AdminPage() {
  const catalog = useCatalog();
  const [tab, setTab] = useState<Tab>("products");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  return (
    <div className="min-h-screen bg-cream">
      {/* Admin header */}
      <header className="bg-brand text-cream">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-serif text-2xl">Meuble Aziz — Tableau de bord</h1>
          <div className="flex items-center gap-4 text-sm">
            <button onClick={catalog.resetCatalog} className="underline hover:opacity-80">
              Réinitialiser
            </button>
            <Link href="/" className="underline hover:opacity-80">Voir le site</Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Supabase note */}
        <p className="mb-6 text-xs text-charcoal/50 bg-beige border border-sand/70 px-3 py-2">
          Données stockées localement (localStorage). Prêt pour connexion Supabase ultérieure.
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-sand">
          <TabBtn active={tab === "products"} onClick={() => setTab("products")}>
            Produits ({catalog.products.length})
          </TabBtn>
          <TabBtn active={tab === "categories"} onClick={() => setTab("categories")}>
            Catégories ({catalog.categories.length})
          </TabBtn>
        </div>

        {tab === "products" && (
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif text-xl text-charcoal">Gestion des produits</h2>
              <button onClick={() => setEditingProduct(emptyProduct())} className="btn-primary text-xs">
                + Ajouter un produit
              </button>
            </div>
            <div className="grid gap-2">
              {catalog.products.map((p) => (
                <div key={p.id} className="flex items-center gap-4 bg-white border border-sand/70 p-3">
                  <div className="relative w-16 h-16 bg-beige flex-shrink-0">
                    {p.images[0] && <Image src={p.images[0]} alt="" fill sizes="64px" className="object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-charcoal truncate">{p.title || "(sans titre)"}</p>
                    <p className="text-xs text-charcoal/60">
                      {p.categorySlug} · {formatPrice(p.price)} {p.featured ? "· ⭐ Vedette" : ""}
                    </p>
                  </div>
                  <button onClick={() => setEditingProduct(p)} className="text-xs uppercase text-brand hover:underline">
                    Modifier
                  </button>
                  <button
                    onClick={() => confirm("Supprimer ce produit ?") && catalog.deleteProduct(p.id)}
                    className="text-xs uppercase text-red-600 hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "categories" && (
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif text-xl text-charcoal">Gestion des catégories</h2>
              <button onClick={() => setEditingCategory(emptyCategory())} className="btn-primary text-xs">
                + Ajouter une catégorie
              </button>
            </div>
            <div className="grid gap-2">
              {catalog.categories.map((c) => (
                <div key={c.id} className="flex items-center gap-4 bg-white border border-sand/70 p-3">
                  <div className="relative w-16 h-16 bg-beige flex-shrink-0">
                    {c.image && <Image src={c.image} alt="" fill sizes="64px" className="object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-charcoal">{c.name}</p>
                    <p className="text-xs text-charcoal/60">{c.slug}</p>
                  </div>
                  <button onClick={() => setEditingCategory(c)} className="text-xs uppercase text-brand hover:underline">
                    Modifier
                  </button>
                  <button
                    onClick={() => confirm("Supprimer cette catégorie ?") && catalog.deleteCategory(c.id)}
                    className="text-xs uppercase text-red-600 hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {editingProduct && (
        <ProductModal
          product={editingProduct}
          categories={catalog.categories}
          onClose={() => setEditingProduct(null)}
          onSave={(p) => {
            catalog.products.some((x) => x.id === p.id) ? catalog.updateProduct(p) : catalog.addProduct(p);
            setEditingProduct(null);
          }}
        />
      )}

      {editingCategory && (
        <CategoryModal
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onSave={(c) => {
            catalog.categories.some((x) => x.id === c.id) ? catalog.updateCategory(c) : catalog.addCategory(c);
            setEditingCategory(null);
          }}
        />
      )}
    </div>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm -mb-px border-b-2 ${
        active ? "border-brand text-brand font-semibold" : "border-transparent text-charcoal/60"
      }`}
    >
      {children}
    </button>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-ink/50 flex items-start justify-center overflow-y-auto p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-lg my-8 p-6" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

const inputCls = "w-full border border-sand px-3 py-2 text-sm focus:outline-none focus:border-brand";

function ProductModal({
  product,
  categories,
  onClose,
  onSave,
}: {
  product: Product;
  categories: Category[];
  onClose: () => void;
  onSave: (p: Product) => void;
}) {
  const [form, setForm] = useState<Product>({ ...product });

  const handleImages = async (files: FileList | null) => {
    if (!files) return;
    const urls = await Promise.all(Array.from(files).map(fileToDataUrl));
    setForm((f) => ({ ...f, images: [...f.images, ...urls] }));
  };

  return (
    <Modal onClose={onClose}>
      <h3 className="font-serif text-xl mb-4">{product.title ? "Modifier" : "Nouveau"} produit</h3>
      <div className="space-y-3">
        <input
          className={inputCls}
          placeholder="Titre"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <select
          className={inputCls}
          value={form.categorySlug}
          onChange={(e) => setForm({ ...form, categorySlug: e.target.value })}
        >
          <option value="">— Catégorie —</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <input
          className={inputCls}
          type="number"
          placeholder="Prix (TND)"
          value={form.price || ""}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        />
        <textarea
          className={inputCls}
          rows={3}
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* Specs */}
        <div>
          <p className="text-xs uppercase text-charcoal/60 mb-1">Caractéristiques</p>
          {form.specs.map((s, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                className={inputCls}
                placeholder="Libellé"
                value={s.label}
                onChange={(e) => {
                  const specs = [...form.specs];
                  specs[i] = { ...specs[i], label: e.target.value };
                  setForm({ ...form, specs });
                }}
              />
              <input
                className={inputCls}
                placeholder="Valeur"
                value={s.value}
                onChange={(e) => {
                  const specs = [...form.specs];
                  specs[i] = { ...specs[i], value: e.target.value };
                  setForm({ ...form, specs });
                }}
              />
            </div>
          ))}
          <button
            type="button"
            className="text-xs text-brand hover:underline"
            onClick={() => setForm({ ...form, specs: [...form.specs, { label: "", value: "" }] })}
          >
            + Ajouter une caractéristique
          </button>
        </div>

        {/* Images */}
        <div>
          <p className="text-xs uppercase text-charcoal/60 mb-1">Images</p>
          <div className="flex gap-2 flex-wrap mb-2">
            {form.images.map((img, i) => (
              <div key={i} className="relative w-16 h-16 bg-beige">
                <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                <button
                  onClick={() => setForm({ ...form, images: form.images.filter((_, idx) => idx !== i) })}
                  className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 rounded-full text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <input type="file" accept="image/*" multiple onChange={(e) => handleImages(e.target.files)} className="text-xs" />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={!!form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          Produit en vedette
        </label>
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={() => onSave(form)} className="btn-primary flex-1">Enregistrer</button>
        <button onClick={onClose} className="btn-outline">Annuler</button>
      </div>
    </Modal>
  );
}

function CategoryModal({
  category,
  onClose,
  onSave,
}: {
  category: Category;
  onClose: () => void;
  onSave: (c: Category) => void;
}) {
  const [form, setForm] = useState<Category>({ ...category });

  const handleImage = async (files: FileList | null) => {
    if (!files || !files[0]) return;
    const url = await fileToDataUrl(files[0]);
    setForm((f) => ({ ...f, image: url }));
  };

  return (
    <Modal onClose={onClose}>
      <h3 className="font-serif text-xl mb-4">{category.name ? "Modifier" : "Nouvelle"} catégorie</h3>
      <div className="space-y-3">
        <input
          className={inputCls}
          placeholder="Nom"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
              slug: form.slug || e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
            })
          }
        />
        <input
          className={inputCls}
          placeholder="Slug (ex: meubles-tv)"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
        <div>
          <p className="text-xs uppercase text-charcoal/60 mb-1">Image</p>
          {form.image && (
            <div className="relative w-24 h-24 bg-beige mb-2">
              <Image src={form.image} alt="" fill sizes="96px" className="object-cover" />
            </div>
          )}
          <input type="file" accept="image/*" onChange={(e) => handleImage(e.target.files)} className="text-xs" />
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button onClick={() => onSave(form)} className="btn-primary flex-1">Enregistrer</button>
        <button onClick={onClose} className="btn-outline">Annuler</button>
      </div>
    </Modal>
  );
}
