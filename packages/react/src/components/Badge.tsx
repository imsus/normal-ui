import * as stylex from '@stylexjs/stylex';
import type { CSSProperties, ReactNode } from 'react';
import { color, font, shape, space } from '@imsus/normal-ui-css/tokens.stylex';
import { mergeRootProps } from './shared';

/**
 * A short status word in a 1px box. The word carries the meaning: there are no
 * coloured badges. `tone="strong"` inverts it for the one status per screen that
 * most needs attention.
 */
export function Badge({ tone = 'default', children, className, style }: { tone?: 'default' | 'strong'; children: ReactNode;
  /** Extra classes, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  return <span {...mergeRootProps(stylex.props(styles.badge, tone === 'strong' && styles.strong), { className, style })}>{children}</span>;
}

const styles = stylex.create({
  badge: {
    display: 'inline-block',
    paddingInline: space.xs,
    borderWidth: shape.borderWidth,
    borderStyle: 'solid',
    borderColor: color.canvasText,
    fontFamily: font.sans,
    fontSize: '0.75rem',
    fontWeight: 700,
    lineHeight: 1.5,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    verticalAlign: '0.1em',
  },
  strong: {
    backgroundColor: color.canvasText,
    color: color.canvas,
    borderColor: { default: color.canvasText, '@media (forced-colors: active)': 'CanvasText' },
  },
});
