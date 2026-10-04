import * as stylex from '@stylexjs/stylex';
import { color, font, shape, space, text } from '@imsus/normal-ui-css/tokens.stylex';

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
  /**
   * Focus ring drawn inside the element, for items inside composite widgets. The inset
   * (transparent in Normal UI) keeps a light theme ring at 3:1.
   */
  ringInside: {
    outlineWidth: shape.focusWidth,
    outlineStyle: 'solid',
    outlineColor: color.focusRing,
    outlineOffset: `calc(-1 * ${shape.focusWidth})`,
    boxShadow: `inset 0 0 0 calc(${shape.focusWidth} + 2px) ${color.focusInset}`,
  },
  /** Small uppercase label above a group. */
  eyebrow: {
    fontFamily: font.sans,
    fontSize: text.eyebrowSize,
    fontWeight: text.eyebrowWeight,
    textTransform: text.eyebrowTransform,
    letterSpacing: text.eyebrowTracking,
    color: color.grayText,
  },
});

/** Clamp n into [min, max]. */
export const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

/** Wrap an index around a list of length len. */
export const wrap = (i: number, len: number) => (i + len) % len;
