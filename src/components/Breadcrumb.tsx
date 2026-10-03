import * as stylex from '@stylexjs/stylex';
import { color, space } from '../tokens.stylex';

/**
 * The trail from the top level to the current page. The last item is the current
 * page (aria-current, bold); the › separators are skipped by screen readers.
 */
export function Breadcrumb({ items, label = 'Breadcrumb' }: { items: { href: string; label: string }[]; label?: string }) {
  return (
    <nav aria-label={label}>
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
