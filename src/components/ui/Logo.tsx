import Image from "next/image";
import Link from "next/link";
import logoWhite from "../../../public/logo-white.png";

interface LogoProps {
  className?: string;
  priority?: boolean;
}

/**
 * The header/footer always sit on the dark navy background (§4), so the
 * white logo variant is used everywhere it appears in the UI. The black
 * variant remains available in /public/logo-black.png for any future
 * light-background surface.
 */
export function Logo({ className, priority }: LogoProps) {
  return (
    <Link href="/" aria-label="DRESSCODE — retour à l'accueil" className={className}>
      <Image
        src={logoWhite}
        alt="DRESSCODE"
        priority={priority}
        className="h-10 w-auto sm:h-12"
      />
    </Link>
  );
}
