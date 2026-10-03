import * as stylex from '@stylexjs/stylex';
import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { optionStyles as o } from './Options';
import { shared } from './shared';

/**
 * An editable combobox with list autocomplete. Focus stays in the input;
 * aria-activedescendant names the highlighted option. Down opens and moves, Enter
 * picks, Esc closes (a second Esc clears). The match count is announced politely.
 */
export function Combobox({
  label,
  options,
  hint,
  defaultValue = '',
  noun = ['result', 'results'],
  onSelect,
}: {
  label: ReactNode;
  options: string[];
  hint?: ReactNode;
  defaultValue?: string;
  /** Singular and plural for the announcement: "3 cities found". */
  noun?: [string, string];
  onSelect?: (value: string) => void;
}) {
  const id = useId();
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [message, setMessage] = useState('');
  const list = useRef<HTMLUListElement>(null);
  const q = value.trim().toLowerCase();
  const matches = q ? options.filter((c) => c.toLowerCase().startsWith(q)) : [];
  const shown = open && matches.length > 0;
  // The list lives in the top layer, so no scrolling or overflow-hidden ancestor
  // (a card, a dialog, a docs demo frame) can clip it. It is anchored to the input.
  const anchor = `--combo-${id.replace(/[^\w-]/g, '')}`;
  useEffect(() => {
    const l = list.current;
    if (!l) return;
    try {
      if (shown) l.showPopover();
      else l.hidePopover();
    } catch {
      /* already in that state */
    }
  }, [shown]);

  const announce = (v: string) => {
    const n = v.trim() ? options.filter((c) => c.toLowerCase().startsWith(v.trim().toLowerCase())).length : 0;
    setMessage(v.trim() ? `${n} ${n === 1 ? noun[0] : noun[1]} found` : '');
  };
  const choose = (c: string) => {
    setValue(c);
    setOpen(false);
    setActive(-1);
    setMessage(`${c} chosen`);
    onSelect?.(c);
  };
  const move = (d: number) => {
    if (!matches.length) return;
    setOpen(true);
    const n = (active + d + matches.length) % matches.length;
    setActive(n);
    list.current?.children[n]?.scrollIntoView({ block: 'nearest' });
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') move(1);
    else if (e.key === 'ArrowUp') move(-1);
    else if (e.key === 'Enter' && shown && active >= 0) choose(matches[active]);
    else if (e.key === 'Escape') {
      if (shown) setOpen(false);
      else setValue('');
      setActive(-1);
    } else return;
    e.preventDefault();
  };

  return (
    <div {...stylex.props(shared.field)}>
      <label htmlFor={id}>{label}</label>
      <div {...stylex.props(styles.combo)}>
        <input
          id={id}
          type="text"
          role="combobox"
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={shown}
          aria-controls={`${id}-list`}
          aria-activedescendant={shown && active >= 0 ? `${id}-o${active}` : undefined}
          aria-describedby={hint ? `${id}-h` : undefined}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setActive(-1);
            setOpen(true);
            announce(e.target.value);
          }}
          onKeyDown={onKeyDown}
          onBlur={() => setOpen(false)}
          {...stylex.props(styles.input, styles.anchorName(anchor))}
        />
        <ul ref={list} id={`${id}-list`} role="listbox" aria-label={typeof label === 'string' ? label : undefined} popover="manual"
          {...stylex.props(o.list, styles.popup, styles.positionAnchor(anchor))}>
          {matches.map((c, i) => (
            <li key={c} id={`${id}-o${i}`} role="option" aria-selected={i === active}
              onMouseDown={(e) => { e.preventDefault(); choose(c); }}
              {...stylex.props(o.option, i === active && o.active)}>
              {c}
            </li>
          ))}
        </ul>
      </div>
      {hint ? <small id={`${id}-h`} {...stylex.props(shared.muted)}>{hint}</small> : null}
      <span role="status" {...stylex.props(shared.visuallyHidden)}>{message}</span>
    </div>
  );
}

const styles = stylex.create({
  combo: { maxWidth: '24rem' },
  input: { width: '100%' },
  anchorName: (anchorName: string) => ({ anchorName }),
  positionAnchor: (positionAnchor: string) => ({ positionAnchor }),
  popup: {
    // Under the input and exactly as wide; flips above when there is no room below.
    inset: 'auto',
    margin: 0,
    marginBlockStart: 2,
    positionArea: 'block-end span-inline-end',
    positionTryFallbacks: 'flip-block',
    width: 'anchor-size(width)',
  },
});
