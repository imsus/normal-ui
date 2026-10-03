import * as stylex from '@stylexjs/stylex';
import { color, font, space } from '../tokens.stylex';

/** Styles several components reuse. Plain StyleX objects, passed through stylex.props. */
export const shared = stylex.create({
  /** Hidden on screen, still read by screen readers. */
  visuallyHidden: {
    position: 'absolute',
    width: 1,
    height: 1,
    overflow: 'hidden',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
  },
  muted: { color: color.grayText },
  numeric: { textAlign: 'end', fontVariantNumeric: 'tabular-nums' },
  /** Stack of label, control and hint. */
  field: { display: 'grid', gap: space.xs },
  /** The inverse layer: tooltips, hints, toasts. */
  inverse: { backgroundColor: color.canvasText, color: color.canvas },
  /** 2px focus ring drawn inside the element, for items inside composite widgets. */
  ringInside: { outlineWidth: 2, outlineStyle: 'solid', outlineColor: color.focusRing, outlineOffset: -2 },
  /** Small uppercase label above a group. */
  eyebrow: {
    fontFamily: font.sans,
    fontSize: '0.8125rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    color: color.grayText,
  },
});

/** Clamp n into [min, max]. */
export const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

/** Wrap an index around a list of length len. */
export const wrap = (i: number, len: number) => (i + len) % len;
