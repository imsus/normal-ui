import * as stylex from '@stylexjs/stylex';
import { useRef } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { color, space } from '../tokens.stylex';

/**
 * A group of controls for one target. One Tab stop: Left/Right move between
 * controls, Home/End jump (roving tabindex, managed here). Use <Button pressed> for
 * toggles and <ToolbarSeparator /> between groups.
 */
export function Toolbar({ label, controls, children }: { label: string; /** id of what the toolbar acts on. */ controls?: string; children: ReactNode }) {
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
      {...stylex.props(styles.toolbar)}
    >
      {children}
    </div>
  );
}

export function ToolbarSeparator() {
  return <span role="separator" {...stylex.props(styles.separator)} />;
}

const styles = stylex.create({
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: space.xs,
    alignItems: 'center',
    padding: space.xs,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: color.controlBorder,
  },
  separator: { alignSelf: 'stretch', borderInlineStartWidth: 1, borderInlineStartStyle: 'solid', borderInlineStartColor: color.rule, marginInline: space.xs },
});
