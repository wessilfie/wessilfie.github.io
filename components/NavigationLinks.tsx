"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ThemeAwareLink from "./ThemeAwareLink";

function NavigationLinksContent() {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme");

  // Different arrow directions for Sea-Tac theme (airport wayfinding style)
  const arrows = theme === "sea"
    ? { home: "←", projects: "↑", writing: "→" }
    : { home: "→", projects: "→", writing: "→" };

  return (
    <div id="navigation-links">
      <div id="section-break-head">
        <div id="section-break"></div>
      </div>
      <div id="nav-links-container">
        <div className="nav-link-item">
          <span className="transit-arrow" aria-hidden="true">{arrows.home}</span>
          <ThemeAwareLink href="/">Home</ThemeAwareLink>
        </div>
        <div className="nav-link-item">
          <span className="transit-arrow" aria-hidden="true">{arrows.projects}</span>
          <ThemeAwareLink href="/projects">Projects</ThemeAwareLink>
        </div>
        <div className="nav-link-item">
          <span className="transit-arrow" aria-hidden="true">{arrows.writing}</span>
          <a href="https://essilfie.substack.com" target="_blank" rel="noopener noreferrer">Writing</a>
        </div>
      </div>
    </div>
  );
}

export default function NavigationLinks() {
  return (
    <Suspense fallback={
      <div id="navigation-links">
        <div id="section-break-head">
          <div id="section-break"></div>
        </div>
        <div id="nav-links-container">
          <div className="nav-link-item">
            <span className="transit-arrow" aria-hidden="true">→</span>
            <a href="/">Home</a>
          </div>
          <div className="nav-link-item">
            <span className="transit-arrow" aria-hidden="true">→</span>
            <a href="/projects">Projects</a>
          </div>
          <div className="nav-link-item">
            <span className="transit-arrow" aria-hidden="true">→</span>
            <a href="https://essilfie.substack.com" target="_blank" rel="noopener noreferrer">Writing</a>
          </div>
        </div>
      </div>
    }>
      <NavigationLinksContent />
    </Suspense>
  );
}
