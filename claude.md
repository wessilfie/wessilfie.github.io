1. Project Objective
Transition essilfie.com (Jekyll/GitHub Pages) from a hard-coded Sydney Metro theme to a dynamic, variable-driven architecture. The goal is to allow local testing and eventually subdomain-based skinning (e.g., sea.essilfie.com) by using a data-theme attribute on the <body> tag.

2. Technical Requirements for Claude Code
A. CSS Refactor (Design Tokens)

Claude, do not overwrite styles. Instead, create a Design Token system:

Extract Tokens: Move all Sydney Metro colors (Orange, Blue, Grey) and fonts into a :root block using variables like --brand-bg, --brand-accent, and --font-primary.

Apply Variables: Update the site’s main .css or .scss files to reference these variables.

Jekyll Compatibility: Ensure you are editing the source SCSS files (usually in _sass/ or assets/css/) rather than the processed output in _site/.

B. Sea-Tac (SEA) Theme Specs

When [data-theme="sea"] is active, apply these official Sea-Tac Wayfinding Standards:

Colors:

--brand-bg: #2D2926 (Black C)

--brand-text: #FFFFFF (White)

--brand-accent-primary: #FFC72C (Aviation Yellow)

--nav-arrow-bg: #EB002A (Regulatory Red)

Typography: Use Vegur font (Bold for "Will Essilfie" header, Regular for Bio).

Terminology: Override the "Platform 1" status to "Gate SEA" or "Concourse A".

Icons: Use Aviation Yellow for section icons (Baggage for Projects, Info for Writing).

Directional Arrows: Implement the "Red Square" component—white arrow glyph centered in a #EB002A square.

3. Local Execution & Testing
Claude, you must ensure the site can be built and tested locally:

Verify Jekyll Environment: Check for Gemfile or _config.yml to confirm build dependencies.

Local Server: Use bundle exec jekyll serve or jekyll serve to preview changes.

URL Toggle: Add a small JavaScript snippet to assets/js/theme-toggle.js that checks for ?theme=sea in the URL and applies the data-theme="sea" attribute to the <body> automatically.