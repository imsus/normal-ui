// Generated from tokens.json by scripts/build-tokens.mjs. Do not edit.
// Every value is a var() reference to src/styles/tokens.css, so themes switch
// at runtime (data-color-scheme, data-theme or the device setting) without re-rendering.
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
  /** Border of buttons. Same as `control-border` in Normal UI; a theme whose buttons are a solid fill may set it to `button-face`, as long as the face itself holds 3:1 against `canvas`. */
  "buttonBorder": "var(--button-border)",
  /** Button fill under the pointer. Same as `button-face` in Normal UI, where hover only darkens the border. */
  "buttonFaceHover": "var(--button-face-hover)",
  /** Button border under the pointer: full-strength text colour. */
  "buttonBorderHover": "var(--button-border-hover)",
  /** Dashed border of a disabled button. Same as `button-border`; a theme whose buttons have no border gives it one here so the button still has an edge. */
  "buttonBorderDisabled": "var(--button-border-disabled)",
  /** Colour of the solid edge under a button (`button-edge-width` tall). None in Normal UI. */
  "buttonEdge": "var(--button-edge)",
  /** Fill of a toggle button that is on (aria-pressed): inverted. */
  "buttonPressedFace": "var(--button-pressed-face)",
  /** Label of a toggle button that is on, on `button-pressed-face`. */
  "buttonPressedText": "var(--button-pressed-text)",
  /** Fill of the one button a form leads with (`variant="primary"`). Normal UI draws every variant the same: order and wording carry the emphasis. A theme may set it apart. */
  "buttonPrimaryFace": "var(--button-primary-face)",
  /** Label on `button-primary-face`. */
  "buttonPrimaryText": "var(--button-primary-text)",
  /** Border of a primary button. */
  "buttonPrimaryBorder": "var(--button-primary-border)",
  /** Primary button fill under the pointer. */
  "buttonPrimaryFaceHover": "var(--button-primary-face-hover)",
  /** Edge under a primary button. */
  "buttonPrimaryEdge": "var(--button-primary-edge)",
  /** Fill of a button that destroys or cannot be undone (`variant="warning"`). Identical to a plain button in Normal UI; the label says what it does. */
  "buttonWarningFace": "var(--button-warning-face)",
  /** Label on `button-warning-face`. */
  "buttonWarningText": "var(--button-warning-text)",
  /** Border of a warning button. */
  "buttonWarningBorder": "var(--button-warning-border)",
  /** Warning button fill under the pointer. */
  "buttonWarningFaceHover": "var(--button-warning-face-hover)",
  /** Edge under a warning button. */
  "buttonWarningEdge": "var(--button-warning-edge)",
  /** Placeholder text on `field`. 5.2:1 light, 5:1 dark. Replaces opacity-faded placeholders that drop under 4.5:1. */
  "placeholder": "var(--placeholder)",
  /** Disabled labels and secondary notes on `canvas`. 5.2:1 light, 8.4:1 dark: disabled text stays readable; the dashed border says it is disabled. */
  "grayText": "var(--gray-text)",
  /** accent-color for checkboxes, radios, range, progress and the switch track. A non-text mark, but kept at text strength: 5.3:1 on white (light), 10.8:1 on dark canvas. Deepened from Chromium's #0075ff (4.2:1). */
  "accent": "var(--accent)",
  /** The 2px solid :focus-visible outline, offset 2px onto `canvas`. 6:1 light, 10.8:1 dark; also 5.2:1 on light `button-face`. */
  "focusRing": "var(--focus-ring)",
  /** A second ring drawn just inside a focused field or list item, for themes whose `focus-ring` is light (a yellow ring needs a dark inset to hold 3:1 on white). None in Normal UI. */
  "focusInset": "var(--focus-inset)",
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
  /** Border and lead word of error messages and invalid fields. Text colour in Normal UI: the words say it is an error, never colour alone. A theme may give it a hue at 4.5:1. */
  "statusError": "var(--status-error)",
  /** Border and lead word of warnings. */
  "statusWarning": "var(--status-warning)",
  /** Border and lead word of success messages. */
  "statusSuccess": "var(--status-success)",
  /** Border and lead word of notes. */
  "statusInfo": "var(--status-info)",
  /** Behind a `.pd-sheet` page. Same as `canvas` in Normal UI, so a sheet is just the page. */
  "page": "var(--page)",
  /** Fill of a `.pd-masthead` band. Same as `canvas` in Normal UI; a theme may make it a brand colour. */
  "masthead": "var(--masthead)",
  /** Text and links on `masthead`. */
  "mastheadText": "var(--masthead-text)",
});

/** Font stacks. All local unless a theme loads its own. */
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

/** Borders, targets, button edges and the focus ring: the shape a theme can change. */
export const shape = stylex.defineConsts({
  /** Structural borders: cards, panels, popups, menus, tabs, separators. */
  "borderWidth": "var(--border-width)",
  /** Border width of buttons, text fields, selects and textareas. A theme may thicken it; it never goes below 1px. */
  "controlBorderWidth": "var(--control-border-width)",
  /** Minimum height and width of any control (WCAG 2.5.8). Rows in menus and lists add to it. */
  "targetMin": "var(--target-min)",
  /** Space above and below a button label. */
  "buttonPaddingBlock": "var(--button-padding-block)",
  /** Space either side of a button label. */
  "buttonPaddingInline": "var(--button-padding-inline)",
  /** Height of the solid edge under a button (`button-edge`). 0 in Normal UI. */
  "buttonEdgeWidth": "var(--button-edge-width)",
  /** Any further shadow on a button at rest, e.g. a bevel. Nothing in Normal UI. Must be a shadow list, not `none`. */
  "buttonShadow": "var(--button-shadow)",
  /** The whole button shadow while pressed (:active); replaces the edge and `button-shadow`. */
  "buttonShadowActive": "var(--button-shadow-active)",
  /** How far a button moves down (and right, for a bevel) while pressed. */
  "buttonPressOffset": "var(--button-press-offset)",
  /** Width of the :focus-visible outline. Never below 2px (WCAG 2.4.11 / 2.4.13). */
  "focusWidth": "var(--focus-width)",
  /** Gap between an element and its focus outline. */
  "focusOffset": "var(--focus-offset)",
  /** Checkbox and radio size: up from the browser's 13px. */
  "choiceSize": "var(--choice-size)",
  /** Shadow under a `.pd-sheet`. None in Normal UI. */
  "sheetShadow": "var(--sheet-shadow)",
});

/** Type sizes, weights and treatments a theme can change. */
export const text = stylex.defineConsts({
  /** Text in buttons, inputs, selects, textareas: grows with the reader's text size. */
  "controlFontSize": "var(--control-font-size)",
  /** Line height inside controls. */
  "controlLineHeight": "var(--control-line-height)",
  /** Running text: the 24px rhythm line at 16px. */
  "lineHeightBody": "var(--line-height-body)",
  /** Every heading. */
  "headingWeight": "var(--heading-weight)",
  /** h1 in content. */
  "heading1": "var(--heading-1)",
  /** h2 in content. */
  "heading2": "var(--heading-2)",
  /** h3 in content. */
  "heading3": "var(--heading-3)",
  /** h4 in content. */
  "heading4": "var(--heading-4)",
  /** h5 in content. */
  "heading5": "var(--heading-5)",
  /** h6 in content, set apart by uppercase. */
  "heading6": "var(--heading-6)",
  /** h1 inside `.pd-app`. */
  "appHeading1": "var(--app-heading-1)",
  /** h2 inside `.pd-app`. */
  "appHeading2": "var(--app-heading-2)",
  /** h3 inside `.pd-app`. */
  "appHeading3": "var(--app-heading-3)",
  /** h4 inside `.pd-app`. */
  "appHeading4": "var(--app-heading-4)",
  /** h5 and h6 inside `.pd-app`. */
  "appHeading5": "var(--app-heading-5)",
  /** Floor for <small> and other fine print: 0.83em, never under this, whatever the root size. */
  "smallMin": "var(--small-min)",
  /** Weight of a field's error message. Normal in Normal UI; the words and the doubled field border carry it. */
  "errorWeight": "var(--error-weight)",
  /** Small label above a group (nav sections, card kickers). */
  "eyebrowSize": "var(--eyebrow-size)",
  /** Eyebrow weight. */
  "eyebrowWeight": "var(--eyebrow-weight)",
  /** Eyebrow case. */
  "eyebrowTransform": "var(--eyebrow-transform)",
  /** Eyebrow letter-spacing. */
  "eyebrowTracking": "var(--eyebrow-tracking)",
  /** Links inside <nav>. Underlined in Normal UI. A theme may set `none`: a link in a navigation list is identified by where it sits (1.4.1); links in running text always stay underlined. */
  "navLinkDecoration": "var(--nav-link-decoration)",
});
