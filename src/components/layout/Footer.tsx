import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const NAV_LINKS = [
  { href: "/boutique", label: "Boutique" },
  { href: "/galerie", label: "Galerie" },
  { href: "/shooting", label: "Shooting" },
  { href: "/relooking", label: "Relooking" },
];

export function Footer() {
  return (
    <footer className="border-t border-dc-white/10 bg-dc-bg">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 font-accent text-3xl text-dc-accent">Dresscode</p>
            <p className="mt-2 text-sm leading-relaxed text-dc-white/60">
              Maison de stylisme. Tenues sur-mesure, shootings et relookings pour
              celles et ceux qui font de la mode une scène à part entière.
            </p>
          </div>

          <nav aria-label="Navigation du pied de page" className="flex flex-col gap-3">
            <span className="font-sans text-xs uppercase tracking-widest text-dc-white/40">
              Explorer
            </span>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-dc-white/70 transition-colors hover:text-dc-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="font-sans text-xs uppercase tracking-widest text-dc-white/40">
              Contact
            </span>
            <p className="text-sm text-dc-white/70">Sur rendez-vous, en ville.</p>
            <p className="text-sm text-dc-white/70">Commandes via la boutique en ligne.</p>
          </div>
        </div>

        <div className="mt-10 border-t border-dc-white/10 pt-6 text-center text-xs text-dc-white/40">
          © {new Date().getFullYear()} DRESSCODE — Projet de stylisme roleplay. Aucun paiement réel n&apos;est effectué sur ce site.
        </div>
      </div>
    </footer>
  );
}
