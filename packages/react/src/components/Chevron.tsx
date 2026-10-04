import * as stylex from '@stylexjs/stylex';
import { chevron } from './chevron.stylex';

/**
 * The system's state arrow, decorative (aria-hidden): the state itself is announced by
 * aria-expanded on the control.
 *
 * - `disclosure` (Details, Accordion, TreeView, Treegrid): before the label, points
 *   right when closed and down when open.
 * - `dropdown` (MenuButton, Select, CustomSelect): after the label, points down and
 *   flips up while open.
 * - `spacer`: same size, invisible, to keep leaf rows aligned with their parents.
 */
export function Chevron({ kind, open = false }: { kind: 'disclosure' | 'dropdown' | 'spacer'; open?: boolean }) {
  return (
    <span
      aria-hidden="true"
      {...stylex.props(
        styles.base,
        kind === 'spacer' && styles.spacer,
        kind === 'disclosure' && styles.leading,
        kind === 'disclosure' && !open && styles.closed,
        kind === 'dropdown' && styles.trailing,
        kind === 'dropdown' && open && styles.flipped,
      )}
    />
  );
}

const styles = stylex.create({
  base: {
    display: 'inline-block',
    flex: 'none',
    width: chevron.size,
    height: chevron.size,
    verticalAlign: '-0.05em',
    backgroundColor: 'currentColor',
    mask: chevron.mask,
    forcedColorAdjust: 'none',
    rotate: '0deg',
    transition: { default: null, '@media (prefers-reduced-motion: no-preference)': chevron.transition },
  },
  leading: { marginInlineEnd: chevron.gap },
  trailing: { marginInlineStart: chevron.gap },
  closed: { rotate: chevron.closed },
  flipped: { rotate: chevron.flipped },
  spacer: { backgroundColor: 'transparent', marginInlineEnd: chevron.gap },
});
