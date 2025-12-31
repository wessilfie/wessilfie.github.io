"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const themes = [
  { id: "", label: "Sydney Metro", color: "#FF6900" },
  { id: "sea", label: "Sea-Tac Airport", color: "#EB002A" },
];

function ThemeSwitcherContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTheme = searchParams.get("theme") || "";

  const handleThemeChange = (themeId: string) => {
    if (themeId === "") {
      router.push(pathname);
    } else {
      router.push(`${pathname}?theme=${themeId}`);
    }
  };

  return (
    <div id="theme-switcher">
      <span className="theme-label">Theme:</span>
      <div className="theme-options">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className={`theme-button ${currentTheme === theme.id ? "active" : ""}`}
            style={{ "--theme-color": theme.color } as React.CSSProperties}
            title={theme.label}
          >
            <span className="theme-dot" />
            <span className="theme-name">{theme.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ThemeSwitcher() {
  return (
    <Suspense fallback={
      <div id="theme-switcher">
        <span className="theme-label">Theme:</span>
        <div className="theme-options">
          {themes.map((theme) => (
            <button
              key={theme.id}
              className="theme-button"
              style={{ "--theme-color": theme.color } as React.CSSProperties}
              title={theme.label}
            >
              <span className="theme-dot" />
              <span className="theme-name">{theme.label}</span>
            </button>
          ))}
        </div>
      </div>
    }>
      <ThemeSwitcherContent />
    </Suspense>
  );
}
