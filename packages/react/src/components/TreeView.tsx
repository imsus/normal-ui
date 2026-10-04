import * as stylex from '@stylexjs/stylex';
import { useId, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { color, shape, space } from '@imsus/normal-ui-css/tokens.stylex';
import { Chevron } from './Chevron';

export type TreeNode = { id: string; label: string; children?: TreeNode[] };

/**
 * A hierarchy people expand and collapse. One Tab stop; Up/Down move through visible
 * items, Right opens or goes to the first child, Left closes or goes to the parent,
 * Home/End jump, Enter or Space selects.
 */
export function TreeView({
  label,
  items,
  defaultExpanded = [],
  onSelect,
}: {
  label: ReactNode;
  items: TreeNode[];
  defaultExpanded?: string[];
  onSelect?: (node: TreeNode) => void;
}) {
  const [expanded, setExpanded] = useState(() => new Set(defaultExpanded));
  const [selected, setSelected] = useState<string | null>(null);
  const [focus, setFocus] = useState(items[0]?.id);
  const refs = useRef(new Map<string, HTMLLIElement>());
  const labelId = useId();
  const [ring, setRing] = useState<string | null>(null);

  // Visible items in order, with their parent, for keyboard movement.
  const visible: { node: TreeNode; parent?: TreeNode }[] = [];
  const walk = (nodes: TreeNode[], parent?: TreeNode) =>
    nodes.forEach((n) => {
      visible.push({ node: n, parent });
      if (n.children && expanded.has(n.id)) walk(n.children, n);
    });
  walk(items);

  const go = (id?: string) => {
    if (!id) return;
    setFocus(id);
    refs.current.get(id)?.focus();
  };
  const toggle = (id: string, on: boolean) =>
    setExpanded((s) => {
      const next = new Set(s);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });
  const select = (n: TreeNode) => {
    setSelected(n.id);
    onSelect?.(n);
  };

  const onKeyDown = (e: KeyboardEvent, n: TreeNode) => {
    e.stopPropagation();
    const i = visible.findIndex((v) => v.node.id === n.id);
    const open = expanded.has(n.id);
    switch (e.key) {
      case 'ArrowDown': go(visible[i + 1]?.node.id); break;
      case 'ArrowUp': go(visible[i - 1]?.node.id); break;
      case 'ArrowRight': if (n.children) { if (!open) toggle(n.id, true); else go(n.children[0]?.id); } break;
      case 'ArrowLeft': if (n.children && open) toggle(n.id, false); else go(visible[i].parent?.id); break;
      case 'Home': go(visible[0]?.node.id); break;
      case 'End': go(visible[visible.length - 1]?.node.id); break;
      case 'Enter': case ' ': select(n); break;
      default: return;
    }
    e.preventDefault();
  };

  const render = (nodes: TreeNode[], role: 'tree' | 'group') => (
    <ul role={role} aria-labelledby={role === 'tree' ? labelId : undefined}
      {...stylex.props(styles.list, role === 'group' && styles.group, role === 'tree' && styles.tree)}>
      {nodes.map((n) => {
        const open = expanded.has(n.id);
        return (
          <li
            key={n.id}
            ref={(el) => { if (el) refs.current.set(n.id, el); else refs.current.delete(n.id); }}
            role="treeitem"
            aria-expanded={n.children ? open : undefined}
            aria-selected={selected === n.id}
            tabIndex={focus === n.id ? 0 : -1}
            onKeyDown={(e) => onKeyDown(e, n)}
            onFocus={(e) => {
              if (e.target !== e.currentTarget) return;
              setFocus(n.id);
              setRing(e.currentTarget.matches(':focus-visible') ? n.id : null);
            }}
            onBlur={() => setRing(null)}
            {...stylex.props(styles.item)}
          >
            <span
              onClick={() => { if (n.children) toggle(n.id, !open); select(n); go(n.id); }}
              {...stylex.props(styles.label, selected === n.id && styles.selected, ring === n.id && styles.ring)}
            >
              <Chevron kind={n.children ? 'disclosure' : 'spacer'} open={open} />
              {n.label}
            </span>
            {n.children && open ? render(n.children, 'group') : null}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div>
      <p id={labelId} {...stylex.props(styles.title)}><b>{label}</b></p>
      {render(items, 'tree')}
    </div>
  );
}

const styles = stylex.create({
  title: { margin: '0 0 4px' },
  list: { listStyle: 'none', margin: 0, padding: 0 },
  tree: { maxWidth: '20rem' },
  group: { paddingInlineStart: space.lg },
  item: { cursor: 'default', outline: 'none' },
  label: {
    display: 'flex',
    alignItems: 'center',
    minHeight: `calc(${shape.targetMin} + ${space.sm})`,
    paddingInline: space.xs,
  },
  ring: {
    outlineWidth: shape.focusWidth,
    outlineStyle: 'solid',
    outlineColor: color.focusRing,
    outlineOffset: `calc(-1 * ${shape.focusWidth})`,
    boxShadow: `inset 0 0 0 calc(${shape.focusWidth} + 2px) ${color.focusInset}`,
  },
  selected: {
    backgroundColor: { default: color.highlight, '@media (forced-colors: active)': 'Highlight' },
    color: { default: color.highlightText, '@media (forced-colors: active)': 'HighlightText' },
    fontWeight: 700,
    forcedColorAdjust: 'none',
  },
});
