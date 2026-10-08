// Generated from themes/<id>/tokens.json by scripts/build-tokens.mjs. Do not edit.
export type ThemeColor = { name: string; added: boolean; usage: string; values: Record<string, string> };
export type ThemeLength = { name: string; value: string; added: boolean; usage: string };
export type Theme = { id: string; name: string; description: string; inspiration?: string; modes: string[]; notes: string[];
  colors: ThemeColor[]; families: Record<string, string>; fonts: string[]; rootSize?: string; lengths: ThemeLength[];
  waived: { mode: string; fg: string; bg: string; min: number; ratio: number; waived: string }[] };
export const themes: Theme[] = [
  {
    "id": "govuk",
    "name": "GOV.UK",
    "description": "Public-service clarity: 19px Arial, grey buttons with a solid bottom edge, green for the action a page leads with, red for destructive ones, 2px black field borders, square corners, the blue header band and the yellow-and-black focus state. Light only, like GOV.UK.",
    "inspiration": "https://design-system.service.gov.uk/",
    "modes": [
      "light"
    ],
    "notes": [
      "Light only: GOV.UK has no dark mode, so this theme stays light whatever the device or data-color-scheme says.",
      "Text is 16px on screens up to 640px and 19px above (root 100% / 118.75%).",
      "Arial stands in for GDS Transport, which is licensed for GOV.UK services only; never add it to type.fonts. No crown, no logotype.",
      "Focus is a 3px yellow outline with a black inset on fields and list items, so it holds 3:1 on white; focused links take the yellow fill with a black bar.",
      "Secondary buttons are light grey on white: their edge is the 2px grey bottom shadow, as on GOV.UK, not a 3:1 border.",
      "Table and section rules use the lighter GOV.UK border grey, below 3:1 (waived below). Fields keep full-strength borders."
    ],
    "colors": [
      {
        "name": "canvas",
        "added": false,
        "usage": "Page background; the CSS system color Canvas. Every text token below is checked against it.",
        "values": {
          "light": "oklch(100% 0 none)"
        }
      },
      {
        "name": "canvas-text",
        "added": false,
        "usage": "Body copy and headings on `canvas`. 21:1 light, 18.7:1 dark.",
        "values": {
          "light": "oklch(15.32% 0.002 197)"
        }
      },
      {
        "name": "surface-soft",
        "added": false,
        "usage": "The faintest tint, for light grouping (a soft card). Everything on canvas keeps its contrast here: gray-text 4.87:1 light, 7.59:1 dark; control-border 4.28:1, 6.06:1.",
        "values": {
          "light": "oklch(97.7% 0.006 239.8)"
        }
      },
      {
        "name": "surface-muted",
        "added": false,
        "usage": "A quieter panel for secondary content: muted and filled cards, recessed wells, separated bands. The darkest light tint that keeps gray-text at 4.5:1 (4.62:1; dark 6.74:1); control-border 4.06:1, 5.38:1.",
        "values": {
          "light": "oklch(96.16% 0.002 67.8)"
        }
      },
      {
        "name": "surface-raised",
        "added": false,
        "usage": "A panel set on a tinted surface (the body of a muted card): white in light, one step lighter in dark. gray-text 5.17:1 light, 5.88:1 dark; control-border 4.54:1, 4.69:1.",
        "values": {
          "light": "oklch(100% 0 none)"
        }
      },
      {
        "name": "link",
        "added": false,
        "usage": "Unvisited links on `canvas`, always underlined. 9.4:1 light, 7.8:1 dark. The browser's LinkText, unchanged.",
        "values": {
          "light": "oklch(49.672% 0.1254 249.8)"
        }
      },
      {
        "name": "link-visited",
        "added": false,
        "usage": "Visited links on `canvas`. 11:1 light, 9.7:1 dark. The browser's VisitedText, unchanged.",
        "values": {
          "light": "oklch(42.21% 0.168 292.3)"
        }
      },
      {
        "name": "link-active",
        "added": false,
        "usage": "A link while it is being pressed, on `canvas`. 4.53:1 light (passes AA by a hair; never use it for resting text), 9.5:1 dark.",
        "values": {
          "light": "oklch(15.32% 0.002 197)"
        }
      },
      {
        "name": "button-face",
        "added": false,
        "usage": "Button fill. Dark is darkened from Chromium's #6b6b6b so white labels reach 6.9:1.",
        "values": {
          "light": "oklch(96.16% 0.002 67.8)"
        }
      },
      {
        "name": "button-text",
        "added": false,
        "usage": "Button labels on `button-face`. 18.3:1 light, 6.9:1 dark.",
        "values": {
          "light": "oklch(15.32% 0.002 197)"
        }
      },
      {
        "name": "button-border",
        "added": false,
        "usage": "Border of buttons. Same as `control-border` in Normal UI; a theme whose buttons are a solid fill may set it to `button-face`, as long as the face itself holds 3:1 against `canvas`.",
        "values": {
          "light": "transparent"
        }
      },
      {
        "name": "button-border-hover",
        "added": false,
        "usage": "Button border under the pointer: full-strength text colour.",
        "values": {
          "light": "transparent"
        }
      },
      {
        "name": "button-border-disabled",
        "added": false,
        "usage": "Dashed border of a disabled button. Same as `button-border`; a theme whose buttons have no border gives it one here so the button still has an edge.",
        "values": {
          "light": "oklch(76.81% 0.004 236.5)"
        }
      },
      {
        "name": "button-face-hover",
        "added": false,
        "usage": "Button fill under the pointer. Same as `button-face` in Normal UI, where hover only darkens the border.",
        "values": {
          "light": "oklch(88.89% 0.002 67.8)"
        }
      },
      {
        "name": "button-edge",
        "added": false,
        "usage": "Colour of the solid edge under a button (`button-edge-width` tall). None in Normal UI.",
        "values": {
          "light": "oklch(61.92% 0.001 197.1)"
        }
      },
      {
        "name": "button-primary-face",
        "added": false,
        "usage": "Fill of the one button a form leads with (`variant=\"primary\"`). Normal UI draws every variant the same: order and wording carry the emphasis. A theme may set it apart.",
        "values": {
          "light": "oklch(51.37% 0.11 161)"
        }
      },
      {
        "name": "button-primary-text",
        "added": false,
        "usage": "Label on `button-primary-face`.",
        "values": {
          "light": "oklch(100% 0 none)"
        }
      },
      {
        "name": "button-primary-face-hover",
        "added": false,
        "usage": "Primary button fill under the pointer.",
        "values": {
          "light": "oklch(42.151% 0.0884 161.7)"
        }
      },
      {
        "name": "button-primary-edge",
        "added": false,
        "usage": "Edge under a primary button.",
        "values": {
          "light": "oklch(26.16% 0.062 157.4)"
        }
      },
      {
        "name": "button-warning-face",
        "added": false,
        "usage": "Fill of a button that destroys or cannot be undone (`variant=\"warning\"`). Identical to a plain button in Normal UI; the label says what it does.",
        "values": {
          "light": "oklch(55.79% 0.186 25.6)"
        }
      },
      {
        "name": "button-warning-text",
        "added": false,
        "usage": "Label on `button-warning-face`.",
        "values": {
          "light": "oklch(100% 0 none)"
        }
      },
      {
        "name": "button-warning-face-hover",
        "added": false,
        "usage": "Warning button fill under the pointer.",
        "values": {
          "light": "oklch(47.52% 0.157 25.5)"
        }
      },
      {
        "name": "button-warning-edge",
        "added": false,
        "usage": "Edge under a warning button.",
        "values": {
          "light": "oklch(30.32% 0.096 31.7)"
        }
      },
      {
        "name": "field",
        "added": false,
        "usage": "Fill of text inputs, textareas and selects.",
        "values": {
          "light": "oklch(100% 0 none)"
        }
      },
      {
        "name": "field-text",
        "added": false,
        "usage": "Typed text on `field`. 21:1 light, 11.2:1 dark.",
        "values": {
          "light": "oklch(15.32% 0.002 197)"
        }
      },
      {
        "name": "control-border",
        "added": false,
        "usage": "1px border of buttons, fields, selects and fieldsets. At least 3:1 against `canvas`, `field` and `button-face` in both themes (light 4.5:1 on canvas, 3.95:1 on button-face; dark 6.7:1 on canvas, 4:1 on field).",
        "values": {
          "light": "oklch(15.32% 0.002 197)"
        }
      },
      {
        "name": "placeholder",
        "added": false,
        "usage": "Placeholder text on `field`. 5.2:1 light, 5:1 dark. Replaces opacity-faded placeholders that drop under 4.5:1.",
        "values": {
          "light": "oklch(46.4% 0 none)"
        }
      },
      {
        "name": "gray-text",
        "added": false,
        "usage": "Disabled labels and secondary notes on `canvas`. 5.2:1 light, 8.4:1 dark: disabled text stays readable; the dashed border says it is disabled.",
        "values": {
          "light": "oklch(40.45% 0.001 197.1)"
        }
      },
      {
        "name": "accent",
        "added": false,
        "usage": "accent-color for checkboxes, radios, range, progress and the switch track. A non-text mark, but kept at text strength: 5.3:1 on white (light), 10.8:1 on dark canvas. Deepened from Chromium's #0075ff (4.2:1).",
        "values": {
          "light": "oklch(15.32% 0.002 197)"
        }
      },
      {
        "name": "focus-ring",
        "added": false,
        "usage": "The 2px solid :focus-visible outline, offset 2px onto `canvas`. 6:1 light, 10.8:1 dark; also 5.2:1 on light `button-face`.",
        "values": {
          "light": "oklch(89.869% 0.1857 97.9)"
        }
      },
      {
        "name": "focus-inset",
        "added": false,
        "usage": "A second ring drawn just inside a focused field or list item, for themes whose `focus-ring` is light (a yellow ring needs a dark inset to hold 3:1 on white). None in Normal UI.",
        "values": {
          "light": "oklch(15.32% 0.002 197)"
        }
      },
      {
        "name": "mark",
        "added": false,
        "usage": "<mark> highlight fill, the same yellow in both themes.",
        "values": {
          "light": "oklch(89.869% 0.1857 97.9)"
        }
      },
      {
        "name": "mark-text",
        "added": false,
        "usage": "Text on `mark`, black in both themes (19.6:1). Never let <mark> inherit white dark-theme text.",
        "values": {
          "light": "oklch(15.32% 0.002 197)"
        }
      },
      {
        "name": "rule",
        "added": false,
        "usage": "<hr> and table cell borders. Same as `control-border`, so dividers stay visible at 3:1+.",
        "values": {
          "light": "oklch(76.81% 0.004 236.5)"
        }
      },
      {
        "name": "status-error",
        "added": false,
        "usage": "Border and lead word of error messages and invalid fields. Text colour in Normal UI: the words say it is an error, never colour alone. A theme may give it a hue at 4.5:1.",
        "values": {
          "light": "oklch(55.79% 0.186 25.6)"
        }
      },
      {
        "name": "status-success",
        "added": false,
        "usage": "Border and lead word of success messages.",
        "values": {
          "light": "oklch(51.37% 0.11 161)"
        }
      },
      {
        "name": "status-info",
        "added": false,
        "usage": "Border and lead word of notes.",
        "values": {
          "light": "oklch(53.47% 0.136 249.9)"
        }
      },
      {
        "name": "masthead",
        "added": false,
        "usage": "Fill of a `.pd-masthead` band. Same as `canvas` in Normal UI; a theme may make it a brand colour.",
        "values": {
          "light": "oklch(53.47% 0.136 249.9)"
        }
      },
      {
        "name": "masthead-text",
        "added": false,
        "usage": "Text and links on `masthead`.",
        "values": {
          "light": "oklch(100% 0 none)"
        }
      },
      {
        "name": "link-hover",
        "added": true,
        "usage": "A link under the pointer, with a 3px underline.",
        "values": {
          "light": "oklch(33.28% 0.078 249.1)"
        }
      }
    ],
    "families": {
      "sans": "Arial, Helvetica, sans-serif"
    },
    "fonts": [],
    "rootSize": "100%, 118.75% from 40.0625em",
    "lengths": [
      {
        "name": "space-xs",
        "value": "5px",
        "added": false,
        "usage": ""
      },
      {
        "name": "space-sm",
        "value": "10px",
        "added": false,
        "usage": ""
      },
      {
        "name": "space-md",
        "value": "20px",
        "added": false,
        "usage": ""
      },
      {
        "name": "space-lg",
        "value": "30px",
        "added": false,
        "usage": ""
      },
      {
        "name": "space-indent",
        "value": "20px",
        "added": false,
        "usage": ""
      },
      {
        "name": "radius-control",
        "value": "0",
        "added": false,
        "usage": ""
      },
      {
        "name": "control-border-width",
        "value": "2px",
        "added": false,
        "usage": ""
      },
      {
        "name": "button-padding-block",
        "value": "8px",
        "added": false,
        "usage": ""
      },
      {
        "name": "button-padding-inline",
        "value": "10px",
        "added": false,
        "usage": ""
      },
      {
        "name": "button-edge-width",
        "value": "2px",
        "added": false,
        "usage": ""
      },
      {
        "name": "button-press-offset",
        "value": "2px",
        "added": false,
        "usage": ""
      },
      {
        "name": "focus-width",
        "value": "3px",
        "added": false,
        "usage": ""
      },
      {
        "name": "focus-offset",
        "value": "0px",
        "added": false,
        "usage": ""
      },
      {
        "name": "choice-size",
        "value": "2.105rem",
        "added": false,
        "usage": ""
      },
      {
        "name": "heading-1",
        "value": "2.5rem",
        "added": false,
        "usage": ""
      },
      {
        "name": "heading-2",
        "value": "1.875rem",
        "added": false,
        "usage": ""
      },
      {
        "name": "heading-3",
        "value": "1.25rem",
        "added": false,
        "usage": ""
      },
      {
        "name": "heading-4",
        "value": "1rem",
        "added": false,
        "usage": ""
      },
      {
        "name": "heading-5",
        "value": "1rem",
        "added": false,
        "usage": ""
      },
      {
        "name": "heading-6",
        "value": "1rem",
        "added": false,
        "usage": ""
      },
      {
        "name": "app-heading-1",
        "value": "1.875rem",
        "added": false,
        "usage": ""
      },
      {
        "name": "app-heading-2",
        "value": "1.25rem",
        "added": false,
        "usage": ""
      },
      {
        "name": "error-weight",
        "value": "700",
        "added": false,
        "usage": ""
      }
    ],
    "waived": [
      {
        "mode": "light",
        "fg": "rule",
        "bg": "canvas",
        "min": 3,
        "ratio": 2.08,
        "waived": "Table rows and section rules are decorative; content is separated by spacing as well. Control borders stay at full strength."
      }
    ]
  },
  {
    "id": "mcmaster",
    "name": "McMaster-Carr",
    "description": "A dense industrial catalog: 10.5pt Arial, mostly greyscale, quiet underlines, hairline table rules, a yellow row highlight, and catalog green for the masthead and the leading action.",
    "inspiration": "https://www.mcmaster.com/",
    "modes": [
      "light",
      "dark"
    ],
    "notes": [
      "Text is set at 14px (10.5pt, root 87.5%), the catalog's density. It stays in rem, so zoom and text-size settings still work; <small> stops at the 13px floor.",
      "Link underlines in running text are drawn at 35% strength until hover. They are still there, so links are never marked by colour alone (1.4.1). Links in <nav> lists have none.",
      "Table rules are hairlines below 3:1. They separate rows for the eye; no information depends on seeing them (waived below)."
    ],
    "colors": [
      {
        "name": "canvas",
        "added": false,
        "usage": "Page background; the CSS system color Canvas. Every text token below is checked against it.",
        "values": {
          "light": "oklch(100% 0 none)",
          "dark": "oklch(19.57% 0 none)"
        }
      },
      {
        "name": "canvas-text",
        "added": false,
        "usage": "Body copy and headings on `canvas`. 21:1 light, 18.7:1 dark.",
        "values": {
          "light": "oklch(0% 0 none)",
          "dark": "oklch(94.31% 0 none)"
        }
      },
      {
        "name": "surface-soft",
        "added": false,
        "usage": "The faintest tint, for light grouping (a soft card). Everything on canvas keeps its contrast here: gray-text 4.87:1 light, 7.59:1 dark; control-border 4.28:1, 6.06:1.",
        "values": {
          "light": "oklch(97.61% 0 none)",
          "dark": "oklch(22.64% 0 none)"
        }
      },
      {
        "name": "surface-muted",
        "added": false,
        "usage": "A quieter panel for secondary content: muted and filled cards, recessed wells, separated bands. The darkest light tint that keeps gray-text at 4.5:1 (4.62:1; dark 6.74:1); control-border 4.06:1, 5.38:1.",
        "values": {
          "light": "oklch(94.91% 0 none)",
          "dark": "oklch(26.03% 0 none)"
        }
      },
      {
        "name": "surface-raised",
        "added": false,
        "usage": "A panel set on a tinted surface (the body of a muted card): white in light, one step lighter in dark. gray-text 5.17:1 light, 5.88:1 dark; control-border 4.54:1, 4.69:1.",
        "values": {
          "light": "oklch(100% 0 none)",
          "dark": "oklch(28.5% 0 none)"
        }
      },
      {
        "name": "link",
        "added": false,
        "usage": "Unvisited links on `canvas`, always underlined. 9.4:1 light, 7.8:1 dark. The browser's LinkText, unchanged.",
        "values": {
          "light": "oklch(40.922% 0.1065 250.2)",
          "dark": "oklch(76.88% 0.084 251.1)"
        }
      },
      {
        "name": "link-visited",
        "added": false,
        "usage": "Visited links on `canvas`. 11:1 light, 9.7:1 dark. The browser's VisitedText, unchanged.",
        "values": {
          "light": "oklch(42.88% 0.132 299.4)",
          "dark": "oklch(77.82% 0.096 303)"
        }
      },
      {
        "name": "link-active",
        "added": false,
        "usage": "A link while it is being pressed, on `canvas`. 4.53:1 light (passes AA by a hair; never use it for resting text), 9.5:1 dark.",
        "values": {
          "light": "oklch(47.55% 0.195 29.2)",
          "dark": "oklch(79.78% 0.116 20)"
        }
      },
      {
        "name": "button-face",
        "added": false,
        "usage": "Button fill. Dark is darkened from Chromium's #6b6b6b so white labels reach 6.9:1.",
        "values": {
          "light": "oklch(96.12% 0 none)",
          "dark": "oklch(32.9% 0 none)"
        }
      },
      {
        "name": "button-face-hover",
        "added": false,
        "usage": "Button fill under the pointer. Same as `button-face` in Normal UI, where hover only darkens the border.",
        "values": {
          "light": "oklch(92.49% 0 none)",
          "dark": "oklch(37.15% 0 none)"
        }
      },
      {
        "name": "button-primary-face",
        "added": false,
        "usage": "Fill of the one button a form leads with (`variant=\"primary\"`). Normal UI draws every variant the same: order and wording carry the emphasis. A theme may set it apart.",
        "values": {
          "light": "oklch(52.38% 0.134 144)",
          "dark": "oklch(52.38% 0.134 144)"
        }
      },
      {
        "name": "button-primary-text",
        "added": false,
        "usage": "Label on `button-primary-face`.",
        "values": {
          "light": "oklch(100% 0 none)",
          "dark": "oklch(100% 0 none)"
        }
      },
      {
        "name": "button-primary-border",
        "added": false,
        "usage": "Border of a primary button.",
        "values": {
          "light": "oklch(42.9% 0.107 144.3)",
          "dark": "oklch(78.39% 0.132 145.3)"
        }
      },
      {
        "name": "button-primary-face-hover",
        "added": false,
        "usage": "Primary button fill under the pointer.",
        "values": {
          "light": "oklch(46.88% 0.12 144.1)",
          "dark": "oklch(46.88% 0.12 144.1)"
        }
      },
      {
        "name": "field",
        "added": false,
        "usage": "Fill of text inputs, textareas and selects.",
        "values": {
          "light": "oklch(100% 0 none)",
          "dark": "oklch(23.93% 0 none)"
        }
      },
      {
        "name": "field-text",
        "added": false,
        "usage": "Typed text on `field`. 21:1 light, 11.2:1 dark.",
        "values": {
          "light": "oklch(0% 0 none)",
          "dark": "oklch(94.31% 0 none)"
        }
      },
      {
        "name": "control-border",
        "added": false,
        "usage": "1px border of buttons, fields, selects and fieldsets. At least 3:1 against `canvas`, `field` and `button-face` in both themes (light 4.5:1 on canvas, 3.95:1 on button-face; dark 6.7:1 on canvas, 4:1 on field).",
        "values": {
          "light": "oklch(57.95% 0 none)",
          "dark": "oklch(64.01% 0 none)"
        }
      },
      {
        "name": "placeholder",
        "added": false,
        "usage": "Placeholder text on `field`. 5.2:1 light, 5:1 dark. Replaces opacity-faded placeholders that drop under 4.5:1.",
        "values": {
          "light": "oklch(48.55% 0 none)",
          "dark": "oklch(72.52% 0 none)"
        }
      },
      {
        "name": "gray-text",
        "added": false,
        "usage": "Disabled labels and secondary notes on `canvas`. 5.2:1 light, 8.4:1 dark: disabled text stays readable; the dashed border says it is disabled.",
        "values": {
          "light": "oklch(48.55% 0 none)",
          "dark": "oklch(72.52% 0 none)"
        }
      },
      {
        "name": "accent",
        "added": false,
        "usage": "accent-color for checkboxes, radios, range, progress and the switch track. A non-text mark, but kept at text strength: 5.3:1 on white (light), 10.8:1 on dark canvas. Deepened from Chromium's #0075ff (4.2:1).",
        "values": {
          "light": "oklch(52.38% 0.134 144)",
          "dark": "oklch(78.39% 0.132 145.3)"
        }
      },
      {
        "name": "focus-ring",
        "added": false,
        "usage": "The 2px solid :focus-visible outline, offset 2px onto `canvas`. 6:1 light, 10.8:1 dark; also 5.2:1 on light `button-face`.",
        "values": {
          "light": "oklch(40.922% 0.1065 250.2)",
          "dark": "oklch(76.88% 0.084 251.1)"
        }
      },
      {
        "name": "mark",
        "added": false,
        "usage": "<mark> highlight fill, the same yellow in both themes.",
        "values": {
          "light": "oklch(95.47% 0.094 99.4)",
          "dark": "oklch(95.47% 0.094 99.4)"
        }
      },
      {
        "name": "highlight",
        "added": false,
        "usage": "::selection background.",
        "values": {
          "light": "oklch(95.47% 0.094 99.4)",
          "dark": "oklch(38.12% 0.053 98.3)"
        }
      },
      {
        "name": "highlight-text",
        "added": false,
        "usage": "Selected text on `highlight`, links included. 13.9:1 light, 8.5:1 dark.",
        "values": {
          "light": "oklch(0% 0 none)",
          "dark": "oklch(100% 0 none)"
        }
      },
      {
        "name": "rule",
        "added": false,
        "usage": "<hr> and table cell borders. Same as `control-border`, so dividers stay visible at 3:1+.",
        "values": {
          "light": "oklch(84.52% 0 none)",
          "dark": "oklch(36% 0 none)"
        }
      },
      {
        "name": "status-error",
        "added": false,
        "usage": "Border and lead word of error messages and invalid fields. Text colour in Normal UI: the words say it is an error, never colour alone. A theme may give it a hue at 4.5:1.",
        "values": {
          "light": "oklch(47.55% 0.195 29.2)",
          "dark": "oklch(79.78% 0.116 20)"
        }
      },
      {
        "name": "status-success",
        "added": false,
        "usage": "Border and lead word of success messages.",
        "values": {
          "light": "oklch(52.38% 0.134 144)",
          "dark": "oklch(78.39% 0.132 145.3)"
        }
      },
      {
        "name": "masthead",
        "added": false,
        "usage": "Fill of a `.pd-masthead` band. Same as `canvas` in Normal UI; a theme may make it a brand colour.",
        "values": {
          "light": "oklch(52.38% 0.134 144)",
          "dark": "oklch(39.41% 0.097 144.1)"
        }
      },
      {
        "name": "masthead-text",
        "added": false,
        "usage": "Text and links on `masthead`.",
        "values": {
          "light": "oklch(100% 0 none)",
          "dark": "oklch(100% 0 none)"
        }
      }
    ],
    "families": {
      "sans": "Arial, \"Helvetica Neue\", Helvetica, sans-serif"
    },
    "fonts": [],
    "rootSize": "87.5%",
    "lengths": [
      {
        "name": "radius-control",
        "value": "3px",
        "added": false,
        "usage": ""
      },
      {
        "name": "heading-1",
        "value": "1.5rem",
        "added": false,
        "usage": ""
      },
      {
        "name": "heading-2",
        "value": "1.25rem",
        "added": false,
        "usage": ""
      },
      {
        "name": "heading-3",
        "value": "1.05rem",
        "added": false,
        "usage": ""
      },
      {
        "name": "app-heading-1",
        "value": "1.3rem",
        "added": false,
        "usage": ""
      },
      {
        "name": "app-heading-2",
        "value": "1.1rem",
        "added": false,
        "usage": ""
      },
      {
        "name": "nav-link-decoration",
        "value": "none",
        "added": false,
        "usage": ""
      }
    ],
    "waived": [
      {
        "mode": "light",
        "fg": "rule",
        "bg": "canvas",
        "min": 3,
        "ratio": 1.61,
        "waived": "Hairline row rules are decorative: rows are also separated by spacing and the hover highlight."
      },
      {
        "mode": "dark",
        "fg": "rule",
        "bg": "canvas",
        "min": 3,
        "ratio": 1.68,
        "waived": "Hairline row rules are decorative: rows are also separated by spacing and the hover highlight."
      }
    ]
  },
  {
    "id": "usgraphics",
    "name": "US Graphics",
    "description": "Engineering graphics: a technical-manual page. Neo-grotesque text set small and dense, black links, square bevelled buttons that press in, dotted section rules, a white sheet on a grey desk, and signal yellow for the leading action.",
    "inspiration": "https://usgraphics.com/",
    "modes": [
      "light",
      "dark"
    ],
    "notes": [
      "Text is set at 14px (root 87.5%) for density. It stays in rem, so zoom and text-size settings still work; <small> stops at the 13px floor.",
      "Links are black, like the reference. In running text the underline stays, so colour never marks a link on its own (1.4.1); in <nav> lists it is dropped, as the reference does.",
      "Univers and Berkeley Mono are commercial: they are used if installed, and nothing is downloaded. To ship them, add the licensed files under themes/usgraphics/fonts and list them in type.fonts."
    ],
    "colors": [
      {
        "name": "canvas",
        "added": false,
        "usage": "Page background; the CSS system color Canvas. Every text token below is checked against it.",
        "values": {
          "light": "oklch(100% 0 none)",
          "dark": "oklch(20.02% 0 none)"
        }
      },
      {
        "name": "canvas-text",
        "added": false,
        "usage": "Body copy and headings on `canvas`. 21:1 light, 18.7:1 dark.",
        "values": {
          "light": "oklch(0% 0 none)",
          "dark": "oklch(96.12% 0 none)"
        }
      },
      {
        "name": "surface-soft",
        "added": false,
        "usage": "The faintest tint, for light grouping (a soft card). Everything on canvas keeps its contrast here: gray-text 4.87:1 light, 7.59:1 dark; control-border 4.28:1, 6.06:1.",
        "values": {
          "light": "oklch(97.61% 0 none)",
          "dark": "oklch(23.5% 0 none)"
        }
      },
      {
        "name": "surface-muted",
        "added": false,
        "usage": "A quieter panel for secondary content: muted and filled cards, recessed wells, separated bands. The darkest light tint that keeps gray-text at 4.5:1 (4.62:1; dark 6.74:1); control-border 4.06:1, 5.38:1.",
        "values": {
          "light": "oklch(95.21% 0 none)",
          "dark": "oklch(26.86% 0 none)"
        }
      },
      {
        "name": "surface-raised",
        "added": false,
        "usage": "A panel set on a tinted surface (the body of a muted card): white in light, one step lighter in dark. gray-text 5.17:1 light, 5.88:1 dark; control-border 4.54:1, 4.69:1.",
        "values": {
          "light": "oklch(100% 0 none)",
          "dark": "oklch(29.31% 0 none)"
        }
      },
      {
        "name": "link",
        "added": false,
        "usage": "Unvisited links on `canvas`, always underlined. 9.4:1 light, 7.8:1 dark. The browser's LinkText, unchanged.",
        "values": {
          "light": "oklch(0% 0 none)",
          "dark": "oklch(96.12% 0 none)"
        }
      },
      {
        "name": "link-visited",
        "added": false,
        "usage": "Visited links on `canvas`. 11:1 light, 9.7:1 dark. The browser's VisitedText, unchanged.",
        "values": {
          "light": "oklch(40.91% 0 none)",
          "dark": "oklch(82.03% 0 none)"
        }
      },
      {
        "name": "link-active",
        "added": false,
        "usage": "A link while it is being pressed, on `canvas`. 4.53:1 light (passes AA by a hair; never use it for resting text), 9.5:1 dark.",
        "values": {
          "light": "oklch(47.55% 0.195 29.2)",
          "dark": "oklch(79.78% 0.116 20)"
        }
      },
      {
        "name": "button-face",
        "added": false,
        "usage": "Button fill. Dark is darkened from Chromium's #6b6b6b so white labels reach 6.9:1.",
        "values": {
          "light": "oklch(95.51% 0 none)",
          "dark": "oklch(34.85% 0 none)"
        }
      },
      {
        "name": "button-face-hover",
        "added": false,
        "usage": "Button fill under the pointer. Same as `button-face` in Normal UI, where hover only darkens the border.",
        "values": {
          "light": "oklch(91.89% 0 none)",
          "dark": "oklch(39.04% 0 none)"
        }
      },
      {
        "name": "button-primary-face",
        "added": false,
        "usage": "Fill of the one button a form leads with (`variant=\"primary\"`). Normal UI draws every variant the same: order and wording carry the emphasis. A theme may set it apart.",
        "values": {
          "light": "oklch(83.721% 0.1664 88.4)",
          "dark": "oklch(83.721% 0.1664 88.4)"
        }
      },
      {
        "name": "button-primary-text",
        "added": false,
        "usage": "Label on `button-primary-face`.",
        "values": {
          "light": "oklch(0% 0 none)",
          "dark": "oklch(0% 0 none)"
        }
      },
      {
        "name": "button-primary-face-hover",
        "added": false,
        "usage": "Primary button fill under the pointer.",
        "values": {
          "light": "oklch(78.913% 0.1615 86)",
          "dark": "oklch(78.913% 0.1615 86)"
        }
      },
      {
        "name": "control-border",
        "added": false,
        "usage": "1px border of buttons, fields, selects and fieldsets. At least 3:1 against `canvas`, `field` and `button-face` in both themes (light 4.5:1 on canvas, 3.95:1 on button-face; dark 6.7:1 on canvas, 4:1 on field).",
        "values": {
          "light": "oklch(53.82% 0 none)",
          "dark": "oklch(65% 0 none)"
        }
      },
      {
        "name": "placeholder",
        "added": false,
        "usage": "Placeholder text on `field`. 5.2:1 light, 5:1 dark. Replaces opacity-faded placeholders that drop under 4.5:1.",
        "values": {
          "light": "oklch(51.03% 0 none)",
          "dark": "oklch(73.16% 0 none)"
        }
      },
      {
        "name": "gray-text",
        "added": false,
        "usage": "Disabled labels and secondary notes on `canvas`. 5.2:1 light, 8.4:1 dark: disabled text stays readable; the dashed border says it is disabled.",
        "values": {
          "light": "oklch(51.03% 0 none)",
          "dark": "oklch(73.16% 0 none)"
        }
      },
      {
        "name": "accent",
        "added": false,
        "usage": "accent-color for checkboxes, radios, range, progress and the switch track. A non-text mark, but kept at text strength: 5.3:1 on white (light), 10.8:1 on dark canvas. Deepened from Chromium's #0075ff (4.2:1).",
        "values": {
          "light": "oklch(38.74% 0.15 266.4)",
          "dark": "oklch(78.25% 0.11 271.7)"
        }
      },
      {
        "name": "focus-ring",
        "added": false,
        "usage": "The 2px solid :focus-visible outline, offset 2px onto `canvas`. 6:1 light, 10.8:1 dark; also 5.2:1 on light `button-face`.",
        "values": {
          "light": "oklch(47.26% 0.198 260.5)",
          "dark": "oklch(78.05% 0.111 261.1)"
        }
      },
      {
        "name": "mark",
        "added": false,
        "usage": "<mark> highlight fill, the same yellow in both themes.",
        "values": {
          "light": "oklch(83.721% 0.1664 88.4)",
          "dark": "oklch(83.721% 0.1664 88.4)"
        }
      },
      {
        "name": "field",
        "added": false,
        "usage": "Fill of text inputs, textareas and selects.",
        "values": {
          "light": "oklch(100% 0 none)",
          "dark": "oklch(23.5% 0 none)"
        }
      },
      {
        "name": "field-text",
        "added": false,
        "usage": "Typed text on `field`. 21:1 light, 11.2:1 dark.",
        "values": {
          "light": "oklch(0% 0 none)",
          "dark": "oklch(96.12% 0 none)"
        }
      },
      {
        "name": "status-error",
        "added": false,
        "usage": "Border and lead word of error messages and invalid fields. Text colour in Normal UI: the words say it is an error, never colour alone. A theme may give it a hue at 4.5:1.",
        "values": {
          "light": "oklch(47.55% 0.195 29.2)",
          "dark": "oklch(79.78% 0.116 20)"
        }
      },
      {
        "name": "page",
        "added": false,
        "usage": "Behind a `.pd-sheet` page. Same as `canvas` in Normal UI, so a sheet is just the page.",
        "values": {
          "light": "oklch(92.49% 0 none)",
          "dark": "oklch(14.48% 0 none)"
        }
      },
      {
        "name": "bevel-light",
        "added": true,
        "usage": "Top-left highlight of a bevelled button. Decorative; the border carries the 3:1 edge.",
        "values": {
          "light": "oklch(100% 0 none)",
          "dark": "oklch(46.76% 0 none)"
        }
      },
      {
        "name": "bevel-shadow",
        "added": true,
        "usage": "Bottom-right shadow of a bevelled button and the sheet's drop shadow.",
        "values": {
          "light": "oklch(53.82% 0 none)",
          "dark": "oklch(0% 0 none)"
        }
      }
    ],
    "families": {
      "sans": "\"Univers LT Pro\", Univers, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
      "mono": "\"Berkeley Mono\", \"TX-02\", ui-monospace, SFMono-Regular, Consolas, \"Liberation Mono\", Menlo, monospace"
    },
    "fonts": [],
    "rootSize": "87.5%",
    "lengths": [
      {
        "name": "radius-control",
        "value": "0",
        "added": false,
        "usage": ""
      },
      {
        "name": "button-shadow",
        "value": "inset 1px 1px 0 var(--bevel-light), 1px 1px 0 var(--bevel-shadow)",
        "added": false,
        "usage": ""
      },
      {
        "name": "button-shadow-active",
        "value": "inset 1px 1px 0 var(--bevel-shadow)",
        "added": false,
        "usage": ""
      },
      {
        "name": "button-press-offset",
        "value": "1px",
        "added": false,
        "usage": ""
      },
      {
        "name": "sheet-shadow",
        "value": "3px 3px 0 var(--bevel-shadow)",
        "added": false,
        "usage": ""
      },
      {
        "name": "heading-1",
        "value": "1.5rem",
        "added": false,
        "usage": ""
      },
      {
        "name": "heading-2",
        "value": "1.143rem",
        "added": false,
        "usage": ""
      },
      {
        "name": "heading-3",
        "value": "1rem",
        "added": false,
        "usage": ""
      },
      {
        "name": "app-heading-1",
        "value": "1.25rem",
        "added": false,
        "usage": ""
      },
      {
        "name": "app-heading-2",
        "value": "1.071rem",
        "added": false,
        "usage": ""
      },
      {
        "name": "nav-link-decoration",
        "value": "none",
        "added": false,
        "usage": ""
      }
    ],
    "waived": []
  }
];
