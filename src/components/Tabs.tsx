import * as stylex from '@stylexjs/stylex';
import { useId, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { color, space } from '../tokens.stylex';
import { wrap } from './shared';

export type Tab = { label: ReactNode; content: ReactNode };

/**
 * The ARIA tabs pattern for 2–6 peer views of one thing. Only the selected tab is in
 * the tab order; Left/Right move and select, Home/End jump. Panels are focusable.
 */
export function Tabs({ label, tabs, defaultIndex = 0 }: { label: string; tabs: Tab[]; defaultIndex?: number }) {
  const id = useId();
  const [sel, setSel] = useState(defaultIndex);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const select = (i: number, focus = false) => {
    setSel(i);
    if (focus) refs.current[i]?.focus();
  };
  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const j =
      e.key === 'ArrowRight' ? wrap(i + 1, tabs.length)
      : e.key === 'ArrowLeft' ? wrap(i - 1, tabs.length)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? tabs.length - 1
      : null;
    if (j === null) return;
    e.preventDefault();
    select(j, true);
  };
  return (
    <div>
      <div role="tablist" aria-label={label} {...stylex.props(styles.list)}>
        {tabs.map((t, i) => (
          <button
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            type="button"
            role="tab"
            id={`${id}-t${i}`}
            aria-controls={`${id}-p${i}`}
            aria-selected={i === sel}
            tabIndex={i === sel ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            {...stylex.props(styles.tab, i === sel && styles.selected)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={i} role="tabpanel" id={`${id}-p${i}`} aria-labelledby={`${id}-t${i}`} tabIndex={0} hidden={i !== sel}
          {...stylex.props(styles.panel)}>
          {t.content}
        </div>
      ))}
    </div>
  );
}

const styles = stylex.create({
  list: { display: 'flex', flexWrap: 'wrap', borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: color.controlBorder },
  tab: {
    minHeight: `calc(${space.lg} + ${space.md})`,
    paddingBlock: space.sm,
    paddingInline: space.md,
    backgroundColor: 'transparent',
    color: color.canvasText,
    borderWidth: 0,
    borderStyle: 'none',
    borderBottomWidth: 3,
    borderBottomStyle: 'solid',
    borderBottomColor: { default: 'transparent', ':hover': color.controlBorder },
    borderRadius: 0,
    marginBottom: -1,
    cursor: 'pointer',
    fontSize: '1rem',
    outlineOffset: { default: null, ':focus-visible': -2 },
  },
  selected: {
    borderBottomColor: { default: color.canvasText, ':hover': color.canvasText, '@media (forced-colors: active)': 'Highlight' },
    fontWeight: 700,
  },
  panel: { paddingBlock: space.md },
});
