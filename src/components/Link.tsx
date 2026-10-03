import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import type { AnchorHTMLAttributes } from 'react';
import { color } from '../tokens.stylex';

export type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'style'> & {
  href: string;
  xstyle?: StyleXStyles;
};

/**
 * An underlined link: blue, purple once visited, red while pressed. The underline
 * stays, so colour never marks a link alone (WCAG 1.4.1). Text names the destination.
 */
export function Link({ xstyle, ...rest }: LinkProps) {
  return <a {...rest} {...stylex.props(styles.link, xstyle)} />;
}

const styles = stylex.create({
  link: {
    color: { default: color.link, ':visited': color.linkVisited, ':active': color.linkActive },
    textDecorationLine: 'underline',
    textUnderlineOffset: '0.15em',
    textDecorationThickness: { default: null, ':hover': 2 },
  },
});
