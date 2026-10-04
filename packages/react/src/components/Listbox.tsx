'use client';

import * as stylex from '@stylexjs/stylex';
import { useId, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';
import { optionStyles as o } from './Options';
import { clamp, mergeRootProps } from './shared';

/**
 * A single-select list where every option stays visible. Selection follows focus:
 * Up/Down, Home/End, and typing a letter jumps. A native <select size> does this
 * without script; use this only when options need rich content.
 */
export function Listbox({
  label,
  options,
  defaultValue,
  onChange,
  className,
  style,
}: {
  label: ReactNode;
  options: string[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Extra classes on the wrap, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style on the wrap, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  const id = useId();
  const [cur, setCur] = useState(Math.max(0, defaultValue ? options.indexOf(defaultValue) : 0));
  const list = useRef<HTMLUListElement>(null);
  const set = (i: number) => {
    const n = clamp(i, 0, options.length - 1);
    setCur(n);
    onChange?.(options[n]);
    list.current?.children[n]?.scrollIntoView({ block: 'nearest' });
  };
  const onKeyDown = (e: KeyboardEvent) => {
    const k = e.key;
    if (k === 'ArrowDown') set(cur + 1);
    else if (k === 'ArrowUp') set(cur - 1);
    else if (k === 'Home') set(0);
    else if (k === 'End') set(options.length - 1);
    else if (k.length === 1 && /\S/.test(k)) {
      for (let j = 1; j <= options.length; j++) {
        const t = (cur + j) % options.length;
        if (options[t].toLowerCase().startsWith(k.toLowerCase())) {
          set(t);
          break;
        }
      }
    } else return;
    e.preventDefault();
  };
  return (
    <div {...mergeRootProps(undefined, { className, style })}>
      <p id={`${id}-l`} {...stylex.props(styles.label)}>{label}</p>
      <ul
        ref={list}
        role="listbox"
        tabIndex={0}
        aria-labelledby={`${id}-l`}
        aria-activedescendant={`${id}-o${cur}`}
        onKeyDown={onKeyDown}
        {...stylex.props(o.list, styles.list)}
      >
        {options.map((opt, i) => (
          <li
            key={opt}
            id={`${id}-o${i}`}
            role="option"
            aria-selected={i === cur}
            onClick={() => {
              set(i);
              list.current?.focus();
            }}
            {...stylex.props(o.option, i === cur && o.selected, i === cur && o.active)}
          >
            {opt}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = stylex.create({
  label: { margin: '0 0 4px' },
  list: { maxWidth: '20rem' },
});
