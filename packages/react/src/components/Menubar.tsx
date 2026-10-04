'use client';

import * as stylex from '@stylexjs/stylex';
import { useEffect, useId, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import { color, font, shape, space } from '@imsus/normal-ui-css/tokens.stylex';
import { mergeRootProps, wrap } from './shared';

export type MenubarItem =
  | { type?: 'item'; label: string; shortcut?: string; keyshortcuts?: string; onSelect?: () => void }
  | { type: 'checkbox'; label: string; checked: boolean; onChange: (checked: boolean) => void }
  | { type: 'radio'; label: string; options: string[]; value: string; onChange: (value: string) => void }
  | { type: 'separator' };

export type MenubarMenu = { label: string; items: MenubarItem[] };

/**
 * A desktop-style menu bar for app-like editors. Left/Right move along the bar (and
 * switch open menus), Down or Enter opens, Up/Down move in a menu, Home/End jump,
 * Esc closes, Tab leaves. For a few actions use MenuButton instead.
 */
export function Menubar({ label, menus, className, style }: { label: string; menus: MenubarMenu[];
  /** Extra classes on the wrap, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style on the wrap, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  const id = useId();
  const [top, setTop] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [focusLast, setFocusLast] = useState(false);
  const bar = useRef<HTMLUListElement>(null);
  const topRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const menuRefs = useRef<(HTMLUListElement | null)[]>([]);

  const menuItems = (i: number) => [...(menuRefs.current[i]?.querySelectorAll<HTMLElement>('[role^=menuitem]') ?? [])];
  useEffect(() => {
    if (open === null) return;
    const it = menuItems(open);
    (focusLast ? it[it.length - 1] : it[0])?.focus();
  }, [open, focusLast]);
  useEffect(() => {
    const close = (e: MouseEvent) => { if (!bar.current?.contains(e.target as Node)) setOpen(null); };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const openMenu = (i: number, last = false) => { setTop(i); setFocusLast(last); setOpen(i); };
  const moveTop = (i: number, keepOpen: boolean) => {
    const n = wrap(i, menus.length);
    setTop(n);
    if (keepOpen) openMenu(n);
    else { setOpen(null); topRefs.current[n]?.focus(); }
  };
  const close = (i: number) => { setOpen(null); topRefs.current[i]?.focus(); };

  const onTopKey = (e: KeyboardEvent, i: number) => {
    const k = e.key;
    if (k === 'ArrowRight') moveTop(i + 1, false);
    else if (k === 'ArrowLeft') moveTop(i - 1, false);
    else if (k === 'ArrowDown' || k === 'Enter' || k === ' ') openMenu(i);
    else if (k === 'ArrowUp') openMenu(i, true);
    else if (k === 'Home') moveTop(0, false);
    else if (k === 'End') moveTop(menus.length - 1, false);
    else return;
    e.preventDefault();
  };
  const onMenuKey = (e: KeyboardEvent, i: number) => {
    const it = menuItems(i);
    const k = it.indexOf(document.activeElement as HTMLElement);
    switch (e.key) {
      case 'ArrowDown': it[wrap(k + 1, it.length)]?.focus(); break;
      case 'ArrowUp': it[wrap(k - 1, it.length)]?.focus(); break;
      case 'Home': it[0]?.focus(); break;
      case 'End': it[it.length - 1]?.focus(); break;
      case 'Escape': close(i); break;
      case 'ArrowRight': moveTop(i + 1, true); break;
      case 'ArrowLeft': moveTop(i - 1, true); break;
      case 'Enter': case ' ': (document.activeElement as HTMLElement)?.click(); break;
      case 'Tab': setOpen(null); return;
      default: return;
    }
    e.preventDefault();
  };

  return (
    <ul ref={bar} role="menubar" aria-label={label} {...mergeRootProps(stylex.props(styles.bar), { className, style })}>
      {menus.map((m, i) => (
        <li key={m.label} {...stylex.props(styles.top)}>
          <span
            ref={(el) => { topRefs.current[i] = el; }}
            role="menuitem"
            tabIndex={i === top ? 0 : -1}
            aria-haspopup="menu"
            aria-expanded={open === i}
            aria-controls={`${id}-m${i}`}
            onClick={() => (open === i ? setOpen(null) : openMenu(i))}
            onKeyDown={(e) => onTopKey(e, i)}
            {...stylex.props(styles.topItem, open === i && styles.topOpen)}
          >
            {m.label}
          </span>
          <ul ref={(el) => { menuRefs.current[i] = el; }} role="menu" id={`${id}-m${i}`} aria-label={m.label} hidden={open !== i}
            onKeyDown={(e) => onMenuKey(e, i)} {...stylex.props(styles.menu)}>
            {m.items.map((item, j) => <MenuEntry key={j} item={item} onDone={() => close(i)} />)}
          </ul>
        </li>
      ))}
    </ul>
  );
}

function MenuEntry({ item, onDone }: { item: MenubarItem; onDone: () => void }) {
  if (item.type === 'separator') return <li role="separator" {...stylex.props(styles.separator)} />;
  if (item.type === 'checkbox')
    return (
      <li role="none">
        <span role="menuitemcheckbox" tabIndex={-1} aria-checked={item.checked} onClick={() => item.onChange(!item.checked)}
          {...stylex.props(styles.item, styles.tick(item.checked ? '"✓" / ""' : '""'))}>{item.label}</span>
      </li>
    );
  if (item.type === 'radio')
    return (
      <li role="none">
        <ul role="group" aria-label={item.label} {...stylex.props(styles.group)}>
          {item.options.map((o) => (
            <li role="none" key={o}>
              <span role="menuitemradio" tabIndex={-1} aria-checked={item.value === o} onClick={() => item.onChange(o)}
                {...stylex.props(styles.item, styles.tick(item.value === o ? '"✓" / ""' : '""'))}>{o}</span>
            </li>
          ))}
        </ul>
      </li>
    );
  return (
    <li role="none">
      <span role="menuitem" tabIndex={-1} aria-keyshortcuts={item.keyshortcuts} onClick={() => { item.onSelect?.(); onDone(); }}
        {...stylex.props(styles.item)}>
        {item.label}
        {item.shortcut ? <kbd {...stylex.props(styles.kbd)}>{item.shortcut}</kbd> : null}
      </span>
    </li>
  );
}

const styles = stylex.create({
  bar: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    borderBottomWidth: shape.borderWidth,
    borderBottomStyle: 'solid',
    borderBottomColor: color.controlBorder,
    fontFamily: font.sans,
  },
  top: { position: 'relative' },
  topItem: { display: 'block', paddingBlock: space.xs, paddingInline: space.md, minHeight: shape.targetMin, color: color.canvasText, cursor: 'default' },
  topOpen: { backgroundColor: color.highlight, color: color.highlightText },
  menu: {
    position: 'absolute',
    zIndex: 5,
    minWidth: '12rem',
    listStyle: 'none',
    margin: 0,
    padding: space.xs,
    borderWidth: shape.borderWidth,
    borderStyle: 'solid',
    borderColor: color.controlBorder,
    backgroundColor: color.surfaceRaised,
  },
  group: { listStyle: 'none', margin: 0, padding: 0 },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: space.sm,
    paddingBlock: space.xs,
    paddingInline: space.sm,
    minHeight: `calc(${shape.targetMin} + ${space.sm})`,
    cursor: 'default',
    backgroundColor: { default: null, ':hover': color.highlight, ':focus': color.highlight },
    color: { default: null, ':hover': color.highlightText, ':focus': color.highlightText },
    outline: { default: null, ':focus': 'none', ':focus-visible': `${shape.focusWidth} solid ${color.focusRing}` },
    outlineOffset: `calc(-1 * ${shape.focusWidth})`,
  },
  tick: (content: string) => ({ '::before': { content, width: '1em' } }),
  separator: { borderTopWidth: shape.borderWidth, borderTopStyle: 'solid', borderTopColor: color.rule, marginBlock: space.xs },
  // A shortcut hint, not a keycap: switch off base.css's key outline.
  kbd: {
    marginInlineStart: 'auto',
    fontFamily: font.sans,
    fontSize: '0.8125rem',
    color: color.grayText,
    padding: 0,
    borderStyle: 'none',
    backgroundColor: 'transparent',
  },
});
