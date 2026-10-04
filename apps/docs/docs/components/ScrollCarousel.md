# Scroll carousel

A carousel made with CSS only: a horizontally scrolling, snapping list. In browsers with the new CSS overflow features, `::scroll-button()` adds Previous and Next buttons and `::scroll-marker` adds numbered markers, with `:target-current` marking the one in view.

**Consumer provides:** a heading and a `<ul class="pd-scroller">` of items.

- Everywhere, it is a plain list people can scroll by swipe, trackpad or Shift+wheel, and Tab moves into each item's links.
- Where supported, the browser generates real buttons (disabled at each end, drawn dashed) and a group of numbered markers 24px square; the current one is inverted.
- Nothing moves on its own.
- Support: `::scroll-button()` and `::scroll-marker` are Chromium only (Chrome 135+) and still experimental; screen-reader support for the generated controls is still settling. For a carousel that must behave identically everywhere, use Carousel.
