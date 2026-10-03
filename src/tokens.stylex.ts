// Generated from tokens.json by scripts/build-tokens.mjs. Do not edit.
// Every value is a var() reference to src/styles/tokens.css, so themes switch
// at runtime (data-theme or the device setting) without re-rendering.
import * as stylex from '@stylexjs/stylex';

/** System colours, used by role. */
export const color = stylex.defineConsts({
  /** Page background; the CSS system color Canvas. Every text token below is checked against it. */
  "canvas": "var(--canvas)",
  /** Body copy and headings on `canvas`. 21:1 light, 18.7:1 dark. */
  "canvasText": "var(--canvas-text)",
  /** The faintest tint, for light grouping (a soft card). Everything on canvas keeps its contrast here: gray-text 4.87:1 light, 7.59:1 dark; control-border 4.28:1, 6.06:1. */
  "surfaceSoft": "var(--surface-soft)",
  /** A quieter panel for secondary content: muted and filled cards, recessed wells, separated bands. The darkest light tint that keeps gray-text at 4.5:1 (4.62:1; dark 6.74:1); control-border 4.06:1, 5.38:1. */
  "surfaceMuted": "var(--surface-muted)",
  /** A panel set on a tinted surface (the body of a muted card): white in light, one step lighter in dark. gray-text 5.17:1 light, 5.88:1 dark; control-border 4.54:1, 4.69:1. */
  "surfaceRaised": "var(--surface-raised)",
  /** Unvisited links on `canvas`, always underlined. 9.4:1 light, 7.8:1 dark. The browser's LinkText, unchanged. */
  "link": "var(--link)",
  /** Visited links on `canvas`. 11:1 light, 9.7:1 dark. The browser's VisitedText, unchanged. */
  "linkVisited": "var(--link-visited)",
  /** A link while it is being pressed, on `canvas`. 4.53:1 light (passes AA by a hair; never use it for resting text), 9.5:1 dark. */
  "linkActive": "var(--link-active)",
  /** Button fill. Dark is darkened from Chromium's #6b6b6b so white labels reach 6.9:1. */
  "buttonFace": "var(--button-face)",
  /** Button labels on `button-face`. 18.3:1 light, 6.9:1 dark. */
  "buttonText": "var(--button-text)",
  /** Fill of text inputs, textareas and selects. */
  "field": "var(--field)",
  /** Typed text on `field`. 21:1 light, 11.2:1 dark. */
  "fieldText": "var(--field-text)",
  /** 1px border of buttons, fields, selects and fieldsets. At least 3:1 against `canvas`, `field` and `button-face` in both themes (light 4.5:1 on canvas, 3.95:1 on button-face; dark 6.7:1 on canvas, 4:1 on field). */
  "controlBorder": "var(--control-border)",
  /** Placeholder text on `field`. 5.2:1 light, 5:1 dark. Replaces opacity-faded placeholders that drop under 4.5:1. */
  "placeholder": "var(--placeholder)",
  /** Disabled labels and secondary notes on `canvas`. 5.2:1 light, 8.4:1 dark: disabled text stays readable; the dashed border says it is disabled. */
  "grayText": "var(--gray-text)",
  /** accent-color for checkboxes, radios, range, progress and the switch track. A non-text mark, but kept at text strength: 5.3:1 on white (light), 10.8:1 on dark canvas. Deepened from Chromium's #0075ff (4.2:1). */
  "accent": "var(--accent)",
  /** The 2px solid :focus-visible outline, offset 2px onto `canvas`. 6:1 light, 10.8:1 dark; also 5.2:1 on light `button-face`. */
  "focusRing": "var(--focus-ring)",
  /** <mark> highlight fill, the same yellow in both themes. */
  "mark": "var(--mark)",
  /** Text on `mark`, black in both themes (19.6:1). Never let <mark> inherit white dark-theme text. */
  "markText": "var(--mark-text)",
  /** ::selection background. */
  "highlight": "var(--highlight)",
  /** Selected text on `highlight`, links included. 13.9:1 light, 8.5:1 dark. */
  "highlightText": "var(--highlight-text)",
  /** <hr> and table cell borders. Same as `control-border`, so dividers stay visible at 3:1+. */
  "rule": "var(--rule)",
});

/** Font stacks. All local; nothing to load. */
export const font = stylex.defineConsts({
  "serif": "var(--font-serif)",
  "sans": "var(--font-sans)",
  "mono": "var(--font-mono)",
});

/** Spacing steps. */
export const space = stylex.defineConsts({
  /** Focus-ring offset; legend side padding. */
  "xxs": "var(--space-2xs)",
  /** Vertical padding in buttons, fields and table cells. */
  "xs": "var(--space-xs)",
  /** Body margin (the browser's own 8px); horizontal padding in buttons and table cells. */
  "sm": "var(--space-sm)",
  /** Default gap in .pd-stack and between panels; panel padding. */
  "md": "var(--space-md)",
  /** Minimum target size for any control (WCAG 2.5.8). */
  "lg": "var(--space-lg)",
  /** List indent and blockquote side margin, as the browser sets them. */
  "indent": "var(--space-indent)",
});

/** Corner radii. Controls only. */
export const radius = stylex.defineConsts({
  /** Everything that is not a control: tables, fieldsets, images, mark. */
  "none": "var(--radius-none)",
  /** Buttons, text fields, selects: the slight rounding browsers draw. */
  "control": "var(--radius-control)",
  /** Radio buttons only. */
  "round": "var(--radius-round)",
});
