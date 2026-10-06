'use client';

import * as stylex from '@stylexjs/stylex';
import { useRef } from 'react';
import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';
import { color, shape, space } from '@imsus/normal-ui-css/tokens.stylex';
import { mergeRootProps } from './shared';

/**
 * A group of controls for one target. One Tab stop: Left/Right move between
 * controls, Home/End jump (roving tabindex, managed here). Use <Button pressed> for
 * toggles and <ToolbarSeparator /> between groups.
 */
export function Toolbar({ label, controls, children, className, style }: { label: string; /** id of what the toolbar acts on. */ controls?: string; children: ReactNode;
  /** Extra classes, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const buttons = () => [...(ref.current?.querySelectorAll<HTMLButtonElement>('button') ?? [])];
  const focusAt = (i: number) => {
    const bs = buttons();
    const n = (i + bs.length) % bs.length;
    bs.forEach((b, k) => (b.tabIndex = k === n ? 0 : -1));
    bs[n]?.focus();
  };
  const onKeyDown = (e: KeyboardEvent) => {
    const bs = buttons();
    const i = bs.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === 'ArrowRight') focusAt(i + 1);
    else if (e.key === 'ArrowLeft') focusAt(i - 1);
    else if (e.key === 'Home') focusAt(0);
    else if (e.key === 'End') focusAt(bs.length - 1);
    else return;
    e.preventDefault();
  };
  return (
    <div
      ref={(el) => {
        ref.current = el;
        // First button is the Tab stop until the person moves.
        if (el && !el.querySelector('button[tabindex="0"]')) buttons().forEach((b, k) => (b.tabIndex = k === 0 ? 0 : -1));
      }}
      role="toolbar"
      aria-label={label}
      aria-controls={controls}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        const b = (e.target as Element).closest('button');
        if (b) buttons().forEach((x) => (x.tabIndex = x === b ? 0 : -1));
      }}
      {...mergeRootProps(stylex.props(styles.toolbar), { className, style })}
    >
      {children}
    </div>
  );
}

export function ToolbarSeparator({ className, style }: {
  /** Extra classes, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
} = {}) {
  return <span role="separator" {...mergeRootProps(stylex.props(styles.separator), { className, style })} />;
}

const styles = stylex.create({
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: space.xs,
    alignItems: 'center',
    padding: space.xs,
    borderWidth: shape.borderWidth,
    borderStyle: 'solid',
    borderColor: color.controlBorder,
  },
  separator: { alignSelf: 'stretch', borderInlineStartWidth: shape.borderWidth, borderInlineStartStyle: 'solid', borderInlineStartColor: color.rule, marginInline: space.xs },
});
