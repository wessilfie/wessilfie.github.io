"use client";

import { Suspense } from "react";
import ThemeAwareLink from "./ThemeAwareLink";
import ThemeSwitcher from "./ThemeSwitcher";

function FooterContent() {
  return (
    <div id="footer-wrapper">
      <ThemeSwitcher />
      <footer id="footer">
        <div className="footer-left">
          <span className="footer-name">
            <span className="footer-firstname">Will</span>
            <br className="mobile-break" />
            <span className="desktop-space"> </span>
            <span className="footer-lastname">Essilfie</span>
          </span>
        </div>
        <nav className="footer-right">
          <ThemeAwareLink href="/">Home</ThemeAwareLink>
          <span className="footer-dot">·</span>
          <ThemeAwareLink href="/projects">Projects</ThemeAwareLink>
          <span className="footer-dot">·</span>
          <a href="https://essilfie.substack.com" target="_blank" rel="noopener noreferrer">Writing</a>
          <span className="footer-dot">·</span>
          <a href="https://linkedin.com/in/wessilfie" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span className="footer-dot">·</span>
          <a href="https://github.com/wessilfie" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span className="footer-dot">·</span>
          <a href="https://instagram.com/wessilfie" target="_blank" rel="noopener noreferrer">Instagram</a>
          <span className="footer-dot">·</span>
          <a href="mailto:will@essilfie.com">Email</a>
        </nav>
      </footer>
    </div>
  );
}

export default function Footer() {
  return (
    <Suspense fallback={
      <div id="footer-wrapper">
        <div id="theme-switcher">
          <span className="theme-label">Theme:</span>
          <div className="theme-options" />
        </div>
        <footer id="footer">
          <div className="footer-left">
            <span className="footer-name">
              <span className="footer-firstname">Will</span>
              <br className="mobile-break" />
              <span className="desktop-space"> </span>
              <span className="footer-lastname">Essilfie</span>
            </span>
          </div>
          <nav className="footer-right">
            <a href="/">Home</a>
            <span className="footer-dot">·</span>
            <a href="/projects">Projects</a>
            <span className="footer-dot">·</span>
            <a href="https://essilfie.substack.com" target="_blank" rel="noopener noreferrer">Writing</a>
            <span className="footer-dot">·</span>
            <a href="https://linkedin.com/in/wessilfie" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span className="footer-dot">·</span>
            <a href="https://github.com/wessilfie" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span className="footer-dot">·</span>
            <a href="https://instagram.com/wessilfie" target="_blank" rel="noopener noreferrer">Instagram</a>
            <span className="footer-dot">·</span>
            <a href="mailto:will@essilfie.com">Email</a>
          </nav>
        </footer>
      </div>
    }>
      <FooterContent />
    </Suspense>
  );
}
