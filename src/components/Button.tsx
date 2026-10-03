import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import type { ButtonHTMLAttributes, Ref } from 'react';
import { color, font, radius, space } from '../tokens.stylex';
import { buttonGroupItem, useInButtonGroup } from './ButtonGroup';
import { Spinner } from './Loading';

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'> & {
  /** Makes it a toggle button: sets aria-pressed and inverts when pressed. */
  pressed?: boolean;
  /**
   * The action is under way. The label becomes `loadingText` with a spinner, clicks
   * are ignored, and the button is aria-disabled, not disabled, so it keeps keyboard
   * focus and screen readers hear the new label.
   */
  loading?: boolean;
  /** The label while loading, in words: "Saving…". Defaults to the normal label. */
  loadingText?: string;
  /**
   * Square: as wide as it is tall, with the glyph centred. For a button whose label
   * is one character or icon (×, ‹, B). Give it an accessible name in words
   * (aria-label, or visually hidden text). Same height as every other button; for a
   * bigger target set width and height in `xstyle` (Spinbutton uses 44px), or
   * `--pd-square` in CSS.
   */
  square?: boolean;
  xstyle?: StyleXStyles;
  ref?: Ref<HTMLButtonElement>;
};

/**
 * The native button. One style for every button: no primary or danger variants;
 * order and wording carry the emphasis. `type` defaults to "button".
 */
export function Button({ type = 'button', pressed, loading = false, loadingText, square = false, xstyle, children, onClick, ...rest }: ButtonProps) {
  // Inside a ButtonGroup, join the neighbouring buttons.
  const grouped = useInButtonGroup();
  return (
    <button
      type={type}
      aria-pressed={pressed}
      aria-disabled={loading || rest['aria-disabled'] || undefined}
      {...rest}
      // While loading, swallow clicks (and form submission) without losing focus.
      onClick={loading ? (e) => e.preventDefault() : onClick}
      {...stylex.props(
        styles.button,
        square && styles.square,
        pressed && styles.pressed,
        loading && styles.loading,
        grouped && buttonGroupItem.item,
        grouped && pressed && buttonGroupItem.raised,
        xstyle,
      )}
    >
      {loading ? (
        <>
          <Spinner xstyle={styles.spinner} />
          {loadingText ?? children}
        </>
      ) : (
        children
      )}
    </button>
  );
}

const squareSize = `var(--pd-square, calc(1.25rem + 2 * ${space.xs} + 2px))`;

export const buttonStyles = stylex.create({
  /** The button look, for elements that are not <Button>. */
  button: {
    minHeight: space.lg,
    minWidth: space.lg,
    paddingBlock: space.xs,
    paddingInline: space.sm,
    // Disabled: transparent, so it takes the colour of the surface it sits on.
    backgroundColor: { default: color.buttonFace, ':disabled': 'transparent' },
    color: { default: color.buttonText, ':disabled': color.grayText },
    borderWidth: 1,
    borderStyle: { default: 'solid', ':disabled': 'dashed' },
    borderColor: {
      default: color.controlBorder,
      ':hover:not(:disabled)': color.canvasText,
      '@media (prefers-contrast: more)': color.canvasText,
      '@media (forced-colors: active)': 'CanvasText',
    },
    borderRadius: radius.control,
    fontFamily: font.sans,
    fontSize: '1rem',
    lineHeight: 1.25,
    cursor: { default: null, ':disabled': 'not-allowed' },
  },
  /**
   * One glyph, centred in a square the height of a normal button: 1.25rem of line,
   * space-xs above and below, and the 1px border. `--pd-square` (in CSS) changes the size.
   */
  square: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: squareSize,
    height: squareSize,
    paddingBlock: 0,
    paddingInline: 0,
  },
  // Working, not unavailable: keep the normal look, show the busy cursor.
  loading: { cursor: 'progress' },
  spinner: { marginInlineEnd: space.xs },
  pressed: {
    backgroundColor: { default: color.canvasText, '@media (forced-colors: active)': 'Highlight' },
    color: { default: color.canvas, '@media (forced-colors: active)': 'HighlightText' },
    borderColor: { default: color.canvasText, '@media (forced-colors: active)': 'Highlight' },
    forcedColorAdjust: 'none',
  },
});
const styles = buttonStyles;
