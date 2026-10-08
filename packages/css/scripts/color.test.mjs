// Tests for the P2.2 colour helpers: any-CSS-colour parsing, color-mix and
// alias evaluation, WCAG ratios, the sRGB gamut gate, and the frozen
// pre-OKLCH ratio table (contrast-ratios.golden.json).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import {
  checkContrast,
  evaluateColor,
  luminance,
  ratio,
  resolveColors,
  toHex,
  checkGamut,
} from './color.mjs';

const root = new URL('../', import.meta.url);
const read = (path) => JSON.parse(readFileSync(new URL(path, root), 'utf8'));

test('luminance parses any opaque CSS colour', () => {
  assert.equal(luminance('#ffffff'), 1);
  assert.equal(luminance('#000000'), 0);
  assert.equal(luminance('white'), 1);
  assert.equal(luminance('black'), 0);
  for (const v of ['rgb(255 255 255)', 'oklch(100% 0 none)']) assert.ok(Math.abs(luminance(v) - 1) < 1e-9, v);
  assert.ok(Math.abs(luminance('oklch(0% 0 none)') - 0) < 1e-9);
});

test('luminance refuses translucent and unknown colours', () => {
  assert.equal(luminance('transparent'), null);
  assert.equal(luminance('rgb(0 0 0 / 0.5)'), null);
  assert.equal(luminance('no-such-colour'), null);
});

// Oracles: the ratio table in apps/docs/docs/README.md, measured from the hex sources.
test('ratio matches the documented pairs', () => {
  assert.equal(ratio('#000000', '#ffffff'), 21);
  assert.equal(ratio('#6d6d6d', '#ffffff'), 5.17); // README rounds to 5.2:1
  assert.equal(ratio('#ee0000', '#ffffff'), 4.53);
  assert.equal(ratio('#0066dd', '#ffffff'), 5.32);
  assert.equal(ratio('#ffffff', '#121212'), 18.73);
});

test('ratio works in oklch and skips translucent sides', () => {
  assert.equal(ratio('oklch(0% 0 none)', 'oklch(100% 0 none)'), 21);
  assert.equal(ratio('transparent', '#ffffff'), null);
  assert.equal(ratio('#000000', 'transparent'), null);
});

test('toHex rounds opaque colours to sRGB hex', () => {
  assert.equal(toHex('#fff'), '#ffffff');
  assert.equal(toHex('oklch(100% 0 none)'), '#ffffff');
  assert.equal(toHex('oklch(0% 0 none)'), '#000000');
  assert.equal(toHex('transparent'), null);
  assert.equal(toHex('color-mix(in oklch, white, transparent)'), null);
});

// Oracle: Oklab achromatic L is the cube root of linear light, so L 50% is
// linear 0.125, sRGB 0.3886, 8-bit 99 (#63). Derived from the spec, not culori.
test('color-mix white/black halves meet at #636363', () => {
  assert.equal(evaluateColor('color-mix(in oklch, white, black)'), '#636363');
  assert.equal(evaluateColor('color-mix(in oklch, black, white)'), '#636363');
});

test('color-mix percentages: endpoints, remainder, normalising', () => {
  assert.equal(evaluateColor('color-mix(in oklch, white 100%, black)'), '#ffffff');
  assert.equal(evaluateColor('color-mix(in oklch, white 0%, black)'), '#000000');
  assert.equal(evaluateColor('color-mix(in oklch, white 25%, black)'), '#222222');
  // Over 100%: normalised back to halves.
  assert.equal(evaluateColor('color-mix(in oklch, white 60%, black 60%)'), '#636363');
  // Under 100%: the same hue, translucent, so unusable for contrast.
  assert.equal(evaluateColor('color-mix(in oklch, white 25%, black 25%)'), null);
});

test('color-mix nests: white over the gray halves gives #aeaeae', () => {
  // Inner L 50%, outer L 75%: linear 0.421875, sRGB 0.6813, 8-bit 174.
  assert.equal(evaluateColor('color-mix(in oklch, white, color-mix(in oklch, white, black))'), '#aeaeae');
});

test('color-mix throws on other spaces and unknown endpoints', () => {
  assert.throws(() => evaluateColor('color-mix(in srgb, white, black)'), /only color-mix\(in oklch/);
  assert.throws(() => evaluateColor('color-mix(in oklch, white, no-such-colour)'), /not a colour/);
});

test('color-mix takes the shorter hue and tolerates none', () => {
  const a = evaluateColor('color-mix(in oklch, oklch(60% 0.2 10), oklch(60% 0.2 350))');
  assert.match(a, /^#[0-9a-f]{6}$/);
  // Both endpoints near hue 0: the mix stays a red (high red channel).
  assert.ok(parseInt(a.slice(1, 3), 16) > 0xc0, `expected a red, got ${a}`);
  const b = evaluateColor('color-mix(in oklch, oklch(60% 0.2 30), white)');
  assert.match(b, /^#[0-9a-f]{6}$/);
});

test('resolveColors follows whole-value aliases and loop-checks', () => {
  const list = [
    { name: 'a', value: { light: '#112233' } },
    { name: 'b', value: { light: '{a}' } },
    { name: 'c', value: { light: '{b}' } },
  ];
  assert.deepEqual(resolveColors(list, 'light'), { a: '#112233', b: '#112233', c: '#112233' });
  assert.throws(() => resolveColors([{ name: 'x', value: { light: '{y}' } }, { name: 'y', value: { light: '{x}' } }], 'light'), /alias loop/);
});

test('resolveColors substitutes refs inside color-mix', () => {
  const list = [
    { name: 'base', value: { light: '#ffffff' } },
    { name: 'mix', value: { light: 'color-mix(in oklch, {base}, black)' } },
    { name: 'var', value: { light: 'color-mix(in oklch, var(--base), black)' } },
  ];
  const v = resolveColors(list, 'light');
  assert.equal(v.mix, 'color-mix(in oklch, #ffffff, black)');
  assert.equal(v.var, 'color-mix(in oklch, #ffffff, black)');
  assert.equal(evaluateColor(v.mix), '#636363');
});

test('gamut gate passes sRGB colours and fails vivid ones', () => {
  assert.equal(checkGamut('#ee0000'), null);
  assert.equal(checkGamut('oklch(100% 0 none)'), null);
  assert.equal(checkGamut('oklch(59.60045% 0.24457 29.234)'), null); // #ee0000, finely rounded
  assert.ok(checkGamut('oklch(90% 0.35 250)'), 'expected an out-of-gamut report');
});

test('checkContrast keeps its result shape', () => {
  const list = [
    { name: 'canvas', value: { light: '#ffffff' } },
    { name: 'canvas-text', value: { light: '#000000' } },
  ];
  const [r] = checkContrast(list, ['light']);
  assert.deepEqual(Object.keys(r).sort(), ['bg', 'fg', 'min', 'mode', 'ok', 'ratio', 'waived']);
  assert.equal(r.ratio, 21);
  assert.equal(r.ok, true);
});

test('all shipped pairs still report their frozen ratios (±0.01)', () => {
  const golden = read('scripts/contrast-ratios.golden.json');
  const tokens = read('tokens.json');
  const themesDir = new URL('themes/', root);
  const ids = readdirSync(themesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
  const allModes = tokens.color.themes.map((t) => t.id);
  const seen = [];
  const collect = (theme, list, modes, extra = [], waive = {}) => {
    for (const r of checkContrast(list, modes, extra, waive)) seen.push({ theme, ...r });
  };
  collect('Normal UI', tokens.color.tokens, allModes);
  for (const id of ids) {
    const theme = read(`themes/${id}/tokens.json`);
    const modes = theme.modes ?? allModes;
    const own = theme.color?.tokens ?? [];
    const merged = [...tokens.color.tokens.filter((t) => !own.some((o) => o.name === t.name)), ...own];
    collect(theme.name, merged, modes, theme.checks ?? [], theme.waive ?? {});
  }
  assert.equal(seen.length, golden.length, `expected ${golden.length} checked pairs, got ${seen.length}`);
  for (const [i, r] of seen.entries()) {
    const g = golden[i];
    assert.equal(`${r.theme}/${r.mode}/${r.fg}/${r.bg}`, `${g.theme}/${g.mode}/${g.fg}/${g.bg}`);
    assert.ok(Math.abs(r.ratio - g.ratio) <= 0.01, `${r.theme} ${r.mode} ${r.fg}/${r.bg}: ${r.ratio} vs frozen ${g.ratio}`);
    assert.equal(r.ok || !!r.waived, true, `${r.theme} ${r.mode} ${r.fg}/${r.bg} fails at ${r.ratio}:1`);
  }
});
