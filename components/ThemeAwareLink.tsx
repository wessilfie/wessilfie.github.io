"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface ThemeAwareLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

export default function ThemeAwareLink({
  href,
  children,
  className,
  ...props
}: ThemeAwareLinkProps) {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme");

  // Add theme param to internal links if theme is set
  const finalHref = theme && !href.startsWith("http") && !href.startsWith("mailto:")
    ? `${href}${href.includes("?") ? "&" : "?"}theme=${theme}`
    : href;

  // External links
  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={finalHref} className={className} {...props}>
      {children}
    </Link>
  );
}
