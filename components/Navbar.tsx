"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface NavbarProps {
  breadcrumb?: string;
  breadcrumbHref?: string;
}

function NavbarContent({ breadcrumb, breadcrumbHref }: NavbarProps) {
  const [time, setTime] = useState<string>("");
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();

      if (theme === "sea") {
        // 12-hour format for Sea-Tac
        let hour = date.getHours();
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12;
        hour = hour ? hour : 12; // 0 becomes 12
        const minute = date.getMinutes().toString().padStart(2, "0");
        setTime(`${hour}:${minute} ${ampm}`);
      } else {
        // 24-hour format for Sydney Metro
        const hour = date.getHours().toString().padStart(2, "0");
        const minute = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        setTime(`Time now ${hour}:${minute}:${seconds}`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [theme]);

  // Helper to add theme param to internal links
  const getHref = (href: string) => {
    if (theme && !href.startsWith("http")) {
      return `${href}${href.includes("?") ? "&" : "?"}theme=${theme}`;
    }
    return href;
  };

  return (
    <nav id="navbar">
      <div className="navbar-left">
        <Link href={getHref("/")} className={`noselect ${theme === "sea" ? "sea-arrow-box" : ""}`}>
          {theme === "sea" ? (
            /* Simple Arrow for Sea-Tac (inside red square via CSS) */
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          ) : (
            /* Circle Arrow Icon for Sydney Metro */
            <svg
              width="32"
              height="32"
              viewBox="0 0 512 512"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z" />
            </svg>
          )}
        </Link>
        {breadcrumb && (
          <>
            <span className="breadcrumb-separator">/</span>
            <Link
              href={getHref(breadcrumbHref || "#")}
              className="noselect breadcrumb-link"
            >
              {breadcrumb}
            </Link>
          </>
        )}
      </div>
      <span className="noselect" id="time">
        {time || "WE"}
      </span>
    </nav>
  );
}

export default function Navbar({ breadcrumb, breadcrumbHref }: NavbarProps) {
  return (
    <Suspense
      fallback={
        <nav id="navbar">
          <div className="navbar-left">
            <Link href="/" className="noselect">
              <svg
                width="32"
                height="32"
                viewBox="0 0 512 512"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z" />
              </svg>
            </Link>
            {breadcrumb && (
              <>
                <span className="breadcrumb-separator">/</span>
                <Link href={breadcrumbHref || "#"} className="noselect breadcrumb-link">
                  {breadcrumb}
                </Link>
              </>
            )}
          </div>
          <span className="noselect" id="time">
            WE
          </span>
        </nav>
      }
    >
      <NavbarContent breadcrumb={breadcrumb} breadcrumbHref={breadcrumbHref} />
    </Suspense>
  );
}
