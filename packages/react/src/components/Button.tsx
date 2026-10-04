import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import type { ButtonHTMLAttributes, Ref } from 'react';
import { color, font, radius, shape, space, text } from '@imsus/normal-ui-css/tokens.stylex';
import { buttonGroupItem, useInButtonGroup } from './ButtonGroup';
import { Spinner } from './Loading';

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'> & {
  /** Makes it a toggle button: sets aria-pressed and inverts when pressed. */
  pressed?: boolean;
  /**
   * The button's intent. `primary`: the one action a form or page leads with.
   * `warning`: an action that destroys data or cannot be undone. Normal UI draws every
   * variant the same (order and wording carry the emphasis); themes may set them apart.
   * Rendered as `data-variant`, so plain-HTML buttons use the same attribute.
   */
  variant?: 'primary' | 'warning';
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
 * The native button. In Normal UI one look for every button, whatever its `variant`:
 * order and wording carry the emphasis. `type` defaults to "button".
 */
export function Button({ type = 'button', pressed, variant, loading = false, loadingText, square = false, xstyle, children, onClick, ...rest }: ButtonProps) {
  // Inside a ButtonGroup, join the neighbouring buttons.
  const grouped = useInButtonGroup();
  return (
    <button
      type={type}
      aria-pressed={pressed}
      data-variant={variant}
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

const squareSize = `var(--pd-square, calc(1.25rem + 2 * ${shape.buttonPaddingBlock} + 2 * ${shape.controlBorderWidth}))`;

export const buttonStyles = stylex.create({
  /** The button look, for elements that are not <Button>. */
  button: {
    minHeight: shape.targetMin,
    minWidth: shape.targetMin,
    paddingBlock: shape.buttonPaddingBlock,
    paddingInline: shape.buttonPaddingInline,
    // Disabled: transparent, so it takes the colour of the surface it sits on.
    backgroundColor: { default: color.buttonFace, ':hover:not(:disabled)': color.buttonFaceHover, ':disabled': 'transparent' },
    color: { default: color.buttonText, ':disabled': color.grayText },
    borderWidth: shape.controlBorderWidth,
    borderStyle: { default: 'solid', ':disabled': 'dashed' },
    borderColor: {
      default: color.buttonBorder,
      ':hover:not(:disabled)': color.buttonBorderHover,
      ':disabled': color.buttonBorderDisabled,
      '@media (prefers-contrast: more)': color.canvasText,
      '@media (forced-colors: active)': 'CanvasText',
    },
    borderRadius: radius.control,
    // Nothing in Normal UI; a theme's solid bottom edge and bevel.
    boxShadow: {
      default: `0 ${shape.buttonEdgeWidth} 0 ${color.buttonEdge}, ${shape.buttonShadow}`,
      ':active:not(:disabled)': shape.buttonShadowActive,
      ':disabled': 'none',
    },
    translate: { default: null, ':active:not(:disabled)': `0 ${shape.buttonPressOffset}` },
    fontFamily: font.sans,
    fontSize: text.controlFontSize,
    lineHeight: text.controlLineHeight,
    cursor: { default: null, ':disabled': 'not-allowed' },
  },
  /**
   * One glyph, centred in a square the height of a normal button: 1.25rem of line,
   * space-xs above and below, and the border. `--pd-square` (in CSS) changes the size.
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
    backgroundColor: { default: color.buttonPressedFace, '@media (forced-colors: active)': 'Highlight' },
    color: { default: color.buttonPressedText, '@media (forced-colors: active)': 'HighlightText' },
    borderColor: { default: color.buttonPressedFace, '@media (forced-colors: active)': 'Highlight' },
    boxShadow: shape.buttonShadowActive,
    forcedColorAdjust: 'none',
  },
});
const styles = buttonStyles;
