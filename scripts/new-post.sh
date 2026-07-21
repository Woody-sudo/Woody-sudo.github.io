#!/usr/bin/env bash
set -euo pipefail

article_slug="${1:-}"

if [[ ! "$article_slug" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
  echo "Usage: npm run new:post -- article-slug" >&2
  echo "Use lowercase letters, numbers, and single hyphens." >&2
  exit 1
fi

folder="$(date +%F)-${article_slug}"
target="content/blog/${folder}/index.md"

if [[ -e "$target" ]]; then
  echo "Post already exists: $target" >&2
  exit 1
fi

# A leaf bundle keeps the article and its private assets in one directory.
exec .tools/hugo new content "blog/${folder}/index.md"
