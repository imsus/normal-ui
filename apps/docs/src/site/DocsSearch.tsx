import * as stylex from '@stylexjs/stylex';
import { buttonStyles } from '@imsus/normal-ui-react/components/Button';
import { color, space } from '@imsus/normal-ui-css/tokens.stylex';

/**
 * The docs' page finder trigger: a button in the top bar. Server-rendered only, so
 * pages ship no React for it. The script in Docs.astro loads the palette
 * (searchPalette.tsx) the first time the button is used or Ctrl+K (Cmd+K on a Mac)
 * is pressed, and warms it up on hover or focus.
 */
export function DocsSearch() {
  return (
    <button type="button" id="docs-search" aria-haspopup="dialog" aria-keyshortcuts="Control+K Meta+K"
      {...stylex.props(buttonStyles.button, s.trigger)}>
      Search docs
      {/* The shortcut is in aria-keyshortcuts; the keycaps are for the eye. Ctrl is
          switched to ⌘ on Apple platforms by the script. */}
      <span aria-hidden="true" {...stylex.props(s.keys)}><kbd data-mod>Ctrl</kbd><kbd>K</kbd></span>
    </button>
  );
}

const s = stylex.create({
  trigger: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.md,
    whiteSpace: 'nowrap',
    minWidth: { default: '14rem', '@media (max-width: 800px)': 0 },
    color: color.grayText,
  },
  keys: { display: { default: 'inline-flex', '@media (max-width: 800px)': 'none' }, gap: 2, fontSize: '0.8125rem' },
});
