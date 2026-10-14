#!/usr/bin/env node
/**
 * Content-rules check, run after every build (and in CI).
 * Enforces the handoff's non-negotiable rules that a machine can check:
 *   - no retired or discontinued product names
 *   - no general-availability signals (sign-up, free trial, pricing language)
 *   - no unverifiable social-proof claims
 *   - AI is not the lead message
 *   - the 7th C, if named, is Controlling
 * It also reports remaining [placeholders] and page weight (target < 1 MB).
 * It cannot check whether a pilot organisation is identifiable: review that by hand.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

const BANNED = [
  // Retired and discontinued names
  [/\bKaris\s+Strategy\b/i, 'retired name "Karis Strategy"'],
  [/\bKaris\s+Cascade\b/i, 'retired name "Karis Cascade"'],
  [/\bCascade\s+Engine\b/i, 'retired name "Cascade Engine"'],
  [/\bKaris\s+Plan\b/i, 'retired name "Karis Plan"'],
  [/\bKaris\s+Performance\b/i, 'retired name "Karis Performance"'],
  [/\bKaris\s*Learning\b/i, 'discontinued "KarisLearning"'],
  [/D['’]?\s*Cesion/i, "discontinued \"Karis D'Cesion\""],
  // General-availability signals
  [/\bsign[\s-]?up\b/i, '"Sign up" (CASPA™ is in pilot)'],
  [/\bstart\s+(for\s+)?free\b/i, '"Start free"'],
  [/\bfree\s+trial\b/i, '"free trial"'],
  [/\bno\s+credit\s+card\b/i, '"No credit card required"'],
  [/\bper\s+(user|seat|month)\b/i, 'pricing language'],
  // Unverifiable claims
  [/\btrusted\s+by\b/i, '"trusted by" claim'],
  [/\bdeployed\s+globally\b/i, '"deployed globally" claim'],
  [/\bcertified\s+practitioners?\b/i, 'certified-practitioner claim'],
  // Positioning
  [/\bAI[\s-]powered\b/i, '"AI-powered" (lead with traceability)'],
];

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (entry.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/\s(?:alt|aria-label|title|content)="([^"]*)"/gi, ' $1 ') // keep text in key attributes
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');
}

const files = await htmlFiles(DIST).catch(() => {
  console.error('No dist/ folder. Run "npm run build" first.');
  process.exit(1);
});

let failures = 0;
let placeholders = 0;

for (const file of files) {
  const name = relative(DIST, file);
  const html = await readFile(file, 'utf8');
  const text = visibleText(html);

  for (const [pattern, label] of BANNED) {
    const m = text.match(pattern);
    if (m) {
      failures++;
      console.error(`✗ ${name}: ${label} (found "${m[0]}")`);
    }
  }

  for (const m of text.matchAll(/\b(7th|seventh)\s+C\b[^.]{0,40}/gi)) {
    if (!/controlling/i.test(m[0])) {
      failures++;
      console.error(`✗ ${name}: the 7th C must be Controlling ("${m[0].trim()}")`);
    }
  }

  const count = (html.match(/data-placeholder/g) || []).length;
  placeholders += count;

  const { size } = await stat(file);
  if (size > 1_000_000) console.warn(`! ${name}: HTML is ${(size / 1e6).toFixed(2)} MB (target under 1 MB)`);
}

console.log(`Content check: ${files.length} pages, ${placeholders} placeholders still to fill.`);
if (failures) {
  console.error(`Content check failed with ${failures} problem(s).`);
  process.exit(1);
}
console.log('Content check passed.');
