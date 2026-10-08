// Pure colour helpers for the token build (plan P2.2). Parses any CSS colour,
// evaluates color-mix(in oklch, …) and {alias} / var(--alias) refs, reports
// WCAG 2.2 contrast ratios, and fails out-of-gamut values. Translucent colours
// have no meaningful ratio against an unknown backdrop, so they evaluate to
// null and the gate skips them (as it always skipped `transparent`).
import { converter, parse } from 'culori';

const toRgb = converter('rgb');
const toOklch = converter('oklch');
// Half an 8-bit step: float dust from formatting, not an authoring error.
const GAMUT_EPS = 0.002;

// ---------- Parsing ----------

/** Any CSS colour to sRGB { r, g, b, alpha }. Null when it does not parse. */
const rgbOf = (value) => {
  if (typeof value !== 'string') return null;
  const c = toRgb(parse(value));
  return c ?? null;
};

const clamp8 = (ch) => Math.round(Math.min(1, Math.max(0, ch)) * 255);
const hexOf = (c) => `#${[c.r, c.g, c.b].map((ch) => clamp8(ch).toString(16).padStart(2, '0')).join('')}`;

/** Opaque sRGB hex, clamped. Null when translucent or unknown. */
export const toHex = (value) => {
  const c = rgbOf(value);
  if (!c || (c.alpha ?? 1) < 1) return null;
  return hexOf(c);
};

// ---------- color-mix ----------

/** Split on top-level commas (commas inside nested functions stay put). */
const splitTop = (s) => {
  const parts = [];
  let depth = 0;
  let cur = '';
  for (const ch of s) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && depth === 0) {
      parts.push(cur);
      cur = '';
    } else cur += ch;
  }
  parts.push(cur);
  return parts;
};

/** An endpoint to [colour source, percentage or undefined]. The percentage is trailing. */
const endpoint = (s) => {
  const m = s.trim().match(/^(.*\S)\s+([\d.]+)%$/);
  return m ? [m[1], Number(m[2])] : [s.trim(), undefined];
};

/** Shorter-path hue lerp in degrees. Either side may be powerless (undefined). */
const hueLerp = (h1, h2, t) => {
  const a = h1 ?? h2 ?? 0;
  const b = h2 ?? h1 ?? 0;
  return (a + ((((b - a + 540) % 360) - 180) * t) + 360) % 360;
};

/**
 * A color-mix() (or plain colour) to opaque sRGB hex. Null when the result is
 * translucent or unknown. Throws on malformed mixes and unknown endpoints:
 * the gate must fail loudly, never skip a typo.
 */
export const evaluateColor = (value) => {
  if (typeof value !== 'string' || !/^\s*color-mix\(/.test(value)) return toHex(value);
  const inner = value.trim().slice('color-mix('.length, -1);
  const [space, first, second] = splitTop(inner);
  if (!space || space.trim() !== 'in oklch' || first === undefined || second === undefined)
    throw new Error(`tokens: only color-mix(in oklch, …) is supported, got ${value}`);
  const [c1, q1] = endpoint(first);
  const [c2, q2] = endpoint(second);
  let p1 = q1 ?? (q2 === undefined ? 50 : 100 - q2);
  let p2 = q2 ?? 100 - p1;
  if (p1 + p2 > 100) {
    const sum = p1 + p2;
    p1 = (p1 * 100) / sum;
    p2 = (p2 * 100) / sum;
  }
  // Under 100% the CSS rule scales alpha by the sum: translucent, unusable here.
  if (p1 + p2 < 100) return null;
  const oklchOf = (src) => {
    const nested = /^\s*color-mix\(/.test(src) ? toHex(evaluateColor(src)) : null;
    const c = toOklch(parse(nested ?? src));
    if (!c) throw new Error(`tokens: ${src} is not a colour`);
    return c;
  };
  const a = oklchOf(c1);
  const b = oklchOf(c2);
  const t = p2 / (p1 + p2);
  const alpha = (a.alpha ?? 1) + ((b.alpha ?? 1) - (a.alpha ?? 1)) * t;
  if (alpha < 1) return null;
  return hexOf(
    toRgb({
      mode: 'oklch',
      l: a.l + (b.l - a.l) * t,
      c: (a.c ?? 0) + ((b.c ?? 0) - (a.c ?? 0)) * t,
      h: hueLerp(a.h, b.h, t),
    }),
  );
};

// ---------- Aliases ----------

/**
 * Every colour token's authored value in one mode: whole-value {alias} refs
 * followed (loop-checked), {ref} / var(--ref) inside color-mix() substituted.
 * Mixes stay mixes; the gate evaluates them separately. Throws on loops and
 * unknown refs.
 */
export const resolveColors = (list, mode) => {
  const v = Object.fromEntries(
    list.map((t) => [t.name, typeof t.value === 'string' ? t.value : (t.value[mode] ?? t.value[Object.keys(t.value)[0]])]),
  );
  const get = (name, seen = new Set()) => {
    const raw = v[name];
    if (typeof raw !== 'string') return raw;
    const whole = raw.match(/^\{(.+)\}$/)?.[1];
    if (whole) {
      if (seen.has(whole)) throw new Error(`tokens: alias loop at ${name}`);
      return get(whole, seen.add(whole));
    }
    if (!raw.includes('color-mix(')) return raw;
    return raw.replace(/\{([\w-]+)\}|var\(--([\w-]+)\)/g, (m, braced, vared) => {
      const ref = braced ?? vared;
      const out = get(ref, new Set(seen));
      if (out == null) throw new Error(`tokens: unknown token --${ref} in ${name}`);
      return out;
    });
  };
  return Object.fromEntries(Object.keys(v).map((k) => [k, get(k)]));
};

// ---------- Contrast ----------

/** WCAG relative luminance. Null when translucent or unknown. */
export const luminance = (value) => {
  const c = rgbOf(value);
  if (!c || (c.alpha ?? 1) < 1) return null;
  return [c.r, c.g, c.b]
    .map((ch) => Math.min(1, Math.max(0, ch)))
    .map((ch) => (ch <= 0.03928 ? ch / 12.92 : ((ch + 0.055) / 1.055) ** 2.4))
    .reduce((sum, ch, i) => sum + ch * [0.2126, 0.7152, 0.0722][i], 0);
};

const ratioRaw = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)];
  if (x == null || y == null) return null;
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

/** WCAG contrast ratio, rounded to 2dp. Null when either side is unusable. */
export const ratio = (a, b) => {
  const r = ratioRaw(a, b);
  return r == null ? null : Math.round(r * 100) / 100;
};

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

/** Run the contrast checks; returns [{ mode, fg, bg, min, ratio, ok, waived }]. */
export function checkContrast(list, modes, extra = [], waive = {}) {
  const out = [];
  for (const mode of modes) {
    const resolved = resolveColors(list, mode);
    const evaluated = Object.fromEntries(Object.entries(resolved).map(([k, val]) => [k, evaluateColor(val)]));
    for (const [fgs, bg, min] of [...pairs, ...extra]) {
      if (!evaluated[bg]) continue;
      const tried = fgs
        .split('|')
        .filter((fg) => evaluated[fg])
        .map((fg) => ({ fg, r: ratioRaw(evaluated[fg], evaluated[bg]) }));
      if (!tried.length) continue;
      const best = tried.reduce((a, b) => (b.r > a.r ? b : a));
      const reason = waive[`${fgs}/${bg}`];
      out.push({ mode, fg: fgs, bg, min, ratio: Math.round(best.r * 100) / 100, ok: best.r >= min, waived: best.r < min && reason ? reason : undefined });
    }
  }
  return out;
}

// ---------- Gamut ----------

/**
 * Null when the value (and, for a mix, its endpoints and result) sits inside
 * sRGB; otherwise a description of the offender. Unknown colours fail too:
 * the gate must not silently skip a typo.
 */
export const checkGamut = (value) => {
  const literal = (v) => {
    const c = rgbOf(v);
    if (!c) return `${v}: not a colour`;
    return [c.r, c.g, c.b].some((ch) => ch < -GAMUT_EPS || ch > 1 + GAMUT_EPS) ? `${v}: outside the sRGB gamut` : null;
  };
  if (typeof value !== 'string' || !/^\s*color-mix\(/.test(value)) return literal(value);
  const inner = value.trim().slice('color-mix('.length, -1);
  const parts = splitTop(inner);
  for (const part of parts.slice(1)) {
    const bad = checkGamut(endpoint(part)[0]);
    if (bad) return bad;
  }
  const result = evaluateColor(value);
  return result ? literal(result) : null;
};
