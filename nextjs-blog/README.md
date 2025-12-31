# essilfie.com (Next.js)

Personal portfolio site for Will Essilfie, built with Next.js 15 and React 19.

## Features

- **Transit-themed design** with multiple theme support (Sydney Metro, Sea-Tac Airport)
- **Theme switching** via URL query parameter (`?theme=sea`)
- **Projects showcase** with markdown-based content
- **Responsive layout** optimized for mobile, tablet, and desktop

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd nextjs-blog
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
nextjs-blog/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── projects/          # Projects listing and detail pages
│   ├── globals.css        # Global styles and theme variables
│   └── layout.tsx         # Root layout with theme support
├── components/            # React components
│   ├── Header.tsx         # Site header with bio
│   ├── Footer.tsx         # Site footer with navigation
│   ├── Navbar.tsx         # Top navigation bar
│   ├── ThemeSwitcher.tsx  # Theme toggle component
│   └── ThemeAwareLink.tsx # Links that preserve theme state
├── lib/                   # Utility functions
│   └── projects.ts        # Project data loading from markdown
└── public/               # Static assets
    └── img/              # Images for projects and site
```

## Themes

Switch themes by adding `?theme=sea` to the URL:

- **Sydney Metro** (default): Orange accent, military time
- **Sea-Tac Airport**: Aviation yellow accent, 12-hour time, Seattle location

## Content

Projects are loaded from markdown files in the parent `_projects/` directory, maintaining compatibility with the Jekyll version of the site.

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - Markdown frontmatter parsing
- [unified](https://unifiedjs.com/) - Markdown processing
