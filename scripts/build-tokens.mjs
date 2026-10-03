// Generates the two runtime forms of tokens.json:
//   src/styles/tokens.css   CSS custom properties (--canvas, --space-md, …), both themes
//   src/tokens.stylex.ts    StyleX constants that point at those properties
// tokens.json is the only place a value is written by hand.
import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const tokens = JSON.parse(readFileSync(new URL('tokens.json', root), 'utf8'));

const [primary, ...others] = tokens.color.themes.map((t) => t.id);
const alias = (v) => v.replace(/^\{(.+)\}$/, 'var(--$1)');
const colorFor = (t, theme) => alias(typeof t.value === 'string' ? t.value : (t.value[theme] ?? t.value[primary]));
const camel = (s) => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

const decl = (lines, indent = '  ') => lines.map((l) => indent + l).join('\n');
const colors = (theme) => tokens.color.tokens.map((t) => `--${t.name}: ${colorFor(t, theme)};`);
// The select arrow, as an image filled with the theme's field-text (an image cannot
// use currentColor). Same triangle as --pd-chevron in base.css; the -open one points up.
const fieldText = (theme) => colorFor(tokens.color.tokens.find((t) => t.name === 'field-text'), theme);
const arrow = (theme, path) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath fill='${encodeURIComponent(fieldText(theme))}' d='${path}'/%3E%3C/svg%3E")`;
const selectArrows = (theme) => [
  `--pd-select-arrow: ${arrow(theme, 'M2 4h8l-4 5z')};`,
  `--pd-select-arrow-open: ${arrow(theme, 'M2 8h8L6 3z')};`,
];
const families = Object.entries(tokens.type.families).map(([k, v]) => `--font-${k}: ${v};`);
const lengths = ['spacing', 'radius'].flatMap((f) => tokens[f].tokens.map((t) => `--${t.name}: ${t.value};`));

let css = `/* Generated from tokens.json by scripts/build-tokens.mjs. Do not edit. */
:root {
  color-scheme: ${primary};
${decl([...colors(primary), ...selectArrows(primary)])}
${decl(families)}
${decl(lengths)}
}
`;
if (others.includes('dark')) {
  css += `
/* No data-theme on <html>: follow the device. */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    color-scheme: dark;
${decl([...colors('dark'), ...selectArrows('dark')], '    ')}
  }
}
`;
}
/* data-theme forces a theme on <html>, or on any element to show a theme inside a page. */
for (const theme of [primary, ...others]) {
  css += `
[data-theme="${theme}"] {
  color-scheme: ${theme};
${decl([...colors(theme), ...selectArrows(theme)])}
}
`;
}
writeFileSync(new URL('src/styles/tokens.css', root), css);

const group = (name, entries, doc) =>
  `/** ${doc} */\nexport const ${name} = stylex.defineConsts({\n${entries
    .map(([k, v, usage]) => `${usage ? `  /** ${usage.replace(/\*\//g, '* /')} */\n` : ''}  ${JSON.stringify(k)}: ${JSON.stringify(v)},`)
    .join('\n')}\n});\n`;

const ts = `// Generated from tokens.json by scripts/build-tokens.mjs. Do not edit.
// Every value is a var() reference to src/styles/tokens.css, so themes switch
// at runtime (data-theme or the device setting) without re-rendering.
import * as stylex from '@stylexjs/stylex';

${group('color', tokens.color.tokens.map((t) => [camel(t.name), `var(--${t.name})`, t.usage]), 'System colours, used by role.')}
${group('font', Object.keys(tokens.type.families).map((k) => [k, `var(--font-${k})`]), 'Font stacks. All local; nothing to load.')}
${group('space', tokens.spacing.tokens.map((t) => [camel(t.name.replace(/^space-/, '').replace(/^2xs$/, 'xxs')), `var(--${t.name})`, t.usage]), 'Spacing steps.')}
${group('radius', tokens.radius.tokens.map((t) => [camel(t.name.replace(/^radius-/, '')), `var(--${t.name})`, t.usage]), 'Corner radii. Controls only.')}`;
writeFileSync(new URL('src/tokens.stylex.ts', root), ts);

console.log('tokens: wrote src/styles/tokens.css and src/tokens.stylex.ts');
