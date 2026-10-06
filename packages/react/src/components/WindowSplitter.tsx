'use client';

import * as stylex from '@stylexjs/stylex';
import { useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';
import { color, shape } from '@imsus/normal-ui-css/tokens.stylex';
import { clamp, mergeRootProps } from './shared';

/**
 * A movable divider between two panes: a focusable role="separator" whose value is
 * the first pane's size in percent. Left/Right change it by 5%, Home/End go to the
 * limits, Enter collapses and restores; or drag it.
 */
export function WindowSplitter({
  label,
  start,
  end,
  min = 20,
  max = 80,
  defaultValue = 40,
  height = '220px',
  className,
  style,
}: {
  /** Names what is resized: "Resize order list". */
  label: string;
  start: ReactNode;
  end: ReactNode;
  min?: number;
  max?: number;
  defaultValue?: number;
  height?: string;
  /** Extra classes, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  const [v, setV] = useState(defaultValue);
  const last = useRef(defaultValue);
  const wrapRef = useRef<HTMLDivElement>(null);
  const startId = useRef(`split-${label.replace(/\W+/g, '-').toLowerCase()}`).current;
  const set = (n: number) => setV(Math.round(clamp(n, min, max)));
  const onKeyDown = (e: KeyboardEvent) => {
    const k = e.key;
    if (k === 'ArrowLeft') set(v - 5);
    else if (k === 'ArrowRight') set(v + 5);
    else if (k === 'Home') set(min);
    else if (k === 'End') set(max);
    else if (k === 'Enter') {
      if (v > min) { last.current = v; set(min); } else set(last.current);
    } else return;
    e.preventDefault();
  };
  return (
    <div ref={wrapRef} {...mergeRootProps(stylex.props(styles.wrap, styles.height(height)), { className, style })}>
      <section id={startId} {...stylex.props(styles.pane, styles.basis(`${v}%`))}>{start}</section>
      <div
        role="separator"
        tabIndex={0}
        aria-orientation="vertical"
        aria-controls={startId}
        aria-label={label}
        aria-valuenow={v}
        aria-valuemin={min}
        aria-valuemax={max}
        onKeyDown={onKeyDown}
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); e.currentTarget.focus(); }}
        onPointerMove={(e) => {
          if (!e.currentTarget.hasPointerCapture(e.pointerId) || !wrapRef.current) return;
          const r = wrapRef.current.getBoundingClientRect();
          set(((e.clientX - r.left) / r.width) * 100);
        }}
        {...stylex.props(styles.separator)}
      />
      <section {...stylex.props(styles.pane, styles.rest)}>{end}</section>
    </div>
  );
}

const styles = stylex.create({
  wrap: { display: 'flex', borderWidth: shape.borderWidth, borderStyle: 'solid', borderColor: color.controlBorder },
  height: (height: string) => ({ height }),
  pane: { overflow: 'auto', paddingBlock: 8, paddingInline: 12 },
  basis: (flexBasis: string) => ({ flexGrow: 0, flexShrink: 0, flexBasis }),
  rest: { flex: 1 },
  separator: {
    flex: 'none',
    width: 12,
    cursor: 'col-resize',
    touchAction: 'none',
    borderInlineWidth: 1,
    borderInlineStyle: 'solid',
    borderInlineColor: color.controlBorder,
    backgroundColor: { default: 'transparent', ':hover': color.highlight },
    backgroundImage: `linear-gradient(${color.controlBorder}, ${color.controlBorder})`,
    backgroundSize: '2px 24px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
});
