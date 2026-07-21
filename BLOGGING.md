# Local blog workflow

The site is authored in Markdown and built with Hugo 0.164.0 and a pinned copy of PaperMod. Hugo writes the deployable site to `public/`; source files remain at the project root.

## Write a post

Each article is a Hugo leaf bundle: create one directory in `content/blog/` and
place the article in its `index.md` file. Keep article-specific images and
attachments beside that file.

```text
content/blog/
├── _index.md
└── 2026-07-21-flow-matching/
    ├── index.md
    ├── method.webp
    └── results.webp
```

Create a new draft from the project archetype:

```bash
npm run new:post -- flow-matching
```

The helper prefixes today's date, producing
`content/blog/2026-07-21-flow-matching/index.md`. The directory name is the
article URL, so this example is published at `/2026-07-21-flow-matching/`.
Renaming the directory changes the URL; the front matter does not need a
`slug` field.

```md
---
title: My research note
date: 2026-07-20
description: A short summary used on the index and in page metadata.
tags:
  - flow-matching
draft: true
---

Article content starts here.

![Method overview](method.webp)
```

Required front matter fields are `title`, `date`, and `description`. Set `draft: true` while writing; drafts are excluded from production builds and RSS.

## Preview drafts

```bash
npm run dev
```

Open `http://localhost:1313/blog/`. Drafts are included only in this local preview command.

## Create deployable files

```bash
npm run build
```

This builds the homepage, blog, RSS feed, sitemap, and theme assets into `public/`. The generated directory is ignored by Git and is intended for deployment artifacts only.

The PaperMod source is vendored under `themes/PaperMod/` and pinned in `themes/PaperMod/.upstream-commit`. Site-specific templates and styles belong in root-level `layouts/` and `assets/css/extended/`; do not edit the vendored theme for customization.

## Mathematics

KaTeX is self-hosted and automatically loaded on every article under `content/blog/`.
No per-post front matter flag is required; non-article pages do not load the math runtime.

Supported delimiters are `$...$` and `\(...\)` for inline math, plus `$$...$$`
and `\[...\]` for display math. Because single dollar signs enable inline math,
write a literal currency symbol as `\$`.
