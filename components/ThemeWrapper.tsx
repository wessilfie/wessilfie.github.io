"use client";

import { Suspense } from "react";
import ThemeProvider from "./ThemeProvider";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <ThemeProvider>{children}</ThemeProvider>
    </Suspense>
  );
}
