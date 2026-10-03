import * as stylex from '@stylexjs/stylex';

/**
 * The shared state arrow. Shape: --pd-chevron in base.css. Use <Chevron> for an
 * element, or these values on a pseudo-element (Select, CustomSelect).
 */
export const chevron = stylex.defineConsts({
  mask: 'var(--pd-chevron) center / contain no-repeat',
  size: '0.75em',
  /** Space between the arrow and its label. */
  gap: '0.5em',
  /** A closed disclosure points right. */
  closed: '-90deg',
  /** An open dropdown points up. */
  flipped: '180deg',
  transition: 'rotate 0.15s',
});
