'use client';

import * as stylex from '@stylexjs/stylex';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Fieldset } from './Field';

/**
 * A parent checkbox showing whether all, none or some children are checked. "Some"
 * is the native `indeterminate` property (announced as mixed), set from script.
 */
export function TriStateCheckbox({
  legend,
  parentLabel,
  options,
  defaultChecked = [],
  onChange,
  className,
  style,
}: {
  legend: ReactNode;
  parentLabel: ReactNode;
  options: string[];
  defaultChecked?: string[];
  onChange?: (checked: string[]) => void;
  /** Extra classes, forwarded to the Fieldset. Unlayered CSS wins. */
  className?: string;
  /** Inline style, forwarded to the Fieldset. Wins property by property. */
  style?: CSSProperties;
}) {
  const [checked, setChecked] = useState(() => new Set(defaultChecked));
  const parent = useRef<HTMLInputElement>(null);
  const all = checked.size === options.length;
  const some = checked.size > 0 && !all;
  useEffect(() => {
    if (parent.current) parent.current.indeterminate = some;
  }, [some]);
  const update = (next: Set<string>) => {
    setChecked(next);
    onChange?.(options.filter((o) => next.has(o)));
  };
  return (
    <Fieldset legend={legend} className={className} style={style}>
      <p {...stylex.props(styles.p)}>
        <label>
          <input ref={parent} type="checkbox" checked={all} onChange={() => update(new Set(all ? [] : options))} />{' '}
          <b>{parentLabel}</b>
        </label>
      </p>
      <ul {...stylex.props(styles.list)}>
        {options.map((o) => (
          <li key={o}>
            <label>
              <input
                type="checkbox"
                checked={checked.has(o)}
                onChange={(e) => {
                  const next = new Set(checked);
                  if (e.target.checked) next.add(o);
                  else next.delete(o);
                  update(next);
                }}
              />{' '}
              {o}
            </label>
          </li>
        ))}
      </ul>
    </Fieldset>
  );
}

const styles = stylex.create({
  p: { margin: 0 },
  list: { listStyle: 'none', margin: 0, paddingInlineStart: 28 },
});
