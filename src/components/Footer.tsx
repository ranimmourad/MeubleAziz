import Link from "next/link";
import Image from "next/image";
import { PHONE_DISPLAY, whatsappLink } from "@/lib/format";

export default function Footer() {
  return (
    <footer className="bg-brand text-cream mt-20">
      <div className="container-site py-12 grid gap-10 md:grid-cols-3">
        <div>
          <Image
            src="/images/brand/logo.png"
            alt="Meuble Aziz"
            width={160}
            height={80}
            className="h-16 w-auto object-contain bg-navbar p-2"
          />
          <p className="mt-4 text-sm text-cream/80 max-w-xs leading-relaxed">
            Meubles & décoration sur mesure. L&apos;élégance de votre intérieur, notre passion.
          </p>
        </div>

        <div>
          <h3 className="font-serif text-xl mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><Link href="/" className="hover:text-cream">Accueil</Link></li>
            <li><Link href="/collection" className="hover:text-cream">Collection</Link></li>
            <li><Link href="/contact" className="hover:text-cream">Contact</Link></li>
            <li><Link href="/favorites" className="hover:text-cream">Favoris</Link></li>
            <li><Link href="/cart" className="hover:text-cream">Panier</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-xl mb-4">Contact</h3>
          <ul className="space-y-2 text-sm text-cream/80">
            <li>
              Téléphone :{" "}
              <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className="hover:text-cream">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                WhatsApp
              </a>
            </li>
            <li>Tunisie</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/15">
        <div className="container-site py-4 text-xs text-cream/60 text-center">
          © {new Date().getFullYear()} Meuble Aziz — Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
