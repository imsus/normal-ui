import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import type { ReactNode } from 'react';
import { color, radius, space } from '../tokens.stylex';
import { shared } from './shared';

/*
 * Loading at every level. Status is always said in words first; the spinner, the
 * skeleton and the progress bar are second cues. Motion stops for people who ask for
 * less of it (base.css switches animation off under prefers-reduced-motion).
 */

const spin = stylex.keyframes({ to: { rotate: '1turn' } });
const pulse = stylex.keyframes({ '50%': { opacity: 0.5 } });

/**
 * A small ring in currentColor, 1em, so it matches the text beside it. Decorative:
 * always put the words ("Saving…") next to it.
 */
export function Spinner({ xstyle }: { xstyle?: StyleXStyles }) {
  return <span aria-hidden="true" {...stylex.props(styles.spinner, xstyle)} />;
}

/**
 * Placeholder shapes for content that is on its way, on surface-muted. Hidden from
 * screen readers: wrap them in <Loading>, which announces the loading in words.
 * `text` draws `lines` lines (the last one shorter), `block` a box, `circle` an avatar.
 */
export function Skeleton({
  shape = 'text',
  lines = 1,
  width,
  height,
}: {
  shape?: 'text' | 'block' | 'circle';
  lines?: number;
  /** Any CSS length. Text defaults to the full width; block and circle to 3rem. */
  width?: string;
  height?: string;
}) {
  if (shape === 'text') {
    return (
      <span aria-hidden="true" {...stylex.props(styles.lines)}>
        {Array.from({ length: lines }, (_, i) => (
          <span key={i} {...stylex.props(styles.bone, styles.line, styles.size(
            i === lines - 1 && lines > 1 ? '60%' : (width ?? '100%'), height ?? '1em'))} />
        ))}
      </span>
    );
  }
  const w = width ?? '3rem';
  return (
    <span aria-hidden="true"
      {...stylex.props(styles.bone, styles.size(w, height ?? w), shape === 'circle' && styles.circle)} />
  );
}

/**
 * A region that may be loading. While `busy`, it is aria-busy, announces `label`
 * politely, and shows `placeholder` (a Skeleton shaped like the content) or, by
 * default, the label with an indeterminate progress bar. Once done it shows its
 * children. `size="page"` centres the default placeholder in a tall area for a
 * whole-page load.
 */
export function Loading({
  busy,
  label,
  placeholder,
  size = 'region',
  children,
  xstyle,
}: {
  busy: boolean;
  /** What is loading, in words: "Loading orders…". */
  label: string;
  /** Shown while busy instead of the default label and progress bar. */
  placeholder?: ReactNode;
  size?: 'region' | 'page';
  children?: ReactNode;
  xstyle?: StyleXStyles;
}) {
  return (
    <div aria-busy={busy} {...stylex.props(styles.region, xstyle)}>
      {/* Exists from the first render, so the first message is not missed. */}
      <span role="status" {...stylex.props(shared.visuallyHidden)}>{busy ? label : ''}</span>
      {!busy ? (
        children
      ) : placeholder ? (
        placeholder
      ) : (
        <div aria-hidden="true" {...stylex.props(styles.fallback, size === 'page' && styles.page)}>
          <p {...stylex.props(styles.label)}>{label}</p>
          <progress {...stylex.props(styles.progress)} />
        </div>
      )}
    </div>
  );
}

const styles = stylex.create({
  spinner: {
    display: 'inline-block',
    flex: 'none',
    width: '1em',
    height: '1em',
    verticalAlign: '-0.15em',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'currentColor',
    // A gap in the ring shows the motion; it stays a ring when motion is off.
    borderInlineEndColor: 'transparent',
    borderRadius: '50%',
    animationName: spin,
    animationDuration: '0.8s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
  lines: { display: 'grid', gap: '0.5em', width: '100%' },
  bone: {
    display: 'block',
    backgroundColor: color.surfaceMuted,
    borderRadius: radius.control,
    animationName: pulse,
    animationDuration: '1.6s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  },
  line: { maxWidth: '100%' },
  size: (width: string, height: string) => ({ width, height }),
  circle: { borderRadius: '50%' },
  region: { minWidth: 0 },
  fallback: { display: 'grid', gap: space.sm, maxWidth: '24rem' },
  page: { minHeight: '50vh', alignContent: 'center', justifyItems: 'center', maxWidth: 'none', textAlign: 'center' },
  label: { margin: 0 },
  progress: { width: '100%' },
});
