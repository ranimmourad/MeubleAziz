"use client";

import { useState } from "react";
import SiteShell from "@/components/SiteShell";
import { PHONE_DISPLAY, whatsappLink } from "@/lib/format";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteShell>
      <div className="container-site py-10">
        <h1 className="section-title mb-8">Contact</h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Info */}
          <div>
            <p className="text-charcoal/75 leading-relaxed">
              Une question, un projet de meuble sur mesure ? Contactez Meuble Aziz, nous serons
              ravis de vous accompagner.
            </p>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 flex items-center justify-center bg-brand text-cream rounded-full">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L7.9 9.8a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" />
                  </svg>
                </span>
                <div>
                  <p className="text-charcoal/60">Téléphone</p>
                  <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className="text-charcoal font-semibold">
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              <a
                href={whatsappLink("Bonjour Meuble Aziz, je souhaite des informations.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 text-sm font-medium uppercase tracking-wide hover:opacity-90"
              >
                <svg viewBox="0 0 32 32" className="w-5 h-5" fill="currentColor">
                  <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 29l8.3-1.6c1.7.9 3.7 1.4 5.7 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3z" />
                </svg>
                Discuter sur WhatsApp
              </a>
            </div>

            {/* Location placeholder */}
            <div className="mt-8">
              <p className="text-charcoal/60 text-sm mb-2">Localisation</p>
              <div className="aspect-[16/9] bg-beige border border-sand/70 flex items-center justify-center text-charcoal/50 text-sm">
                Emplacement à venir — Tunisie
              </div>
            </div>
          </div>

          {/* Form (UI only) */}
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="border border-sand/70 bg-white p-6 space-y-4"
            >
              <h2 className="font-serif text-xl text-charcoal">Envoyez-nous un message</h2>
              <div>
                <label className="block text-xs uppercase tracking-wide text-charcoal/60 mb-1">Nom</label>
                <input required className="w-full border border-sand px-3 py-2 text-sm focus:outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wide text-charcoal/60 mb-1">Téléphone</label>
                <input required className="w-full border border-sand px-3 py-2 text-sm focus:outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wide text-charcoal/60 mb-1">Message</label>
                <textarea required rows={4} className="w-full border border-sand px-3 py-2 text-sm focus:outline-none focus:border-brand" />
              </div>
              <button type="submit" className="btn-primary w-full">Envoyer</button>
              {sent && (
                <p className="text-sm text-green-700">
                  Merci ! Votre message a bien été pris en compte. Nous vous recontacterons rapidement.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
