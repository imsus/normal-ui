import * as stylex from '@stylexjs/stylex';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { color, font, shape, space } from '@imsus/normal-ui-css/tokens.stylex';
import { optionStyles as o } from './Options';
import { shared } from './shared';

export type Command = {
  /** What it does or where it goes, in words: "Go to orders", "Text field". */
  label: string;
  /** The heading it is listed under. Commands keep the order they are given in. */
  group?: string;
  /** A second, quieter line of context at the end of the row: "Forms". */
  detail?: string;
  /** Other words that should find it, not shown: its code name, synonyms. */
  keywords?: string;
  /** Navigates here when chosen. Ctrl or Cmd + Enter opens it in a new tab. */
  href?: string;
  onSelect?: () => void;
};

/**
 * A command palette in the manner of cmdk: a modal dialog holding an editable
 * combobox and a grouped listbox of commands, filtered as you type.
 *
 * It follows the APG combobox pattern inside a native modal <dialog>: focus stays in
 * the input, aria-activedescendant names the highlighted command, Up and Down move
 * (wrapping), Enter runs it, Esc closes and returns focus to where it was. The first
 * match is highlighted, so typing then Enter runs the best match. The number of
 * matches is announced politely.
 *
 * `shortcut` makes Ctrl+key (Cmd+key on a Mac) open and close it from anywhere on the
 * page; leave it off when another palette already owns that key.
 */
export function CommandPalette({
  open,
  onOpenChange,
  commands,
  label = 'Command palette',
  placeholder = 'Type a command or search…',
  shortcut,
  noun = ['result', 'results'],
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  commands: Command[];
  /** The dialog's and the input's accessible name. */
  label?: string;
  placeholder?: string;
  /** A letter: "k" means Ctrl+K and Cmd+K. */
  shortcut?: string;
  /** Singular and plural for the announcement: "3 pages". */
  noun?: [string, string];
}) {
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const groups = useMemo(() => filter(commands, query), [commands, query]);
  const flat = groups.flatMap((g) => g.items);
  const current = flat[active];

  // Open and close the native dialog from `open`.
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      opener.current = document.activeElement as HTMLElement | null;
      setQuery('');
      setActive(0);
      d.showModal();
      input.current?.focus();
    } else if (!open && d.open) d.close();
  }, [open]);

  // The global shortcut. A ref keeps the listener from going stale.
  const openRef = useRef(open);
  openRef.current = open;
  useEffect(() => {
    if (!shortcut) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === shortcut.toLowerCase()) {
        e.preventDefault();
        onOpenChange(!openRef.current);
      }
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [shortcut, onOpenChange]);

  // Keep the highlighted command in view.
  useEffect(() => {
    list.current?.querySelector(`[id="${id}-o${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active, id]);

  const run = (c: Command, newTab = false) => {
    dialog.current?.close();
    c.onSelect?.();
    if (c.href) {
      if (newTab) window.open(c.href, '_blank', 'noopener');
      else location.assign(c.href);
    }
  };
  const onKeyDown = (e: KeyboardEvent) => {
    const n = flat.length;
    if (e.key === 'ArrowDown' && n) setActive((active + 1) % n);
    else if (e.key === 'ArrowUp' && n) setActive((active - 1 + n) % n);
    else if (e.key === 'Enter' && current) run(current, e.ctrlKey || e.metaKey);
    else return;
    e.preventDefault();
  };

  const count = flat.length;
  let index = -1;
  return (
    <dialog
      ref={dialog}
      aria-label={label}
      onClose={() => {
        onOpenChange(false);
        opener.current?.focus?.();
      }}
      // A click on the backdrop (the dialog box itself, outside its content) closes it.
      onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }}
      {...stylex.props(styles.dialog)}
    >
      <div {...stylex.props(styles.inner)}>
        <input
          ref={input}
          type="text"
          role="combobox"
          aria-label={label}
          aria-autocomplete="list"
          aria-expanded={count > 0}
          aria-controls={`${id}-list`}
          aria-activedescendant={current ? `${id}-o${active}` : undefined}
          autoComplete="off"
          spellCheck={false}
          placeholder={placeholder}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActive(0); }}
          onKeyDown={onKeyDown}
          {...stylex.props(styles.input)}
        />
        <div ref={list} id={`${id}-list`} role="listbox" aria-label={label} {...stylex.props(styles.list)}>
          {groups.map((g) => (
            <div key={g.name} role="group" aria-labelledby={g.name ? `${id}-g-${g.name}` : undefined}>
              {g.name ? (
                <div id={`${id}-g-${g.name}`} role="presentation" {...stylex.props(shared.eyebrow, styles.heading)}>{g.name}</div>
              ) : null}
              {g.items.map((c) => {
                const i = ++index;
                const on = i === active;
                return (
                  <div
                    key={`${c.label}-${c.href ?? i}`}
                    id={`${id}-o${i}`}
                    role="option"
                    aria-selected={on}
                    onPointerMove={() => { if (!on) setActive(i); }}
                    // Keep focus in the input; run on click.
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => run(c, e.ctrlKey || e.metaKey)}
                    {...stylex.props(o.option, styles.option, on && o.active)}
                  >
                    <span {...stylex.props(styles.label)}>{c.label}</span>
                    {c.detail ? <span {...stylex.props(styles.detail, on && styles.detailOn)}>{c.detail}</span> : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {count === 0 ? <p {...stylex.props(styles.empty)}>Nothing matches “{query.trim()}”.</p> : null}
        <p aria-hidden="true" {...stylex.props(styles.footer)}>
          <span><kbd>↑</kbd> <kbd>↓</kbd> move</span>
          <span><kbd>Enter</kbd> open</span>
          <span><kbd>Esc</kbd> close</span>
        </p>
        <span role="status" {...stylex.props(shared.visuallyHidden)}>
          {query.trim() ? `${count} ${count === 1 ? noun[0] : noun[1]}` : ''}
        </span>
      </div>
    </dialog>
  );
}

/**
 * Every word typed must appear somewhere in the label, keywords, group or detail.
 * Matches are ranked: the whole label, then a label that starts with the query, then
 * a word in the label that does, then the label containing it, then anything else.
 * With no query, everything is listed in the given order. Groups follow their best match.
 */
function filter(commands: Command[], query: string) {
  const q = query.trim().toLowerCase();
  const words = q.split(/\s+/).filter(Boolean);
  const scored = commands
    .map((c, order) => {
      if (!q) return { c, order, rank: 0 };
      const label = c.label.toLowerCase();
      const hay = `${label} ${c.keywords ?? ''} ${c.group ?? ''} ${c.detail ?? ''}`.toLowerCase();
      if (!words.every((w) => hay.includes(w))) return null;
      const rank = label === q ? 0
        : label.startsWith(q) ? 1
        : label.split(/[\s-]+/).some((w) => w.startsWith(words[0])) ? 2
        : label.includes(words[0]) ? 3
        : 4;
      return { c, order, rank };
    })
    .filter((x) => x !== null);
  const byGroup = new Map<string, typeof scored>();
  for (const s of scored) {
    const g = s.c.group ?? '';
    byGroup.set(g, [...(byGroup.get(g) ?? []), s]);
  }
  return [...byGroup.entries()]
    .map(([name, items]) => {
      items.sort((a, b) => a.rank - b.rank || a.order - b.order);
      return { name, best: items[0].rank, first: items[0].order, items: items.map((x) => x.c) };
    })
    .sort((a, b) => a.best - b.best || a.first - b.first);
}

const styles = stylex.create({
  dialog: {
    // Near the top, where the eye already is, and wide enough for long titles.
    marginBlockStart: 'min(12vh, 6rem)',
    width: `min(36rem, calc(100% - 2 * ${space.md}))`,
    maxHeight: `calc(100dvh - 2 * min(12vh, 6rem))`,
    padding: 0,
    overflow: 'hidden',
  },
  inner: { display: 'flex', flexDirection: 'column', maxHeight: 'inherit' },
  input: {
    width: '100%',
    minHeight: 48,
    paddingInline: space.md,
    fontSize: '1.125rem',
    borderWidth: 0,
    borderBottomWidth: shape.borderWidth,
    borderStyle: 'solid',
    borderColor: color.controlBorder,
    borderRadius: 0,
    // The dialog draws the frame; the ring sits inside it.
    outlineOffset: { default: null, ':focus-visible': `calc(-1 * ${shape.focusWidth})` },
  },
  // Grows with its results up to the dialog's height, then scrolls. It sits on the
  // dialog's surface: no frame, field fill or height cap from the plain-HTML
  // [role=listbox] rule in patterns.css.
  list: {
    overflowY: 'auto',
    padding: space.xs,
    minHeight: 0,
    maxHeight: 'none',
    flex: '0 1 auto',
    borderWidth: 0,
    backgroundColor: 'transparent',
    color: 'inherit',
  },
  heading: { paddingInline: space.sm, paddingBlock: `${space.sm} ${space.xs}` },
  // No checkmark column: commands are run, not selected.
  // patterns.css bolds [aria-selected=true]; here that is only the highlight.
  option: { '::before': { content: 'none' }, justifyContent: 'space-between', cursor: 'pointer', fontWeight: 'normal' },
  label: { minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  detail: { flex: 'none', fontSize: '0.875rem', color: color.grayText },
  detailOn: { color: 'inherit' },
  empty: { margin: 0, padding: space.md, color: color.grayText },
  footer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: space.md,
    margin: 0,
    paddingBlock: space.xs,
    paddingInline: space.md,
    fontFamily: font.sans,
    fontSize: '0.8125rem',
    color: color.grayText,
    borderTopWidth: shape.borderWidth,
    borderTopStyle: 'solid',
    borderTopColor: color.rule,
  },
});
