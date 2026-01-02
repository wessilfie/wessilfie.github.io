"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import MTACountdown from "./MTACountdown";

interface HeaderProps {
  showBio?: boolean;
  showCountdown?: boolean;
}

function HeaderContent({ showBio = true, showCountdown = false }: HeaderProps) {
  const searchParams = useSearchParams();
  const currentTheme = searchParams.get("theme") || "";

  // Location text based on theme
  let cityText = "via New York, NY";
  if (currentTheme === "sea") {
    cityText = "via Seattle, WA";
  } else if (currentTheme === "nyc") {
    cityText = "Downtown & Brooklyn";
  }

  return (
    <>
      {/* Intro Section with Logo */}
      <div id="intro-section">
        <div id="img-box">
          <Image
            className="noselect"
            src="/img/transitlogos/we.svg"
            alt="essilfie.com logo"
            width={112}
            height={112}
            priority
          />
        </div>
        <div className="flex-container">
          <div id="name-container">
            <h1 className="noselect" id="name-header">
              Will Essilfie
            </h1>
          </div>
          <div id="platform-container">
            <h2 className="noselect" id="platform-name">
              Platform
            </h2>
          </div>
          <div>
            <h2 className="noselect" id="via-city">
              {cityText}
            </h2>
          </div>
          <div id="number-container">
            <h2 className="noselect" id="platform-number">
              1
            </h2>
          </div>
        </div>
      </div>

      {/* Section Break with hanging countdown */}
      <div id="section-break-head" className="section-break-container">
        <div id="section-break"></div>
        {showCountdown && <MTACountdown />}
      </div>

      {/* About Me */}
      {showBio && (
        <div id="about-me">
          <p>
            I&apos;m a Lead Product Manager at{" "}
            <a
              className="link-tpt"
              href="https://www.teacherspayteachers.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              TPT
            </a>{" "}
            (Core Marketplace), an Executive MBA candidate at{" "}
            <a
              className="link-columbia"
              href="https://business.columbia.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Columbia Business School
            </a>
            , and a freelance writer for{" "}
            <a
              className="link-bankrate"
              href="https://www.bankrate.com/authors/will-essilfie/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bankrate
            </a>
            . I care about using technology and AI to create experiences that
            bring people together in the real world, something I explore through
            travel, theater, and writing my first play.
          </p>
        </div>
      )}
    </>
  );
}

export default function Header({ showBio = true, showCountdown = false }: HeaderProps) {
  return (
    <Suspense fallback={
      <>
        <div id="intro-section">
          <div id="img-box">
            <Image
              className="noselect"
              src="/img/transitlogos/we.svg"
              alt="essilfie.com logo"
              width={112}
              height={112}
              priority
            />
          </div>
          <div className="flex-container">
            <div id="name-container">
              <h1 className="noselect" id="name-header">
                Will Essilfie
              </h1>
            </div>
            <div id="platform-container">
              <h2 className="noselect" id="platform-name">
                Platform
              </h2>
            </div>
            <div>
              <h2 className="noselect" id="via-city">
                via New York, NY
              </h2>
            </div>
            <div id="number-container">
              <h2 className="noselect" id="platform-number">
                1
              </h2>
            </div>
          </div>
        </div>
        <div id="section-break-head">
          <div id="section-break"></div>
        </div>
        {showBio && (
          <div id="about-me">
            <p>
              I&apos;m a Lead Product Manager at{" "}
              <a className="link-tpt" href="https://www.teacherspayteachers.com" target="_blank" rel="noopener noreferrer">TPT</a>{" "}
              (Core Marketplace), an Executive MBA candidate at{" "}
              <a className="link-columbia" href="https://business.columbia.edu" target="_blank" rel="noopener noreferrer">Columbia Business School</a>
              , and a freelance writer for{" "}
              <a className="link-bankrate" href="https://www.bankrate.com/authors/will-essilfie/" target="_blank" rel="noopener noreferrer">Bankrate</a>
              . I care about using technology and AI to create experiences that
              bring people together in the real world, something I explore through
              travel, theater, and writing my first play.
            </p>
          </div>
        )}
      </>
    }>
      <HeaderContent showBio={showBio} showCountdown={showCountdown} />
    </Suspense>
  );
}
