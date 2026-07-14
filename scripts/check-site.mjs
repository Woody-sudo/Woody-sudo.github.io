/** Validate the static research site without third-party dependencies. */

import { access, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = resolve(root, 'index.html');
const cssPath = resolve(root, 'assets/style.css');
const html = await readFile(htmlPath, 'utf8');
const css = await readFile(cssPath, 'utf8');

const failures = [];
const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]));
const targets = [...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)].map((match) => match[1]);

for (const target of targets) {
  if (target.startsWith('#')) {
    if (!ids.has(target.slice(1))) failures.push(`Missing anchor target: ${target}`);
    continue;
  }

  if (/^(?:https?:|mailto:|tel:)/.test(target)) continue;

  try {
    await access(resolve(root, target));
  } catch {
    failures.push(`Missing local file: ${target}`);
  }
}

const structuralChecks = [
  ['doctype', /<!doctype html>/i],
  ['language declaration', /<html\s+lang=["'][^"']+["']/i],
  ['main landmark', /<main\b/i],
  ['page title', /<title>[^<]+<\/title>/i],
  ['meta description', /<meta\s+name=["']description["']/i],
];

for (const [label, pattern] of structuralChecks) {
  if (!pattern.test(html)) failures.push(`Missing ${label}`);
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
