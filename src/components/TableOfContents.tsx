import * as stylex from '@stylexjs/stylex';
import { color, font, space } from '../tokens.stylex';
import { shared } from './shared';

/**
 * "On this page" links that highlight the section in view with no script, where
 * scroll-target-group is supported (Chromium). Elsewhere a plain list of links.
 */
export function TableOfContents({ items, label = 'On this page' }: { items: { href: string; label: string }[]; label?: string }) {
  return (
    <nav aria-label={label}>
      <p {...stylex.props(shared.eyebrow, styles.title)}>{label}</p>
      <ol {...stylex.props(styles.list)}>
        {items.map((i) => (
          <li key={i.href}>
            <a href={i.href} {...stylex.props(styles.link)}>{i.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

const styles = stylex.create({
  title: { margin: '0 0 8px' },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'grid',
    gap: space.xs,
    fontFamily: font.sans,
    fontSize: '0.9375rem',
    scrollTargetGroup: { default: null, '@supports (scroll-target-group: auto)': 'auto' },
  },
  link: {
    color: { default: null, ':target-current': color.canvasText },
    fontWeight: { default: null, ':target-current': 700 },
    textDecorationThickness: { default: null, ':target-current': 2 },
  },
});
