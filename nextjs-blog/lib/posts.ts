import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  externalLink?: string;
  imageSlug?: string;
  excerpt?: string;
}

export interface Post extends PostMeta {
  content: string;
}

// Parse Jekyll filename format: YYYY-MM-DD-title.md
function parseJekyllFilename(filename: string): { date: string; slug: string } {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.(md|markdown)$/);
  if (!match) {
    throw new Error(`Invalid Jekyll filename format: ${filename}`);
  }
  return {
    date: match[1],
    slug: match[2],
  };
}

// Clean Jekyll-specific markdown syntax (like {:target="_blank"})
function cleanJekyllMarkdown(content: string): string {
  // Remove Jekyll kramdown attributes like {:target="_blank"}
  return content.replace(/\{:[^}]+\}/g, "");
}

// Convert markdown to HTML
async function markdownToHtml(markdown: string): Promise<string> {
  const cleanedMarkdown = cleanJekyllMarkdown(markdown);

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(cleanedMarkdown);

  return result.toString();
}

// Get all post slugs for static generation
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".md") || name.endsWith(".markdown"))
    .map((name) => parseJekyllFilename(name).slug);
}

// Get metadata for all posts (for listing)
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith(".md") || name.endsWith(".markdown"))
    .map((fileName) => {
      const { slug } = parseJekyllFilename(fileName);
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // Generate excerpt from content (first 160 chars)
      const plainText = content
        .replace(/#{1,6}\s/g, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[*_`]/g, "")
        .trim();
      const excerpt = plainText.slice(0, 160) + (plainText.length > 160 ? "..." : "");

      return {
        slug,
        title: data.title || slug,
        date: data.date
          ? new Date(data.date).toISOString().split("T")[0]
          : parseJekyllFilename(fileName).date,
        categories: data.categories
          ? typeof data.categories === "string"
            ? data.categories.split(" ")
            : data.categories
          : [],
        externalLink: data.external_link,
        imageSlug: data.image_slug,
        excerpt,
      } as PostMeta;
    });

  // Sort by date descending
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!fs.existsSync(postsDirectory)) {
    return null;
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const fileName = fileNames.find((name) => {
    if (!name.endsWith(".md") && !name.endsWith(".markdown")) return false;
    try {
      return parseJekyllFilename(name).slug === slug;
    } catch {
      return false;
    }
  });

  if (!fileName) {
    return null;
  }

  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const htmlContent = await markdownToHtml(content);

  return {
    slug,
    title: data.title || slug,
    date: data.date
      ? new Date(data.date).toISOString().split("T")[0]
      : parseJekyllFilename(fileName).date,
    categories: data.categories
      ? typeof data.categories === "string"
        ? data.categories.split(" ")
        : data.categories
      : [],
    externalLink: data.external_link,
    imageSlug: data.image_slug,
    content: htmlContent,
  };
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
