"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const theme = searchParams.get("theme");

    if (theme === "sea" || theme === "nyc") {
      document.documentElement.setAttribute("data-theme", theme);
      document.body.setAttribute("data-theme", theme);
    } else {
      document.documentElement.removeAttribute("data-theme");
      document.body.removeAttribute("data-theme");
    }
  }, [searchParams]);

  return <>{children}</>;
}
