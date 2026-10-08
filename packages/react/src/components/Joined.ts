'use client';

import * as stylex from '@stylexjs/stylex';
import { createContext, useContext } from 'react';
import { radius, shape } from '@imsus/normal-ui-css/tokens.stylex';

/*
 * Joined controls: members placed edge to edge so neighbours share one border
 * line, with only the outer corners rounded. ButtonGroup and InputGroup both
 * provide this context; Button, MenuButton and the InputGroup members read it
 * to join their neighbours.
 */

/** What a group tells its members. ButtonGroup provides `{ joined: true }`; InputGroup adds the rest. */
export type JoinedContextValue = {
  /** True inside a ButtonGroup or InputGroup. Members read it to join their neighbours. */
  joined: boolean;
  /** The group is disabled: every member disables itself. A member can still disable itself on its own. */
  disabled?: boolean;
  /** The group has an error: every input and select sets aria-invalid. */
  invalid?: boolean;
  /** The group's error and hint ids, for each member's aria-describedby. */
  groupDescribedBy?: string;
  /** The group holds two or more inputs or selects: each needs its own name through a `label` prop. */
  multi?: boolean;
};

/** The joined group around the calling component. ButtonGroup and InputGroup provide it. */
export const JoinedContext = createContext<JoinedContextValue>({ joined: false });

/** The joined group the calling component sits in, if any. */
export const useJoined = () => useContext(JoinedContext);

/**
 * The joined look for one member of a group. Button and MenuButton apply it
 * themselves; anything else placed in a group takes `joined.item`.
 */
export const joined = stylex.create({
  item: {
    position: 'relative',
    margin: 0,
    // Overlap the previous member's border, so neighbours share one line. The
    // overlap follows the border width, so a theme with 2px borders (govuk)
    // overlaps 2px instead of leaving a 3px seam.
    marginInlineStart: { default: `calc(-1 * ${shape.controlBorderWidth})`, ':first-child': 0 },
    // Square inside corners; only the group's outer corners keep radius-control.
    borderStartStartRadius: { default: 0, ':first-child': radius.control },
    borderEndStartRadius: { default: 0, ':first-child': radius.control },
    borderStartEndRadius: { default: 0, ':last-child': radius.control },
    borderEndEndRadius: { default: 0, ':last-child': radius.control },
    // Lift the member under the pointer, press or focus above its neighbours, so its
    // darker border and its focus ring are never hidden by the overlap. An invalid
    // member lifts too, so all four edges of its doubled border stay visible —
    // except while focused, when the focus lift wins instead.
    zIndex: {
      default: null,
      '@media (hover: hover) and (pointer: fine)': { ':hover': 1 },
      ':active': 1,
      ':user-invalid:not(:focus-visible)': 1,
      ':focus-visible': 2,
    },
  },
  /** A pressed toggle, or an invalid member, keeps its border visible over its neighbours. */
  raised: { zIndex: { default: 1, ':focus-visible': 2 } },
});
