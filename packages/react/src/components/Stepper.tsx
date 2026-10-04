import * as stylex from '@stylexjs/stylex';
import { color, font, shape, space } from '@imsus/normal-ui-css/tokens.stylex';

/**
 * An ordered list of steps. Finished steps show a tick read as "Done:", the current
 * step is bold with a 2px ring, later steps are gray-text. Also say "Step 3 of 4"
 * in the page heading.
 */
export function Stepper({ label, steps, current }: { label: string; steps: string[]; /** Index of the current step. */ current: number }) {
  return (
    <ol aria-label={label} {...stylex.props(styles.list)}>
      {steps.map((s, i) => {
        const done = i < current;
        const now = i === current;
        return (
          <li key={s} aria-current={now ? 'step' : undefined}
            {...stylex.props(styles.step, styles.marker(String(i + 1)), done && styles.done, now && styles.current)}>
            {s}
          </li>
        );
      })}
    </ol>
  );
}

const styles = stylex.create({
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: `${space.xs} ${space.md}`,
    listStyle: 'none',
    padding: 0,
    marginBlock: space.md,
    fontFamily: font.sans,
    fontSize: '0.875rem',
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    gap: space.xs,
    color: color.grayText,
    '::before': {
      display: 'inline-grid',
      placeItems: 'center',
      width: '1.75rem',
      height: '1.75rem',
      borderWidth: shape.borderWidth,
      borderStyle: 'solid',
      borderColor: color.controlBorder,
      borderRadius: '50%',
      fontVariantNumeric: 'tabular-nums',
    },
  },
  marker: (n: string) => ({ '::before': { content: `"${n}"` } }),
  done: {
    color: color.canvasText,
    '::before': {
      content: '"✓" / "Done: "',
      backgroundColor: color.canvasText,
      color: color.canvas,
      borderColor: color.canvasText,
      forcedColorAdjust: 'none',
    },
  },
  current: { color: color.canvasText, fontWeight: 700, '::before': { borderWidth: 2, borderColor: color.canvasText } },
});
