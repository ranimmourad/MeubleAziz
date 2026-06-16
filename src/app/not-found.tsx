import Link from "next/link";
import SiteShell from "@/components/SiteShell";

export default function NotFound() {
  return (
    <SiteShell>
      <div className="container-site py-24 text-center">
        <h1 className="font-serif text-5xl text-brand">404</h1>
        <p className="mt-3 text-charcoal/70">Cette page n&apos;existe pas.</p>
        <Link href="/" className="btn-primary mt-6 inline-flex">Retour à l&apos;accueil</Link>
      </div>
    </SiteShell>
  );
}
