"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Project {
  slug: string;
  title: string;
  imageSlug?: string;
  externalLink?: string;
  contentHtml?: string;
}

function ProjectContent({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme");
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch(`/api/projects/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProject(data);
        } else {
          setProject(null);
        }
      } catch {
        setProject(null);
      }
      setLoading(false);
    }
    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <div id="page-container">
        <div id="content-wrap">
          <Navbar breadcrumb="Projects" breadcrumbHref={theme ? `/projects?theme=${theme}` : "/projects"} />
          <div className="blog-info">
            <h1 className="blog-title">Loading...</h1>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  if (!project) {
    notFound();
  }

  return (
    <div id="page-container">
      <div id="content-wrap">
        <Navbar breadcrumb="Projects" breadcrumbHref={theme ? `/projects?theme=${theme}` : "/projects"} />

        <div className="blog-info">
          <h1 className="blog-title">{project.title}</h1>
        </div>

        {project.imageSlug && (
          <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "0 32px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.imageSlug}
              alt={project.title}
              style={{ maxWidth: "100%", maxHeight: "400px", height: "auto" }}
            />
          </div>
        )}

        {project.contentHtml && (
          <div
            className="blog-box"
            dangerouslySetInnerHTML={{ __html: project.contentHtml }}
          />
        )}

        {project.externalLink && (
          <div style={{ textAlign: "center", padding: "16px 32px" }}>
            <a
              href={project.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="button"
            >
              Visit Project
            </a>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  if (!slug) {
    return (
      <div id="page-container">
        <div id="content-wrap">
          <Navbar breadcrumb="Projects" breadcrumbHref="/projects" />
          <div className="blog-info">
            <h1 className="blog-title">Loading...</h1>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div id="page-container">
        <div id="content-wrap">
          <Navbar breadcrumb="Projects" breadcrumbHref="/projects" />
          <div className="blog-info">
            <h1 className="blog-title">Loading...</h1>
          </div>
          <Footer />
        </div>
      </div>
    }>
      <ProjectContent slug={slug} />
    </Suspense>
  );
}
