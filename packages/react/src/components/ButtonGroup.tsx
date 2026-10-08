'use client';

import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import type { CSSProperties, ReactNode } from 'react';
import { JoinedContext, joined, useJoined } from './Joined';
import { mergeRootProps } from './shared';

/** @deprecated Use `joined` from `./Joined` instead. */
export const buttonGroupItem = joined;

/** @deprecated Use `useJoined` from `./Joined` instead. */
export const useInButtonGroup = () => useJoined().joined;

// ButtonGroup provides a constant value, shared so members never re-render for it.
const groupValue = { joined: true } as const;

/**
 * Buttons joined edge to edge into one control: neighbours share a single
 * border line and only the outer corners are rounded. Use it for actions or
 * toggles that belong together (Bold / Italic / Underline, − quantity +,
 * List / Grid).
 *
 * With a `label` it is a labelled role="group", so screen readers announce the
 * group's name as focus enters it; without one it is purely visual. <Button>
 * children join automatically; give any other child (an input) `joined.item`.
 * It adds no keyboard behaviour: each button stays its own Tab stop unless a
 * Toolbar around it manages focus.
 */
export function ButtonGroup({
  label,
  children,
  xstyle,
  className,
  style,
}: {
  /** Names the group for screen readers ("Text style"). */
  label?: string;
  children: ReactNode;
  xstyle?: StyleXStyles;
  /** Extra classes, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  return (
    <JoinedContext.Provider value={groupValue}>
      <div role={label ? 'group' : undefined} aria-label={label} {...mergeRootProps(stylex.props(styles.group, xstyle), { className, style })}>
        {children}
      </div>
    </JoinedContext.Provider>
  );
}

const styles = stylex.create({
  // Items stretch to the tallest one, so a field and its buttons line up.
  group: { display: 'inline-flex', alignItems: 'stretch', verticalAlign: 'middle' },
});
