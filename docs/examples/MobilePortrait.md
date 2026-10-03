# Mobile portrait

The phone layout held upright: top bar, one column (list, then detail), and a bottom tab bar. The same file as MobileLandscape; only the viewport differs.

**Consumer provides:** the screen content and up to four destinations.

- Never lock orientation (WCAG 1.3.4). Design both and let CSS switch.
- Tabs are 56px tall with an icon and a label; the current one is bold, `link`, with a 3px bar.
- `--pd-sticky-top` and `--pd-sticky-bottom` keep focused items clear of both bars.
