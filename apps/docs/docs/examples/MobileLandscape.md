# Mobile landscape

The same markup on its side. `@media (orientation: landscape) and (max-height: 520px)` turns the bottom tabs into a navigation rail on the start edge, shrinks the top bar to 44px, and shows list and detail side by side.

**Consumer provides:** nothing extra; it is the portrait layout with one media query.

- Height is the scarce dimension now, so nothing is fixed to the bottom. The rail is 76px wide, and each item is 60px tall.
- The phone's notch and rounded corners are on the sides: pad with `env(safe-area-inset-left/right)` instead of top and bottom.
- The detail panel sticks under the top bar while the list scrolls.
- The `max-height` guard keeps tablets in landscape on the normal layout.
