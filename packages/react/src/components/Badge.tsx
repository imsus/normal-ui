import * as stylex from '@stylexjs/stylex';
import type { ReactNode } from 'react';
import { color, font, shape, space } from '@imsus/normal-ui-css/tokens.stylex';

/**
 * A short status word in a 1px box. The word carries the meaning: there are no
 * coloured badges. `tone="strong"` inverts it for the one status per screen that
 * most needs attention.
 */
export function Badge({ tone = 'default', children }: { tone?: 'default' | 'strong'; children: ReactNode }) {
  return <span {...stylex.props(styles.badge, tone === 'strong' && styles.strong)}>{children}</span>;
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
