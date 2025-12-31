import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";

const projectsDirectory = path.join(process.cwd(), "../_projects");

export interface Project {
  slug: string;
  title: string;
  date: string;
  categories: string;
  externalLink?: string;
  imageSlug?: string;
  content: string;
  contentHtml?: string;
}

export function getAllProjectSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(projectsDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith(".markdown"))
      .map((fileName) => fileName.replace(/\.markdown$/, ""));
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.markdown`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    // Clean up Jekyll-specific syntax
    let cleanContent = content
      .replace(/\{:target="_blank"\}/g, "")
      .replace(/\{:\s*#post-image\s*\}/g, "")
      .replace(/\{\{site\.url\}\}/g, "");

    // Process markdown to HTML
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeStringify)
      .process(cleanContent);

    return {
      slug,
      title: data.title || slug,
      date: data.date ? new Date(data.date).toISOString() : "",
      categories: data.categories || "",
      externalLink: data.external_link,
      imageSlug: data.image_slug,
      content: cleanContent,
      contentHtml: processedContent.toString(),
    };
  } catch {
    return null;
  }
}

export function getAllProjects(): Project[] {
  const slugs = getAllProjectSlugs();
  const projects: Project[] = [];

  for (const slug of slugs) {
    try {
      const fullPath = path.join(projectsDirectory, `${slug}.markdown`);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      projects.push({
        slug,
        title: data.title || slug,
        date: data.date ? new Date(data.date).toISOString() : "",
        categories: data.categories || "",
        externalLink: data.external_link,
        imageSlug: data.image_slug,
        content,
      });
    } catch {
      // Skip invalid files
    }
  }

  return projects.sort((a, b) => (a.date > b.date ? -1 : 1));
}
