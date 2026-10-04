import * as stylex from '@stylexjs/stylex';
import { Fragment, useId, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';
import { color, shape, space } from '@imsus/normal-ui-css/tokens.stylex';
import { shared, mergeRootProps, clamp } from './shared';
import { Chevron } from './Chevron';
import { cardBleed } from './Card';

export type Column<Row> = {
  key: keyof Row & string;
  label: ReactNode;
  /** Right-aligned, tabular figures. */
  numeric?: boolean;
  /** First column as <th scope="row">. */
  rowHeader?: boolean;
};

const styles = stylex.create({
  wide: { width: '100%' },
  scroll: { overflowX: 'auto', maxWidth: '100%' },
  cell: { outline: { default: null, ':focus': `${shape.focusWidth} solid ${color.focusRing}` }, outlineOffset: `calc(-1 * ${shape.focusWidth} - 1px)` },
  edit: { width: '6em' },
  title: { marginTop: 0 },
  // A bleeding table: rows run edge to edge with horizontal lines only, and the first
  // and last cells line up with the card's content. Outside a card the inset falls
  // back to the normal cell padding.
  bleedTable: { width: '100%', margin: 0 },
  // The bleed margins widen the wrapper past its container; max-width: 100% would cancel that.
  bleedWrap: { maxWidth: 'none' },
  bleedCell: { borderInlineWidth: 0 },
  bleedFirst: { paddingInlineStart: `var(--pd-card-bleed-x, ${space.sm})` },
  bleedLast: { paddingInlineEnd: `var(--pd-card-bleed-x, ${space.sm})` },
  bleedTop: { borderTopWidth: 0 },
  bleedBottom: { borderBottomWidth: 0 },
  bleedCaption: { paddingInline: `var(--pd-card-bleed-x, ${space.sm})` },
});

/**
 * A data table: a caption, header cells with scope, numbers right-aligned. Base CSS
 * collapses borders and pads cells. Wide tables scroll inside their own box.
 */
export function Table<Row extends Record<string, ReactNode>>({
  caption,
  columns,
  rows,
  rowKey,
  bleed = false,
  className,
  style,
}: {
  caption: ReactNode;
  columns: Column<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  /**
   * Inside a Card.Body: run the rows out to the card's edges, keeping cell content
   * lined up with the card's. Lines between rows only; the card draws the edges.
   */
  bleed?: boolean;
  /** Extra classes on the wrap, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style on the wrap, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  const last = columns.length - 1;
  // Per cell: in a bleeding table, drop the side lines, pad the outer cells to the
  // card's content edge, and drop the lines the card's own edges already draw.
  const cell = (i: number, first: boolean, final: boolean, numeric?: boolean) =>
    stylex.props(
      numeric && shared.numeric,
      bleed && styles.bleedCell,
      bleed && i === 0 && styles.bleedFirst,
      bleed && i === last && styles.bleedLast,
      bleed && first && styles.bleedTop,
      bleed && final && styles.bleedBottom,
    );
  return (
    <div {...mergeRootProps(stylex.props(styles.scroll, bleed && cardBleed.bleed, bleed && styles.bleedWrap), { className, style })}>
      <table {...stylex.props(bleed && styles.bleedTable)}>
        <caption {...stylex.props(bleed && styles.bleedCaption)}>{caption}</caption>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={c.key} scope="col" {...cell(i, true, false, c.numeric)}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={rowKey(r)}>
              {columns.map((c, i) => {
                const props = cell(i, false, ri === rows.length - 1, c.numeric);
                return c.rowHeader ? (
                  <th key={c.key} scope="row" {...props}>{r[c.key]}</th>
                ) : (
                  <td key={c.key} {...props}>{r[c.key]}</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * An interactive table (role="grid"): one Tab stop, arrows move between cells,
 * Home/End to row ends, Ctrl+Home/End to the corners. Columns listed in `editable`
 * switch to a number input on Enter or F2; Enter saves, Esc cancels.
 */
export function Grid<Row extends Record<string, string | number>>({
  label,
  hint,
  columns,
  rows: initial,
  editable = [],
  rowName,
  onEdit,
  className,
  style,
}: {
  label: ReactNode;
  hint?: ReactNode;
  columns: Column<Row>[];
  rows: Row[];
  editable?: (keyof Row & string)[];
  /** Names a row in announcements: "Stock for Linen shirt set to 10". */
  rowName: (row: Row) => string;
  onEdit?: (row: Row, key: keyof Row, value: number) => void;
  /** Extra classes, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  const [rows, setRows] = useState(initial);
  const [pos, setPos] = useState<[number, number]>([1, 0]);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const table = useRef<HTMLTableElement>(null);
  const labelId = useId();

  const cellAt = (r: number, c: number) => table.current?.rows[r]?.cells[c] as HTMLElement | undefined;
  const go = (r: number, c: number) => {
    const nr = clamp(r, 0, rows.length);
    const nc = clamp(c, 0, columns.length - 1);
    setPos([nr, nc]);
    cellAt(nr, nc)?.focus();
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (editing) return;
    const [r, c] = pos;
    const k = e.key;
    if (k === 'ArrowRight') go(r, c + 1);
    else if (k === 'ArrowLeft') go(r, c - 1);
    else if (k === 'ArrowDown') go(r + 1, c);
    else if (k === 'ArrowUp') go(r - 1, c);
    else if (k === 'Home') (e.ctrlKey ? go(0, 0) : go(r, 0));
    else if (k === 'End') (e.ctrlKey ? go(rows.length, columns.length - 1) : go(r, columns.length - 1));
    else if ((k === 'Enter' || k === 'F2') && r > 0 && editable.includes(columns[c].key)) setEditing(true);
    else return;
    e.preventDefault();
  };
  const finish = (save: boolean, value: string) => {
    const [r, c] = pos;
    const row = rows[r - 1];
    const key = columns[c].key;
    if (save && value !== '') {
      const next = { ...row, [key]: Number(value) } as Row;
      setRows(rows.map((x, i) => (i === r - 1 ? next : x)));
      setMessage(`${String(columns[c].label)} for ${rowName(row)} set to ${value}.`);
      onEdit?.(next, key, Number(value));
    }
    setEditing(false);
    requestAnimationFrame(() => cellAt(r, c)?.focus());
  };

  const cellProps = (r: number, c: number) => ({
    tabIndex: pos[0] === r && pos[1] === c ? 0 : -1,
    onFocus: () => setPos([r, c]),
    ...stylex.props(styles.cell, columns[c].numeric && shared.numeric),
  });

  return (
    <div {...mergeRootProps(undefined, { className, style })}>
      <p id={labelId} {...stylex.props(styles.title)}>
        <b>{label}</b> {hint ? <small {...stylex.props(shared.muted)}>{hint}</small> : null}
      </p>
      <table ref={table} role="grid" aria-labelledby={labelId} onKeyDown={onKeyDown}>
        <thead>
          <tr>{columns.map((col, c) => <th key={col.key} {...cellProps(0, c)}>{col.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={rowName(row)}>
              {columns.map((col, c) => {
                const here = editing && pos[0] === i + 1 && pos[1] === c;
                return (
                  <td key={col.key} {...cellProps(i + 1, c)}>
                    {here ? (
                      <input type="number" min={0} defaultValue={row[col.key]} autoFocus aria-label={`${String(col.label)} for ${rowName(row)}`}
                        onFocus={(e) => e.currentTarget.select()}
                        onKeyDown={(e) => {
                          if (e.key !== 'Enter' && e.key !== 'Escape') return;
                          e.preventDefault();
                          e.stopPropagation();
                          finish(e.key === 'Enter', e.currentTarget.value);
                        }}
                        {...stylex.props(styles.edit)} />
                    ) : (
                      row[col.key]
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p role="status" {...stylex.props(shared.visuallyHidden)}>{message}</p>
    </div>
  );
}

export type TreegridGroup = { label: string; value: ReactNode; children: { label: string; value: ReactNode }[] };

/**
 * A table whose rows nest. Whole rows take focus: Up/Down move, Right expands,
 * Left collapses or goes to the parent, Home/End jump. Collapsed children are hidden.
 */
export function Treegrid({
  label,
  columns,
  groups,
  defaultExpanded = [0],
  className,
  style,
}: {
  label: string;
  columns: [ReactNode, ReactNode];
  groups: TreegridGroup[];
  defaultExpanded?: number[];
  /** Extra classes, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  const [expanded, setExpanded] = useState(() => new Set(defaultExpanded));
  const [focus, setFocus] = useState('0');
  const body = useRef<HTMLTableSectionElement>(null);
  const visible: string[] = [];
  groups.forEach((g, i) => {
    visible.push(String(i));
    if (expanded.has(i)) g.children.forEach((_, j) => visible.push(`${i}.${j}`));
  });
  const go = (key?: string) => {
    if (!key) return;
    setFocus(key);
    body.current?.querySelector<HTMLElement>(`[data-key="${key}"]`)?.focus();
  };
  const toggle = (i: number, on: boolean) =>
    setExpanded((s) => {
      const n = new Set(s);
      if (on) n.add(i);
      else n.delete(i);
      return n;
    });
  const onKeyDown = (e: KeyboardEvent, key: string) => {
    const i = visible.indexOf(key);
    const [g, child] = key.split('.');
    const gi = Number(g);
    if (e.key === 'ArrowDown') go(visible[i + 1]);
    else if (e.key === 'ArrowUp') go(visible[i - 1]);
    else if (e.key === 'ArrowRight') { if (child === undefined && !expanded.has(gi)) toggle(gi, true); }
    else if (e.key === 'ArrowLeft') { if (child === undefined) toggle(gi, false); else go(g); }
    else if (e.key === 'Home') go(visible[0]);
    else if (e.key === 'End') go(visible[visible.length - 1]);
    else return;
    e.preventDefault();
  };
  const rowProps = (key: string) => ({
    'data-key': key,
    tabIndex: focus === key ? 0 : -1,
    onKeyDown: (e: KeyboardEvent) => onKeyDown(e, key),
    ...stylex.props(styles.cell),
  });
  return (
    <table role="treegrid" aria-label={label} {...mergeRootProps(stylex.props(styles.wide, tg.table), { className, style })}>
      <thead>
        <tr><th scope="col">{columns[0]}</th><th scope="col" {...stylex.props(shared.numeric)}>{columns[1]}</th></tr>
      </thead>
      <tbody ref={body}>
        {groups.map((g, i) => {
          const open = expanded.has(i);
          return (
            <Fragment key={g.label}>
              <tr aria-level={1} aria-posinset={i + 1} aria-setsize={groups.length} aria-expanded={open}
                onClick={() => { toggle(i, !open); go(String(i)); }} {...rowProps(String(i))}>
                <td {...stylex.props(tg.parent)}><Chevron kind="disclosure" open={open} />{g.label}</td>
                <td {...stylex.props(shared.numeric)}>{g.value}</td>
              </tr>
              {g.children.map((c, j) => (
                <tr key={c.label} aria-level={2} aria-posinset={j + 1} aria-setsize={g.children.length} hidden={!open}
                  onClick={() => go(`${i}.${j}`)} {...rowProps(`${i}.${j}`)}>
                  <td {...stylex.props(tg.child)}>{c.label}</td>
                  <td {...stylex.props(shared.numeric)}>{c.value}</td>
                </tr>
              ))}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}

const tg = stylex.create({
  table: { maxWidth: '32rem' },
  child: { paddingInlineStart: '2.25em' },
  // The arrow is the <Chevron> element; switch off the one patterns.css draws for
  // hand-written treegrids, which would otherwise match this cell by role.
  parent: { '::before': { content: 'none' } },
});
