# Card

A container for related content, such as a form, a list or a summary. Give it a header, a body and a footer, and the card handles the spacing and the dividers between them. The structure and naming follow Flux's card; the look is Normal UI's.

**Consumer provides:** the parts and their content, a heading `level` that fits the page outline, and `as="section"` or `as="article"` only when the card is a real section of the page.

Parts
- `Card.Header`: a `Card.Heading`, an optional `Card.Subheading` and optional `Card.Actions`. Actions written after the heading sit at the end of the row; written before it, at the start. They line up with the heading instead of making the header taller.
- `Card.Body`: the main content, spaced by gap. A header or footer inside the body becomes a bare sub-section, whatever the card's treatment.
- `Card.Footer`: supporting text (in `gray-text`, 0.875rem) and optional `Card.Actions` at the end.
- `Card.Bleed`: media run out to the card's edges. It reaches the sides always, and the top or bottom when it is first or last in the body.
- `<Table bleed>` in a body runs its rows to the card's edges with lines between rows only, and lines its first and last cells up with the card's content.
- Anything placed straight inside a card without parts is padded evenly.

Props
- `variant`: `default` is a 1px `control-border` box on `canvas`, for primary content. `muted` (`surface-muted`) is quieter, for secondary panels. `soft` (`surface-soft`) is the faintest tint, for light grouping. `outline` keeps the border with no background. `filled` is a `surface-muted` tint with no edge, for inline surfaces; it draws its border back in forced-colours mode.
- `body`: how the parts are set apart. `seamless` (default) shares one surface, separated by space. `inset` sets the body in a bordered panel inside the card's padding. `flush` runs that panel to the card's sides between two full-width lines. `divided` draws `rule` lines between header, body and footer; add `divider="inset"` to stop the lines at the content's edges. `separated` sets the header and footer in tinted bands.
- Panels and bands are recessed (`surface-muted`) on a plain card and raised (`surface-raised`) on a tinted one, so they always stand apart from the card.
- `size`: `xs`, `sm`, `md` (default), `lg` scale the padding and the space between parts: 8, 12, 16 and 24px.

What is different from Flux, and why
- No shadows, no rounded corners, no `highlight`: the system draws edges with borders, rounds only controls, and adds nothing for decoration. The inset panel keeps a 1px `rule` border as well as its tint, because the light tints are deliberately faint.
- Tints come from the three `surface-*` tokens only. They are as dark as light mode allows (and as light as dark mode allows) while `gray-text`, links and control borders keep their contrast on them, so every component can sit on any card.

Accessibility
- The card is a plain `div` by default: most cards are not sections, and too many regions make the landmarks list useless. With `as="section"` or `as="article"` it becomes a region named by its `Card.Heading`.
- Pick the heading `level` from the page outline (h2 under the page h1, h3 for cards inside a section). Sizes are separate from levels.
- Icon-only actions need an `aria-label` ("More options").

## Plain HTML

`patterns.css` has the same card for hand-written markup: classes for the parts, data attributes for the props. Actions always sit at the end of a header here.

<div class="pd-card" data-body="separated" data-variant="muted" style="max-width:28rem">
  <div class="pd-card-header">
    <h3>Delivery</h3>
    <p class="pd-card-subheading">Where we send your orders</p>
    <div class="pd-card-actions"><button type="button">Edit</button></div>
  </div>
  <div class="pd-card-body">
    <p>Jl. Braga No. 12, Bandung 40111</p>
    <div class="pd-card-bleed">
      <table>
        <caption>Recent deliveries</caption>
        <thead><tr><th scope="col">Order</th><th scope="col">Courier</th><th scope="col">Status</th></tr></thead>
        <tbody><tr><td>#1048</td><td>JNE</td><td>Delivered</td></tr><tr><td>#1047</td><td>SiCepat</td><td>On its way</td></tr></tbody>
      </table>
    </div>
  </div>
  <div class="pd-card-footer">
    <p>Updated today</p>
    <div class="pd-card-actions"><button type="button">Track</button></div>
  </div>
</div>

```html
<div class="pd-card" data-body="separated" data-variant="muted">
  <div class="pd-card-header">
    <h3>Delivery</h3>
    <p class="pd-card-subheading">Where we send your orders</p>
    <div class="pd-card-actions"><button type="button">Edit</button></div>
  </div>
  <div class="pd-card-body">
    <p>Jl. Braga No. 12, Bandung 40111</p>
    <div class="pd-card-bleed"><table>…</table></div>
  </div>
  <div class="pd-card-footer">
    <p>Updated today</p>
    <div class="pd-card-actions"><button type="button">Track</button></div>
  </div>
</div>
```
