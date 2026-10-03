# Carousel

The APG basic carousel: a `<section aria-roledescription="carousel">` of `role="group"` slides, each labelled "1 of 3", with Previous and Next (square ‹ › buttons named "Previous slide" and "Next slide") and a rotation button.

**Consumer provides:** the slides and a label for the carousel.

- It does not rotate on its own. Rotation starts only when someone presses "Start slide rotation", and pauses while the pointer or keyboard focus is on a slide or on Previous/Next (WCAG 2.2.2). The Start/Stop button itself does not pause it, so starting is visible at once.
- A status line beside the buttons says which slide is showing and whether it is rotating, paused or off.
- The slide area is `aria-live="polite"` when rotation is off (so Next announces the new slide) and `"off"` while rotating.
- Buttons are text, first in reading order, so keyboard users reach them before the slide.
- Consider a plain list first: most people only see the first slide.
