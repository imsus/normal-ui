# Normal UI

The browser's own stylesheet, repaired to WCAG 2.2 AA, distributed as installable CSS and React components. Public and experimental (0.x).

## Language

### Styling

**Token**:
A named design value (color, space, type size) defined once in `tokens.json`; every value the system draws with is a token.
_Avoid_: Variable, design variable

**Base styles**:
The element-level stylesheet that repairs plain HTML; the core of the system, usable without any components.
_Avoid_: Reset, normalize

**Pattern**:
A composite class or attribute recipe (a badge, a tab) for hand-written HTML, with no JavaScript.
_Avoid_: Utility, helper class

**Color scheme**:
Light or dark. Follows the device unless forced on an element.
_Avoid_: Theme, mode

**Theme**:
An opt-in look layered over the base styles (usgraphics, mcmaster, govuk) that changes tokens and adds element rules.
_Avoid_: Style, skin

### Building blocks

**Component**:
A React component styled from tokens, wrapping native elements and props.
_Avoid_: Widget, control

**Example**:
A template or page built from the system to show it in use; reference material, not part of the installable API.
_Avoid_: Starter, demo
