import Link from "next/link";

interface ServiceCardProps {
  href: string;
  number: string;
  title: string;
  description: string;
  cta: string;
}

export function ServiceCard({ href, number, title, description, cta }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-64 flex-col justify-between overflow-hidden border border-dc-white/10 bg-dc-bg-light p-6 transition-colors duration-300 hover:border-dc-accent sm:p-8"
    >
      <span
        aria-hidden="true"
        className="font-heading text-6xl text-dc-white/10 transition-colors duration-300 group-hover:text-dc-accent/30"
      >
        {number}
      </span>

      <div>
        <h3 className="font-heading text-2xl uppercase tracking-wide text-dc-white">
          {title}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-dc-white/60">
          {description}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-dc-accent">
          {cta}
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
