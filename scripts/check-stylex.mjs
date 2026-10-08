#!/usr/bin/env node
// Guardrail for good-css adoption (plan P0.3): fails on banned StyleX patterns
// in packages/react/src/**/*.ts{,x}. Known violations live in
// scripts/check-stylex.allowlist.mjs with a reason each; remove entries as
// phases fix them. Permanent exceptions use an inline disable comment:
//
//   top: 0, // check-stylex-disable-line physical -- anchored popover
//
// Usage: node scripts/check-stylex.mjs [--root <dir>] [--generate-allowlist]
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, dirname, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));

const PHYSICAL_KEYS = [
  'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
  'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
  'borderTop', 'borderBottom', 'borderLeft', 'borderRight',
  'borderTopWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderRightWidth',
  'borderTopStyle', 'borderBottomStyle', 'borderLeftStyle', 'borderRightStyle',
  'borderTopColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor',
  'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius',
  'top', 'left', 'right', 'bottom',
];
const PHYSICAL_RE = new RegExp(`\\b(${PHYSICAL_KEYS.join('|')})\\s*:`, 'g');
const TEXT_ALIGN_RE = /\btextAlign\s*:\s*['"](left|right)['"]/g;
const FLOAT_RE = /\b(float|clear)\s*:\s*['"](left|right)['"]/g;
const OUTLINE_NONE_RE = /\boutline\s*:\s*(?:['"]none['"]|0\b)/g;
const OVERFLOW_HIDDEN_RE = /\b(overflow(?:X|Y|Block|Inline)?)\s*:\s*['"]hidden\b/g;
const TRANSITION_ALL_RE = /\b(transition(?:Property)?)\s*:\s*['"]all\b/g;
const EASE_IN_RE = /ease-in(?!-out)/g;
const HOVER_KEY_RE = /(['"])(:hover[^'"]*)\1\s*:/g;
const HOVER_MEDIA_RE =
  /['"]@media\s*\(\s*hover\s*:\s*hover\s*\)\s*and\s*\(\s*pointer\s*:\s*fine\s*\)['"]\s*:/g;
const DISABLE_RE = /check-stylex-disable-(line|next-line)\s+([a-z-, ]+?)(?:\s*--\s*(.+))?$/;

/** Strip // and block comments, replacing them with spaces so indices survive. */
function stripComments(text) {
  const out = [...text];
  const blank = (from, to) => {
    for (let k = from; k < to; k++) if (out[k] !== '\n') out[k] = ' ';
  };
  let i = 0;
  let quote = null;
  let inBlock = false;
  while (i < text.length) {
    const c = text[i];
    const next = text[i + 1];
    if (inBlock) {
      if (c === '*' && next === '/') {
        blank(i, i + 2);
        i += 2;
        inBlock = false;
      } else {
        if (c !== '\n') out[i] = ' ';
        i++;
      }
      continue;
    }
    if (quote) {
      if (c === '\\') i += 2;
      else {
        if (c === quote) quote = null;
        i++;
      }
      continue;
    }
    if (c === "'" || c === '"' || c === '`') {
      quote = c;
      i++;
    } else if (c === '/' && next === '/') {
      const end = text.indexOf('\n', i);
      const stop = end === -1 ? text.length : end;
      blank(i, stop);
      i = stop;
    } else if (c === '/' && next === '*') {
      inBlock = true;
      blank(i, i + 2);
      i += 2;
    } else i++;
  }
  return out.join('');
}

const lineOf = (text, index) => text.slice(0, index).split('\n').length;

/** Brace spans of `@media (hover: hover) and (pointer: fine)` value objects. */
function hoverMediaSpans(code) {
  const spans = [];
  for (const m of code.matchAll(HOVER_MEDIA_RE)) {
    let i = m.index + m[0].length;
    while (i < code.length && /\s/.test(code[i])) i++;
    if (code[i] !== '{') continue;
    let depth = 0;
    let quote = null;
    for (let j = i; j < code.length; j++) {
      const c = code[j];
      if (quote) {
        if (c === '\\') j++;
        else if (c === quote) quote = null;
        continue;
      }
      if (c === "'" || c === '"' || c === '`') quote = c;
      else if (c === '{') depth++;
      else if (c === '}') {
        depth--;
        if (depth === 0) {
          spans.push([i, j]);
          break;
        }
      }
    }
  }
  return spans;
}

/**
 * Check one file's source. Returns violations as
 * { file, line, rule, fragment, message }.
 */
export function checkSource(file, text) {
  const violations = [];
  const code = stripComments(text);
  const lines = code.split('\n');
  const rawLines = text.split('\n');
  const push = (line, rule, fragment, message) => violations.push({ file, line, rule, fragment, message });

  // Inline disables, from the original text (the stripped copy lost them).
  const disabled = new Map(); // line (1-based) -> Set<rule>
  rawLines.forEach((raw, idx) => {
    const m = raw.match(DISABLE_RE);
    if (!m) return;
    const [, kind, rules, reason] = m;
    const target = kind === 'line' ? idx + 1 : idx + 2;
    if (!reason?.trim()) {
      push(idx + 1, 'disable-reason', `disable-${kind}`, 'disable comment needs a reason after --');
      return;
    }
    if (!disabled.has(target)) disabled.set(target, new Set());
    for (const r of rules.split(/[,\s]+/).filter(Boolean)) disabled.get(target).add(r);
  });
  const allowed = (line, rule) => disabled.get(line)?.has(rule) ?? false;

  lines.forEach((line, idx) => {
    const n = idx + 1;
    for (const m of line.matchAll(PHYSICAL_RE)) {
      if (!allowed(n, 'physical')) push(n, 'physical', m[1], `use a logical property instead of '${m[1]}'`);
    }
    for (const m of line.matchAll(TEXT_ALIGN_RE)) {
      if (!allowed(n, 'physical')) push(n, 'physical', `textAlign:${m[1]}`, `use textAlign: 'start'/'end' instead of '${m[1]}'`);
    }
    for (const m of line.matchAll(FLOAT_RE)) {
      if (!allowed(n, 'physical')) push(n, 'physical', `${m[1]}:${m[2]}`, `use a logical layout instead of ${m[1]}: '${m[2]}'`);
    }
    for (const m of line.matchAll(OUTLINE_NONE_RE)) {
      if (!allowed(n, 'outline-none')) push(n, 'outline-none', 'outline', "never write outline: 'none' (good-css 5.1)");
    }
    for (const m of line.matchAll(OVERFLOW_HIDDEN_RE)) {
      if (!allowed(n, 'overflow-hidden')) push(n, 'overflow-hidden', m[1], `use overflow: 'clip' instead of '${m[1]}: hidden'`);
    }
    for (const m of line.matchAll(TRANSITION_ALL_RE)) {
      if (!allowed(n, 'transition-all')) push(n, 'transition-all', m[1], `name properties instead of ${m[1]}: 'all'`);
    }
    if (EASE_IN_RE.test(line)) {
      EASE_IN_RE.lastIndex = 0;
      if (!allowed(n, 'ease-in')) push(n, 'ease-in', 'ease-in', 'never use ease-in (good-css motion)');
    }
  });

  const spans = hoverMediaSpans(code);
  for (const m of code.matchAll(HOVER_KEY_RE)) {
    const inside = spans.some(([from, to]) => m.index > from && m.index < to);
    if (inside) continue;
    const n = lineOf(code, m.index);
    if (!allowed(n, 'hover-media')) {
      push(n, 'hover-media', `${m[1]}${m[2]}${m[1]}`, 'put :hover inside @media (hover: hover) and (pointer: fine)');
    }
  }

  return violations.sort((a, b) => a.line - b.line || (a.rule < b.rule ? -1 : 1));
}

const keyOf = (v) => `${v.file}\0${v.rule}\0${v.fragment}`;

/** Split violations into unlisted ones and stale allowlist entries. */
export function applyAllowlist(violations, allowlist) {
  const remaining = new Map();
  for (const e of allowlist) {
    const k = keyOf(e);
    remaining.set(k, (remaining.get(k) ?? 0) + 1);
  }
  const unlisted = [];
  for (const v of violations) {
    const k = keyOf(v);
    const n = remaining.get(k) ?? 0;
    if (n > 0) remaining.set(k, n - 1);
    else unlisted.push(v);
  }
  const seen = new Map();
  for (const v of violations) {
    const k = keyOf(v);
    seen.set(k, (seen.get(k) ?? 0) + 1);
  }
  const stale = [];
  const consumed = new Map();
  for (const e of allowlist) {
    const k = keyOf(e);
    const c = (consumed.get(k) ?? 0) + 1;
    consumed.set(k, c);
    if (c > (seen.get(k) ?? 0)) stale.push(e);
  }
  return { unlisted, stale };
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist') continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path, out);
    else if (/\.tsx?$/.test(entry.name)) out.push(path);
  }
  return out;
}

export async function loadAllowlist(root) {
  const path = join(root, 'scripts', 'check-stylex.allowlist.mjs');
  if (!existsSync(path)) return [];
  return (await import(pathToFileURL(path).href)).default;
}

export async function main(argv, { root = join(HERE, '..') } = {}) {
  let customRoot = root;
  let generate = false;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--root') customRoot = argv[++i];
    else if (argv[i] === '--generate-allowlist') generate = true;
    else if (argv[i] === '--help' || argv[i] === '-h') {
      console.log('Usage: node scripts/check-stylex.mjs [--root <dir>] [--generate-allowlist]');
      return 0;
    } else {
      console.error(`unknown argument: ${argv[i]}`);
      return 1;
    }
  }
  const src = join(customRoot, 'packages', 'react', 'src');
  const files = existsSync(src) ? walk(src) : [];
  const violations = files.flatMap((abs) => {
    const rel = relative(customRoot, abs).split(sep).join('/');
    return checkSource(rel, readFileSync(abs, 'utf8'));
  });

  if (generate) {
    const q = (s) => JSON.stringify(s);
    for (const v of violations.sort((a, b) => (a.file < b.file ? -1 : 1) || a.line - b.line)) {
      console.log(`  { file: ${q(v.file)}, rule: ${q(v.rule)}, fragment: ${q(v.fragment)} },`);
    }
    return 0;
  }

  const allowlist = await loadAllowlist(customRoot);
  const { unlisted, stale } = applyAllowlist(violations, allowlist);
  for (const v of unlisted) console.log(`${v.file}:${v.line} [${v.rule}] ${v.message}`);
  for (const e of stale) {
    console.log(`stale allowlist entry (remove it): ${e.file} [${e.rule}] ${e.fragment}`);
  }
  if (unlisted.length > 0 || stale.length > 0) {
    console.log(`${unlisted.length} violation(s), ${stale.length} stale allowlist entries`);
    return 1;
  }
  return 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const code = await main(process.argv.slice(2));
  process.exitCode = code;
}
