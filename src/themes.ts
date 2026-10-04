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
          "light": "#ffffff"
        }
      },
      {
        "name": "canvas-text",
        "added": false,
        "usage": "Body copy and headings on `canvas`. 21:1 light, 18.7:1 dark.",
        "values": {
          "light": "#0b0c0c"
        }
      },
      {
        "name": "surface-soft",
        "added": false,
        "usage": "The faintest tint, for light grouping (a soft card). Everything on canvas keeps its contrast here: gray-text 4.87:1 light, 7.59:1 dark; control-border 4.28:1, 6.06:1.",
        "values": {
          "light": "#f4f8fb"
        }
      },
      {
        "name": "surface-muted",
        "added": false,
        "usage": "A quieter panel for secondary content: muted and filled cards, recessed wells, separated bands. The darkest light tint that keeps gray-text at 4.5:1 (4.62:1; dark 6.74:1); control-border 4.06:1, 5.38:1.",
        "values": {
          "light": "#f3f2f1"
        }
      },
      {
        "name": "surface-raised",
        "added": false,
        "usage": "A panel set on a tinted surface (the body of a muted card): white in light, one step lighter in dark. gray-text 5.17:1 light, 5.88:1 dark; control-border 4.54:1, 4.69:1.",
        "values": {
          "light": "#ffffff"
        }
      },
      {
        "name": "link",
        "added": false,
        "usage": "Unvisited links on `canvas`, always underlined. 9.4:1 light, 7.8:1 dark. The browser's LinkText, unchanged.",
        "values": {
          "light": "#1a65a6"
        }
      },
      {
        "name": "link-visited",
        "added": false,
        "usage": "Visited links on `canvas`. 11:1 light, 9.7:1 dark. The browser's VisitedText, unchanged.",
        "values": {
          "light": "#54319f"
        }
      },
      {
        "name": "link-active",
        "added": false,
        "usage": "A link while it is being pressed, on `canvas`. 4.53:1 light (passes AA by a hair; never use it for resting text), 9.5:1 dark.",
        "values": {
          "light": "#0b0c0c"
        }
      },
      {
        "name": "button-face",
        "added": false,
        "usage": "Button fill. Dark is darkened from Chromium's #6b6b6b so white labels reach 6.9:1.",
        "values": {
          "light": "#f3f2f1"
        }
      },
      {
        "name": "button-text",
        "added": false,
        "usage": "Button labels on `button-face`. 18.3:1 light, 6.9:1 dark.",
        "values": {
          "light": "#0b0c0c"
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
          "light": "#b1b4b6"
        }
      },
      {
        "name": "button-face-hover",
        "added": false,
        "usage": "Button fill under the pointer. Same as `button-face` in Normal UI, where hover only darkens the border.",
        "values": {
          "light": "#dbdad9"
        }
      },
      {
        "name": "button-edge",
        "added": false,
        "usage": "Colour of the solid edge under a button (`button-edge-width` tall). None in Normal UI.",
        "values": {
          "light": "#858686"
        }
      },
      {
        "name": "button-primary-face",
        "added": false,
        "usage": "Fill of the one button a form leads with (`variant=\"primary\"`). Normal UI draws every variant the same: order and wording carry the emphasis. A theme may set it apart.",
        "values": {
          "light": "#0f7a52"
        }
      },
      {
        "name": "button-primary-text",
        "added": false,
        "usage": "Label on `button-primary-face`.",
        "values": {
          "light": "#ffffff"
        }
      },
      {
        "name": "button-primary-face-hover",
        "added": false,
        "usage": "Primary button fill under the pointer.",
        "values": {
          "light": "#0b5c3e"
        }
      },
      {
        "name": "button-primary-edge",
        "added": false,
        "usage": "Edge under a primary button.",
        "values": {
          "light": "#002d18"
        }
      },
      {
        "name": "button-warning-face",
        "added": false,
        "usage": "Fill of a button that destroys or cannot be undone (`variant=\"warning\"`). Identical to a plain button in Normal UI; the label says what it does.",
        "values": {
          "light": "#ca3535"
        }
      },
      {
        "name": "button-warning-text",
        "added": false,
        "usage": "Label on `button-warning-face`.",
        "values": {
          "light": "#ffffff"
        }
      },
      {
        "name": "button-warning-face-hover",
        "added": false,
        "usage": "Warning button fill under the pointer.",
        "values": {
          "light": "#a22a2a"
        }
      },
      {
        "name": "button-warning-edge",
        "added": false,
        "usage": "Edge under a warning button.",
        "values": {
          "light": "#55150b"
        }
      },
      {
        "name": "field",
        "added": false,
        "usage": "Fill of text inputs, textareas and selects.",
        "values": {
          "light": "#ffffff"
        }
      },
      {
        "name": "field-text",
        "added": false,
        "usage": "Typed text on `field`. 21:1 light, 11.2:1 dark.",
        "values": {
          "light": "#0b0c0c"
        }
      },
      {
        "name": "control-border",
        "added": false,
        "usage": "1px border of buttons, fields, selects and fieldsets. At least 3:1 against `canvas`, `field` and `button-face` in both themes (light 4.5:1 on canvas, 3.95:1 on button-face; dark 6.7:1 on canvas, 4:1 on field).",
        "values": {
          "light": "#0b0c0c"
        }
      },
      {
        "name": "placeholder",
        "added": false,
        "usage": "Placeholder text on `field`. 5.2:1 light, 5:1 dark. Replaces opacity-faded placeholders that drop under 4.5:1.",
        "values": {
          "light": "#595959"
        }
      },
      {
        "name": "gray-text",
        "added": false,
        "usage": "Disabled labels and secondary notes on `canvas`. 5.2:1 light, 8.4:1 dark: disabled text stays readable; the dashed border says it is disabled.",
        "values": {
          "light": "#484949"
        }
      },
      {
        "name": "accent",
        "added": false,
        "usage": "accent-color for checkboxes, radios, range, progress and the switch track. A non-text mark, but kept at text strength: 5.3:1 on white (light), 10.8:1 on dark canvas. Deepened from Chromium's #0075ff (4.2:1).",
        "values": {
          "light": "#0b0c0c"
        }
      },
      {
        "name": "focus-ring",
        "added": false,
        "usage": "The 2px solid :focus-visible outline, offset 2px onto `canvas`. 6:1 light, 10.8:1 dark; also 5.2:1 on light `button-face`.",
        "values": {
          "light": "#ffdd00"
        }
      },
      {
        "name": "focus-inset",
        "added": false,
        "usage": "A second ring drawn just inside a focused field or list item, for themes whose `focus-ring` is light (a yellow ring needs a dark inset to hold 3:1 on white). None in Normal UI.",
        "values": {
          "light": "#0b0c0c"
        }
      },
      {
        "name": "mark",
        "added": false,
        "usage": "<mark> highlight fill, the same yellow in both themes.",
        "values": {
          "light": "#ffdd00"
        }
      },
      {
        "name": "mark-text",
        "added": false,
        "usage": "Text on `mark`, black in both themes (19.6:1). Never let <mark> inherit white dark-theme text.",
        "values": {
          "light": "#0b0c0c"
        }
      },
      {
        "name": "rule",
        "added": false,
        "usage": "<hr> and table cell borders. Same as `control-border`, so dividers stay visible at 3:1+.",
        "values": {
          "light": "#b1b4b6"
        }
      },
      {
        "name": "status-error",
        "added": false,
        "usage": "Border and lead word of error messages and invalid fields. Text colour in Normal UI: the words say it is an error, never colour alone. A theme may give it a hue at 4.5:1.",
        "values": {
          "light": "#ca3535"
        }
      },
      {
        "name": "status-success",
        "added": false,
        "usage": "Border and lead word of success messages.",
        "values": {
          "light": "#0f7a52"
        }
      },
      {
        "name": "status-info",
        "added": false,
        "usage": "Border and lead word of notes.",
        "values": {
          "light": "#1d70b8"
        }
      },
      {
        "name": "masthead",
        "added": false,
        "usage": "Fill of a `.pd-masthead` band. Same as `canvas` in Normal UI; a theme may make it a brand colour.",
        "values": {
          "light": "#1d70b8"
        }
      },
      {
        "name": "masthead-text",
        "added": false,
        "usage": "Text and links on `masthead`.",
        "values": {
          "light": "#ffffff"
        }
      },
      {
        "name": "link-hover",
        "added": true,
        "usage": "A link under the pointer, with a 3px underline.",
        "values": {
          "light": "#0f385c"
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
          "light": "#ffffff",
          "dark": "#151515"
        }
      },
      {
        "name": "canvas-text",
        "added": false,
        "usage": "Body copy and headings on `canvas`. 21:1 light, 18.7:1 dark.",
        "values": {
          "light": "#000000",
          "dark": "#ececec"
        }
      },
      {
        "name": "surface-soft",
        "added": false,
        "usage": "The faintest tint, for light grouping (a soft card). Everything on canvas keeps its contrast here: gray-text 4.87:1 light, 7.59:1 dark; control-border 4.28:1, 6.06:1.",
        "values": {
          "light": "#f7f7f7",
          "dark": "#1c1c1c"
        }
      },
      {
        "name": "surface-muted",
        "added": false,
        "usage": "A quieter panel for secondary content: muted and filled cards, recessed wells, separated bands. The darkest light tint that keeps gray-text at 4.5:1 (4.62:1; dark 6.74:1); control-border 4.06:1, 5.38:1.",
        "values": {
          "light": "#eeeeee",
          "dark": "#242424"
        }
      },
      {
        "name": "surface-raised",
        "added": false,
        "usage": "A panel set on a tinted surface (the body of a muted card): white in light, one step lighter in dark. gray-text 5.17:1 light, 5.88:1 dark; control-border 4.54:1, 4.69:1.",
        "values": {
          "light": "#ffffff",
          "dark": "#2a2a2a"
        }
      },
      {
        "name": "link",
        "added": false,
        "usage": "Unvisited links on `canvas`, always underlined. 9.4:1 light, 7.8:1 dark. The browser's LinkText, unchanged.",
        "values": {
          "light": "#0f4c81",
          "dark": "#8cb8e8"
        }
      },
      {
        "name": "link-visited",
        "added": false,
        "usage": "Visited links on `canvas`. 11:1 light, 9.7:1 dark. The browser's VisitedText, unchanged.",
        "values": {
          "light": "#5b3a8c",
          "dark": "#c3a8ea"
        }
      },
      {
        "name": "link-active",
        "added": false,
        "usage": "A link while it is being pressed, on `canvas`. 4.53:1 light (passes AA by a hair; never use it for resting text), 9.5:1 dark.",
        "values": {
          "light": "#b00000",
          "dark": "#ff9e9e"
        }
      },
      {
        "name": "button-face",
        "added": false,
        "usage": "Button fill. Dark is darkened from Chromium's #6b6b6b so white labels reach 6.9:1.",
        "values": {
          "light": "#f2f2f2",
          "dark": "#353535"
        }
      },
      {
        "name": "button-face-hover",
        "added": false,
        "usage": "Button fill under the pointer. Same as `button-face` in Normal UI, where hover only darkens the border.",
        "values": {
          "light": "#e6e6e6",
          "dark": "#404040"
        }
      },
      {
        "name": "button-primary-face",
        "added": false,
        "usage": "Fill of the one button a form leads with (`variant=\"primary\"`). Normal UI draws every variant the same: order and wording carry the emphasis. A theme may set it apart.",
        "values": {
          "light": "#2f7d32",
          "dark": "#2f7d32"
        }
      },
      {
        "name": "button-primary-text",
        "added": false,
        "usage": "Label on `button-primary-face`.",
        "values": {
          "light": "#ffffff",
          "dark": "#ffffff"
        }
      },
      {
        "name": "button-primary-border",
        "added": false,
        "usage": "Border of a primary button.",
        "values": {
          "light": "#235e26",
          "dark": "#7fcf83"
        }
      },
      {
        "name": "button-primary-face-hover",
        "added": false,
        "usage": "Primary button fill under the pointer.",
        "values": {
          "light": "#276b2a",
          "dark": "#276b2a"
        }
      },
      {
        "name": "field",
        "added": false,
        "usage": "Fill of text inputs, textareas and selects.",
        "values": {
          "light": "#ffffff",
          "dark": "#1f1f1f"
        }
      },
      {
        "name": "field-text",
        "added": false,
        "usage": "Typed text on `field`. 21:1 light, 11.2:1 dark.",
        "values": {
          "light": "#000000",
          "dark": "#ececec"
        }
      },
      {
        "name": "control-border",
        "added": false,
        "usage": "1px border of buttons, fields, selects and fieldsets. At least 3:1 against `canvas`, `field` and `button-face` in both themes (light 4.5:1 on canvas, 3.95:1 on button-face; dark 6.7:1 on canvas, 4:1 on field).",
        "values": {
          "light": "#7a7a7a",
          "dark": "#8c8c8c"
        }
      },
      {
        "name": "placeholder",
        "added": false,
        "usage": "Placeholder text on `field`. 5.2:1 light, 5:1 dark. Replaces opacity-faded placeholders that drop under 4.5:1.",
        "values": {
          "light": "#5f5f5f",
          "dark": "#a6a6a6"
        }
      },
      {
        "name": "gray-text",
        "added": false,
        "usage": "Disabled labels and secondary notes on `canvas`. 5.2:1 light, 8.4:1 dark: disabled text stays readable; the dashed border says it is disabled.",
        "values": {
          "light": "#5f5f5f",
          "dark": "#a6a6a6"
        }
      },
      {
        "name": "accent",
        "added": false,
        "usage": "accent-color for checkboxes, radios, range, progress and the switch track. A non-text mark, but kept at text strength: 5.3:1 on white (light), 10.8:1 on dark canvas. Deepened from Chromium's #0075ff (4.2:1).",
        "values": {
          "light": "#2f7d32",
          "dark": "#7fcf83"
        }
      },
      {
        "name": "focus-ring",
        "added": false,
        "usage": "The 2px solid :focus-visible outline, offset 2px onto `canvas`. 6:1 light, 10.8:1 dark; also 5.2:1 on light `button-face`.",
        "values": {
          "light": "#0f4c81",
          "dark": "#8cb8e8"
        }
      },
      {
        "name": "mark",
        "added": false,
        "usage": "<mark> highlight fill, the same yellow in both themes.",
        "values": {
          "light": "#fff2a8",
          "dark": "#fff2a8"
        }
      },
      {
        "name": "highlight",
        "added": false,
        "usage": "::selection background.",
        "values": {
          "light": "#fff2a8",
          "dark": "#4a4320"
        }
      },
      {
        "name": "highlight-text",
        "added": false,
        "usage": "Selected text on `highlight`, links included. 13.9:1 light, 8.5:1 dark.",
        "values": {
          "light": "#000000",
          "dark": "#ffffff"
        }
      },
      {
        "name": "rule",
        "added": false,
        "usage": "<hr> and table cell borders. Same as `control-border`, so dividers stay visible at 3:1+.",
        "values": {
          "light": "#cccccc",
          "dark": "#3d3d3d"
        }
      },
      {
        "name": "status-error",
        "added": false,
        "usage": "Border and lead word of error messages and invalid fields. Text colour in Normal UI: the words say it is an error, never colour alone. A theme may give it a hue at 4.5:1.",
        "values": {
          "light": "#b00000",
          "dark": "#ff9e9e"
        }
      },
      {
        "name": "status-success",
        "added": false,
        "usage": "Border and lead word of success messages.",
        "values": {
          "light": "#2f7d32",
          "dark": "#7fcf83"
        }
      },
      {
        "name": "masthead",
        "added": false,
        "usage": "Fill of a `.pd-masthead` band. Same as `canvas` in Normal UI; a theme may make it a brand colour.",
        "values": {
          "light": "#2f7d32",
          "dark": "#1f5321"
        }
      },
      {
        "name": "masthead-text",
        "added": false,
        "usage": "Text and links on `masthead`.",
        "values": {
          "light": "#ffffff",
          "dark": "#ffffff"
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
          "light": "#ffffff",
          "dark": "#161616"
        }
      },
      {
        "name": "canvas-text",
        "added": false,
        "usage": "Body copy and headings on `canvas`. 21:1 light, 18.7:1 dark.",
        "values": {
          "light": "#000000",
          "dark": "#f2f2f2"
        }
      },
      {
        "name": "surface-soft",
        "added": false,
        "usage": "The faintest tint, for light grouping (a soft card). Everything on canvas keeps its contrast here: gray-text 4.87:1 light, 7.59:1 dark; control-border 4.28:1, 6.06:1.",
        "values": {
          "light": "#f7f7f7",
          "dark": "#1e1e1e"
        }
      },
      {
        "name": "surface-muted",
        "added": false,
        "usage": "A quieter panel for secondary content: muted and filled cards, recessed wells, separated bands. The darkest light tint that keeps gray-text at 4.5:1 (4.62:1; dark 6.74:1); control-border 4.06:1, 5.38:1.",
        "values": {
          "light": "#efefef",
          "dark": "#262626"
        }
      },
      {
        "name": "surface-raised",
        "added": false,
        "usage": "A panel set on a tinted surface (the body of a muted card): white in light, one step lighter in dark. gray-text 5.17:1 light, 5.88:1 dark; control-border 4.54:1, 4.69:1.",
        "values": {
          "light": "#ffffff",
          "dark": "#2c2c2c"
        }
      },
      {
        "name": "link",
        "added": false,
        "usage": "Unvisited links on `canvas`, always underlined. 9.4:1 light, 7.8:1 dark. The browser's LinkText, unchanged.",
        "values": {
          "light": "#000000",
          "dark": "#f2f2f2"
        }
      },
      {
        "name": "link-visited",
        "added": false,
        "usage": "Visited links on `canvas`. 11:1 light, 9.7:1 dark. The browser's VisitedText, unchanged.",
        "values": {
          "light": "#4a4a4a",
          "dark": "#c4c4c4"
        }
      },
      {
        "name": "link-active",
        "added": false,
        "usage": "A link while it is being pressed, on `canvas`. 4.53:1 light (passes AA by a hair; never use it for resting text), 9.5:1 dark.",
        "values": {
          "light": "#b00000",
          "dark": "#ff9e9e"
        }
      },
      {
        "name": "button-face",
        "added": false,
        "usage": "Button fill. Dark is darkened from Chromium's #6b6b6b so white labels reach 6.9:1.",
        "values": {
          "light": "#f0f0f0",
          "dark": "#3a3a3a"
        }
      },
      {
        "name": "button-face-hover",
        "added": false,
        "usage": "Button fill under the pointer. Same as `button-face` in Normal UI, where hover only darkens the border.",
        "values": {
          "light": "#e4e4e4",
          "dark": "#454545"
        }
      },
      {
        "name": "button-primary-face",
        "added": false,
        "usage": "Fill of the one button a form leads with (`variant=\"primary\"`). Normal UI draws every variant the same: order and wording carry the emphasis. A theme may set it apart.",
        "values": {
          "light": "#f6c21c",
          "dark": "#f6c21c"
        }
      },
      {
        "name": "button-primary-text",
        "added": false,
        "usage": "Label on `button-primary-face`.",
        "values": {
          "light": "#000000",
          "dark": "#000000"
        }
      },
      {
        "name": "button-primary-face-hover",
        "added": false,
        "usage": "Primary button fill under the pointer.",
        "values": {
          "light": "#e8b100",
          "dark": "#e8b100"
        }
      },
      {
        "name": "control-border",
        "added": false,
        "usage": "1px border of buttons, fields, selects and fieldsets. At least 3:1 against `canvas`, `field` and `button-face` in both themes (light 4.5:1 on canvas, 3.95:1 on button-face; dark 6.7:1 on canvas, 4:1 on field).",
        "values": {
          "light": "#6e6e6e",
          "dark": "#8f8f8f"
        }
      },
      {
        "name": "placeholder",
        "added": false,
        "usage": "Placeholder text on `field`. 5.2:1 light, 5:1 dark. Replaces opacity-faded placeholders that drop under 4.5:1.",
        "values": {
          "light": "#666666",
          "dark": "#a8a8a8"
        }
      },
      {
        "name": "gray-text",
        "added": false,
        "usage": "Disabled labels and secondary notes on `canvas`. 5.2:1 light, 8.4:1 dark: disabled text stays readable; the dashed border says it is disabled.",
        "values": {
          "light": "#666666",
          "dark": "#a8a8a8"
        }
      },
      {
        "name": "accent",
        "added": false,
        "usage": "accent-color for checkboxes, radios, range, progress and the switch track. A non-text mark, but kept at text strength: 5.3:1 on white (light), 10.8:1 on dark canvas. Deepened from Chromium's #0075ff (4.2:1).",
        "values": {
          "light": "#1f3a93",
          "dark": "#9fb4ff"
        }
      },
      {
        "name": "focus-ring",
        "added": false,
        "usage": "The 2px solid :focus-visible outline, offset 2px onto `canvas`. 6:1 light, 10.8:1 dark; also 5.2:1 on light `button-face`.",
        "values": {
          "light": "#0050c8",
          "dark": "#8fb8ff"
        }
      },
      {
        "name": "mark",
        "added": false,
        "usage": "<mark> highlight fill, the same yellow in both themes.",
        "values": {
          "light": "#f6c21c",
          "dark": "#f6c21c"
        }
      },
      {
        "name": "field",
        "added": false,
        "usage": "Fill of text inputs, textareas and selects.",
        "values": {
          "light": "#ffffff",
          "dark": "#1e1e1e"
        }
      },
      {
        "name": "field-text",
        "added": false,
        "usage": "Typed text on `field`. 21:1 light, 11.2:1 dark.",
        "values": {
          "light": "#000000",
          "dark": "#f2f2f2"
        }
      },
      {
        "name": "status-error",
        "added": false,
        "usage": "Border and lead word of error messages and invalid fields. Text colour in Normal UI: the words say it is an error, never colour alone. A theme may give it a hue at 4.5:1.",
        "values": {
          "light": "#b00000",
          "dark": "#ff9e9e"
        }
      },
      {
        "name": "page",
        "added": false,
        "usage": "Behind a `.pd-sheet` page. Same as `canvas` in Normal UI, so a sheet is just the page.",
        "values": {
          "light": "#e6e6e6",
          "dark": "#0a0a0a"
        }
      },
      {
        "name": "bevel-light",
        "added": true,
        "usage": "Top-left highlight of a bevelled button. Decorative; the border carries the 3:1 edge.",
        "values": {
          "light": "#ffffff",
          "dark": "#5a5a5a"
        }
      },
      {
        "name": "bevel-shadow",
        "added": true,
        "usage": "Bottom-right shadow of a bevelled button and the sheet's drop shadow.",
        "values": {
          "light": "#6e6e6e",
          "dark": "#000000"
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
