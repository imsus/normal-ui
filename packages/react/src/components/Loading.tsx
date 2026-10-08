import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import type { CSSProperties, ReactNode } from 'react';
import { color, radius, space } from '@imsus/normal-ui-css/tokens.stylex';
import { mergeRootProps, shared } from './shared';

/*
 * Loading at every level. Status is always said in words first; the spinner, the
 * skeleton and the progress bar are second cues. The spin runs only inside
 * prefers-reduced-motion: no-preference; the pulse is an opacity fade, so it
 * may run anywhere.
 */

const spin = stylex.keyframes({ to: { rotate: '1turn' } });
const pulse = stylex.keyframes({ '50%': { opacity: 0.5 } });

/**
 * A small ring in currentColor, 1em, so it matches the text beside it. Decorative:
 * always put the words ("Saving…") next to it.
 */
export function Spinner({ xstyle, className, style }: { xstyle?: StyleXStyles;
  /** Extra classes on the wrap, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style on the wrap, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  return <span aria-hidden="true" {...mergeRootProps(stylex.props(styles.spinner, xstyle), { className, style })} />;
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
  className,
  style,
}: {
  shape?: 'text' | 'block' | 'circle';
  lines?: number;
  /** Any CSS length. Text defaults to the full width; block and circle to 3rem. */
  width?: string;
  height?: string;
  /** Extra classes on the wrap, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style on the wrap, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  if (shape === 'text') {
    return (
      <span aria-hidden="true" {...mergeRootProps(stylex.props(styles.lines), { className, style })}>
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
      {...mergeRootProps(stylex.props(styles.bone, styles.size(w, height ?? w), shape === 'circle' && styles.circle), { className, style })} />
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
  className,
  style,
}: {
  busy: boolean;
  /** What is loading, in words: "Loading orders…". */
  label: string;
  /** Shown while busy instead of the default label and progress bar. */
  placeholder?: ReactNode;
  size?: 'region' | 'page';
  children?: ReactNode;
  xstyle?: StyleXStyles;
  /** Extra classes on the wrap, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style on the wrap, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  return (
    <div aria-busy={busy} {...mergeRootProps(stylex.props(xstyle), { className, style })}>
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
    // No name outside no-preference, so the ring stays static; the durations
    // below are inert without one.
    animationName: { default: null, '@media (prefers-reduced-motion: no-preference)': spin },
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
  fallback: { display: 'grid', gap: space.sm, maxWidth: '24rem' },
  page: { minHeight: '50vh', alignContent: 'center', justifyItems: 'center', maxWidth: 'none', textAlign: 'center' },
  label: { margin: 0 },
  progress: { width: '100%' },
});
