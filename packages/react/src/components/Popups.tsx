'use client';

import * as stylex from '@stylexjs/stylex';
import { cloneElement, useEffect, useId, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent, ReactElement, ReactNode } from 'react';
import { color, font, shape, space } from '@imsus/normal-ui-css/tokens.stylex';
import { buttonStyles } from './Button';
import { Chevron } from './Chevron';
import { mergeRootProps } from './shared';

/*
 * Popovers: MenuButton, Tooltip, HintPopover and Toast. They use the browser's
 * popover attribute, so they sit in the top layer (no z-index), close on Esc and on
 * an outside click without script, and anchor to their invoker where CSS anchor
 * positioning exists.
 */

const popover = stylex.create({
  base: {
    // A top-layer popover is fixed to the viewport and needs no z-index; set both so
    // the [role=menu] rule in patterns.css (for hand-written menus) cannot change them.
    position: 'fixed',
    zIndex: 'auto',
    listStyle: 'none',
    margin: 0,
    padding: space.xs,
    borderWidth: shape.borderWidth,
    borderStyle: 'solid',
    borderColor: color.controlBorder,
    // Floating layers sit on surface-raised: above the page in dark mode.
    backgroundColor: color.surfaceRaised,
    color: color.canvasText,
  },
});

/**
 * The APG Menu Button: a button that opens a role="menu" of actions.
 *
 * Keyboard: Enter, Space or Down opens and focuses the first item; Up opens on the
 * last. In the menu, Up/Down move (wrapping), Home/End jump, a letter jumps to the
 * next item starting with it, Enter or Space activates and closes, Esc closes and
 * returns focus to the button, Tab closes and moves on.
 *
 * Built on popover="auto", so the menu sits in the top layer and closes on an
 * outside click without script. Put destructive actions last, after <MenuSeparator />.
 */
export function MenuButton({ label, children, className, style }: { label: ReactNode; children: ReactNode;
  /** Extra classes, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  const id = useId();
  // A per-instance anchor name, so the menu sits under its own button however it opened.
  const anchor = `--menu-${id.replace(/[^\w-]/g, '')}`;
  const button = useRef<HTMLButtonElement>(null);
  const popup = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  // Which item to focus once the popover has opened: first, last, or none (pointer).
  const focusOnOpen = useRef<'first' | 'last'>('first');

  const items = () => [...(popup.current?.querySelectorAll<HTMLElement>('[role=menuitem]') ?? [])];
  const focusItem = (i: number) => {
    const all = items();
    all[(i + all.length) % all.length]?.focus();
  };
  const close = () => {
    try { popup.current?.hidePopover(); } catch { /* already closed */ }
    button.current?.focus();
  };

  // Keep aria-expanded and focus in step with the popover, however it opened or closed
  // (click, keyboard, Esc, outside click).
  useEffect(() => {
    const p = popup.current;
    if (!p) return;
    const onToggle = (e: Event) => {
      const isOpen = (e as ToggleEvent).newState === 'open';
      setOpen(isOpen);
      if (isOpen) {
        const all = items();
        (focusOnOpen.current === 'last' ? all[all.length - 1] : all[0])?.focus();
        focusOnOpen.current = 'first';
      }
    };
    p.addEventListener('toggle', onToggle);
    return () => p.removeEventListener('toggle', onToggle);
  }, []);

  const onButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    focusOnOpen.current = e.key === 'ArrowUp' ? 'last' : 'first';
    if (open) focusItem(e.key === 'ArrowUp' ? -1 : 0);
    // `source` makes the button the invoker, as a click on popovertarget would.
    // Browsers without it ignore the option; the explicit anchor still positions the menu.
    else (popup.current?.showPopover as (options?: { source?: HTMLElement | null }) => void)
      ?.call(popup.current, { source: button.current });
  };

  const onMenuKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const all = items();
    const i = all.indexOf(document.activeElement as HTMLElement);
    switch (e.key) {
      case 'ArrowDown': focusItem(i + 1); break;
      case 'ArrowUp': focusItem(i - 1); break;
      case 'Home': focusItem(0); break;
      case 'End': focusItem(-1); break;
      case 'Escape': close(); break;
      case 'Tab':
        // Close, then let Tab move on from the button.
        try { popup.current?.hidePopover(); } catch { /* already closed */ }
        button.current?.focus();
        return;
      case ' ':
        // Space activates links too, as in a native menu.
        (document.activeElement as HTMLElement | null)?.click();
        break;
      default: {
        if (e.key.length !== 1 || !/\S/.test(e.key) || e.ctrlKey || e.metaKey || e.altKey) return;
        const k = e.key.toLowerCase();
        for (let j = 1; j <= all.length; j++) {
          const n = (i + j) % all.length;
          if (all[n].textContent?.trim().toLowerCase().startsWith(k)) { all[n].focus(); break; }
        }
      }
    }
    e.preventDefault();
  };

  return (
    <>
      <button
        ref={button}
        type="button"
        id={`${id}-b`}
        popoverTarget={id}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        onKeyDown={onButtonKeyDown}
        {...mergeRootProps(stylex.props(buttonStyles.button, menu.anchorName(anchor)), { className, style })}
      >
        {label}
        <Chevron kind="dropdown" open={open} />
      </button>
      <div
        ref={popup}
        popover="auto"
        id={id}
        role="menu"
        aria-labelledby={`${id}-b`}
        onKeyDown={onMenuKeyDown}
        onClick={(e) => { if ((e.target as Element).closest('[role=menuitem]')) close(); }}
        {...stylex.props(popover.base, menu.popup, menu.positionAnchor(anchor))}
      >
        {children}
      </div>
    </>
  );
}

/** An item in a MenuButton: a link with `href`, otherwise a button. Activating it closes the menu. */
export function MenuItem({ href, onClick, children, className, style }: { href?: string; onClick?: () => void; children: ReactNode;
  /** Extra classes, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  return href ? (
    <a href={href} role="menuitem" tabIndex={-1} {...mergeRootProps(stylex.props(menu.item), { className, style })}>{children}</a>
  ) : (
    <button type="button" role="menuitem" tabIndex={-1} onClick={onClick} {...mergeRootProps(stylex.props(menu.item), { className, style })}>{children}</button>
  );
}

export function MenuSeparator({ className, style }: {
  /** Extra classes, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
} = {}) {
  return <div role="separator" {...mergeRootProps(stylex.props(menu.separator), { className, style })} />;
}

const menu = stylex.create({
  anchorName: (anchorName: string) => ({ anchorName }),
  positionAnchor: (positionAnchor: string) => ({ positionAnchor }),
  popup: {
    positionArea: 'block-end span-inline-end',
    positionTryFallbacks: 'flip-block, flip-inline',
    marginBlock: space.xs,
    minWidth: '12rem',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    minHeight: `calc(${shape.targetMin} + ${space.sm})`,
    paddingBlock: space.xs,
    paddingInline: space.sm,
    // The focused item is the "current" one: highlight it, keep the ring for keyboard.
    backgroundColor: { default: 'transparent', ':hover': color.highlight, ':focus': color.highlight },
    color: { default: color.canvasText, ':hover': color.highlightText, ':focus': color.highlightText },
    outline: { default: null, ':focus': 'none', ':focus-visible': `${shape.focusWidth} solid ${color.focusRing}` },
    outlineOffset: `calc(-1 * ${shape.focusWidth})`,
    forcedColorAdjust: { default: null, ':focus': 'none' },
    borderWidth: 0,
    borderRadius: 0,
    textAlign: 'start',
    textDecoration: 'none',
    fontFamily: font.sans,
    fontSize: '1rem',
    lineHeight: 1.25,
  },
  separator: { borderTopWidth: shape.borderWidth, borderTopStyle: 'solid', borderTopColor: color.rule, marginBlock: space.xs },
});

/**
 * A one-sentence hint above its trigger, on hover and on keyboard focus; Esc hides it
 * (WCAG 1.4.13). The trigger gets aria-describedby. Never the only label.
 */
export function Tooltip({ content, children, className, style }: { content: ReactNode; children: ReactElement<{ 'aria-describedby'?: string }>;
  /** Extra classes on the wrap, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style on the wrap, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  const id = useId();
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const shown = (hover || focus) && !dismissed;
  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setDismissed(false); }}
      onFocus={() => setFocus(true)}
      onBlur={() => { setFocus(false); setDismissed(false); }}
      onKeyDown={(e) => { if (e.key === 'Escape') setDismissed(true); }}
      {...mergeRootProps(stylex.props(tip.wrap), { className, style })}
    >
      {cloneElement(children, { 'aria-describedby': id })}
      <span role="tooltip" id={id} {...stylex.props(tip.tip, shown && tip.shown)}>{content}</span>
    </span>
  );
}

const inverse = {
  maxWidth: '16rem',
  paddingBlock: space.xs,
  paddingInline: space.sm,
  backgroundColor: color.canvasText,
  color: color.canvas,
  fontFamily: font.sans,
  fontSize: '0.875rem',
  lineHeight: 1.4,
} as const;

const tip = stylex.create({
  wrap: { position: 'relative', display: 'inline-block' },
  tip: {
    ...inverse,
    position: 'absolute',
    insetBlockEnd: `calc(100% + ${space.xs})`,
    insetInlineStart: 0,
    zIndex: 10,
    width: 'max-content',
    visibility: 'hidden',
    borderWidth: { default: 0, '@media (forced-colors: active)': 1 },
    borderStyle: 'solid',
    borderColor: 'CanvasText',
  },
  shown: { visibility: 'visible' },
});

/**
 * A hint built on popover="hint" + interestfor: shown on hover or focus where
 * interest invokers exist (Chromium), toggled by click everywhere else.
 */
export function HintPopover({ label, hint, className, style }: { /** Accessible name of the "?" trigger. */ label: string; hint: ReactNode;
  /** Extra classes, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  const id = useId();
  return (
    <>
      <button type="button" popoverTarget={id} aria-label={label} {...{ interestfor: id }}
        {...mergeRootProps(stylex.props(buttonStyles.button, buttonStyles.square, hintStyles.trigger), { className, style })}>
        ?
      </button>
      <div popover={'hint' as 'auto'} id={id} {...stylex.props(hintStyles.hint)}>{hint}</div>
    </>
  );
}

const hintStyles = stylex.create({
  // A small square beside the label it explains: 24px, the minimum target size.
  trigger: { width: 24, height: 24 },
  hint: {
    ...inverse,
    positionArea: 'block-start',
    positionTryFallbacks: 'flip-block',
    margin: space.xs,
    borderWidth: { default: 0, '@media (forced-colors: active)': 1 },
    borderStyle: 'solid',
    borderColor: 'CanvasText',
  },
});

/**
 * A brief confirmation in the corner, in the top layer, announced politely and
 * never focused. Without an `action` it hides after `duration` ms (at least 6s),
 * paused while hovered or focused.
 */
export function Toast({
  open,
  onDismiss,
  action,
  duration = 6000,
  children,
  className,
  style,
}: {
  open: boolean;
  onDismiss: () => void;
  /** One action, such as Undo. A toast with an action stays until dismissed. */
  action?: { label: string; onClick: () => void };
  duration?: number;
  children: ReactNode;
  /** Extra classes, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const t = ref.current;
    if (!t) return;
    try {
      if (open) t.showPopover();
      else t.hidePopover();
    } catch {
      /* already in that state */
    }
    if (!open || action) return;
    const timer = setInterval(() => {
      if (!t.matches(':hover, :focus-within')) onDismiss();
    }, Math.max(duration, 6000));
    return () => clearInterval(timer);
  }, [open, action, duration, onDismiss]);
  return (
    <div ref={ref} popover="manual" role="status" {...mergeRootProps(stylex.props(toast.toast), { className, style })}>
      <span>{children}</span>
      {action ? <button type="button" onClick={action.onClick} {...stylex.props(buttonStyles.button, toast.button)}>{action.label}</button> : null}
      <button type="button" aria-label="Dismiss" onClick={onDismiss} {...stylex.props(buttonStyles.button, buttonStyles.square, toast.button)}>×</button>
    </div>
  );
}

const toast = stylex.create({
  toast: {
    inset: `auto ${space.md} calc(${space.md} + env(safe-area-inset-bottom, 0px)) auto`,
    margin: 0,
    display: { default: 'none', ':popover-open': 'flex' },
    alignItems: 'center',
    gap: space.md,
    maxWidth: `min(24rem, calc(100% - 2 * ${space.md}))`,
    paddingBlock: space.sm,
    paddingInline: space.md,
    backgroundColor: color.canvasText,
    color: color.canvas,
    borderWidth: shape.borderWidth,
    borderStyle: 'solid',
    borderColor: { default: color.canvasText, '@media (forced-colors: active)': 'CanvasText' },
    fontFamily: font.sans,
  },
  button: { backgroundColor: color.canvas, color: color.canvasText },
});
