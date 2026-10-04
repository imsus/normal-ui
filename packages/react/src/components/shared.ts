import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
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

/** The className/style escape hatch every component root accepts. */
export type RootProps = {
  /** Extra classes, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
};

type StyleXOutput = {
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
};

/**
 * Merge consumer className/style after stylex.props output on a component root.
 * Pass undefined for the StyleX output when the root has no styles of its own.
 */
export function mergeRootProps(sx: StyleXOutput | undefined, overrides: RootProps): StyleXOutput {
  const className = [sx?.className, overrides.className].filter(Boolean).join(' ') || undefined;
  const style = sx?.style ?? overrides.style ? { ...sx?.style, ...overrides.style } : undefined;
  return { ...sx, className, style };
}
