"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const theme = searchParams.get("theme");

    if (theme === "sea") {
      document.documentElement.setAttribute("data-theme", "sea");
      document.body.setAttribute("data-theme", "sea");
    } else {
      document.documentElement.removeAttribute("data-theme");
      document.body.removeAttribute("data-theme");
    }
  }, [searchParams]);

  return <>{children}</>;
}
