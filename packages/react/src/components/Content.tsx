'use client';

import * as stylex from '@stylexjs/stylex';
import { useEffect, useId, useState } from 'react';
import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';
import { color, font, shape, space } from '@imsus/normal-ui-css/tokens.stylex';
import { buttonStyles } from './Button';
import { mergeRootProps, shared } from './shared';

export type Slide = { title: ReactNode; body: ReactNode };

/**
 * The APG basic carousel. It never rotates on its own: rotation starts only from the
 * Start button. While the pointer or keyboard focus is on a slide or on Previous/Next,
 * rotation pauses (WCAG 2.2.2); the Start/Stop button itself does not pause it, so
 * starting is visible at once. A status line says which slide is showing and whether
 * it is rotating. Consider a plain list first.
 */
export function Carousel({ label, slides, interval = 5000, className, style }: { label: string; slides: Slide[]; interval?: number;
  /** Extra classes, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  const [i, setI] = useState(0);
  const [want, setWant] = useState(false);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const paused = hover || focus;
  const rotating = want && !paused;
  useEffect(() => {
    if (!rotating) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), interval);
    return () => clearInterval(t);
  }, [rotating, interval, slides.length]);
  const show = (n: number) => setI((n + slides.length) % slides.length);
  // Pointer or focus on the slides or on Previous/Next pauses rotation.
  const pauseZone = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
  };
  const state = !want ? 'Rotation off' : paused ? 'Paused while you look at it' : `Rotating every ${interval / 1000} seconds`;
  return (
    <section aria-roledescription="carousel" aria-label={label} {...mergeRootProps(stylex.props(carousel.box), { className, style })}>
      <div {...stylex.props(carousel.controls)}>
        <button type="button" onClick={() => setWant(!want)} {...stylex.props(buttonStyles.button)}>
          {want ? 'Stop slide rotation' : 'Start slide rotation'}
        </button>
        <span {...pauseZone} {...stylex.props(carousel.nav)}>
          <button type="button" aria-label="Previous slide" onClick={() => show(i - 1)}
            {...stylex.props(buttonStyles.button, buttonStyles.square)}>‹</button>
          <button type="button" aria-label="Next slide" onClick={() => show(i + 1)}
            {...stylex.props(buttonStyles.button, buttonStyles.square)}>›</button>
        </span>
        <small {...stylex.props(carousel.status)}>
          Slide {i + 1} of {slides.length} · {state}
        </small>
      </div>
      <div aria-live={rotating ? 'off' : 'polite'} {...pauseZone}>
        {slides.map((s, k) => (
          <div key={k} role="group" aria-roledescription="slide" aria-label={`${k + 1} of ${slides.length}`} hidden={k !== i}
            {...stylex.props(carousel.slide)}>
            <h3 {...stylex.props(carousel.title)}>{s.title}</h3>
            <p {...stylex.props(carousel.body)}>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const carousel = stylex.create({
  box: { borderWidth: shape.borderWidth, borderStyle: 'solid', borderColor: color.controlBorder },
  controls: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: space.xs,
    alignItems: 'center',
    padding: space.xs,
    borderBlockEndWidth: shape.borderWidth,
    borderBlockEndStyle: 'solid',
    borderBlockEndColor: color.rule,
  },
  nav: { display: 'flex', flexWrap: 'wrap', gap: space.xs },
  status: { color: color.grayText, marginInlineStart: 'auto' },
  slide: { padding: space.md },
  title: { marginBlockStart: 0 },
  body: { marginBlockEnd: 0 },
});

/**
 * A CSS-only carousel: a scrolling, snapping list. Where ::scroll-button and
 * ::scroll-marker exist (Chromium), the browser adds Previous/Next and numbered
 * markers. Nothing moves on its own.
 */
export function ScrollCarousel({ label, items, className, style }: { label: string; items: Slide[];
  /** Extra classes, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  const id = useId();
  return (
    <section aria-labelledby={id} {...mergeRootProps(stylex.props(scroller.section), { className, style })}>
      <h2 id={id} {...stylex.props(scroller.heading)}>{label}</h2>
      <ul aria-labelledby={id} {...stylex.props(scroller.list)}>
        {items.map((s, k) => (
          <li key={k} {...stylex.props(scroller.item)}>
            <h3 {...stylex.props(scroller.itemTitle)}>{s.title}</h3>
            <p {...stylex.props(scroller.itemBody)}>{s.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const markers = '@supports selector(::scroll-marker)';
const scrollButton = {
  position: 'absolute',
  positionAnchor: '--pd-scroller',
  positionArea: 'block-start span-inline-start',
  marginBlockEnd: space.sm,
  // Square, like a square <Button>, at 40px: the arrow centred in it.
  width: `calc(${shape.targetMin} + ${space.md})`,
  height: `calc(${shape.targetMin} + ${space.md})`,
  padding: 0,
  display: 'grid',
  placeItems: 'center',
  borderWidth: shape.borderWidth,
  borderStyle: 'solid',
  borderColor: color.controlBorder,
  backgroundColor: color.buttonFace,
  color: color.buttonText,
  fontFamily: font.sans,
  fontSize: '1.25rem',
  lineHeight: 1,
  cursor: 'pointer',
} as const;

const scroller = stylex.create({
  section: {
    position: 'relative',
    // Chromium places the ::scroll-marker-group row after the list without counting its
    // height, so reserve it (24px markers + their 8px gap) inside this box; otherwise a
    // container with overflow clips the markers.
    paddingBlockEnd: { default: null, [markers]: `calc(${shape.targetMin} + ${space.sm})` },
  },
  heading: { fontSize: '1.17em', margin: 0 },
  list: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'min(80%, 18rem)',
    gap: space.md,
    overflowX: 'auto',
    overscrollBehaviorX: 'contain',
    scrollSnapType: 'x mandatory',
    listStyle: 'none',
    margin: 0,
    padding: `0 0 ${space.sm}`,
    counterReset: 'pd-slide',
    anchorName: { default: null, [markers]: '--pd-scroller' },
    scrollMarkerGroup: { default: null, [markers]: 'after' },
    marginBlockStart: { default: null, [markers]: `calc(${space.lg} * 2)` },
    scrollbarWidth: { default: null, [markers]: 'none' },
    '::scroll-button(inline-start)': { ...scrollButton, content: '"‹" / "Previous"', translate: `calc(-100% - ${space.xs}) 0` },
    '::scroll-button(inline-end)': { ...scrollButton, content: '"›" / "Next"' },
    '::scroll-marker-group': { display: 'flex', gap: space.xs, justifyContent: 'center', marginBlockStart: space.sm },
  },
  item: {
    scrollSnapAlign: 'start',
    borderWidth: shape.borderWidth,
    borderStyle: 'solid',
    borderColor: color.controlBorder,
    padding: space.md,
    counterIncrement: 'pd-slide',
    '::scroll-marker': {
      content: 'counter(pd-slide)',
      display: 'inline-grid',
      placeItems: 'center',
      width: space.lg,
      height: space.lg,
      borderWidth: shape.borderWidth,
      borderStyle: 'solid',
      borderColor: color.controlBorder,
      fontFamily: font.sans,
      fontSize: '0.8125rem',
      color: color.canvasText,
      textDecoration: 'none',
    },
  },
  itemTitle: { margin: 0, fontSize: '1.05rem' },
  itemBody: { margin: '4px 0 0' },
});

export type FeedArticle = { id: string; title: ReactNode; body: ReactNode };

/**
 * A list of articles that grows as people read (role="feed"). Page Down/Up move
 * between articles; set `busy` while loading. Always offer Load more too, never
 * infinite scroll alone.
 */
export function Feed({
  label,
  articles,
  busy = false,
  total = -1,
  onLoadMore,
  loadMoreLabel = 'Load more',
  className,
  style,
}: {
  label: ReactNode;
  articles: FeedArticle[];
  busy?: boolean;
  /** -1 when unknown. */
  total?: number;
  onLoadMore?: () => void;
  loadMoreLabel?: string;
  /** Extra classes, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  const id = useId();
  const onKeyDown = (e: KeyboardEvent) => {
    const a = (e.target as Element).closest('article');
    if (!a) return;
    const next = e.key === 'PageDown' ? a.nextElementSibling : e.key === 'PageUp' ? a.previousElementSibling : null;
    if (next instanceof HTMLElement) {
      next.focus();
      e.preventDefault();
    }
  };
  return (
    <div {...mergeRootProps(undefined, { className, style })}>
      <h2 id={id} {...stylex.props(feed.heading)}>{label}</h2>
      <p {...stylex.props(shared.muted, feed.hint)}><small>In the list, Page Down and Page Up move between items.</small></p>
      <div role="feed" aria-labelledby={id} aria-busy={busy} onKeyDown={onKeyDown}>
        {articles.map((a, k) => (
          <article key={a.id} tabIndex={0} aria-posinset={k + 1} aria-setsize={total} aria-labelledby={`${id}-${a.id}-h`}
            aria-describedby={`${id}-${a.id}-b`} {...stylex.props(feed.article)}>
            <h3 id={`${id}-${a.id}-h`} {...stylex.props(feed.title)}>{a.title}</h3>
            <p id={`${id}-${a.id}-b`} {...stylex.props(feed.body)}>{a.body}</p>
          </article>
        ))}
      </div>
      {onLoadMore ? (
        <p><button type="button" onClick={onLoadMore} {...stylex.props(buttonStyles.button)}>{loadMoreLabel}</button></p>
      ) : null}
    </div>
  );
}

const feed = stylex.create({
  heading: { fontSize: '1.17em', marginBlockStart: 0 },
  hint: { marginBlockStart: 0 },
  article: {
    borderBlockStartWidth: shape.borderWidth,
    borderBlockStartStyle: 'solid',
    borderBlockStartColor: color.rule,
    paddingBlock: space.sm,
    outline: { default: null, ':focus': `${shape.focusWidth} solid ${color.focusRing}` },
    outlineOffset: shape.focusOffset,
  },
  title: { margin: 0, fontSize: '1rem' },
  body: { margin: '4px 0 0' },
});

/** A suggested replacement, named in hidden text since ARIA 1.3 support varies. */
export function Suggestion({ remove, insert, className, style }: { remove?: ReactNode; insert?: ReactNode;
  /** Extra classes, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  return (
    <span role="suggestion" {...mergeRootProps(undefined, { className, style })}>
      {remove ? (
        <del {...stylex.props(review.del)}><span {...stylex.props(shared.visuallyHidden)}>Suggested deletion: </span>{remove}</del>
      ) : null}
      {insert ? (
        <ins {...stylex.props(review.ins)}><span {...stylex.props(shared.visuallyHidden)}>Suggested insertion: </span>{insert}</ins>
      ) : null}
    </span>
  );
}

/** Text a comment is about. `commentId` points at the <Comment>. */
export function Commented({ commentId, children, className, style }: { commentId: string; children: ReactNode;
  /** Extra classes on the mark. */
  className?: string;
  /** Inline style on the mark. */
  style?: CSSProperties;
}) {
  return <mark role="mark" aria-details={commentId} className={className} style={style}>{children}</mark>;
}

/** A review comment, labelled with its author. */
export function Comment({ id, author, time, children, className, style }: { id: string; author: string; time: { iso: string; label: string }; children: ReactNode;
  /** Extra classes, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  return (
    <div role="comment" id={id} aria-label={`Comment by ${author}`} {...mergeRootProps(stylex.props(review.comment), { className, style })}>
      <p {...stylex.props(review.meta)}><b>{author}</b> · <time dateTime={time.iso}>{time.label}</time></p>
      <p {...stylex.props(review.text)}>{children}</p>
    </div>
  );
}

const review = stylex.create({
  del: { textDecorationLine: 'line-through', textDecorationThickness: 2, color: color.grayText },
  ins: {
    textDecorationLine: 'underline',
    textDecorationThickness: 2,
    backgroundColor: { default: color.highlight, '@media (forced-colors: active)': 'Mark' },
    color: { default: color.highlightText, '@media (forced-colors: active)': 'MarkText' },
  },
  comment: {
    borderWidth: shape.borderWidth,
    borderStyle: 'solid',
    borderColor: color.controlBorder,
    paddingBlock: space.xs,
    paddingInline: space.sm,
    fontFamily: font.sans,
    fontSize: '0.875rem',
    lineHeight: 1.4,
    marginBlockEnd: space.md,
  },
  meta: { margin: 0 },
  text: { margin: '2px 0 0' },
});
