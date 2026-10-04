import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { radius } from '@imsus/normal-ui-css/tokens.stylex';

/** True inside a ButtonGroup. <Button> reads it to join its neighbours. */
const InGroup = createContext(false);

/** Whether the calling component sits inside a ButtonGroup. */
export const useInButtonGroup = () => useContext(InGroup);

/**
 * Buttons joined edge to edge into one control: neighbours share a single 1px
 * border and only the outer corners are rounded. Use it for actions or toggles that
 * belong together (Bold / Italic / Underline, − quantity +, List / Grid).
 *
 * With a `label` it is a labelled role="group", so screen readers announce the
 * group's name as focus enters it; without one it is purely visual. <Button>
 * children join automatically; give any other child (an input) `buttonGroupItem`.
 * It adds no keyboard behaviour: each button stays its own Tab stop unless a
 * Toolbar around it manages focus.
 */
export function ButtonGroup({
  label,
  children,
  xstyle,
}: {
  /** Names the group for screen readers ("Text style"). */
  label?: string;
  children: ReactNode;
  xstyle?: StyleXStyles;
}) {
  return (
    <InGroup.Provider value={true}>
      <div role={label ? 'group' : undefined} aria-label={label} {...stylex.props(styles.group, xstyle)}>
        {children}
      </div>
    </InGroup.Provider>
  );
}

const styles = stylex.create({
  // Items stretch to the tallest one, so a field and its buttons line up.
  group: { display: 'inline-flex', alignItems: 'stretch', verticalAlign: 'middle' },
});

/**
 * The joined look for one item in a ButtonGroup. <Button> applies it itself; use it
 * on anything else you place in a group.
 */
export const buttonGroupItem = stylex.create({
  item: {
    position: 'relative',
    margin: 0,
    // Overlap the previous item's border, so neighbours share one 1px line.
    marginInlineStart: { default: -1, ':first-child': 0 },
    // Square inside corners; only the group's outer corners keep radius-control.
    borderStartStartRadius: { default: 0, ':first-child': radius.control },
    borderEndStartRadius: { default: 0, ':first-child': radius.control },
    borderStartEndRadius: { default: 0, ':last-child': radius.control },
    borderEndEndRadius: { default: 0, ':last-child': radius.control },
    // Lift the item under the pointer or focus above its neighbours, so its
    // darker border and its focus ring are never hidden by the overlap.
    zIndex: { default: null, ':hover': 1, ':focus-visible': 2 },
  },
  /** A pressed toggle keeps its inverted border visible over its neighbours. */
  raised: { zIndex: { default: 1, ':focus-visible': 2 } },
});
