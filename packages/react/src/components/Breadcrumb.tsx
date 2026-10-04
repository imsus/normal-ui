import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { color, space } from '@imsus/normal-ui-css/tokens.stylex';
import { mergeRootProps } from './shared';

/**
 * The trail from the top level to the current page. The last item is the current
 * page (aria-current, bold); the › separators are skipped by screen readers.
 */
export function Breadcrumb({ items, label = 'Breadcrumb', className, style }: { items: { href: string; label: string }[]; label?: string;
  /** Extra classes, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  return (
    <nav aria-label={label} {...mergeRootProps(undefined, { className, style })}>
      <ol {...stylex.props(styles.list)}>
        {items.map((item, i) => {
          const current = i === items.length - 1;
          return (
            <li key={item.href} {...stylex.props(i > 0 && styles.sep)}>
              <a href={item.href} aria-current={current ? 'page' : undefined} {...stylex.props(current && styles.current)}>
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

const styles = stylex.create({
  list: { display: 'flex', flexWrap: 'wrap', gap: space.xs, listStyle: 'none', margin: 0, padding: 0, fontSize: '0.875rem' },
  sep: { '::before': { content: '"›" / ""', marginInlineEnd: space.xs, color: color.grayText } },
  current: { fontWeight: 700 },
});
