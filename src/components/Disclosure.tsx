import * as stylex from '@stylexjs/stylex';
import { useEffect, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { color, font, space } from '../tokens.stylex';
import { Chevron } from './Chevron';
import { chevron } from './chevron.stylex';

export type AccordionItem = { title: ReactNode; content: ReactNode };

/**
 * The APG accordion: each header is a real heading holding a button with
 * aria-expanded. Closed panels use hidden="until-found", so Find in page still
 * reaches their text and opens them. For simple FAQs, Details needs no script.
 */
export function Accordion({
  items,
  level = 3,
  defaultOpen = [0],
}: {
  items: AccordionItem[];
  /** Heading level of the section titles. */
  level?: 2 | 3 | 4;
  defaultOpen?: number[];
}) {
  const id = useId();
  const [open, setOpen] = useState(() => new Set(defaultOpen));
  const H = `h${level}` as const;
  const set = (i: number, on: boolean) =>
    setOpen((s) => {
      const next = new Set(s);
      if (on) next.add(i);
      else next.delete(i);
      return next;
    });
  return (
    <div {...stylex.props(styles.accordion)}>
      {items.map((item, i) => (
        <AccordionSection key={i} H={H} id={`${id}-${i}`} title={item.title} open={open.has(i)} onToggle={(on) => set(i, on)}
          regions={items.length <= 6}>
          {item.content}
        </AccordionSection>
      ))}
    </div>
  );
}

function AccordionSection({ H, id, title, open, onToggle, regions, children }: {
  H: 'h2' | 'h3' | 'h4';
  id: string;
  title: ReactNode;
  open: boolean;
  onToggle: (on: boolean) => void;
  regions: boolean;
  children: ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);
  // React does not know hidden="until-found" or beforematch, so set them by hand.
  useEffect(() => {
    const p = panel.current;
    if (!p) return;
    if (open) p.removeAttribute('hidden');
    else p.setAttribute('hidden', 'until-found');
    const onMatch = () => onToggle(true);
    p.addEventListener('beforematch', onMatch);
    return () => p.removeEventListener('beforematch', onMatch);
  }, [open, onToggle]);
  return (
    <>
      <H {...stylex.props(styles.heading)}>
        <button type="button" id={`${id}-b`} aria-expanded={open} aria-controls={`${id}-p`} onClick={() => onToggle(!open)}
          {...stylex.props(styles.button)}>
          <Chevron kind="disclosure" open={open} />
          {title}
        </button>
      </H>
      <div ref={panel} id={`${id}-p`} role={regions ? 'region' : undefined} aria-labelledby={`${id}-b`} {...stylex.props(styles.panel)}>
        {children}
      </div>
    </>
  );
}

/**
 * A native details/summary. Give several the same `name` to make an accordion
 * where opening one closes the others. Opening animates its height unless the
 * reader asked for reduced motion (base.css).
 */
export function Details({ summary, children, open, name }: { summary: ReactNode; children: ReactNode; open?: boolean; name?: string }) {
  return (
    <details open={open} name={name}>
      <summary>{summary}</summary>
      <div {...stylex.props(styles.details)}>{children}</div>
    </details>
  );
}

const styles = stylex.create({
  accordion: { borderTopWidth: 1, borderTopStyle: 'solid', borderTopColor: color.rule },
  heading: { margin: 0, fontSize: '1rem' },
  button: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    minHeight: `calc(${space.lg} * 2)`,
    paddingBlock: space.xs,
    paddingInline: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: color.rule,
    borderRadius: 0,
    color: color.canvasText,
    fontFamily: font.sans,
    fontSize: '1rem',
    fontWeight: 700,
    textAlign: 'start',
  },
  panel: {
    paddingBlock: `${space.xs} ${space.sm}`,
    paddingInlineStart: `calc(${chevron.size} + ${chevron.gap})`,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: color.rule,
  },
  details: { paddingBlock: `${space.xs} 0` },
});
