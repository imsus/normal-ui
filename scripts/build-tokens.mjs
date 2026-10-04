// Generates the runtime forms of tokens.json and of every theme in themes/<id>/tokens.json:
//   src/styles/tokens.css    CSS custom properties (--canvas, --space-md, …), both colour modes
//   src/tokens.stylex.ts     StyleX constants that point at those properties
//   src/styles/themes.css    each theme's values, scoped to [data-theme="<id>"], plus its theme.css
//   src/themes.stylex.ts     StyleX constants for the tokens a theme adds
//   src/themes.ts            the theme list and resolved values, for the docs
// tokens.json and themes/<id>/tokens.json are the only places a value is written by hand.
// Every theme (and the base) is checked for the contrast pairs below; a failure stops the build.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (path) => JSON.parse(readFileSync(new URL(path, root), 'utf8'));
const tokens = read('tokens.json');

const allModes = tokens.color.themes.map((t) => t.id);
const [primary] = allModes;
const alias = (v) => v.replace(/^\{(.+)\}$/, 'var(--$1)');
const valueIn = (t, mode) => (typeof t.value === 'string' ? t.value : (t.value[mode] ?? t.value[primary]));
const colorFor = (t, mode) => alias(valueIn(t, mode));
const camel = (s) => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

const decl = (lines, indent = '  ') => lines.map((l) => indent + l).join('\n');
const colors = (list, mode) => list.map((t) => `--${t.name}: ${colorFor(t, mode)};`);
// The select arrow, as an image filled with the theme's field-text (an image cannot
// use currentColor). Same triangle as --pd-chevron in base.css; the -open one points up.
const arrow = (fill, path) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath fill='${encodeURIComponent(fill)}' d='${path}'/%3E%3C/svg%3E")`;
const selectArrows = (fill) => [
  `--pd-select-arrow: ${arrow(fill, 'M2 4h8l-4 5z')};`,
  `--pd-select-arrow-open: ${arrow(fill, 'M2 8h8L6 3z')};`,
];
// Token families written as plain values (not per mode).
const lengthFamilies = ['spacing', 'radius', 'shape', 'text'];
const lengths = (src) => lengthFamilies.flatMap((f) => (src[f]?.tokens ?? []).map((t) => `--${t.name}: ${t.value};`));
const families = (src) => Object.entries(src.type?.families ?? {}).map(([k, v]) => `--font-${k}: ${v};`);
/** rootSize is "100%" or { "base": "100%", "from": { "40.0625em": "118.75%" } }. */
const rootBase = (src) => {
  const r = src.type?.rootSize;
  if (!r) return [];
  return [`--font-size-root: ${typeof r === 'string' ? r : r.base};`];
};
const rootSteps = (src, selector) => {
  const r = src.type?.rootSize;
  if (!r || typeof r === 'string') return '';
  return Object.entries(r.from ?? {})
    .map(([min, v]) => `@media (min-width: ${min}) {\n  ${selector} { --font-size-root: ${v}; }\n}\n`)
    .join('');
};
/** @font-face rules for type.fonts. A relative src is resolved from `dir` (as seen from src/styles). */
const fontFaces = (src, dir) =>
  (src.type?.fonts ?? [])
    .map((f) => {
      const sources = (Array.isArray(f.src) ? f.src : [f.src])
        .map((s) => (/^(https?:|local\()/.test(s) ? (s.startsWith('local(') ? s : `url("${s}")`) : `url("${dir}${s.replace(/^\.\//, '')}")`))
        .map((s) => (/\.woff2"\)$/.test(s) ? `${s} format("woff2")` : /\.woff"\)$/.test(s) ? `${s} format("woff")` : s));
      return `@font-face {\n  font-family: "${f.family}";\n  src: ${sources.join(', ')};\n  font-weight: ${f.weight ?? 'normal'};\n  font-style: ${f.style ?? 'normal'};\n  font-display: ${f.display ?? 'swap'};\n}\n`;
    })
    .join('');

// ---------- Contrast ----------
// The pairs every theme must hold, in each of its modes (WCAG 2.2 AA: 1.4.3 text, 1.4.11
// non-text). "a|b" on the foreground side passes if either one holds (a light focus ring
// with a dark inset, for example).
const pairs = [
  ['canvas-text', 'canvas', 4.5], ['link', 'canvas', 4.5], ['link-visited', 'canvas', 4.5], ['link-active', 'canvas', 4.5],
  ['button-text', 'button-face', 4.5], ['button-text', 'button-face-hover', 4.5], ['button-pressed-text', 'button-pressed-face', 4.5],
  ['button-primary-text', 'button-primary-face', 4.5], ['button-primary-text', 'button-primary-face-hover', 4.5],
  ['button-warning-text', 'button-warning-face', 4.5], ['button-warning-text', 'button-warning-face-hover', 4.5],
  ['field-text', 'field', 4.5], ['placeholder', 'field', 4.5],
  ['gray-text', 'canvas', 4.5], ['gray-text', 'surface-soft', 4.5], ['gray-text', 'surface-muted', 4.5], ['gray-text', 'surface-raised', 4.5],
  ['mark-text', 'mark', 4.5], ['highlight-text', 'highlight', 4.5], ['masthead-text', 'masthead', 4.5],
  ['status-error', 'canvas', 4.5], ['status-warning', 'canvas', 4.5], ['status-success', 'canvas', 4.5], ['status-info', 'canvas', 4.5],
  ['control-border', 'canvas', 3], ['control-border', 'field', 3],
  ['control-border', 'surface-soft', 3], ['control-border', 'surface-muted', 3], ['control-border', 'surface-raised', 3],
  ['rule', 'canvas', 3], ['focus-ring|focus-inset', 'canvas', 3], ['accent', 'canvas', 3],
];
const luminance = (hex) => {
  let h = hex.replace('#', '');
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  return [0, 2, 4]
    .map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    .reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
};
const ratio = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
/** Every colour token's literal value in one mode, aliases followed. */
const resolve = (list, mode) => {
  const v = Object.fromEntries(list.map((t) => [t.name, valueIn(t, mode)]));
  const get = (name, seen = new Set()) => {
    const raw = v[name];
    const ref = raw?.match(/^\{(.+)\}$/)?.[1];
    if (!ref) return raw;
    if (seen.has(ref)) throw new Error(`tokens: alias loop at ${name}`);
    return get(ref, seen.add(ref));
  };
  return Object.fromEntries(Object.keys(v).map((k) => [k, get(k)]));
};
const isHex = (v) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v ?? '');
/** Run the checks; returns [{ mode, fg, bg, min, ratio, ok, waived }]. */
function check(list, modes, extra = [], waive = {}) {
  const out = [];
  for (const mode of modes) {
    const v = resolve(list, mode);
    for (const [fgs, bg, min] of [...pairs, ...extra]) {
      if (!isHex(v[bg])) continue;
      const tried = fgs.split('|').filter((fg) => isHex(v[fg])).map((fg) => ({ fg, r: ratio(v[fg], v[bg]) }));
      if (!tried.length) continue;
      const best = tried.reduce((a, b) => (b.r > a.r ? b : a));
      const reason = waive[`${fgs}/${bg}`];
      out.push({ mode, fg: fgs, bg, min, ratio: Math.round(best.r * 100) / 100, ok: best.r >= min, waived: best.r < min && reason ? reason : undefined });
    }
  }
  return out;
}
const failures = [];
const report = (name, results) =>
  results.filter((r) => !r.ok && !r.waived).forEach((r) => failures.push(`${name} (${r.mode}): ${r.fg} on ${r.bg} is ${r.ratio}:1, needs ${r.min}:1`));

// ---------- Base ----------
const baseColors = tokens.color.tokens;
const baseBlock = (mode) => [...colors(baseColors, mode), ...selectArrows(resolve(baseColors, mode)['field-text'])];
let css = `/* Generated from tokens.json by scripts/build-tokens.mjs. Do not edit. */
${fontFaces(tokens, '../../')}:root {
  color-scheme: ${primary};
${decl([...baseBlock(primary), ...families(tokens), ...rootBase(tokens), ...lengths(tokens)])}
}
${rootSteps(tokens, ':root')}`;
if (allModes.includes('dark')) {
  css += `
/* No data-color-scheme on <html>: follow the device. */
@media (prefers-color-scheme: dark) {
  :root:not([data-color-scheme]) {
    color-scheme: dark;
${decl(baseBlock('dark'), '    ')}
  }
}
`;
}
/* data-color-scheme forces a Color scheme on <html>, or on any element to show one scheme inside a page. */
for (const mode of allModes) {
  css += `
[data-color-scheme="${mode}"] {
  color-scheme: ${mode};
${decl(baseBlock(mode))}
}
`;
}
writeFileSync(new URL('src/styles/tokens.css', root), css);
report('Normal UI', check(baseColors, allModes));

const group = (name, entries, doc) =>
  `/** ${doc} */\nexport const ${name} = stylex.defineConsts({\n${entries
    .map(([k, v, usage]) => `${usage ? `  /** ${usage.replace(/\*\//g, '* /')} */\n` : ''}  ${JSON.stringify(k)}: ${JSON.stringify(v)},`)
    .join('\n')}\n});\n`;

const ts = `// Generated from tokens.json by scripts/build-tokens.mjs. Do not edit.
// Every value is a var() reference to src/styles/tokens.css, so themes switch
// at runtime (data-color-scheme, data-theme or the device setting) without re-rendering.
import * as stylex from '@stylexjs/stylex';

${group('color', baseColors.map((t) => [camel(t.name), `var(--${t.name})`, t.usage]), 'System colours, used by role.')}
${group('font', Object.keys(tokens.type.families).map((k) => [k, `var(--font-${k})`]), 'Font stacks. All local unless a theme loads its own.')}
${group('space', tokens.spacing.tokens.map((t) => [camel(t.name.replace(/^space-/, '').replace(/^2xs$/, 'xxs')), `var(--${t.name})`, t.usage]), 'Spacing steps.')}
${group('radius', tokens.radius.tokens.map((t) => [camel(t.name.replace(/^radius-/, '')), `var(--${t.name})`, t.usage]), 'Corner radii. Controls only.')}
${group('shape', tokens.shape.tokens.map((t) => [camel(t.name), `var(--${t.name})`, t.usage]), 'Borders, targets, button edges and the focus ring: the shape a theme can change.')}
${group('text', tokens.text.tokens.map((t) => [camel(t.name), `var(--${t.name})`, t.usage]), 'Type sizes, weights and treatments a theme can change.')}`;
writeFileSync(new URL('src/tokens.stylex.ts', root), ts);

// ---------- Themes ----------
// A theme lists only what it changes (a base token's name) and what it adds (a new name).
// Its values apply inside [data-theme="<id>"], on <html> or on any element. A theme may
// list fewer modes ("modes": ["light"]): it then stays in that mode whatever the device
// or data-color-scheme says.
const themesDir = new URL('themes/', root);
const ids = existsSync(themesDir)
  ? readdirSync(themesDir, { withFileTypes: true }).filter((d) => d.isDirectory() && existsSync(new URL(`${d.name}/tokens.json`, themesDir))).map((d) => d.name).sort()
  : [];
const baseNames = new Set(baseColors.map((t) => t.name));
const baseLengths = new Set(lengthFamilies.flatMap((f) => (tokens[f]?.tokens ?? []).map((t) => t.name)));

let themeCss = `/* Generated from themes/<id>/tokens.json by scripts/build-tokens.mjs. Do not edit.
   Load after tokens.css and base.css. Set data-theme="<id>" on <html> (or any element). */
${ids.map((id) => `@import "../../themes/${id}/theme.css";`).join('\n')}
`;
let themeTs = `// Generated from themes/<id>/tokens.json by scripts/build-tokens.mjs. Do not edit.
// The tokens each theme adds, as var() references. They only have a value inside
// [data-theme="<id>"]; elsewhere they are unset.
import * as stylex from '@stylexjs/stylex';
`;
const manifest = [];

for (const id of ids) {
  const theme = read(`themes/${id}/tokens.json`);
  if (theme.id !== id) throw new Error(`themes/${id}/tokens.json: id must be "${id}"`);
  if (!existsSync(new URL(`${id}/theme.css`, themesDir))) throw new Error(`themes/${id}/theme.css is missing`);
  const modes = theme.modes ?? allModes;
  if (!modes.length || modes.some((m) => !allModes.includes(m))) throw new Error(`themes/${id}: modes must be some of ${allModes.join(', ')}`);
  const own = theme.color?.tokens ?? [];
  for (const t of own) {
    if (typeof t.value === 'string' || modes.some((m) => !t.value[m]))
      throw new Error(`themes/${id}: colour --${t.name} needs a value for every mode (${modes.join(', ')})`);
    if (!baseNames.has(t.name) && !t.usage) throw new Error(`themes/${id}: added colour --${t.name} needs a usage note`);
  }
  for (const f of lengthFamilies) for (const t of theme[f]?.tokens ?? []) {
    if (!baseLengths.has(t.name) && !t.usage) throw new Error(`themes/${id}: added --${t.name} needs a usage note`);
  }
  const merged = [...baseColors.filter((t) => !own.some((o) => o.name === t.name)), ...own];
  // A mode the theme does not have falls back to its first one, every token included.
  const shown = (mode) => (modes.includes(mode) ? mode : modes[0]);
  const at = `[data-theme="${id}"]`;
  // Re-draw the select arrow when the theme changes the text it is filled with.
  const arrows = (mode) => (own.some((t) => t.name === 'field-text') ? selectArrows(resolve(merged, mode)['field-text']) : []);
  const block = (mode, indent = '  ') => {
    const m = shown(mode);
    // Out of its modes, the theme restates every colour so nothing of the other mode shows through.
    const list = m === mode ? own : merged;
    const scheme = m === mode ? [] : [`color-scheme: ${m};`];
    const fill = m === mode ? arrows(m) : selectArrows(resolve(merged, m)['field-text']);
    return decl([...scheme, ...colors(list, m), ...fill], indent);
  };
  const first = modes[0];
  themeCss += `
/* ${theme.name} */
${fontFaces(theme, `../../themes/${id}/`)}${at} {
${decl([...(modes.length === 1 ? [`color-scheme: ${first};`] : []), ...colors(own, first), ...arrows(first), ...families(theme), ...rootBase(theme), ...lengths(theme)])}
}
${rootSteps(theme, at)}/* No data-color-scheme: follow the device. (0,3,0) on <html> to beat tokens.css; (0,1,0) further in. */
@media (prefers-color-scheme: dark) {
  :root:not([data-color-scheme])${at}, :where(:root:not([data-color-scheme])) ${at} {
${block('dark', '    ')}
  }
}
`;
  for (const mode of allModes) {
    themeCss += `${at}[data-color-scheme="${mode}"], ${at} [data-color-scheme="${mode}"], [data-color-scheme="${mode}"] ${at} {
${block(mode)}
}
`;
  }
  const added = [
    ...own.filter((t) => !baseNames.has(t.name)),
    ...lengthFamilies.flatMap((f) => (theme[f]?.tokens ?? []).filter((t) => !baseLengths.has(t.name))),
  ];
  if (added.length) themeTs += `\n${group(camel(id), added.map((t) => [camel(t.name), `var(--${t.name})`, t.usage]), `Added by the ${theme.name} theme.`)}`;

  const results = check(merged, modes, theme.checks ?? [], theme.waive ?? {});
  report(theme.name, results);
  manifest.push({
    id,
    name: theme.name,
    description: theme.description,
    inspiration: theme.inspiration,
    modes,
    notes: theme.notes ?? [],
    colors: own.map((t) => ({
      name: t.name,
      added: !baseNames.has(t.name),
      usage: t.usage ?? baseColors.find((b) => b.name === t.name)?.usage ?? '',
      values: Object.fromEntries(modes.map((m) => [m, resolve(merged, m)[t.name]])),
    })),
    families: theme.type?.families ?? {},
    fonts: (theme.type?.fonts ?? []).map((f) => f.family),
    rootSize: theme.type?.rootSize === undefined ? undefined
      : typeof theme.type.rootSize === 'string' ? theme.type.rootSize
      : [theme.type.rootSize.base, ...Object.entries(theme.type.rootSize.from ?? {}).map(([min, v]) => `${v} from ${min}`)].join(', '),
    lengths: lengthFamilies.flatMap((f) => (theme[f]?.tokens ?? []).map((t) => ({ name: t.name, value: t.value, added: !baseLengths.has(t.name), usage: t.usage ?? '' }))),
    waived: results.filter((r) => r.waived).map(({ ok, ...r }) => r),
  });
}
writeFileSync(new URL('src/styles/themes.css', root), themeCss);
writeFileSync(new URL('src/themes.stylex.ts', root), themeTs);
writeFileSync(
  new URL('src/themes.ts', root),
  `// Generated from themes/<id>/tokens.json by scripts/build-tokens.mjs. Do not edit.\n` +
    `export type ThemeColor = { name: string; added: boolean; usage: string; values: Record<string, string> };\n` +
    `export type ThemeLength = { name: string; value: string; added: boolean; usage: string };\n` +
    `export type Theme = { id: string; name: string; description: string; inspiration?: string; modes: string[]; notes: string[];\n` +
    `  colors: ThemeColor[]; families: Record<string, string>; fonts: string[]; rootSize?: string; lengths: ThemeLength[];\n` +
    `  waived: { mode: string; fg: string; bg: string; min: number; ratio: number; waived: string }[] };\n` +
    `export const themes: Theme[] = ${JSON.stringify(manifest, null, 2)};\n`,
);

if (failures.length) {
  console.error(`tokens: contrast below WCAG 2.2 AA:\n  ${failures.join('\n  ')}\n` +
    `Fix the value, or (for a theme) add the pair to "waive" with the reason.`);
  process.exit(1);
}
console.log(`tokens: wrote src/styles/tokens.css, src/tokens.stylex.ts, src/styles/themes.css (${ids.length} themes), src/themes.stylex.ts, src/themes.ts`);
