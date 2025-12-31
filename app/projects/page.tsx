"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

// Project data with internal links
const projects = [
  { title: "Dear First Year", slug: "dearfirstyear" },
  { title: "Will's Favorite Recipes", slug: "favoriterecipes" },
  { title: "Product Management Resources", slug: "productresources" },
  { title: "Coffee@CU", slug: "coffeecu" },
  { title: "LionBot", slug: "lionbot" },
  { title: "The Most Important Site in Human History", slug: "foodrecs" },
];

const writings = [
  { title: "Technical Writing - Twilio", slug: "twilio" },
  { title: "Intro to Resumes", slug: "resumes" },
  { title: "The Columbia Lion", slug: "thelion" },
];

const education = [
  { title: "ADI", slug: "adi" },
];

interface SectionProps {
  title: string;
  items: { title: string; slug: string }[];
  theme: string | null;
}

function ProjectSection({ title, items, theme }: SectionProps) {
  const getHref = (slug: string) => {
    const base = `/projects/${slug}`;
    return theme ? `${base}?theme=${theme}` : base;
  };

  return (
    <>
      <h2 id="project-header">{title}</h2>
      <ul id="breakdown-list">
        {items.map((item) => (
          <li key={item.slug} id="list-bullet">
            <Link href={getHref(item.slug)}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function ProjectsContent() {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme");

  return (
    <div id="page-container">
      <div id="content-wrap">
        <Navbar breadcrumb="Will Essilfie" breadcrumbHref="/" />
        <Header showBio={false} />

        <div id="project-box">
          <ProjectSection title="Projects" items={projects} theme={theme} />
          <ProjectSection title="Writings, Talks, & Presentations" items={writings} theme={theme} />
          <ProjectSection title="Teaching & Education" items={education} theme={theme} />
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div id="page-container">
        <div id="content-wrap">
          <Navbar breadcrumb="Will Essilfie" breadcrumbHref="/" />
          <Header showBio={false} />
          <div id="project-box">Loading...</div>
          <Footer />
        </div>
      </div>
    }>
      <ProjectsContent />
    </Suspense>
  );
}
