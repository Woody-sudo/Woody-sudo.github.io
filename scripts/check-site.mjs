/** Validate the Hugo-generated research site without third-party dependencies. */

import { access, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const siteRoot = resolve(projectRoot, 'public');
const htmlPath = resolve(siteRoot, 'index.html');
const cssPath = resolve(siteRoot, 'assets/style.css');
const html = await readFile(htmlPath, 'utf8');
const css = await readFile(cssPath, 'utf8');

const failures = [];
const attributeValue = (match) => match[1] ?? match[2] ?? match[3];
const ids = new Set(
  [...html.matchAll(/\bid=(?:"([^"]+)"|'([^']+)'|([^\s>]+))/g)].map(attributeValue),
);
const targets = [
  ...html.matchAll(/\b(?:href|src)=(?:"([^"]+)"|'([^']+)'|([^\s>]+))/g),
].map(attributeValue);

for (const target of targets) {
  if (target.startsWith('#')) {
    if (!ids.has(target.slice(1))) failures.push(`Missing anchor target: ${target}`);
    continue;
  }

  if (/^(?:https?:|mailto:|tel:)/.test(target)) continue;

  // Cache-busting queries and fragments are URL metadata, not filesystem names.
  const localTarget = target.replace(/[?#].*$/, '');
  const relativeTarget = localTarget.replace(/^\/+/, '');
  const candidate = resolve(siteRoot, relativeTarget);
  const filesystemTarget = localTarget.endsWith('/')
    ? resolve(candidate, 'index.html')
    : candidate;

  try {
    await access(filesystemTarget);
  } catch {
    failures.push(`Missing local file: ${target}`);
  }
}

const structuralChecks = [
  ['doctype', /<!doctype html>/i],
  ['language declaration', /<html\s+[^>]*\blang=(?:"[^"]+"|'[^']+'|[^\s>]+)/i],
  ['main landmark', /<main\b/i],
  ['page title', /<title>[^<]+<\/title>/i],
  ['meta description', /<meta\s+[^>]*\bname=(?:"description"|'description'|description)(?:\s|>)/i],
  ['latest writing section', /<section\s+[^>]*\bid=(?:"writing"|'writing'|writing)(?:\s|>)/i],
];

for (const [label, pattern] of structuralChecks) {
  if (!pattern.test(html)) failures.push(`Missing ${label}`);
}

const latestPostCount = [...html.matchAll(/\bclass=(?:"read-more"|'read-more'|read-more)(?:\s|>)/g)].length;
if (latestPostCount !== 2) {
  failures.push(`Expected 2 latest blog posts on homepage, found ${latestPostCount}`);
}

const braceBalance = [...css].reduce((balance, character) => {
  if (character === '{') return balance + 1;
  if (character === '}') return balance - 1;
  return balance;
}, 0);

if (braceBalance !== 0) failures.push(`Unbalanced CSS braces: ${braceBalance}`);

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Site check passed: ${ids.size} IDs and ${targets.length} link/resource targets validated.`);
}
