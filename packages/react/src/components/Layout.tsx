import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { space } from '@imsus/normal-ui-css/tokens.stylex';
import { shared } from './shared';

type BoxProps = Omit<HTMLAttributes<HTMLElement>, 'className' | 'style'> & {
  as?: ElementType;
  /** Space between children. Any CSS length; defaults to space-md (Stack) or space-sm (Cluster). */
  gap?: string;
  xstyle?: StyleXStyles;
  children?: ReactNode;
};

/**
 * A flex column spaced by gap. In app UI (`.pd-app`) margins are zero, so the
 * stack decides the space between things.
 */
export function Stack({ as: As = 'div', gap = space.md, xstyle, ...rest }: BoxProps) {
  return <As {...rest} {...stylex.props(styles.stack, styles.gap(gap), xstyle)} />;
}

/** A wrapping row of items, vertically centred, spaced by gap. */
export function Cluster({ as: As = 'div', gap = space.sm, xstyle, ...rest }: BoxProps) {
  return <As {...rest} {...stylex.props(styles.cluster, styles.gap(gap), xstyle)} />;
}

/** Text for screen readers only. */
export function VisuallyHidden({ children, as: As = 'span' }: { children: ReactNode; as?: ElementType }) {
  return <As {...stylex.props(shared.visuallyHidden)}>{children}</As>;
}

const styles = stylex.create({
  // Children lose their flow margins: the gap spaces them. Wrap long-form text in
  // .pd-content to get its rhythm back.
  stack: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    '--pd-flow': '0',
    '--pd-h-after': '0',
    '--pd-h2-before': '0',
    '--pd-h3-before': '0',
    '--pd-h4-before': '0',
  },
  cluster: { display: 'flex', flexWrap: 'wrap', alignItems: 'center' },
  gap: (gap: string) => ({ gap }),
});
